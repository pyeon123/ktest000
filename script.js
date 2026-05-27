const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-LVXKNBELZQ";
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LVXKNBELZQ');
let currentIdx = 0;
let activeCatId = "";
let activeCategoryName = ""; 
let currentCategoryData = [];
let silenceTimer = null;
let todayQuizData = null;

const recognition = (window.SpeechRecognition || window.webkitSpeechRecognition) ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() : null;
if (recognition) { recognition.lang = 'ko-KR'; }

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).catch(console.error);
    } else {
        alert("Link copied! Share it with your friends. 😊");
    }
}

function visitFacebook() {
    window.open("https://www.facebook.com/profile.php?id=100091484077264", "_blank");
}

// 🟢 카테고리별 동적 SEO 업데이트 함수
function updateSEOData(catId) {
    if (!catId) {
        // 메인 홈 화면용 기본 SEO
        document.getElementById('seo-title').innerText = "Learn Korean Game: 1,000+ Word Quiz (FREE)";
        document.getElementById('seo-desc').setAttribute("content", "Master Korean through fun interactive games! Challenge yourself with over 1,000 Korean Word quizzes. Perfect for K-Drama fans and learners worldwide.");
        document.getElementById('main-header').innerText = "Learn Korean Game: 1,000+ Word Quiz";
        injectSafeSEOData(null);
        return;
    }

    const cat = allQuizData[catId];
    if (cat) {
        // 카테고리에 맞는 Title, Description, H1 동적 변경
        document.getElementById('seo-title').innerText = `Learn ${cat.name} in Korean - Free Interactive Quiz`;
        document.getElementById('seo-desc').setAttribute("content", `Master essential Korean ${cat.name} vocabulary. Practice pronunciation and test your skills with our free interactive ${cat.name} quiz!`);
        document.getElementById('main-header').innerText = `Korean ${cat.name} Vocabulary Quiz`;
        injectSafeSEOData(catId);
    }
}

// 🟢 JSON-LD 구조화된 데이터 동적 주입
function injectSafeSEOData(specificCatId) {
    let oldScript = document.getElementById('dynamic-json-ld');
    if(oldScript) oldScript.remove();

    const script = document.createElement('script');
    script.id = 'dynamic-json-ld';
    script.type = 'application/ld+json';

    let jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": specificCatId ? `${allQuizData[specificCatId].name} Korean Vocabulary Quiz` : "Learn Korean Game: 1,000+ Word Quiz",
        "description": specificCatId ? `Interactive learning for Korean ${allQuizData[specificCatId].name} words.` : "Interactive Korean language learning game with real-life vocabulary.",
        "provider": {
            "@type": "Organization",
            "name": "Learn korean with korean dramas phrases",
            "sameAs": "https://www.facebook.com/profile.php?id=100091484077264"
        },
        "hasPart": []
    };

    const categoriesToProcess = specificCatId ? { [specificCatId]: allQuizData[specificCatId] } : allQuizData;

    for (const catKey in categoriesToProcess) {
        const category = categoriesToProcess[catKey];
        let categoryResource = {
            "@type": "LearningResource",
            "name": category.name + " Vocabulary",
            "learningResourceType": "Vocabulary List",
            "about": []
        };
        category.data.slice(0, 10).forEach(item => { // SEO 성능을 위해 최대 10개 항목만 인덱싱
            categoryResource.about.push({
                "@type": "DefinedTerm",
                "termCode": item.en,
                "name": item.kr,
                "description": item.tip
            });
        });
        jsonLdData.hasPart.push(categoryResource);
    }

    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);
}

function addToHome() {
    alert("How to Save this App:\n\n1. Click [3 dots] or [Share] icon at the TOP or BOTTOM.\n2. Select 'Add to Home Screen'.\n\nThen you can use this like a real app! ✨");
}

function sendEmail() {
    const mailUrl = "mailto:topkcc@gmail.com?subject=Question%20from%20Korean%20App";
    window.location.href = mailUrl;
}

function forceExternalBrowser() {
    const url = window.location.href.replace(/^https?:\/\//, '');
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('kakaotalk')) {
        location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(window.location.href);
    } else if (userAgent.includes('android')) {
        location.href = 'intent://' + url + '#Intent;scheme=https;package=com.android.chrome;end';
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        window.open(window.location.href, '_blank');
        alert("If the sound doesn't work, please click the '...' menu and select 'Open in Safari'.");
    } else {
        window.open(window.location.href, '_blank', 'width=900,height=1050');
    }
}
function initMenu() {
    const list = document.getElementById('category-list');
    if (!list) return;

    const fileMapping = {
        "cat_01": "family.html",
        "cat_02": "food.html",
        "cat_03": "places.html",
        "cat_04": "transport.html",
        "cat_05": "animals.html",
        "cat_06": "clothes.html",
        "cat_07": "nature.html",
        "cat_08": "hobbies.html",
        "cat_09": "body.html",
        "cat_10": "Jobs.html",
        "cat_11": "emotions.html",
        "cat_12": "kitchen.html",
        "cat_13": "electronics.html",
        "cat_14": "health.html",
        "cat_15": "fruits.html",
        "cat_16": "colors.html",
        "cat_17": "school.html",
        "cat_18": "time.html",
        "cat_19": "sports.html",
        "cat_20": "furniture.html",
        "cat_21": "buildings.html",
        "cat_22": "landscapes.html",
        "cat_23": "word.html",
        "cat_24": "vocabulary.html",
    };

    let html = "";
    Object.keys(allQuizData).forEach(catId => {
        const cat = allQuizData[catId];
        const targetUrl = fileMapping[catId] || "index.html"; 

        html += `
            <a href="${targetUrl}" class="cat-btn" style="text-decoration:none; color:inherit; display:block;">
                <span class="emoji">${cat.emoji}</span>
                <span>${cat.name}</span>
            </a>`;
    });
    list.innerHTML = html;
}

function startQuiz(catId, updateHistory = false) {
    activeCatId = catId;
    currentCategoryData = allQuizData[catId].data;
    activeCategoryName = allQuizData[catId].name; 

    if (updateHistory) {
        window.history.pushState({cat: catId}, '', `?cat=${catId}`);
    }
    
    updateSEOData(catId);
    
    currentIdx = 0;
    document.getElementById('menu-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    
    document.getElementById('top-open-btn').style.display = 'block';
    loadQuiz(true);
}

function loadQuiz(autoSpeak = false) {
    resetRecognitionState();
    const data = currentCategoryData[currentIdx];
    
    document.getElementById('situation').textContent = `${allQuizData[activeCatId].name}`;

    const tipEl = document.getElementById('category-tip-text');
    if (tipEl) {
        tipEl.textContent = data.tip || "Listen and repeat the phrase!";
    }

    document.getElementById('korean-sentence').textContent = data.kr;
    document.getElementById('romanization').textContent = data.rom; 
    document.getElementById('feedback').textContent = "";
    
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    let choices = [{text: data.en, isCorrect: true}];
    
    let others = currentCategoryData.filter(item => item.en !== data.en);
    shuffleArray(others);
    if (others[0]) choices.push({text: others[0].en, isCorrect: false});
    if (others[1]) choices.push({text: others[1].en, isCorrect: false});
    
    shuffleArray(choices);
    choices.forEach((choice, i) => {
        const btn = document.createElement('button'); 
        btn.className = 'opt-item';
        btn.textContent = (i + 1) + ". " + choice.text;
        btn.onclick = () => checkAnswer(choice.isCorrect, data);
        container.appendChild(btn);
    });
    if (autoSpeak) { setTimeout(speak, 1000); }
}

function checkAnswer(isCorrect, quiz) {
    if (isCorrect) {
        // 1. 기존 퀴즈 화면 확실하게 가리기
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) {
            quizScreen.classList.remove('active');
            quizScreen.style.display = 'none';
        }
        
        // 2. 결과 상세창 생성 및 조율
        let detailArea = document.getElementById('detail-area');
        if (!detailArea) {
            detailArea = document.createElement('div');
            detailArea.id = 'detail-area';
            detailArea.className = 'screen';
            
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
                contentArea.appendChild(detailArea);
            } else {
                document.body.appendChild(detailArea);
            }
        }

        // 🔄 다른 카테고리 추천 버튼 시스템
        const allIds = Object.keys(allQuizData);
        const others = allIds.filter(id => id !== activeCatId);
        let randomCat = "";
        let catData = null;
        let recHtml = "";

        if (others.length > 0) {
            randomCat = others[Math.floor(Math.random() * others.length)];
            catData = allQuizData[randomCat];
            recHtml = `
                <div style="margin: 20px 0;">
                    <button id="rec-btn" style="width: 100%; padding: 12px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold;">
                        🔄 Try another: ${catData.emoji} ${catData.name}
                    </button>
                </div>`;
        }

        // 📚 핵심 예문 출력 영역 (🔊 LISTEN / 🎤 SPEAK / 손 이모지 기능 완벽 유지)
        let examplesHtml = "";
        if (quiz.examples && Array.isArray(quiz.examples)) {
            examplesHtml = `
                <h3 style="margin-top: 25px; color: #1e293b;">📚 Key Sentences</h3>
                <ul style="list-style: none; padding: 0; margin-bottom: 20px;">
                    ${quiz.examples.map((ex, idx) => `
                        <li style="margin-bottom: 15px; padding: 15px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                            <strong style="font-size: 1.3rem; display: block; margin-bottom: 5px; color: #1e293b;">${ex.kr}</strong>
                            <span style="font-size: 1.1rem; color: #64748b; display: block; margin-bottom: 5px;">${ex.en}</span>
                            <em style="color: var(--primary); font-size: 1rem; display: block; margin-bottom: 10px;">${ex.rom || ''}</em>
                            
                            <div class="control-group" style="scale: 0.85; margin: 10px 0 0 0; justify-content: center; gap: 10px;">
                                <button class="btn-main" onclick="event.stopPropagation(); speakExampleText('${ex.kr.replace(/'/g, "\\'")}')">
                                    <span class="icon">🔊</span><span style="font-size: 0.8rem;">LISTEN</span>
                                </button>
                                <button class="btn-main" id="ex-mic-btn-${idx}" onclick="event.stopPropagation(); startExampleRecognition('${ex.kr.replace(/'/g, "\\'")}', ${idx})">
                                    <span class="icon">🎤</span><span style="font-size: 0.8rem;">SPEAK</span>
                                </button>
                            </div>
                            <div id="ex-feedback-${idx}" style="height: 25px; font-weight: 900; font-size: 1.1rem; margin-top: 5px; text-align: center;"></div>
                        </li>
                    `).join('')}
                </ul>
            `;
        }

        // ✨ [핵심 알고리즘] 데이터 포맷 유연성 확보 (Present/Past/Future vs Casual/Polite 자동 판별)
        let formsHtml = "";
        if (quiz.forms && (quiz.forms.present || quiz.forms.past || quiz.forms.future)) {
            // 구조 A: 동사/단어형 (Present, Past, Future)
            formsHtml = `
                <p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #10b981;"><strong>Present:</strong> ${quiz.forms.present || '---'}</p>
                <p style="margin: 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Past:</strong> ${quiz.forms.past || '---'}</p>
                <p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Future:</strong> ${quiz.forms.future || '---'}</p>
            `;
        } else {
            // 구조 B: 회화/문장형 (Casual, Polite 구조이거나 껍데기만 있을 때 방어 추출)
            const casualText = (quiz.forms && quiz.forms.casual) || quiz.casual || quiz.kr || "---";
            const politeText = (quiz.forms && quiz.forms.polite) || quiz.polite || quiz.kr || "---";
            formsHtml = `
                <p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Casual:</strong> ${casualText}</p>
                <p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Polite:</strong> ${politeText}</p>
            `;
        }

        const situationText = quiz.situation || "No context provided.";

        // 화면 렌더링 주입
        detailArea.innerHTML = `
            <div class="result-container" style="padding: 20px; width: 100%; max-width: 600px; margin: 0 auto;">
                <h2 style="text-align: center; color: var(--primary);">⭕ Correct! 🎉</h2>
                <div class="info-box" style="margin: 15px 0; padding: 15px; border: 2px solid #e2e8f0; border-radius: 10px; background: #f8fafc;">
                    <p style="margin: 5px 0; font-size: 1.1rem;"><strong>Context:</strong> ${situationText}</p>
                    ${formsHtml}
                </div>
                ${examplesHtml}
                ${recHtml}
                <div style="margin-top: 20px;">
                    <button id="next-btn" class="esim-btn-link" style="width: 100%; margin-bottom: 15px; padding: 15px; border: none; cursor: pointer;">Next Quiz ⏭️</button>
                    <button id="home-btn" class="esim-btn-link" style="width: 100%; padding: 15px; background: #64748b; border: none; cursor: pointer;">🏠 Home</button>
                </div>
            </div>
        `;
        
        // 3. 결과창 화면 켜기 및 최상단 스크롤
        detailArea.classList.add('active');
        detailArea.style.display = 'block';
        window.scrollTo(0, 0);

        // 기능 작동 인터페이스 바인딩
        document.getElementById('next-btn').onclick = nextQuiz;
        document.getElementById('home-btn').onclick = () => window.location.href = 'index.html';
        
        const recBtn = document.getElementById('rec-btn');
        if (recBtn) {
            recBtn.onclick = () => {
                const fileMapping = {
                    "cat_01": "family.html", "cat_02": "food.html", "cat_03": "places.html",
                    "cat_04": "transport.html", "cat_05": "animals.html", "cat_06": "clothes.html",
                    "cat_07": "nature.html", "cat_08": "hobbies.html", "cat_09": "body.html",
                    "cat_10": "Jobs.html", "cat_11": "emotions.html", "cat_12": "kitchen.html",
                    "cat_13": "electronics.html", "cat_14": "health.html", "cat_15": "fruits.html",
                    "cat_16": "colors.html", "cat_17": "school.html", "cat_18": "time.html",
                    "cat_19": "sports.html", "cat_20": "furniture.html", "cat_21": "buildings.html",
                    "cat_22": "landscapes.html", "cat_23": "word.html", "cat_24": "vocabulary.html"
                };
                const targetFile = fileMapping[randomCat] || "index.html";
                window.location.href = targetFile;
            };
        }
    } else {
        alert("Try Again! ❌");
    }
}

function goToQuiz() {
    nextQuiz(); 
} 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetRecognitionState() {
    if (silenceTimer) clearTimeout(silenceTimer);
    if (recognition) { try { recognition.stop(); } catch(e) {} }
    const micBtn = document.getElementById('mic-btn');
    if(micBtn) micBtn.classList.remove('recording');
}

function startSpeechRecognition() {
    if (!recognition) return;
    resetRecognitionState();
    const micBtn = document.getElementById('mic-btn');
    const feedback = document.getElementById('feedback');
    micBtn.classList.add('recording');
    feedback.textContent = "Please speak now...";
    feedback.style.color = "#4f46e5";
    
    recognition.start();
    silenceTimer = setTimeout(() => {
        resetRecognitionState();
        feedback.textContent = "No voice detected. Try again!";
        feedback.style.color = "#ef4444";
    }, 3500);
    
    recognition.onresult = (event) => {
        clearTimeout(silenceTimer);
        const speech = event.results[0][0].transcript;
        const target = currentCategoryData[currentIdx].kr.replace(/[?!\s~]/g,'');
        const voiced = speech.replace(/[?!\s~]/g,'');
        
        if (voiced.includes(target) || target.includes(voiced)) {
            feedback.textContent = "Excellent!";
            feedback.style.color = "#22c55e";
        } else {
            feedback.textContent = "Try Again";
            feedback.style.color = "#ef4444";
        }
        micBtn.classList.remove('recording');
    };
    recognition.onerror = () => resetRecognitionState();
    recognition.onend = () => micBtn.classList.remove('recording');
}

function nextQuiz() {
    currentIdx++;
    if (currentIdx < currentCategoryData.length) {
        const detailArea = document.getElementById('detail-area');
        if (detailArea) detailArea.classList.remove('active');
        
        document.getElementById('quiz-screen').classList.add('active');
        loadQuiz(true);
    } else {
        alert("🎉 모든 퀴즈를 완료했습니다! 수고하셨습니다!");
        goHome(); 
    }
}

function speak() {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(document.getElementById('korean-sentence').textContent);
    msg.lang = 'ko-KR'; msg.rate = 0.8; window.speechSynthesis.speak(msg);
}

function goHome() {
    resetRecognitionState();

    if (typeof CURRENT_CAT !== 'undefined') {
        window.location.href = 'index.html'; 
        return;
    }

    document.getElementById('menu-screen').classList.add('active');
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('top-open-btn').style.display = 'none';
    
    window.history.pushState({}, '', window.location.pathname);
    updateSEOData(null); 
    
    closeTodayQuiz();
    hideGuide();
}

const adTexts = [
    "No internet in Korea? You'll need data!",
    "Maps won't work without internet",
    "Travel Korea stress-free with eSIM",
    "Instant internet access in Korea"
];
let adIdx = 0;
setInterval(() => {
    adIdx = (adIdx + 1) % adTexts.length;
    const el = document.getElementById("ad-content");
    if(el) {
        el.style.animation = 'none';
        el.offsetHeight; 
        el.style.animation = 'fadeMove 0.6s ease-out';
        el.innerText = adTexts[adIdx];
    }
}, 4500);

function showCorrectAnswer() {
    const quiz = currentCategoryData[currentIdx];
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = "";
    
    const answerSpan = document.createElement('span');
    answerSpan.className = "answer-text";
    answerSpan.innerText = quiz.en; 
    feedback.appendChild(answerSpan);
    speak();
}

function expandTodayQuiz() {
    const content = document.getElementById('today-quiz-content');
    const title = document.getElementById('today-title');
    const section = document.getElementById('today-quiz-section');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        title.textContent = "TODAY'S QUIZ";
        title.style.marginBottom = "15px";
        section.style.cursor = "default";
        setupTodayQuiz();
        displayCurrentTip();
    }
}

function closeTodayQuiz() {
    const content = document.getElementById('today-quiz-content');
    const title = document.getElementById('today-title');
    const section = document.getElementById('today-quiz-section');
    if (content) content.style.display = 'none';
    if (title) {
        title.textContent = "CLICK FOR TODAY'S QUIZ";
        title.style.marginBottom = "0px";
    }
    if (section) section.style.cursor = "pointer";
}  

function setupTodayQuiz() {
    if(typeof todaySpecialData === 'undefined') return;
    todayQuizData = todaySpecialData[Math.floor(Math.random() * todaySpecialData.length)];
    document.getElementById('today-kr').textContent = todayQuizData.kr;
    document.getElementById('today-rom').textContent = todayQuizData.rom;

    const container = document.getElementById('today-options');
    container.innerHTML = "";
    
    let choices = [{text: todayQuizData.en, isCorrect: true}];
    let others = todaySpecialData.filter(item => item.en !== todayQuizData.en);
    shuffleArray(others);
    choices.push({text: others[0].en, isCorrect: false}, {text: others[1].en, isCorrect: false});
    shuffleArray(choices); 

    choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.className = 'opt-item';
        btn.style.padding = "12px";
        btn.style.fontSize = "1.2rem"; 
        btn.textContent = choice.text;
        btn.onclick = () => checkTodayAnswer(choice.isCorrect);
        container.appendChild(btn);
    });

    setTimeout(todaySpeak, 1500);
}

function todaySpeak() {
    if(!todayQuizData) return;
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(todayQuizData.kr);
    msg.lang = 'ko-KR';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
}

function checkTodayAnswer(isCorrect) {
    const feedback = document.getElementById('today-feedback');
    if (isCorrect) {
        feedback.textContent = "Excellent! 🎉";
        feedback.style.color = "#22c55e";
    } else {
        feedback.textContent = "Try Again! ❌";
        feedback.style.color = "#ef4444";
    }
}

function showTodayAnswer() {
    if(!todayQuizData) return;
    alert("The correct answer is: " + todayQuizData.en);
}

function startTodayRecognition() {
    if (!recognition) return;
    const micBtn = document.getElementById('today-mic-btn');
    const feedback = document.getElementById('today-feedback');
    
    micBtn.classList.add('recording');
    feedback.textContent = "Please speak now...";
    
    recognition.start();
    recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript;
        const target = todayQuizData.kr.replace(/[?!\s~]/g,'');
        const voiced = speech.replace(/[?!\s~]/g,'');
        
        if (voiced.includes(target) || target.includes(voiced)) {
            feedback.textContent = "Excellent! 🎤";
            feedback.style.color = "#22c55e";
        } else {
            feedback.textContent = "Try Again! ❌";
            feedback.style.color = "#ef4444";
        }
        micBtn.classList.remove('recording');
    };
    recognition.onerror = () => {
        micBtn.classList.remove('recording');
        feedback.textContent = "Error occurred. Try again.";
    };
}

function displayCurrentTip() {
    const el = document.getElementById('teacher-tip-text');
    if (el && todayQuizData && todayQuizData.tip) {
        el.style.fontSize = "1.5rem";
        el.style.fontWeight = "800";
        el.style.color = "#5f3e07";
        el.textContent = todayQuizData.tip;
    }
}

function showGuide() {
    const guideBox = document.getElementById('guide-box');
    const guideContent = document.getElementById('guide-content');
    if (guideBox && guideContent) {
        guideBox.style.display = 'none';
        guideContent.style.display = 'block';
    }
}

function hideGuide() {
    const guideBox = document.getElementById('guide-box');
    const guideContent = document.getElementById('guide-content');
    if (guideBox && guideContent) {
        guideContent.style.display = 'none';
        guideBox.style.display = 'block';
    }
}

document.addEventListener('click', function(event) {
    const guideBox = document.getElementById('guide-box');
    const guideContent = document.getElementById('guide-content');
    if (guideContent && guideContent.style.display === 'block') {
        if (!guideBox.contains(event.target) && !guideContent.contains(event.target)) {
            hideGuide(); 
        }
    }
});

// 🔥 [100% 철통 방어막이 완성된 가동 엔진 부분]
document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isInApp = /kakaotalk|fbav|instagram|line|naver|snapchat|zum|tistory/i.test(userAgent);
    
    if (isInApp) {
        const openBtn = document.getElementById('top-open-btn');
        if (openBtn) openBtn.style.display = 'block';
    }

    // 💡 feelings.html용 절대 뚫리지 않는 강력한 매칭 로직
    if (window.location.pathname.includes('feelings.html')) {
        if (typeof allQuizData === 'undefined') window.allQuizData = {};
        
        // 1. 만약 HTML 파일 내부에 커스텀 feelingsData가 존재한다면 안전하게 연동시킵니다.
        if (window.feelingsData) {
            allQuizData['cat_feelings'] = window.feelingsData;
        }
        
        // 2. 최종 데이터를 판별하여 데이터 유실로 인한 대기화면 복귀 현상을 완전히 차단합니다.
        if (allQuizData['cat_feelings']) {
            window.CURRENT_CAT = 'cat_feelings';
        } else if (allQuizData['cat_11']) {
            window.CURRENT_CAT = 'cat_11'; // data.js 내부의 Emotions 카테고리로 안전 백업
        } else {
            // 3. 최악의 상황(둘 다 없을 때)에도 에러로 멈추지 않도록 최소한의 임시 방어막 구축
            allQuizData['cat_feelings'] = { name: "Feelings", emoji: "😊", data: [] };
            window.CURRENT_CAT = 'cat_feelings';
        }
    }

    // 🚀 최종 검증 후 퀴즈 화면으로 즉시 직행
    if (typeof CURRENT_CAT !== 'undefined' && typeof allQuizData !== 'undefined' && allQuizData[CURRENT_CAT]) {
        startQuiz(CURRENT_CAT, false); 
    }  
    else {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('cat'); 

        if (category && typeof allQuizData !== 'undefined' && allQuizData[category]) {
            startQuiz(category, false);
        } else {
            initMenu();
            updateSEOData(null); 
        }
    }
});

// 🟢 예문 전용 추가 함수
function speakExampleText(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ko-KR'; 
    msg.rate = 0.8; 
    window.speechSynthesis.speak(msg);
}

function startExampleRecognition(targetText, idx) {
    if (!recognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }
    
    resetRecognitionState(); 
    
    const micBtn = document.getElementById(`ex-mic-btn-${idx}`);
    const feedback = document.getElementById(`ex-feedback-${idx}`);
    
    micBtn.classList.add('recording');
    feedback.textContent = "Please speak now...";
    feedback.style.color = "#4f46e5";
    
    recognition.start();
    
    silenceTimer = setTimeout(() => {
        resetRecognitionState();
        micBtn.classList.remove('recording');
        feedback.textContent = "No voice detected. Try again!";
        feedback.style.color = "#ef4444";
    }, 4200);

    recognition.onresult = (event) => {
        clearTimeout(silenceTimer);
        const speech = event.results[0][0].transcript;
        
        const target = targetText.replace(/[?!\s~,.]/g,'');
        const voiced = speech.replace(/[?!\s~,.]/g,'');
        
        if (voiced.includes(target) || target.includes(voiced)) {
            feedback.textContent = "Excellent! 🎉";
            feedback.style.color = "#22c55e";
        } else {
            feedback.textContent = "Try Again! ❌";
            feedback.style.color = "#ef4444";
        }
        micBtn.classList.remove('recording');
    };
    
    recognition.onerror = () => {
        clearTimeout(silenceTimer);
        resetRecognitionState();
        micBtn.classList.remove('recording');
        feedback.textContent = "Error occurred. Try again.";
        feedback.style.color = "#ef4444";
    };
    
    recognition.onend = () => {
        micBtn.classList.remove('recording');
    };
}
