class ScheduleRequestSerializer < ActiveModel::Serializer

  attributes :id, :product_name, :children, :maxChild, :start, :end, :vessel_id,
             :run_quantity, :requested_preferred_date, :scheduled, :created_at, :end_type,
             :owner_id, :notes, :status, :scheduled_run_start, :scheduled_run_end, :scheduled_tasks,
             :title, :resourceId, :totalHours

end
