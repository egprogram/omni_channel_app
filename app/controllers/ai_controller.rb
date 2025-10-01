# AiController
#
# AI画面でのコントローラ
#

class AiController < ApplicationController
  def index
  end

  def ask
    @message = params[:message]
    render :index
  end
end
