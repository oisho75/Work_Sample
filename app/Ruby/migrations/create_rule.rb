class CreateRules < ActiveRecord::Migration[7.0]
  def change
    create_table :rules, id: :uuid do |t|
      t.references :parent, optional: true, foreign_key: { to_table: :catalog_product_variants, on_delete: :cascade },
                            type: :uuid
      t.references :child, optional: true, foreign_key: { to_table: :catalog_product_variants, on_delete: :cascade },
                           type: :uuid

      t.string :rule_type, null: false

      t.boolean :active, default: false

      t.timestamps
    end
  end
end
