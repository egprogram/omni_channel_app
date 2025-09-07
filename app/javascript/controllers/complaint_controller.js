import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="complaint"
export default class extends Controller {
  static targets = ["formScreen", "successScreen", "complaintForm", "charCount"]

  connect() {
    // カテゴリ選択
    this.element.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('selected')
      })
    })

    // 文字数カウント
    const complaintText = this.element.querySelector('#complaintText')
    complaintText.addEventListener('input', () => {
      const remaining = 1000 - complaintText.value.length
      this.charCountTarget.textContent = remaining
      this.charCountTarget.style.color = remaining < 100 ? '#dc3545' : '#6c757d'
    })
  }

  submit(e) {
    e.preventDefault()

    const categories = Array.from(this.element.querySelectorAll('.category-chip.selected'))
    const priority = this.element.querySelector('input[name="priority"]:checked')
    const complaintText = this.element.querySelector('#complaintText')

    if (categories.length === 0) { alert("カテゴリーを選択してください"); return }
    if (!priority) { alert("緊急度を選択してください"); return }
    if (!complaintText.value.trim()) { alert("内容を入力してください"); return }

    const submitBtn = this.element.querySelector('.submit-btn')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>送信中...'
    submitBtn.disabled = true

    setTimeout(() => {
      // 疑似的に完了画面表示
      const now = new Date()
      this.element.querySelector('#receiptNumber').textContent = "TM-" + now.getFullYear() + "-" + Math.floor(Math.random() * 900000 + 100000)
      this.element.querySelector('#receiptDate').textContent = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
      this.element.querySelector('#receiptCategory').textContent = categories.map(c => c.textContent).join("、")
      this.element.querySelector('#receiptPriority').textContent = priority.parentElement.querySelector("strong").textContent

      this.formScreenTarget.classList.add("d-none")
      this.successScreenTarget.classList.remove("d-none")

      this.complaintFormTarget.reset()
      categories.forEach(chip => chip.classList.remove("selected"))
      this.charCountTarget.textContent = "1000"

      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  }

  showForm() {
    this.successScreenTarget.classList.add("d-none")
    this.formScreenTarget.classList.remove("d-none")
  }

  goHome() {
    Turbo.visit("/") // Railsのトップに戻す
  }
}
