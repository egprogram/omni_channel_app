Rails.application.routes.draw do
  # Top画面
  root "pages#top"
  # マップ
  get "/maps", to: "maps#index"
  # 会計
  get "/cash", to: "cash#index"
  # クーポン
  get "/coupons", to: "coupons#index"
  # 設定
  get "/settings", to: "settings#index"

  # 通常アプリ
  # 街のおすすめ情報
  get "/recommendations", to: "recommendations#index"
  post "/recommendations/:id/like", to: "recommendations#like", as: :like_recommendation

  # 不満送信
  get  "/complaints/new", to: "complaints#new"
  post "/complaints",    to: "complaints#create"

  # 市のイベントカレンダー
  get "/city_event_calendar", to: "city_event_calendar#index"

  # ゴミカレンダー
  get "/trash_calendar", to: "trash_calendar#index"

  # AI機能
  get  "/ai", to: "ai#index"
  post "/ai/ask", to: "ai#ask"
end
