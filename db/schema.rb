# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_09_211919) do

  create_table "ferment_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.integer "temperature"
    t.string "temperature_unit"
    t.integer "pressure"
    t.string "pressure_unit"
    t.integer "day"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ferment_task_id"
  end

  create_table "ferment_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "day_start"
    t.integer "schedule_profile_id"
  end

  create_table "mash_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.integer "temperature"
    t.string "temperature_unit"
    t.integer "duration_hours"
    t.integer "step_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "mash_task_id"
  end

  create_table "mash_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "schedule_profile_id"
  end

  create_table "organization_task_template_associations", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "organization_id"
    t.integer "task_template_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organizations", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "packaging_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.integer "day"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "packaging_task_id"
  end

  create_table "packaging_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.integer "day_start"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "schedule_profile_id"
  end

  create_table "recipes", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "brew_type"
    t.integer "schedule_profile_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schedule_profiles", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schedule_requests", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "owner_id"
    t.string "product_name"
    t.integer "run_quantity"
    t.date "requested_preferred_date"
    t.text "notes"
    t.string "status"
    t.datetime "start"
    t.datetime "end"
    t.text "scheduled_tasks"
    t.boolean "scheduled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "end_type"
    t.integer "vessel_id"
    t.string "identifier"
  end

  create_table "task_templates", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "organization_id"
    t.string "task_type"
    t.text "template"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vessels", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "organization_id"
    t.string "identifier"
    t.integer "volume"
    t.string "volume_unit"
    t.string "vessel_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
