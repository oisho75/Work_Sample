require 'test_helper'

class RulesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_user = create_admin_user
    @rule = Rule.create!(
      parent_id: create_catalog_product.variants.first.id,
      child_id: create_catalog_product.variants.first.id,
      rule_type: Rule::TYPE[0]
    )
  end

  test 'should get index' do
    get api_v1_admin_catalog_rules_url, headers: auth_headers(@admin_user)
    assert_response :success
  end

  test 'should show rule' do
    get api_v1_admin_catalog_rule_url(@rule), headers: auth_headers(@admin_user)
    assert_response :success
  end

  test 'should update rule' do
    skip 'broken'
    patch api_v1_admin_catalog_rule_url(@rule),
          params: {
            rule: {
              child_id: create_catalog_add_on.id
            }
          },
          headers: auth_headers(@admin_user)
    assert_response :success
  end

  test 'should destroy rule' do
    assert_difference('Rule.count', -1) do
      delete api_v1_admin_catalog_rule_url(@rule), headers: auth_headers(@admin_user)
    end

    assert_response :success
  end
end
