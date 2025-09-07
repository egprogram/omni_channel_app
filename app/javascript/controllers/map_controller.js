// app/javascript/controllers/map_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["map", "spotCards", "searchInput", "locateBtn", "listBtn"]

  connect() {
    this.initializeMap()
    this.addTouristSpots()
    this.initializeSwiper()
    this.setupEventListeners()
  }

  disconnect() {
    // コンポーネントが削除される時のクリーンアップ
    if (this.map) {
      this.map.remove()
    }
    if (this.swiper) {
      this.swiper.destroy()
    }
  }

  initializeMap() {
    // Leaflet地図の初期化
    this.map = L.map(this.mapTarget).setView([36.3121, 139.0411], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    // 現在地マーカー用
    this.currentLocationMarker = null
  }

  addTouristSpots() {
    // 観光スポットデータ
    this.spots = [
      {
        name: '富岡製糸場',
        latlng: [36.3127, 139.0383],
        description: '歴史的な製糸工場、日本の近代化の象徴'
      },
      {
        name: '妙義山',
        latlng: [36.2789, 138.9295],
        description: '険しい岩山の景勝地。ハイキングに人気。'
      },
      {
        name: '高崎観音',
        latlng: [36.3228, 139.0112],
        description: '高さ41mの巨大な観音像がそびえる。'
      }
    ]

    // マーカー追加
    this.markers = this.spots.map(spot =>
      L.marker(spot.latlng)
        .addTo(this.map)
        .bindPopup(`<b>${spot.name}</b><br>${spot.description}`)
    )

    this.generateSpotCards()
  }

  generateSpotCards() {
    // Swiperカード生成
    if (!this.hasSpotCardsTarget) return

    this.spots.forEach((spot, idx) => {
      const card = document.createElement("div")
      card.className = "swiper-slide"
      card.innerHTML = `<b>${spot.name}</b><br>${spot.description}`

      card.addEventListener("click", () => {
        this.focusSpot(spot, idx)
      })

      this.spotCardsTarget.appendChild(card)
    })
  }

  focusSpot(spot, index) {
    // 指定されたスポットにフォーカス
    this.map.setView(spot.latlng, 15)
    this.markers[index].openPopup()
  }

  initializeSwiper() {
    // Swiper初期化
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      freeMode: true
    })
  }

  setupEventListeners() {
    // 検索機能（簡易版）
    if (this.hasSearchInputTarget) {
      this.searchInputTarget.addEventListener('input', (e) => {
        this.searchSpots(e.target.value)
      })
    }
  }

  searchSpots(query) {
    // 簡易検索機能
    if (!query) return

    const matchingSpot = this.spots.find(spot =>
      spot.name.includes(query) || spot.description.includes(query)
    )

    if (matchingSpot) {
      const index = this.spots.indexOf(matchingSpot)
      this.focusSpot(matchingSpot, index)
    }
  }

  // Stimulusアクション - 現在地取得
  getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("この端末では位置情報が利用できません。")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        // 既存の現在地マーカーを削除
        if (this.currentLocationMarker) {
          this.map.removeLayer(this.currentLocationMarker)
        }

        // 新しい現在地マーカーを追加
        this.currentLocationMarker = L.marker([lat, lng], { title: '現在地' })
          .addTo(this.map)
          .bindPopup("📍 現在地")
          .openPopup()

        // 地図を現在地に移動
        this.map.setView([lat, lng], 15)
      },
      (error) => {
        alert("現在地を取得できませんでした。")
        console.error(error)
      }
    )
  }

  // Stimulusアクション - リスト表示
  showSpotList() {
    // リスト表示機能（モーダルやサイドバーで実装可能）
    const spotList = this.spots.map((spot, index) =>
      `${index + 1}. ${spot.name} - ${spot.description}`
    ).join('\n')

    alert(`観光スポット一覧:\n\n${spotList}`)
  }

  // Stimulusアクション - ホーム画面に戻る
  goBack() {
    // ブラウザの戻るボタンと同じ動作
    window.history.back()
  }

  // Stimulusアクション - 特定のスポットを表示
  showSpot(event) {
    const spotIndex = parseInt(event.params.index)
    const spot = this.spots[spotIndex]
    if (spot) {
      this.focusSpot(spot, spotIndex)
    }
  }
}
