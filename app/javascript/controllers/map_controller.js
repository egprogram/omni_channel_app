import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["map", "searchInput", "locateBtn", "listBtn", "spotCards"]

  connect() {
    // Leaflet地図
    const map = L.map(this.mapTarget).setView([36.3121, 139.0411], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // 観光スポット
    const spots = [
      { name:'富岡製糸場', latlng:[36.3127,139.0383], description:'歴史的な製糸工場、日本の近代化の象徴' },
      { name:'妙義山', latlng:[36.2789,138.9295], description:'険しい岩山の景勝地。ハイキングに人気。' },
      { name:'高崎観音', latlng:[36.3228,139.0112], description:'高さ41mの巨大な観音像がそびえる。' }
    ];

    const markers = spots.map(spot => 
      L.marker(spot.latlng).addTo(map)
       .bindPopup(`<b>${spot.name}</b><br>${spot.description}`)
    );

    // Swiperカード生成
    spots.forEach((spot, idx)=>{
      const card = document.createElement("div");
      card.className = "swiper-slide";
      card.innerHTML = `<b>${spot.name}</b><br>${spot.description}`;
      card.addEventListener("click", ()=> {
        map.setView(spot.latlng,15);
        markers[idx].openPopup();
      });
      this.spotCardsTarget.appendChild(card);
    });

    // Swiper初期化
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 20,
});

// 初期表示のスライドに対応するマーカーを開く
markers[swiper.activeIndex].openPopup();
map.setView(spots[swiper.activeIndex].latlng, 15);

// スライド変更時に対応するマーカーに移動
swiper.on('slideChange', () => {
  const idx = swiper.activeIndex;
  const spot = spots[idx];
  map.setView(spot.latlng, 15);
  markers[idx].openPopup();
});

    // 現在地取得
    let currentLocationMarker = null;
    this.locateBtnTarget.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            if (currentLocationMarker) map.removeLayer(currentLocationMarker);
            currentLocationMarker = L.marker([lat,lng], {title:'現在地'})
              .addTo(map).bindPopup("📍 現在地").openPopup();
            map.setView([lat,lng],15);
          },
          err => { alert("現在地を取得できませんでした。"); console.error(err); }
        );
      } else {
        alert("この端末では位置情報が利用できません。");
      }
    });
  }
}
