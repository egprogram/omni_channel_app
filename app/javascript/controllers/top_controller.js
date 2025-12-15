import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="top"
export default class extends Controller {
  connect() {
    // ボタンや入力欄を取得
    const sendBtn = document.getElementById('sendBtn')
    const aiInput = document.getElementById('aiInput')
    const micBtn  = document.getElementById('micBtn')

    // ゴミカレンダーへの遷移
    this.navigateToGarbageCalendar = () => {
      alert('ゴミカレンダーページに遷移します')
    }

    // イベントカレンダーへの遷移
    this.navigateToEventCalendar = () => {
      alert('イベントカレンダーページに遷移します')
    }

    // AI入力の処理
    sendBtn?.addEventListener('click', () => {
      if (aiInput.value.trim()) {
        alert('AI機能は現在開発中です。質問: ' + aiInput.value)
        aiInput.value = ''
      }
    })

    // マイク機能
    micBtn?.addEventListener('click', () => {
      alert('音声入力機能は現在開発中です')
    })

    // Enterキーでの送信
    aiInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendBtn.click()
    })

  }
}
