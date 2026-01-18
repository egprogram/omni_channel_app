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
  { 
    name: '大池公園', 
    latlng: [35.0535, 136.9262], 
    description: '広大な池と自然を楽しめる公園。散策やピクニックに最適。' 
  },
  { 
    name: '横須賀自然緑地', 
    latlng: [35.0652, 136.9174], 
    description: '自然豊かな緑地で、野鳥観察や散歩が楽しめる。' 
  },
  { 
    name: '東海市民文化センター', 
    latlng: [35.0550, 136.9240], 
    description: '地域の文化イベントやコンサートが開催される施設。' 
  },
  { 
    name: '聚楽園の大仏', 
    latlng: [35.0374, 136.9029], 
    description: '東海市を代表する大仏。聚楽園公園内にあり、桜や紅葉も楽しめる。' 
  },
  { 
    name: '東邦ガスエネルギー館', 
    latlng: [35.0411, 136.9062], 
    description: 'エネルギーについて楽しく学べる体験型ミュージアム。家族連れに人気。' 
  },
  { 
    name: '上野大公園', 
    latlng: [35.0268, 136.9223], 
    description: '緑が多く、散歩やジョギングに適した広々とした公園。' 
  },
  { 
    name: '平田公園', 
    latlng: [35.0604, 136.9357], 
    description: '遊具や芝生広場が充実した市民の憩いの場。' 
  }
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
