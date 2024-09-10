# == Schema Information
#
# Table name: rules
#
#  id         :uuid             not null, primary key
#  parent_id  :uuid
#  child_id   :uuid
#  rule_type  :string           not null
#  active     :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Rule < ApplicationRecord
  ##
  # Rule is a constriction for a Catalog Product Variant on another Catalog Product Variant.
  # The variants must be addOns or Options
  # Parents and childs are refer to Catalog::Product::Variant
  ##

  TYPE = [
    'Prohibit'
  ].freeze

  validates :rule_type, presence: true, inclusion: { in: TYPE }

  belongs_to :child, class_name: 'Catalog::Product::Variant', foreign_key: 'child_id'
  belongs_to :parent, class_name: 'Catalog::Product::Variant', foreign_key: 'parent_id'
end
