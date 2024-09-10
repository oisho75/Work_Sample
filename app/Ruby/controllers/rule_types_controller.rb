class API::V1::Admin::Catalog::RuleTypesController < API::V1::AdminController
  before_action :set_rule_type, only: %i[show update destroy]

  def index
    render json: Rule::TYPE
  end

  def show
    render json: Rule::TYPE
  end
end
