Rails.application.routes.draw do
  # Top画面
  root "pages#top"

  # カレンダー
  get "/calendar", to: "calendar#index"

  # マップ
  get "/maps", to: "maps#index"

  # 街のおすすめ情報
  get "/recommendations", to: "recommendations#index"
  post "/recommendations/:id/like", to: "recommendations#like", as: :like_recommendation

  # 不満送信
  get  "/complaints/new", to: "complaints#new"
  post "/complaints",    to: "complaints#create"

  # AI機能
  get  "/ai", to: "ai#index"
  post "/ai/ask", to: "ai#ask"
end
