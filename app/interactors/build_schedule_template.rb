class BuildScheduleTemplate
  include Interactor

  delegate :recipe, to: :context
  # * context.recipe

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
          hours: recipe_step.duration_hours
      }

      totalHours += recipe_step.duration_hours
      if recipe_step.duration_hours > maxHours
        maxHours = recipe_step.duration_hours
        maxChild = recipe_step.name
      end

      if recipe_step.name == 'Transfer'
        tasks << build_children(children_steps, maxChild, totalHours)
        children_steps = {}
        maxChild = nil
        maxHours = -1
        totalHours = 0
      end
    end
    tasks
  end

  def build_children(children_steps, maxChild, totalHours)
    {
      maxChild: maxChild,
      totalHours: totalHours,
      children: children_steps
    }
  end
end
