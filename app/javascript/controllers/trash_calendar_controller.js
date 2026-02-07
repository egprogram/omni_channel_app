// app/javascript/controllers/trash_calendar_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    dayjs.locale('ja');
    
    let currentYear = dayjs().year();
    let currentMonth = dayjs().month() + 1;
    
    // カレンダー描画関数
    function renderCalendar(year, month) {
        document.getElementById('headerYear').textContent = `${year}年`;
        document.getElementById('headerMonth').textContent = `${month}月`;
    
        const calendarEl = document.getElementById('calendar');
        calendarEl.innerHTML = '';
    
        const startOfMonth = dayjs(`${year}-${month}-01`);
        const startDayOfWeek = startOfMonth.day();
        const daysInMonth = startOfMonth.daysInMonth();
    
        let dayCounter = 1;
    
        for (let week = 0; week < 6; week++) {
            let row = document.createElement('div');
            row.className = 'd-flex';
    
            for (let dow = 0; dow < 7; dow++) {
                let cell = document.createElement('div');
                cell.className = 'border calendar-cell';
                cell.style.flex = (dow === 0 || dow === 6) ? '0.5' : '1';
    
                if ((week === 0 && dow < startDayOfWeek) || dayCounter > daysInMonth) {
                    // 空セル
                } else {
                    let daySpan = document.createElement('span');
                    daySpan.className = 'calendar-day';
                    daySpan.textContent = dayCounter;
                    cell.appendChild(daySpan);
    
                    const dateObj = dayjs(`${year}-${month}-${dayCounter}`);
                    const dayOfWeek = dateObj.day(); // 0=日曜,1=月曜,...,6=土曜
    
                    // ゴミラベル選別
                    let noteHTML = '';
                    switch(dayOfWeek) {
                        case 1: // 月曜日
                            noteHTML = `<span style="
                                background-color: #2f3ad3;
                                color: white;
                                padding: 2px 5px;
                                margin-top: 20px;
                                border-radius: 4px;
                                font-weight: 600;
                                font-size: 0.65rem;
                                display: inline-block;
                                white-space: normal;
                                word-break: break-word;
                                max-width: 100%;
                            ">不燃ごみ</span>`;
                            break;
                        case 2: // 火曜日
                        case 5: // 金曜日
                            noteHTML = `<span style="
                                background-color: #d32f2f;
                                color: white;
                                padding: 2px 5px;
                                margin-top: 20px;
                                border-radius: 4px;
                                font-weight: 600;
                                font-size: 0.65rem;
                                display: inline-block;
                                white-space: normal;
                                word-break: break-word;
                                max-width: 100%;
                            ">可燃ごみ</span>`;
                            break;
                    }
    
                    if(noteHTML) {
    let noteSpan = document.createElement('span');
    noteSpan.className = 'calendar-note';
    noteSpan.innerHTML = noteHTML;
    cell.appendChild(noteSpan);

    // ゴミクリックでハーフモーダル表示
    if([1,2,4,5].includes(dayOfWeek)) {
        noteSpan.style.cursor = 'pointer';
        // ここで現在の日付をキャプチャ
        const thisDay = dayCounter; 
        noteSpan.addEventListener('click', () => {
            const halfModalEl = document.getElementById('halfModal');
            const halfModal = new bootstrap.Offcanvas(halfModalEl);

            const monthStr = month.toString().padStart(2,'0');
            const dayStr = thisDay.toString().padStart(2,'0'); // ← dayCounterではなく thisDay
            const dayName = dateObj.format('(ddd)');
            document.getElementById('halfModalLabel').textContent = `${year}年${monthStr}月${dayStr}日${dayName}`;
 
                                // ゴミ種別ごとの内容
                                let imgSrc = '';
                                let infoHTML = '';
                                switch(dayOfWeek) {
                                    case 1: // 月曜
                                        imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcxMswD1AAYUECN141o58eyB8NCFFltkVNGg&s';
                                        infoHTML = `
                                            <ul style="font-size:0.75rem; font-weight:bold;">
                                                <li>割れ物や金属類はまとめる</li>
                                                <li>ガラス瓶は中をすすぐ</li>
                                                <li>危険物は除く</li>
                                            </ul>`;
                                        break;
                                    case 2: // 火曜
                                    case 5: // 金曜
                                        imgSrc = 'https://www.city.toyokawa.lg.jp/material/images/group/34/kanengomi.jpg';
                                        infoHTML = `
                                            <ul style="font-size:0.75rem; font-weight:bold;">
                                                <li>生ごみは水分をよく切る</li>
                                                <li>少量の食用油は固めるか布に含ませる</li>
                                                <li>枝は直径10cm以下、長さは60cm以下にして、30cmくらいに束ねる</li>
                                            </ul>`;
                                        break;
                                }
    
                                const modalBody = halfModalEl.querySelector('.offcanvas-body');
                                modalBody.innerHTML = `
                                    <img src="${imgSrc}" alt="ゴミイメージ" style="max-width:100%; height:auto; display:block; margin-bottom:1rem;">
                                    ${infoHTML}
                                `;
    
                                halfModal.show();
                            });
                        }
                    }
    
                    dayCounter++;
                }
                row.appendChild(cell);
            }
            calendarEl.appendChild(row);
        }
    }
    
    // 今日ボタン
    function goToToday() {
        currentYear = dayjs().year();
        currentMonth = dayjs().month() + 1;
        renderCalendar(currentYear, currentMonth);
    }
    
    // 初期表示
    renderCalendar(currentYear, currentMonth);
    document.getElementById('todayBtn').addEventListener('click', goToToday);
    
    // スワイプで月移動
    let startX = 0;
    document.addEventListener('touchstart', (e) => {
        const halfModal = document.getElementById('halfModal');
        if (halfModal && halfModal.classList.contains('show')) return;
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', (e) => {
        const halfModal = document.getElementById('halfModal');
        if (halfModal && halfModal.classList.contains('show')) return;
    
        const diffX = e.changedTouches[0].clientX - startX;
        if (diffX > 100) {
            currentMonth--;
            if (currentMonth < 1) { currentMonth = 12; currentYear--; }
            renderCalendar(currentYear, currentMonth);
        } else if (diffX < -100) {
            currentMonth++;
            if (currentMonth > 12) { currentMonth = 1; currentYear++; }
            renderCalendar(currentYear, currentMonth);
        }
    });

    const halfModal = document.getElementById('halfModal');
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
        endY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
    
        // モーダルが開いている場合は右・左スワイプは無視
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(halfModal);
        const modalOpen = offcanvasInstance && offcanvasInstance._isShown;
    
        // 下スワイプはモーダル内で処理
        if (modalOpen && deltaY > 100 && Math.abs(deltaY) > Math.abs(deltaX)) {
            offcanvasInstance.hide();
            return;
        }
    });
  }
}
