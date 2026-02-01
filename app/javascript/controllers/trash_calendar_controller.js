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
                        case 4: // 木曜日
                            noteHTML = `<span style="
                                background-color: #388e3c;
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
                            ">プラ容器包装</span>`;
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
                                    case 4: // 木曜
                                        imgSrc = 'data:image/jpeg;base64,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';
                                        infoHTML = `
                                            <ul style="font-size:0.75rem; font-weight:bold;">
                                                <li>プラスチック容器や包装は軽くすすぐ</li>
                                                <li>ラベルやキャップは外す</li>
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
