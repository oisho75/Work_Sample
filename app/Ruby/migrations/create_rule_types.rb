class CreateRuleTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :rule_types, id: :uuid do |t|
      t.string :rule_type, null: false
      t.string :rule_description, null: false
      t.boolean :active, default: false
      t.timestamps
    end
  end
end
