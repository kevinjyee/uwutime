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
    templates = calculate_templates
    context.result = {resources: resources.uniq, templates: templates }
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

  def resources
    @_resources ||= []
  end

  protected

  def calculate_templates
    tasks = []
    children_steps = {}

    maxChild = nil
    maxHours = -1
    totalHours = 0
    resource_index = 1
    last_cumulated_hours = 0
    totalBrewHours = 0

    recipe.steps.flatten.each_with_index do |recipe_step, index|

      if recipe_step.class.name == 'RecipeMashStep'
        children_steps['brew'] = {
            hours: 24,
            class_name: recipe_step.class.name,
            backgroundColor: COLOR_PICKER[recipe_step.class.name][:backgroundColor],
            color: COLOR_PICKER[recipe_step.class.name][:color],
            background: COLOR_PICKER[recipe_step.class.name][:background],
            border: COLOR_PICKER[recipe_step.class.name][:border],
            borderRadius: COLOR_PICKER[recipe_step.class.name][:borderRadius]
        }
        totalBrewHours += recipe_step.duration_hours
      else
        children_steps[recipe_step.display_name] = {
              hours: recipe_step.duration_hours,
              class_name: recipe_step.class.name,
              backgroundColor: COLOR_PICKER[recipe_step.class.name][:backgroundColor],
              color: COLOR_PICKER[recipe_step.class.name][:color],
              background: COLOR_PICKER[recipe_step.class.name][:background],
              border: COLOR_PICKER[recipe_step.class.name][:border],
              borderRadius: COLOR_PICKER[recipe_step.class.name][:borderRadius]
        }
        totalHours += recipe_step.duration_hours
      end


      if recipe_step.duration_hours > maxHours
        maxHours = recipe_step.duration_hours
        maxChild = recipe_step.name
      end
      if recipe_step.name == 'Transfer'
        totalHours += 24 if totalBrewHours > 0
        tasks << build_task(children_steps, maxChild, totalHours, resource_index, last_cumulated_hours)
        last_cumulated_hours += totalHours
        children_steps = {}
        maxChild = nil
        maxHours = -1
        totalHours = 0
        totalBrewHours = 0
        resource_index += 1

      end
      if index == recipe.steps.flatten.size - 1
        tasks << build_task(children_steps, maxChild, totalHours, resource_index, last_cumulated_hours)
      end
    end
    tasks
  end

  def build_task(children_steps, maxChild, totalHours, resource_index, last_cumulated_hours)
    resources.push({id: resource_index, identifier: "Resource #{resource_index}"})
    {
      maxChild: maxChild,
      start: Time.now().beginning_of_month + last_cumulated_hours*60*60,
      end: Time.now().beginning_of_month + totalHours*60*60 + last_cumulated_hours*60*60,
      totalHours: totalHours,
      children: children_steps,
      title: "#{recipe.name}-#{recipe.id}-#{resource_index}",
      resourceId: resource_index,
      id: "#{recipe.name}-#{recipe.id}-#{resource_index}"
    }
  end
end
