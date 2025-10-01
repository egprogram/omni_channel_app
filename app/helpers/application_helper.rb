module ApplicationHelper
  # アプリのヘッダーのハッシュ
  APP_HEADER_CONFIG = {
    "recommendations" => { template: "app_header", title: "おすすめ掲示板" },
    "complaints"     => { template: "app_header", title: "富岡の賢者" },
    "cash"           => { template: "app_header", title: "お会計" },
    "trash_calendar" => { template: "app_header", title: "ごみカレンダー" },
    "maps"           => { template: "bottom_app_header", title: "富岡マップ" }
  }.freeze

  # ヘッダーを表示すべきか
  def is_app_header?
    APP_HEADER_CONFIG.key?(controller_name)
  end

  # ヘッダーのテンプレート名
  def app_header_template
    APP_HEADER_CONFIG.dig(controller_name, :template)
  end

  # ヘッダーのタイトル
  def app_header_title
    content_for?(:header_title) ? yield(:header_title) : APP_HEADER_CONFIG.dig(controller_name, :title) || "富岡観光"
  end
end
