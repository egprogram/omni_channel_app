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
                    cell.style.flex = (dow === 0 || dow === 6) ? '1.0' : '1';
        
                    if ((week === 0 && dow < startDayOfWeek) || dayCounter > daysInMonth) {
                        // 空セル
                    } else {
                        let daySpan = document.createElement('span');
                        daySpan.className = 'calendar-day';
                        daySpan.textContent = dayCounter;
                        cell.appendChild(daySpan);
        
                        const dateObj = dayjs(`${year}-${month}-${dayCounter}`);
                        const dayOfWeek = dateObj.day(); 
        
                        let noteHTML = '';
                        switch(dayOfWeek) {
                            case 0: // 日曜日
                                noteHTML = `<span style="
                                    background-color: #d32f2f;
                                    color: white;
                                    padding: 2px 5px;
                                    border-radius: 4px;
                                    font-weight: 600;
                                    font-size: 0.4rem;
                                    display: inline-block;
                                    white-space: normal;
                                    word-break: break-word;
                                    max-width: 100%;
                                ">観賞</span>
                                `;
                                break;
                            case 1: // 月曜日
                                noteHTML = `
                                <span style="
                                    background-color: #388e3c;
                                    color: white;
                                    padding: 2px 5px;
                                    border-radius: 4px;
                                    font-weight: 600;
                                    font-size: 0.4rem;
                                    display: inline-block;
                                    white-space: normal;
                                    word-break: break-word;
                                    max-width: 100%;
                                ">祭り</span> 
                                `;
                                break;
                            case 2:
                                noteHTML = `
                                <span style="
                                    background-color: #2f3ad3;
                                    color: white;
                                    padding: 2px 5px;
                                    border-radius: 4px;
                                    font-weight: 600;
                                    font-size: 0.4rem;
                                    display: inline-block;
                                    white-space: normal;
                                    word-break: break-word;
                                    max-width: 100%;
                                ">子育て</span> 
                                `;
                                break;
                            case 4:
                            noteHTML = `
                                <span style="
                                    background-color: black;
                                    color: white;
                                    padding: 2px 5px;
                                    border-radius: 4px;
                                    font-weight: 600;
                                    font-size: 0.4rem;
                                    display: inline-block;
                                    white-space: normal;
                                    word-break: break-word;
                                    max-width: 100%;
                                ">相談</span> 
                                `;
                                break;
                                break;
                        }
        
                        if(noteHTML) {
        let noteSpan = document.createElement('span');
        noteSpan.className = 'calendar-note';
        noteSpan.innerHTML = noteHTML;
        cell.appendChild(noteSpan);
    
        // クリックでハーフモーダル表示
        if([0,1,2,3,4,5,6].includes(dayOfWeek)) {
            noteSpan.style.cursor = 'pointer';
            // ここで現在の日付をキャプチャ
            const thisDay = dayCounter; 
            noteSpan.addEventListener('click', () => {
                const halfModalEl = document.getElementById('halfModal');
                const halfModal = new bootstrap.Offcanvas(halfModalEl);
    
                const monthStr = month.toString().padStart(2,'0');
                const dayStr = thisDay.toString().padStart(2,'0'); 
                const dayName = dateObj.format('(ddd)');
                document.getElementById('halfModalLabel').textContent = `${year}年${monthStr}月${dayStr}日${dayName}`;
                                    const modalBody = halfModalEl.querySelector('.offcanvas-body');
                                    modalBody.innerHTML = `
                                    <div class="card rounded-4 shadow p-3 mb-4 bg-white" style="border-color: rgba(0,0,0,0.1);">
                                        <div class="row g-2">
                                            <!-- 左側の25%は写真 -->
                                            <div class="col-3">
                                                <img src="https://www.city.tokai.aichi.jp/_res/projects/default_project/_page_/001/006/952/2052-9.jpg" alt="企画展の写真" class="img-fluid rounded-3">
                                            </div>
    
                                            <!-- 右側の75%はテキスト -->
                                            <div class="col-9">
                                                <!-- タイトル -->
                                                <p class="card-title mb-1 fw-bold">第14回子ども芸能発表会</p>
                                                <!-- 内容 -->
                                                <p class="card-text mb-0">
                                                    子どもたちが日頃取り組んでいる文化活動や伝統芸能などの発表を行う「子ども芸能発表会」を開催します。
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card rounded-4 shadow p-3 mb-4 bg-white" style="border-color: rgba(0,0,0,0.1);">
                                        <div class="row g-2">
                                            <!-- 左側の25%は写真 -->
                                            <div class="col-3">
                                                <img src="https://www.city.tokai.aichi.jp/_res/projects/default_project/_page_/001/007/863/torichiri2.jpg" alt="企画展の写真" class="img-fluid rounded-3">
                                            </div>
    
                                            <!-- 右側の75%はテキスト -->
                                            <div class="col-9">
                                                <!-- タイトル -->
                                                <p class="card-title mb-1 fw-bold">とまと記念館講習会</p>
                                                <!-- 内容 -->
                                                <p class="card-text mb-0">
                                                とまと記念館で提供している人気メニューをバランスよく組み立て、自分で調理して食べるお得な料理教室です。
メニューは、「焼きケチャップで美味しい鶏チリ」「中華風もやしサラダ」「とまとのスープ」「さつまいもプリン」「とまとジュース」です。
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card rounded-4 shadow p-3 mb-4 bg-white" style="border-color: rgba(0,0,0,0.1);">
                                        <div class="row g-2">
                                            <!-- 左側の25%は写真 -->
                                            <div class="col-3">
                                                <img src="https://www.city.tokai.aichi.jp/_res/projects/default_project/_page_/001/010/284/gazou3.jpg" alt="企画展の写真" class="img-fluid rounded-3">
                                            </div>
    
                                            <!-- 右側の75%はテキスト -->
                                            <div class="col-9">
                                                <!-- タイトル -->
                                                <p class="card-title mb-1 fw-bold">木之下晃メモリアル 公募写真展「寿齢讃歌」</p>
                                                <!-- 内容 -->
                                                <p class="card-text mb-0">
                                                音楽写真家の第一人者・木之下晃氏のライフワークだった公募展「寿齢讃歌」を、東海市芸術劇場にて開催いたします。応募作品は、写真家の英伸三さんより講評をいただき、劇場内アートスペースに展示いたします。
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    `
    
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
        
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(halfModal);
            const modalOpen = offcanvasInstance && offcanvasInstance._isShown;
        
            if (modalOpen && deltaY > 100 && Math.abs(deltaY) > Math.abs(deltaX)) {
                offcanvasInstance.hide();
                return;
            }
        });

    }
}