# 富岡オムニチャネルアプリ

## 起動方法

git clone  
docker compose up -d

curl http://localhost:3000

## ルーティング

このアプリで使用する主要ページのエンドポイント一覧です。

---

### Top画面
- **URL:** `/`
- **Controller#Action:** `pages#top`
- **説明:** アプリのトップページ。AI機能、富岡市の天気、今日のゴミ出し情報、カレンダー、街のおすすめ情報、不満送信機能へのリンクを表示。

---

### AI機能
- **URL:** `/ai`
- **Controller#Action:** `ai#index`
- **説明:** 富岡市特化のAI機能ページ。

- **URL:** `/ai/ask`
- **Controller#Action:** `ai#ask`
- **HTTP Method:** POST
- **説明:** ユーザーからの質問（例: 今日のゴミは？）に応答。

---

### マップ機能
- **URL:** `/maps`
- **Controller#Action:** `maps#index`
- **説明:** 地図を表示するページ。

---

### 会計機能
- **URL:** `/cash`
- **Controller#Action:** `cash#index`
- **説明:** 会計処理するページ。

---

### クーポン機能
- **URL:** `/coupons`
- **Controller#Action:** `coupons#index`
- **説明:** クーポンを表示するページ。

---

### 設定機能
- **URL:** `/settings`
- **Controller#Action:** `settings#index`
- **説明:** アカウントの設定をするページ。

---

### ごみカレンダー
- **URL:** `/trash_calendar/`
- **Controller#Action:** `trash_calendar#index`
- **説明:** 市のごみ時期を表示するページ。

---

### 市のイベントカレンダー
- **URL:** `/city_event_calendar/`
- **Controller#Action:** `city_event_calendar#index`
- **説明:** 市のイベントを表示するページ。

---

### 街のおすすめ情報
- **URL:** `/recommendations`
- **Controller#Action:** `recommendations#index`
- **説明:** おすすめのお店やスポットを一覧表示。

- **URL:** `/recommendations/:id/like`
- **Controller#Action:** `recommendations#like`
- **HTTP Method:** POST
- **説明:** 特定のおすすめ情報に「いいね」を付ける。

---

### 不満送信機能
- **URL:** `/complaints/new`
- **Controller#Action:** `complaints#new`
- **説明:** 不満を入力するページ。

- **URL:** `/complaints`
- **Controller#Action:** `complaints#create`
- **HTTP Method:** POST
- **説明:** 不満を送信する。

---
