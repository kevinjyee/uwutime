class BuildScheduleTemplate
  include Interactor

  delegate :recipe, to: :context
  # * context.recipe

  COLOR_PICKER = {
      'RecipeMashStep' => {
          backgroundColor: '#17E9E0',
          color: '#fff',
          background: '#17E9E0',
          border: '#adc6ff',
          borderStyle: 'solid',
          borderRadius: '10px'

      },
      'RecipeFermentStep' => {
          color: '#fff',
          background: '#ffb48f',
          backgroundColor:'#ffb48f',
          border: '#b7eb8f',
          borderStyle: 'solid',
          borderRadius:'10px'
      },
      'RecipePackagingStep' => {
          backgroundColor:'#fccd04',
          color: '#fff',
          background: '#fccd04',
          border: '#ffe58f',
          borderStyle: 'solid',
          borderRadius:'10px'
      }
  }

  def call
    context.result = calculate_templates
  end

  def maxChild
    maxChild = self.scheduled_tasks.keys[0]
    maxHours = -1
    self.children.each do |key, value|
      if value[:hours] > maxHours
        maxHours = value[:hours]
        maxChild = key
      end
    end
    maxChild
  end

  def totalHours
    totalHours = 0
    self.children.each do |key, value|
      totalHours += value[:hours]
    end
    totalHours
  end

  protected

  def calculate_templates
    tasks = []
    children_steps = {}

    maxChild = nil
    maxHours = -1
    totalHours = 0

    recipe.steps.flatten.each do |recipe_step|
      children_steps[recipe_step.display_name] = {
          hours: recipe_step.duration_hours,
          backgroundColor: COLOR_PICKER[recipe_step.class.name][:backgroundColor],
          color: COLOR_PICKER[recipe_step.class.name][:color],
          background: COLOR_PICKER[recipe_step.class.name][:background],
          border: COLOR_PICKER[recipe_step.class.name][:border],
          borderRadius: COLOR_PICKER[recipe_step.class.name][:borderRadius]
      }

      totalHours += recipe_step.duration_hours
      if recipe_step.duration_hours > maxHours
        maxHours = recipe_step.duration_hours
        maxChild = recipe_step.name
      end

      if recipe_step.name == 'Transfer'
        tasks << build_task(children_steps, maxChild, totalHours)
        children_steps = {}
        maxChild = nil
        maxHours = -1
        totalHours = 0
        next
      end
      tasks << build_task(children_steps, maxChild, totalHours)
    end
    tasks
  end

  def build_task(children_steps, maxChild, totalHours)
    {
      maxChild: maxChild,
      start: Time.now(),
      end: Time.now() + totalHours*60*60,
      totalHours: totalHours,
      children: children_steps,
      title: "#{recipe.name}-#{recipe.id}"

    }
  end
end
