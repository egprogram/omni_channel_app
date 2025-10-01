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

### ゴミカレンダー
- **URL:** `/trash-calendar`
- **Controller#Action:** `trash-calendar#index`
- **説明:** 月ごとのゴミ出しカレンダーを表示。

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

### 会計
- **URL:** `/cash/`
- **Controller#Action:** `cash#index`
- **説明:** 不満を入力するページ。

---

### ごみカレンダー
- **URL:** `/trash_calendar/`
- **Controller#Action:** `trash_calendar#index`
- **説明:** 不満を入力するページ。

---

### 市のイベントカレンダー
- **URL:** `/city_event_calendar/`
- **Controller#Action:** `city_event_calendar#index`
- **説明:** 不満を入力するページ。

---

