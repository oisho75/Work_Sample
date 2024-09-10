class API::V1::Admin::Catalog::RulesController < API::V1::AdminController
    before_action :set_rule, only: %i[show update destroy]
  
    def index
      if params[:parent_id].present?
        parent_id = params[:parent_id]
        @rules = Rule.where(parent_id:)
      else
        @rules = Rule.all
      end
      render json: @rules.as_json(include: { child: {} })
    end
  
    def show
      render json: @rule
    end
  
    def create
      @rule = Rule.new(rule_params)
      if @rule.save
        render json: @rule, status: :created
      else
        render_errors(@rule)
      end
    end
  
    def update
      if @rule.update(rule_params)
        render json: @rule
      else
        render_errors(@rule)
      end
    end
  
    def destroy
      @rule.destroy
  
      render json: { message: 'rule deleted' }
    end
  
    private
  
    def set_rule
      @rule = Rule.find(params[:id])
    end
  
    def rule_params
      params.require(:rule).permit(
        :id,
        :active,
        :_destroy,
        :parent_id,
        :child_id,
        :rule_type
      )
    end
  end