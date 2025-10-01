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
                        const dayOfWeek = dateObj.day(); // 0=日曜,1=月曜,...,6=土曜
        
                        // ゴミラベル選別
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
                                ">企画展</span>
                                <br>
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
                                ">美術館</span> 
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
                                ">非核平和展</span> 
                                `;
                                break;
                            case 1: // 月曜日
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
                                ">企画展</span>
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
                                ">美術館</span> 
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
                                ">非核平和展</span> 
                                `;
                                break;
                            case 2:
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
                                ">企画展</span>
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
                                ">美術館</span> 
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
                                ">非核平和展</span> 
                                `;
                                break;
                            case 4:
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
                                ">企画展</span>
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
                                ">美術館</span> 
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
                                ">非核平和展</span> 
                                `;
                                break;
                            case 5:
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
                                ">企画展</span>
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
                                ">美術館</span> 
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
                                ">非核平和展</span> 
                                `;
                                break;
                            case 6: // 土曜日
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
                                ">企画展</span>
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
                                ">美術館</span> 
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
                                ">非核平和展</span> 
                                `;
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
                                                <img src="https://www.library-tomioka.annexis.jp/cmsfiles/contents/0000000/138/6.jpg" alt="企画展の写真" class="img-fluid rounded-3">
                                            </div>
    
                                            <!-- 右側の75%はテキスト -->
                                            <div class="col-9">
                                                <!-- タイトル -->
                                                <p class="card-title mb-1 fw-bold">「鳥と植物」企画展</p>
                                                <!-- 内容 -->
                                                <p class="card-text mb-0">
                                                    鳥と植物の魅力ある本を集めてみました。
                                                    展示している図書は借りることができますので、この機会にぜひ読んでみてください。
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card rounded-4 shadow p-3 mb-4 bg-white" style="border-color: rgba(0,0,0,0.1);">
                                        <div class="row g-2">
                                            <!-- 左側の25%は写真 -->
                                            <div class="col-3">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDSRGwbv6ozL77UK0kAeMjChs8rU2NprmJgA&s" alt="企画展の写真" class="img-fluid rounded-3">
                                            </div>
    
                                            <!-- 右側の75%はテキスト -->
                                            <div class="col-9">
                                                <!-- タイトル -->
                                                <p class="card-title mb-1 fw-bold">非核平和展</p>
                                                <!-- 内容 -->
                                                <p class="card-text mb-0">
                                               市は、すべての国の核兵器に反対し、非核三原則を堅持し、人類の平和のため努力することを決意して、「非核平和都市」を宣言しています。
    そこで、広島と長崎に原爆が投下されてから80年の節目の年に、原爆被害の事実を伝え、非核平和を推進するために、非核平和展を拡大して開催します。 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card rounded-4 shadow p-3 mb-4 bg-white" style="border-color: rgba(0,0,0,0.1);">
                                        <div class="row g-2">
                                            <!-- 左側の25%は写真 -->
                                            <div class="col-3">
                                                <img src="https://min-chi.material.jp/mc/materials/background-c/art_museum/_art_museum_1.jpg" alt="企画展の写真" class="img-fluid rounded-3">
                                            </div>
    
                                            <!-- 右側の75%はテキスト -->
                                            <div class="col-9">
                                                <!-- タイトル -->
                                                <p class="card-title mb-1 fw-bold">非核平和展</p>
                                                <!-- 内容 -->
                                                <p class="card-text mb-0">
                                                    本展では、喜多川歌麿、 歌川広重、葛飾北斎、歌川国芳らの人気絵師によって描かれた動物たちを中心に、 江戸中期から明治初期までの浮世絵 約100点を紹介します。 もし、兎や鼠が人のように暮らしていたら、腕に抱いた猫が話しかけてきたら、と想像を巡らしながら、 絵師も動物も 人気モノが勢揃いする浮世絵をお楽しみください
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