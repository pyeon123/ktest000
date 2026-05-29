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
        document.getElementById('seo-title').innerText = "Learn Korean Game: 1,000+ Word Quiz (FREE)";
        document.getElementById('seo-desc').setAttribute("content", "Master Korean through fun interactive games! Challenge yourself with over 1,000 Korean Word quizzes. Perfect for K-Drama fans and learners worldwide.");
        document.getElementById('main-header').innerText = "Learn Korean Game: 1,000+ Word Quiz";
        injectSafeSEOData(null);
        return;
    }

    const cat = allQuizData[catId];
    if (cat) {
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
        category.data.slice(0, 10).forEach(item => {
            categoryResource.about.push({
                "@type": "DefinedTerm",
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
        "cat_01": "family.html", "cat_02": "food.html", "cat_03": "places.html",
        "cat_04": "transport.html", "cat_05": "animals.html", "cat_06": "clothes.html",
        "cat_07": "nature.html", "cat_08": "hobbies.html", "cat_09": "body.html",
        "cat_10": "Jobs.html", "cat_11": "emotions.html", "cat_12": "kitchen.html",
        "cat_13": "electronics.html", "cat_14": "health.html", "cat_15": "fruits.html",
        "cat_16": "colors.html", "cat_17": "school.html", "cat_18": "time.html",
        "cat_19": "sports.html", "cat_20": "furniture.html", "cat_21": "buildings.html",
        "cat_22": "landscapes.html", "cat_23": "word.html", "cat_24": "vocabulary.html",
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
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) {
            quizScreen.classList.remove('active');
            quizScreen.style.display = 'none';
        }
        
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

        const recommendList = [
            { id: "cat_01", name: "Family", emoji: "👨‍👩‍👧‍👦", file: "family.html" },
            { id: "cat_02", name: "Food", emoji: "🍔", file: "food.html" },
            { id: "cat_03", name: "Places", emoji: "📍", file: "places.html" },
            { id: "cat_04", name: "Transport", emoji: "🚌", file: "transport.html" },
            { id: "cat_05", name: "Animals", emoji: "🦁", file: "animals.html" },
            { id: "cat_06", name: "Clothes", emoji: "👕", file: "clothes.html" },
            { id: "cat_07", name: "Nature", emoji: "🌿", file: "nature.html" },
            { id: "cat_08", name: "Hobbies", emoji: "🎸", file: "hobbies.html" },
            { id: "cat_09", name: "Body", emoji: "💪", file: "body.html" },
            { id: "cat_10", name: "Jobs", emoji: "💼", file: "Jobs.html" },
            { id: "cat_11", name: "Emotions", emoji: "😊", file: "emotions.html" },
            { id: "cat_12", name: "Kitchen", emoji: "🍳", file: "kitchen.html" },
            { id: "cat_13", name: "Electronics", emoji: "📱", file: "electronics.html" },
            { id: "cat_14", name: "Health", emoji: "🏥", file: "health.html" },
            { id: "cat_15", name: "Fruits", emoji: "🍎", file: "fruits.html" },
            { id: "cat_16", name: "Colors", emoji: "🎨", file: "colors.html" },
            { id: "cat_17", name: "School", emoji: "🏫", file: "school.html" },
            { id: "cat_18", name: "Time", emoji: "⏰", file: "time.html" },
            { id: "cat_19", name: "Sports", emoji: "⚽", file: "sports.html" },
            { id: "cat_20", name: "Furniture", emoji: "🪑", file: "furniture.html" },
            { id: "cat_21", name: "Buildings", emoji: "🏢", file: "buildings.html" },
            { id: "cat_22", name: "Landscapes", emoji: "🏔️", file: "landscapes.html" },
            { id: "cat_23", name: "Word", emoji: "📝", file: "word.html" },
            { id: "cat_24", name: "Vocabulary", emoji: "📖", file: "vocabulary.html" }
        ];

        const currentFileName = window.location.pathname.split("/").pop();
        const filteredCats = recommendList.filter(c => c.file !== currentFileName && c.id !== activeCatId);
        const chosenCat = filteredCats[Math.floor(Math.random() * filteredCats.length)] || recommendList[0];

        const recHtml = `
            <div style="margin-bottom: 15px;">
                <button id="rec-btn" data-target="${chosenCat.file}" style="width: 100%; padding: 14px; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 10px; cursor: pointer; font-size: 1.05rem; font-weight: bold; color: #475569;">
                    🔄 Try another: ${chosenCat.emoji} ${chosenCat.name}
                </button>
            </div>`;

        let formsHtml = "";
        if (quiz.forms && (quiz.forms.present || quiz.forms.past || quiz.forms.future)) {
            formsHtml = `
                <p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #10b981;"><strong>Present:</strong> ${quiz.forms.present || '---'}</p>
                <p style="margin: 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Past:</strong> ${quiz.forms.past || '---'}</p>
                <p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Future:</strong> ${quiz.forms.future || '---'}</p>
            `;
        } else {
            const casualText = (quiz.forms && quiz.forms.casual) || quiz.casual || quiz.kr || "---";
            const politeText = (quiz.forms && quiz.forms.polite) || quiz.polite || quiz.kr || "---";
            formsHtml = `
                <p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Casual:</strong> ${casualText}</p>
                <p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Polite:</strong> ${politeText}</p>
            `;
        }

        let optionsHtml = "";
        if (quiz.options && Array.isArray(quiz.options)) {
            optionsHtml = `
                <h3 style="margin-top: 25px; color: #1e293b;">💡 Related Words</h3>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                    ${quiz.options.map(opt => `
                        <div style="padding: 12px 15px; background: #f1f5f9; border-radius: 10px; border-left: 4px solid #64748b; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="font-size: 1.2rem; color: #1e293b;">${opt.kr}</strong>
                                <span style="font-size: 0.95rem; color: #64748b; margin-left: 6px;">(${opt.rom})</span>
                            </div>
                            <span style="font-size: 1.05rem; font-weight: bold; color: #475569;">${opt.en}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

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

        const situationText = quiz.situation || "No context provided.";

        detailArea.innerHTML = `
            <div class="result-container" style="padding: 20px; width: 100%; max-width: 600px; margin: 0 auto;">
                <h2 style="text-align: center; color: var(--primary);">⭕ Correct! 🎉</h2>
                <div class="info-box" style="margin: 15px 0; padding: 15px; border: 2px solid #e2e8f0; border-radius: 10px; background: #f8fafc;">
                    <p style="margin: 5px 0; font-size: 1.1rem;"><strong>Context:</strong> ${situationText}</p>
                    ${formsHtml}
                </div>
                ${optionsHtml}
                ${examplesHtml}
                
                <div style="margin-top: 25px;">
                    ${recHtml} 
                    <button id="next-btn" class="esim-btn-link" style="width: 100%; margin-bottom: 15px; padding: 15px; border: none; cursor: pointer;">Next Quiz ⏭️</button>
                    <button id="home-btn" class="esim-btn-link" style="width: 100%; padding: 15px; background: #64748b; border: none; cursor: pointer;">🏠 Home</button>
                </div>
            </div>
        `;
        
        detailArea.classList.add('active');
        detailArea.style.display = 'block';
        window.scrollTo(0, 0);

        document.getElementById('next-btn').onclick = nextQuiz;
        document.getElementById('home-btn').onclick = () => window.location.href = 'index.html';
        
        const recBtn = document.getElementById('rec-btn');
        if (recBtn) {
            recBtn.onclick = () => {
                const targetFile = recBtn.getAttribute('data-target') || "index.html";
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
    if (currentCategoryData && currentIdx < currentCategoryData.length) {
        const detailArea = document.getElementById('detail-area');
        if (detailArea) {
            detailArea.classList.remove('active');
            detailArea.style.display = 'none';
        }
        
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) {
            quizScreen.classList.add('active');
            quizScreen.style.display = 'block';
        }
        loadQuiz(true);
    } else {
        alert("🎉 You've mastered all the quizzes in this category! Excellent job! 👏");
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

document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isInApp = /kakaotalk|fbav|instagram|line|naver|snapchat|zum|tistory/i.test(userAgent);
    
    if (isInApp) {
        const openBtn = document.getElementById('top-open-btn');
        if (openBtn) openBtn.style.display = 'block';
    }

    if (window.location.pathname.includes('feelings.html')) {
        if (typeof allQuizData === 'undefined') window.allQuizData = {};
        if (window.feelingsData) {
            allQuizData['cat_feelings'] = window.feelingsData;
        }
        if (allQuizData['cat_feelings']) {
            window.CURRENT_CAT = 'cat_feelings';
        } else if (allQuizData['cat_11']) {
            window.CURRENT_CAT = 'cat_11';
        } else {
            allQuizData['cat_feelings'] = { name: "Feelings", emoji: "😊", data: [] };
            window.CURRENT_CAT = 'cat_feelings';
        }
    }

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

// 🌐 배너 자동 롤링 시스템 (DOM 로드 보장 버전)
document.addEventListener('DOMContentLoaded', () => {
    const esimRotationData = [
        { f: "🇰🇷", t: "Get Korea eSIM" },
        { f: "🇯🇵", t: "Get Japan eSIM" },
        { f: "🇺🇸", t: "Get USA eSIM" },
        { f: "🗺️", t: "Global eSIM - 200+ Countries" }
    ];
    let adIdx = 0;

    function updateBanners() {
        adIdx = (adIdx + 1) % esimRotationData.length;
        const item = esimRotationData[adIdx];

        // HTML 내의 모든 배너 요소를 찾아 즉시 업데이트
        document.querySelectorAll('.my-rolling-flag').forEach(el => el.textContent = item.f);
        document.querySelectorAll('.my-rolling-text').forEach(el => el.textContent = item.t);
    }

    // 3초마다 반복 실행
    setInterval(updateBanners, 3000);
});
function goToDetailPage() {
    // 1. 현재 데이터가 올바른지 확인
    const currentData = currentCategoryData[currentIdx];
    
    // 2. 카테고리 ID 변수(activeCatId) 사용
    if (currentData && currentData.kr) {
        // activeCatId가 비어있다면 기본값 'cat_feelings' 사용 (필요시 수정)
        const catId = activeCatId || 'cat_feelings'; 
        
        // 3. 주소 생성 (상대 경로로 수정)
        const url = `./feelings.html?cat=${catId}&word=${encodeURIComponent(currentData.kr)}`;
        
        // 4. 이동
        window.location.href = url;
    } else {
        alert("데이터를 찾을 수 없습니다.");
    }
}
