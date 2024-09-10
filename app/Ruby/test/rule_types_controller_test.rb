require 'test_helper'

class RuleTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_user = create_admin_user
    @rule_type = Rule::TYPE[0]
  end

  test 'should get index' do
    get api_v1_admin_catalog_rule_types_url, headers: auth_headers(@admin_user)
    assert_response :success
  end
end
