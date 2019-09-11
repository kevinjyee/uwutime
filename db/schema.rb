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

ActiveRecord::Schema.define(version: 2019_08_20_102317) do

  create_table "ferment_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
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

  create_table "ferment_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "day_start"
    t.integer "schedule_profile_id"
  end

  create_table "fermentable_characteristics", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "fermentable_id"
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fermentables", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "country_of_origin"
    t.integer "srm_id"
    t.integer "srm_precise"
    t.integer "moisture_content"
    t.decimal "dry_yield", precision: 10, scale: 2
    t.decimal "potential", precision: 10, scale: 2
    t.decimal "protein", precision: 10, scale: 2
    t.integer "max_in_batch"
    t.string "requires_mashing"
    t.string "category"
    t.string "category_display"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hops", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "country_of_origin"
    t.decimal "alpha_acid_min", precision: 10
    t.decimal "alpha_acid_max", precision: 10
    t.decimal "beta_acid_min", precision: 10
    t.decimal "beta_acid_max", precision: 10
    t.decimal "humulene_min", precision: 10
    t.decimal "humulene_max", precision: 10
    t.decimal "caryophyllene_min", precision: 10
    t.decimal "caryophyllene_max", precision: 10
    t.decimal "cohumulone_min", precision: 10
    t.decimal "cohumulone_max", precision: 10
    t.decimal "myrcene_min", precision: 10
    t.decimal "myrcene_max", precision: 10
    t.decimal "farnesene_min", precision: 10
    t.decimal "farnesene_max", precision: 10
    t.string "is_noble"
    t.string "for_bittering"
    t.string "for_flavor"
    t.string "for_aroma"
    t.string "category"
    t.string "category_display"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.string "category_display"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "entity_type"
    t.integer "entity_id"
  end

  create_table "mash_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
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

  create_table "mash_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "schedule_profile_id"
  end

  create_table "miscs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organization_task_template_associations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "organization_id"
    t.integer "task_template_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "organizations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "packaging_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.integer "day"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "packaging_task_id"
  end

  create_table "packaging_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.integer "day_start"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "schedule_profile_id"
  end

  create_table "recipe_ferment_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.integer "temperature"
    t.string "temperature_unit"
    t.integer "pressure"
    t.string "pressure_unit"
    t.integer "day"
    t.integer "recipe_ferment_task_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_ferment_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.integer "day_start"
    t.integer "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_fermentables", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "fermentable_id"
    t.integer "moisture_content"
    t.decimal "dry_yield", precision: 10, scale: 2
    t.decimal "potential", precision: 10, scale: 2
    t.decimal "protein", precision: 10, scale: 2
    t.string "requires_mashing"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "srm_id"
    t.integer "srm_precise"
    t.integer "recipe_ingredient_id"
    t.decimal "amount", precision: 10, scale: 2
    t.string "amount_unit"
  end

  create_table "recipe_hops", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "recipe_id"
    t.string "hop_id"
    t.decimal "alpha_acid_min", precision: 10
    t.decimal "alpha_acid_max", precision: 10
    t.decimal "beta_acid_min", precision: 10
    t.decimal "beta_acid_max", precision: 10
    t.decimal "humulene_min", precision: 10
    t.decimal "humulene_max", precision: 10
    t.decimal "caryophyllene_min", precision: 10
    t.decimal "caryophyllene_max", precision: 10
    t.decimal "cohumulone_min", precision: 10
    t.decimal "cohumulone_max", precision: 10
    t.decimal "myrcene_min", precision: 10
    t.decimal "myrcene_max", precision: 10
    t.decimal "farnesene_min", precision: 10
    t.decimal "farnesene_max", precision: 10
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_ingredients", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "ingredient_id"
    t.decimal "amount", precision: 10, scale: 2
    t.string "amount_unit"
    t.integer "duration"
    t.string "duration_unit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "recipe_step_type"
    t.integer "recipe_step_id"
    t.string "entity_type"
    t.integer "entity_id"
  end

  create_table "recipe_mash_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.string "temperature"
    t.string "temperature_unit"
    t.integer "duration_hours"
    t.integer "step_order"
    t.integer "recipe_mash_task_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_mash_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "mash_task_id"
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_packaging_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "display_name"
    t.integer "day"
    t.integer "recipe_packaging_task_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_packaging_tasks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "step"
    t.integer "step_order"
    t.integer "day_start"
    t.integer "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipe_yeasts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "yeast_id"
    t.decimal "attenuation_min", precision: 10
    t.decimal "attenuation_max", precision: 10
    t.decimal "ferment_temp_min", precision: 10
    t.decimal "ferment_temp_max", precision: 10
    t.decimal "alcohol_tolerance_min", precision: 10
    t.decimal "alcohol_tolerance_max", precision: 10
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "brew_type"
    t.integer "schedule_profile_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "brew_hours"
    t.integer "ferment_days"
    t.integer "packaging_days"
    t.decimal "volume_per_turn", precision: 10, scale: 2
    t.string "volume_per_turn_unit"
  end

  create_table "schedule_profiles", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schedule_requests", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
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

  create_table "srms", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.string "hex"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "task_templates", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "organization_id"
    t.string "task_type"
    t.text "template"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.boolean "admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vessels", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "organization_id"
    t.string "identifier"
    t.integer "volume"
    t.string "volume_unit"
    t.string "vessel_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "yeasts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.decimal "attenuation_min", precision: 10
    t.decimal "attenuation_max", precision: 10
    t.decimal "ferment_temp_min", precision: 10
    t.decimal "ferment_temp_max", precision: 10
    t.decimal "alcohol_tolerance_min", precision: 10
    t.decimal "alcohol_tolerance_max", precision: 10
    t.string "supplier"
    t.string "yeast_format"
    t.string "category"
    t.string "category_display"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "yeast_type"
  end

end
