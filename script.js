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

window.quizDB = window.quizDB || [
    { title: "Academy", url: "academy.html", keywords: "academy school study education" },
    { title: "Airplane", url: "airplane.html", keywords: "airplane flight travel sky" },
    { title: "Airport", url: "airport.html", keywords: "airport travel flight airplane" },
    { title: "Animals", url: "animals.html", keywords: "animals pet nature zoo" },
    { title: "Apartment", url: "apartment.html", keywords: "apartment house living room" },
    { title: "Apple", url: "apple.html", keywords: "apple fruit food red" },
    { title: "Autumn", url: "autumn.html", keywords: "autumn fall season weather" },
    { title: "Baby", url: "baby.html", keywords: "baby child kid family" },
    { title: "Bed", url: "bed.html", keywords: "bed furniture sleep" },
    { title: "Bibimbap", url: "bibimbap.html", keywords: "bibimbap food korean rice" },
    { title: "Bird", url: "bird.html", keywords: "bird animal sky fly" },
    { title: "Body", url: "body.html", keywords: "body human health" },
    { title: "Book", url: "book.html", keywords: "book reading library study" },
    { title: "Bread", url: "bread.html", keywords: "bread food bakery" },
    { title: "Brother", url: "brother.html", keywords: "brother family sibling" },
    { title: "Buildings", url: "buildings.html", keywords: "buildings house city" },
    { title: "Bulgogi", url: "bulgogi.html", keywords: "bulgogi food korean meat" },
    { title: "Bus", url: "bus.html", keywords: "bus transport commute" },
    { title: "Cash", url: "cash.html", keywords: "cash money currency" },
    { title: "Cat", url: "cat.html", keywords: "cat animal pet" },
    { title: "Chair", url: "chair.html", keywords: "chair furniture seat" },
    { title: "City", url: "city.html", keywords: "city buildings urban" },
    { title: "Class", url: "class.html", keywords: "class school study student" },
    { title: "Clothes", url: "clothes.html", keywords: "clothes fashion wear" },
    { title: "Colors", url: "colors.html", keywords: "colors red blue green" },
    { title: "Commute", url: "commute.html", keywords: "commute work transport travel" },
    { title: "Company", url: "company.html", keywords: "company work job business" },
    { title: "Cooking", url: "cooking.html", keywords: "cooking food kitchen" },
    { title: "Dad", url: "dad.html", keywords: "dad father family parent" },
    { title: "Dawn", url: "dawn.html", keywords: "dawn morning time" },
    { title: "Desk", url: "desk.html", keywords: "desk furniture study school" },
    { title: "Dog", url: "dog.html", keywords: "dog animal pet puppy" },
    { title: "Door", url: "door.html", keywords: "door house entrance" },
    { title: "Economy", url: "economy.html", keywords: "economy money finance" },
    { title: "Electronics", url: "electronics.html", keywords: "electronics tech device" },
    { title: "Emotions", url: "emotions.html", keywords: "emotions feelings mood" },
    { title: "Evening", url: "evening.html", keywords: "evening night time" },
    { title: "Exam", url: "exam.html", keywords: "exam test study school" },
    { title: "Family", url: "family.html", keywords: "family parents child sibling" },
    { title: "Feelings", url: "feelings.html", keywords: "feelings mood emotion" },
    { title: "Fish", url: "fish.html", keywords: "fish animal sea ocean" },
    { title: "Flower", url: "flower.html", keywords: "flower nature plant" },
    { title: "Food", url: "food.html", keywords: "food eat meal" },
    { title: "Friend", url: "friend.html", keywords: "friend person relationship" },
    { title: "Fruit", url: "fruit.html", keywords: "fruit food healthy" },
    { title: "Furniture", url: "furniture.html", keywords: "furniture house bed chair" },
    { title: "Gift", url: "gift.html", keywords: "gift present surprise" },
    { title: "Gimbap", url: "gimbap.html", keywords: "gimbap food korean" },
    { title: "Happiness", url: "happiness.html", keywords: "happiness joy emotion" },
    { title: "Health", url: "health.html", keywords: "health body exercise" },
    { title: "Hobbies", url: "hobbies.html", keywords: "hobbies activity free time" },
    { title: "Homework", url: "homework.html", keywords: "homework study school" },
    { title: "House", url: "house.html", keywords: "house home living" },
    { title: "Jobs", url: "jobs.html", keywords: "jobs work profession" },
    { title: "Joy", url: "joy.html", keywords: "joy happiness emotion" },
    { title: "Kimchi", url: "kimchi1.html", keywords: "kimchi food korean spicy" },
    { title: "Kitchen", url: "kitchen.html", keywords: "kitchen cooking house" },
    { title: "Landscapes", url: "landscapes.html", keywords: "landscapes nature scenery" },
    { title: "Lion", url: "lion.html", keywords: "lion animal nature" },
    { title: "LivingRoom", url: "livingRoom.html", keywords: "livingRoom house home" },
    { title: "Love", url: "love.html", keywords: "love emotion feelings" },
    { title: "Lunch", url: "lunch.html", keywords: "lunch food meal time" },
    { title: "Market", url: "market.html", keywords: "market shopping store" },
    { title: "Meat", url: "meat.html", keywords: "meat food protein" },
    { title: "Money", url: "money.html", keywords: "money cash finance" },
    { title: "Mood", url: "mood.html", keywords: "mood emotion feelings" },
    { title: "Morning", url: "morning.html", keywords: "morning dawn time" },
    { title: "Mother", url: "mother.html", keywords: "mother mom family parent" },
    { title: "Mountain", url: "mountain.html", keywords: "mountain nature hiking" },
    { title: "Nature", url: "nature.html", keywords: "nature plant scenery" },
    { title: "Parents", url: "parents.html", keywords: "parents family mom dad" },
    { title: "Pencil", url: "pencil.html", keywords: "pencil school writing" },
    { title: "Places", url: "places.html", keywords: "places location travel" },
    { title: "Purchase", url: "purchase.html", keywords: "purchase shopping buy" },
    { title: "Rain", url: "rain.html", keywords: "rain weather nature" },
    { title: "Ramen", url: "ramen.html", keywords: "ramen food noodle" },
    { title: "Restroom", url: "restroom.html", keywords: "restroom bathroom toilet" },
    { title: "Sadness", url: "sadness.html", keywords: "sadness emotion feelings" },
    { title: "Samgyeopsal", url: "samgyeopsal.html", keywords: "samgyeopsal food korean meat" },
    { title: "School", url: "school.html", keywords: "school study education" },
    { title: "Sea", url: "sea.html", keywords: "sea ocean water nature" },
    { title: "Sister", url: "sister.html", keywords: "sister family sibling" },
    { title: "Sky", url: "sky.html", keywords: "sky nature weather" },
    { title: "Snow", url: "snow.html", keywords: "snow winter weather" },
    { title: "Soup", url: "soup.html", keywords: "soup food meal" },
    { title: "Sports", url: "sports.html", keywords: "sports exercise activity" },
    { title: "Spring", url: "spring.html", keywords: "spring season weather" },
    { title: "Store", url: "store.html", keywords: "store market shopping" },
    { title: "Student", url: "student.html", keywords: "student school study" },
    { title: "Study", url: "study.html", keywords: "study learn school" },
    { title: "Summer", url: "summer.html", keywords: "summer season weather" },
    { title: "Taxi", url: "taxi.html", keywords: "taxi transport car" },
    { title: "Teacher", url: "teacher.html", keywords: "teacher school education" },
    { title: "Textbook", url: "textbook.html", keywords: "textbook study school" },
    { title: "Time", url: "time.html", keywords: "time clock schedule" },
    { title: "Today", url: "today.html", keywords: "today time" },
    { title: "Tomorrow", url: "tomorrow.html", keywords: "tomorrow time" },
    { title: "Tourism", url: "tourism.html", keywords: "tourism travel trip" },
    { title: "Train", url: "train.html", keywords: "train transport travel" },
    { title: "Transport", url: "transport.html", keywords: "transport commute car bus" },
    { title: "Travel", url: "travel.html", keywords: "travel trip tourism" },
    { title: "Tteokbokki", url: "tteokbokki.html", keywords: "tteokbokki food korean spicy" },
    { title: "Vocabulary", url: "vocabulary.html", keywords: "vocabulary words study" },
    { title: "Water", url: "water.html", keywords: "water drink nature" },
    { title: "Weather", url: "weather.html", keywords: "weather sky rain snow" },
    { title: "Window", url: "window.html", keywords: "window house glass" },
    { title: "Word", url: "word.html", keywords: "word vocabulary language" },
    { title: "lover sentence", url: "sentencelover1.html", keywords: "sentence lover study korean phrase" },
    { title: "Hello", url: "annyeonghaseyo1.html", keywords: "hello hi greeting korean greeting" },
    { title: "Thank You", url: "gamsahamnida1.html", keywords: "thank you thanks gratitude appreciation" },
    { title: "It's Fun", url: "jaemiisseoyo1.html", keywords: "it's fun fun interesting enjoyable" },
    { title: "Good Night", url: "jaljayo1.html", keywords: "good night sleep bedtime" },
    { title: "What's Your Name", url: "irum1.html", keywords: "what's your name name introduction" },
    { title: "Nice to Meet You", url: "bangawoyo1.html", keywords: "nice to meet you introduction greeting" },
    { title: "How Have You Been", url: "jaljinaesseoyo1.html", keywords: "how have you been greeting conversation" },
    { title: "It's Okay", url: "gwaenchanayo1.html", keywords: "it's okay okay no problem fine" },
    { title: "Im Sorry", url: "mianhaeyo1.html", keywords: "i'm sorry sorry apology excuse me" },
    { title: "I Love You", url: "saranghaeyo1.html", keywords: "i love you love romance affection" },
    { title: "Please Speak Slowly", url: "cheoncheonhi1.html", keywords: "please speak slowly slow speaking conversation" },
    { title: "I'm Learning Korean", url: "hangukeo1.html", keywords: "i'm learning korean study korean language" },
    { title: "Help Me", url: "dowajuseyo1.html", keywords: "help me help emergency assistance" },
    { title: "Where Is the Restroom?", url: "hwajangsil1.html", keywords: "where is the restroom restroom bathroom toilet" },
    { title: "How Much Is It", url: "eolmayeyo1.html", keywords: "how much is it price cost shopping" },
    { title: "Where Is It", url: "eodi1.html", keywords: "where is it where location directions" },
    { title: "Im Happy", url: "haengbok1.html", keywords: "i'm happy happy feeling emotion" },
    { title: "Im Sleepy", url: "jollyeo1.html", keywords: "i'm sleepy sleepy tired bedtime" },
    { title: "Im Tired", url: "pigon1.html", keywords: "i'm tired tired exhausted fatigue" },
    { title: "Im Thirsty", url: "mongmalla1.html", keywords: "i'm thirsty thirsty drink water" },
    { title: "I'm Hungry", url: "baegopa1.html", keywords: "i'm hungry hungry food meal" },
    { title: "I Don't Understand", url: "ihaemot1.html", keywords: "i don't understand understand confusion learning" },
    { title: "I Understand", url: "ihae1.html", keywords: "i understand understand got it learning" },
    { title: "Im Sad", url: "seulpeo1.html", keywords: "i'm sad sad emotion feeling" },
    { title: "Im Angry", url: "hwana1.html", keywords: "i'm angry angry mad emotion" },
    { title: "Im Scared", url: "museowo1.html", keywords: "i'm scared scared afraid fear" },
    { title: "I Miss You", url: "bogosipeo1.html", keywords: "i miss you miss longing affection" },
    { title: "Im Sick", url: "apayo1.html", keywords: "i'm sick sick ill health" },
    { title: "Im Nervous", url: "ginjang1.html", keywords: "i'm nervous nervous anxious feeling" },
    { title: "I Feel Good", url: "gibun1.html", keywords: "i feel good good feeling mood" },
    { title: "Im Busy", url: "bappa1.html", keywords: "i'm busy busy work schedule" },
    { title: "Im Free", url: "sigan1.html", keywords: "i'm free available free time schedule" },
    { title: "Don't Worry", url: "geokjeong1.html", keywords: "don't worry worry relax comfort" },
    { title: "I Like It", url: "joayo1.html", keywords: "i like it like favorite preference" },
    { title: "I Don't Like It", url: "anjoa1.html", keywords: "i don't like it dislike don't like preference" },
    { title: "I Love It", url: "jeongmal1.html", keywords: "i love it love favorite really like" },
    { title: "I Hate It", url: "sireo1.html", keywords: "i hate it hate dislike emotion" },
    { title: "Im Ready", url: "junbi1.html", keywords: "i'm ready ready prepared let's go" },
    { title: "Not Yet", url: "ajig1.html", keywords: "not yet wait later unfinished" },
    { title: "Please Wait", url: "gidaryeo1.html", keywords: "please wait wait hold on moment" },
    { title: "Hurry Up", url: "ppalli1.html", keywords: "hurry up quick faster rush" },
    { title: "Let's Eat", url: "meogeo1.html", keywords: "let's eat eat meal food" },
    { title: "Let's Drink", url: "masyeo1.html", keywords: "let's drink drink beverage together" },
    { title: "Let's Study", url: "gongbu1.html", keywords: "let's study study learn korean" },
    { title: "Good Morning", url: "joheun1.html", keywords: "good morning morning greeting" },
    { title: "See You Later", url: "najunge1.html", keywords: "see you later goodbye farewell" },
    { title: "See You Tomorrow", url: "naeil1.html", keywords: "see you tomorrow tomorrow goodbye farewell" },
    { title: "You're Welcome", url: "cheonman1.html", keywords: "you're welcome welcome no problem thanks" },
    { title: "Excuse Me", url: "sillye1.html", keywords: "excuse me pardon attention polite" },
    { title: "No Problem", url: "munje1.html", keywords: "no problem okay it's fine don't worry" },
    { title: "What Does This Mean?", url: "ige1.html", keywords: "what does this mean meaning translation korean" },
    { title: "It's Too Expensive", url: "bissayo1.html", keywords: "it's too expensive expensive price shopping" },
    { title: "It's Cheap", url: "ssayo1.html", keywords: "it's cheap cheap affordable price shopping" },
    { title: "Water Please", url: "muljuseyo1.html", keywords: "water please water drink beverage" },
    { title: "It's Cold", url: "chagawo1.html", keywords: "it's cold cold weather temperature" },
    { title: "It's Hot", url: "tteugeo1.html", keywords: "it's hot hot weather temperature" },
    { title: "It's Salty", url: "jjayo1.html", keywords: "it's salty salty taste food" },
    { title: "It's Sweet", url: "dalayo1.html", keywords: "it's sweet sweet taste dessert" },
    { title: "It's Spicy", url: "maewoyo1.html", keywords: "it's spicy spicy hot food" },
    { title: "It's Delicious", url: "masisseo1.html", keywords: "it's delicious delicious tasty food" },
    { title: "Let's Go", url: "gayo1.html", keywords: "let's go go together invitation" },
    { title: "Wait a Moment", url: "jamsiman1.html", keywords: "wait a moment wait hold on please" },
    { title: "Coffee Please", url: "keopijuseyo1.html", keywords: "coffee please coffee drink beverage" },
    { title: "What Happened?", url: "museunirieyo1.html", keywords: "what happened happened problem situation" },
    { title: "Why?", url: "waeyo1.html", keywords: "why question reason" },
    { title: "Really?", url: "jeongmalyo1.html", keywords: "really surprise question" },
    { title: "Happy Birthday", url: "saengilchukha1.html", keywords: "happy birthday birthday celebration greeting" },
    { title: "Good Luck", url: "haenguneulbireoyo1.html", keywords: "good luck luck encouragement wish" },
    { title: "Good Job", url: "jalhaesseoyo1.html", keywords: "good job well done praise encouragement" },
    { title: "Be Careful", url: "josimhaseyo1.html", keywords: "be careful careful safety warning" },
    { title: "Stand Up", url: "ireonaseyo1.html", keywords: "stand up get up classroom instruction" },
    { title: "Sit Down", url: "aneuseyo1.html", keywords: "sit down take a seat classroom instruction" },
    { title: "Are You Okay?", url: "gwaenchanayo1.html", keywords: "are you okay okay concern health" },
    { title: "I'm Full", url: "baebulleoyo1.html", keywords: "i'm full full food meal" },
    { title: "See You Soon", url: "ttaobwayo1.html", keywords: "see you soon goodbye farewell" },
    { title: "Have a Nice Day", url: "joeunharubonaeseyo1.html", keywords: "have a nice day greeting farewell" },
    { title: "Come In", url: "deureooseyo1.html", keywords: "come in enter welcome invitation" },
    { title: "Please Wait", url: "gidaryeojuseyo1.html", keywords: "please wait wait hold on moment" },
    { title: "I Don't Know", url: "moreugesseoyo1.html", keywords: "i don't know don't know answer" },
    { title: "That's Right", url: "majayo1.html", keywords: "that's right correct yes agree" },
    { title: "That's Cool", url: "meotjyeoyo1.html", keywords: "that's cool cool awesome compliment" },
    { title: "That's Cute", url: "gwiyeowoyo1.html", keywords: "that's cute cute adorable compliment" },
    { title: "That's Beautiful", url: "areumdawoyo1.html", keywords: "that's beautiful beautiful pretty compliment" },
    { title: "That's Amazing", url: "nollawoyo1.html", keywords: "that's amazing amazing incredible surprise" },
    { title: "That's Interesting", url: "heungmirowoyo1.html", keywords: "that's interesting interesting curious conversation" },
    { title: "That's Awesome", url: "jeongmalmeotjyeoyo1.html", keywords: "that's awesome awesome excellent compliment" },
    { title: "Good Bye", url: "bye2.html", keywords: "good bye goodbye farewell see you" },
    { title: "That's Great", url: "jeongmaljoayo1.html", keywords: "that's great great excellent praise" },
    { title: "I Agree", url: "donguihaeyo1.html", keywords: "i agree agree opinion conversation" },
    { title: "That's Wrong", url: "teullyeosseoyo1.html", keywords: "that's wrong wrong incorrect mistake" },
    { title: "My Tooth Hurts", url: "igaapayo1.html", keywords: "my tooth hurts toothache dental pain teeth" },
    { title: "My Head Hurts", url: "meorigaapayo1.html", keywords: "my head hurts headache head pain" },
    { title: "I Have a Fever", url: "yeorinayo1.html", keywords: "i have a fever fever sick temperature" },
    { title: "Call the Police", url: "gyeongchalbulleojuseyo1.html", keywords: "call the police police emergency help" },
    { title: "I Need Help", url: "doumipilyohaeyo1.html", keywords: "i need help help emergency assistance" },
    { title: "Follow Me", url: "ttaraoseyo1.html", keywords: "follow me come with me directions" },
    { title: "Which Way?", url: "eoneujjokieyo1.html", keywords: "which way direction where navigation" },
    { title: "Is It Close?", url: "gakkawoyo1.html", keywords: "is it close nearby distance location" },
    { title: "Is It Far?", url: "meoreoyo1.html", keywords: "is it far far away distance location" },
    { title: "Stop Here", url: "yeogiseosewojuseyo1.html", keywords: "stop here stop taxi transportation" },
    { title: "Go Straight", url: "jikjinhaseyo1.html", keywords: "go straight straight directions navigation" },
    { title: "Turn Right", url: "oreunjjogeurodoseyo1.html", keywords: "turn right right directions navigation" },
    { title: "Turn Left", url: "oenjjogeurodoseyo1.html", keywords: "turn left left directions navigation" },
    { title: "I'm Lost", url: "gireulireosseoyo1.html", keywords: "i'm lost lost directions help" },
    { title: "I'm Early", url: "iljjikwasseoyo1.html", keywords: "i'm early early arrive on time" },
    { title: "I'm Late", url: "neujeosseoyo1.html", keywords: "i'm late late sorry time" },
    { title: "What Time Is It?", url: "jigeummyeotsiyeyo1.html", keywords: "what time is it time clock question" },
    { title: "I Have a Question", url: "jilmunisseoyo1.html", keywords: "i have a question question ask help" },
    { title: "This Is My Family", url: "jegajogieyo1.html", keywords: "this is my family family introduction" },
    { title: "This Is My Friend", url: "jechinguyeoyo1.html", keywords: "this is my friend friend introduction" },
    { title: "That's Perfect", url: "wanbyeokhaeyo1.html", keywords: "that's perfect perfect excellent great" },
    { title: "That's Enough", url: "chungbunhaeyo1.html", keywords: "that's enough enough stop sufficient" },
    { title: "Friend sentence ", url: "sentencefriend1.html", keywords: "sentence friend study korean conversation" }
];
const quizDB = window.quizDB;

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
function visitFacebook() { window.open("https://www.facebook.com/profile.php?id=100091484077264", "_blank"); }
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
        document.getElementById('main-header').innerText = cat.name.trim();
        injectSafeSEOData(catId);
    }
}
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
        "provider": { "@type": "Organization", "name": "Learn korean with korean dramas phrases", "sameAs": "https://www.facebook.com/profile.php?id=100091484077264" },
        "hasPart": []
    };
    const categoriesToProcess = specificCatId ? { [specificCatId]: allQuizData[specificCatId] } : allQuizData;
    for (const catKey in categoriesToProcess) {
        const category = categoriesToProcess[catKey];
        let categoryResource = { "@type": "LearningResource", "name": category.name + " Vocabulary", "learningResourceType": "Vocabulary List", "about": [] };
        category.data.slice(0, 10).forEach(item => {
            categoryResource.about.push({ "@type": "DefinedTerm", "termCode": item.en, "name": item.kr, "description": item.tip });
        });
        jsonLdData.hasPart.push(categoryResource);
    }
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);
}
function addToHome() { alert("How to Save this App:\n\n1. Click [3 dots] or [Share] icon at the TOP or BOTTOM.\n2. Select 'Add to Home Screen'.\n\nThen you can use this like a real app! ✨"); }
function sendEmail() { const mailUrl = "mailto:topkcc@gmail.com?subject=Question%20from%20Korean%20App"; window.location.href = mailUrl; }
function forceExternalBrowser() {
    const url = window.location.href.replace(/^https?:\/\//, '');
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('kakaotalk')) { location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(window.location.href); }
    else if (userAgent.includes('android')) { location.href = 'intent://' + url + '#Intent;scheme=https;package=com.android.chrome;end'; }
    else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) { window.open(window.location.href, '_blank'); alert("If the sound doesn't work, please click the '...' menu and select 'Open in Safari'."); }
    else { window.open(window.location.href, '_blank', 'width=900,height=1050'); }
}
function initMenu() {
    const list = document.getElementById('category-list');
    if (!list || typeof allQuizData === 'undefined') return;
    const fileMapping = { "cat_01": "family.html", "cat_02": "food.html", "cat_03": "places.html", "cat_04": "transport.html", "cat_05": "animals.html", "cat_06": "clothes.html", "cat_07": "nature.html", "cat_08": "hobbies.html", "cat_09": "body.html", "cat_10": "Jobs.html", "cat_11": "emotions.html", "cat_12": "kitchen.html", "cat_13": "electronics.html", "cat_14": "health.html", "cat_15": "fruits.html", "cat_16": "colors.html", "cat_17": "school.html", "cat_18": "time.html", "cat_19": "sports.html", "cat_20": "furniture.html", "cat_21": "buildings.html", "cat_22": "landscapes.html", "cat_23": "word.html", "cat_24": "vocabulary.html", "cat_25": "sentencelover1.html", "cat_26": "sentencefriend1.html", };
    let html = "";
    Object.keys(allQuizData).forEach(catId => {
        const cat = allQuizData[catId];
        const targetUrl = fileMapping[catId] || "index.html"; 
        html += `<a href="${targetUrl}" target="_top" class="cat-btn" style="text-decoration:none; color:inherit; display:block;"><span class="emoji">${cat.emoji}</span><span>${cat.name}</span></a>`;
    });
    list.innerHTML = html;
}
function startQuiz(catId, updateHistory = false) {
    activeCatId = catId;
    currentCategoryData = allQuizData[catId].data;
    activeCategoryName = allQuizData[catId].name; 
    if (updateHistory) { window.history.pushState({cat: catId}, '', `?cat=${catId}`); }
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
    if (tipEl) { tipEl.textContent = data.tip || "Listen and repeat the phrase!"; }
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
    injectQuizSchema({ question: data.kr, answer: data.en });
    if (autoSpeak) { setTimeout(speak, 1000); }
}
function renderLearningProgress() {
    const TOTAL_LESSONS = 3000;
    const currentPage = window.location.pathname.split("/").pop();
    let learnedPages = JSON.parse(localStorage.getItem("learnedPages") || "[]");
    if (!learnedPages.includes(currentPage)) { learnedPages.push(currentPage); localStorage.setItem("learnedPages", JSON.stringify(learnedPages)); }
    const learned = learnedPages.length;
    const percent = Math.min((learned / TOTAL_LESSONS) * 100, 100);
    const progressHtml = `<div style="margin:18px 0;padding:18px;background:#fff;border:2px solid #e5e7eb;border-radius:14px;text-align:center;box-shadow:0 3px 10px rgba(0,0,0,.05);"><div style="font-size:1.2rem;font-weight:bold;color:#2563eb;">📚 Your Korean Learning Progress</div><div style="font-size:1.6rem;font-weight:bold;margin-top:12px;">${learned} / ${TOTAL_LESSONS} Lessons</div><div style="width:100%;height:16px;background:#e5e7eb;border-radius:20px;overflow:hidden;margin-top:15px;"><div style="width:${percent}%;height:100%;background:linear-gradient(90deg,#22c55e,#16a34a);transition:.5s;"></div></div><div style="margin-top:10px;font-weight:bold;color:#16a34a;">${percent.toFixed(1)}% Completed</div><div style="margin-top:12px;color:#64748b;font-size:14px;">🔥 Complete all 3,000 lessons and the Korean government might send you a Kimchi Refrigerator! 🧊</div></div>`;
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) { homeBtn.insertAdjacentHTML("afterend", progressHtml); }
}
function toggleFavorite() {
    const currentFile = window.location.pathname.split("/").pop();
    const currentItem = quizDB.find(item => item.url === currentFile);
    if (!currentItem) return;
    let favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
    const index = favorites.findIndex(x => x.url === currentItem.url);
    if (index === -1) { favorites.push(currentItem); } else { favorites.splice(index, 1); }
    localStorage.setItem("favoriteLessons", JSON.stringify(favorites));
    updateFavoriteButton();
    renderFavoriteBox();
}
function updateFavoriteButton() {
    const btn = document.getElementById("favorite-btn");
    if (!btn) return;
    const currentFile = window.location.pathname.split("/").pop();
    const favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
    const saved = favorites.some(x => x.url === currentFile);
    if (saved) {
        btn.innerHTML = "❤ Saved to My Review List";
        btn.style.background = "#dc2626"; btn.style.color = "#ffffff"; btn.style.borderColor = "#dc2626";
    } else {
        btn.innerHTML = "🤍 Save to My Review List";
        btn.style.background = "#ffffff"; btn.style.color = "#dc2626"; btn.style.borderColor = "#fecaca";
    }
}
function renderFavoriteBox() {
    const box = document.getElementById("favorite-box");
    if (!box) return;
    box.style.position = "relative"; box.style.width = "100%"; box.style.maxWidth = "500px"; box.style.margin = "0 auto 25px auto"; box.style.padding = "0 15px"; box.style.boxSizing = "border-box";
    const favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
    if (favorites.length === 0) {
        box.innerHTML = `<div style="width:100%;box-sizing:border-box;background:#fff;border:2px dashed #fecaca;border-radius:12px;padding:18px;text-align:center;color:#94a3b8;"><div style="font-size:1.05rem; font-weight:bold; color:#dc2626; margin-bottom:6px;">📖 My Review List (0)</div><div style="font-size:0.85rem; line-height:1.4;">Tap 🤍 Save on the quiz page</div></div>`;
        return;
    }
    const showList = favorites.slice(0, 20);
    box.innerHTML = `<div style="width:100%;box-sizing:border-box;background:#fff;border:2px solid #fecaca;border-radius:12px;box-shadow:0 3px 10px rgba(0,0,0,.05);overflow:hidden;"><button onclick="openFavoriteList()" style="width:100%;padding:16px 18px;border:none;background:#fff;cursor:pointer;font-size:1rem;font-weight:bold;color:#dc2626;box-sizing:border-box;display:flex;justify-content:space-between;align-items:center;"><span>📖 My Review List (${favorites.length})</span><span>▼</span></button><div id="favorite-list-content" style="display:none;">${showList.map(item => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-top:1px solid #f1f5f9;"><a href="${item.url}" style="flex:1;text-decoration:none;color:#2563eb;font-weight:bold;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">📖 ${item.title}</a><span onclick="removeFavorite('${item.url}')" title="Remove" style="cursor:pointer;font-size:20px;margin-left:10px;flex-shrink:0;">❤</span></div>`).join("")}${favorites.length > 20 ? `<div style="padding:10px;text-align:center;color:#64748b;font-weight:bold;border-top:1px solid #f1f5f9;font-size:0.85rem;">+ ${favorites.length - 20} more...</div>` : ""}<button onclick="closeFavoriteList()" style="display:block;width:calc(100% - 32px);margin:12px auto 14px;padding:10px;border:1px solid #fecaca;border-radius:10px;background:#fff;color:#dc2626;font-weight:bold;cursor:pointer;">✖ Close</button></div></div>`;
}
function openFavoriteList() { const content = document.getElementById("favorite-list-content"); if (!content) return; content.style.display = "block"; }
function closeFavoriteList() { const content = document.getElementById("favorite-list-content"); if (!content) return; content.style.display = "none"; }
function removeFavorite(url) { let favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]"); favorites = favorites.filter(x => x.url !== url); localStorage.setItem("favoriteLessons", JSON.stringify(favorites)); renderFavoriteBox(); updateFavoriteButton(); }
function checkAnswer(isCorrect, quiz) {
    if (isCorrect) {
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) { quizScreen.classList.remove('active'); quizScreen.style.display = 'none'; }
        let detailArea = document.getElementById('detail-area');
        if (!detailArea) {
            detailArea = document.createElement('div');
            detailArea.id = 'detail-area';
            detailArea.className = 'screen';
            const contentArea = document.querySelector('.content-area');
            if (contentArea) { contentArea.appendChild(detailArea); } else { document.body.appendChild(detailArea); }
        }
        const currentFileName = window.location.pathname.split("/").pop();
        const currentItem = quizDB.find(item => item.url === currentFileName);
        const currentKeywords = currentItem ? currentItem.keywords.toLowerCase().split(" ") : [];
        const relatedList = quizDB.filter(item => item.url !== currentFileName).map(item => {
                const words = item.keywords.toLowerCase().split(" ");
                const score = words.filter(w => currentKeywords.includes(w)).length;
                return { ...item, score };
            }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);
        const chosenList = relatedList.slice(0, 3);
        const recHtml = chosenList.length > 0 ? `<div style="margin-bottom:15px;"><div style="font-size:0.9rem;font-weight:bold;color:#64748b;margin-bottom:8px;text-align:center;">🔄 Related</div><div style="display:flex;gap:8px;">${chosenList.map(item => `<button class="rec-btn-item" data-target="${item.url}" style="flex:1;padding:12px 8px;background:#f8fafc;border:2px dashed #cbd5e1;border-radius:10px;cursor:pointer;font-size:0.9rem;font-weight:bold;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">📚 ${item.title}</button>`).join("")}</div></div>` : "";
        const favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
        const isSaved = favorites.some(x => x.url === currentFileName);
        const favoriteHtml = `<button id="favorite-btn" onclick="toggleFavorite()" style="display:block;width:100%;margin:0 0 15px 0;padding:12px 24px;font-size:15px;font-weight:bold;border-radius:30px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 4px 10px rgba(0,0,0,0.08);border:2px solid ${isSaved ? '#dc2626' : '#fecaca'};background:${isSaved ? '#dc2626' : '#ffffff'};color:${isSaved ? '#ffffff' : '#dc2626'};">${isSaved ? '❤ Saved to My Review List' : '🤍 Save to My Review List'}</button>`;
        let formsHtml = "";
        if (quiz.forms && (quiz.forms.present || quiz.forms.past || quiz.forms.future)) {
            formsHtml = `<p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #10b981;"><strong>Present:</strong> ${quiz.forms.present || '---'}</p><p style="margin: 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Past:</strong> ${quiz.forms.past || '---'}</p><p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Future:</strong> ${quiz.forms.future || '---'}</p>`;
        } else {
            const casualText = (quiz.forms && quiz.forms.casual) || quiz.casual || quiz.kr || "---";
            const politeText = (quiz.forms && quiz.forms.polite) || quiz.polite || quiz.kr || "---";
            formsHtml = `<p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Casual:</strong> ${casualText}</p><p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Polite:</strong> ${politeText}</p>`;
        }
        let grammarHtml = "";
        if (quiz.grammar && Array.isArray(quiz.grammar.breakdown)) {
            grammarHtml = `<div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 10px; border-left: 4px solid #3b82f6;"><h4 style="margin: 0 0 10px 0; color: #1e293b;">${quiz.grammar.title || '📚 Simple Grammar'}</h4>${quiz.grammar.breakdown.map(b => `<p style="margin: 5px 0; font-size: 0.95rem; color: #334155;"><strong>${b.kr}</strong> <span style="color:#64748b;">(${b.rom})</span> — ${b.en}</p>`).join('')}<p style="margin-top: 10px; font-weight: 700; color: #1e40af;">${quiz.grammar.meaning || ''}</p></div>`;
        }
        let optionsHtml = "";
        if (quiz.options && Array.isArray(quiz.options)) {
            const showOptionAudio = quiz.optionAudio === true;
            optionsHtml = `<h3 style="margin-top: 25px; color: #1e293b;">💡 Related Words</h3><div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">${quiz.options.map((opt, idx) => `<div style="padding: 12px 15px; background: #f1f5f9; border-radius: 10px; border-left: 4px solid #64748b; display: flex; flex-direction: column; gap: 10px;"><div style="display: flex; justify-content: space-between; align-items: center;"><div><strong style="font-size: 1.2rem; color: #1e293b;">${opt.kr}</strong><span style="font-size: 0.95rem; color: #64748b; margin-left: 6px;">(${opt.rom})</span></div><span style="font-size: 1.05rem; font-weight: bold; color: #475569;">${opt.en}</span></div>${showOptionAudio ? `<div class="control-group" style="scale: 0.85; margin: 0; justify-content: center; gap: 10px;"><button class="btn-main" onclick="event.stopPropagation(); window.speakOption('${opt.kr.replace(/'/g, "\\'")}')"><span class="icon">🔊</span><span style="font-size: 0.8rem;">LISTEN</span></button><button class="btn-main" id="opt-mic-btn-${idx}" onclick="event.stopPropagation(); window.startOptionMic('${opt.kr.replace(/'/g, "\\'")}', 'opt-feedback-${idx}')"><span class="icon">🎤</span><span style="font-size: 0.8rem;">SPEAK</span></button></div><div id="opt-feedback-${idx}" style="height: 20px; font-weight: 900; font-size: 1rem; text-align: center;"></div>` : ``}</div>`).join('')}</div>`;
        }
        let examplesHtml = "";
        if (quiz.examples && Array.isArray(quiz.examples)) {
            examplesHtml = `<h3 style="margin-top: 25px; color: #1e293b;">📚 Key Sentences</h3><ul style="list-style: none; padding: 0; margin-bottom: 20px;">${quiz.examples.map((ex, idx) => `<li style="margin-bottom: 15px; padding: 15px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);"><strong style="font-size: 1.3rem; display: block; margin-bottom: 5px; color: #1e293b;">${ex.kr}</strong><span style="font-size: 1.1rem; color: #64748b; display: block; margin-bottom: 5px;">${ex.en}</span><em style="color: var(--primary); font-size: 1rem; display: block; margin-bottom: 10px;">${ex.rom || ''}</em><div class="control-group" style="scale: 0.85; margin: 10px 0 0 0; justify-content: center; gap: 10px;"><button class="btn-main" onclick="event.stopPropagation(); speakExampleText('${ex.kr.replace(/'/g, "\\'")}')"><span class="icon">🔊</span><span style="font-size: 0.8rem;">LISTEN</span></button><button class="btn-main" id="ex-mic-btn-${idx}" onclick="event.stopPropagation(); startExampleRecognition('${ex.kr.replace(/'/g, "\\'")}', ${idx})"><span class="icon">🎤</span><span style="font-size: 0.8rem;">SPEAK</span></button></div><div id="ex-feedback-${idx}" style="height: 25px; font-weight: 900; font-size: 1.1rem; margin-top: 5px; text-align: center;"></div></li>`).join('')}</ul>`;
        }
        const situationText = quiz.situation || "No context provided.";
        detailArea.innerHTML = `<div class="result-container" style="padding: 20px; width: 100%; max-width: 600px; margin: 0 auto;"><h2 style="text-align: center; color: var(--primary);">⭕ Correct! 🎉</h2><div class="info-box" style="margin: 15px 0; padding: 15px; border: 2px solid #e2e8f0; border-radius: 10px; background: #f8fafc;"><p style="margin: 5px 0; font-size: 1.1rem;"><strong>Context:</strong> ${situationText}</p>${formsHtml}</div>${grammarHtml}${optionsHtml}${examplesHtml}<div style="margin-top: 25px;">${favoriteHtml}${recHtml}<button id="next-btn" class="esim-btn-link" style="width: 100%; margin-bottom: 15px; padding: 15px; border: none; cursor: pointer;">Next Quiz ⏭</button><button id="home-btn" class="esim-btn-link" style="width: 100%; padding: 15px; background: #64748b; border: none; cursor: pointer;">🏠 Home</button></div></div>`;
        detailArea.classList.add('active'); detailArea.style.display = 'block'; window.scrollTo(0, 0);
        document.getElementById('next-btn').onclick = nextQuiz;
        document.getElementById('home-btn').onclick = () => window.location.href = 'index.html';
        document.querySelectorAll('.rec-btn-item').forEach(btn => { btn.onclick = () => { const targetFile = btn.getAttribute('data-target') || "index.html"; window.location.href = targetFile; }; });
        renderLearningProgress();
    } else { alert("Try Again! ❌"); }
}
function goToQuiz() { nextQuiz(); } 
function shuffleArray(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } }
function resetRecognitionState() { if (silenceTimer) clearTimeout(silenceTimer); if (recognition) { try { recognition.stop(); } catch(e) {} } const micBtn = document.getElementById('mic-btn'); if(micBtn) micBtn.classList.remove('recording'); }
function startSpeechRecognition() {
    if (!recognition) return;
    resetRecognitionState();
    const micBtn = document.getElementById('mic-btn');
    const feedback = document.getElementById('feedback');
    micBtn.classList.add('recording');
    feedback.textContent = "Please speak now..."; feedback.style.color = "#4f46e5";
    recognition.start();
    silenceTimer = setTimeout(() => { resetRecognitionState(); feedback.textContent = "No voice detected. Try again!"; feedback.style.color = "#ef4444"; }, 3500);
    recognition.onresult = (event) => {
        clearTimeout(silenceTimer);
        const speech = event.results[0][0].transcript;
        const target = currentCategoryData[currentIdx].kr.replace(/[?!\s~]/g,'');
        const voiced = speech.replace(/[?!\s~]/g,'');
        if (voiced.includes(target) || target.includes(voiced)) { feedback.textContent = "Excellent!"; feedback.style.color = "#22c55e"; } else { feedback.textContent = "Try Again"; feedback.style.color = "#ef4444"; }
        micBtn.classList.remove('recording');
    };
    recognition.onerror = () => resetRecognitionState();
    recognition.onend = () => micBtn.classList.remove('recording');
}
function nextQuiz() {
    currentIdx++;
    if (currentCategoryData && currentIdx < currentCategoryData.length) {
        const detailArea = document.getElementById('detail-area');
        if (detailArea) { detailArea.classList.remove('active'); detailArea.style.display = 'none'; }
        const quizScreen = document.getElementById('quiz-screen');
        if (quizScreen) { quizScreen.classList.add('active'); quizScreen.style.display = 'block'; }
        loadQuiz(true);
    } else { alert("🎉 You've mastered all the quizzes in this category! Excellent job! 👏"); goHome(); }
}
function speak() {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(document.getElementById('korean-sentence').textContent);
    msg.lang = 'ko-KR'; msg.rate = 0.8; window.speechSynthesis.speak(msg);
}
function goHome() {
    resetRecognitionState();
    if (typeof CURRENT_CAT !== 'undefined') { window.location.href = 'index.html'; return; }
    document.getElementById('menu-screen').classList.add('active');
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('top-open-btn').style.display = 'none';
    window.history.pushState({}, '', window.location.pathname);
    updateSEOData(null); 
    closeTodayQuiz(); hideGuide();
}
const adTexts = ["Stuck on Korean grammar? Ask our AI Tutor! 🤖","Get instant answers on 은/는, 이/가 and more","Your personal Korean grammar coach, free","Tap the AI Tutor button for real-time help"];
let adIdx = 0;
setInterval(() => {
    adIdx = (adIdx + 1) % adTexts.length;
    const el = document.getElementById("ad-content");
    if(el) { el.style.animation = 'none'; el.offsetHeight; el.style.animation = 'fadeMove 0.6s ease-out'; el.innerText = adTexts[adIdx]; }
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
        content.style.display = 'block'; title.textContent = "TODAY'S QUIZ"; title.style.marginBottom = "15px"; section.style.cursor = "default"; setupTodayQuiz(); displayCurrentTip();
    }
}
function closeTodayQuiz() {
    const content = document.getElementById('today-quiz-content');
    const title = document.getElementById('today-title');
    const section = document.getElementById('today-quiz-section');
    if (content) content.style.display = 'none';
    if (title) { title.textContent = "CLICK FOR TODAY'S QUIZ"; title.style.marginBottom = "0px"; }
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
        btn.className = 'opt-item'; btn.style.padding = "12px"; btn.style.fontSize = "1.2rem"; 
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
    msg.lang = 'ko-KR'; msg.rate = 0.8; window.speechSynthesis.speak(msg);
}
function checkTodayAnswer(isCorrect) {
    const feedback = document.getElementById('today-feedback');
    if (isCorrect) { feedback.textContent = "Excellent! 🎉"; feedback.style.color = "#22c55e"; } else { feedback.textContent = "Try Again! ❌"; feedback.style.color = "#ef4444"; }
}
function showTodayAnswer() { if(!todayQuizData) return; alert("The correct answer is: " + todayQuizData.en); }
function startTodayRecognition() {
    if (!recognition) return;
    const micBtn = document.getElementById('today-mic-btn');
    const feedback = document.getElementById('today-feedback');
    micBtn.classList.add('recording'); feedback.textContent = "Please speak now...";
    recognition.start();
    recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript;
        const target = todayQuizData.kr.replace(/[?!\s~]/g,'');
        const voiced = speech.replace(/[?!\s~]/g,'');
        if (voiced.includes(target) || target.includes(voiced)) { feedback.textContent = "Excellent! 🎤"; feedback.style.color = "#22c55e"; } else { feedback.textContent = "Try Again! ❌"; feedback.style.color = "#ef4444"; }
        micBtn.classList.remove('recording');
    };
    recognition.onerror = () => { micBtn.classList.remove('recording'); feedback.textContent = "Error occurred. Try again."; };
}
function displayCurrentTip() {
    const el = document.getElementById('teacher-tip-text');
    if (el && todayQuizData && todayQuizData.tip) { el.style.fontSize = "1.5rem"; el.style.fontWeight = "800"; el.style.color = "#5f3e07"; el.textContent = todayQuizData.tip; }
}
function showGuide() {
    const guideBox = document.getElementById('guide-box');
    const guideContent = document.getElementById('guide-content');
    if (guideBox && guideContent) { guideBox.style.display = 'none'; guideContent.style.display = 'block'; }
}
function hideGuide() {
    const guideBox = document.getElementById('guide-box');
    const guideContent = document.getElementById('guide-content');
    if (guideBox && guideContent) { guideContent.style.display = 'none'; guideBox.style.display = 'block'; }
}
document.addEventListener('click', function(event) {
    const guideBox = document.getElementById('guide-box');
    const guideContent = document.getElementById('guide-content');
    if (guideContent && guideContent.style.display === 'block') {
        if (!guideBox.contains(event.target) && !guideContent.contains(event.target)) { hideGuide(); }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isInApp = /kakaotalk|fbav|instagram|line|naver|snapchat|zum|tistory/i.test(userAgent);
    if (isInApp) { const openBtn = document.getElementById('top-open-btn'); if (openBtn) openBtn.style.display = 'block'; }
    if (window.location.pathname.includes('feelings.html')) {
        if (typeof allQuizData === 'undefined') window.allQuizData = {};
        if (window.feelingsData) { allQuizData['cat_feelings'] = window.feelingsData; }
        if (allQuizData['cat_feelings']) { window.CURRENT_CAT = 'cat_feelings'; } else if (allQuizData['cat_11']) { window.CURRENT_CAT = 'cat_11'; } else { allQuizData['cat_feelings'] = { name: "Feelings", emoji: "😊", data: [] }; window.CURRENT_CAT = 'cat_feelings'; }
    }
    renderFavoriteBox();
    if (typeof CURRENT_CAT !== 'undefined' && typeof allQuizData !== 'undefined' && allQuizData[CURRENT_CAT]) { startQuiz(CURRENT_CAT, false); }
    else {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('cat'); 
        if (category && typeof allQuizData !== 'undefined' && allQuizData[category]) { startQuiz(category, false); } else { initMenu(); updateSEOData(null); }
    }
});
function speakExampleText(text) { window.speechSynthesis.cancel(); const msg = new SpeechSynthesisUtterance(text); msg.lang = 'ko-KR'; msg.rate = 0.8; window.speechSynthesis.speak(msg); }
function startExampleRecognition(targetText, idx) {
    if (!recognition) { alert("Speech recognition is not supported in this browser."); return; }
    resetRecognitionState(); 
    const micBtn = document.getElementById(`ex-mic-btn-${idx}`);
    const feedback = document.getElementById(`ex-feedback-${idx}`);
    micBtn.classList.add('recording'); feedback.textContent = "Please speak now..."; feedback.style.color = "#4f46e5";
    recognition.start();
    silenceTimer = setTimeout(() => { resetRecognitionState(); micBtn.classList.remove('recording'); feedback.textContent = "No voice detected. Try again!"; feedback.style.color = "#ef4444"; }, 4200);
    recognition.onresult = (event) => {
        clearTimeout(silenceTimer);
        const speech = event.results[0][0].transcript;
        const target = targetText.replace(/[?!\s~,.]/g,'');
        const voiced = speech.replace(/[?!\s~,.]/g,'');
        if (voiced.includes(target) || target.includes(voiced)) { feedback.textContent = "Excellent! 🎉"; feedback.style.color = "#22c55e"; } else { feedback.textContent = "Try Again! ❌"; feedback.style.color = "#ef4444"; }
        micBtn.classList.remove('recording');
    };
    recognition.onerror = () => { clearTimeout(silenceTimer); resetRecognitionState(); micBtn.classList.remove('recording'); feedback.textContent = "Error occurred. Try again."; feedback.style.color = "#ef4444"; };
    recognition.onend = () => { micBtn.classList.remove('recording'); };
}
function speakOption(text) { window.speechSynthesis.cancel(); const msg = new SpeechSynthesisUtterance(text); msg.lang = "ko-KR"; msg.rate = 0.8; window.speechSynthesis.speak(msg); }
function startOptionMic(targetText, feedbackId) {
    if (!recognition) { alert("Speech recognition is not supported."); return; }
    resetRecognitionState();
    const feedback = document.getElementById(feedbackId);
    recognition.start();
    if (feedback) { feedback.textContent = "Please speak now..."; feedback.style.color = "#4f46e5"; }
    silenceTimer = setTimeout(() => { resetRecognitionState(); if (feedback) { feedback.textContent = "No voice detected. Try again!"; feedback.style.color = "#ef4444"; } }, 4200);
    recognition.onresult = (event) => {
        clearTimeout(silenceTimer);
        const speech = event.results[0][0].transcript;
        const target = targetText.replace(/[?!\s~,.]/g, '');
        const voiced = speech.replace(/[?!\s~,.]/g, '');
        if (feedback) {
            if (voiced.includes(target) || target.includes(voiced)) { feedback.textContent = "Excellent! 🎉"; feedback.style.color = "#22c55e"; } else { feedback.textContent = "Try Again! ❌"; feedback.style.color = "#ef4444"; }
        }
    };
    recognition.onerror = () => { clearTimeout(silenceTimer); resetRecognitionState(); if (feedback) { feedback.textContent = "Error occurred. Try again."; feedback.style.color = "#ef4444"; } };
}
function injectQuizSchema(data) {
    const oldSchema = document.getElementById('quiz-schema');
    if (oldSchema) oldSchema.remove();
    if (!data) return;
    const qText = data.question || data.q || "No question provided";
    const aText = data.answer || data.a || "No answer provided";
    const schemaData = { "@context": "https://schema.org", "@type": "Quiz", "name": document.title, "hasPart": { "@type": "Question", "name": qText, "acceptedAnswer": { "@type": "Answer", "text": aText } } };
    const script = document.createElement('script');
    script.id = 'quiz-schema'; script.type = 'application/ld+json'; script.text = JSON.stringify(schemaData); document.head.appendChild(script);
}
function autoSearch() {
    const input = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const container = document.getElementById('resultContainer');
    const list = document.getElementById('resultsList');
    if (!container || !list) return;
    if (input.length < 1) { container.style.display = "none"; return; }
    container.style.display = "block"; list.innerHTML = "";
    let found = false;
    (window.quizDB || []).forEach(item => {
        if (item.title.toLowerCase().includes(input) || item.keywords.toLowerCase().includes(input)) {
            list.innerHTML += `<li style="border-bottom: 1px solid #eee;"><a href="${item.url}" style="display: block; padding: 15px; text-decoration:none; color:#333;">${item.title}</a></li>`;
            found = true;
        }
    });
    if (!found) list.innerHTML = `<li style="padding: 15px; color:#999;">관련 퀴즈가 없습니다.</li>`;
}
function autoSearchTop() {
    const input = document.getElementById('searchInputTop')?.value.toLowerCase() || "";
    const container = document.getElementById('resultContainerTop');
    const list = document.getElementById('resultsListTop');
    if (!container || !list) return;
    if (input.length < 1) { container.style.display = "none"; return; }
    container.style.display = "block"; list.innerHTML = "";
    let found = false;
    (window.quizDB || []).forEach(item => {
        if (item.title.toLowerCase().includes(input) || item.keywords.toLowerCase().includes(input)) {
            list.innerHTML += `<li style="border-bottom: 1px solid #eee;"><a href="${item.url}" style="display: block; padding: 15px; text-decoration:none; color:#333;">${item.title}</a></li>`;
            found = true;
        }
    });
    if (!found) list.innerHTML = `<li style="padding: 15px; color:#999;">관련 퀴즈가 없습니다.</li>`;
}
document.addEventListener('click', function(e) {
    const c1 = document.getElementById('resultContainer');
    const i1 = document.getElementById('searchInput');
    if (c1 && i1 && !c1.contains(e.target) && e.target !== i1) c1.style.display = "none";
    const c2 = document.getElementById('resultContainerTop');
    const i2 = document.getElementById('searchInputTop');
    if (c2 && i2 && !c2.contains(e.target) && e.target !== i2) c2.style.display = "none";
});
let trendingWords = [];
let currentSelectedLetter = null;
function initTrendingData() {
    const sourceData = window.quizDB || [];
    if (sourceData.length === 0) return;
    let processed = sourceData.map(item => {
        const states = ["up", "down", "same"];
        const firstLetter = item.title.trim().charAt(0).toUpperCase();
        return { word: item.title, file: item.url || "index.html", sortingKey: firstLetter, change: states[Math.floor(Math.random() * states.length)] };
    });
    processed.sort(() => Math.random() - 0.5);
    trendingWords = processed.map((item, idx) => ({ ...item, rank: idx + 1 }));
}
function renderTrendingChart() {
    const gridContainer = document.getElementById('trending-grid');
    if (!gridContainer || trendingWords.length === 0) return;
    const sortedWords = [...trendingWords].sort((a, b) => a.rank - b.rank);
    const displayWords = sortedWords.slice(0, 12);
    let gridHtml = "";
    displayWords.forEach(item => {
        let arrow = "—"; let statusClass = "status-same";
        if (item.change === "up") { arrow = "↑"; statusClass = "status-up"; }
        else if (item.change === "down") { arrow = "↓"; statusClass = "status-down"; }
        gridHtml += `<a href="${item.file}" class="trending-item"><span class="rank-num">${item.rank}</span><span class="word-text word-update">${item.word}</span><span class="status-icon ${statusClass}">${arrow}</span></a>`;
    });
    gridContainer.innerHTML = gridHtml;
    setTimeout(() => { document.querySelectorAll('.word-text').forEach(el => el.classList.remove('word-update')); }, 500);
}
function initAlphabetTabs() {
    const tabsContainer = document.getElementById('alphabet-tabs');
    if (!tabsContainer) return;
    let tabsHtml = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        tabsHtml += `<button class="tab-btn" onclick="selectAlphabet('${letter}')">${letter}</button>`;
    }
    tabsContainer.innerHTML = tabsHtml;
}
function selectAlphabet(letter) {
    currentSelectedLetter = letter;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.textContent === letter) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    renderAlphabetWordList();
}
function renderAlphabetWordList() {
    const listContainer = document.getElementById('alphabet-word-list');
    if (!listContainer || !currentSelectedLetter) return;
    const filtered = trendingWords.filter(item => item.sortingKey === currentSelectedLetter).sort((a, b) => a.word.localeCompare(b.word));
    listContainer.style.display = 'grid';
    if (filtered.length === 0) {
        listContainer.innerHTML = `<div class="no-words">No words starting with '${currentSelectedLetter}' yet.</div>`;
        return;
    }
    let listHtml = "";
    filtered.forEach(item => { listHtml += `<a href="${item.file}" class="word-link-item">🔤 ${item.word}</a>`; });
    listContainer.innerHTML = listHtml;
}
function simulateLiveChart() {
    setInterval(() => {
        if (trendingWords.length === 0) return;
        const randomIndex = Math.floor(Math.random() * Math.min(12, trendingWords.length));
        const states = ["up", "down", "same"];
        trendingWords[randomIndex].change = states[Math.floor(Math.random() * states.length)];
        renderTrendingChart();
    }, 3000);
}
document.addEventListener("DOMContentLoaded", () => {
    initTrendingData();
    renderTrendingChart();
    initAlphabetTabs();
    simulateLiveChart();
});
function toggleKFreeInfo(e, section) {
    if (e && e.preventDefault) e.preventDefault();
    const evt = e || window.event;
    const target = document.getElementById(`kfree-content-${section}`);
    const allContents = document.querySelectorAll('.kfree-info-content');
    const allButtons = document.querySelectorAll('.kfree-tab-btn');
    if (!target) return;
    if (target.classList.contains('active')) {
        target.classList.remove('active');
        if (evt && evt.target) evt.target.classList.remove('active');
        return;
    }
    allContents.forEach(content => content.classList.remove('active'));
    allButtons.forEach(btn => btn.classList.remove('active'));
    target.classList.add('active');
    if (evt && evt.target) evt.target.classList.add('active');
}
(function injectTrendingPrettyFix(){
  const css = `.trending-container{width:100%!important;max-width:600px!important;margin:30px auto 20px auto!important;background:#fff!important;border:1px solid #e2e8f0!important;border-radius:16px!important;box-shadow:0 8px 24px rgba(0,0,0,0.06)!important;overflow:hidden!important;box-sizing:border-box!important;display:block!important;float:none!important}
.trending-header{padding:18px 20px 14px!important;background:linear-gradient(135deg,#f8fafc,#eef2ff)!important;border-bottom:1px solid #e2e8f0!important;text-align:center!important}
.trending-title{font-weight:800!important;font-size:1.05rem!important;color:#1e293b!important}
.trending-logo{font-size:0.75rem!important;color:#94a3b8!important;margin-top:4px!important}
.trending-grid{display:grid!important;grid-template-columns:1fr!important;gap:0!important;width:100%!important;max-height:380px!important;overflow-y:auto!important;overflow-x:hidden!important;padding:8px 0!important}
.trending-item{display:flex!important;align-items:center!important;justify-content:space-between!important;width:100%!important;max-width:100%!important;padding:14px 20px!important;box-sizing:border-box!important;text-decoration:none!important;border-bottom:1px solid #f1f5f9!important}
.trending-item:hover{background:#f8fafc!important}
.rank-num{font-weight:800!important;color:#4f46e5!important;background:#eef2ff!important;width:32px!important;height:32px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:50%!important;margin-right:14px!important;flex-shrink:0!important;font-size:0.9rem!important}
.word-text{font-size:1rem!important;color:#334155!important;font-weight:600!important;flex-grow:1!important;text-align:left!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
.status-icon{font-size:1.1rem!important;font-weight:bold!important;width:24px!important;text-align:center!important;flex-shrink:0!important}
.alphabet-index-title{padding:16px 20px 6px!important;font-size:0.7rem!important;font-weight:700!important;color:#94a3b8!important;letter-spacing:1.2px!important;text-align:center!important;opacity:1!important}
.alphabet-tabs{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:6px!important;padding:10px 16px 16px!important;background:transparent!important}
.tab-btn{min-width:32px!important;height:32px!important;background:#f8fafc!important;border:1px solid #e2e8f0!important;border-radius:8px!important;font-size:0.8rem!important;font-weight:600!important;color:#64748b!important;opacity:1!important}
.tab-btn.active{background:#4f46e5!important;color:white!important;border-color:#4f46e5!important;opacity:1!important}
.alphabet-word-list{display:none;grid-template-columns:1fr 1fr!important;background:#fafbff!important;border-top:1px solid #e2e8f0!important;max-height:180px!important;overflow-y:auto!important}
.word-link-item{padding:10px 20px!important;font-size:0.85rem!important;color:#64748b!important;text-decoration:none!important;border-bottom:1px solid #f1f5f9!important;display:block!important}
.options-container, #options-container, #today-options, #alphabet-word-list{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;width:100%!important;max-width:500px!important;margin: 0 auto!important;box-sizing:border-box!important;}
.opt-item{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;padding:16px 18px!important;background:#ffffff!important;border:2px solid #e2e8f0!important;border-radius:12px!important;font-size:1.1rem!important;font-weight:600!important;color:#334155!important;cursor:pointer!important;text-align:center!important;box-sizing:border-box!important;transition:all 0.2s!important;}
.opt-item:hover{border-color:#4f46e5!important;background:#f8fafc!important}
body,main,.wrapper,.container,.main-container,.app-container{overflow-x:hidden!important}
@media(max-width:768px){.quiz-app{width:100%!important;max-width:100%!important;box-sizing:border-box!important} .content-area{width:100%!important;max-width:100%!important;padding:10px!important;box-sizing:border-box!important} .trending-container{max-width:95%!important;margin:20px auto!important}}
`;
  const style = document.createElement('style');
  style.id = 'trending-pretty-fix';
  style.textContent = css;
  document.head.appendChild(style);
})();
(function fixKFreeFooterFinal(){
  function robustToggle(eOrSection, maybeSection){
    let section, evt;
    if (maybeSection) { evt = eOrSection; section = maybeSection; } else { section = eOrSection; evt = window.event || null; }
    if (evt && evt.preventDefault) { try{evt.preventDefault();}catch(x){} }
    if (!section) return false;
    section = String(section).trim().toLowerCase();
    if (section.includes('about')) section='about';
    else if (section.includes('privacy')) section='privacy';
    else if (section.includes('terms') || section.includes('service')) section='terms';
    else if (section.includes('contact') || section.includes('disclaimer')) section='contact';
    const target = document.getElementById(`kfree-content-${section}`);
    if (!target) { return false; }
    const allContents = document.querySelectorAll('.kfree-info-content');
    const allButtons = document.querySelectorAll('.kfree-tab-btn');
    const isActive = target.classList.contains('active');
    allContents.forEach(c => c.classList.remove('active'));
    allButtons.forEach(b => b.classList.remove('active'));
    if (!isActive) {
      target.classList.add('active'); target.style.display = 'block';
      let clickedBtn = null;
      if (evt) {
        if (evt.currentTarget && evt.currentTarget.classList.contains('kfree-tab-btn')) clickedBtn = evt.currentTarget;
        else if (evt.target) clickedBtn = evt.target.closest ? evt.target.closest('.kfree-tab-btn') : null;
      }
      if (!clickedBtn) {
        document.querySelectorAll('.kfree-tab-btn').forEach(b=>{
          const on = (b.getAttribute('onclick')||"").toLowerCase();
          const txt = (b.textContent||"").toLowerCase();
          if (on.includes(section) || txt.includes(section) || (section==='terms' && txt.includes('terms')) || (section==='contact' && txt.includes('contact'))) { clickedBtn = b; }
        });
      }
      if (clickedBtn) clickedBtn.classList.add('active');
      setTimeout(()=>{ try{target.scrollIntoView({behavior:'smooth', block:'nearest'});}catch(e){} }, 100);
    } else { allContents.forEach(c => { c.style.display = 'none'; }); }
    return false;
  }
  window.toggleKFreeInfo = robustToggle;
  function attach(){
    document.querySelectorAll('.kfree-tab-btn').forEach(btn=>{
      if (btn.dataset.kfreeFixed === "1") return;
      btn.dataset.kfreeFixed = "1";
      const oldOnclick = btn.getAttribute('onclick');
      if (oldOnclick) { btn.setAttribute('data-old-onclick', oldOnclick); btn.removeAttribute('onclick'); }
      btn.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        let section = null;
        const old = this.getAttribute('data-old-onclick') || "";
        const m = old.match(/'([^']+)'/);
        if (m) section = m[1];
        if (!section) {
          const t = this.textContent.toLowerCase();
          if (t.includes('about')) section='about';
          else if (t.includes('privacy')) section='privacy';
          else if (t.includes('terms')) section='terms';
          else if (t.includes('contact')) section='contact';
        }
        if (section) robustToggle(e, section);
        return false;
      });
    });
    document.querySelectorAll('.kfree-info-content').forEach(el=>{
      if (!el.classList.contains('active')) el.style.display = 'none';
      else el.style.display = 'block';
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', attach); } else { attach(); }
  setTimeout(attach, 500);
  setTimeout(()=>{ window.toggleKFreeInfo = robustToggle; attach(); }, 1500);
})();

(function(){
 const grammarData = [
  {
    id: "G001",
    grammar: "은 / 는",
    romanization: "eun / neun",
    title: "Topic Marker",
    keywords: ["topic marker", "topic of the sentence", "eun neun", "as for"],
    sentencePatterns: ["은", "는"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you are talking to a friend.\nBefore speaking, you tell your friend what your topic is.\nKorean uses 은 / 는 (eun / neun) Topic Marker to say:\n\"I'm talking about this.\"",
    memoryTrick: "🟨 은 / 는 (eun / neun) Topic Marker = About...\n\"About me\"\n\"About today\"\n\"About Korea\"",
    easyExplanation: "은 / 는 (eun / neun) Topic Marker shows the topic of a sentence.\nIt tells the listener what you are talking about.\nKoreans use it every day.",
    basicRule: "✅ After a consonant → use 은 (eun) Topic Marker\nExample:\n책 (chaek) book ↓ 책은 (chae-geun) As for the book...\n\n✅ After a vowel → use 는 (neun) Topic Marker\nExample:\n사과 (sa-gwa) apple ↓ 사과는 (sa-gwa-neun) As for the apple...",
    examples: [
      { kr: "저는 학생이에요.", rom: "Jeo-neun hak-saeng-i-e-yo.", en: "I am a student." },
      { kr: "오늘은 더워요.", rom: "O-neul-eun deo-wo-yo.", en: "Today is hot." },
      { kr: "한국은 아름다워요.", rom: "Han-guk-eun a-reum-da-wo-yo.", en: "Korea is beautiful." }
    ],
    nativeTip: "Native Koreans use 은 / 는 (eun / neun) Topic Marker to introduce a topic or compare two things.",
    commonMistakes: [
      { wrong: "❌ 사과은 (Sa-gwa-eun) As for the apple... Wrong", correct: "✅ 사과는 (Sa-gwa-neun) As for the apple... Correct" },
      { wrong: "❌ 책는 (Chaek-neun) As for the book... Wrong", correct: "✅ 책은 (Chae-geun) As for the book... Correct" }
    ],
    compare: [
      { grammar: "은 / 는 (eun / neun)", meaning: "Topic Marker", mainJob: "Shows the topic" },
      { grammar: "이 / 가 (i / ga)", meaning: "Subject Marker", mainJob: "Shows the subject" }
    ],
    miniQuiz: {
      question: "학교__ (Hak-gyo __ ) The school...",
      options: ["① 은 (eun) Topic Marker", "② 는 (neun) Topic Marker"],
      answer: "✅ Answer: 는 (neun) Topic Marker",
      reason: "Because 학교 (hak-gyo) school ends with a vowel."
    },
    speakingPractice: {
      kr: "저는 한국어를 공부해요.",
      rom: "Jeo-neun Han-gu-geo-reul gong-bu-hae-yo.",
      en: "I study Korean.",
      repeat: 3
    },
    practiceChallenge: {
      question: "저__ 학생이에요. (Jeo__ hak-saeng-i-e-yo.) I am a student.",
      answer: "✅ Answer: 저는 (Jeo-neun) As for me"
    },
    relatedGrammar: ["이 / 가 (i / ga) Subject Marker"],
    relatedVocabulary: [
      { kr: "학생", rom: "hak-saeng", en: "student" },
      { kr: "오늘", rom: "o-neul", en: "today" },
      { kr: "한국", rom: "han-guk", en: "Korea" }
    ],
    teacherNote: "Core function: Topic Marker.\nCompare with 이 / 가 (i / ga) — Subject Marker whenever learners ask the difference.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    id: "G002",
    grammar: "이 / 가",
    romanization: "i / ga",
    title: "Subject Marker",
    keywords: ["subject marker", "subject particle", "i ga", "new information particle"],
    sentencePatterns: ["이", "가"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine someone asks, \"Who is a student?\"\nYou answer, \"I am.\"\nKorean uses 이 / 가 (i / ga) Subject Marker to show who or what is the subject.",
    memoryTrick: "🟦 이 / 가 (i / ga) Subject Marker = Who? / What?\nThink:\nWho did it?\nWhat is it?",
    easyExplanation: "이 / 가 (i / ga) Subject Marker shows the subject.\nIt tells us who or what the sentence is about at that moment.\nIt often introduces new information.",
    basicRule: "✅ After a consonant → use 이 (i) Subject Marker\nExample:\n책 (chaek) book ↓ 책이 (chae-gi) The book...\n\n✅ After a vowel → use 가 (ga) Subject Marker\nExample:\n사과 (sa-gwa) apple ↓ 사과가 (sa-gwa-ga) The apple...",
    examples: [
      { kr: "제가 학생이에요.", rom: "Je-ga hak-saeng-i-e-yo.", en: "I am the student." },
      { kr: "고양이가 귀여워요.", rom: "Go-yang-i-ga gwi-yeo-wo-yo.", en: "The cat is cute." },
      { kr: "비가 와요.", rom: "Bi-ga wa-yo.", en: "It is raining." }
    ],
    nativeTip: "Native Koreans use 이 / 가 (i / ga) Subject Marker when introducing new information or answering Who? or What?",
    commonMistakes: [
      { wrong: "❌ 사과이 (Sa-gwa-i) The apple... Wrong", correct: "✅ 사과가 (Sa-gwa-ga) The apple... Correct" },
      { wrong: "❌ 책가 (Chaek-ga) The book... Wrong", correct: "✅ 책이 (Chae-gi) The book... Correct" }
    ],
    compare: [
      { grammar: "이 / 가 (i / ga)", meaning: "Subject Marker", mainJob: "Shows who or what is the subject" },
      { grammar: "은 / 는 (eun / neun)", meaning: "Topic Marker", mainJob: "Shows the topic" }
    ],
    miniQuiz: {
      question: "학생__ (Hak-saeng __ ) The student...",
      options: ["① 이 (i) Subject Marker", "② 가 (ga) Subject Marker"],
      answer: "✅ Answer: 이 (i) Subject Marker",
      reason: "Because 학생 (hak-saeng) student ends with a consonant."
    },
    speakingPractice: {
      kr: "고양이가 귀여워요.",
      rom: "Go-yang-i-ga gwi-yeo-wo-yo.",
      en: "The cat is cute.",
      repeat: 3
    },
    practiceChallenge: {
      question: "비__ 와요. (Bi__ wa-yo.) It is raining.",
      answer: "✅ Answer: 비가 (Bi-ga) The rain"
    },
    relatedGrammar: ["은 / 는 (eun / neun) Topic Marker"],
    relatedVocabulary: [
      { kr: "고양이", rom: "go-yang-i", en: "cat" },
      { kr: "비", rom: "bi", en: "rain" },
      { kr: "학생", rom: "hak-saeng", en: "student" }
    ],
    teacherNote: "Core function: Subject Marker.\nBest explained by comparing with 은 / 는 (eun / neun) — Topic Marker.\nFocus on Who? and What? questions before teaching contrast."
  },
  {
    id: "G003",
    grammar: "을 / 를",
    romanization: "eul / reul",
    title: "Object Marker",
    keywords: ["object marker", "eul reul", "object particle"],
    sentencePatterns: ["을", "를"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you say, \"I eat an apple.\"\nThe apple is the thing you eat.\nKorean uses 을 / 를 (eul / reul) Object Marker to show what receives the action.",
    memoryTrick: "🟥 을 / 를 (eul / reul) Object Marker = What?\nWhat do you eat?\nWhat do you drink?\nWhat do you watch?",
    easyExplanation: "을 / 를 (eul / reul) Object Marker shows the object of a verb.\nThe object is the person or thing that receives the action.\nNative Koreans use it every day.",
    basicRule: "✅ After a consonant → use 을 (eul) Object Marker\nExample:\n책 (chaek) book ↓ 책을 (chae-geul) the book\n\n✅ After a vowel → use 를 (reul) Object Marker\nExample:\n사과 (sa-gwa) apple ↓ 사과를 (sa-gwa-reul) the apple",
    examples: [
      { kr: "저는 사과를 먹어요.", rom: "Jeo-neun sa-gwa-reul meo-geo-yo.", en: "I eat an apple." },
      { kr: "저는 커피를 마셔요.", rom: "Jeo-neun keo-pi-reul ma-syeo-yo.", en: "I drink coffee." },
      { kr: "저는 한국어를 공부해요.", rom: "Jeo-neun Han-gu-geo-reul gong-bu-hae-yo.", en: "I study Korean." }
    ],
    nativeTip: "Native Koreans often drop 을 / 를 (eul / reul) Object Marker during casual conversation.\nExample: 밥 먹었어요? (Bap meo-geo-sseo-yo?) Did you eat?\nThe object marker is omitted because the meaning is already clear.",
    commonMistakes: [
      { wrong: "❌ 사과을 (Sa-gwa-eul) the apple Wrong", correct: "✅ 사과를 (Sa-gwa-reul) the apple Correct" },
      { wrong: "❌ 책를 (Chaek-reul) the book Wrong", correct: "✅ 책을 (Chae-geul) the book Correct" }
    ],
    compare: [
      { grammar: "을 / 를 (eul / reul)", meaning: "Object Marker", mainJob: "Shows what receives the action" },
      { grammar: "이 / 가 (i / ga)", meaning: "Subject Marker", mainJob: "Shows who or what does the action" }
    ],
    miniQuiz: {
      question: "물을__ (Mul __ ) water",
      options: ["① 을 (eul) Object Marker", "② 를 (reul) Object Marker"],
      answer: "✅ Answer: 을 (eul) Object Marker",
      reason: "Because 물 (mul) water ends with a consonant."
    },
    speakingPractice: {
      kr: "저는 물을 마셔요.",
      rom: "Jeo-neun mu-reul ma-syeo-yo.",
      en: "I drink water.",
      repeat: 3
    },
    practiceChallenge: {
      question: "저는 책__ 읽어요. (Jeo-neun chaek__ il-geo-yo.) I read a book.",
      answer: "✅ Answer: 책을 (Chae-geul) the book"
    },
    relatedGrammar: ["은 / 는 (eun / neun) Topic Marker"],
    relatedVocabulary: [
      { kr: "먹다", rom: "meok-da", en: "to eat" },
      { kr: "마시다", rom: "ma-si-da", en: "to drink" },
      { kr: "읽다", rom: "ik-da", en: "to read" }
    ],
    teacherNote: "Core function: Object Marker.\nExplain it as \"what receives the action.\"\nCompare with 이 / 가 (i / ga) — Subject Marker when learners are confused.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G004",
    grammar: "에(e) ",
    romanization: "e",
    title: "Location / Time Marker",
    keywords: ["location marker", "time marker", "e particle", "at to in on"],
    sentencePatterns: ["에"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine someone asks, \"Where?\" or \"When?\"\nKorean uses 에 (e) Location / Time Marker to answer both questions.",
    memoryTrick: "🟩 에 (e) Location / Time Marker = At / To / In / On\nThink:\n📍Where?\n🕒When?",
    easyExplanation: "에 (e) Location / Time Marker shows a place or a time.\nIt tells us where something happens or when it happens.\nNative Koreans use it every day.",
    basicRule: "Unlike many Korean particles, 에 (e) Location / Time Marker does NOT change.\nUse 에 (e) Location / Time Marker after both consonants and vowels.\n\nExample:\n학교 (hak-gyo) school ↓ 학교에 (hak-gyo-e) to school / at school\n집 (jip) home ↓ 집에 (ji-be) to home / at home",
    examples: [
      { kr: "학교에 가요.", rom: "Hak-gyo-e ga-yo.", en: "I go to school." },
      { kr: "집에 있어요.", rom: "Ji-be i-sseo-yo.", en: "I am at home." },
      { kr: "세 시에 만나요.", rom: "Se si-e man-na-yo.", en: "Let's meet at three o'clock." }
    ],
    nativeTip: "Native Koreans use 에 (e) Location / Time Marker for places and time.\nWhen talking about movement, it often means to.\nWhen talking about time, it often means at or on.",
    commonMistakes: [
      { wrong: "❌ 학교를 가요. (Hak-gyo-reul ga-yo.) I go school. Wrong", correct: "✅ 학교에 가요. (Hak-gyo-e ga-yo.) I go to school. Correct" },
      { wrong: "❌ 세 시를 만나요. (Se si-reul man-na-yo.) Meet three o'clock. Wrong", correct: "✅ 세 시에 만나요. (Se si-e man-na-yo.) Let's meet at three o'clock. Correct" }
    ],
    compare: [
      { grammar: "에 (e)", meaning: "Location / Time Marker", mainJob: "Shows where or when" },
      { grammar: "에서 (e-seo)", meaning: "Action Location Marker", mainJob: "Shows where an action happens" }
    ],
    miniQuiz: {
      question: "학교__ (Hak-gyo __ ) to school",
      options: ["① 에 (e) Location / Time Marker", "② 에서 (e-seo) Action Location Marker"],
      answer: "✅ Answer: 에 (e) Location / Time Marker",
      reason: "Because you are going to school."
    },
    speakingPractice: {
      kr: "집에 가요.",
      rom: "Ji-be ga-yo.",
      en: "I go home.",
      repeat: 3
    },
    practiceChallenge: {
      question: "저는 학교__ 가요. (Jeo-neun hak-gyo__ ga-yo.) I go to school.",
      answer: "✅ Answer: 학교에 (Hak-gyo-e) to school"
    },
    relatedGrammar: ["에서 (e-seo) Action Location Marker"],
    relatedVocabulary: [
      { kr: "학교", rom: "hak-gyo", en: "school" },
      { kr: "집", rom: "jip", en: "home" },
      { kr: "시간", rom: "si-gan", en: "time" }
    ],
    teacherNote: "Core function: Location and Time Marker.\nTeach 에 = Where? / When?\nCompare with 에서 (e-seo) — Action Location Marker before introducing movement vs. action differences.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G005",
    grammar: "에서",
    romanization: "e-seo",
    title: "Action Location Marker",
    keywords: ["action location marker", "e-seo", "at doing something"],
    sentencePatterns: ["에서"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine someone asks, \"Where are you studying?\" or \"Where are you eating?\"\nKorean uses 에서 (e-seo) Action Location Marker to show the place where an action happens.",
    memoryTrick: "🟦 에서 (e-seo) Action Location Marker = At (doing something)\nThink:\n📍Where is the action happening?",
    easyExplanation: "에서 (e-seo) Action Location Marker shows the place where someone does an action.\nIf you are eating, studying, working, shopping, or playing somewhere, use 에서 (e-seo) Action Location Marker.",
    basicRule: "Use 에서 (e-seo) after any place.\n\nExample:\n학교 (hak-gyo) school ↓ 학교에서 (hak-gyo-e-seo) at school\n집 (jip) home ↓ 집에서 (ji-be-seo) at home",
    examples: [
      { kr: "학교에서 공부해요.", rom: "Hak-gyo-e-seo gong-bu-hae-yo.", en: "I study at school." },
      { kr: "집에서 쉬어요.", rom: "Ji-be-seo swi-eo-yo.", en: "I rest at home." },
      { kr: "식당에서 밥을 먹어요.", rom: "Sik-dang-e-seo ba-beul meo-geo-yo.", en: "I eat at a restaurant." }
    ],
    nativeTip: "Use 에 (e) when talking about going to a place.\nUse 에서 (e-seo) when talking about doing something there.",
    commonMistakes: [
      { wrong: "❌ 학교에 공부해요. (Hak-gyo-e gong-bu-hae-yo.) I study at school. Wrong", correct: "✅ 학교에서 공부해요. (Hak-gyo-e-seo gong-bu-hae-yo.) I study at school. Correct" },
      { wrong: "❌ 집에 쉬어요. (Ji-be swi-eo-yo.) I rest at home. Wrong", correct: "✅ 집에서 쉬어요. (Ji-be-seo swi-eo-yo.) I rest at home. Correct" }
    ],
    compare: [
      { grammar: "에 (e)", meaning: "Location / Time Marker", mainJob: "Destination or time" },
      { grammar: "에서 (e-seo)", meaning: "Action Location Marker", mainJob: "Place where an action happens" }
    ],
    miniQuiz: {
      question: "학교__ (Hak-gyo __ ) I study at school.",
      options: ["① 에 (e) Location Marker", "② 에서 (e-seo) Action Location Marker"],
      answer: "✅ Answer: ② 에서 (e-seo) Action Location Marker",
      reason: "Because studying is an action."
    },
    speakingPractice: {
      kr: "카페에서 커피를 마셔요.",
      rom: "Ka-pe-e-seo keo-pi-reul ma-syeo-yo.",
      en: "I drink coffee at a café.",
      repeat: 3
    },
    practiceChallenge: {
      question: "저는 집__ 공부해요. (Jeo-neun jip__ gong-bu-hae-yo.) I study at home.",
      answer: "✅ Answer: 집에서 (Ji-be-seo) at home"
    },
    relatedGrammar: ["에 (e) Location / Time Marker"],
    relatedVocabulary: [
      { kr: "공부하다", rom: "gong-bu-ha-da", en: "to study" },
      { kr: "쉬다", rom: "swi-da", en: "to rest" },
      { kr: "식당", rom: "sik-dang", en: "restaurant" }
    ],
    teacherNote: "Core function: Place where an action happens.\nTeach the easy rule:\n에 (e) = Go to / Be at\n에서 (e-seo) = Do something at\nAlways compare 에 and 에서 because beginners confuse them most.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G006",
    grammar: "도",
    romanization: "do",
    title: "Also / Too",
    keywords: ["also", "too", "do particle", "me too"],
    sentencePatterns: ["도"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine your friend says, \"I like coffee.\"\nYou also like coffee.\nKorean uses 도 (do) Also / Too to mean \"also\" or \"too.\"",
    memoryTrick: "🟨 도 (do) Also / Too = Also = Too\nThink:\nMe too!",
    easyExplanation: "도 (do) Also / Too means also or too.\nIt shows that something is the same as something mentioned before.\nNative Koreans use it very often.",
    basicRule: "Add 도 (do) after a noun.\n\nExample:\n저 (jeo) I ↓ 저도 (jeo-do) Me too\n친구 (chin-gu) friend ↓ 친구도 (chin-gu-do) My friend too",
    examples: [
      { kr: "저도 학생이에요.", rom: "Jeo-do hak-saeng-i-e-yo.", en: "I am a student too." },
      { kr: "저도 커피를 좋아해요.", rom: "Jeo-do keo-pi-reul jo-a-hae-yo.", en: "I like coffee too." },
      { kr: "오늘도 바빠요.", rom: "O-neul-do ba-ppa-yo.", en: "Today is busy too." }
    ],
    nativeTip: "Native Koreans often answer with 저도요! (Jeo-do-yo!) Me too!\nThis is one of the most common everyday expressions.",
    commonMistakes: [
      { wrong: "❌ 저는도 학생이에요. (Jeo-neun-do hak-saeng-i-e-yo.) I am a student too. Wrong", correct: "✅ 저도 학생이에요. (Jeo-do hak-saeng-i-e-yo.) I am a student too. Correct" },
      { wrong: "❌ 친구는도 왔어요. (Chin-gu-neun-do wa-sseo-yo.) My friend came too. Wrong", correct: "✅ 친구도 왔어요. (Chin-gu-do wa-sseo-yo.) My friend came too. Correct" }
    ],
    compare: [
      { grammar: "도 (do)", meaning: "Also / Too", mainJob: "Adds the meaning of \"also\"" },
      { grammar: "은 / 는 (eun / neun)", meaning: "Topic Marker", mainJob: "Shows the topic" }
    ],
    miniQuiz: {
      question: "저__ (Jeo __ ) Me too",
      options: ["① 도 (do) Also / Too", "② 은 (eun) Topic Marker"],
      answer: "✅ Answer: ① 도 (do) Also / Too",
      reason: "Because you want to say \"Me too.\""
    },
    speakingPractice: {
      kr: "저도 한국어를 공부해요.",
      rom: "Jeo-do Han-gu-geo-reul gong-bu-hae-yo.",
      en: "I study Korean too.",
      repeat: 3
    },
    practiceChallenge: {
      question: "친구__ 왔어요. (Chin-gu__ wa-sseo-yo.) My friend came too.",
      answer: "✅ Answer: 친구도 (Chin-gu-do) My friend too"
    },
    relatedGrammar: ["만 (man) Only"],
    relatedVocabulary: [
      { kr: "친구", rom: "chin-gu", en: "friend" },
      { kr: "오늘", rom: "o-neul", en: "today" },
      { kr: "커피", rom: "keo-pi", en: "coffee" }
    ],
    teacherNote: "Core function: Adds the meaning \"also / too.\"\nTeach 도 = also / too before introducing 만 (man) = only.\nFrequently compare 도 and 만 because learners confuse them.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G007",
    grammar: "만",
    romanization: "man",
    title: "Only",
    keywords: ["only", "man particle", "just one"],
    sentencePatterns: ["만"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you only want coffee. Not tea. Not juice.\nKorean uses 만 (man) Only to mean \"only.\"",
    memoryTrick: "🟪 만 (man) Only = Only\nThink:\nJust one.\nOnly this.",
    easyExplanation: "만 (man) Only means only.\nIt limits something.\nIt tells the listener, \"Nothing else.\"",
    basicRule: "Add 만 (man) after a noun.\n\nExample:\n저 (jeo) I ↓ 저만 (jeo-man) Only me\n커피 (keo-pi) coffee ↓ 커피만 (keo-pi-man) Only coffee",
    examples: [
      { kr: "저만 학생이에요.", rom: "Jeo-man hak-saeng-i-e-yo.", en: "Only I am a student." },
      { kr: "커피만 마셔요.", rom: "Keo-pi-man ma-syeo-yo.", en: "I drink only coffee." },
      { kr: "오늘만 쉬어요.", rom: "O-neul-man swi-eo-yo.", en: "I rest only today." }
    ],
    nativeTip: "Native Koreans often use 만 (man) Only to emphasize one thing.\nExample: 한국어만 공부해요. (Han-gu-geo-man gong-bu-hae-yo.) I study only Korean.",
    commonMistakes: [
      { wrong: "❌ 저도만 학생이에요. (Jeo-do-man hak-saeng-i-e-yo.) Only me. Wrong", correct: "✅ 저만 학생이에요. (Jeo-man hak-saeng-i-e-yo.) Only I am a student. Correct" },
      { wrong: "❌ 커피를만 마셔요. (Keo-pi-reul-man ma-syeo-yo.) Wrong", correct: "✅ 커피만 마셔요. (Keo-pi-man ma-syeo-yo.) I drink only coffee. Correct" }
    ],
    compare: [
      { grammar: "만 (man)", meaning: "Only", mainJob: "Limits one thing" },
      { grammar: "도 (do)", meaning: "Also / Too", mainJob: "Adds another thing" }
    ],
    miniQuiz: {
      question: "커피__ (Keo-pi __ ) Only coffee",
      options: ["① 도 (do) Also / Too", "② 만 (man) Only"],
      answer: "✅ Answer: ② 만 (man) Only",
      reason: "Because you mean only coffee."
    },
    speakingPractice: {
      kr: "저는 한국어만 공부해요.",
      rom: "Jeo-neun Han-gu-geo-man gong-bu-hae-yo.",
      en: "I study only Korean.",
      repeat: 3
    },
    practiceChallenge: {
      question: "저__ 왔어요. (Jeo__ wa-sseo-yo.) Only I came.",
      answer: "✅ Answer: 저만 (Jeo-man) Only me"
    },
    relatedGrammar: ["도 (do) Also / Too"],
    relatedVocabulary: [
      { kr: "오늘", rom: "o-neul", en: "today" },
      { kr: "커피", rom: "keo-pi", en: "coffee" },
      { kr: "한국어", rom: "Han-gu-geo", en: "Korean language" }
    ],
    teacherNote: "Core function: Shows \"only.\"\nTeach together with 도 (do) — Also / Too because they are opposite ideas.\nEasy rule:\n도 = also\n만 = only\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G008",
    grammar: "와 / 과",
    romanization: "wa / gwa",
    title: "And / With",
    keywords: ["and", "with", "wa gwa"],
    sentencePatterns: ["와", "과"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you want to say, \"Coffee and bread.\"\nKorean uses 와 / 과 (wa / gwa) And / With to connect two nouns.",
    memoryTrick: "🟩 와 / 과 (wa / gwa) And / With = And = With\nThink:\nA + B",
    easyExplanation: "와 / 과 (wa / gwa) And / With connects two nouns.\nIt means and or with, depending on the sentence.\nNative Koreans use it every day.",
    basicRule: "✅ After a consonant → use 과 (gwa) And / With\nExample:\n책 (chaek) book ↓ 책과 (chaek-gwa) book and...\n\n✅ After a vowel → use 와 (wa) And / With\nExample:\n사과 (sa-gwa) apple ↓ 사과와 (sa-gwa-wa) apple and...",
    examples: [
      { kr: "빵과 우유", rom: "Ppang-gwa u-yu", en: "Bread and milk" },
      { kr: "사과와 바나나", rom: "Sa-gwa-wa ba-na-na", en: "Apple and banana" },
      { kr: "친구와 공부해요.", rom: "Chin-gu-wa gong-bu-hae-yo.", en: "I study with my friend." }
    ],
    nativeTip: "In everyday conversation, Koreans often use 하고 (ha-go) and instead of 와 / 과 (wa / gwa) because it sounds more natural.",
    commonMistakes: [
      { wrong: "❌ 사과과 (Sa-gwa-gwa) Apple and Wrong", correct: "✅ 사과와 (Sa-gwa-wa) Apple and Correct" },
      { wrong: "❌ 책와 (Chaek-wa) Book and Wrong", correct: "✅ 책과 (Chaek-gwa) Book and Correct" }
    ],
    compare: [
      { grammar: "와 / 과 (wa / gwa)", meaning: "And / With", mainJob: "Connects nouns" },
      { grammar: "하고 (ha-go)", meaning: "And", mainJob: "Casual everyday connection" }
    ],
    miniQuiz: {
      question: "친구__ (Chin-gu __ ) With my friend",
      options: ["① 와 (wa) And / With", "② 과 (gwa) And / With"],
      answer: "✅ Answer: ① 와 (wa) And / With",
      reason: "Because 친구 (chin-gu) friend ends with a vowel."
    },
    speakingPractice: {
      kr: "친구와 커피를 마셔요.",
      rom: "Chin-gu-wa keo-pi-reul ma-syeo-yo.",
      en: "I drink coffee with my friend.",
      repeat: 3
    },
    practiceChallenge: {
      question: "책__ 연필 (Chaek__ yeon-pil) Book and pencil",
      answer: "✅ Answer: 책과 (Chaek-gwa) Book and"
    },
    relatedGrammar: ["하고 (ha-go) And (casual)"],
    relatedVocabulary: [
      { kr: "친구", rom: "chin-gu", en: "friend" },
      { kr: "책", rom: "chaek", en: "book" },
      { kr: "사과", rom: "sa-gwa", en: "apple" }
    ],
    teacherNote: "Core function: Connects two nouns.\nTeach:\n와 / 과 = formal/neutral\n하고 = everyday casual\nExplain both \"and\" and \"with\" meanings.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G009",
    grammar: "하고",
    romanization: "ha-go",
    title: "And (Casual)",
    keywords: ["and casual", "ha-go", "with casual"],
    sentencePatterns: ["하고"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you are talking with your friend.\nYou want to say, \"Coffee and bread.\"\nNative Koreans often use 하고 (ha-go) And (Casual) instead of 와 / 과 (wa / gwa) because it sounds more natural.",
    memoryTrick: "🟦 하고 (ha-go) And = and\nThink:\nA and B\nVery easy.",
    easyExplanation: "하고 (ha-go) And connects two nouns.\nIt means and.\nIt is easier and more common in everyday conversation than 와 / 과 (wa / gwa).",
    basicRule: "Just add 하고 (ha-go) after a noun.\nNo consonant/vowel rule.\n\nExample:\n사과 (sa-gwa) apple ↓ 사과하고 (sa-gwa-ha-go) apple and...\n책 (chaek) book ↓ 책하고 (chaek-ha-go) book and...",
    examples: [
      { kr: "빵하고 우유", rom: "Ppang-ha-go u-yu", en: "Bread and milk" },
      { kr: "사과하고 바나나", rom: "Sa-gwa-ha-go ba-na-na", en: "Apple and banana" },
      { kr: "친구하고 영화 봐요.", rom: "Chin-gu-ha-go yeong-hwa bwa-yo.", en: "I watch a movie with my friend." }
    ],
    nativeTip: "In daily conversation, Koreans usually say 하고 (ha-go) instead of 와 / 과 (wa / gwa). It sounds friendlier and more natural.",
    commonMistakes: [
      { wrong: "❌ 사과하고와 (Sa-gwa-ha-go-wa) Apple and Wrong", correct: "✅ 사과하고 (Sa-gwa-ha-go) Apple and Correct" },
      { wrong: "❌ 책과하고 (Chaek-gwa-ha-go) Book and Wrong", correct: "✅ 책하고 (Chaek-ha-go) Book and Correct" }
    ],
    compare: [
      { grammar: "하고 (ha-go)", meaning: "And", mainJob: "Casual everyday connection" },
      { grammar: "와 / 과 (wa / gwa)", meaning: "And / With", mainJob: "Neutral or written connection" }
    ],
    miniQuiz: {
      question: "친구__ 가족 (Chin-gu __ ga-jok) Friend and family",
      options: ["① 하고 (ha-go) And", "② 와 (wa) And / With"],
      answer: "✅ Answer: ① 하고 (ha-go) And",
      reason: "It is the most natural everyday expression."
    },
    speakingPractice: {
      kr: "친구하고 커피 마셔요.",
      rom: "Chin-gu-ha-go keo-pi ma-syeo-yo.",
      en: "I drink coffee with my friend.",
      repeat: 3
    },
    practiceChallenge: {
      question: "엄마__ 아빠 (Eom-ma __ a-bba) Mom and Dad",
      answer: "✅ Answer: 엄마하고 (Eom-ma-ha-go) Mom and"
    },
    relatedGrammar: ["와 / 과 (wa / gwa) And / With"],
    relatedVocabulary: [
      { kr: "친구", rom: "chin-gu", en: "friend" },
      { kr: "가족", rom: "ga-jok", en: "family" },
      { kr: "영화", rom: "yeong-hwa", en: "movie" }
    ],
    teacherNote: "Core function: Casual \"and.\"\nTeach learners that 하고 is the most common spoken form.\nAfter this lesson, compare:\n하고 = casual\n와 / 과 = neutral/formal\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G010",
    grammar: "(으)로",
    romanization: "(eu)-ro / ro",
    title: "To / By / With / Toward",
    keywords: ["direction particle", "by bus", "with chopsticks", "euro ro"],
    sentencePatterns: ["으로", "로"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you want to say, \"I go to school by bus.\" or \"Please go to the left.\"\nKorean uses (으)로 ((eu)-ro / ro) To / By / With / Toward to show direction, method, or tool.",
    memoryTrick: "🟦 (으)로 ((eu)-ro / ro) = ➡ To 🚌 By 🥄 With\nThink:\nHow?\nWhich way?\nWhat tool?",
    easyExplanation: "(으)로 ((eu)-ro / ro) has several meanings.\nMost beginners use it for:\nto (direction)\nby (transportation)\nwith (tool)\nNative Koreans use this grammar every day.",
    basicRule: "✅ After a consonant → use 으로 (eu-ro)\nExample:\n집 (jip) home ↓ 집으로 (ji-beu-ro) to home\n\n✅ After a vowel → use 로 (ro)\nExample:\n학교 (hak-gyo) school ↓ 학교로 (hak-gyo-ro) to school",
    examples: [
      { kr: "버스로 가요.", rom: "Beo-seu-ro ga-yo.", en: "I go by bus." },
      { kr: "왼쪽으로 가세요.", rom: "Wen-jjok-eu-ro ga-se-yo.", en: "Please go to the left." },
      { kr: "젓가락으로 먹어요.", rom: "Jeot-ga-rak-eu-ro meo-geo-yo.", en: "I eat with chopsticks." }
    ],
    nativeTip: "Native Koreans use (으)로 ((eu)-ro / ro) for many situations.\nThe three most common meanings are: to, by, with. Learn these first.",
    commonMistakes: [
      { wrong: "❌ 버스에 가요. (Beo-seu-e ga-yo.) I go by bus. Wrong", correct: "✅ 버스로 가요. (Beo-seu-ro ga-yo.) I go by bus. Correct" },
      { wrong: "❌ 젓가락을 먹어요. (Jeot-ga-ra-geul meo-geo-yo.) I eat chopsticks. Wrong", correct: "✅ 젓가락으로 먹어요. (Jeot-ga-rak-eu-ro meo-geo-yo.) I eat with chopsticks. Correct" }
    ],
    compare: [
      { grammar: "(으)로 ((eu)-ro / ro)", meaning: "To / By / With", mainJob: "Direction, transportation, tool" },
      { grammar: "에 (e)", meaning: "At / To", mainJob: "Destination or time" }
    ],
    miniQuiz: {
      question: "버스__ (Beo-seu __ ) by bus",
      options: ["① 로 (ro) To / By / With", "② 에 (e) Location Marker"],
      answer: "✅ Answer: ① 로 (ro) To / By / With",
      reason: "Because transportation uses (으)로 ((eu)-ro / ro)."
    },
    speakingPractice: {
      kr: "버스로 학교에 가요.",
      rom: "Beo-seu-ro hak-gyo-e ga-yo.",
      en: "I go to school by bus.",
      repeat: 3
    },
    practiceChallenge: {
      question: "저는 젓가락__ 먹어요. (Jeo-neun jeot-ga-rak__ meo-geo-yo.) I eat with chopsticks.",
      answer: "✅ Answer: 젓가락으로 (Jeot-ga-rak-eu-ro) with chopsticks"
    },
    relatedGrammar: ["에 (e) Location / Time Marker"],
    relatedVocabulary: [
      { kr: "버스", rom: "beo-seu", en: "bus" },
      { kr: "왼쪽", rom: "wen-jjok", en: "left" },
      { kr: "젓가락", rom: "jeot-ga-rak", en: "chopsticks" }
    ],
    teacherNote: "Core function: Direction, transportation, and tool.\nTeach beginners only the three meanings: to, by, with.\nExplain special rule:\n로 (ro) after vowels\n으로 ((eu)-ro) after consonants\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G011",
    grammar: "에게 / 한테",
    romanization: "e-ge / han-te",
    title: "To / For (Person)",
    keywords: ["to a person", "for a person", "ege hante"],
    sentencePatterns: ["에게", "한테"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you want to say, \"I gave a gift to my friend.\"\nKorean uses 에게 / 한테 (e-ge / han-te) To / For (Person) to show the person who receives something.",
    memoryTrick: "🟦 에게 / 한테 (e-ge / han-te) = 👤 To a person\nThink:\nTo who?",
    easyExplanation: "에게 / 한테 (e-ge / han-te) means to or for a person.\nIt tells us who receives the action.\nNative Koreans use 한테 (han-te) more often in everyday conversation.",
    basicRule: "Use 에게 (e-ge) for polite or written Korean.\nUse 한테 (han-te) for everyday conversation.\nBoth mean the same thing.",
    examples: [
      { kr: "친구에게 선물을 줘요.", rom: "Chin-gu-e-ge seon-mu-reul jwo-yo.", en: "I give a gift to my friend." },
      { kr: "엄마한테 전화해요.", rom: "Eom-ma-han-te jeon-hwa-hae-yo.", en: "I call my mom." },
      { kr: "선생님에게 질문해요.", rom: "Seon-saeng-nim-e-ge jil-mun-hae-yo.", en: "I ask the teacher a question." }
    ],
    nativeTip: "Native Koreans usually say 한테 (han-te) when talking with friends. They use 에게 (e-ge) more in writing or formal situations.",
    commonMistakes: [
      { wrong: "❌ 친구를 선물을 줘요. (Chin-gu-reul seon-mu-reul jwo-yo.) I give a gift to my friend. Wrong", correct: "✅ 친구에게 선물을 줘요. (Chin-gu-e-ge seon-mu-reul jwo-yo.) I give a gift to my friend. Correct" },
      { wrong: "❌ 엄마에 전화해요. (Eom-ma-e jeon-hwa-hae-yo.) I call my mom. Wrong", correct: "✅ 엄마한테 전화해요. (Eom-ma-han-te jeon-hwa-hae-yo.) I call my mom. Correct" }
    ],
    compare: [
      { grammar: "에게 (e-ge)", meaning: "To / For", mainJob: "Formal receiver" },
      { grammar: "한테 (han-te)", meaning: "To / For", mainJob: "Casual receiver" }
    ],
    miniQuiz: {
      question: "친구__ 선물을 줘요. (Chin-gu__ seon-mu-reul jwo-yo.) I give a gift to my friend.",
      options: ["① 에게 (e-ge) To / For", "② 한테 (han-te) To / For"],
      answer: "✅ Answer: ① 또는 ② 모두 가능 (Both are correct.)",
      reason: "에게 (e-ge) = more formal, 한테 (han-te) = everyday conversation"
    },
    speakingPractice: {
      kr: "친구한테 말해요.",
      rom: "Chin-gu-han-te mal-hae-yo.",
      en: "I speak to my friend.",
      repeat: 3
    },
    practiceChallenge: {
      question: "선생님__ 질문해요. (Seon-saeng-nim__ jil-mun-hae-yo.) I ask the teacher a question.",
      answer: "✅ Answer: 선생님에게 (Seon-saeng-nim-e-ge) to the teacher"
    },
    relatedGrammar: ["에게서 / 한테서 (e-ge-seo / han-te-seo) From (a person)"],
    relatedVocabulary: [
      { kr: "친구", rom: "chin-gu", en: "friend" },
      { kr: "선물", rom: "seon-mul", en: "gift" },
      { kr: "선생님", rom: "seon-saeng-nim", en: "teacher" }
    ],
    teacherNote: "Core function: Shows the receiver (person).\nTeach:\n에게 (e-ge) = formal\n한테 (han-te) = everyday casual\nNext lesson should be G012 — 에게서 / 한테서 (From a person) because learners naturally connect to and from."
  },
  {
    id: "G012",
    grammar: "에게서 / 한테서",
    romanization: "e-ge-seo / han-te-seo",
    title: "From (a Person)",
    keywords: ["from a person", "egeseo hanteseo"],
    sentencePatterns: ["에게서", "한테서"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine your friend gives you a gift.\nYou say, \"I got a gift from my friend.\"\nKorean uses 에게서 / 한테서 (e-ge-seo / han-te-seo) From (a Person) to show who something comes from.",
    memoryTrick: "🟩 에게서 / 한테서 (e-ge-seo / han-te-seo) = From\nThink:\n👤➡️Me\nFrom someone",
    easyExplanation: "에게서 / 한테서 (e-ge-seo / han-te-seo) means from a person.\nIt tells us who gives, sends, teaches, or says something.\nNative Koreans use 한테서 (han-te-seo) more often in everyday conversation.",
    basicRule: "Use 에게서 (e-ge-seo) for polite or written Korean.\nUse 한테서 (han-te-seo) for everyday conversation.\nBoth mean the same thing.",
    examples: [
      { kr: "친구에게서 선물을 받았어요.", rom: "Chin-gu-e-ge-seo seon-mu-reul ba-da-sseo-yo.", en: "I received a gift from my friend." },
      { kr: "엄마한테서 전화가 왔어요.", rom: "Eom-ma-han-te-seo jeon-hwa-ga wa-sseo-yo.", en: "I got a call from my mom." },
      { kr: "선생님에게서 한국어를 배워요.", rom: "Seon-saeng-nim-e-ge-seo Han-gu-geo-reul bae-wo-yo.", en: "I learn Korean from my teacher." }
    ],
    nativeTip: "Native Koreans usually say 한테서 (han-te-seo) when speaking casually.\nThey use 에게서 (e-ge-seo) more in writing or formal situations.",
    commonMistakes: [
      { wrong: "❌ 친구에게 선물을 받았어요. (Chin-gu-e-ge seon-mu-reul ba-da-sseo-yo.) I received a gift to my friend. Wrong", correct: "✅ 친구에게서 선물을 받았어요. (Chin-gu-e-ge-seo seon-mu-reul ba-da-sseo-yo.) I received a gift from my friend. Correct" },
      { wrong: "❌ 엄마한테 전화가 왔어요. (Eom-ma-han-te jeon-hwa-ga wa-sseo-yo.) A call came to my mom. Wrong", correct: "✅ 엄마한테서 전화가 왔어요. (Eom-ma-han-te-seo jeon-hwa-ga wa-sseo-yo.) I got a call from my mom. Correct" }
    ],
    compare: [
      { grammar: "에게 / 한테 (e-ge / han-te)", meaning: "To / For", mainJob: "Receiver" },
      { grammar: "에게서 / 한테서 (e-ge-seo / han-te-seo)", meaning: "From", mainJob: "Starting person" }
    ],
    miniQuiz: {
      question: "친구__ 편지를 받았어요. (Chin-gu__ pyeon-ji-reul ba-da-sseo-yo.) I received a letter from my friend.",
      options: ["① 에게 (e-ge) To", "② 에게서 (e-ge-seo) From"],
      answer: "✅ Answer: ② 에게서 (e-ge-seo) From",
      reason: "Because the letter comes from your friend."
    },
    speakingPractice: {
      kr: "친구한테서 선물을 받았어요.",
      rom: "Chin-gu-han-te-seo seon-mu-reul ba-da-sseo-yo.",
      en: "I received a gift from my friend.",
      repeat: 3
    },
    practiceChallenge: {
      question: "선생님__ 한국어를 배워요. (Seon-saeng-nim__ Han-gu-geo-reul bae-wo-yo.) I learn Korean from my teacher.",
      answer: "✅ Answer: 선생님에게서 (Seon-saeng-nim-e-ge-seo) from the teacher"
    },
    relatedGrammar: ["에게 / 한테 (e-ge / han-te) To / For (Person)"],
    relatedVocabulary: [
      { kr: "선물", rom: "seon-mul", en: "gift" },
      { kr: "전화", rom: "jeon-hwa", en: "phone call" },
      { kr: "배우다", rom: "bae-u-da", en: "to learn" }
    ],
    teacherNote: "Core function: Shows the starting person (\"from\").\nTeach together with:\n에게 / 한테 = to\n에게서 / 한테서 = from\nEasy rule:\nTo → 에게 / 한테\nFrom → 에게서 / 한테서\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G013",
    grammar: "부터",
    romanization: "bu-teo",
    title: "From / Starting From",
    keywords: ["from", "starting from", "buteo"],
    sentencePatterns: ["부터"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine someone asks, \"When does class start?\"\nYou answer, \"From 9 o'clock.\"\nKorean uses 부터 (bu-teo) From / Starting From to show the starting point of time or place.",
    memoryTrick: "🟦 부터 (bu-teo) = From = Starting from\nThink:\n⬅️ Start here",
    easyExplanation: "부터 (bu-teo) means from or starting from.\nIt tells us where or when something begins.\nNative Koreans use it every day.",
    basicRule: "Add 부터 (bu-teo) after a noun.\n\nExample:\n오늘 (o-neul) today ↓ 오늘부터 (o-neul-bu-teo) from today\n아홉 시 (a-hop si) 9 o'clock ↓ 아홉 시부터 (a-hop si-bu-teo) from 9 o'clock",
    examples: [
      { kr: "오늘부터 공부해요.", rom: "O-neul-bu-teo gong-bu-hae-yo.", en: "I study from today." },
      { kr: "아홉 시부터 일해요.", rom: "A-hop si-bu-teo il-hae-yo.", en: "I work from 9 o'clock." },
      { kr: "서울부터 부산까지 가요.", rom: "Seo-ul-bu-teo Bu-san-kka-ji ga-yo.", en: "I go from Seoul to Busan." }
    ],
    nativeTip: "Native Koreans often use 부터 (bu-teo) together with 까지 (kka-ji) to mean from ~ to ~.",
    commonMistakes: [
      { wrong: "❌ 오늘에 공부해요. (O-neul-e gong-bu-hae-yo.) I study from today. Wrong", correct: "✅ 오늘부터 공부해요. (O-neul-bu-teo gong-bu-hae-yo.) I study from today. Correct" },
      { wrong: "❌ 아홉 시에 일해요. (A-hop si-e il-hae-yo.) I work from 9 o'clock. Wrong (if starting time)", correct: "✅ 아홉 시부터 일해요. (A-hop si-bu-teo il-hae-yo.) I work from 9 o'clock. Correct" }
    ],
    compare: [
      { grammar: "부터 (bu-teo)", meaning: "From", mainJob: "Starting point" },
      { grammar: "까지 (kka-ji)", meaning: "Until / To", mainJob: "Ending point" }
    ],
    miniQuiz: {
      question: "오늘__ (O-neul __ ) From today",
      options: ["① 부터 (bu-teo) From", "② 까지 (kka-ji) Until"],
      answer: "✅ Answer: ① 부터 (bu-teo) From",
      reason: "Because today is the starting point."
    },
    speakingPractice: {
      kr: "오늘부터 한국어를 공부해요.",
      rom: "O-neul-bu-teo Han-gu-geo-reul gong-bu-hae-yo.",
      en: "I study Korean from today.",
      repeat: 3
    },
    practiceChallenge: {
      question: "월요일__ 운동해요. (Wol-yo-il__ un-dong-hae-yo.) I exercise from Monday.",
      answer: "✅ Answer: 월요일부터 (Wol-yo-il-bu-teo) from Monday"
    },
    relatedGrammar: ["까지 (kka-ji) Until / To"],
    relatedVocabulary: [
      { kr: "오늘", rom: "o-neul", en: "today" },
      { kr: "월요일", rom: "wol-yo-il", en: "Monday" },
      { kr: "시작하다", rom: "si-jak-ha-da", en: "to start" }
    ],
    teacherNote: "Core function: Shows the starting point.\nTeach beginners:\n부터 = from / starting from\n까지 = until / to\nIntroduce the common pattern:\n부터 ~ 까지 = from ~ to ~\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G014",
    grammar: "까지",
    romanization: "kka-ji",
    title: "Until / To",
    keywords: ["until", "to", "kkaji"],
    sentencePatterns: ["까지"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine someone asks, \"Until what time?\"\nYou answer, \"Until 5 o'clock.\"\nKorean uses 까지 (kka-ji) Until / To to show the ending point.",
    memoryTrick: "🟥 까지 (kka-ji) = Until = To\nThink:\n➡️ Finish here",
    easyExplanation: "까지 (kka-ji) means until or to.\nIt tells us where or when something ends.\nNative Koreans use it every day.",
    basicRule: "Add 까지 (kka-ji) after a noun.\n\nExample:\n내일 (nae-il) tomorrow ↓ 내일까지 (nae-il-kka-ji) until tomorrow\n다섯 시 (da-seot si) 5 o'clock ↓ 다섯 시까지 (da-seot si-kka-ji) until 5 o'clock",
    examples: [
      { kr: "다섯 시까지 일해요.", rom: "Da-seot si-kka-ji il-hae-yo.", en: "I work until 5 o'clock." },
      { kr: "내일까지 숙제를 해요.", rom: "Nae-il-kka-ji suk-je-reul hae-yo.", en: "I do my homework until tomorrow." },
      { kr: "서울까지 버스로 가요.", rom: "Seo-ul-kka-ji beo-seu-ro ga-yo.", en: "I go to Seoul by bus." }
    ],
    nativeTip: "Native Koreans often use 부터 (bu-teo) and 까지 (kka-ji) together.\nExample: 아홉 시부터 다섯 시까지 (A-hop si-bu-teo da-seot si-kka-ji) From 9 o'clock until 5 o'clock.",
    commonMistakes: [
      { wrong: "❌ 다섯 시에 일해요. (Da-seot si-e il-hae-yo.) I work until 5 o'clock. Wrong (if ending time)", correct: "✅ 다섯 시까지 일해요. (Da-seot si-kka-ji il-hae-yo.) I work until 5 o'clock. Correct" },
      { wrong: "❌ 내일부터 숙제를 해요. (Nae-il-bu-teo suk-je-reul hae-yo.) I do homework until tomorrow. Wrong", correct: "✅ 내일까지 숙제를 해요. (Nae-il-kka-ji suk-je-reul hae-yo.) I do homework until tomorrow. Correct" }
    ],
    compare: [
      { grammar: "부터 (bu-teo)", meaning: "From", mainJob: "Starting point" },
      { grammar: "까지 (kka-ji)", meaning: "Until / To", mainJob: "Ending point" }
    ],
    miniQuiz: {
      question: "다섯 시__ (Da-seot si __ ) Until 5 o'clock",
      options: ["① 부터 (bu-teo) From", "② 까지 (kka-ji) Until"],
      answer: "✅ Answer: ② 까지 (kka-ji) Until",
      reason: "Because 5 o'clock is the ending point."
    },
    speakingPractice: {
      kr: "여섯 시까지 공부해요.",
      rom: "Yeo-seot si-kka-ji gong-bu-hae-yo.",
      en: "I study until 6 o'clock.",
      repeat: 3
    },
    practiceChallenge: {
      question: "금요일__ 기다릴게요. (Geum-yo-il__ gi-da-ril-ge-yo.) I will wait until Friday.",
      answer: "✅ Answer: 금요일까지 (Geum-yo-il-kka-ji) until Friday"
    },
    relatedGrammar: ["부터 (bu-teo) From / Starting From"],
    relatedVocabulary: [
      { kr: "오늘", rom: "o-neul", en: "today" },
      { kr: "내일", rom: "nae-il", en: "tomorrow" },
      { kr: "끝", rom: "kkeut", en: "end" }
    ],
    teacherNote: "Core function: Shows the ending point.\nAlways teach with:\n부터 (bu-teo) = from\n까지 (kka-ji) = until\nAfter this lesson, learners should understand:\n부터 ~ 까지 = from ~ to ~\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G015",
    grammar: "부터 ~ 까지",
    romanization: "bu-teo ~ kka-ji",
    title: "From ~ To / From ~ Until",
    keywords: ["from to", "from until", "buteo kkaji"],
    sentencePatterns: ["부터", "까지"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine someone asks, \"What time do you work?\"\nYou answer, \"From 9 o'clock until 5 o'clock.\"\nKorean uses 부터 ~ 까지 (bu-teo ~ kka-ji) to show a starting point and an ending point.",
    memoryTrick: "🟦 부터 (bu-teo) = From ⬅️ Start\n🟥 까지 (kka-ji) = Until / To ➡️ Finish\nThink:\nFrom → To",
    easyExplanation: "부터 (bu-teo) means from.\n까지 (kka-ji) means until or to.\nWhen you use them together, they mean from ~ to ~ or from ~ until ~.\nNative Koreans use this pattern every day.",
    basicRule: "Starting point 부터 (bu-teo) ↓ Ending point 까지 (kka-ji)\n\nExample:\n아홉 시부터 (a-hop si-bu-teo) from 9 o'clock ↓ 다섯 시까지 (da-seot si-kka-ji) until 5 o'clock",
    examples: [
      { kr: "아홉 시부터 다섯 시까지 일해요.", rom: "A-hop si-bu-teo da-seot si-kka-ji il-hae-yo.", en: "I work from 9 o'clock until 5 o'clock." },
      { kr: "월요일부터 금요일까지 학교에 가요.", rom: "Wol-yo-il-bu-teo Geum-yo-il-kka-ji hak-gyo-e ga-yo.", en: "I go to school from Monday to Friday." },
      { kr: "서울부터 부산까지 기차로 가요.", rom: "Seo-ul-bu-teo Bu-san-kka-ji gi-cha-ro ga-yo.", en: "I go from Seoul to Busan by train." }
    ],
    nativeTip: "This is one of the most common Korean sentence patterns.\nYou will hear it every day for work hours, school schedules, travel, dates, and business hours.",
    commonMistakes: [
      { wrong: "❌ 아홉 시까지 다섯 시부터 (A-hop si-kka-ji da-seot si-bu-teo) Wrong order", correct: "✅ 아홉 시부터 다섯 시까지 (A-hop si-bu-teo da-seot si-kka-ji) Correct" },
      { wrong: "❌ 월요일까지 금요일부터 (Wol-yo-il-kka-ji Geum-yo-il-bu-teo) Wrong order", correct: "✅ 월요일부터 금요일까지 (Wol-yo-il-bu-teo Geum-yo-il-kka-ji) Correct" }
    ],
    compare: [
      { grammar: "부터 (bu-teo)", meaning: "From", mainJob: "Starting point" },
      { grammar: "까지 (kka-ji)", meaning: "Until / To", mainJob: "Ending point" },
      { grammar: "부터 ~ 까지 (bu-teo ~ kka-ji)", meaning: "From ~ To", mainJob: "Complete range" }
    ],
    miniQuiz: {
      question: "월요일__ 금요일__ (Wol-yo-il__ Geum-yo-il__) From Monday to Friday",
      options: ["① 부터 / 까지 (bu-teo / kka-ji)", "② 까지 / 부터 (kka-ji / bu-teo)"],
      answer: "✅ Answer: ① 부터 / 까지 (bu-teo / kka-ji)",
      reason: "Because the sentence starts with from and ends with to."
    },
    speakingPractice: {
      kr: "아홉 시부터 다섯 시까지 공부해요.",
      rom: "A-hop si-bu-teo da-seot si-kka-ji gong-bu-hae-yo.",
      en: "I study from 9 o'clock until 5 o'clock.",
      repeat: 3
    },
    practiceChallenge: {
      question: "오늘__ 내일__ (O-neul__ Nae-il__) From today until tomorrow",
      answer: "✅ Answer: 오늘부터 (O-neul-bu-teo) from today 내일까지 (Nae-il-kka-ji) until tomorrow"
    },
    relatedGrammar: ["부터 (bu-teo) From", "까지 (kka-ji) Until / To"],
    relatedVocabulary: [
      { kr: "오늘", rom: "o-neul", en: "today" },
      { kr: "내일", rom: "nae-il", en: "tomorrow" },
      { kr: "월요일", rom: "wol-yo-il", en: "Monday" },
      { kr: "금요일", rom: "geum-yo-il", en: "Friday" }
    ],
    teacherNote: "Core function: Shows a complete range (from → to).\nTeach in this order:\n부터 = from\n까지 = until\n부터 ~ 까지 = from ~ to\nThis pattern is used constantly for time, dates, travel, schedules, and business hours.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G016",
    grammar: "의",
    romanization: "ui",
    title: "Possession Marker ('s / of)",
    keywords: ["possession marker", "possessive particle", "ui", "my book"],
    sentencePatterns: ["의"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you want to say, \"My book.\" or \"Korea's food.\"\nKorean uses 의 (ui) Possession Marker to show ownership or relationship.",
    memoryTrick: "🟨 의 (ui) = 's = of\nThink:\n👤 Whose?\n📦 Belongs to...",
    easyExplanation: "의 (ui) means 's or of.\nIt connects two nouns.\nThe first noun owns or describes the second noun.",
    basicRule: "Owner 의 (ui) ↓ Thing\n\nExample:\n저 (jeo) I ↓ 저의 (jeo-ui) my ↓ 저의 책 (jeo-ui chaek) my book\n친구 (chin-gu) friend ↓ 친구의 (chin-gu-ui) friend's ↓ 친구의 가방 (chin-gu-ui ga-bang) friend's bag",
    examples: [
      { kr: "저의 이름은 민수예요.", rom: "Jeo-ui i-reum-eun Min-su-ye-yo.", en: "My name is Min-su." },
      { kr: "친구의 가방이에요.", rom: "Chin-gu-ui ga-bang-i-e-yo.", en: "It is my friend's bag." },
      { kr: "한국의 음식은 맛있어요.", rom: "Han-guk-ui eum-sik-eun ma-si-sseo-yo.", en: "Korean food is delicious." }
    ],
    nativeTip: "In everyday conversation, Native Koreans often omit 의.\nInstead of saying 저의 (jeo-ui) they usually say 제 (je) my.\nInstead of 나의 (na-ui) they usually say 내 (nae) my.\nInstead of 너의 (neo-ui) they usually say 네 (ne) your.",
    commonMistakes: [
      { wrong: "❌ 저 책 (Jeo chaek) my book Wrong", correct: "✅ 저의 책 (Jeo-ui chaek) my book Correct (or simply 제 책 (je chaek))" },
      { wrong: "❌ 친구 가방 (Chin-gu ga-bang) Wrong", correct: "✅ 친구의 가방 (Chin-gu-ui ga-bang) friend's bag Correct" }
    ],
    compare: [
      { grammar: "의 (ui)", meaning: "'s / of", mainJob: "Shows possession" },
      { grammar: "도 (do)", meaning: "Also / Too", mainJob: "Adds another noun" }
    ],
    miniQuiz: {
      question: "친구__ 책 (Chin-gu__ chaek) Friend's book",
      options: ["① 의 (ui) 's / of", "② 도 (do) Also"],
      answer: "✅ Answer: ① 의 (ui) 's / of",
      reason: "Because the book belongs to your friend."
    },
    speakingPractice: {
      kr: "제 이름은 안나예요.",
      rom: "Je i-reum-eun An-na-ye-yo.",
      en: "My name is Anna.",
      repeat: 3
    },
    practiceChallenge: {
      question: "한국__ 문화 (Han-guk__ mun-hwa) Korean culture",
      answer: "✅ Answer: 한국의 (Han-guk-ui) Korea's"
    },
    relatedGrammar: ["제 / 내 / 네 (je / nae / ne) My / My / Your"],
    relatedVocabulary: [
      { kr: "이름", rom: "i-reum", en: "name" },
      { kr: "가방", rom: "ga-bang", en: "bag" },
      { kr: "문화", rom: "mun-hwa", en: "culture" }
    ],
    teacherNote: "Core function: Shows possession ('s / of).\nTeach beginners:\n의 = 's\nSpoken shortcuts:\n저의 → 제 (je)\n나의 → 내 (nae)\n너의 → 네 (ne)\nExplain that native speakers often drop or shorten 의 in conversation.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G017",
    grammar: "그리고",
    romanization: "geu-ri-go",
    title: "And / Then",
    keywords: ["and then", "geurigo", "geu-ri-go", "geu ri go", "sentence connector"],
    sentencePatterns: ["그리고"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you want to tell a story.\n\"I ate breakfast.\" And \"I went to school.\"\nKorean uses 그리고 (geu-ri-go) And / Then to connect two sentences or ideas.",
    memoryTrick: "🟦 그리고 (geu-ri-go) = And = Then\nThink:\n➡️ Next idea",
    easyExplanation: "그리고 (geu-ri-go) means and or then.\nUnlike 하고 (ha-go) which connects nouns, 그리고 (geu-ri-go) connects sentences or complete ideas.\nNative Koreans use it constantly.",
    basicRule: "Sentence 1 ↓ 그리고 (geu-ri-go) ↓ Sentence 2\n\nExample:\n저는 아침을 먹었어요. (Jeo-neun a-chim-eul meo-geo-sseo-yo.) I ate breakfast.\n↓\n그리고 (Geu-ri-go) And\n↓\n학교에 갔어요. (Hak-gyo-e gat-sseo-yo.) I went to school.",
    examples: [
      { kr: "저는 커피를 마셨어요. 그리고 학교에 갔어요.", rom: "Jeo-neun keo-pi-reul ma-syeo-sseo-yo. Geu-ri-go hak-gyo-e gat-sseo-yo.", en: "I drank coffee. And then I went to school." },
      { kr: "오늘은 비가 와요. 그리고 바람도 불어요.", rom: "O-neul-eun bi-ga wa-yo. Geu-ri-go ba-ram-do bu-reo-yo.", en: "Today it's raining. And it's windy too." },
      { kr: "한국어를 공부해요. 그리고 영어도 공부해요.", rom: "Han-gu-geo-reul gong-bu-hae-yo. Geu-ri-go Yeong-eo-do gong-bu-hae-yo.", en: "I study Korean. And I also study English." }
    ],
    nativeTip: "Native Koreans often use 그리고 (geu-ri-go) when telling stories or explaining something step by step. It is one of the most common connecting words in Korean.",
    commonMistakes: [
      { wrong: "❌ 커피하고 학교에 갔어요. (Keo-pi-ha-go hak-gyo-e gat-sseo-yo.) Wrong (하고 connects nouns, not full sentences)", correct: "✅ 커피를 마셨어요. 그리고 학교에 갔어요. (Keo-pi-reul ma-syeo-sseo-yo. Geu-ri-go hak-gyo-e gat-sseo-yo.) Correct" }
    ],
    compare: [
      { grammar: "그리고 (geu-ri-go)", meaning: "And / Then", mainJob: "Connects sentences" },
      { grammar: "하고 (ha-go)", meaning: "And", mainJob: "Connects nouns" }
    ],
    miniQuiz: {
      question: "저는 밥을 먹었어요. _____ 학교에 갔어요. (Jeo-neun ba-beul meo-geo-sseo-yo. _____ hak-gyo-e gat-sseo-yo.)",
      options: ["① 그리고 (geu-ri-go) And / Then", "② 하고 (ha-go) And"],
      answer: "✅ Answer: ① 그리고 (geu-ri-go) And / Then",
      reason: "Because you are connecting two complete sentences."
    },
    speakingPractice: {
      kr: "저는 공부했어요. 그리고 잤어요.",
      rom: "Jeo-neun gong-bu-haet-sseo-yo. Geu-ri-go jat-sseo-yo.",
      en: "I studied. Then I slept.",
      repeat: 3
    },
    practiceChallenge: {
      question: "저는 운동했어요. _____ 샤워했어요. (Jeo-neun un-dong-haet-sseo-yo. _____ sya-wo-haet-sseo-yo.) I exercised. Then I took a shower.",
      answer: "✅ Answer: 그리고 (geu-ri-go) And / Then"
    },
    relatedGrammar: ["하고 (ha-go) And (Connects nouns)"],
    relatedVocabulary: [
      { kr: "공부하다", rom: "gong-bu-ha-da", en: "to study" },
      { kr: "학교", rom: "hak-gyo", en: "school" },
      { kr: "운동하다", rom: "un-dong-ha-da", en: "to exercise" }
    ],
    teacherNote: "Core function: Connects complete sentences or ideas.\nTeach the important difference:\n하고 (ha-go) → connects nouns\n그리고 (geu-ri-go) → connects sentences\nExplain that 그리고 often means \"and then\" in stories.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G018",
    grammar: "하지만",
    romanization: "ha-ji-man",
    title: "But / However",
    keywords: ["but", "however", "hajiman"],
    sentencePatterns: ["하지만"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you say, \"I like coffee.\" But \"I don't like tea.\"\nKorean uses 하지만 (ha-ji-man) But / However to show a different or opposite idea.",
    memoryTrick: "🟥 하지만 (ha-ji-man) = But = However\nThink:\n⬅️ First idea\n❌ Different idea",
    easyExplanation: "하지만 (ha-ji-man) means but or however.\nIt connects two complete sentences that have different or opposite meanings.\nNative Koreans use it every day.",
    basicRule: "Sentence 1 ↓ 하지만 (ha-ji-man) ↓ Sentence 2\n\nExample:\n저는 커피를 좋아해요. (Jeo-neun keo-pi-reul jo-a-hae-yo.) I like coffee.\n↓\n하지만 (Ha-ji-man) But\n↓\n차는 안 좋아해요. (Cha-neun an jo-a-hae-yo.) I don't like tea.",
    examples: [
      { kr: "저는 한국어를 공부해요. 하지만 아직 어려워요.", rom: "Jeo-neun Han-gu-geo-reul gong-bu-hae-yo. Ha-ji-man a-jik eo-ryeo-wo-yo.", en: "I study Korean. But it's still difficult." },
      { kr: "오늘은 날씨가 좋아요. 하지만 더워요.", rom: "O-neul-eun nal-ssi-ga jo-a-yo. Ha-ji-man deo-wo-yo.", en: "The weather is nice today. But it's hot." },
      { kr: "그 사람은 친절해요. 하지만 말이 없어요.", rom: "Geu sa-ra-meun chin-jeol-hae-yo. Ha-ji-man ma-ri eop-seo-yo.", en: "That person is kind. But doesn't talk much." }
    ],
    nativeTip: "Native Koreans often shorten conversations by saying only 하지만... (Ha-ji-man...) But...\nEveryone understands that the opposite idea is coming next.",
    commonMistakes: [
      { wrong: "❌ 커피하고 차를 안 좋아해요. (Keo-pi-ha-go cha-reul an jo-a-hae-yo.) Wrong (하고 means and, not but)", correct: "✅ 커피를 좋아해요. 하지만 차는 안 좋아해요. (Keo-pi-reul jo-a-hae-yo. Ha-ji-man cha-neun an jo-a-hae-yo.) Correct" }
    ],
    compare: [
      { grammar: "그리고 (geu-ri-go)", meaning: "And / Then", mainJob: "Adds another idea" },
      { grammar: "하지만 (ha-ji-man)", meaning: "But / However", mainJob: "Shows an opposite idea" }
    ],
    miniQuiz: {
      question: "저는 피자를 좋아해요. _____ 햄버거는 안 좋아해요. (Jeo-neun pi-ja-reul jo-a-hae-yo. _____ haem-beo-geo-neun an jo-a-hae-yo.)",
      options: ["① 그리고 (geu-ri-go) And / Then", "② 하지만 (ha-ji-man) But / However"],
      answer: "✅ Answer: ② 하지만 (ha-ji-man) But / However",
      reason: "Because the second sentence is the opposite idea."
    },
    speakingPractice: {
      kr: "저는 바빠요. 하지만 행복해요.",
      rom: "Jeo-neun ba-ppa-yo. Ha-ji-man haeng-bo-kae-yo.",
      en: "I am busy. But I am happy.",
      repeat: 3
    },
    practiceChallenge: {
      question: "오늘은 피곤해요. _____ 공부할 거예요. (O-neul-eun pi-gon-hae-yo. _____ gong-bu-hal geo-ye-yo.) Today I am tired. But I will study.",
      answer: "✅ Answer: 하지만 (ha-ji-man) But / However"
    },
    relatedGrammar: ["그리고 (geu-ri-go) And / Then"],
    relatedVocabulary: [
      { kr: "좋아하다", rom: "jo-a-ha-da", en: "to like" },
      { kr: "어렵다", rom: "eo-ryeop-da", en: "to be difficult" },
      { kr: "행복하다", rom: "haeng-bo-ka-da", en: "to be happy" }
    ],
    teacherNote: "Core function: Shows contrast or an opposite idea.\nTeach together with:\n그리고 (geu-ri-go) = and\n하지만 (ha-ji-man) = but\nExplain that 그리고 adds information, while 하지만 changes the direction of the conversation.\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G019",
    grammar: "그래서",
    romanization: "geu-rae-seo",
    title: "So / Therefore",
    keywords: ["so", "therefore", "geuraeseo"],
    sentencePatterns: ["그래서"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine you say, \"I'm tired.\" So \"I'm going to sleep.\"\nKorean uses 그래서 (geu-rae-seo) So / Therefore to show a reason and its result.",
    memoryTrick: "🟩 그래서 (geu-rae-seo) = So = Therefore\nThink:\n👉 Reason → Result",
    easyExplanation: "그래서 (geu-rae-seo) means so or therefore.\nIt connects two complete sentences.\nThe first sentence gives the reason.\nThe second sentence gives the result.\nNative Koreans use it every day.",
    basicRule: "Reason ↓ 그래서 (geu-rae-seo) ↓ Result\n\nExample:\n피곤해요. (Pi-gon-hae-yo.) I am tired.\n↓\n그래서 (Geu-rae-seo) So\n↓\n일찍 자요. (Il-jjik ja-yo.) I go to bed early.",
    examples: [
      { kr: "비가 와요. 그래서 우산을 가져가요.", rom: "Bi-ga wa-yo. Geu-rae-seo u-san-eul ga-jyeo-ga-yo.", en: "It is raining. So I take an umbrella." },
      { kr: "배가 고파요. 그래서 밥을 먹어요.", rom: "Bae-ga go-pa-yo. Geu-rae-seo ba-beul meo-geo-yo.", en: "I am hungry. So I eat." },
      { kr: "한국어를 많이 공부했어요. 그래서 한국어를 잘해요.", rom: "Han-gu-geo-reul ma-ni gong-bu-haet-sseo-yo. Geu-rae-seo Han-gu-geo-reul jal-hae-yo.", en: "I studied Korean a lot. So I speak Korean well." }
    ],
    nativeTip: "Native Koreans use 그래서 (geu-rae-seo) all the time in conversation. It is one of the first connecting words Korean children learn.",
    commonMistakes: [
      { wrong: "❌ 비가 와요. 하지만 우산을 가져가요. (Bi-ga wa-yo. Ha-ji-man u-san-eul ga-jyeo-ga-yo.) Wrong (taking umbrella is result, not opposite idea)", correct: "✅ 비가 와요. 그래서 우산을 가져가요. (Bi-ga wa-yo. Geu-rae-seo u-san-eul ga-jyeo-ga-yo.) Correct" }
    ],
    compare: [
      { grammar: "그래서 (geu-rae-seo)", meaning: "So / Therefore", mainJob: "Shows a result" },
      { grammar: "하지만 (ha-ji-man)", meaning: "But / However", mainJob: "Shows contrast" }
    ],
    miniQuiz: {
      question: "배가 고파요. _____ 밥을 먹어요. (Bae-ga go-pa-yo. _____ ba-beul meo-geo-yo.)",
      options: ["① 그래서 (geu-rae-seo) So", "② 하지만 (ha-ji-man) But"],
      answer: "✅ Answer: ① 그래서 (geu-rae-seo) So",
      reason: "Because eating is the result of being hungry."
    },
    speakingPractice: {
      kr: "오늘은 바빠요. 그래서 집에 늦게 가요.",
      rom: "O-neul-eun ba-ppa-yo. Geu-rae-seo ji-be neuj-ge ga-yo.",
      en: "I am busy today. So I go home late.",
      repeat: 3
    },
    practiceChallenge: {
      question: "피곤해요. _____ 일찍 잘 거예요. (Pi-gon-hae-yo. _____ il-jjik jal geo-ye-yo.) I am tired. So I will sleep early.",
      answer: "✅ Answer: 그래서 (geu-rae-seo) So"
    },
    relatedGrammar: ["하지만 (ha-ji-man) But / However"],
    relatedVocabulary: [
      { kr: "피곤하다", rom: "pi-gon-ha-da", en: "to be tired" },
      { kr: "우산", rom: "u-san", en: "umbrella" },
      { kr: "배고프다", rom: "bae-go-peu-da", en: "to be hungry" }
    ],
    teacherNote: "Core function: Shows reason → result.\nTeach the easy formula:\nReason → 그래서 → Result\nCompare with:\n하지만 = opposite idea\n그래서 = result\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
  },
  {
    id: "G020",
    grammar: "또",
    romanization: "tto",
    title: "Again / Also",
    keywords: ["again", "also", "tto"],
    sentencePatterns: ["또"],
    rating: "★★★★★ Used Every Day",
    imagine: "Imagine your teacher says, \"Read it again.\" Or your friend says, \"Let's go again!\"\nKorean uses 또 (tto) to mean again or also, depending on the situation.",
    memoryTrick: "🟨 또 (tto) = 🔄 Again ➕ Also\nThink:\nOne more time!",
    easyExplanation: "또 (tto) usually means again. Sometimes it also means also.\nUnlike 도 (do) which is attached to a noun, 또 (tto) is an adverb. It usually comes before the verb or the whole sentence.",
    basicRule: "Put 또 (tto) before the verb or sentence.\n\nExample:\n또 가요. (Tto ga-yo.) I go again.\n또 먹어요. (Tto meo-geo-yo.) I eat again.",
    examples: [
      { kr: "또 만나요.", rom: "Tto man-na-yo.", en: "See you again." },
      { kr: "또 왔어요.", rom: "Tto wa-sseo-yo.", en: "I came again." },
      { kr: "오늘도 공부했어요. 그리고 내일도 또 공부할 거예요.", rom: "O-neul-do gong-bu-haet-sseo-yo. Geu-ri-go nae-il-do tto gong-bu-hal geo-ye-yo.", en: "I studied today. And I'll study again tomorrow." },
      { kr: "또 비가 와요.", rom: "Tto bi-ga wa-yo.", en: "It's raining again." }
    ],
    nativeTip: "Native Koreans say 또 봐요. (Tto bwa-yo.) See you again. almost every day.\nIt is one of the most common goodbye expressions.",
    commonMistakes: [
      { wrong: "❌ 또도 갈게요. (Tto-do gal-ge-yo.) Wrong", correct: "✅ 또 갈게요. (Tto gal-ge-yo.) I'll go again. Correct" },
      { wrong: "❌ 도 공부해요. (Do gong-bu-hae-yo.) Wrong", correct: "✅ 또 공부해요. (Tto gong-bu-hae-yo.) I study again. Correct" }
    ],
    compare: [
      { grammar: "또 (tto)", meaning: "Again / Also", mainJob: "Repeats an action or idea" },
      { grammar: "도 (do)", meaning: "Also / Too", mainJob: "Adds another noun" }
    ],
    miniQuiz: {
      question: "_____ 만나요. (_____ man-na-yo.) See you again.",
      options: ["① 또 (tto) Again", "② 도 (do) Also"],
      answer: "✅ Answer: ① 또 (tto) Again",
      reason: "Because you mean again."
    },
    speakingPractice: {
      kr: "또 한국에 가고 싶어요.",
      rom: "Tto Han-gu-ge ga-go si-peo-yo.",
      en: "I want to go to Korea again.",
      repeat: 3
    },
    practiceChallenge: {
      question: "내일 _____ 만나요. (Nae-il _____ man-na-yo.) See you again tomorrow.",
      answer: "✅ Answer: 또 (tto) Again"
    },
    relatedGrammar: ["도 (do) Also / Too"],
    relatedVocabulary: [
      { kr: "다시", rom: "da-si", en: "again" },
      { kr: "만나다", rom: "man-na-da", en: "to meet" },
      { kr: "내일", rom: "nae-il", en: "tomorrow" }
    ],
    teacherNote: "Core function: Repeats an action (\"again\") or adds another idea (\"also\").\nExplain the difference clearly:\n또 (tto) = adverb → goes before the verb or sentence.\n도 (do) = particle → attaches to a noun.\nBeginners should first remember:\n또 = again\n도 = also / too\nUse page examples first, Grammar DB examples second, then generate new examples if needed."
   },
   {
    "id": "G021",
    "grammar": "같이",
    "romanization": "gat-i",
    "title": "Together / With",
    "keywords": [
      "같이",
      "together / with",
      "gat-i"
    ],
    "sentencePatterns": [
      "같이"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you ask your friend,\n\n\"Do you want to go together?\"\n\nKorean uses\n\n같이\n\n(gat-i)\n\nto mean\n\ntogether or with someone.",
    "memoryTrick": "🟦\n\n같이\n\n(gat-i)\n\n=\n\n🤝 Together\n\n👫 With someone\n\nThink:\n\nNot alone.",
    "easyExplanation": "같이\n\n(gat-i)\n\nmeans\n\ntogether or\n\nwith someone.\n\nIt tells us that two or more people do something together.\n\nNative Koreans use this word every day.",
    "basicRule": "Put\n\n같이\n\n(gat-i)\n\nbefore or after the person.\n\nExample\n\n친구하고 같이\n\n(Chin-gu-ha-go gat-i)\n\ntogether with a friend\n\n↓\n\n친구하고 같이 가요.\n\n(Chin-gu-ha-go gat-i ga-yo.)\n\nI go with my friend.",
    "examples": [
      {
        "kr": "같이 가요.",
        "rom": "Gat-i ga-yo.",
        "en": "Let's go together."
      },
      {
        "kr": "친구하고 같이 공부해요.",
        "rom": "Chin-gu-ha-go gat-i gong-bu-hae-yo.",
        "en": "I study together with my friend."
      },
      {
        "kr": "가족하고 같이 여행해요.",
        "rom": "Ga-jok-ha-go gat-i yeo-haeng-hae-yo.",
        "en": "I travel with my family."
      },
      {
        "kr": "우리 같이 먹어요.",
        "rom": "U-ri gat-i meo-geo-yo.",
        "en": "Let's eat together."
      }
    ],
    "nativeTip": "One of the most common Korean invitations is\n\n같이 갈래요?\n\n(Gat-i gal-lae-yo?)\n\nWould you like to go together?\n\nNative speakers use this expression very often.",
    "commonMistakes": [
      {
        "wrong": "❌ 친구 같이 가요. (Chin-gu gat-i ga-yo.) Not natural.",
        "correct": "✅ 친구하고 같이 가요. (Chin-gu-ha-go gat-i ga-yo.) I go with my friend. Correct."
      },
      {
        "wrong": "❌ 같이 혼자 가요. (Gat-i hon-ja ga-yo.) I go together alone. Wrong",
        "correct": "✅ 혼자 가요. (Hon-ja ga-yo.) I go alone. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "같이 (gat-i)",
        "meaning": "Together / With\tDoing something together",
        "mainJob": "Together / With\tDoing something together"
      },
      {
        "grammar": "혼자 (hon-ja)",
        "meaning": "Alone\tDoing something alone",
        "mainJob": "Alone\tDoing something alone"
      }
    ],
    "miniQuiz": {
      "question": "우리 _____ 가요. (U-ri _____ ga-yo.) Let's go together.",
      "options": [
        "① 같이 (gat-i) Together",
        "② 혼자 (hon-ja) Alone"
      ],
      "answer": "✅ Answer  ① 같이",
      "reason": "Because you are inviting someone."
    },
    "speakingPractice": {
      "kr": "우리 같이 공부해요.",
      "rom": "U-ri gat-i gong-bu-hae-yo.",
      "en": "Let's study together.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 친구하고 _____ 영화를 봐요.",
      "answer": "✅ Answer\n\n같이\n\n(gat-i)\n\nTogether"
    },
    "relatedGrammar": [
      "하고 (ha-go) And / With"
    ],
    "relatedVocabulary": [
      {
        "kr": "친구",
        "rom": "chin-gu",
        "en": "friend"
      },
      {
        "kr": "가족",
        "rom": "ga-jok",
        "en": "family"
      },
      {
        "kr": "혼자",
        "rom": "hon-ja",
        "en": "alone"
      },
      {
        "kr": "여행하다",
        "rom": "yeo-haeng-ha-da",
        "en": "to travel"
      }
    ],
    "teacherNote": "Core function: Together / With.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G022",
    "grammar": "혼자",
    "romanization": "hon-ja",
    "title": "Alone / By Myself",
    "keywords": [
      "혼자",
      "alone / by myself",
      "hon-ja"
    ],
    "sentencePatterns": [
      "혼자"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Who are you going with?\"\n\nYou answer,\n\n\"I'm going alone.\"\n\nKorean uses\n\n혼자\n\n(hon-ja)\n\nto mean\n\nalone or\n\nby myself.",
    "memoryTrick": "🟦\n\n혼자\n\n(hon-ja)\n\n=\n\n🚶 Alone\n\n🙋 By myself\n\nThink:\n\nOnly me.",
    "easyExplanation": "혼자\n\n(hon-ja)\n\nmeans\n\nalone or\n\nby myself.\n\nIt tells us that one person does something without other people.\n\nNative Koreans use this word every day.",
    "basicRule": "Put\n\n혼자\n\n(hon-ja)\n\nbefore the verb.\n\nExample\n\n혼자 가요.\n\n(Hon-ja ga-yo.)\n\nI go alone.\n\n혼자 먹어요.\n\n(Hon-ja meo-geo-yo.)\n\nI eat alone.",
    "examples": [
      {
        "kr": "혼자 가요.",
        "rom": "Hon-ja ga-yo.",
        "en": "I go alone."
      },
      {
        "kr": "혼자 살아요.",
        "rom": "Hon-ja sa-ra-yo.",
        "en": "I live alone."
      },
      {
        "kr": "혼자 공부해요.",
        "rom": "Hon-ja gong-bu-hae-yo.",
        "en": "I study by myself."
      },
      {
        "kr": "혼자 여행하고 싶어요.",
        "rom": "Hon-ja yeo-haeng-ha-go si-peo-yo.",
        "en": "I want to travel alone."
      }
    ],
    "nativeTip": "Native Koreans often ask,\n\n혼자 왔어요?\n\n(Hon-ja wa-sseo-yo?)\n\nDid you come alone?\n\nThis is very common in restaurants, cafés, and stores.",
    "commonMistakes": [
      {
        "wrong": "❌ 혼자 같이 가요. (Hon-ja gat-i ga-yo.) I go alone together. Wrong",
        "correct": "✅ 혼자 가요. (Hon-ja ga-yo.) I go alone. Correct"
      },
      {
        "wrong": "❌ 혼자 친구하고 가요. (Hon-ja chin-gu-ha-go ga-yo.) I go alone with my friend. Wrong",
        "correct": "✅ 친구하고 같이 가요. (Chin-gu-ha-go gat-i ga-yo.) I go together with my friend. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "혼자 (hon-ja)",
        "meaning": "Alone / By myself\tOne person only",
        "mainJob": "Alone / By myself\tOne person only"
      },
      {
        "grammar": "같이 (gat-i)",
        "meaning": "Together / With\tTwo or more people together",
        "mainJob": "Together / With\tTwo or more people together"
      }
    ],
    "miniQuiz": {
      "question": "저는 _____ 여행해요. (Jeo-neun _____ yeo-haeng-hae-yo.) I travel alone.",
      "options": [
        "① 혼자 (hon-ja) Alone",
        "② 같이 (gat-i) Together"
      ],
      "answer": "✅ Answer  ① 혼자",
      "reason": "Because only one person is traveling."
    },
    "speakingPractice": {
      "kr": "혼자 영화를 봐요.",
      "rom": "Hon-ja yeong-hwa-reul bwa-yo.",
      "en": "I watch a movie alone.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 오늘은 _____ 밥을 먹어요.",
      "answer": "✅ Answer\n\n혼자\n\n(hon-ja)\n\nAlone"
    },
    "relatedGrammar": [
      "같이 (gat-i) Together / With"
    ],
    "relatedVocabulary": [
      {
        "kr": "여행하다",
        "rom": "yeo-haeng-ha-da",
        "en": "to travel"
      },
      {
        "kr": "살다",
        "rom": "sal-da",
        "en": "to live"
      },
      {
        "kr": "영화",
        "rom": "yeong-hwa",
        "en": "movie"
      }
    ],
    "teacherNote": "Core function: Alone / By Myself.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G024",
    "grammar": "도",
    "romanization": "do",
    "title": "Also / Too / As Well",
    "keywords": [
      "도",
      "also / too / as well",
      "do"
    ],
    "sentencePatterns": [
      "도"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend says,\n\n\"I like coffee.\"\n\nYou say,\n\n\"I like coffee too.\"\n\nKorean uses\n\n도\n\n(do)\n\nto mean\n\nalso,\n\ntoo,\n\nor\n\nas well.",
    "memoryTrick": "🟦\n\n도\n\n(do)\n\n=\n\n➕\n\nAlso\n\n=\n\nToo\n\nThink:\n\nMe too!",
    "easyExplanation": "도\n\n(do)\n\nmeans\n\nalso,\n\ntoo,\n\nor\n\nas well.\n\nIt is attached directly to a noun.\n\nIt tells the listener,\n\n\"This one is included too.\"\n\nNative Koreans use\n\n도\n\nhundreds of times every day.",
    "basicRule": "Attach\n\n도\n\n(do)\n\ndirectly after a noun.\n\nExample\n\n저\n\n(jeo)\n\nI\n\n↓\n\n저도\n\n(jeo-do)\n\nMe too\n\n커피\n\n(keo-pi)\n\ncoffee\n\n↓\n\n커피도\n\n(keo-pi-do)\n\nCoffee too",
    "examples": [
      {
        "kr": "저도 학생이에요.",
        "rom": "Jeo-do hak-saeng-i-e-yo.",
        "en": "I am a student too."
      },
      {
        "kr": "저도 한국어를 공부해요.",
        "rom": "Jeo-do Han-gu-geo-reul gong-bu-hae-yo.",
        "en": "I study Korean too."
      },
      {
        "kr": "커피도 좋아해요.",
        "rom": "Keo-pi-do jo-a-hae-yo.",
        "en": "I like coffee too."
      },
      {
        "kr": "오늘도 바빠요.",
        "rom": "O-neul-do ba-ppa-yo.",
        "en": "I'm busy today too."
      }
    ],
    "nativeTip": "Native Koreans very often answer simply:\n\n저도요!\n\n(Jeo-do-yo!)\n\nMe too!\n\nThis is one of the most common conversation expressions.",
    "commonMistakes": [
      {
        "wrong": "❌ 도 커피 좋아해요. (Do keo-pi jo-a-hae-yo.) Wrong",
        "correct": "✅ 커피도 좋아해요. (Keo-pi-do jo-a-hae-yo.) I like coffee too. Correct"
      },
      {
        "wrong": "❌ 저만 학생이에요. (Jeo-man hak-saeng-i-e-yo.) Only I am a student. Wrong if you mean me too.",
        "correct": "✅ 저도 학생이에요. (Jeo-do hak-saeng-i-e-yo.) I am a student too. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "도 (do)",
        "meaning": "Also / Too\tAdds another person or thing",
        "mainJob": "Also / Too\tAdds another person or thing"
      },
      {
        "grammar": "만 (man)",
        "meaning": "Only\tLimits something",
        "mainJob": "Only\tLimits something"
      }
    ],
    "miniQuiz": {
      "question": "저__ 한국어를 공부해요. (Jeo__ Han-gu-geo-reul gong-bu-hae-yo.) I study Korean too.",
      "options": [
        "① 도 (do) Also / Too",
        "② 만 (man) Only"
      ],
      "answer": "✅ Answer  ① 도",
      "reason": "Because you mean me too."
    },
    "speakingPractice": {
      "kr": "저도 가고 싶어요.",
      "rom": "Jeo-do ga-go si-peo-yo.",
      "en": "I want to go too.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 친구__ 왔어요.",
      "answer": "✅ Answer\n\n친구도\n\n(Chin-gu-do)\n\nFriend too"
    },
    "relatedGrammar": [
      "만 (man) Only / Just"
    ],
    "relatedVocabulary": [
      {
        "kr": "학생",
        "rom": "hak-saeng",
        "en": "student"
      },
      {
        "kr": "친구",
        "rom": "chin-gu",
        "en": "friend"
      },
      {
        "kr": "오늘",
        "rom": "o-neul",
        "en": "today"
      }
    ],
    "teacherNote": "Core function: Also / Too / As Well.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G025",
    "grammar": "하고",
    "romanization": "ha-go",
    "title": "And / With",
    "keywords": [
      "하고",
      "and / with",
      "ha-go"
    ],
    "sentencePatterns": [
      "하고"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you want to say,\n\n\"Coffee and bread.\"\n\nOr,\n\n\"I went with my friend.\"\n\nKorean uses\n\n하고\n\n(ha-go)\n\nto mean\n\nand\n\nor\n\nwith.",
    "memoryTrick": "🟦\n\n하고\n\n(ha-go)\n\n=\n\n➕\n\nAnd\n\n🤝\n\nWith\n\nThink:\n\nTwo things together.",
    "easyExplanation": "하고\n\n(ha-go)\n\nconnects nouns.\n\nIt means\n\nand\n\nor\n\nwith.\n\nUnlike\n\n그리고\n\n(geu-ri-go)\n\nwhich connects sentences,\n\n하고\n\n(ha-go)\n\nconnects words (nouns).\n\nNative Koreans use it every day.",
    "basicRule": "Noun\n\n하고\n\n(ha-go)\n\nNoun\n\nExample\n\n커피\n\n(keo-pi)\n\ncoffee\n\n↓\n\n하고\n\n(ha-go)\n\nand\n\n↓\n\n빵\n\n(ppang)\n\nbread\n\n↓\n\n커피하고 빵\n\n(Keo-pi-ha-go ppang)\n\nCoffee and bread",
    "examples": [
      {
        "kr": "커피하고 차를 좋아해요.",
        "rom": "Keo-pi-ha-go cha-reul jo-a-hae-yo.",
        "en": "I like coffee and tea."
      },
      {
        "kr": "친구하고 같이 가요.",
        "rom": "Chin-gu-ha-go gat-i ga-yo.",
        "en": "I go with my friend."
      },
      {
        "kr": "엄마하고 아빠가 왔어요.",
        "rom": "Eom-ma-ha-go a-ppa-ga wa-sseo-yo.",
        "en": "Mom and Dad came."
      },
      {
        "kr": "가족하고 여행해요.",
        "rom": "Ga-jok-ha-go yeo-haeng-hae-yo.",
        "en": "I travel with my family."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n하고\n\n(ha-go)\n\ninstead of\n\n와 / 과\n\n(wa / gwa)\n\nbecause it sounds more natural in everyday conversation.",
    "commonMistakes": [
      {
        "wrong": "❌ 커피 그리고 차 (Keo-pi geu-ri-go cha) Wrong Because 그리고 (geu-ri-go) connects sentences, not nouns.",
        "correct": "✅ 커피하고 차 (Keo-pi-ha-go cha) Coffee and tea Correct"
      },
      {
        "wrong": "❌ 친구 그리고 갔어요. (Chin-gu geu-ri-go gat-sseo-yo.) Wrong",
        "correct": "✅ 친구하고 갔어요. (Chin-gu-ha-go gat-sseo-yo.) I went with my friend. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "하고 (ha-go)",
        "meaning": "And / With\tConnects nouns",
        "mainJob": "And / With\tConnects nouns"
      },
      {
        "grammar": "그리고 (geu-ri-go)",
        "meaning": "And / Then\tConnects sentences",
        "mainJob": "And / Then\tConnects sentences"
      }
    ],
    "miniQuiz": {
      "question": "커피__ 빵 (Keo-pi__ ppang) Coffee and bread",
      "options": [
        "① 하고 (ha-go) And / With",
        "② 그리고 (geu-ri-go) And / Then"
      ],
      "answer": "✅ Answer  ① 하고",
      "reason": "Because coffee and bread are nouns."
    },
    "speakingPractice": {
      "kr": "친구하고 같이 영화 봐요.",
      "rom": "Chin-gu-ha-go gat-i yeong-hwa bwa-yo.",
      "en": "I watch a movie with my friend.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 엄마__ 시장에 가요.",
      "answer": "✅ Answer\n\n엄마하고\n\n(Eom-ma-ha-go)\n\nWith my mom"
    },
    "relatedGrammar": [
      "그리고 (geu-ri-go) And / Then"
    ],
    "relatedVocabulary": [
      {
        "kr": "친구",
        "rom": "chin-gu",
        "en": "friend"
      },
      {
        "kr": "가족",
        "rom": "ga-jok",
        "en": "family"
      }
    ],
    "teacherNote": "Core function: And / With.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G026",
    "grammar": "와 / 과",
    "romanization": "wa / gwa",
    "title": "And / With (Formal)",
    "keywords": [
      "와 / 과",
      "and / with (formal)",
      "wa / gwa"
    ],
    "sentencePatterns": [
      "와 / 과"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you want to say,\n\n\"Coffee and milk.\"\n\nOr,\n\n\"I went with my teacher.\"\n\nKorean uses\n\n와 / 과\n\n(wa / gwa)\n\nto mean\n\nand\n\nor\n\nwith.\n\nIt has the same meaning as\n\n하고\n\n(ha-go)\n\nbut sounds more formal.",
    "memoryTrick": "🟦\n\n와 / 과\n\n(wa / gwa)\n\n=\n\n➕\n\nAnd\n\n🤝\n\nWith\n\nThink:\n\nFormal \"and\".",
    "easyExplanation": "와 / 과\n\n(wa / gwa)\n\nconnects two nouns.\n\nIt means\n\nand\n\nor\n\nwith.\n\nNative Koreans often use\n\n하고\n\n(ha-go)\n\nin everyday conversation,\n\nbut\n\n와 / 과\n\n(wa / gwa)\n\nis common in books, news, speeches, writing, and polite situations.",
    "basicRule": "Use\n\n와\n\n(wa)\n\nafter a noun ending with a vowel.\n\nExample\n\n커피\n\n(keo-pi)\n\ncoffee\n\n↓\n\n커피와\n\n(keo-pi-wa)\n\ncoffee and\n\nUse\n\n과\n\n(gwa)\n\nafter a noun ending with a consonant.\n\nExample\n\n책\n\n(chaek)\n\nbook\n\n↓\n\n책과\n\n(chaek-gwa)\n\nbook and",
    "examples": [
      {
        "kr": "커피와 우유를 마셔요.",
        "rom": "Keo-pi-wa u-yu-reul ma-syeo-yo.",
        "en": "I drink coffee and milk."
      },
      {
        "kr": "책과 공책이 있어요.",
        "rom": "Chaek-gwa gong-chaek-i i-sseo-yo.",
        "en": "There is a book and a notebook."
      },
      {
        "kr": "선생님과 이야기했어요.",
        "rom": "Seon-saeng-nim-gwa i-ya-gi-haet-sseo-yo.",
        "en": "I talked with my teacher."
      },
      {
        "kr": "부모님과 여행했어요.",
        "rom": "Bu-mo-nim-gwa yeo-haeng-haet-sseo-yo.",
        "en": "I traveled with my parents."
      }
    ],
    "nativeTip": "In daily conversation,\n\nNative Koreans usually say\n\n친구하고\n\n(chin-gu-ha-go)\n\ninstead of\n\n친구와\n\n(chin-gu-wa)\n\nBoth are correct.\n\n하고\n\nsounds more natural in casual speech.",
    "commonMistakes": [
      {
        "wrong": "❌ 책와 (Chaek-wa) Wrong",
        "correct": "✅ 책과 (Chaek-gwa) Book and Correct (Book ends with a consonant.)"
      },
      {
        "wrong": "❌ 커피과 (Keo-pi-gwa) Wrong",
        "correct": "✅ 커피와 (Keo-pi-wa) Coffee and Correct (Coffee ends with a vowel.)"
      }
    ],
    "compare": [
      {
        "grammar": "와 / 과 (wa / gwa)",
        "meaning": "And / With\tFormal connector",
        "mainJob": "And / With\tFormal connector"
      },
      {
        "grammar": "하고 (ha-go)",
        "meaning": "And / With\tCasual connector",
        "mainJob": "And / With\tCasual connector"
      }
    ],
    "miniQuiz": {
      "question": "책__ 연필 (Chaek__ yeon-pil) Book and pencil",
      "options": [
        "① 와 (wa) And",
        "② 과 (gwa) And"
      ],
      "answer": "✅ Answer  ② 과",
      "reason": "Because "
    },
    "speakingPractice": {
      "kr": "선생님과 같이 공부해요.",
      "rom": "Seon-saeng-nim-gwa gat-i gong-bu-hae-yo.",
      "en": "I study with my teacher.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 커피__ 우유를 마셔요.",
      "answer": "✅ Answer\n\n커피와\n\n(Keo-pi-wa)\n\nCoffee and"
    },
    "relatedGrammar": [
      "하고 (ha-go)",
      "And / With (Casual)"
    ],
    "relatedVocabulary": [
      {
        "kr": "책",
        "rom": "chaek",
        "en": "book"
      },
      {
        "kr": "우유",
        "rom": "u-yu",
        "en": "milk"
      },
      {
        "kr": "선생님",
        "rom": "seon-saeng-nim",
        "en": "teacher"
      },
      {
        "kr": "연필",
        "rom": "yeon-pil",
        "en": "pencil"
      }
    ],
    "teacherNote": "Core function: And / With (Formal).\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G027",
    "grammar": "랑 / 이랑",
    "romanization": "rang / i-rang",
    "title": "And / With (Very Casual)",
    "keywords": [
      "랑 / 이랑",
      "and / with (very casual)",
      "rang / i-rang"
    ],
    "sentencePatterns": [
      "랑 / 이랑"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"I'm going with my friend.\"\n\nOr,\n\n\"Mom and Dad.\"\n\nKorean often uses\n\n랑 / 이랑\n\n(rang / i-rang)\n\nto mean\n\nand\n\nor\n\nwith\n\nin casual conversation.",
    "memoryTrick": "🟦\n\n랑 / 이랑\n\n(rang / i-rang)\n\n=\n\n➕\n\nAnd\n\n🤝\n\nWith\n\nThink:\n\nTalking with friends.",
    "easyExplanation": "랑 / 이랑\n\n(rang / i-rang)\n\nconnects two nouns.\n\nIt means\n\nand\n\nor\n\nwith.\n\nIt has almost the same meaning as\n\n하고\n\n(ha-go)\n\nand\n\n와 / 과\n\n(wa / gwa),\n\nbut it sounds more casual.\n\nNative Koreans use it constantly in everyday conversations.",
    "basicRule": "Use\n\n랑\n\n(rang)\n\nafter a noun ending with a vowel.\n\nExample\n\n친구\n\n(chin-gu)\n\nfriend\n\n↓\n\n친구랑\n\n(chin-gu-rang)\n\nwith a friend\n\nUse\n\n이랑\n\n(i-rang)\n\nafter a noun ending with a consonant.\n\nExample\n\n책\n\n(chaek)\n\nbook\n\n↓\n\n책이랑\n\n(chae-gi-rang)\n\nwith a book",
    "examples": [
      {
        "kr": "친구랑 같이 가요.",
        "rom": "Chin-gu-rang gat-i ga-yo.",
        "en": "I go with my friend."
      },
      {
        "kr": "엄마랑 쇼핑해요.",
        "rom": "Eom-ma-rang syo-ping-hae-yo.",
        "en": "I go shopping with my mom."
      },
      {
        "kr": "책이랑 공책을 샀어요.",
        "rom": "Chae-gi-rang gong-chaek-eul sa-sseo-yo.",
        "en": "I bought a book and a notebook."
      },
      {
        "kr": "강아지랑 놀아요.",
        "rom": "Gang-a-ji-rang no-ra-yo.",
        "en": "I play with my puppy."
      }
    ],
    "nativeTip": "In everyday Korean,\n\npeople often choose\n\n랑 / 이랑\n\ninstead of\n\n와 / 과\n\nbecause it sounds more natural and friendly.\n\nFor example,\n\n친구랑\n\n(chin-gu-rang)\n\nis much more common than\n\n친구와\n\n(chin-gu-wa)\n\nin daily conversation.",
    "commonMistakes": [
      {
        "wrong": "❌ 책랑 (Chaek-rang) Wrong",
        "correct": "✅ 책이랑 (Chae-gi-rang) Book and Correct (Book ends with a consonant.)"
      },
      {
        "wrong": "❌ 친구이랑 (Chin-gu-i-rang) Wrong",
        "correct": "✅ 친구랑 (Chin-gu-rang) Friend and Correct (Friend ends with a vowel.)"
      }
    ],
    "compare": [
      {
        "grammar": "랑 / 이랑 (rang / i-rang)",
        "meaning": "And / With\tCasual connector",
        "mainJob": "And / With\tCasual connector"
      },
      {
        "grammar": "하고 (ha-go)",
        "meaning": "And / With\tNeutral connector",
        "mainJob": "And / With\tNeutral connector"
      },
      {
        "grammar": "와 / 과 (wa / gwa)",
        "meaning": "And / With\tFormal connector",
        "mainJob": "And / With\tFormal connector"
      }
    ],
    "miniQuiz": {
      "question": "책__ 연필 (Chaek__ yeon-pil) Book and pencil",
      "options": [
        "① 랑 (rang) And",
        "② 이랑 (i-rang) And"
      ],
      "answer": "✅ Answer  ② 이랑",
      "reason": "Because "
    },
    "speakingPractice": {
      "kr": "친구랑 같이 영화 봐요.",
      "rom": "Chin-gu-rang gat-i yeong-hwa bwa-yo.",
      "en": "I watch a movie with my friend.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 엄마__ 시장에 가요.",
      "answer": "✅ Answer\n\n엄마랑\n\n(Eom-ma-rang)\n\nWith my mom"
    },
    "relatedGrammar": [
      "하고 (ha-go) And / With",
      "와 / 과 (wa / gwa)",
      "And / With (Formal)"
    ],
    "relatedVocabulary": [
      {
        "kr": "친구",
        "rom": "chin-gu",
        "en": "friend"
      },
      {
        "kr": "엄마",
        "rom": "eom-ma",
        "en": "mom"
      },
      {
        "kr": "책",
        "rom": "chaek",
        "en": "book"
      },
      {
        "kr": "시장",
        "rom": "si-jang",
        "en": "market"
      }
    ],
    "teacherNote": "Core function: And / With (Very Casual).\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G028",
    "grammar": "이나 / 나",
    "romanization": "i-na / na",
    "title": "Or",
    "keywords": [
      "이나 / 나",
      "or",
      "i-na / na"
    ],
    "sentencePatterns": [
      "이나 / 나"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Coffee or tea?\"\n\nKorean uses\n\n이나 / 나\n\n(i-na / na)\n\nto mean\n\nor.\n\nIt lets the listener choose one of two things.",
    "memoryTrick": "🟦\n\n이나 / 나\n\n(i-na / na)\n\n=\n\nOr\n\nThink:\n\n☕ Coffee?\n\n🫖 Tea?\n\n👉 Choose one.",
    "easyExplanation": "이나 / 나\n\n(i-na / na)\n\nmeans\n\nor.\n\nIt connects two nouns and gives a choice.\n\nNative Koreans use it every day when asking questions or offering options.",
    "basicRule": "Use\n\n나\n\n(na)\n\nafter a noun ending with a vowel.\n\nExample\n\n커피\n\n(keo-pi)\n\ncoffee\n\n↓\n\n커피나\n\n(keo-pi-na)\n\ncoffee or\n\nUse\n\n이나\n\n(i-na)\n\nafter a noun ending with a consonant.\n\nExample\n\n책\n\n(chaek)\n\nbook\n\n↓\n\n책이나\n\n(chae-gi-na)\n\nbook or",
    "examples": [
      {
        "kr": "커피나 차 드실래요?",
        "rom": "Keo-pi-na cha deu-sil-lae-yo?",
        "en": "Would you like coffee or tea?"
      },
      {
        "kr": "오늘이나 내일 만나요.",
        "rom": "O-neul-i-na nae-il man-na-yo.",
        "en": "Let's meet today or tomorrow."
      },
      {
        "kr": "버스나 지하철로 가요.",
        "rom": "Beo-seu-na ji-ha-cheol-lo ga-yo.",
        "en": "Let's go by bus or subway."
      },
      {
        "kr": "책이나 영화가 좋아요?",
        "rom": "Chae-gi-na yeong-hwa-ga jo-a-yo?",
        "en": "Do you like books or movies?"
      }
    ],
    "nativeTip": "Native Koreans often use\n\n이나 / 나\n\nwhen they don't care which option is chosen.\n\nExample:\n\n아무거나 먹어요.\n\n(A-mu-geo-na meo-geo-yo.)\n\nEat anything.",
    "commonMistakes": [
      {
        "wrong": "❌ 커피이나 (Keo-pi-i-na) Wrong",
        "correct": "✅ 커피나 (Keo-pi-na) Coffee or Correct (Coffee ends with a vowel.)"
      },
      {
        "wrong": "❌ 책나 (Chaek-na) Wrong",
        "correct": "✅ 책이나 (Chae-gi-na) Book or Correct (Book ends with a consonant.)"
      }
    ],
    "compare": [
      {
        "grammar": "이나 / 나 (i-na / na)",
        "meaning": "Or\tGives a choice",
        "mainJob": "Or\tGives a choice"
      },
      {
        "grammar": "하고 (ha-go)",
        "meaning": "And / With\tConnects nouns together",
        "mainJob": "And / With\tConnects nouns together"
      }
    ],
    "miniQuiz": {
      "question": "책__ 연필 (Chaek__ yeon-pil) Book or pencil",
      "options": [
        "① 나 (na) Or",
        "② 이나 (i-na) Or"
      ],
      "answer": "✅ Answer  ② 이나",
      "reason": "Because "
    },
    "speakingPractice": {
      "kr": "커피나 차 마실래요?",
      "rom": "Keo-pi-na cha ma-sil-lae-yo?",
      "en": "Would you like coffee or tea?",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 사과__ 바나나 먹어요.",
      "answer": "✅ Answer\n\n사과나\n\n(Sa-gwa-na)\n\nApple or"
    },
    "relatedGrammar": [
      "하고 (ha-go) And / With"
    ],
    "relatedVocabulary": [
      {
        "kr": "커피",
        "rom": "keo-pi",
        "en": "coffee"
      },
      {
        "kr": "차",
        "rom": "cha",
        "en": "tea"
      },
      {
        "kr": "사과",
        "rom": "sa-gwa",
        "en": "apple"
      },
      {
        "kr": "바나나",
        "rom": "ba-na-na",
        "en": "banana"
      }
    ],
    "teacherNote": "Core function: Or.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G029",
    "grammar": "밖에 ~ 안",
    "romanization": "bak-ke ~ an",
    "title": "Only / Nothing But",
    "keywords": [
      "밖에 ~ 안",
      "only / nothing but",
      "bak-ke ~ an"
    ],
    "sentencePatterns": [
      "밖에 ~ 안"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine there is only one apple.\n\nYou say,\n\n\"There is only one apple.\"\n\nKorean often uses\n\n밖에 ~ 안\n\n(bak-ke ~ an)\n\nto express\n\nonly\n\nor\n\nnothing but.",
    "memoryTrick": "🟨\n\n밖에\n\n(bak-ke)\n\n❌\n\n안\n\n(an)\n\n=\n\nOnly\n\nThink:\n\nNothing else.",
    "easyExplanation": "밖에\n\n(bak-ke)\n\nalways works together with\n\n안\n\n(an)\n\n(or another negative expression).\n\nIt literally means\n\n\"There is nothing except...\"\n\nIn natural English,\n\nit means\n\nonly.",
    "basicRule": "Noun\n\n밖에\n\n(bak-ke)\n\n↓\n\nNegative verb\n\n(안\n\n(an)\n\nor another negative form)\n\nExample\n\n물\n\n(mul)\n\nwater\n\n↓\n\n물밖에\n\n(mul-bak-ke)\n\nonly water\n\n↓\n\n물밖에 안 마셔요.\n\n(Mul-bak-ke an ma-syeo-yo.)\n\nI only drink water.",
    "examples": [
      {
        "kr": "물밖에 안 마셔요.",
        "rom": "Mul-bak-ke an ma-syeo-yo.",
        "en": "I only drink water."
      },
      {
        "kr": "오늘밖에 시간이 없어요.",
        "rom": "O-neul-bak-ke si-ga-ni eop-seo-yo.",
        "en": "I only have time today."
      },
      {
        "kr": "천 원밖에 없어요.",
        "rom": "Cheon won-bak-ke eop-seo-yo.",
        "en": "I only have 1,000 won."
      },
      {
        "kr": "학생밖에 안 왔어요.",
        "rom": "Hak-saeng-bak-ke an wa-sseo-yo.",
        "en": "Only students came."
      }
    ],
    "nativeTip": "Native Koreans use\n\n밖에 없어요\n\n(bak-ke eop-seo-yo)\n\nvery often.\n\nExamples:\n\n돈밖에 없어요.\n\n(Don-bak-ke eop-seo-yo.)\n\nI only have money.\n\n시간밖에 없어요.\n\n(Si-gan-bak-ke eop-seo-yo.)\n\nI only have time.",
    "commonMistakes": [
      {
        "wrong": "❌ 물밖에 마셔요. (Mul-bak-ke ma-syeo-yo.) Wrong",
        "correct": "✅ 물밖에 안 마셔요. (Mul-bak-ke an ma-syeo-yo.) I only drink water. Correct"
      },
      {
        "wrong": "❌ 커피밖에 좋아해요. (Keo-pi-bak-ke jo-a-hae-yo.) Wrong",
        "correct": "✅ 커피밖에 안 마셔요. (Keo-pi-bak-ke an ma-syeo-yo.) I only drink coffee. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "만 (man)",
        "meaning": "Only\tSimple \"only\"",
        "mainJob": "Only\tSimple \"only\""
      },
      {
        "grammar": "밖에 ~ 안 (bak-ke ~ an)",
        "meaning": "Nothing but / Only\tStronger emphasis on \"only\"",
        "mainJob": "Nothing but / Only\tStronger emphasis on \"only\""
      }
    ],
    "miniQuiz": {
      "question": "물_____ 마셔요. (Mul_____ ma-syeo-yo.) I only drink water.",
      "options": [
        "① 밖에 안 (bak-ke an) Only",
        "② 도 (do) Also"
      ],
      "answer": "✅ Answer  ① 밖에 안",
      "reason": "Because nothing else is included."
    },
    "speakingPractice": {
      "kr": "오늘밖에 시간이 없어요.",
      "rom": "O-neul-bak-ke si-ga-ni eop-seo-yo.",
      "en": "I only have time today.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 저는 한국어_____ 공부해요.",
      "answer": "✅ Answer\n\n한국어밖에 안\n\n(Han-gu-geo-bak-ke an)\n\nOnly Korean"
    },
    "relatedGrammar": [
      "만 (man) Only / Just"
    ],
    "relatedVocabulary": [
      {
        "kr": "물",
        "rom": "mul",
        "en": "water"
      },
      {
        "kr": "시간",
        "rom": "si-gan",
        "en": "time"
      },
      {
        "kr": "돈",
        "rom": "don",
        "en": "money"
      },
      {
        "kr": "학생",
        "rom": "hak-saeng",
        "en": "student"
      }
    ],
    "teacherNote": "Core function: Only / Nothing But.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G030",
    "grammar": "만큼",
    "romanization": "man-keum",
    "title": "As Much As / As...As",
    "keywords": [
      "만큼",
      "as much as / as...as",
      "man-keum"
    ],
    "sentencePatterns": [
      "만큼"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"I love Korean as much as you do.\"\n\nOr,\n\n\"This bag is as heavy as that one.\"\n\nKorean uses\n\n만큼\n\n(man-keum)\n\nto compare equal amounts, sizes, or degrees.",
    "memoryTrick": "🟦\n\n만큼\n\n(man-keum)\n\n=\n\n⚖️\n\nAs much as\n\n=\n\nAs...as\n\nThink:\n\nSame level.",
    "easyExplanation": "만큼\n\n(man-keum)\n\nmeans\n\nas much as\n\nor\n\nas...as.\n\nIt compares two things that are equal or similar.\n\nNative Koreans use\n\n만큼\n\nvery often when comparing people, things, time, size, or ability.",
    "basicRule": "Noun\n\n만큼\n\n(man-keum)\n\n↓\n\nComparison\n\nExample\n\n너\n\n(neo)\n\nyou\n\n↓\n\n너만큼\n\n(neo-man-keum)\n\nas much as you",
    "examples": [
      {
        "kr": "너만큼 한국어를 잘해요.",
        "rom": "Neo-man-keum Han-gu-geo-reul jal-hae-yo.",
        "en": "I speak Korean as well as you."
      },
      {
        "kr": "이 가방은 저 가방만큼 커요.",
        "rom": "I ga-bang-eun jeo ga-bang-man-keum keo-yo.",
        "en": "This bag is as big as that bag."
      },
      {
        "kr": "오늘은 어제만큼 추워요.",
        "rom": "O-neul-eun eo-je-man-keum chu-wo-yo.",
        "en": "Today is as cold as yesterday."
      },
      {
        "kr": "엄마만큼 요리를 잘하고 싶어요.",
        "rom": "Eom-ma-man-keum yo-ri-reul jal-ha-go si-peo-yo.",
        "en": "I want to cook as well as my mom."
      }
    ],
    "nativeTip": "Native Koreans often say\n\n생각보다\n\n(saeng-gak-bo-da)\n\n\"more than I thought\"\n\nand\n\n~만큼\n\n(man-keum)\n\ntogether.\n\nExample:\n\n생각보다 어렵지만 선생님만큼 잘하고 싶어요.\n\n(Saeng-gak-bo-da eo-ryeop-ji-man seon-saeng-nim-man-keum jal-ha-go si-peo-yo.)\n\nIt's harder than I thought, but I want to do it as well as my teacher.",
    "commonMistakes": [
      {
        "wrong": "❌ 너만 (Neo-man) Only you Wrong if you mean as much as you.",
        "correct": "✅ 너만큼 (Neo-man-keum) As much as you Correct"
      },
      {
        "wrong": "❌ 책만큼 학생 (Chaek-man-keum hak-saeng) Incorrect word order.",
        "correct": "✅ 학생만큼 공부해요. (Hak-saeng-man-keum gong-bu-hae-yo.) I study as much as the student. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "만 (man)",
        "meaning": "Only\tLimits something",
        "mainJob": "Only\tLimits something"
      }
    ],
    "miniQuiz": {
      "question": "엄마_____ 요리를 잘해요. (Eom-ma_____ yo-ri-reul jal-hae-yo.) I cook as well as my mom.",
      "options": [
        "① 만 (man) Only",
        "② 만큼 (man-keum) As much as"
      ],
      "answer": "✅ Answer  ② 만큼",
      "reason": "Because you are making a comparison."
    },
    "speakingPractice": {
      "kr": "친구만큼 빨리 달려요.",
      "rom": "Chin-gu-man-keum ppal-li dal-lyeo-yo.",
      "en": "I run as fast as my friend.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 한국어를 선생님_____ 잘하고 싶어요.",
      "answer": "✅ Answer\n\n선생님만큼\n\n(Seon-saeng-nim-man-keum)\n\nAs well as my teacher"
    },
    "relatedGrammar": [
      "보다 (bo-da)",
      "Than (comparison)"
    ],
    "relatedVocabulary": [
      {
        "kr": "엄마",
        "rom": "eom-ma",
        "en": "mom"
      },
      {
        "kr": "선생님",
        "rom": "seon-saeng-nim",
        "en": "teacher"
      },
      {
        "kr": "가방",
        "rom": "ga-bang",
        "en": "bag"
      },
      {
        "kr": "어제",
        "rom": "eo-je",
        "en": "yesterday"
      }
    ],
    "teacherNote": "Core function: As Much As / As...As.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G031",
    "grammar": "보다",
    "romanization": "bo-da",
    "title": "Than (Comparison)",
    "keywords": [
      "보다",
      "than (comparison)",
      "bo-da"
    ],
    "sentencePatterns": [
      "보다"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you want to say,\n\n\"Korean is harder than English.\"\n\nOr,\n\n\"Today is hotter than yesterday.\"\n\nKorean uses\n\n보다\n\n(bo-da)\n\nto mean\n\nthan.\n\nIt compares two different things.",
    "memoryTrick": "🟦\n\n보다\n\n(bo-da)\n\n=\n\n⬆️\n\nThan\n\nThink:\n\nA is more than B.",
    "easyExplanation": "보다\n\n(bo-da)\n\nmeans\n\nthan.\n\nIt compares two people, things, places, or times.\n\nUnlike\n\n만큼\n\n(man-keum)\n\nwhich means\n\nas...as,\n\n보다\n\n(bo-da)\n\nshows that one thing is more or less than another.\n\nNative Koreans use it every day.",
    "basicRule": "Noun\n\n보다\n\n(bo-da)\n\n↓\n\nComparison adjective or verb\n\nExample\n\n한국어\n\n(Han-gu-geo)\n\nKorean\n\n↓\n\n영어보다\n\n(Yeong-eo-bo-da)\n\nthan English\n\n↓\n\n한국어는 영어보다 어려워요.\n\n(Han-gu-geo-neun Yeong-eo-bo-da eo-ryeo-wo-yo.)\n\nKorean is more difficult than English.",
    "examples": [
      {
        "kr": "오늘은 어제보다 더워요.",
        "rom": "O-neul-eun eo-je-bo-da deo-wo-yo.",
        "en": "Today is hotter than yesterday."
      },
      {
        "kr": "한국어는 영어보다 어려워요.",
        "rom": "Han-gu-geo-neun Yeong-eo-bo-da eo-ryeo-wo-yo.",
        "en": "Korean is more difficult than English."
      },
      {
        "kr": "버스보다 지하철이 빨라요.",
        "rom": "Beo-seu-bo-da ji-ha-cheo-ri ppal-la-yo.",
        "en": "The subway is faster than the bus."
      },
      {
        "kr": "커피보다 차를 더 좋아해요.",
        "rom": "Keo-pi-bo-da cha-reul deo jo-a-hae-yo.",
        "en": "I like tea more than coffee."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n더\n\n(deo)\n\nmore\n\ntogether with\n\n보다\n\n(bo-da)\n\nExample:\n\n더 커요.\n\n(Deo keo-yo.)\n\nIt's bigger.\n\n오늘은 어제보다 더 커요.\n\n(O-neul-eun eo-je-bo-da deo keo-yo.)\n\nToday it's bigger than yesterday.",
    "commonMistakes": [
      {
        "wrong": "❌ 한국어만큼 영어 어려워요. (Han-gu-geo-man-keum Yeong-eo eo-ryeo-wo-yo.) Wrong If you mean \"more difficult than.\"",
        "correct": "✅ 한국어는 영어보다 어려워요. (Han-gu-geo-neun Yeong-eo-bo-da eo-ryeo-wo-yo.) Korean is more difficult than English. Correct"
      },
      {
        "wrong": "❌ 커피보다 좋아해요. (Keo-pi-bo-da jo-a-hae-yo.) Wrong The thing being compared is missing.",
        "correct": "✅ 커피보다 차를 좋아해요. (Keo-pi-bo-da cha-reul jo-a-hae-yo.) I like tea more than coffee. Correct"
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "오늘은 어제_____ 더워요. (O-neul-eun eo-je_____ deo-wo-yo.) Today is hotter than yesterday.",
      "options": [
        "① 보다 (bo-da) Than",
        "② 만큼 (man-keum) As...as"
      ],
      "answer": "✅ Answer  ① 보다",
      "reason": "Because today and yesterday are being compared."
    },
    "speakingPractice": {
      "kr": "한국어는 영어보다 어려워요.",
      "rom": "Han-gu-geo-neun Yeong-eo-bo-da eo-ryeo-wo-yo.",
      "en": "Korean is more difficult than English.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 버스_____ 지하철이 빨라요.",
      "answer": "✅ Answer\n\n버스보다\n\n(Beo-seu-bo-da)\n\nThan the bus"
    },
    "relatedGrammar": [
      "만큼 (man-keum) As much as / As...as"
    ],
    "relatedVocabulary": [
      {
        "kr": "오늘",
        "rom": "o-neul",
        "en": "today"
      },
      {
        "kr": "어제",
        "rom": "eo-je",
        "en": "yesterday"
      },
      {
        "kr": "영어",
        "rom": "yeong-eo",
        "en": "English"
      },
      {
        "kr": "지하철",
        "rom": "ji-ha-cheol",
        "en": "subway"
      }
    ],
    "teacherNote": "Core function: Than (Comparison).\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G032",
    "grammar": "더",
    "romanization": "deo",
    "title": "More",
    "keywords": [
      "더",
      "more",
      "deo"
    ],
    "sentencePatterns": [
      "더"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"I want more coffee.\"\n\nOr,\n\n\"Study more.\"\n\nKorean uses\n\n더\n\n(deo)\n\nto mean\n\nmore.\n\nIt means a greater amount, degree, or quantity.",
    "memoryTrick": "🟩\n\n더\n\n(deo)\n\n=\n\n⬆️\n\nMore\n\nThink:\n\nMore! More!",
    "easyExplanation": "더\n\n(deo)\n\nmeans\n\nmore.\n\nIt is an adverb.\n\nIt is used before adjectives, verbs, or sometimes nouns to show a greater amount or degree.\n\nNative Koreans use\n\n더\n\nevery day.",
    "basicRule": "Put\n\n더\n\n(deo)\n\nbefore an adjective or verb.\n\nExample\n\n더\n\n(deo)\n\nmore\n\n커요\n\n(keo-yo)\n\nis big\n\n↓\n\n더 커요.\n\n(Deo keo-yo.)\n\nIt's bigger.",
    "examples": [
      {
        "kr": "더 주세요.",
        "rom": "Deo ju-se-yo.",
        "en": "Please give me more."
      },
      {
        "kr": "더 공부하고 싶어요.",
        "rom": "Deo gong-bu-ha-go si-peo-yo.",
        "en": "I want to study more."
      },
      {
        "kr": "오늘은 어제보다 더 더워요.",
        "rom": "O-neul-eun eo-je-bo-da deo deo-wo-yo.",
        "en": "Today is hotter than yesterday."
      },
      {
        "kr": "조금 더 기다려 주세요.",
        "rom": "Jo-geum deo gi-da-ryeo ju-se-yo.",
        "en": "Please wait a little longer."
      }
    ],
    "nativeTip": "Native Koreans often combine\n\n더\n\n(deo)\n\nwith\n\n보다\n\n(bo-da)\n\nto compare two things.\n\nExample:\n\n한국어는 영어보다 더 어려워요.\n\n(Han-gu-geo-neun Yeong-eo-bo-da deo eo-ryeo-wo-yo.)\n\nKorean is more difficult than English.",
    "commonMistakes": [
      {
        "wrong": "❌ 커요 더. (Keo-yo deo.) Wrong",
        "correct": "✅ 더 커요. (Deo keo-yo.) It's bigger. Correct"
      },
      {
        "wrong": "❌ 더 가장 커요. (Deo ga-jang keo-yo.) Wrong Because 더 (deo) and 가장 (ga-jang) should not normally be used together.",
        "correct": "✅ 더 커요. (Deo keo-yo.) It's bigger. or 가장 커요. (Ga-jang keo-yo.) It's the biggest."
      }
    ],
    "compare": [
      {
        "grammar": "더 (deo)",
        "meaning": "More\tComparative",
        "mainJob": "More\tComparative"
      },
      {
        "grammar": "가장 (ga-jang)",
        "meaning": "The most\tSuperlative",
        "mainJob": "The most\tSuperlative"
      }
    ],
    "miniQuiz": {
      "question": "한국어는 영어보다 _____ 어려워요. (Han-gu-geo-neun Yeong-eo-bo-da _____ eo-ryeo-wo-yo.) Korean is more difficult than English.",
      "options": [
        "① 더 (deo) More",
        "② 가장 (ga-jang) The most"
      ],
      "answer": "✅ Answer  ① 더",
      "reason": "Because you are comparing two things."
    },
    "speakingPractice": {
      "kr": "더 연습할게요.",
      "rom": "Deo yeon-seup-hal-ge-yo.",
      "en": "I'll practice more.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 조금 _____ 천천히 말해 주세요.",
      "answer": "✅ Answer\n\n더\n\n(deo)\n\nMore"
    },
    "relatedGrammar": [
      "가장 (ga-jang) The Most"
    ],
    "relatedVocabulary": [
      {
        "kr": "조금",
        "rom": "jo-geum",
        "en": "a little"
      },
      {
        "kr": "연습하다",
        "rom": "yeon-seup-ha-da",
        "en": "to practice"
      },
      {
        "kr": "천천히",
        "rom": "cheon-cheon-hi",
        "en": "slowly"
      }
    ],
    "teacherNote": "Core function: More.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G033",
    "grammar": "가장",
    "romanization": "ga-jang",
    "title": "The Most",
    "keywords": [
      "가장",
      "the most",
      "ga-jang"
    ],
    "sentencePatterns": [
      "가장"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"Korean food is the most delicious.\"\n\nOr,\n\n\"This is my favorite movie.\"\n\nKorean uses\n\n가장\n\n(ga-jang)\n\nto mean\n\nthe most.\n\nIt shows that something is number one.",
    "memoryTrick": "🟨\n\n가장\n\n(ga-jang)\n\n=\n\n🥇\n\nThe Most\n\nThink:\n\nNumber 1\n\nThe best.",
    "easyExplanation": "가장\n\n(ga-jang)\n\nmeans\n\nthe most.\n\nIt is used before adjectives or descriptive verbs.\n\nUnlike\n\n더\n\n(deo)\n\nwhich compares two things,\n\n가장\n\n(ga-jang)\n\nmeans the highest, biggest, best, or most among all.\n\nNative Koreans use it every day.",
    "basicRule": "Put\n\n가장\n\n(ga-jang)\n\nbefore an adjective.\n\nExample\n\n가장\n\n(ga-jang)\n\nthe most\n\n맛있어요\n\n(ma-si-sseo-yo)\n\nis delicious\n\n↓\n\n가장 맛있어요.\n\n(Ga-jang ma-si-sseo-yo.)\n\nIt's the most delicious.",
    "examples": [
      {
        "kr": "한국 음식이 가장 맛있어요.",
        "rom": "Han-guk eum-si-gi ga-jang ma-si-sseo-yo.",
        "en": "Korean food is the most delicious."
      },
      {
        "kr": "이 책이 가장 재미있어요.",
        "rom": "I chae-gi ga-jang jae-mi-it-sseo-yo.",
        "en": "This book is the most interesting."
      },
      {
        "kr": "겨울이 가장 추워요.",
        "rom": "Gyeo-u-ri ga-jang chu-wo-yo.",
        "en": "Winter is the coldest."
      },
      {
        "kr": "한국어가 가장 어려워요.",
        "rom": "Han-gu-geo-ga ga-jang eo-ryeo-wo-yo.",
        "en": "Korean is the most difficult."
      }
    ],
    "nativeTip": "Native Koreans often say\n\n가장 좋아해요.\n\n(Ga-jang jo-a-hae-yo.)\n\nI like it the most.\n\nIt is very common when talking about favorite food, music, movies, or hobbies.",
    "commonMistakes": [
      {
        "wrong": "❌ 더 가장 커요. (Deo ga-jang keo-yo.) Wrong",
        "correct": "✅ 가장 커요. (Ga-jang keo-yo.) It's the biggest. Correct"
      },
      {
        "wrong": "❌ 가장 영어보다 어려워요. (Ga-jang Yeong-eo-bo-da eo-ryeo-wo-yo.) Wrong",
        "correct": "✅ 영어보다 더 어려워요. (Yeong-eo-bo-da deo eo-ryeo-wo-yo.) It's more difficult than English. Correct ✅ 가장 어려워요. (Ga-jang eo-ryeo-wo-yo.) It's the most difficult. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "가장 (ga-jang)",
        "meaning": "The most\tHighest among all",
        "mainJob": "The most\tHighest among all"
      }
    ],
    "miniQuiz": {
      "question": "한국 음식이 _____ 맛있어요. (Han-guk eum-si-gi _____ ma-si-sseo-yo.) Korean food is the most delicious.",
      "options": [
        "① 더 (deo) More",
        "② 가장 (ga-jang) The most"
      ],
      "answer": "✅ Answer  ② 가장",
      "reason": "Because Korean food is being compared with everything."
    },
    "speakingPractice": {
      "kr": "한국어가 가장 재미있어요.",
      "rom": "Han-gu-geo-ga ga-jang jae-mi-it-sseo-yo.",
      "en": "Korean is the most interesting.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 저는 김치를 _____ 좋아해요.",
      "answer": "✅ Answer\n\n가장\n\n(ga-jang)\n\nThe most"
    },
    "relatedGrammar": [
      "더 (deo) More"
    ],
    "relatedVocabulary": [
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      },
      {
        "kr": "재미있다",
        "rom": "jae-mi-it-da",
        "en": "to be interesting"
      },
      {
        "kr": "어렵다",
        "rom": "eo-ryeop-da",
        "en": "to be difficult"
      },
      {
        "kr": "김치",
        "rom": "gim-chi",
        "en": "kimchi"
      }
    ],
    "teacherNote": "Core function: The Most.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G034",
    "grammar": "아주",
    "romanization": "a-ju",
    "title": "Very",
    "keywords": [
      "아주",
      "very",
      "a-ju"
    ],
    "sentencePatterns": [
      "아주"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you want to say,\n\n\"This is very delicious.\"\n\nOr,\n\n\"I'm very happy.\"\n\nKorean uses\n\n아주\n\n(a-ju)\n\nto mean\n\nvery.\n\nIt makes an adjective or description stronger.",
    "memoryTrick": "🟦\n\n아주\n\n(a-ju)\n\n=\n\n⭐⭐⭐\n\nVery\n\nThink:\n\nVery!",
    "easyExplanation": "아주\n\n(a-ju)\n\nmeans\n\nvery.\n\nIt is an adverb.\n\nIt comes before adjectives and descriptive verbs to make them stronger.\n\nNative Koreans use\n\n아주\n\nevery day.",
    "basicRule": "Put\n\n아주\n\n(a-ju)\n\nbefore an adjective.\n\nExample\n\n아주\n\n(a-ju)\n\nvery\n\n좋아요\n\n(jo-a-yo)\n\nis good\n\n↓\n\n아주 좋아요.\n\n(A-ju jo-a-yo.)\n\nIt's very good.",
    "examples": [
      {
        "kr": "아주 맛있어요.",
        "rom": "A-ju ma-si-sseo-yo.",
        "en": "It's very delicious."
      },
      {
        "kr": "오늘은 아주 더워요.",
        "rom": "O-neul-eun a-ju deo-wo-yo.",
        "en": "Today is very hot."
      },
      {
        "kr": "한국어가 아주 재미있어요.",
        "rom": "Han-gu-geo-ga a-ju jae-mi-it-sseo-yo.",
        "en": "Korean is very interesting."
      },
      {
        "kr": "저는 아주 행복해요.",
        "rom": "Jeo-neun a-ju haeng-bok-hae-yo.",
        "en": "I am very happy."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n정말\n\n(jeong-mal)\n\nand\n\n너무\n\n(neo-mu)\n\nmore often in daily conversation.\n\nHowever,\n\n아주\n\n(a-ju)\n\nis still very common, especially in polite speech, books, news, and formal situations.",
    "commonMistakes": [
      {
        "wrong": "❌ 좋아요 아주. (Jo-a-yo a-ju.) Wrong",
        "correct": "✅ 아주 좋아요. (A-ju jo-a-yo.) It's very good. Correct"
      },
      {
        "wrong": "❌ 아주 학생이에요. (A-ju hak-saeng-i-e-yo.) Wrong Because 아주 modifies adjectives, not nouns.",
        "correct": "✅ 아주 친절해요. (A-ju chin-jeol-hae-yo.) Very kind. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "아주 (a-ju)",
        "meaning": "Very\tNeutral emphasis",
        "mainJob": "Very\tNeutral emphasis"
      },
      {
        "grammar": "정말 (jeong-mal)",
        "meaning": "Really / Very\tStrong emphasis",
        "mainJob": "Really / Very\tStrong emphasis"
      },
      {
        "grammar": "너무 (neo-mu)",
        "meaning": "Very / Too\tStrong emphasis (most common in speech)",
        "mainJob": "Very / Too\tStrong emphasis (most common in speech)"
      }
    ],
    "miniQuiz": {
      "question": "오늘은 _____ 더워요. (O-neul-eun _____ deo-wo-yo.) Today is very hot.",
      "options": [
        "① 아주 (a-ju) Very",
        "② 하고 (ha-go) And"
      ],
      "answer": "✅ Answer  ① 아주",
      "reason": "Because you are making the adjective stronger."
    },
    "speakingPractice": {
      "kr": "한국 음식이 아주 맛있어요.",
      "rom": "Han-guk eum-si-gi a-ju ma-si-sseo-yo.",
      "en": "Korean food is very delicious.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 저는 _____ 행복해요.",
      "answer": "✅ Answer\n\n아주\n\n(a-ju)\n\nVery"
    },
    "relatedGrammar": [
      "정말 (jeong-mal) Really / Very",
      "너무 (neo-mu) Very / Too"
    ],
    "relatedVocabulary": [
      {
        "kr": "좋다",
        "rom": "jo-ta",
        "en": "to be good"
      },
      {
        "kr": "행복하다",
        "rom": "haeng-bok-ha-da",
        "en": "to be happy"
      },
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      },
      {
        "kr": "친절하다",
        "rom": "chin-jeol-ha-da",
        "en": "to be kind"
      }
    ],
    "teacherNote": "Core function: Very.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G035",
    "grammar": "정말",
    "romanization": "jeong-mal",
    "title": "Really / Very",
    "keywords": [
      "정말",
      "really / very",
      "jeong-mal"
    ],
    "sentencePatterns": [
      "정말"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend gives you a gift.\n\nYou say,\n\n\"Really? Thank you!\"\n\nOr,\n\n\"It's really delicious!\"\n\nKorean uses\n\n정말\n\n(jeong-mal)\n\nto mean\n\nreally\n\nor\n\nvery.\n\nIt expresses strong feelings or emphasis.",
    "memoryTrick": "🟦\n\n정말\n\n(jeong-mal)\n\n=\n\n⭐\n\nReally!\n\n⭐⭐\n\nVery!\n\nThink:\n\nWow! Really!",
    "easyExplanation": "정말\n\n(jeong-mal)\n\nmeans\n\nreally,\n\ntruly,\n\nor\n\nvery.\n\nIt is used to make what you say sound stronger.\n\nNative Koreans use\n\n정말\n\nevery day in conversations.",
    "basicRule": "Put\n\n정말\n\n(jeong-mal)\n\nbefore an adjective or verb.\n\nExample\n\n정말\n\n(jeong-mal)\n\nreally\n\n좋아요\n\n(jo-a-yo)\n\nis good\n\n↓\n\n정말 좋아요.\n\n(Jeong-mal jo-a-yo.)\n\nIt's really good.",
    "examples": [
      {
        "kr": "정말 맛있어요.",
        "rom": "Jeong-mal ma-si-sseo-yo.",
        "en": "It's really delicious."
      },
      {
        "kr": "정말 감사합니다.",
        "rom": "Jeong-mal gam-sa-ham-ni-da.",
        "en": "Thank you very much."
      },
      {
        "kr": "정말 예뻐요.",
        "rom": "Jeong-mal ye-ppeo-yo.",
        "en": "It's really pretty."
      },
      {
        "kr": "정말이에요?",
        "rom": "Jeong-ma-ri-e-yo?",
        "en": "Really?"
      }
    ],
    "nativeTip": "Native Koreans use\n\n정말?\n\n(Jeong-mal?)\n\nReally?\n\nall the time.\n\nIt is one of the most common reactions in Korean conversations.",
    "commonMistakes": [
      {
        "wrong": "❌ 좋아요 정말. (Jo-a-yo jeong-mal.) Not natural.",
        "correct": "✅ 정말 좋아요. (Jeong-mal jo-a-yo.) It's really good. Correct"
      },
      {
        "wrong": "❌ 정말 학생이에요. (Jeong-mal hak-saeng-i-e-yo.) Wrong Because 정말 usually modifies adjectives or verbs, not nouns.",
        "correct": "✅ 정말 친절해요. (Jeong-mal chin-jeol-hae-yo.) Very kind. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "정말 (jeong-mal)",
        "meaning": "Really / Very\tStrong emphasis",
        "mainJob": "Really / Very\tStrong emphasis"
      },
      {
        "grammar": "아주 (a-ju)",
        "meaning": "Very\tNeutral emphasis",
        "mainJob": "Very\tNeutral emphasis"
      },
      {
        "grammar": "너무 (neo-mu)",
        "meaning": "Very / Too\tVery common in daily speech",
        "mainJob": "Very / Too\tVery common in daily speech"
      }
    ],
    "miniQuiz": {
      "question": "_____ 맛있어요! (_____ ma-si-sseo-yo!) It's really delicious!",
      "options": [
        "① 정말 (jeong-mal) Really / Very",
        "② 하고 (ha-go) And"
      ],
      "answer": "✅ Answer  ① 정말",
      "reason": "Because you are emphasizing the adjective."
    },
    "speakingPractice": {
      "kr": "정말 한국어가 재미있어요.",
      "rom": "Jeong-mal Han-gu-geo-ga jae-mi-it-sseo-yo.",
      "en": "Korean is really interesting.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. _____ 감사합니다.",
      "answer": "✅ Answer\n\n정말\n\n(jeong-mal)\n\nReally / Very"
    },
    "relatedGrammar": [
      "아주 (a-ju) Very",
      "너무 (neo-mu) Very / Too"
    ],
    "relatedVocabulary": [
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      },
      {
        "kr": "감사합니다",
        "rom": "gam-sa-ham-ni-da",
        "en": "thank you"
      },
      {
        "kr": "예쁘다",
        "rom": "ye-ppeu-da",
        "en": "to be pretty"
      },
      {
        "kr": "친절하다",
        "rom": "chin-jeol-ha-da",
        "en": "to be kind"
      }
    ],
    "teacherNote": "Core function: Really / Very.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G036",
    "grammar": "너무",
    "romanization": "neo-mu",
    "title": "Very / Too",
    "keywords": [
      "너무",
      "very / too",
      "neo-mu"
    ],
    "sentencePatterns": [
      "너무"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you eat spicy food.\n\nYou say,\n\n\"It's very spicy!\"\n\nOr,\n\n\"It's too spicy!\"\n\nKorean uses\n\n너무\n\n(neo-mu)\n\nto mean\n\nvery\n\nor\n\ntoo.\n\nToday,\n\nNative Koreans usually use\n\n너무\n\nto mean\n\nvery.",
    "memoryTrick": "🟦\n\n너무\n\n(neo-mu)\n\n=\n\n⭐⭐⭐\n\nVery\n\nSometimes\n\n🚫\n\nToo much\n\nThink:\n\nVery!",
    "easyExplanation": "너무\n\n(neo-mu)\n\noriginally meant\n\ntoo much.\n\nHowever,\n\nmodern Korean speakers very often use it simply to mean\n\nvery.\n\nIt is one of the most common Korean words.\n\nYou'll hear it everywhere.",
    "basicRule": "Put\n\n너무\n\n(neo-mu)\n\nbefore an adjective or verb.\n\nExample\n\n너무\n\n(neo-mu)\n\nvery\n\n예뻐요\n\n(ye-ppeo-yo)\n\nis pretty\n\n↓\n\n너무 예뻐요.\n\n(Neo-mu ye-ppeo-yo.)\n\nIt's very pretty.",
    "examples": [
      {
        "kr": "너무 맛있어요.",
        "rom": "Neo-mu ma-si-sseo-yo.",
        "en": "It's very delicious."
      },
      {
        "kr": "너무 예뻐요.",
        "rom": "Neo-mu ye-ppeo-yo.",
        "en": "It's very pretty."
      },
      {
        "kr": "오늘 너무 더워요.",
        "rom": "O-neul neo-mu deo-wo-yo.",
        "en": "It's very hot today."
      },
      {
        "kr": "한국어가 너무 재미있어요.",
        "rom": "Han-gu-geo-ga neo-mu jae-mi-it-sseo-yo.",
        "en": "Korean is very interesting."
      }
    ],
    "nativeTip": "Among\n\n아주\n\n(a-ju),\n\n정말\n\n(jeong-mal),\n\nand\n\n너무\n\n(neo-mu),\n\nNative Koreans use\n\n너무\n\nthe most in everyday conversation.\n\nExample:\n\n너무 좋아요!\n\n(Neo-mu jo-a-yo!)\n\nI love it! / It's so good!",
    "commonMistakes": [
      {
        "wrong": "❌ 예뻐요 너무. (Ye-ppeo-yo neo-mu.) Not natural.",
        "correct": "✅ 너무 예뻐요. (Neo-mu ye-ppeo-yo.) It's very pretty. Correct"
      },
      {
        "wrong": "❌ 너무 학생이에요. (Neo-mu hak-saeng-i-e-yo.) Wrong Because 너무 modifies adjectives or verbs, not nouns.",
        "correct": "✅ 너무 친절해요. (Neo-mu chin-jeol-hae-yo.) Very kind. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "너무 (neo-mu)",
        "meaning": "Very / Too\tEveryday emphasis",
        "mainJob": "Very / Too\tEveryday emphasis"
      },
      {
        "grammar": "정말 (jeong-mal)",
        "meaning": "Really / Very\tStrong emphasis",
        "mainJob": "Really / Very\tStrong emphasis"
      },
      {
        "grammar": "아주 (a-ju)",
        "meaning": "Very\tNeutral emphasis",
        "mainJob": "Very\tNeutral emphasis"
      }
    ],
    "miniQuiz": {
      "question": "_____ 맛있어요! (_____ ma-si-sseo-yo!) It's very delicious!",
      "options": [
        "① 너무 (neo-mu) Very",
        "② 만 (man) Only"
      ],
      "answer": "✅ Answer  ① 너무",
      "reason": "Because you are emphasizing the adjective."
    },
    "speakingPractice": {
      "kr": "한국 음식이 너무 맛있어요.",
      "rom": "Han-guk eum-si-gi neo-mu ma-si-sseo-yo.",
      "en": "Korean food is very delicious.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 오늘 _____ 피곤해요.",
      "answer": "✅ Answer\n\n너무\n\n(neo-mu)\n\nVery"
    },
    "relatedGrammar": [
      "정말 (jeong-mal) Really / Very",
      "아주 (a-ju) Very"
    ],
    "relatedVocabulary": [
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      },
      {
        "kr": "예쁘다",
        "rom": "ye-ppeu-da",
        "en": "to be pretty"
      },
      {
        "kr": "피곤하다",
        "rom": "pi-go-na-da",
        "en": "to be tired"
      },
      {
        "kr": "친절하다",
        "rom": "chin-jeol-ha-da",
        "en": "to be kind"
      }
    ],
    "teacherNote": "Core function: Very / Too.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G037",
    "grammar": "아직",
    "romanization": "a-jik",
    "title": "Still / Yet",
    "keywords": [
      "아직",
      "still / yet",
      "a-jik"
    ],
    "sentencePatterns": [
      "아직"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Did you eat lunch?\"\n\nYou answer,\n\n\"Not yet.\"\n\nKorean uses\n\n아직\n\n(a-jik)\n\nto mean\n\nstill\n\nor\n\nyet.",
    "memoryTrick": "🟦\n\n아직\n\n(a-jik)\n\n=\n\n⏳\n\nStill\n\n❌\n\nNot yet\n\nThink:\n\nThe time hasn't come yet.",
    "easyExplanation": "아직\n\n(a-jik)\n\nmeans\n\nstill\n\nor\n\nyet.\n\nIt talks about something that has not happened yet or something that is continuing.\n\nNative Koreans use\n\n아직\n\nevery day.",
    "basicRule": "아직\n\n(a-jik)\n\nusually comes before the verb.\n\nExample\n\n아직\n\n(a-jik)\n\nyet\n\n안 먹었어요.\n\n(an meo-geo-sseo-yo)\n\ndidn't eat\n\n↓\n\n아직 안 먹었어요.\n\n(A-jik an meo-geo-sseo-yo.)\n\nI haven't eaten yet.",
    "examples": [
      {
        "kr": "아직 안 먹었어요.",
        "rom": "A-jik an meo-geo-sseo-yo.",
        "en": "I haven't eaten yet."
      },
      {
        "kr": "아직 집에 있어요.",
        "rom": "A-jik ji-be i-sseo-yo.",
        "en": "I'm still at home."
      },
      {
        "kr": "아직 공부하고 있어요.",
        "rom": "A-jik gong-bu-ha-go i-sseo-yo.",
        "en": "I'm still studying."
      },
      {
        "kr": "아직 몰라요.",
        "rom": "A-jik mol-la-yo.",
        "en": "I don't know yet."
      }
    ],
    "nativeTip": "One of the most common Korean expressions is\n\n아직이에요.\n\n(A-jik-i-e-yo.)\n\nNot yet.\n\nIf someone asks,\n\n다 했어요?\n\n(Da hae-sseo-yo?)\n\nDid you finish?\n\nYou can simply answer,\n\n아직이에요.\n\n(A-jik-i-e-yo.)\n\nNot yet.",
    "commonMistakes": [
      {
        "wrong": "❌ 안 아직 먹었어요. (An a-jik meo-geo-sseo-yo.) Wrong",
        "correct": "✅ 아직 안 먹었어요. (A-jik an meo-geo-sseo-yo.) I haven't eaten yet. Correct"
      },
      {
        "wrong": "❌ 아직 내일 가요. (A-jik nae-il ga-yo.) Wrong",
        "correct": "✅ 내일 가요. (Nae-il ga-yo.) I'm going tomorrow. or 아직 안 가요. (A-jik an ga-yo.) I'm not going yet. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "아직 (a-jik)",
        "meaning": "Still / Yet\tSomething has not finished or happened",
        "mainJob": "Still / Yet\tSomething has not finished or happened"
      },
      {
        "grammar": "벌써 (beol-sseo)",
        "meaning": "Already\tSomething happened earlier than expected",
        "mainJob": "Already\tSomething happened earlier than expected"
      }
    ],
    "miniQuiz": {
      "question": "_____ 안 잤어요. (_____ an ja-sseo-yo.) I haven't slept yet.",
      "options": [
        "① 아직 (a-jik) Yet",
        "② 벌써 (beol-sseo) Already"
      ],
      "answer": "✅ Answer  ① 아직",
      "reason": "Because the action has not happened."
    },
    "speakingPractice": {
      "kr": "아직 준비 안 됐어요.",
      "rom": "A-jik jun-bi an dwae-sseo-yo.",
      "en": "I'm not ready yet.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 저는 _____ 한국어를 배우고 있어요.",
      "answer": "✅ Answer\n\n아직\n\n(a-jik)\n\nStill"
    },
    "relatedGrammar": [
      "벌써 (beol-sseo) Already"
    ],
    "relatedVocabulary": [
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "자다",
        "rom": "ja-da",
        "en": "to sleep"
      },
      {
        "kr": "준비",
        "rom": "jun-bi",
        "en": "preparation"
      }
    ],
    "teacherNote": "Core function: Still / Yet.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G038",
    "grammar": "벌써",
    "romanization": "beol-sseo",
    "title": "Already",
    "keywords": [
      "벌써",
      "already",
      "beol-sseo"
    ],
    "sentencePatterns": [
      "벌써"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Did you finish your homework?\"\n\nYou answer,\n\n\"Already!\"\n\nKorean uses\n\n벌써\n\n(beol-sseo)\n\nto mean\n\nalready.\n\nIt means something happened earlier than expected.",
    "memoryTrick": "🟦\n\n벌써\n\n(beol-sseo)\n\n=\n\n✅\n\nAlready\n\nThink:\n\nIt's finished already!",
    "easyExplanation": "벌써\n\n(beol-sseo)\n\nmeans\n\nalready.\n\nIt is used when something has happened sooner than expected or has already been completed.\n\nNative Koreans use\n\n벌써\n\nvery often in daily conversation.",
    "basicRule": "벌써\n\n(beol-sseo)\n\nusually comes before the verb.\n\nExample\n\n벌써\n\n(beol-sseo)\n\nalready\n\n먹었어요.\n\n(meo-geo-sseo-yo)\n\nate\n\n↓\n\n벌써 먹었어요.\n\n(Beol-sseo meo-geo-sseo-yo.)\n\nI already ate.",
    "examples": [
      {
        "kr": "벌써 먹었어요.",
        "rom": "Beol-sseo meo-geo-sseo-yo.",
        "en": "I already ate."
      },
      {
        "kr": "벌써 집에 갔어요.",
        "rom": "Beol-sseo ji-be ga-sseo-yo.",
        "en": "He already went home."
      },
      {
        "kr": "벌써 끝났어요.",
        "rom": "Beol-sseo kkeut-na-sseo-yo.",
        "en": "It's already finished."
      },
      {
        "kr": "벌써 한국어를 잘해요.",
        "rom": "Beol-sseo Han-gu-geo-reul jal-hae-yo.",
        "en": "You already speak Korean well."
      }
    ],
    "nativeTip": "Native Koreans often say\n\n벌써?\n\n(Beol-sseo?)\n\nAlready?\n\nwhen they are surprised.\n\nExample:\n\n벌써 왔어요?\n\n(Beol-sseo wa-sseo-yo?)\n\nYou're already here?",
    "commonMistakes": [
      {
        "wrong": "❌ 안 벌써 먹었어요. (An beol-sseo meo-geo-sseo-yo.) Wrong",
        "correct": "✅ 벌써 먹었어요. (Beol-sseo meo-geo-sseo-yo.) I already ate. Correct"
      },
      {
        "wrong": "❌ 벌써 안 먹었어요. (Beol-sseo an meo-geo-sseo-yo.) Wrong if you mean not yet.",
        "correct": "✅ 아직 안 먹었어요. (A-jik an meo-geo-sseo-yo.) I haven't eaten yet. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "벌써 (beol-sseo)",
        "meaning": "Already\tSomething happened early",
        "mainJob": "Already\tSomething happened early"
      },
      {
        "grammar": "아직 (a-jik)",
        "meaning": "Still / Yet\tSomething has not happened yet",
        "mainJob": "Still / Yet\tSomething has not happened yet"
      }
    ],
    "miniQuiz": {
      "question": "_____ 끝났어요. (_____ kkeut-na-sseo-yo.) It's already finished.",
      "options": [
        "① 벌써 (beol-sseo) Already",
        "② 아직 (a-jik) Yet"
      ],
      "answer": "✅ Answer  ① 벌써",
      "reason": "Because the action is completed."
    },
    "speakingPractice": {
      "kr": "벌써 숙제를 끝냈어요.",
      "rom": "Beol-sseo suk-je-reul kkeut-nae-sseo-yo.",
      "en": "I already finished my homework.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 저는 _____ 점심을 먹었어요.",
      "answer": "✅ Answer\n\n벌써\n\n(beol-sseo)\n\nAlready"
    },
    "relatedGrammar": [
      "아직 (a-jik) Still / Yet"
    ],
    "relatedVocabulary": [
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "끝나다",
        "rom": "kkeut-na-da",
        "en": "to finish"
      },
      {
        "kr": "숙제",
        "rom": "suk-je",
        "en": "homework"
      },
      {
        "kr": "점심",
        "rom": "jeom-sim",
        "en": "lunch"
      }
    ],
    "teacherNote": "Core function: Already.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G039",
    "grammar": "먼저",
    "romanization": "meon-jeo",
    "title": "First",
    "keywords": [
      "먼저",
      "first",
      "meon-jeo"
    ],
    "sentencePatterns": [
      "먼저"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your teacher says,\n\n\"First, read this.\"\n\nOr your friend says,\n\n\"You go first.\"\n\nKorean uses\n\n먼저\n\n(meon-jeo)\n\nto mean\n\nfirst.\n\nIt tells the order of actions.",
    "memoryTrick": "🟦\n\n먼저\n\n(meon-jeo)\n\n=\n\n🥇\n\nFirst\n\nThink:\n\nStep 1.",
    "easyExplanation": "먼저\n\n(meon-jeo)\n\nmeans\n\nfirst.\n\nIt is used when talking about the order of actions.\n\nNative Koreans use\n\n먼저\n\nevery day.",
    "basicRule": "Put\n\n먼저\n\n(meon-jeo)\n\nbefore the verb.\n\nExample\n\n먼저\n\n(meon-jeo)\n\nfirst\n\n먹어요.\n\n(meo-geo-yo)\n\neat\n\n↓\n\n먼저 먹어요.\n\n(Meon-jeo meo-geo-yo.)\n\nEat first.",
    "examples": [
      {
        "kr": "먼저 먹어요.",
        "rom": "Meon-jeo meo-geo-yo.",
        "en": "Eat first."
      },
      {
        "kr": "먼저 갈게요.",
        "rom": "Meon-jeo gal-ge-yo.",
        "en": "I'll go first."
      },
      {
        "kr": "먼저 자기소개를 해 주세요.",
        "rom": "Meon-jeo ja-gi-so-gae-reul hae ju-se-yo.",
        "en": "Please introduce yourself first."
      },
      {
        "kr": "숙제를 먼저 하세요.",
        "rom": "Suk-je-reul meon-jeo ha-se-yo.",
        "en": "Do your homework first."
      }
    ],
    "nativeTip": "Native Koreans often say\n\n먼저 갈게요.\n\n(Meon-jeo gal-ge-yo.)\n\nI'll leave first.\n\nThis is a very common and polite way to leave before others.",
    "commonMistakes": [
      {
        "wrong": "❌ 먹어요 먼저. (Meo-geo-yo meon-jeo.) Not natural.",
        "correct": "✅ 먼저 먹어요. (Meon-jeo meo-geo-yo.) Eat first. Correct"
      },
      {
        "wrong": "❌ 먼저 학생이에요. (Meon-jeo hak-saeng-i-e-yo.) Wrong Because 먼저 describes actions, not nouns.",
        "correct": "✅ 먼저 공부해요. (Meon-jeo gong-bu-hae-yo.) Study first. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "먼저 (meon-jeo)",
        "meaning": "First\tFirst action",
        "mainJob": "First\tFirst action"
      },
      {
        "grammar": "나중에 (na-jung-e)",
        "meaning": "Later\tLater action",
        "mainJob": "Later\tLater action"
      }
    ],
    "miniQuiz": {
      "question": "_____ 숙제를 하세요. (_____ suk-je-reul ha-se-yo.) Do your homework first.",
      "options": [
        "① 먼저 (meon-jeo) First",
        "② 나중에 (na-jung-e) Later"
      ],
      "answer": "✅ Answer  ① 먼저",
      "reason": "Because homework should be done before something else."
    },
    "speakingPractice": {
      "kr": "먼저 한국어를 공부해요.",
      "rom": "Meon-jeo Han-gu-geo-reul gong-bu-hae-yo.",
      "en": "I study Korean first.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. _____ 손을 씻어요.",
      "answer": "✅ Answer\n\n먼저\n\n(meon-jeo)\n\nFirst"
    },
    "relatedGrammar": [
      "나중에 (na-jung-e) Later"
    ],
    "relatedVocabulary": [
      {
        "kr": "숙제",
        "rom": "suk-je",
        "en": "homework"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "손",
        "rom": "son",
        "en": "hand"
      },
      {
        "kr": "자기소개",
        "rom": "ja-gi-so-gae",
        "en": "self-introduction"
      }
    ],
    "teacherNote": "Core function: First.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G040",
    "grammar": "나중에",
    "romanization": "na-jung-e",
    "title": "Later",
    "keywords": [
      "나중에",
      "later",
      "na-jung-e"
    ],
    "sentencePatterns": [
      "나중에"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Let's eat now!\"\n\nYou answer,\n\n\"Later.\"\n\nKorean uses\n\n나중에\n\n(na-jung-e)\n\nto mean\n\nlater.\n\nIt tells someone that something will happen after now.",
    "memoryTrick": "🟦\n\n나중에\n\n(na-jung-e)\n\n=\n\n⏰\n\nLater\n\nThink:\n\nNot now. Later.",
    "easyExplanation": "나중에\n\n(na-jung-e)\n\nmeans\n\nlater.\n\nIt is used when an action will happen after the present time.\n\nNative Koreans use\n\n나중에\n\nevery day.",
    "basicRule": "Put\n\n나중에\n\n(na-jung-e)\n\nbefore the verb.\n\nExample\n\n나중에\n\n(na-jung-e)\n\nlater\n\n만나요.\n\n(man-na-yo)\n\nmeet\n\n↓\n\n나중에 만나요.\n\n(Na-jung-e man-na-yo.)",
    "examples": [],
    "nativeTip": "",
    "commonMistakes": [],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [],
      "answer": "",
      "reason": ""
    },
    "speakingPractice": {},
    "practiceChallenge": {
      "question": "",
      "answer": ""
    },
    "relatedGrammar": [],
    "relatedVocabulary": [],
    "teacherNote": "Core function: Later.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G041",
    "grammar": "같이",
    "romanization": "ga-chi",
    "title": "Together / With",
    "keywords": [
      "같이",
      "together / with",
      "ga-chi"
    ],
    "sentencePatterns": [
      "같이"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you ask your friend,\n\n\"Let's eat together.\"\n\nOr,\n\n\"Let's study together.\"\n\nKorean uses\n\n같이\n\n(ga-chi)\n\nto mean\n\ntogether.\n\nIt means doing something with another person.",
    "memoryTrick": "🟦\n\n같이\n\n(ga-chi)\n\n=\n\n🤝\n\nTogether\n\nThink:\n\nYou + Me = Together",
    "easyExplanation": "같이\n\n(ga-chi)\n\nmeans\n\ntogether.\n\nIt is used when two or more people do the same action together.\n\nNative Koreans use\n\n같이\n\nevery day.",
    "basicRule": "Put\n\n같이\n\n(ga-chi)\n\nbefore the verb.\n\nExample\n\n같이\n\n(ga-chi)\n\ntogether\n\n가요.\n\n(ga-yo)\n\ngo\n\n↓\n\n같이 가요.\n\n(Ga-chi ga-yo.)\n\nLet's go together.",
    "examples": [
      {
        "kr": "같이 가요.",
        "rom": "Ga-chi ga-yo.",
        "en": "Let's go together."
      },
      {
        "kr": "같이 공부해요.",
        "rom": "Ga-chi gong-bu-hae-yo.",
        "en": "Let's study together."
      },
      {
        "kr": "같이 밥 먹어요.",
        "rom": "Ga-chi bap meo-geo-yo.",
        "en": "Let's eat together."
      },
      {
        "kr": "같이 영화 봐요.",
        "rom": "Ga-chi yeong-hwa bwa-yo.",
        "en": "Let's watch a movie together."
      }
    ],
    "nativeTip": "One of the most common Korean invitations is\n\n같이 갈래요?\n\n(Ga-chi gal-lae-yo?)\n\nDo you want to go together?\n\nNative Koreans use\n\n같이\n\nvery often when inviting friends.",
    "commonMistakes": [
      {
        "wrong": "❌ 가요 같이. (Ga-yo ga-chi.) Not natural.",
        "correct": "✅ 같이 가요. (Ga-chi ga-yo.) Let's go together. Correct"
      },
      {
        "wrong": "❌ 같이 학생이에요. (Ga-chi hak-saeng-i-e-yo.) Wrong Because 같이 describes actions, not nouns.",
        "correct": "✅ 같이 운동해요. (Ga-chi un-dong-hae-yo.) Let's exercise together. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "같이 (ga-chi)",
        "meaning": "Together\tDoing an action together",
        "mainJob": "Together\tDoing an action together"
      },
      {
        "grammar": "혼자 (hon-ja)",
        "meaning": "Alone\tDoing an action alone",
        "mainJob": "Alone\tDoing an action alone"
      }
    ],
    "miniQuiz": {
      "question": "_____ 공부해요. (_____ gong-bu-hae-yo.) Let's study together.",
      "options": [
        "① 같이 (ga-chi) Together",
        "② 혼자 (hon-ja) Alone"
      ],
      "answer": "✅ Answer  ① 같이",
      "reason": "Because more than one person is studying."
    },
    "speakingPractice": {
      "kr": "같이 한국어를 공부해요.",
      "rom": "Ga-chi Han-gu-geo-reul gong-bu-hae-yo.",
      "en": "Let's study Korean together.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. _____ 점심 먹어요.",
      "answer": "✅ Answer\n\n같이\n\n(ga-chi)\n\nTogether"
    },
    "relatedGrammar": [
      "혼자 (hon-ja) Alone"
    ],
    "relatedVocabulary": [
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "영화",
        "rom": "yeong-hwa",
        "en": "movie"
      },
      {
        "kr": "운동하다",
        "rom": "un-dong-ha-da",
        "en": "to exercise"
      }
    ],
    "teacherNote": "Core function: Together / With.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G042",
    "grammar": "혼자",
    "romanization": "hon-ja",
    "title": "Alone / By Myself",
    "keywords": [
      "혼자",
      "alone / by myself",
      "hon-ja"
    ],
    "sentencePatterns": [
      "혼자"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Who are you going with?\"\n\nYou answer,\n\n\"I'm going alone.\"\n\nKorean uses\n\n혼자\n\n(hon-ja)\n\nto mean\n\nalone\n\nor\n\nby myself.",
    "memoryTrick": "🟦\n\n혼자\n\n(hon-ja)\n\n=\n\n🙋\n\nAlone\n\nThink:\n\nOnly me.",
    "easyExplanation": "혼자\n\n(hon-ja)\n\nmeans\n\nalone\n\nor\n\nby myself.\n\nIt is used when one person does an action without anyone else.\n\nNative Koreans use\n\n혼자\n\nevery day.",
    "basicRule": "Put\n\n혼자\n\n(hon-ja)\n\nbefore the verb.\n\nExample\n\n혼자\n\n(hon-ja)\n\nalone\n\n가요.\n\n(ga-yo)\n\ngo\n\n↓\n\n혼자 가요.\n\n(Hon-ja ga-yo.)\n\nI go alone.",
    "examples": [
      {
        "kr": "혼자 가요.",
        "rom": "Hon-ja ga-yo.",
        "en": "I go alone."
      },
      {
        "kr": "혼자 살아요.",
        "rom": "Hon-ja sa-ra-yo.",
        "en": "I live alone."
      },
      {
        "kr": "혼자 공부해요.",
        "rom": "Hon-ja gong-bu-hae-yo.",
        "en": "I study alone."
      },
      {
        "kr": "혼자 여행했어요.",
        "rom": "Hon-ja yeo-haeng-hae-sseo-yo.",
        "en": "I traveled alone."
      }
    ],
    "nativeTip": "Native Koreans often say\n\n혼자 괜찮아요.\n\n(Hon-ja gwaen-cha-na-yo.)\n\nI'm okay alone.\n\nYou'll also hear\n\n혼자 왔어요?\n\n(Hon-ja wa-sseo-yo?)\n\nDid you come alone?",
    "commonMistakes": [
      {
        "wrong": "❌ 가요 혼자. (Ga-yo hon-ja.) Not natural.",
        "correct": "✅ 혼자 가요. (Hon-ja ga-yo.) I go alone. Correct"
      },
      {
        "wrong": "❌ 혼자 학생이에요. (Hon-ja hak-saeng-i-e-yo.) Wrong Because 혼자 describes actions, not nouns.",
        "correct": "✅ 혼자 운동해요. (Hon-ja un-dong-hae-yo.) I exercise alone. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "혼자 (hon-ja)",
        "meaning": "Alone\tOne person does the action",
        "mainJob": "Alone\tOne person does the action"
      },
      {
        "grammar": "같이 (ga-chi)",
        "meaning": "Together\tTwo or more people do the action",
        "mainJob": "Together\tTwo or more people do the action"
      }
    ],
    "miniQuiz": {
      "question": "_____ 밥 먹어요. (_____ bap meo-geo-yo.) I eat alone.",
      "options": [
        "① 혼자 (hon-ja) Alone",
        "② 같이 (ga-chi) Together"
      ],
      "answer": "✅ Answer  ① 혼자",
      "reason": "Because only one person is eating."
    },
    "speakingPractice": {
      "kr": "혼자 한국어를 공부해요.",
      "rom": "Hon-ja Han-gu-geo-reul gong-bu-hae-yo.",
      "en": "I study Korean alone.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. _____ 영화를 봤어요.",
      "answer": "✅ Answer\n\n혼자\n\n(hon-ja)\n\nAlone"
    },
    "relatedGrammar": [
      "같이 (ga-chi) Together"
    ],
    "relatedVocabulary": [
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "영화",
        "rom": "yeong-hwa",
        "en": "movie"
      },
      {
        "kr": "여행하다",
        "rom": "yeo-haeng-ha-da",
        "en": "to travel"
      },
      {
        "kr": "살다",
        "rom": "sal-da",
        "en": "to live"
      }
    ],
    "teacherNote": "Core function: Alone / By Myself.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G043",
    "grammar": "그리고",
    "romanization": "geu-ri-go",
    "title": "And",
    "keywords": [
      "그리고",
      "and",
      "geu-ri-go"
    ],
    "sentencePatterns": [
      "그리고"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"I like coffee and tea.\"\n\nOr,\n\n\"I ate breakfast and then went to school.\"\n\nKorean uses\n\n그리고\n\n(geu-ri-go)\n\nto connect two ideas or sentences.\n\nIt means\n\nand.",
    "memoryTrick": "🟦\n\n그리고\n\n(geu-ri-go)\n\n=\n\n➕\n\nAnd\n\nThink:\n\nOne thing + Another thing",
    "easyExplanation": "그리고\n\n(geu-ri-go)\n\nmeans\n\nand.\n\nIt connects two sentences or two ideas.\n\nNative Koreans use\n\n그리고\n\nevery day.",
    "basicRule": "Sentence 1\n\n그리고\n\n(geu-ri-go)\n\nSentence 2\n\nExample\n\n저는 학생이에요.\n\n(Jeo-neun hak-saeng-i-e-yo.)\n\nI am a student.\n\n↓\n\n그리고\n\n(geu-ri-go)\n\nand\n\n↓\n\n한국 사람이에요.\n\n(Han-guk sa-ra-mi-e-yo.)\n\nI am Korean.",
    "examples": [
      {
        "kr": "저는 학생이에요.",
        "rom": "그리고 한국 사람이에요.",
        "en": "(Jeo-neun hak-saeng-i-e-yo. Geu-ri-go Han-guk sa-ra-mi-e-yo.)"
      },
      {
        "kr": "커피를 마셨어요.",
        "rom": "그리고 공부했어요.",
        "en": "(Keo-pi-reul ma-syeo-sseo-yo. Geu-ri-go gong-bu-hae-sseo-yo.)"
      },
      {
        "kr": "오늘은 비가 와요.",
        "rom": "그리고 바람도 불어요.",
        "en": "(O-neul-eun bi-ga wa-yo. Geu-ri-go ba-ram-do bu-reo-yo.)"
      },
      {
        "kr": "저는 운동을 좋아해요.",
        "rom": "그리고 음악도 좋아해요.",
        "en": "(Jeo-neun un-dong-eul jo-a-hae-yo. Geu-ri-go eum-ak-do jo-a-hae-yo.)"
      }
    ],
    "nativeTip": "Native Koreans use\n\n그리고\n\nmostly to connect complete sentences.\n\nIf you're only connecting nouns,\n\nKoreans often use\n\n하고\n\n(ha-go)\n\nor\n\n와 / 과\n\n(wa / gwa)\n\ninstead.",
    "commonMistakes": [
      {
        "wrong": "❌ 사과 그리고 바나나 (Sa-gwa geu-ri-go ba-na-na) Not natural in simple conversation.",
        "correct": "✅ 사과하고 바나나 (Sa-gwa-ha-go ba-na-na) Apple and banana More natural."
      },
      {
        "wrong": "❌ 저는 학생이에요 하고 선생님이에요. (Jeo-neun hak-saeng-i-e-yo ha-go seon-saeng-ni-mi-e-yo.) Wrong",
        "correct": "✅ 저는 학생이에요. 그리고 선생님이에요. (Jeo-neun hak-saeng-i-e-yo. Geu-ri-go seon-saeng-ni-mi-e-yo.) Correct"
      }
    ],
    "compare": [
      {
        "grammar": "그리고 (geu-ri-go)",
        "meaning": "And\tConnects sentences",
        "mainJob": "And\tConnects sentences"
      },
      {
        "grammar": "하고 (ha-go)",
        "meaning": "And\tConnects nouns",
        "mainJob": "And\tConnects nouns"
      }
    ],
    "miniQuiz": {
      "question": "저는 학생이에요. _____ 한국 사람이에요. (Jeo-neun hak-saeng-i-e-yo. _____ Han-guk sa-ra-mi-e-yo.) I am a student. And I am Korean.",
      "options": [
        "① 그리고 (geu-ri-go) And",
        "② 하지만 (ha-ji-man) But"
      ],
      "answer": "✅ Answer  ① 그리고",
      "reason": "Because both sentences add information."
    },
    "speakingPractice": {
      "kr": "저는 한국어를 공부해요.",
      "rom": "그리고 영어도 공부해요.",
      "en": "(Jeo-neun Han-gu-geo-reul gong-bu-hae-yo. Geu-ri-go Yeong-eo-do gong-bu-hae-yo.)",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 아침을 먹었어요.",
      "answer": "✅ Answer\n\n그리고\n\n(geu-ri-go)\n\nAnd"
    },
    "relatedGrammar": [
      "하고 (ha-go)",
      "And (for nouns)"
    ],
    "relatedVocabulary": [
      {
        "kr": "학생",
        "rom": "hak-saeng",
        "en": "student"
      },
      {
        "kr": "학교",
        "rom": "hak-gyo",
        "en": "school"
      },
      {
        "kr": "음악",
        "rom": "eum-ak",
        "en": "music"
      },
      {
        "kr": "운동",
        "rom": "un-dong",
        "en": "sports / exercise"
      }
    ],
    "teacherNote": "Core function: And.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G044",
    "grammar": "하지만",
    "romanization": "ha-ji-man",
    "title": "But / However",
    "keywords": [
      "하지만",
      "but / however",
      "ha-ji-man"
    ],
    "sentencePatterns": [
      "하지만"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"I want to go, but I'm busy.\"\n\nOr,\n\n\"It's cheap, but it's good.\"\n\nKorean uses\n\n하지만\n\n(ha-ji-man)\n\nto connect two opposite ideas.\n\nIt means\n\nbut.",
    "memoryTrick": "🟥\n\n하지만\n\n(ha-ji-man)\n\n=\n\n↔️\n\nBut\n\nThink:\n\nOne idea... BUT another idea.",
    "easyExplanation": "하지만\n\n(ha-ji-man)\n\nmeans\n\nbut\n\nor\n\nhowever.\n\nIt connects two sentences that have opposite or different meanings.\n\nNative Koreans use\n\n하지만\n\nevery day.",
    "basicRule": "Sentence 1\n\n하지만\n\n(ha-ji-man)\n\nSentence 2\n\nExample\n\n가고 싶어요.\n\n(Ga-go si-peo-yo.)\n\nI want to go.\n\n↓\n\n하지만\n\n(Ha-ji-man)\n\nBut\n\n↓\n\n바빠요.\n\n(Ba-ppa-yo.)\n\nI'm busy.",
    "examples": [
      {
        "kr": "가고 싶어요.",
        "rom": "하지만 바빠요.",
        "en": "(Ga-go si-peo-yo. Ha-ji-man ba-ppa-yo.)"
      },
      {
        "kr": "비싸요.",
        "rom": "하지만 좋아요.",
        "en": "(Bi-ssa-yo. Ha-ji-man jo-a-yo.)"
      },
      {
        "kr": "피곤해요.",
        "rom": "하지만 공부해요.",
        "en": "(Pi-go-nae-yo. Ha-ji-man gong-bu-hae-yo.)"
      },
      {
        "kr": "한국어는 어려워요.",
        "rom": "하지만 재미있어요.",
        "en": "(Han-gu-geo-neun eo-ryeo-wo-yo. Ha-ji-man jae-mi-it-sseo-yo.)"
      }
    ],
    "nativeTip": "Native Koreans often use\n\n근데\n\n(geun-de)\n\ninstead of\n\n하지만\n\nin casual conversations.\n\nExample:\n\n하지만 어려워요.\n\n(Ha-ji-man eo-ryeo-wo-yo.)\n\nFormal\n\n↓\n\n근데 어려워요.\n\n(Geun-de eo-ryeo-wo-yo.)\n\nCasual",
    "commonMistakes": [
      {
        "wrong": "❌ 사과 하지만 바나나 (Sa-gwa ha-ji-man ba-na-na) Wrong Because 하지만 connects sentences, not nouns.",
        "correct": "✅ 사과는 맛있어요. 하지만 바나나는 더 달아요. (Sa-gwa-neun ma-si-sseo-yo. Ha-ji-man ba-na-na-neun deo da-ra-yo.) Apples are delicious, but bananas are sweeter. Correct"
      },
      {
        "wrong": "❌ 하지만 저는 학생이에요. (Without a previous sentence.) Wrong",
        "correct": "✅ 저는 피곤해요. 하지만 학교에 가요. (Jeo-neun pi-go-nae-yo. Ha-ji-man hak-gyo-e ga-yo.) I'm tired, but I go to school. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "그리고 (geu-ri-go)",
        "meaning": "And\tAdds information",
        "mainJob": "And\tAdds information"
      },
      {
        "grammar": "하지만 (ha-ji-man)",
        "meaning": "But\tShows contrast",
        "mainJob": "But\tShows contrast"
      }
    ],
    "miniQuiz": {
      "question": "한국어는 어려워요. _____ 재미있어요. (Han-gu-geo-neun eo-ryeo-wo-yo. _____ jae-mi-it-sseo-yo.) Korean is difficult, but it's interesting.",
      "options": [
        "① 그리고 (geu-ri-go) And",
        "② 하지만 (ha-ji-man) But"
      ],
      "answer": "✅ Answer  ② 하지만",
      "reason": "Because the two ideas are opposite."
    },
    "speakingPractice": {
      "kr": "피곤해요.",
      "rom": "하지만 행복해요.",
      "en": "(Pi-go-nae-yo. Ha-ji-man haeng-bok-hae-yo.)",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 비가 와요.",
      "answer": "✅ Answer\n\n하지만\n\n(ha-ji-man)\n\nBut"
    },
    "relatedGrammar": [
      "그리고 (geu-ri-go) And"
    ],
    "relatedVocabulary": [
      {
        "kr": "바쁘다",
        "rom": "ba-ppeu-da",
        "en": "to be busy"
      },
      {
        "kr": "피곤하다",
        "rom": "pi-go-na-da",
        "en": "to be tired"
      },
      {
        "kr": "어렵다",
        "rom": "eo-ryeop-da",
        "en": "to be difficult"
      },
      {
        "kr": "재미있다",
        "rom": "jae-mi-it-da",
        "en": "to be interesting"
      }
    ],
    "teacherNote": "Core function: But / However.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G045",
    "grammar": "근데",
    "romanization": "geun-de",
    "title": "But / By the Way",
    "keywords": [
      "근데",
      "but / by the way",
      "geun-de"
    ],
    "sentencePatterns": [
      "근데"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you're talking with your friend.\n\nYou say,\n\n\"I wanted to go... but I'm busy.\"\n\nOr,\n\n\"By the way, where are you?\"\n\nKorean uses\n\n근데\n\n(geun-de)\n\nto mean\n\nbut\n\nor sometimes\n\nby the way.\n\nIt is one of the most common Korean conversation words.",
    "memoryTrick": "🟦\n\n근데\n\n(geun-de)\n\n=\n\n↔️\n\nBut\n\nor\n\n➡️\n\nBy the way\n\nThink:\n\nChange the conversation.",
    "easyExplanation": "근데\n\n(geun-de)\n\nis the casual version of\n\n하지만\n\n(ha-ji-man).\n\nIt usually means\n\nbut.\n\nSometimes it also means\n\nby the way\n\nwhen changing the topic.\n\nNative Koreans say\n\n근데\n\nmany times every day.",
    "basicRule": "Sentence 1\n\n근데\n\n(geun-de)\n\nSentence 2\n\nExample\n\n가고 싶어요.\n\n(Ga-go si-peo-yo.)\n\nI want to go.\n\n↓\n\n근데\n\n(Geun-de)\n\nBut\n\n↓\n\n바빠요.\n\n(Ba-ppa-yo.)\n\nI'm busy.",
    "examples": [
      {
        "kr": "가고 싶어요.",
        "rom": "근데 바빠요.",
        "en": "(Ga-go si-peo-yo. Geun-de ba-ppa-yo.)"
      },
      {
        "kr": "배고파요.",
        "rom": "근데 시간이 없어요.",
        "en": "(Bae-go-pa-yo. Geun-de si-ga-ni eop-sseo-yo.)"
      },
      {
        "kr": "오늘은 쉬어요.",
        "rom": "근데 내일은 일해요.",
        "en": "(O-neul-eun swi-eo-yo. Geun-de nae-i-reun il-hae-yo.)"
      },
      {
        "kr": "근데 어디예요?",
        "rom": "Geun-de eo-di-ye-yo?",
        "en": "By the way, where are you?"
      }
    ],
    "nativeTip": "Native Koreans use\n\n근데\n\nmuch more often than\n\n하지만\n\nin everyday conversations.\n\nFriends, coworkers, family, and even TV shows use\n\n근데\n\nall the time.",
    "commonMistakes": [
      {
        "wrong": "❌ 근데 사과 바나나. (Geun-de sa-gwa ba-na-na.) Wrong Because 근데 connects sentences, not nouns.",
        "correct": "✅ 사과는 맛있어요. 근데 바나나는 더 달아요. (Sa-gwa-neun ma-si-sseo-yo. Geun-de ba-na-na-neun deo da-ra-yo.) Apples are delicious, but bananas are sweeter. Correct"
      },
      {
        "wrong": "❌ 근데 그리고 갔어요. (Geun-de geu-ri-go ga-sseo-yo.) Wrong Don't use both together.",
        "correct": "✅ 근데 갔어요. (Geun-de ga-sseo-yo.) But I went. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "근데 (geun-de)",
        "meaning": "But / By the way\tCasual conversation",
        "mainJob": "But / By the way\tCasual conversation"
      },
      {
        "grammar": "하지만 (ha-ji-man)",
        "meaning": "But\tFormal writing & speech",
        "mainJob": "But\tFormal writing & speech"
      }
    ],
    "miniQuiz": {
      "question": "배고파요. _____ 시간이 없어요. (Bae-go-pa-yo. _____ si-ga-ni eop-sseo-yo.) I'm hungry, but I don't have time.",
      "options": [
        "① 근데 (geun-de) But",
        "② 그리고 (geu-ri-go) And"
      ],
      "answer": "✅ Answer  ① 근데",
      "reason": "Because the two ideas are opposite."
    },
    "speakingPractice": {
      "kr": "저는 가고 싶어요.",
      "rom": "근데 바빠요.",
      "en": "(Jeo-neun ga-go si-peo-yo. Geun-de ba-ppa-yo.)",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 오늘은 쉬어요.",
      "answer": "✅ Answer\n\n근데\n\n(geun-de)\n\nBut"
    },
    "relatedGrammar": [
      "하지만 (ha-ji-man)",
      "But (Formal)"
    ],
    "relatedVocabulary": [
      {
        "kr": "바쁘다",
        "rom": "ba-ppeu-da",
        "en": "to be busy"
      },
      {
        "kr": "배고프다",
        "rom": "bae-go-peu-da",
        "en": "to be hungry"
      },
      {
        "kr": "쉬다",
        "rom": "swi-da",
        "en": "to rest"
      },
      {
        "kr": "어디",
        "rom": "eo-di",
        "en": "where"
      }
    ],
    "teacherNote": "Core function: But / By the Way.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G046",
    "grammar": "그래서",
    "romanization": "geu-rae-seo",
    "title": "So / Therefore",
    "keywords": [
      "그래서",
      "so / therefore",
      "geu-rae-seo"
    ],
    "sentencePatterns": [
      "그래서"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"I'm tired, so I'm going to sleep.\"\n\nOr,\n\n\"It's raining, so I stayed home.\"\n\nKorean uses\n\n그래서\n\n(geu-rae-seo)\n\nto mean\n\nso\n\nor\n\ntherefore.\n\nIt shows the result of something.",
    "memoryTrick": "🟩\n\n그래서\n\n(geu-rae-seo)\n\n=\n\n➡️\n\nSo\n\nThink:\n\nReason → Result",
    "easyExplanation": "그래서\n\n(geu-rae-seo)\n\nmeans\n\nso\n\nor\n\ntherefore.\n\nIt connects a reason with its result.\n\nNative Koreans use\n\n그래서\n\nevery day.",
    "basicRule": "Sentence 1 (Reason)\n\n그래서\n\n(geu-rae-seo)\n\nSentence 2 (Result)\n\nExample\n\n피곤해요.\n\n(Pi-go-nae-yo.)\n\nI'm tired.\n\n↓\n\n그래서\n\n(Geu-rae-seo)\n\nSo\n\n↓\n\n잘 거예요.\n\n(Jal geo-ye-yo.)\n\nI'll sleep.",
    "examples": [
      {
        "kr": "피곤해요.",
        "rom": "그래서 잘 거예요.",
        "en": "(Pi-go-nae-yo. Geu-rae-seo jal geo-ye-yo.)"
      },
      {
        "kr": "비가 와요.",
        "rom": "그래서 집에 있어요.",
        "en": "(Bi-ga wa-yo. Geu-rae-seo ji-be i-sseo-yo.)"
      },
      {
        "kr": "배고파요.",
        "rom": "그래서 밥을 먹어요.",
        "en": "(Bae-go-pa-yo. Geu-rae-seo ba-beul meo-geo-yo.)"
      },
      {
        "kr": "열심히 공부했어요.",
        "rom": "그래서 시험을 잘 봤어요.",
        "en": "(Yeol-sim-hi gong-bu-hae-sseo-yo. Geu-rae-seo si-heom-eul jal bwat-sseo-yo.)"
      }
    ],
    "nativeTip": "Native Koreans use\n\n그래서\n\nconstantly when telling stories.\n\nExample:\n\n어제 늦게 잤어요.\n\n그래서 오늘 피곤해요.\n\n(Eo-je neut-ge ja-sseo-yo. Geu-rae-seo o-neul pi-go-nae-yo.)\n\nI slept late yesterday, so I'm tired today.",
    "commonMistakes": [
      {
        "wrong": "❌ 그래서 하지만 갔어요. (Geu-rae-seo ha-ji-man ga-sseo-yo.) Wrong Don't use 그래서 and 하지만 together.",
        "correct": "✅ 비가 와요. 그래서 집에 있어요. (Bi-ga wa-yo. Geu-rae-seo ji-be i-sseo-yo.) Correct"
      },
      {
        "wrong": "❌ 그래서 학생이에요. (Geu-rae-seo hak-saeng-i-e-yo.) Wrong Because 그래서 needs a reason before it.",
        "correct": "✅ 열심히 공부했어요. 그래서 학생이 되었어요. (Yeol-sim-hi gong-bu-hae-sseo-yo. Geu-rae-seo hak-saeng-i doe-eo-sseo-yo.) I studied hard, so I became a student. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "그래서 (geu-rae-seo)",
        "meaning": "So\tShows result",
        "mainJob": "So\tShows result"
      },
      {
        "grammar": "하지만 (ha-ji-man)",
        "meaning": "But\tShows contrast",
        "mainJob": "But\tShows contrast"
      }
    ],
    "miniQuiz": {
      "question": "배고파요. _____ 밥을 먹어요. (Bae-go-pa-yo. _____ ba-beul meo-geo-yo.) I'm hungry, so I eat.",
      "options": [
        "① 그래서 (geu-rae-seo) So",
        "② 하지만 (ha-ji-man) But"
      ],
      "answer": "✅ Answer  ① 그래서",
      "reason": "Because the second sentence is the result."
    },
    "speakingPractice": {
      "kr": "한국어가 재미있어요.",
      "rom": "그래서 매일 공부해요.",
      "en": "(Han-gu-geo-ga jae-mi-it-sseo-yo. Geu-rae-seo mae-il gong-bu-hae-yo.)",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 오늘은 추워요.",
      "answer": "✅ Answer\n\n그래서\n\n(geu-rae-seo)\n\nSo"
    },
    "relatedGrammar": [
      "하지만 (ha-ji-man) But"
    ],
    "relatedVocabulary": [
      {
        "kr": "피곤하다",
        "rom": "pi-go-na-da",
        "en": "to be tired"
      },
      {
        "kr": "배고프다",
        "rom": "bae-go-peu-da",
        "en": "to be hungry"
      },
      {
        "kr": "비",
        "rom": "bi",
        "en": "rain"
      },
      {
        "kr": "코트",
        "rom": "ko-teu",
        "en": "coat"
      }
    ],
    "teacherNote": "Core function: So / Therefore.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G047",
    "grammar": "왜냐하면",
    "romanization": "wae-nya-ha-myeon",
    "title": "Because",
    "keywords": [
      "왜냐하면",
      "because",
      "wae-nya-ha-myeon"
    ],
    "sentencePatterns": [
      "왜냐하면"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Why are you tired?\"\n\nYou answer,\n\n\"Because I worked a lot.\"\n\nKorean uses\n\n왜냐하면\n\n(wae-nya-ha-myeon)\n\nto mean\n\nbecause.\n\nIt introduces the reason.",
    "memoryTrick": "🟦\n\n왜냐하면\n\n(wae-nya-ha-myeon)\n\n=\n\n❓➡️\n\nBecause\n\nThink:\n\nWhy? → Because...",
    "easyExplanation": "왜냐하면\n\n(wae-nya-ha-myeon)\n\nmeans\n\nbecause.\n\nIt is used when explaining the reason for something.\n\nNative Koreans often use it when answering \"Why?\"",
    "basicRule": "Statement\n\n↓\n\n왜냐하면\n\n(wae-nya-ha-myeon)\n\nbecause\n\n↓\n\nReason\n\nExample\n\n집에 있어요.\n\n(Ji-be i-sseo-yo.)\n\nI'm staying home.\n\n↓\n\n왜냐하면\n\n(Wae-nya-ha-myeon)\n\nBecause\n\n↓\n\n비가 와요.\n\n(Bi-ga wa-yo.)\n\nIt's raining.",
    "examples": [
      {
        "kr": "집에 있어요.",
        "rom": "왜냐하면 비가 와요.",
        "en": "(Ji-be i-sseo-yo. Wae-nya-ha-myeon bi-ga wa-yo.)"
      },
      {
        "kr": "피곤해요.",
        "rom": "왜냐하면 늦게 잤어요.",
        "en": "(Pi-go-nae-yo. Wae-nya-ha-myeon neut-ge ja-sseo-yo.)"
      },
      {
        "kr": "한국어를 좋아해요.",
        "rom": "왜냐하면 재미있어요.",
        "en": "(Han-gu-geo-reul jo-a-hae-yo. Wae-nya-ha-myeon jae-mi-it-sseo-yo.)"
      },
      {
        "kr": "안 갔어요.",
        "rom": "왜냐하면 바빴어요.",
        "en": "(An ga-sseo-yo. Wae-nya-ha-myeon ba-ppa-sseo-yo.)"
      }
    ],
    "nativeTip": "In everyday conversation,\n\nNative Koreans often omit\n\n왜냐하면\n\nand simply say the reason.\n\nExample:\n\n안 갔어요.\n\n바빴어요.\n\n(An ga-sseo-yo. Ba-ppa-sseo-yo.)\n\nI didn't go. I was busy.\n\nThis sounds more natural in casual conversation.",
    "commonMistakes": [
      {
        "wrong": "❌ 왜냐하면 그리고 비가 와요. (Wae-nya-ha-myeon geu-ri-go bi-ga wa-yo.) Wrong Don't use 왜냐하면 and 그리고 together.",
        "correct": "✅ 왜냐하면 비가 와요. (Wae-nya-ha-myeon bi-ga wa-yo.) Because it's raining. Correct"
      },
      {
        "wrong": "❌ 왜냐하면. (Only this.) Wrong It must be followed by a reason.",
        "correct": "✅ 왜냐하면 피곤해요. (Wae-nya-ha-myeon pi-go-nae-yo.) Because I'm tired. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "왜냐하면 (wae-nya-ha-myeon)",
        "meaning": "Because\tIntroduces a reason",
        "mainJob": "Because\tIntroduces a reason"
      },
      {
        "grammar": "그래서 (geu-rae-seo)",
        "meaning": "So\tIntroduces a result",
        "mainJob": "So\tIntroduces a result"
      }
    ],
    "miniQuiz": {
      "question": "집에 있어요. _____ 비가 와요. (Ji-be i-sseo-yo. _____ bi-ga wa-yo.) I'm staying home because it's raining.",
      "options": [
        "① 왜냐하면 (wae-nya-ha-myeon) Because",
        "② 그래서 (geu-rae-seo) So"
      ],
      "answer": "✅ Answer  ① 왜냐하면",
      "reason": "Because "
    },
    "speakingPractice": {
      "kr": "한국어를 공부해요.",
      "rom": "왜냐하면 재미있어요.",
      "en": "(Han-gu-geo-reul gong-bu-hae-yo. Wae-nya-ha-myeon jae-mi-it-sseo-yo.)",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 안 갔어요.",
      "answer": "✅ Answer\n\n왜냐하면\n\n(wae-nya-ha-myeon)\n\nBecause"
    },
    "relatedGrammar": [
      "그래서 (geu-rae-seo) So"
    ],
    "relatedVocabulary": [
      {
        "kr": "비",
        "rom": "bi",
        "en": "rain"
      },
      {
        "kr": "바쁘다",
        "rom": "ba-ppeu-da",
        "en": "to be busy"
      },
      {
        "kr": "아프다",
        "rom": "a-peu-da",
        "en": "to be sick"
      },
      {
        "kr": "늦다",
        "rom": "neut-da",
        "en": "to be lat"
      }
    ],
    "teacherNote": "Core function: Because.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G048",
    "grammar": "-고 싶어요",
    "romanization": "-go si-peo-yo",
    "title": "Want to",
    "keywords": [
      "-고 싶어요",
      "want to",
      "-go si-peo-yo"
    ],
    "sentencePatterns": [
      "-고 싶어요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you're hungry.\n\nYou want to say,\n\n\"I want to eat.\"\n\nOr,\n\n\"I want to go.\"\n\nKorean uses\n\n-고 싶어요\n\n(-go si-peo-yo)\n\nto say\n\nwant to do something.",
    "memoryTrick": "🟦\n\n-고 싶어요\n\n(-go si-peo-yo)\n\n=\n\n❤️\n\nWant to\n\nThink:\n\nI want to...",
    "easyExplanation": "-고 싶어요\n\n(-go si-peo-yo)\n\nmeans\n\nwant to.\n\nAttach it to a verb to express something you want to do.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-고 싶어요\n\n(-go si-peo-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가고 싶어요.\n\n(Ga-go si-peo-yo.)\n\nI want to go.\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹고 싶어요.\n\n(Meok-go si-peo-yo.)\n\nI want to eat.",
    "examples": [
      {
        "kr": "한국에 가고 싶어요.",
        "rom": "Han-gu-ge ga-go si-peo-yo.",
        "en": "I want to go to Korea."
      },
      {
        "kr": "밥을 먹고 싶어요.",
        "rom": "Ba-beul meok-go si-peo-yo.",
        "en": "I want to eat."
      },
      {
        "kr": "자고 싶어요.",
        "rom": "Ja-go si-peo-yo.",
        "en": "I want to sleep."
      },
      {
        "kr": "한국어를 배우고 싶어요.",
        "rom": "Han-gu-geo-reul bae-u-go si-peo-yo.",
        "en": "I want to learn Korean."
      }
    ],
    "nativeTip": "One of the most common Korean sentences is\n\n먹고 싶어요.\n\n(Meok-go si-peo-yo.)\n\nI want to eat.\n\nNative Koreans use\n\n-고 싶어요\n\nhundreds of times every day.",
    "commonMistakes": [
      {
        "wrong": "❌ 가다 싶어요. (Ga-da si-peo-yo.) Wrong",
        "correct": "✅ 가고 싶어요. (Ga-go si-peo-yo.) I want to go. Correct"
      },
      {
        "wrong": "❌ 먹다 싶어요. (Meok-da si-peo-yo.) Wrong",
        "correct": "✅ 먹고 싶어요. (Meok-go si-peo-yo.) I want to eat. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-고 싶어요 (-go si-peo-yo)",
        "meaning": "Want to\tExpresses desire",
        "mainJob": "Want to\tExpresses desire"
      },
      {
        "grammar": "-고 있어요 (-go i-sseo-yo)",
        "meaning": "Be doing\tExpresses an action in progress",
        "mainJob": "Be doing\tExpresses an action in progress"
      }
    ],
    "miniQuiz": {
      "question": "한국에 _____. (Han-gu-ge _____. ) I want to go to Korea.",
      "options": [
        "① 가고 싶어요 (ga-go si-peo-yo) Want to go",
        "② 가고 있어요 (ga-go i-sseo-yo) Am going"
      ],
      "answer": "✅ Answer  ① 가고 싶어요",
      "reason": "Because you're expressing a desire."
    },
    "speakingPractice": {
      "kr": "저는 한국어를 배우고 싶어요.",
      "rom": "Jeo-neun Han-gu-geo-reul bae-u-go si-peo-yo.",
      "en": "I want to learn Korean.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 저는 커피를 _____.",
      "answer": "✅ Answer\n\n마시고 싶어요\n\n(ma-si-go si-peo-yo)\n\nWant to drink"
    },
    "relatedGrammar": [
      "-고 있어요 (-go i-sseo-yo) Be doing"
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "마시다",
        "rom": "ma-si-da",
        "en": "to drink"
      },
      {
        "kr": "배우다",
        "rom": "bae-u-da",
        "en": "to learn"
      }
    ],
    "teacherNote": "Core function: Want to.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G049",
    "grammar": "-고 있어요",
    "romanization": "-go i-sseo-yo",
    "title": "Be doing / Am doing",
    "keywords": [
      "-고 있어요",
      "be doing / am doing",
      "-go i-sseo-yo"
    ],
    "sentencePatterns": [
      "-고 있어요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend calls you.\n\nThey ask,\n\n\"What are you doing?\"\n\nYou answer,\n\n\"I'm studying.\"\n\nOr,\n\n\"I'm eating.\"\n\nKorean uses\n\n-고 있어요\n\n(-go i-sseo-yo)\n\nto talk about an action happening right now.",
    "memoryTrick": "🟦\n\n-고 있어요\n\n(-go i-sseo-yo)\n\n=\n\n▶️\n\nBe doing\n\nThink:\n\nRight now!",
    "easyExplanation": "-고 있어요\n\n(-go i-sseo-yo)\n\nmeans\n\nam doing\n\nis doing\n\nare doing\n\nIt describes an action that is happening now.\n\nNative Koreans use this grammar constantly in daily conversation.",
    "basicRule": "Verb Stem\n\n-고 있어요\n\n(-go i-sseo-yo)\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹고 있어요.\n\n(Meok-go i-sseo-yo.)\n\nI'm eating.\n\nExample\n\n공부하다\n\n(gong-bu-ha-da)\n\nto study\n\n↓\n\n공부하고 있어요.\n\n(Gong-bu-ha-go i-sseo-yo.)\n\nI'm studying.",
    "examples": [
      {
        "kr": "밥을 먹고 있어요.",
        "rom": "Ba-beul meok-go i-sseo-yo.",
        "en": "I'm eating."
      },
      {
        "kr": "한국어를 공부하고 있어요.",
        "rom": "Han-gu-geo-reul gong-bu-ha-go i-sseo-yo.",
        "en": "I'm studying Korean."
      },
      {
        "kr": "TV를 보고 있어요.",
        "rom": "Ti-bi-reul bo-go i-sseo-yo.",
        "en": "I'm watching TV."
      },
      {
        "kr": "일하고 있어요.",
        "rom": "Il-ha-go i-sseo-yo.",
        "en": "I'm working."
      }
    ],
    "nativeTip": "One of the most common Korean questions is\n\n뭐 하고 있어요?\n\n(Mwo ha-go i-sseo-yo?)\n\nWhat are you doing?\n\nNative Koreans ask this every day.",
    "commonMistakes": [
      {
        "wrong": "❌ 먹다 있어요. (Meok-da i-sseo-yo.) Wrong",
        "correct": "✅ 먹고 있어요. (Meok-go i-sseo-yo.) I'm eating. Correct"
      },
      {
        "wrong": "❌ 가고 싶어요. when you mean \"I'm going.\" Wrong",
        "correct": "✅ 가고 있어요. (Ga-go i-sseo-yo.) I'm going. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-고 있어요 (-go i-sseo-yo)",
        "meaning": "Be doing\tAction happening now",
        "mainJob": "Be doing\tAction happening now"
      },
      {
        "grammar": "-고 싶어요 (-go si-peo-yo)",
        "meaning": "Want to\tDesire to do something",
        "mainJob": "Want to\tDesire to do something"
      }
    ],
    "miniQuiz": {
      "question": "한국어를 _____. (Han-gu-geo-reul _____. ) I'm studying Korean.",
      "options": [
        "① 공부하고 있어요 (gong-bu-ha-go i-sseo-yo) Am studying",
        "② 공부하고 싶어요 (gong-bu-ha-go si-peo-yo) Want to study"
      ],
      "answer": "✅ Answer  ① 공부하고 있어요",
      "reason": "Because the action is happening now."
    },
    "speakingPractice": {
      "kr": "저는 한국어를 배우고 있어요.",
      "rom": "Jeo-neun Han-gu-geo-reul bae-u-go i-sseo-yo.",
      "en": "I'm learning Korean.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. 저는 커피를 _____.",
      "answer": "✅ Answer\n\n마시고 있어요\n\n(ma-si-go i-sseo-yo)\n\nAm drinking"
    },
    "relatedGrammar": [
      "-고 싶어요 (-go si-peo-yo) Want to"
    ],
    "relatedVocabulary": [
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "마시다",
        "rom": "ma-si-da",
        "en": "to drink"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "배우다",
        "rom": "bae-u-da",
        "en": "to learn"
      }
    ],
    "teacherNote": "Core function: Be doing / Am doing.\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G050",
    "grammar": "-아 / 어 주세요",
    "romanization": "-a / eo ju-se-yo",
    "title": "Please do...",
    "keywords": [
      "-아 / 어 주세요",
      "please do...",
      "-a / eo ju-se-yo"
    ],
    "sentencePatterns": [
      "-아 / 어 주세요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you're in Korea.\n\nYou want someone to help you.\n\nYou say,\n\n\"Please help me.\"\n\nOr,\n\n\"Please say it again.\"\n\nKorean uses\n\n-아 / 어 주세요\n\n(-a / eo ju-se-yo)\n\nto politely ask someone\n\nto do something.",
    "memoryTrick": "🟦\n\n-아 / 어 주세요\n\n(-a / eo ju-se-yo)\n\n=\n\n🙏\n\nPlease...\n\nThink:\n\nPlease do it.",
    "easyExplanation": "-아 / 어 주세요\n\n(-a / eo ju-se-yo)\n\nmeans\n\nplease do...\n\nIt is one of the most useful Korean grammar patterns.\n\nIt politely asks another person to do something.\n\nNative Koreans use it every day.",
    "basicRule": "Verb Stem\n\n-아 / 어 주세요\n\n(-a / eo ju-se-yo)\n\nExample\n\n도와주다\n\n(do-wa-ju-da)\n\nto help\n\n↓\n\n도와주세요.\n\n(Do-wa ju-se-yo.)\n\nPlease help me.\n\nExample\n\n기다리다\n\n(gi-da-ri-da)\n\nto wait\n\n↓\n\n기다려 주세요.\n\n(Gi-da-ryeo ju-se-yo.)\n\nPlease wait.",
    "examples": [
      {
        "kr": "도와주세요.",
        "rom": "Do-wa ju-se-yo.",
        "en": "Please help me."
      },
      {
        "kr": "천천히 말해 주세요.",
        "rom": "Cheon-cheon-hi mal-hae ju-se-yo.",
        "en": "Please speak slowly."
      },
      {
        "kr": "다시 말해 주세요.",
        "rom": "Da-si mal-hae ju-se-yo.",
        "en": "Please say it again."
      },
      {
        "kr": "기다려 주세요.",
        "rom": "Gi-da-ryeo ju-se-yo.",
        "en": "Please wait."
      }
    ],
    "nativeTip": "When talking to strangers,\n\nstore employees,\n\nor teachers,\n\nNative Koreans almost always use\n\n주세요\n\nbecause it sounds polite.",
    "commonMistakes": [
      {
        "wrong": "❌ 도와요. (Do-wa-yo.) This means \"I help.\" Not \"Please help me.\"",
        "correct": "✅ 도와주세요. (Do-wa ju-se-yo.) Please help me. Correct"
      },
      {
        "wrong": "❌ 기다리다 주세요. (Gi-da-ri-da ju-se-yo.) Wrong",
        "correct": "✅ 기다려 주세요. (Gi-da-ryeo ju-se-yo.) Please wait. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-아 / 어 주세요 (-a / eo ju-se-yo)",
        "meaning": "Please do...\tPolite request",
        "mainJob": "Please do...\tPolite request"
      },
      {
        "grammar": "-고 싶어요 (-go si-peo-yo)",
        "meaning": "Want to...\tExpresses your own desire",
        "mainJob": "Want to...\tExpresses your own desire"
      }
    ],
    "miniQuiz": {
      "question": "_____. (_____.) Please help me.",
      "options": [
        "① 도와주세요 (Do-wa ju-se-yo) Please help me",
        "② 도와요 (Do-wa-yo) I help"
      ],
      "answer": "✅ Answer  ① 도와주세요",
      "reason": "Because you're asking someone politely."
    },
    "speakingPractice": {
      "kr": "천천히 말해 주세요.",
      "rom": "Cheon-cheon-hi mal-hae ju-se-yo.",
      "en": "Please speak slowly.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "Complete the sentence. _____.",
      "answer": "✅ Answer\n\n기다려 주세요.\n\n(Gi-da-ryeo ju-se-yo.)\n\nPlease wait."
    },
    "relatedGrammar": [
      "-고 싶어요 (-go si-peo-yo) Want to"
    ],
    "relatedVocabulary": [
      {
        "kr": "도와주다",
        "rom": "do-wa-ju-da",
        "en": "to help"
      },
      {
        "kr": "기다리다",
        "rom": "gi-da-ri-da",
        "en": "to wait"
      },
      {
        "kr": "말하다",
        "rom": "mal-ha-da",
        "en": "to speak"
      },
      {
        "kr": "오다",
        "rom": "o-da",
        "en": "to come"
      }
    ],
    "teacherNote": "Core function: Please do....\nUse page examples first, then Grammar DB examples, then generate new examples if needed."
   },
   {
    "id": "G051",
    "grammar": "-지 마세요",
    "romanization": "-ji ma-se-yo",
    "title": "Please don't...",
    "keywords": [
      "-지 마세요",
      "please don't...",
      "-ji ma-se-yo"
      "ma-se-yo"
    ],
    "sentencePatterns": [
      "-지 마세요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your teacher says,\n\n\"Please don't use your phone.\"\n\nOr your mother says,\n\n\"Don't run!\"\n\nKorean uses\n\n-지 마세요\n\n(-ji ma-se-yo)\n\nto politely tell someone\n\nnot to do something.",
    "memoryTrick": "🟥\n\n-지 마세요\n\n(-ji ma-se-yo)\n\n=\n\n🚫🙏\n\nPlease don't...\n\nThink:\n\nPlease DON'T do it.",
    "easyExplanation": "-지 마세요\n\n(-ji ma-se-yo)\n\nmeans\n\nplease don't...\n\nIt is a polite way to tell someone not to do an action.\n\nNative Koreans use this grammar every day in schools, stores, hospitals, buses, and public places.",
    "basicRule": "Verb Stem\n\n-지 마세요\n\n(-ji ma-se-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가지 마세요.\n\n(Ga-ji ma-se-yo.)\n\nPlease don't go.\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹지 마세요.\n\n(Meok-ji ma-se-yo.)\n\nPlease don't eat.",
    "examples": [
      {
        "kr": "가지 마세요.",
        "rom": "Ga-ji ma-se-yo.",
        "en": "Please don't go."
      },
      {
        "kr": "사진을 찍지 마세요.",
        "rom": "Sa-jin-eul jjik-ji ma-se-yo.",
        "en": "Please don't take pictures."
      },
      {
        "kr": "걱정하지 마세요.",
        "rom": "Geok-jeong-ha-ji ma-se-yo.",
        "en": "Please don't worry."
      },
      {
        "kr": "여기에서 담배를 피우지 마세요.",
        "rom": "Yeo-gi-e-seo dam-bae-reul pi-u-ji ma-se-yo.",
        "en": "Please don't smoke here."
      }
    ],
    "nativeTip": "You'll often see\n\n-지 마세요\n\non public signs.\n\nExamples:\n\n출입하지 마세요.\n\n(Chul-ip-ha-ji ma-se-yo.)\n\nDo not enter.\n\n만지지 마세요.\n\n(Man-ji-ji ma-se-yo.)\n\nDo not touch.",
    "commonMistakes": [
      {
        "wrong": "❌ 안 가세요. (An ga-se-yo.) This means \"You are not going.\" It is NOT a request.",
        "correct": "✅ 가지 마세요. (Ga-ji ma-se-yo.) Please don't go. Correct"
      },
      {
        "wrong": "❌ 먹다 마세요. (Meok-da ma-se-yo.) Wrong",
        "correct": "✅ 먹지 마세요. (Meok-ji ma-se-yo.) Please don't eat. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-아 / 어 주세요 (-a / eo ju-se-yo)",
        "meaning": "Please do...\tPolite request",
        "mainJob": "Please do...\tPolite request"
      },
      {
        "grammar": "-지 마세요 (-ji ma-se-yo)",
        "meaning": "Please don't...\tPolite negative request",
        "mainJob": "Please don't...\tPolite negative request"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 걱정하지 마세요. (Geok-jeong-ha-ji ma-se-yo.) Please don't worry.",
        "② 걱정해 주세요. (Geok-jeong-hae ju-se-yo.) Please worry."
      ],
      "answer": "✅ Answer\n\n① 걱정하지 마세요.",
      "reason": ""
    },
    "speakingPractice": {
      "kr": "걱정하지 마세요.",
      "rom": "Geok-jeong-ha-ji ma-se-yo.",
      "en": "Please don't worry.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "여기에서 _____. (Yeo-gi-e-seo _____.) Please don't run here.",
      "answer": "✅ Answer\n\n뛰지 마세요."
    },
    "relatedGrammar": [
      "-아 / 어 주세요 (-a / eo ju-se-yo) Please do..."
    ],
    "relatedVocabulary": [
      {
        "kr": "걱정하다",
        "rom": "geok-jeong-ha-da",
        "en": "to worry"
      },
      {
        "kr": "뛰다",
        "rom": "ttwi-da",
        "en": "to run"
      },
      {
        "kr": "찍다",
        "rom": "jjik-da",
        "en": "to take (a picture)"
      },
      {
        "kr": "피우다",
        "rom": "pi-u-da",
        "en": "to smoke"
      }
    ],
    "teacherNote": "Core function: Please don't.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G052",
    "grammar": "-아 / 어도 돼요",
    "romanization": "-a / eo-do dwae-yo",
    "title": "Can I...? / It's OK to...",
    "keywords": [
      "-아 / 어도 돼요",
      "can i...? / it's ok to...",
      "-a / eo-do dwae-yo"
    ],
    "sentencePatterns": [
      "-아 / 어도 돼요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you're at a friend's house.\n\nYou ask,\n\n\"Can I sit here?\"\n\nOr,\n\n\"Can I take a picture?\"\n\nKorean uses\n\n-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\nto ask for permission.\n\nIt means\n\nCan I...?\n\nor\n\nIs it OK if I...?",
    "memoryTrick": "🟦\n\n-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\n=\n\n✅\n\nCan I...?\n\nThink:\n\nIs it OK?",
    "easyExplanation": "-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\nmeans\n\nCan I...?\n\nor\n\nIs it OK to...?\n\nUse it when asking someone for permission politely.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가도 돼요?\n\n(Ga-do dwae-yo?)\n\nCan I go?\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹어도 돼요?\n\n(Meo-geo-do dwae-yo?)\n\nCan I eat it?",
    "examples": [
      {
        "kr": "가도 돼요?",
        "rom": "Ga-do dwae-yo?",
        "en": "Can I go?"
      },
      {
        "kr": "사진을 찍어도 돼요?",
        "rom": "Sa-jin-eul jji-geo-do dwae-yo?",
        "en": "Can I take a picture?"
      },
      {
        "kr": "여기에 앉아도 돼요?",
        "rom": "Yeo-gi-e an-ja-do dwae-yo?",
        "en": "Can I sit here?"
      },
      {
        "kr": "창문을 열어도 돼요?",
        "rom": "Chang-mun-eul yeo-reo-do dwae-yo?",
        "en": "Can I open the window?"
      }
    ],
    "nativeTip": "If someone says\n\n돼요.\n\n(Dwae-yo.)\n\nit means\n\nYes, you can.\n\nIf they say\n\n안 돼요.\n\n(An dwae-yo.)\n\nit means\n\nNo, you can't.\n\nThese are two of the most useful Korean expressions.",
    "commonMistakes": [
      {
        "wrong": "❌ 가고 돼요? (Ga-go dwae-yo?) Wrong",
        "correct": "✅ 가도 돼요? (Ga-do dwae-yo?) Can I go? Correct"
      },
      {
        "wrong": "❌ 먹다도 돼요? (Meok-da-do dwae-yo?) Wrong",
        "correct": "✅ 먹어도 돼요? (Meo-geo-do dwae-yo?) Can I eat it? Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-아 / 어도 돼요 (-a / eo-do dwae-yo)",
        "meaning": "Can I...?\tAsking permission",
        "mainJob": "Can I...?\tAsking permission"
      },
      {
        "grammar": "-지 마세요 (-ji ma-se-yo)",
        "meaning": "Please don't...\tTelling someone not to do something",
        "mainJob": "Please don't...\tTelling someone not to do something"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 가도 돼요? (Ga-do dwae-yo?) Can I go?",
        "② 가지 마세요. (Ga-ji ma-se-yo.) Please don't go."
      ],
      "answer": "✅ Answer\n\n① 가도 돼요?",
      "reason": "Because you're asking for permission."
    },
    "speakingPractice": {
      "kr": "사진을 찍어도 돼요?",
      "rom": "Sa-jin-eul jji-geo-do dwae-yo?",
      "en": "Can I take a picture?",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "여기에 _____? (Yeo-gi-e _____?) Can I sit here?",
      "answer": "✅ Answer\n\n앉아도 돼요?"
    },
    "relatedGrammar": [
      "-지 마세요 (-ji ma-se-yo) Please don't..."
    ],
    "relatedVocabulary": [
      {
        "kr": "앉다",
        "rom": "an-da",
        "en": "to sit"
      },
      {
        "kr": "열다",
        "rom": "yeol-da",
        "en": "to open"
      },
      {
        "kr": "찍다",
        "rom": "jjik-da",
        "en": "to take (a picture)"
      },
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      }
    ],
    "teacherNote": "Core function: Can I...? / It's OK to.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G053",
    "grammar": "-아 / 어야 돼요",
    "romanization": "-a / eo-ya dwae-yo",
    "title": "Have to / Must",
    "keywords": [
      "-아 / 어야 돼요",
      "have to / must",
      "-a / eo-ya dwae-yo"
    ],
    "sentencePatterns": [
      "-아 / 어야 돼요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your teacher says,\n\n\"You have to study.\"\n\nOr your mother says,\n\n\"You have to sleep early.\"\n\nKorean uses\n\n-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\nto say\n\nhave to\n\nor\n\nmust.\n\nIt expresses necessity.",
    "memoryTrick": "🟥\n\n-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\n=\n\n‼️\n\nHave to\n\nThink:\n\nI must do it.",
    "easyExplanation": "-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\nmeans\n\nhave to\n\nor\n\nmust.\n\nUse it when something is necessary or required.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가야 돼요.\n\n(Ga-ya dwae-yo.)\n\nI have to go.\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹어야 돼요.\n\n(Meo-geo-ya dwae-yo.)\n\nI have to eat.",
    "examples": [
      {
        "kr": "집에 가야 돼요.",
        "rom": "Ji-be ga-ya dwae-yo.",
        "en": "I have to go home."
      },
      {
        "kr": "한국어를 공부해야 돼요.",
        "rom": "Han-gu-geo-reul gong-bu-hae-ya dwae-yo.",
        "en": "I have to study Korean."
      },
      {
        "kr": "일찍 일어나야 돼요.",
        "rom": "Il-jjik i-reo-na-ya dwae-yo.",
        "en": "I have to wake up early."
      },
      {
        "kr": "약을 먹어야 돼요.",
        "rom": "Ya-geul meo-geo-ya dwae-yo.",
        "en": "I have to take medicine."
      }
    ],
    "nativeTip": "Native Koreans often shorten\n\n돼요\n\nto\n\n해요\n\nin casual speech.\n\nExample:\n\n가야 해요.\n\n(Ga-ya hae-yo.)\n\nI have to go.\n\nThis is just as common as\n\n가야 돼요.",
    "commonMistakes": [
      {
        "wrong": "❌ 가고 돼요. (Ga-go dwae-yo.) Wrong",
        "correct": "✅ 가야 돼요. (Ga-ya dwae-yo.) I have to go. Correct"
      },
      {
        "wrong": "❌ 먹다야 돼요. (Meok-da-ya dwae-yo.) Wrong",
        "correct": "✅ 먹어야 돼요. (Meo-geo-ya dwae-yo.) I have to eat. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-아 / 어야 돼요 (-a / eo-ya dwae-yo)",
        "meaning": "Have to\tNecessity",
        "mainJob": "Have to\tNecessity"
      },
      {
        "grammar": "-고 싶어요 (-go si-peo-yo)",
        "meaning": "Want to\tDesire",
        "mainJob": "Want to\tDesire"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 가야 돼요 (ga-ya dwae-yo) Have to go",
        "② 가고 싶어요 (ga-go si-peo-yo) Want to go"
      ],
      "answer": "✅ Answer\n\n① 가야 돼요",
      "reason": "Because it expresses necessity."
    },
    "speakingPractice": {
      "kr": "저는 오늘 공부해야 돼요.",
      "rom": "Jeo-neun o-neul gong-bu-hae-ya dwae-yo.",
      "en": "I have to study today.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "저는 약을 _____. (Jeo-neun ya-geul _____. ) I have to take medicine.",
      "answer": "✅ Answer\n\n먹어야 돼요"
    },
    "relatedGrammar": [
      "-고 싶어요 (-go si-peo-yo) Want to"
    ],
    "relatedVocabulary": [
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "약",
        "rom": "yak",
        "en": "medicine"
      },
      {
        "kr": "일어나다",
        "rom": "i-reo-na-da",
        "en": "to wake up"
      }
    ],
    "teacherNote": "Core function: Have to / Must. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G054",
    "grammar": "-ㄹ / 을 거예요",
    "romanization": "-l / eul geo-ye-yo",
    "title": "Will / Going to",
    "keywords": [
      "-ㄹ / 을 거예요",
      "will / going to",
      "-l / eul geo-ye-yo"
    ],
    "sentencePatterns": [
      "-ㄹ / 을 거예요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"What will you do tomorrow?\"\n\nYou answer,\n\n\"I will study Korean.\"\n\nOr,\n\n\"I'm going to eat.\"\n\nKorean uses\n\n-ㄹ / 을 거예요\n\n(-l / eul geo-ye-yo)\n\nto talk about the future.\n\nIt means\n\nwill\n\nor\n\ngoing to.",
    "memoryTrick": "🟦\n\n-ㄹ / 을 거예요\n\n(-l / eul geo-ye-yo)\n\n=\n\n➡️\n\nWill\n\nThink:\n\nFuture = Later",
    "easyExplanation": "-ㄹ / 을 거예요\n\n(-l / eul geo-ye-yo)\n\nmeans\n\nwill\n\nor\n\ngoing to.\n\nUse it when talking about future plans or future actions.\n\nNative Koreans use this grammar every day.",
    "basicRule": "If the verb stem ends with a vowel\n\nAdd\n\n-ㄹ 거예요\n\n(-l geo-ye-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n갈 거예요.\n\n(Gal geo-ye-yo.)\n\nI will go.\n\nIf the verb stem ends with a consonant\n\nAdd\n\n-을 거예요\n\n(-eul geo-ye-yo)\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹을 거예요.\n\n(Meo-geul geo-ye-yo.)\n\nI will eat.",
    "examples": [
      {
        "kr": "내일 갈 거예요.",
        "rom": "Nae-il gal geo-ye-yo.",
        "en": "I will go tomorrow."
      },
      {
        "kr": "한국어를 공부할 거예요.",
        "rom": "Han-gu-geo-reul gong-bu-hal geo-ye-yo.",
        "en": "I will study Korean."
      },
      {
        "kr": "저녁을 먹을 거예요.",
        "rom": "Jeo-nyeo-geul meo-geul geo-ye-yo.",
        "en": "I will eat dinner."
      },
      {
        "kr": "친구를 만날 거예요.",
        "rom": "Chin-gu-reul man-nal geo-ye-yo.",
        "en": "I will meet my friend."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n-ㄹ / 을 거예요\n\nwhen talking about\n\nplans,\n\npromises,\n\nor predictions.\n\nExample:\n\n내일 비가 올 거예요.\n\n(Nae-il bi-ga ol geo-ye-yo.)\n\nIt will rain tomorrow.",
    "commonMistakes": [
      {
        "wrong": "❌ 가 거예요. (Ga geo-ye-yo.) Wrong",
        "correct": "✅ 갈 거예요. (Gal geo-ye-yo.) I will go. Correct"
      },
      {
        "wrong": "❌ 먹 거예요. (Meok geo-ye-yo.) Wrong",
        "correct": "✅ 먹을 거예요. (Meo-geul geo-ye-yo.) I will eat. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-ㄹ / 을 거예요 (-l / eul geo-ye-yo)",
        "meaning": "Will\tFuture",
        "mainJob": "Will\tFuture"
      },
      {
        "grammar": "-고 있어요 (-go i-sseo-yo)",
        "meaning": "Be doing\tPresent action",
        "mainJob": "Be doing\tPresent action"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 갈 거예요 (gal geo-ye-yo) Will go",
        "② 가고 있어요 (ga-go i-sseo-yo) Am going"
      ],
      "answer": "✅ Answer\n\n① 갈 거예요",
      "reason": "Because it's a future action."
    },
    "speakingPractice": {
      "kr": "저는 내일 공부할 거예요.",
      "rom": "Jeo-neun nae-il gong-bu-hal geo-ye-yo.",
      "en": "I will study tomorrow.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "저는 커피를 _____. (Jeo-neun keo-pi-reul _____. ) I will drink coffee.",
      "answer": "✅ Answer\n\n마실 거예요"
    },
    "relatedGrammar": [
      "-고 있어요 (-go i-sseo-yo) Be doing"
    ],
    "relatedVocabulary": [
      {
        "kr": "내일",
        "rom": "nae-il",
        "en": "tomorrow"
      },
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "만나다",
        "rom": "man-na-da",
        "en": "to meet"
      }
    ],
    "teacherNote": "Core function: Will / Going to. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G055",
    "grammar": "-았 / 었어요",
    "romanization": "-at / eot-seo-yo",
    "title": "Past Tense (Did / Was)",
    "keywords": [
      "-았 / 었어요",
      "past tense (did / was)",
      "-at / eot-seo-yo"
    ],
    "sentencePatterns": [
      "-았 / 었어요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"What did you do yesterday?\"\n\nYou answer,\n\n\"I studied.\"\n\nOr,\n\n\"I ate dinner.\"\n\nKorean uses\n\n-았 / 었어요\n\n(-at / eot-seo-yo)\n\nto talk about the past.\n\nIt means\n\ndid\n\nor\n\nwas.",
    "memoryTrick": "🟦\n\n-았 / 었어요\n\n(-at / eot-seo-yo)\n\n=\n\n⬅️\n\nPast\n\nThink:\n\nYesterday. Already finished.",
    "easyExplanation": "-았 / 었어요\n\n(-at / eot-seo-yo)\n\nis the Korean past tense.\n\nUse it when an action already happened.\n\nNative Koreans use this grammar every day.",
    "basicRule": "If the verb has ㅏ or ㅗ\n\nUse\n\n-았어요\n\n(-at-seo-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n갔어요.\n\n(Ga-sseo-yo.)\n\nWent\n\nMost other verbs\n\nUse\n\n-었어요\n\n(-eot-seo-yo)\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹었어요.\n\n(Meo-geo-sseo-yo.)\n\nAte",
    "examples": [
      {
        "kr": "어제 학교에 갔어요.",
        "rom": "Eo-je hak-gyo-e ga-sseo-yo.",
        "en": "I went to school yesterday."
      },
      {
        "kr": "저녁을 먹었어요.",
        "rom": "Jeo-nyeo-geul meo-geo-sseo-yo.",
        "en": "I ate dinner."
      },
      {
        "kr": "한국어를 공부했어요.",
        "rom": "Han-gu-geo-reul gong-bu-hae-sseo-yo.",
        "en": "I studied Korean."
      },
      {
        "kr": "영화를 봤어요.",
        "rom": "Yeong-hwa-reul bwa-sseo-yo.",
        "en": "I watched a movie."
      }
    ],
    "nativeTip": "Native Koreans use the past tense constantly when talking about\n\nyesterday,\n\nlast week,\n\nor something they already finished.\n\nExample:\n\n오늘 아침에 커피를 마셨어요.\n\n(O-neul a-chi-me keo-pi-reul ma-syeo-sseo-yo.)\n\nI drank coffee this morning.",
    "commonMistakes": [
      {
        "wrong": "❌ 가어요. (Ga-eo-yo.) Wrong",
        "correct": "✅ 갔어요. (Ga-sseo-yo.) Went Correct"
      },
      {
        "wrong": "❌ 먹어요. (Meo-geo-yo.) when talking about yesterday. Wrong",
        "correct": "✅ 먹었어요. (Meo-geo-sseo-yo.) Ate Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-았 / 었어요 (-at / eot-seo-yo)",
        "meaning": "Did / Was\tPast tense",
        "mainJob": "Did / Was\tPast tense"
      },
      {
        "grammar": "-ㄹ / 을 거예요 (-l / eul geo-ye-yo)",
        "meaning": "Will\tFuture tense",
        "mainJob": "Will\tFuture tense"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 갔어요 (ga-sseo-yo) Went",
        "② 갈 거예요 (gal geo-ye-yo) Will go"
      ],
      "answer": "✅ Answer\n\n① 갔어요",
      "reason": "Because the action already happened."
    },
    "speakingPractice": {
      "kr": "저는 어제 한국어를 공부했어요.",
      "rom": "Jeo-neun eo-je Han-gu-geo-reul gong-bu-hae-sseo-yo.",
      "en": "I studied Korean yesterday.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "저는 저녁을 _____. (Jeo-neun jeo-nyeo-geul _____. ) I ate dinner.",
      "answer": "✅ Answer\n\n먹었어요"
    },
    "relatedGrammar": [
      "-ㄹ / 을 거예요 (-l / eul geo-ye-yo) Will"
    ],
    "relatedVocabulary": [
      {
        "kr": "어제",
        "rom": "eo-je",
        "en": "yesterday"
      },
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      }
    ],
    "teacherNote": "Core function: Past Tense (Did / Was). Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G056",
    "grammar": "안",
    "romanization": "an",
    "title": "Not / Don't",
    "keywords": [
      "안",
      "not / don't",
      "an"
    ],
    "sentencePatterns": [
      "안"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Do you eat spicy food?\"\n\nYou answer,\n\n\"No, I don't eat it.\"\n\nOr,\n\n\"I don't know.\"\n\nKorean uses\n\n안\n\n(an)\n\nto make a sentence negative.\n\nIt means\n\nnot\n\nor\n\ndon't.",
    "memoryTrick": "🟥\n\n안\n\n(an)\n\n=\n\n❌\n\nNot\n\nThink:\n\nDo NOT.",
    "easyExplanation": "안\n\n(an)\n\nmeans\n\nnot\n\nor\n\ndon't.\n\nPut\n\n안\n\nbefore a verb or adjective\n\nto make the sentence negative.\n\nNative Koreans use\n\n안\n\nevery day.",
    "basicRule": "안\n\n(an)\n\nVerb / Adjective\n\nExample\n\n가요.\n\n(Ga-yo.)\n\nGo\n\n↓\n\n안 가요.\n\n(An ga-yo.)\n\nDon't go / I don't go.\n\nExample\n\n먹어요.\n\n(Meo-geo-yo.)\n\nEat\n\n↓\n\n안 먹어요.\n\n(An meo-geo-yo.)\n\nDon't eat.",
    "examples": [
      {
        "kr": "안 가요.",
        "rom": "An ga-yo.",
        "en": "I don't go."
      },
      {
        "kr": "안 먹어요.",
        "rom": "An meo-geo-yo.",
        "en": "I don't eat."
      },
      {
        "kr": "안 바빠요.",
        "rom": "An ba-ppa-yo.",
        "en": "I'm not busy."
      },
      {
        "kr": "한국어를 안 알아요.",
        "rom": "Han-gu-geo-reul an a-ra-yo.",
        "en": "I don't know Korean."
      }
    ],
    "nativeTip": "Native Koreans use\n\n안\n\nmuch more often than longer negative forms.\n\nExample:\n\n안 가요.\n\n(An ga-yo.)\n\nI don't go.\n\nThis is shorter and more natural in daily conversation.",
    "commonMistakes": [
      {
        "wrong": "❌ 가요 안. (Ga-yo an.) Wrong",
        "correct": "✅ 안 가요. (An ga-yo.) I don't go. Correct"
      },
      {
        "wrong": "❌ 먹어요 안. (Meo-geo-yo an.) Wrong",
        "correct": "✅ 안 먹어요. (An meo-geo-yo.) I don't eat. Correct"
      }
    ],
    "compare": [
      {
        "grammar": "안 (an)",
        "meaning": "Not / Don't\tSimple negative",
        "mainJob": "Not / Don't\tSimple negative"
      },
      {
        "grammar": "못 (mot)",
        "meaning": "Can't\tInability",
        "mainJob": "Can't\tInability"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 안 마셔요 (an ma-syeo-yo) Don't drink",
        "② 마셔요 (ma-syeo-yo) Drink"
      ],
      "answer": "✅ Answer\n\n① 안 마셔요",
      "reason": "Because the sentence is negative."
    },
    "speakingPractice": {
      "kr": "저는 매운 음식을 안 먹어요.",
      "rom": "Jeo-neun mae-un eum-si-geul an meo-geo-yo.",
      "en": "I don't eat spicy food.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "저는 오늘 학교에 _____. (Jeo-neun o-neul hak-gyo-e _____. ) I'm not going to school today.",
      "answer": "✅ Answer\n\n안 가요"
    },
    "relatedGrammar": [
      "못 (mot) Can't"
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "마시다",
        "rom": "ma-si-da",
        "en": "to drink"
      },
      {
        "kr": "알다",
        "rom": "al-da",
        "en": "to know"
      }
    ],
    "teacherNote": "Core function: Not / Don't. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G057",
    "grammar": "못",
    "romanization": "mot",
    "title": "Can't / Cannot",
    "keywords": [
      "못",
      "can't / cannot",
      "mot"
    ],
    "sentencePatterns": [
      "못"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"Can you come today?\"\n\nYou answer,\n\n\"Sorry, I can't.\"\n\nOr,\n\n\"I can't speak Korean yet.\"\n\nKorean uses\n\n못\n\n(mot)\n\nto say\n\ncan't\n\nor\n\ncannot.\n\nIt means you are unable to do something.",
    "memoryTrick": "🟥\n\n못\n\n(mot)\n\n=\n\n🚫\n\nCan't\n\nThink:\n\nWant to... but can't.",
    "easyExplanation": "못\n\n(mot)\n\nmeans\n\ncan't\n\nor\n\ncannot.\n\nPut\n\n못\n\nbefore a verb\n\nto show that you don't have the ability or opportunity to do something.\n\nNative Koreans use\n\n못\n\nevery day.",
    "basicRule": "못\n\n(mot)\n\nVerb\n\nExample\n\n가요.\n\n(Ga-yo.)\n\nGo\n\n↓\n\n못 가요.\n\n(Mot ga-yo.)\n\nCan't go.\n\nExample\n\n먹어요.\n\n(Meo-geo-yo.)\n\nEat\n\n↓\n\n못 먹어요.\n\n(Mot meo-geo-yo.)\n\nCan't eat.",
    "examples": [
      {
        "kr": "오늘 못 가요.",
        "rom": "O-neul mot ga-yo.",
        "en": "I can't go today."
      },
      {
        "kr": "매운 음식을 못 먹어요.",
        "rom": "Mae-un eum-si-geul mot meo-geo-yo.",
        "en": "I can't eat spicy food."
      },
      {
        "kr": "한국어를 아직 못 해요.",
        "rom": "Han-gu-geo-reul a-jik mot hae-yo.",
        "en": "I can't speak Korean yet."
      },
      {
        "kr": "잘 못 들어요.",
        "rom": "Jal mot deu-reo-yo.",
        "en": "I can't hear well."
      }
    ],
    "nativeTip": "Use\n\n못\n\nwhen you want to do something but can't.\n\nExamples:\n\n돈이 없어서 못 가요.\n\n(Do-ni eop-seo-seo mot ga-yo.)\n\nI can't go because I don't have money.\n\n시간이 없어서 못 만나요.\n\n(Si-ga-ni eop-seo-seo mot man-na-yo.)\n\nI can't meet because I don't have time.",
    "commonMistakes": [
      {
        "wrong": "❌ 안 가요. (An ga-yo.) when you mean \"I can't go.\" Wrong meaning.",
        "correct": "✅ 못 가요. (Mot ga-yo.) I can't go. Correct."
      },
      {
        "wrong": "❌ 못 바빠요. (Mot ba-ppa-yo.) Wrong. 못 is not used with adjectives.",
        "correct": "✅ 안 바빠요. (An ba-ppa-yo.) I'm not busy. Correct."
      }
    ],
    "compare": [
      {
        "grammar": "안 (an)",
        "meaning": "Don't / Not\tChoice or simple negative",
        "mainJob": "Don't / Not\tChoice or simple negative"
      },
      {
        "grammar": "못 (mot)",
        "meaning": "Can't\tNo ability or opportunity",
        "mainJob": "Can't\tNo ability or opportunity"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 못 가요 (mot ga-yo) Can't go",
        "② 안 가요 (an ga-yo) Don't go"
      ],
      "answer": "✅ Answer\n\n① 못 가요",
      "reason": "Because you are unable to go."
    },
    "speakingPractice": {
      "kr": "저는 한국어를 아직 못 해요.",
      "rom": "Jeo-neun Han-gu-geo-reul a-jik mot hae-yo.",
      "en": "I can't speak Korean yet.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "저는 매운 음식을 _____. (Jeo-neun mae-un eum-si-geul _____. ) I can't eat spicy food.",
      "answer": "✅ Answer\n\n못 먹어요"
    },
    "relatedGrammar": [
      "안 (an) Don't / Not"
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "하다",
        "rom": "ha-da",
        "en": "to do / speak"
      },
      {
        "kr": "듣다",
        "rom": "deut-da",
        "en": "to hear / listen"
      }
    ],
    "teacherNote": "Core function: Can't / Cannot. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G058",
    "grammar": "-네요",
    "romanization": "-ne-yo",
    "title": "Oh! / I see! / Wow!",
    "keywords": [
      "-네요",
      "oh! / i see! / wow!",
      "-ne-yo"
    ],
    "sentencePatterns": [
      "-네요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you see snow for the first time.\n\nYou say,\n\n\"Wow! It's beautiful!\"\n\nOr you taste delicious food.\n\nYou say,\n\n\"Oh! It's really good!\"\n\nKorean uses\n\n-네요\n\n(-ne-yo)\n\nto express a natural reaction or new realization.",
    "memoryTrick": "🟦\n\n-네요\n\n(-ne-yo)\n\n=\n\n😲\n\nOh!\n\nThink:\n\nI just noticed!",
    "easyExplanation": "-네요\n\n(-ne-yo)\n\nis used when you suddenly notice, realize, or feel surprised about something.\n\nIt often means\n\nOh!\n\nWow!\n\nI see!\n\nNative Koreans use this grammar naturally in conversations.",
    "basicRule": "Verb / Adjective Stem\n\n-네요\n\n(-ne-yo)\n\nExample\n\n예쁘다\n\n(ye-ppeu-da)\n\nto be pretty\n\n↓\n\n예쁘네요.\n\n(Ye-ppeu-ne-yo.)\n\nWow, it's pretty.\n\nExample\n\n맛있다\n\n(ma-sit-da)\n\nto be delicious\n\n↓\n\n맛있네요.\n\n(Ma-si-ne-yo.)\n\nWow, it's delicious.",
    "examples": [
      {
        "kr": "오늘 춥네요.",
        "rom": "O-neul chup-ne-yo.",
        "en": "Oh, it's cold today."
      },
      {
        "kr": "한국어를 잘하네요.",
        "rom": "Han-gu-geo-reul jal-ha-ne-yo.",
        "en": "Wow, you speak Korean well."
      },
      {
        "kr": "맛있네요.",
        "rom": "Ma-si-ne-yo.",
        "en": "Wow, it's delicious."
      },
      {
        "kr": "비가 오네요.",
        "rom": "Bi-ga o-ne-yo.",
        "en": "Oh, it's raining."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n-네요\n\ninstead of simply saying\n\n예뻐요\n\nor\n\n맛있어요\n\nwhen they are reacting naturally.\n\nExample:\n\n와!\n\n예쁘네요!\n\n(Wa! Ye-ppeu-ne-yo!)\n\nWow! It's beautiful!",
    "commonMistakes": [
      {
        "wrong": "❌ 예뻐네요. (Ye-ppeo-ne-yo.) Wrong",
        "correct": "✅ 예쁘네요. (Ye-ppeu-ne-yo.) Wow, it's pretty. Correct"
      },
      {
        "wrong": "❌ 맛있어요. when you want to express surprise. Not wrong, but it sounds like a simple statement.",
        "correct": "✅ 맛있네요! (Ma-si-ne-yo!) Wow, it's delicious! More natural."
      }
    ],
    "compare": [
      {
        "grammar": "-네요 (-ne-yo)",
        "meaning": "Oh! / Wow!\tSurprise or realization",
        "mainJob": "Oh! / Wow!\tSurprise or realization"
      },
      {
        "grammar": "-어요 (-eo-yo)",
        "meaning": "Is / Are\tSimple statement",
        "mainJob": "Is / Are\tSimple statement"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 예쁘네요 (ye-ppeu-ne-yo) Wow, it's pretty!",
        "② 예뻐요 (ye-ppeo-yo) It's pretty."
      ],
      "answer": "✅ Answer\n\n① 예쁘네요",
      "reason": "Because you're expressing surprise."
    },
    "speakingPractice": {
      "kr": "한국어를 정말 잘하네요.",
      "rom": "Han-gu-geo-reul jeong-mal jal-ha-ne-yo.",
      "en": "Wow, you speak Korean really well.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "와! 정말 _____! (Wa! Jeong-mal _____!)",
      "answer": "✅ Answer\n\n맛있네요"
    },
    "relatedGrammar": [
      "-어요 (-eo-yo) Simple polite statement"
    ],
    "relatedVocabulary": [
      {
        "kr": "예쁘다",
        "rom": "ye-ppeu-da",
        "en": "to be pretty"
      },
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      },
      {
        "kr": "춥다",
        "rom": "chup-da",
        "en": "to be cold"
      },
      {
        "kr": "잘하다",
        "rom": "jal-ha-da",
        "en": "to do well"
      }
    ],
    "teacherNote": "Core function: Oh! / I see! / Wow!. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G059",
    "grammar": "-지만",
    "romanization": "-ji-man",
    "title": "But / Although",
    "keywords": [
      "-지만",
      "but / although",
      "-ji-man"
    ],
    "sentencePatterns": [
      "-지만"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you say,\n\n\"It's expensive, but I want it.\"\n\nOr,\n\n\"I'm tired, but I have to study.\"\n\nKorean uses\n\n-지만\n\n(-ji-man)\n\nto connect two opposite ideas.\n\nIt means\n\nbut\n\nor\n\nalthough.",
    "memoryTrick": "🟥\n\n-지만\n\n(-ji-man)\n\n=\n\n↔️\n\nBut\n\nThink:\n\nTwo opposite ideas.",
    "easyExplanation": "-지만\n\n(-ji-man)\n\nmeans\n\nbut\n\nor\n\nalthough.\n\nIt connects two sentences that contrast each other.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb / Adjective Stem\n\n-지만\n\n(-ji-man)\n\nSecond Sentence\n\nExample\n\n비싸다\n\n(bi-ssa-da)\n\nto be expensive\n\n↓\n\n비싸지만\n\n(Bi-ssa-ji-man)\n\nAlthough it's expensive...\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가지만\n\n(Ga-ji-man)\n\nAlthough (I) go...",
    "examples": [
      {
        "kr": "비싸지만 사고 싶어요.",
        "rom": "Bi-ssa-ji-man sa-go si-peo-yo.",
        "en": "It's expensive, but I want to buy it."
      },
      {
        "kr": "피곤하지만 공부해야 돼요.",
        "rom": "Pi-go-na-ji-man gong-bu-hae-ya dwae-yo.",
        "en": "I'm tired, but I have to study."
      },
      {
        "kr": "춥지만 재미있어요.",
        "rom": "Chup-ji-man jae-mi-it-sseo-yo.",
        "en": "It's cold, but it's fun."
      },
      {
        "kr": "한국어는 어렵지만 재미있어요.",
        "rom": "Han-gu-geo-neun eo-ryeop-ji-man jae-mi-it-sseo-yo.",
        "en": "Korean is difficult, but it's interesting."
      }
    ],
    "nativeTip": "Native Koreans use\n\n-지만\n\nmore often in writing and formal speech.\n\nIn casual conversation,\n\nthey often use\n\n근데\n\n(geun-de)\n\ninstead.\n\nExample:\n\n피곤해요.\n\n근데 공부해야 돼요.\n\n(Pi-go-nae-yo. Geun-de gong-bu-hae-ya dwae-yo.)\n\nI'm tired, but I have to study.",
    "commonMistakes": [
      {
        "wrong": "❌ 비싸요 지만... (Bi-ssa-yo ji-man...) Wrong",
        "correct": "✅ 비싸지만... (Bi-ssa-ji-man...) Although it's expensive... Correct"
      },
      {
        "wrong": "❌ 하지만 하지만... Using both together. Wrong",
        "correct": "✅ 비싸지만 사고 싶어요. (Bi-ssa-ji-man sa-go si-peo-yo.) Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-지만 (-ji-man)",
        "meaning": "But / Although\tConnects opposite ideas",
        "mainJob": "But / Although\tConnects opposite ideas"
      },
      {
        "grammar": "그래서 (geu-rae-seo)",
        "meaning": "So\tConnects reason and result",
        "mainJob": "So\tConnects reason and result"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 지만 (ji-man) But",
        "② 그래서 (geu-rae-seo) So"
      ],
      "answer": "✅ Answer\n\n① 지만",
      "reason": "Because the two ideas contrast."
    },
    "speakingPractice": {
      "kr": "피곤하지만 행복해요.",
      "rom": "Pi-go-na-ji-man haeng-bok-hae-yo.",
      "en": "I'm tired, but I'm happy.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "비싸_____ 사고 싶어요. (Bi-ssa_____ sa-go si-peo-yo.) It's expensive, but I want to buy it.",
      "answer": "✅ Answer\n\n지만"
    },
    "relatedGrammar": [
      "근데 (geun-de)",
      "But (casual conversation)"
    ],
    "relatedVocabulary": [
      {
        "kr": "비싸다",
        "rom": "bi-ssa-da",
        "en": "to be expensive"
      },
      {
        "kr": "피곤하다",
        "rom": "pi-go-na-da",
        "en": "to be tired"
      },
      {
        "kr": "어렵다",
        "rom": "eo-ryeop-da",
        "en": "to be difficult"
      },
      {
        "kr": "재미있다",
        "rom": "jae-mi-it-da",
        "en": "to be interesting"
      }
    ],
    "teacherNote": "Core function: But / Although. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G060",
    "grammar": "-거나",
    "romanization": "-geo-na",
    "title": "Or",
    "keywords": [
      "-거나",
      "or",
      "-geo-na"
    ],
    "sentencePatterns": [
      "-거나"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend asks,\n\n\"What do you want to eat?\"\n\nYou say,\n\n\"Pizza or chicken.\"\n\nOr,\n\n\"Let's watch a movie or stay home.\"\n\nKorean uses\n\n-거나\n\n(-geo-na)\n\nto mean\n\nor.\n\nIt connects two or more choices.",
    "memoryTrick": "🟦\n\n-거나\n\n(-geo-na)\n\n=\n\n🔀\n\nOr\n\nThink:\n\nChoice A or Choice B",
    "easyExplanation": "-거나\n\n(-geo-na)\n\nmeans\n\nor.\n\nIt is used to connect two actions or choices.\n\nNative Koreans use\n\n-거나\n\nevery day when giving options.",
    "basicRule": "Verb Stem\n\n-거나\n\n(-geo-na)\n\nSecond Verb\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가거나\n\n(Ga-geo-na)\n\nGo or...\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹거나\n\n(Meok-geo-na)\n\nEat or...",
    "examples": [
      {
        "kr": "집에 가거나 친구를 만날 거예요.",
        "rom": "Ji-be ga-geo-na chin-gu-reul man-nal geo-ye-yo.",
        "en": "I'll go home or meet a friend."
      },
      {
        "kr": "커피를 마시거나 차를 마셔요.",
        "rom": "Keo-pi-reul ma-si-geo-na cha-reul ma-syeo-yo.",
        "en": "I drink coffee or tea."
      },
      {
        "kr": "공부하거나 운동해요.",
        "rom": "Gong-bu-ha-geo-na un-dong-hae-yo.",
        "en": "I study or exercise."
      },
      {
        "kr": "주말에는 쉬거나 영화를 봐요.",
        "rom": "Ju-ma-re-neun swi-geo-na yeong-hwa-reul bwa-yo.",
        "en": "On weekends, I rest or watch movies."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n-거나\n\nwhen they are not sure which choice will happen.\n\nExample:\n\n내일 가거나 모레 갈 거예요.\n\n(Nae-il ga-geo-na mo-re gal geo-ye-yo.)\n\nI'll go tomorrow or the day after tomorrow.",
    "commonMistakes": [
      {
        "wrong": "❌ 가고 먹어요. (Ga-go meo-geo-yo.) Wrong if you mean \"go or eat.\" -고 means and, not or.",
        "correct": "✅ 가거나 먹어요. (Ga-geo-na meo-geo-yo.) Go or eat. Correct"
      },
      {
        "wrong": "❌ 그리고 커피. (Geu-ri-go keo-pi.) Wrong if giving a choice.",
        "correct": "✅ 커피거나 차. (Keo-pi-geo-na cha.) Better as a choice. (For nouns, Koreans more naturally use 이나 / 나, which you'll learn later.)"
      }
    ],
    "compare": [
      {
        "grammar": "-거나 (-geo-na)",
        "meaning": "Or\tShows choices",
        "mainJob": "Or\tShows choices"
      },
      {
        "grammar": "-고 (-go)",
        "meaning": "And\tConnects actions",
        "mainJob": "And\tConnects actions"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 하거나 (ha-geo-na) Or",
        "② 하고 (ha-go) And"
      ],
      "answer": "✅ Answer\n\n① 하거나",
      "reason": "Because you're giving two choices."
    },
    "speakingPractice": {
      "kr": "주말에는 쉬거나 운동해요.",
      "rom": "Ju-ma-re-neun swi-geo-na un-dong-hae-yo.",
      "en": "On weekends, I rest or exercise.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "오늘은 집에 _____ 친구를 만날 거예요. (O-neu-reun ji-be _____ chin-gu-reul man-nal geo-ye-yo.) Today I'll stay home or meet a friend.",
      "answer": "✅ Answer\n\n가거나"
    },
    "relatedGrammar": [
      "-고 (-go) And"
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "운동하다",
        "rom": "un-dong-ha-da",
        "en": "to exercise"
      }
    ],
    "teacherNote": "Core function: Or. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G061",
    "grammar": "-부터",
    "romanization": "-bu-teo",
    "title": "From / Starting from",
    "keywords": [
      "-부터",
      "from / starting from",
      "-bu-teo"
    ],
    "sentencePatterns": [
      "-부터"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your class starts at 9:00.\n\nYou say,\n\n\"Class starts from 9 o'clock.\"\n\nOr,\n\n\"Let's start from here.\"\n\nKorean uses\n\n-부터\n\n(-bu-teo)\n\nto mean\n\nfrom\n\nor\n\nstarting from.\n\nIt tells the starting point of time, place, or order.",
    "memoryTrick": "🟦\n\n-부터\n\n(-bu-teo)\n\n=\n\n➡️\n\nFrom\n\nThink:\n\nStarting here.",
    "easyExplanation": "-부터\n\n(-bu-teo)\n\nmeans\n\nfrom\n\nor\n\nstarting from.\n\nIt marks the beginning of something.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Noun\n\n-부터\n\n(-bu-teo)\n\nExample\n\n오늘\n\n(o-neul)\n\ntoday\n\n↓\n\n오늘부터\n\n(O-neul-bu-teo)\n\nStarting today\n\nExample\n\n아홉 시\n\n(a-hop si)\n\n9 o'clock\n\n↓\n\n아홉 시부터\n\n(A-hop si-bu-teo)\n\nFrom 9 o'clock",
    "examples": [
      {
        "kr": "오늘부터 운동할 거예요.",
        "rom": "O-neul-bu-teo un-dong-hal geo-ye-yo.",
        "en": "I'm going to exercise starting today."
      },
      {
        "kr": "수업은 아홉 시부터 시작해요.",
        "rom": "Su-eo-beun a-hop si-bu-teo si-jak-hae-yo.",
        "en": "Class starts at 9 o'clock."
      },
      {
        "kr": "월요일부터 일해요.",
        "rom": "Wol-yo-il-bu-teo il-hae-yo.",
        "en": "I work starting Monday."
      },
      {
        "kr": "1페이지부터 읽어 주세요.",
        "rom": "Il-pe-i-ji-bu-teo il-geo ju-se-yo.",
        "en": "Please read from page 1."
      }
    ],
    "nativeTip": "-부터 often appears together with\n\n-까지\n\n(-kka-ji)\n\nmeaning\n\nuntil.\n\nExample:\n\n아홉 시부터 다섯 시까지 일해요.\n\n(A-hop si-bu-teo da-seot si-kka-ji il-hae-yo.)\n\nI work from 9 o'clock until 5 o'clock.",
    "commonMistakes": [
      {
        "wrong": "❌ 오늘 시작해요. (O-neul si-jak-hae-yo.) This means \"It starts today.\" It does not emphasize \"starting from today.\"",
        "correct": "✅ 오늘부터 시작해요. (O-neul-bu-teo si-jak-hae-yo.) It starts from today. Correct."
      },
      {
        "wrong": "❌ 9시에서 (Gu-si-e-seo) Wrong for time.",
        "correct": "✅ 9시부터 (Gu-si-bu-teo) From 9 o'clock Correct."
      }
    ],
    "compare": [
      {
        "grammar": "-부터 (-bu-teo)",
        "meaning": "From\tStarting point",
        "mainJob": "From\tStarting point"
      },
      {
        "grammar": "-까지 (-kka-ji)",
        "meaning": "Until\tEnding point",
        "mainJob": "Until\tEnding point"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 오늘부터 (o-neul-bu-teo) Starting today",
        "② 오늘까지 (o-neul-kka-ji) Until today"
      ],
      "answer": "✅ Answer\n\n① 오늘부터",
      "reason": "Because it indicates the beginning."
    },
    "speakingPractice": {
      "kr": "오늘부터 한국어를 공부할 거예요.",
      "rom": "O-neul-bu-teo Han-gu-geo-reul gong-bu-hal geo-ye-yo.",
      "en": "I'm going to study Korean starting today.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "수업은 10시_____ 시작해요. (Su-eo-beun yeol-si_____ si-jak-hae-yo.) Class starts from 10 o'clock.",
      "answer": "✅ Answer\n\n부터"
    },
    "relatedGrammar": [
      "-까지 (-kka-ji) Until"
    ],
    "relatedVocabulary": [
      {
        "kr": "오늘",
        "rom": "o-neul",
        "en": "today"
      },
      {
        "kr": "월요일",
        "rom": "wol-yo-il",
        "en": "Monday"
      },
      {
        "kr": "시작하다",
        "rom": "si-jak-ha-da",
        "en": "to start"
      },
      {
        "kr": "페이지",
        "rom": "pe-i-ji",
        "en": "page"
      }
    ],
    "teacherNote": "Core function: From / Starting from. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G062",
    "grammar": "-까지",
    "romanization": "-kka-ji",
    "title": "Until / Up to",
    "keywords": [
      "-까지",
      "until / up to",
      "-kka-ji"
    ],
    "sentencePatterns": [
      "-까지"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your class ends at 5:00.\n\nYou say,\n\n\"Class is until 5 o'clock.\"\n\nOr,\n\n\"Walk up to the station.\"\n\nKorean uses\n\n-까지\n\n(-kka-ji)\n\nto mean\n\nuntil\n\nor\n\nup to.\n\nIt marks the ending point of time, place, or amount.",
    "memoryTrick": "🟦\n\n-까지\n\n(-kka-ji)\n\n=\n\n🏁\n\nUntil\n\nThink:\n\nFinish here.",
    "easyExplanation": "-까지\n\n(-kka-ji)\n\nmeans\n\nuntil\n\nor\n\nup to.\n\nIt shows where or when something ends.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Noun\n\n-까지\n\n(-kka-ji)\n\nExample\n\n내일\n\n(nae-il)\n\ntomorrow\n\n↓\n\n내일까지\n\n(Nae-il-kka-ji)\n\nUntil tomorrow\n\nExample\n\n다섯 시\n\n(da-seot si)\n\n5 o'clock\n\n↓\n\n다섯 시까지\n\n(Da-seot si-kka-ji)\n\nUntil 5 o'clock",
    "examples": [
      {
        "kr": "다섯 시까지 일해요.",
        "rom": "Da-seot si-kka-ji il-hae-yo.",
        "en": "I work until 5 o'clock."
      },
      {
        "kr": "내일까지 숙제를 해야 돼요.",
        "rom": "Nae-il-kka-ji suk-je-reul hae-ya dwae-yo.",
        "en": "I have to finish my homework by tomorrow."
      },
      {
        "kr": "여기까지 걸어가요.",
        "rom": "Yeo-gi-kka-ji geo-reo-ga-yo.",
        "en": "Walk up to here."
      },
      {
        "kr": "10페이지까지 읽었어요.",
        "rom": "Sip-pe-i-ji-kka-ji il-geo-sseo-yo.",
        "en": "I read up to page 10."
      }
    ],
    "nativeTip": "-까지 is often paired with\n\n-부터\n\n(-bu-teo)\n\nExample:\n\n월요일부터 금요일까지 일해요.\n\n(Wol-yo-il-bu-teo geum-yo-il-kka-ji il-hae-yo.)\n\nI work from Monday to Friday.\n\nThis is one of the most common combinations in Korean.",
    "commonMistakes": [
      {
        "wrong": "❌ 5시 끝나요. (O-si kkeut-na-yo.) This simply means \"It ends at 5.\"",
        "correct": "✅ 5시까지 (O-si-kka-ji) Until 5 o'clock Correct."
      },
      {
        "wrong": "❌ 내일에서 (Nae-il-e-seo) Wrong",
        "correct": "✅ 내일까지 (Nae-il-kka-ji) Until tomorrow Correct."
      }
    ],
    "compare": [
      {
        "grammar": "-부터 (-bu-teo)",
        "meaning": "From\tStarting point",
        "mainJob": "From\tStarting point"
      },
      {
        "grammar": "-까지 (-kka-ji)",
        "meaning": "Until\tEnding point",
        "mainJob": "Until\tEnding point"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 내일까지 (nae-il-kka-ji) Until tomorrow",
        "② 내일부터 (nae-il-bu-teo) Starting tomorrow"
      ],
      "answer": "✅ Answer\n\n① 내일까지",
      "reason": "Because it indicates the deadline."
    },
    "speakingPractice": {
      "kr": "저는 금요일까지 일해요.",
      "rom": "Jeo-neun geum-yo-il-kka-ji il-hae-yo.",
      "en": "I work until Friday.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "수업은 4시_____ 끝나요. (Su-eo-beun ne-si_____ kkeut-na-yo.) Class ends at 4 o'clock.",
      "answer": "✅ Answer\n\n까지"
    },
    "relatedGrammar": [
      "-부터 (-bu-teo) From"
    ],
    "relatedVocabulary": [
      {
        "kr": "내일",
        "rom": "nae-il",
        "en": "tomorrow"
      },
      {
        "kr": "금요일",
        "rom": "geum-yo-il",
        "en": "Friday"
      },
      {
        "kr": "끝나다",
        "rom": "kkeut-na-da",
        "en": "to end"
      },
      {
        "kr": "페이지",
        "rom": "pe-i-ji",
        "en": "page"
      }
    ],
    "teacherNote": "Core function: Until / Up to. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G063",
    "grammar": "-면서",
    "romanization": "-myeon-seo",
    "title": "While / At the same time",
    "keywords": [
      "-면서",
      "while / at the same time",
      "-myeon-seo"
    ],
    "sentencePatterns": [
      "-면서"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you're listening to music\n\nwhile studying.\n\nOr drinking coffee\n\nwhile reading a book.\n\nKorean uses\n\n-면서\n\n(-myeon-seo)\n\nto talk about two actions happening at the same time.\n\nIt means\n\nwhile\n\nor\n\nat the same time.",
    "memoryTrick": "🟦\n\n-면서\n\n(-myeon-seo)\n\n=\n\n⏳\n\nWhile\n\nThink:\n\nTwo actions together.",
    "easyExplanation": "-면서\n\n(-myeon-seo)\n\nmeans\n\nwhile\n\nor\n\nat the same time.\n\nUse it when one person is doing two actions simultaneously.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-면서\n\n(-myeon-seo)\n\nSecond Action\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹으면서\n\n(Meo-geu-myeon-seo)\n\nWhile eating...\n\nExample\n\n공부하다\n\n(gong-bu-ha-da)\n\nto study\n\n↓\n\n공부하면서\n\n(Gong-bu-ha-myeon-seo)\n\nWhile studying...",
    "examples": [
      {
        "kr": "음악을 들으면서 공부해요.",
        "rom": "Eum-a-geul deu-reu-myeon-seo gong-bu-hae-yo.",
        "en": "I study while listening to music."
      },
      {
        "kr": "커피를 마시면서 책을 읽어요.",
        "rom": "Keo-pi-reul ma-si-myeon-seo chae-geul il-geo-yo.",
        "en": "I read a book while drinking coffee."
      },
      {
        "kr": "걸으면서 이야기해요.",
        "rom": "Geo-reu-myeon-seo i-ya-gi-hae-yo.",
        "en": "We talk while walking."
      },
      {
        "kr": "TV를 보면서 밥을 먹어요.",
        "rom": "Ti-bi-reul bo-myeon-seo ba-beul meo-geo-yo.",
        "en": "I eat while watching TV."
      }
    ],
    "nativeTip": "-면서 is only used when the same person does both actions.\n\n✅ I eat while watching TV.\n\n✅ She studies while listening to music.\n\nIf two different people do different actions, Koreans use other grammar.",
    "commonMistakes": [
      {
        "wrong": "❌ 먹고 TV를 봐요. (Meok-go TV-reul bwa-yo.) This means Eat, and then watch TV. Not Eat while watching TV.",
        "correct": "✅ TV를 보면서 밥을 먹어요. (TV-reul bo-myeon-seo ba-beul meo-geo-yo.) I eat while watching TV. Correct."
      },
      {
        "wrong": "❌ 공부면서 (Gong-bu-myeon-seo) Wrong",
        "correct": "✅ 공부하면서 (Gong-bu-ha-myeon-seo) While studying Correct."
      }
    ],
    "compare": [
      {
        "grammar": "-면서 (-myeon-seo)",
        "meaning": "While\tTwo actions at the same time",
        "mainJob": "While\tTwo actions at the same time"
      },
      {
        "grammar": "-고 (-go)",
        "meaning": "And\tOne action, then another",
        "mainJob": "And\tOne action, then another"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 들으면서 (deu-reu-myeon-seo) While listening",
        "② 듣고 (deut-go) And then listen"
      ],
      "answer": "✅ Answer\n\n① 들으면서",
      "reason": "Because both actions happen at the same time."
    },
    "speakingPractice": {
      "kr": "커피를 마시면서 공부해요.",
      "rom": "Keo-pi-reul ma-si-myeon-seo gong-bu-hae-yo.",
      "en": "I study while drinking coffee.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "TV를 _____ 밥을 먹어요. (TV-reul _____ ba-beul meo-geo-yo.) I eat while watching TV.",
      "answer": "✅ Answer\n\n보면서"
    },
    "relatedGrammar": [
      "-고 (-go) And"
    ],
    "relatedVocabulary": [
      {
        "kr": "듣다",
        "rom": "deut-da",
        "en": "to listen"
      },
      {
        "kr": "보다",
        "rom": "bo-da",
        "en": "to watch"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "Grammar",
        "rom": "-기 전에",
        "en": "(-gi jeo-ne)"
      },
      {
        "kr": "Before",
        "rom": "★★★★★ Used Every Day",
        "en": "Imagine"
      },
      {
        "kr": "Imagine your mother says,",
        "rom": "\"Wash your hands before eating.\"",
        "en": "Or your teacher says,"
      },
      {
        "kr": "\"Study before the test.\"",
        "rom": "Korean uses",
        "en": "-기 전에"
      },
      {
        "kr": "(-gi jeo-ne)",
        "rom": "to talk about something that happens before another action.",
        "en": "It means"
      },
      {
        "kr": "before.",
        "rom": "Easy Memory Trick",
        "en": "🟦"
      },
      {
        "kr": "-기 전에",
        "rom": "-gi jeo-ne",
        "en": "="
      },
      {
        "kr": "⬅️",
        "rom": "Before",
        "en": "Think:"
      },
      {
        "kr": "Do this first.",
        "rom": "Easy Explanation",
        "en": "-기 전에"
      },
      {
        "kr": "(-gi jeo-ne)",
        "rom": "means",
        "en": "before."
      },
      {
        "kr": "Use it when one action happens first, and another action happens later.",
        "rom": "Native Koreans use this grammar every day.",
        "en": "When do Koreans use it?"
      },
      {
        "kr": "✅ Before eating",
        "rom": "✅ Before sleeping",
        "en": "✅ Before leaving"
      },
      {
        "kr": "✅ Before studying",
        "rom": "✅ Before meeting someone",
        "en": "Basic Rule"
      },
      {
        "kr": "Verb Stem",
        "rom": "-기 전에",
        "en": "(-gi jeo-ne)"
      },
      {
        "kr": "Example",
        "rom": "먹다",
        "en": "(meok-da)"
      },
      {
        "kr": "to eat",
        "rom": "↓",
        "en": "먹기 전에"
      },
      {
        "kr": "(Meok-gi jeo-ne)",
        "rom": "Before eating",
        "en": "Example"
      },
      {
        "kr": "자다",
        "rom": "ja-da",
        "en": "to sleep"
      },
      {
        "kr": "↓",
        "rom": "자기 전에",
        "en": "(Ja-gi jeo-ne)"
      },
      {
        "kr": "Before sleeping",
        "rom": "Examples",
        "en": "Example 1"
      },
      {
        "kr": "먹기 전에 손을 씻어요.",
        "rom": "Meok-gi jeo-ne so-neul ssi-seo-yo.",
        "en": "I wash my hands before eating."
      },
      {
        "kr": "Example 2",
        "rom": "자기 전에 이를 닦아요.",
        "en": "(Ja-gi jeo-ne i-reul dak-ka-yo.)"
      },
      {
        "kr": "I brush my teeth before sleeping.",
        "rom": "Example 3",
        "en": "학교에 가기 전에 아침을 먹어요."
      },
      {
        "kr": "(Hak-gyo-e ga-gi jeo-ne a-chi-meul meo-geo-yo.)",
        "rom": "I eat breakfast before going to school.",
        "en": "Example 4"
      },
      {
        "kr": "시험 보기 전에 공부해요.",
        "rom": "Si-heom bo-gi jeo-ne gong-bu-hae-yo.",
        "en": "I study before taking the test."
      },
      {
        "kr": "Native Tip",
        "rom": "Native Koreans use",
        "en": "-기 전에"
      },
      {
        "kr": "very often in daily routines.",
        "rom": "Examples:",
        "en": "Before work"
      },
      {
        "kr": "Before school",
        "rom": "Before dinner",
        "en": "Before sleeping"
      },
      {
        "kr": "It's one of the most useful grammar patterns for talking about daily habits.",
        "rom": "Common Mistake",
        "en": "❌"
      },
      {
        "kr": "먹어요 전에",
        "rom": "Meo-geo-yo jeo-ne",
        "en": "Wrong"
      },
      {
        "kr": "✅",
        "rom": "먹기 전에",
        "en": "(Meok-gi jeo-ne)"
      },
      {
        "kr": "Before eating",
        "rom": "Correct",
        "en": "❌"
      },
      {
        "kr": "가기 전",
        "rom": "Not wrong,",
        "en": "but beginners should first learn"
      },
      {
        "kr": "가기 전에",
        "rom": "because it's the standard polite form.",
        "en": "Compare"
      },
      {
        "kr": "Grammar\tMeaning\tMain Job",
        "rom": "-기 전에 (-gi jeo-ne)\tBefore\tEarlier action",
        "en": "-고 나서 (-go na-seo)\tAfter\tLater action"
      },
      {
        "kr": "Mini Quiz",
        "rom": "_____ 이를 닦아요.",
        "en": "(_____ i-reul dak-ka-yo.)"
      },
      {
        "kr": "I brush my teeth before sleeping.",
        "rom": "①",
        "en": "자기 전에"
      },
      {
        "kr": "(ja-gi jeo-ne)",
        "rom": "Before sleeping",
        "en": "②"
      },
      {
        "kr": "자고 나서",
        "rom": "ja-go na-seo",
        "en": "After sleeping"
      },
      {
        "kr": "✅ Answer",
        "rom": "① 자기 전에",
        "en": "(Ja-gi jeo-ne)"
      },
      {
        "kr": "Before sleeping",
        "rom": "Because the brushing happens first.",
        "en": "Speaking Practice"
      },
      {
        "kr": "Repeat 3 times.",
        "rom": "먹기 전에 손을 씻어요.",
        "en": "(Meok-gi jeo-ne so-neul ssi-seo-yo.)"
      },
      {
        "kr": "I wash my hands before eating.",
        "rom": "Practice Challenge",
        "en": "Complete the sentence."
      },
      {
        "kr": "학교에 _____ 아침을 먹어요.",
        "rom": "Hak-gyo-e _____ a-chi-meul meo-geo-yo.",
        "en": "I eat breakfast before going to school."
      },
      {
        "kr": "✅ Answer",
        "rom": "가기 전에",
        "en": "(ga-gi jeo-ne)"
      },
      {
        "kr": "Before going",
        "rom": "Related Grammar",
        "en": "-고 나서"
      },
      {
        "kr": "(-go na-seo)",
        "rom": "After",
        "en": "Related Vocabulary"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "자다",
        "rom": "ja-da",
        "en": "to sleep"
      },
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "시험",
        "rom": "si-heom",
        "en": "test / exam"
      }
    ],
    "teacherNote": "Core function: While / At the same time. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G065",
    "grammar": "-고 나서",
    "romanization": "-go na-seo",
    "title": "After",
    "keywords": [
      "-고 나서",
      "after",
      "-go na-seo"
    ],
    "sentencePatterns": [
      "-고 나서"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your mother says,\n\n\"After eating, brush your teeth.\"\n\nOr your teacher says,\n\n\"Study, then go to bed.\"\n\nKorean uses\n\n-고 나서\n\n(-go na-seo)\n\nto show that one action is finished first, and then another action happens.\n\nIt means\n\nafter.",
    "memoryTrick": "🟦\n\n-고 나서\n\n(-go na-seo)\n\n=\n\n➡️\n\nAfter\n\nThink:\n\nFinish first → Then do the next thing.",
    "easyExplanation": "-고 나서\n\n(-go na-seo)\n\nmeans\n\nafter.\n\nUse it when Action A finishes first, then Action B happens.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-고 나서\n\n(-go na-seo)\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹고 나서\n\n(Meok-go na-seo)\n\nAfter eating\n\nExample\n\n공부하다\n\n(gong-bu-ha-da)\n\nto study\n\n↓\n\n공부하고 나서\n\n(Gong-bu-ha-go na-seo)\n\nAfter studying",
    "examples": [
      {
        "kr": "밥을 먹고 나서 이를 닦아요.",
        "rom": "Ba-beul meok-go na-seo i-reul dak-ka-yo.",
        "en": "I brush my teeth after eating."
      },
      {
        "kr": "숙제를 하고 나서 TV를 봐요.",
        "rom": "Suk-je-reul ha-go na-seo TV-reul bwa-yo.",
        "en": "I watch TV after doing my homework."
      },
      {
        "kr": "샤워하고 나서 잠을 자요.",
        "rom": "Sya-wo-ha-go na-seo ja-meul ja-yo.",
        "en": "I sleep after taking a shower."
      },
      {
        "kr": "공부하고 나서 친구를 만나요.",
        "rom": "Gong-bu-ha-go na-seo chin-gu-reul man-na-yo.",
        "en": "I meet my friend after studying."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n-고 나서\n\nto describe daily routines.\n\nExample:\n\n아침을 먹고 나서 출근해요.\n\n(A-chi-meul meok-go na-seo chul-geun-hae-yo.)\n\nI go to work after eating breakfast.",
    "commonMistakes": [
      {
        "wrong": "❌ 먹기 나서 (Meok-gi na-seo) Wrong",
        "correct": "✅ 먹고 나서 (Meok-go na-seo) After eating Correct"
      }
    ],
    "compare": [
      {
        "grammar": "-고 나서 (-go na-seo)",
        "meaning": "After\tAction A finishes, then Action B",
        "mainJob": "After\tAction A finishes, then Action B"
      },
      {
        "grammar": "-면서 (-myeon-seo)",
        "meaning": "While\tTwo actions happen at the same time",
        "mainJob": "While\tTwo actions happen at the same time"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 하고 나서 (ha-go na-seo) After doing",
        "② 하면서 (ha-myeon-seo) While doing"
      ],
      "answer": "✅ Answer\n\n① 하고 나서",
      "reason": "Because the homework is finished first."
    },
    "speakingPractice": {
      "kr": "밥을 먹고 나서 커피를 마셔요.",
      "rom": "Ba-beul meok-go na-seo keo-pi-reul ma-syeo-yo.",
      "en": "I drink coffee after eating.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "공부_____ 잠을 자요. (Gong-bu_____ ja-meul ja-yo.) I sleep after studying.",
      "answer": "✅ Answer\n\n하고 나서"
    },
    "relatedGrammar": [
      "-기 전에 (-gi jeo-ne) Before"
    ],
    "relatedVocabulary": [
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "자다",
        "rom": "ja-da",
        "en": "to sleep"
      },
      {
        "kr": "샤워하다",
        "rom": "sya-wo-ha-da",
        "en": "to take a shower"
      }
    ],
    "teacherNote": "Core function: After. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G066",
    "grammar": "-아 / 어 보세요",
    "romanization": "-a / eo bo-se-yo",
    "title": "Try...",
    "keywords": [
      "-아 / 어 보세요",
      "try...",
      "-a / eo bo-se-yo"
    ],
    "sentencePatterns": [
      "-아 / 어 보세요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend says,\n\n\"Try this food!\"\n\nOr your teacher says,\n\n\"Try speaking Korean!\"\n\nKorean uses\n\n-아 / 어 보세요\n\n(-a / eo bo-se-yo)\n\nto politely encourage someone\n\nto try doing something.\n\nIt means\n\nTry...",
    "memoryTrick": "🟦\n\n-아 / 어 보세요\n\n(-a / eo bo-se-yo)\n\n=\n\n🧪\n\nTry it!\n\nThink:\n\nJust give it a try.",
    "easyExplanation": "-아 / 어 보세요\n\n(-a / eo bo-se-yo)\n\nmeans\n\ntry doing...\n\nUse it when suggesting that someone experience or test something.\n\nNative Koreans use this grammar very often in conversations.",
    "basicRule": "Verb Stem\n\n-아 / 어 보세요\n\n(-a / eo bo-se-yo)\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹어 보세요.\n\n(Meo-geo bo-se-yo.)\n\nPlease try eating it.\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가 보세요.\n\n(Ga bo-se-yo.)\n\nTry going.",
    "examples": [
      {
        "kr": "이 음식을 먹어 보세요.",
        "rom": "I eum-si-geul meo-geo bo-se-yo.",
        "en": "Try this food."
      },
      {
        "kr": "한국어를 말해 보세요.",
        "rom": "Han-gu-geo-reul mal-hae bo-se-yo.",
        "en": "Try speaking Korean."
      },
      {
        "kr": "이 책을 읽어 보세요.",
        "rom": "I chae-geul il-geo bo-se-yo.",
        "en": "Try reading this book."
      },
      {
        "kr": "한번 해 보세요.",
        "rom": "Han-beon hae bo-se-yo.",
        "en": "Give it a try."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n한번\n\n(han-beon)\n\nmeaning\n\nonce\n\nbefore this grammar.\n\nExample:\n\n한번 먹어 보세요.\n\n(Han-beon meo-geo bo-se-yo.)\n\nPlease try it once.\n\nThis sounds very natural.",
    "commonMistakes": [
      {
        "wrong": "❌ 먹어 주세요. (Meo-geo ju-se-yo.) This means Please eat it. Not Try eating it.",
        "correct": "✅ 먹어 보세요. (Meo-geo bo-se-yo.) Try eating it. Correct."
      },
      {
        "wrong": "❌ 가세요. (Ga-se-yo.) This means Please go. Not Try going.",
        "correct": "✅ 가 보세요. (Ga bo-se-yo.) Try going. Correct."
      }
    ],
    "compare": [
      {
        "grammar": "-아 / 어 보세요 (-a / eo bo-se-yo)",
        "meaning": "Try...\tSuggest trying",
        "mainJob": "Try...\tSuggest trying"
      },
      {
        "grammar": "-아 / 어 주세요 (-a / eo ju-se-yo)",
        "meaning": "Please do...\tPolite request",
        "mainJob": "Please do...\tPolite request"
      }
    ],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 먹어 보세요 (meo-geo bo-se-yo) Try eating",
        "② 먹어 주세요 (meo-geo ju-se-yo) Please eat"
      ],
      "answer": "✅ Answer\n\n① 먹어 보세요",
      "reason": ""
    },
    "speakingPractice": {
      "kr": "한번 한국어를 말해 보세요.",
      "rom": "Han-beon Han-gu-geo-reul mal-hae bo-se-yo.",
      "en": "Try speaking Korean.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "이 책을 _____. (I chae-geul _____. ) Try reading this book.",
      "answer": "✅ Answer\n\n읽어 보세요"
    },
    "relatedGrammar": [
      "-아 / 어 주세요 (-a / eo ju-se-yo) Please do..."
    ],
    "relatedVocabulary": [
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "읽다",
        "rom": "ik-da",
        "en": "to read"
      },
      {
        "kr": "말하다",
        "rom": "mal-ha-da",
        "en": "to speak"
      },
      {
        "kr": "하다",
        "rom": "ha-da",
        "en": "to do"
      }
    ],
    "teacherNote": "Core function: Try.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G067",
    "grammar": "-아 / 어 드릴게요",
    "romanization": "-a / eo deu-ril-ge-yo",
    "title": "I'll do it for you",
    "keywords": [
      "-아 / 어 드릴게요",
      "i'll do it for you",
      "-a / eo deu-ril-ge-yo"
    ],
    "sentencePatterns": [
      "-아 / 어 드릴게요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine someone is carrying a heavy bag.\n\nYou say,\n\n\"I'll help you.\"\n\nOr someone can't take a photo.\n\nYou say,\n\n\"I'll take it for you.\"\n\nKorean uses\n\n-아 / 어 드릴게요\n\n(-a / eo deu-ril-ge-yo)\n\nto politely offer to do something for someone else.\n\nIt means\n\nI'll... for you.",
    "memoryTrick": "🟦\n\n-아 / 어 드릴게요\n\n(-a / eo deu-ril-ge-yo)\n\n=\n\n🤝\n\nI'll do it for you.\n\nThink:\n\nI'm helping you.",
    "easyExplanation": "-아 / 어 드릴게요\n\n(-a / eo deu-ril-ge-yo)\n\nmeans\n\nI'll do it for you.\n\nUse it when you are offering help politely.\n\nNative Koreans use this grammar when speaking politely to customers, older people, or anyone they want to help.",
    "basicRule": "Verb Stem\n\n-아 / 어 드릴게요\n\n(-a / eo deu-ril-ge-yo)\n\nExample\n\n돕다\n\n(dop-da)\n\nto help\n\n↓\n\n도와드릴게요.\n\n(Do-wa deu-ril-ge-yo.)\n\nI'll help you.\n\nExample\n\n찍다\n\n(jjik-da)\n\nto take (a picture)\n\n↓\n\n찍어드릴게요.\n\n(Jji-geo deu-ril-ge-yo.)\n\nI'll take a picture for you.",
    "examples": [
      {
        "kr": "도와드릴게요.",
        "rom": "Do-wa deu-ril-ge-yo.",
        "en": "I'll help you."
      },
      {
        "kr": "사진을 찍어드릴게요.",
        "rom": "Sa-jin-eul jji-geo deu-ril-ge-yo.",
        "en": "I'll take a picture for you."
      },
      {
        "kr": "문을 열어드릴게요.",
        "rom": "Mu-neul yeo-reo deu-ril-ge-yo.",
        "en": "I'll open the door for you."
      },
      {
        "kr": "가방을 들어드릴게요.",
        "rom": "Ga-bang-eul deu-reo deu-ril-ge-yo.",
        "en": "I'll carry your bag for you."
      }
    ],
    "nativeTip": "This grammar is heard every day in Korea.\n\nAt stores, restaurants, banks, and hospitals, staff often say:\n\n안내해드릴게요.\n\n(An-nae-hae deu-ril-ge-yo.)\n\nI'll guide you.\n\n설명해드릴게요.\n\n(Seol-myeong-hae deu-ril-ge-yo.)\n\nI'll explain it for you.",
    "commonMistakes": [
      {
        "wrong": "❌ 도와줄게요. (Do-wa jul-ge-yo.) Correct grammar, but it's more casual. Not appropriate for customers or strangers.",
        "correct": "✅ 도와드릴게요. (Do-wa deu-ril-ge-yo.) I'll help you. More polite."
      },
      {
        "wrong": "❌ 찍어 주세요. (Jji-geo ju-se-yo.) This means Please take a picture.",
        "correct": "✅ 찍어드릴게요. (Jji-geo deu-ril-ge-yo.) I'll take a picture for you. Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 찍어드릴게요 (jji-geo deu-ril-ge-yo) I'll take it for you",
        "② 찍어 주세요 (jji-geo ju-se-yo) Please take it"
      ],
      "answer": "✅ Answer\n\n① 찍어드릴게요",
      "reason": ""
    },
    "speakingPractice": {
      "kr": "도와드릴게요.",
      "rom": "Do-wa deu-ril-ge-yo.",
      "en": "I'll help you.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "문을 _____. (Mu-neul _____. ) I'll open the door for you.",
      "answer": "✅ Answer\n\n열어드릴게요"
    },
    "relatedGrammar": [
      "-아 / 어 주세요 (-a / eo ju-se-yo) Please do..."
    ],
    "relatedVocabulary": [
      {
        "kr": "돕다",
        "rom": "dop-da",
        "en": "to help"
      },
      {
        "kr": "열다",
        "rom": "yeol-da",
        "en": "to open"
      },
      {
        "kr": "찍다",
        "rom": "jjik-da",
        "en": "to take (a picture)"
      },
      {
        "kr": "들다",
        "rom": "deul-da",
        "en": "to carry"
      }
    ],
    "teacherNote": "Core function: I'll do it for you. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G068",
    "grammar": "-고 싶어 해요",
    "romanization": "-go si-peo hae-yo",
    "title": "Wants to... (Someone else)",
    "keywords": [
      "-고 싶어 해요",
      "wants to... (someone else)",
      "-go si-peo hae-yo"
    ],
    "sentencePatterns": [
      "-고 싶어 해요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your friend says,\n\n\"I want to eat pizza.\"\n\nYou can say:\n\n\"My friend wants to eat pizza.\"\n\nIn Korean,\n\n-고 싶어요\n\nis only used for your own feelings.\n\nWhen talking about someone else's desire, Koreans use\n\n-고 싶어 해요\n\n(-go si-peo hae-yo).",
    "memoryTrick": "🟦\n\n-고 싶어요\n\n=\n\n😊\n\nI want to...\n\n-고 싶어 해요\n\n=\n\n👤\n\nHe/She wants to...",
    "easyExplanation": "-고 싶어 해요\n\n(-go si-peo hae-yo)\n\nmeans\n\nsomeone wants to...\n\nUse it when talking about another person's wishes or desires.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-고 싶어 해요\n\n(-go si-peo hae-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가고 싶어 해요.\n\n(Ga-go si-peo hae-yo.)\n\nHe/She wants to go.\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹고 싶어 해요.\n\n(Meok-go si-peo hae-yo.)\n\nHe/She wants to eat.",
    "examples": [
      {
        "kr": "친구는 한국에 가고 싶어 해요.",
        "rom": "Chin-gu-neun Han-gu-ge ga-go si-peo hae-yo.",
        "en": "My friend wants to go to Korea."
      },
      {
        "kr": "동생은 게임을 하고 싶어 해요.",
        "rom": "Dong-saeng-eun ge-i-meul ha-go si-peo hae-yo.",
        "en": "My younger sibling wants to play games."
      },
      {
        "kr": "아이는 아이스크림을 먹고 싶어 해요.",
        "rom": "A-i-neun a-i-seu-keu-ri-meul meok-go si-peo hae-yo.",
        "en": "The child wants to eat ice cream."
      },
      {
        "kr": "우리 엄마는 여행하고 싶어 해요.",
        "rom": "U-ri eom-ma-neun yeo-haeng-ha-go si-peo hae-yo.",
        "en": "My mother wants to travel."
      }
    ],
    "nativeTip": "When talking about your own feelings, use:\n\n-고 싶어요\n\nWhen talking about another person's feelings, use:\n\n-고 싶어 해요\n\nThis difference is very important in Korean.",
    "commonMistakes": [
      {
        "wrong": "❌ 친구는 가고 싶어요. (Chin-gu-neun ga-go si-peo-yo.) This sounds like your own feeling, not your friend's.",
        "correct": "✅ 친구는 가고 싶어 해요. (Chin-gu-neun ga-go si-peo hae-yo.) My friend wants to go. Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 공부하고 싶어 해요 (gong-bu-ha-go si-peo hae-yo) Wants to study",
        "② 공부하고 싶어요 (gong-bu-ha-go si-peo-yo) I want to study"
      ],
      "answer": "✅ Answer\n\n① 공부하고 싶어 해요",
      "reason": "Because you're talking about your friend."
    },
    "speakingPractice": {
      "kr": "친구는 한국에 가고 싶어 해요.",
      "rom": "Chin-gu-neun Han-gu-ge ga-go si-peo hae-yo.",
      "en": "My friend wants to go to Korea.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "우리 엄마는 여행_____. (U-ri eom-ma-neun yeo-haeng_____.) My mother wants to travel.",
      "answer": "✅ Answer\n\n하고 싶어 해요"
    },
    "relatedGrammar": [
      "-고 싶어요 (-go si-peo-yo) I want to..."
    ],
    "relatedVocabulary": [
      {
        "kr": "친구",
        "rom": "chin-gu",
        "en": "friend"
      },
      {
        "kr": "엄마",
        "rom": "eom-ma",
        "en": "mother"
      },
      {
        "kr": "여행하다",
        "rom": "yeo-haeng-ha-da",
        "en": "to travel"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      }
    ],
    "teacherNote": "Core function: Wants to... (Someone else). Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G069",
    "grammar": "-는 것 같아요",
    "romanization": "-neun geot gat-a-yo",
    "title": "I think... / It seems...",
    "keywords": [
      "-는 것 같아요",
      "i think... / it seems...",
      "-neun geot gat-a-yo"
    ],
    "sentencePatterns": [
      "-는 것 같아요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you look outside.\n\nThe sky is dark.\n\nYou say,\n\n\"I think it's going to rain.\"\n\nOr you meet someone for the first time.\n\nYou say,\n\n\"I think he's a student.\"\n\nKorean uses\n\n-는 것 같아요\n\n(-neun geot gat-a-yo)\n\nwhen you are not 100% sure.\n\nIt means\n\nI think...\n\nor\n\nIt seems...",
    "memoryTrick": "🟦\n\n-는 것 같아요\n\n(-neun geot gat-a-yo)\n\n=\n\n🤔\n\nI think...\n\nThink:\n\nI'm not completely sure.",
    "easyExplanation": "-는 것 같아요\n\n(-neun geot gat-a-yo)\n\nmeans\n\nI think...\n\nor\n\nIt seems...\n\nUse it when giving your opinion or guess.\n\nNative Koreans use this grammar constantly because it sounds softer and more polite than making a direct statement.",
    "basicRule": "Verb Stem\n\n-는 것 같아요\n\n(-neun geot gat-a-yo)\n\nExample\n\n오다\n\n(o-da)\n\nto come\n\n↓\n\n오는 것 같아요.\n\n(O-neun geot gat-a-yo.)\n\nI think it's coming.\n\nExample\n\n비가 오다\n\n(bi-ga o-da)\n\nto rain\n\n↓\n\n비가 오는 것 같아요.\n\n(Bi-ga o-neun geot gat-a-yo.)\n\nI think it's raining.",
    "examples": [
      {
        "kr": "비가 오는 것 같아요.",
        "rom": "Bi-ga o-neun geot gat-a-yo.",
        "en": "I think it's raining."
      },
      {
        "kr": "그 사람은 학생인 것 같아요.",
        "rom": "Geu sa-ra-meun hak-saeng-in geot gat-a-yo.",
        "en": "I think that person is a student."
      },
      {
        "kr": "이 음식은 맛있는 것 같아요.",
        "rom": "I eum-si-geun ma-sit-neun geot gat-a-yo.",
        "en": "I think this food is delicious."
      },
      {
        "kr": "오늘은 바쁜 것 같아요.",
        "rom": "O-neu-reun ba-ppeun geot gat-a-yo.",
        "en": "I think today is busy."
      }
    ],
    "nativeTip": "Native Koreans often use\n\n것 같아요\n\ninstead of making direct statements.\n\nInstead of saying:\n\n비가 와요.\n\n(Bi-ga wa-yo.)\n\nIt's raining.\n\nThey often say:\n\n비가 오는 것 같아요.\n\n(Bi-ga o-neun geot gat-a-yo.)\n\nI think it's raining.\n\nIt sounds softer and more natural.",
    "commonMistakes": [
      {
        "wrong": "❌ 비가 오는 것이에요. (Bi-ga o-neun geo-si-e-yo.) Wrong meaning.",
        "correct": "✅ 비가 오는 것 같아요. (Bi-ga o-neun geot gat-a-yo.) I think it's raining. Correct."
      },
      {
        "wrong": "❌ 학생 같아요. This can be natural in conversation, but beginners should first learn the full pattern.",
        "correct": "✅ 학생인 것 같아요. (Hak-saeng-in geot gat-a-yo.) I think he/she is a student."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 오는 것 같아요 (o-neun geot gat-a-yo) I think it's raining",
        "② 오네요 (o-ne-yo) Oh, it's raining!"
      ],
      "answer": "✅ Answer\n\n① 오는 것 같아요",
      "reason": "Because you're making a guess."
    },
    "speakingPractice": {
      "kr": "오늘은 추운 것 같아요.",
      "rom": "O-neu-reun chu-un geot gat-a-yo.",
      "en": "I think it's cold today.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "그 사람은 학생_____. (Geu sa-ra-meun hak-saeng_____. ) I think that person is a student.",
      "answer": "✅ Answer\n\n인 것 같아요"
    },
    "relatedGrammar": [
      "-네요 (-ne-yo) Oh! / Wow!"
    ],
    "relatedVocabulary": [
      {
        "kr": "비",
        "rom": "bi",
        "en": "rain"
      },
      {
        "kr": "학생",
        "rom": "hak-saeng",
        "en": "student"
      },
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      },
      {
        "kr": "바쁘다",
        "rom": "ba-ppeu-da",
        "en": "to be busy"
      }
    ],
    "teacherNote": "Core function: I think... / It seems.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G070",
    "grammar": "-아 / 어도 돼요",
    "romanization": "-a / eo-do dwae-yo",
    "title": "May I...? / It's okay to...",
    "keywords": [
      "-아 / 어도 돼요",
      "may i...? / it's okay to...",
      "-a / eo-do dwae-yo"
    ],
    "sentencePatterns": [
      "-아 / 어도 돼요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you're at a friend's house.\n\nYou ask,\n\n\"May I sit here?\"\n\nOr at school,\n\n\"May I open the window?\"\n\nKorean uses\n\n-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\nto ask for permission or to say something is allowed.\n\nIt means\n\nMay I...?\n\nor\n\nIt's okay to...",
    "memoryTrick": "🟦\n\n-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\n=\n\n✅\n\nIt's okay.\n\nThink:\n\nPermission.",
    "easyExplanation": "-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\nmeans\n\nMay I...?\n\nor\n\nIt's okay to...\n\nUse it when asking if something is allowed.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-아 / 어도 돼요\n\n(-a / eo-do dwae-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가도 돼요?\n\n(Ga-do dwae-yo?)\n\nMay I go?\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹어도 돼요?\n\n(Meo-geo-do dwae-yo?)\n\nMay I eat it?",
    "examples": [
      {
        "kr": "여기에 앉아도 돼요?",
        "rom": "Yeo-gi-e an-ja-do dwae-yo?",
        "en": "May I sit here?"
      },
      {
        "kr": "사진을 찍어도 돼요?",
        "rom": "Sa-jin-eul jji-geo-do dwae-yo?",
        "en": "May I take a picture?"
      },
      {
        "kr": "지금 가도 돼요?",
        "rom": "Ji-geum ga-do dwae-yo?",
        "en": "May I go now?"
      },
      {
        "kr": "이걸 먹어도 돼요?",
        "rom": "I-geol meo-geo-do dwae-yo?",
        "en": "May I eat this?"
      }
    ],
    "nativeTip": "When giving permission, Koreans often simply answer:\n\n네, 돼요.\n\n(Ne, dwae-yo.)\n\nYes, you may.\n\nOr,\n\n네, 괜찮아요.\n\n(Ne, gwaen-cha-na-yo.)\n\nYes, that's fine.",
    "commonMistakes": [
      {
        "wrong": "❌ 가세요? (Ga-se-yo?) This means Are you going? or Please go. Not May I go?",
        "correct": "✅ 가도 돼요? (Ga-do dwae-yo?) May I go? Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 찍어도 돼요 (jji-geo-do dwae-yo) May I take it?",
        "② 찍어야 돼요 (jji-geo-ya dwae-yo) I must take it."
      ],
      "answer": "✅ Answer\n\n① 찍어도 돼요",
      "reason": "Because you're asking for permission."
    },
    "speakingPractice": {
      "kr": "여기에 앉아도 돼요?",
      "rom": "Yeo-gi-e an-ja-do dwae-yo?",
      "en": "May I sit here?",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "지금 _____? (Ji-geum _____?) May I go now?",
      "answer": "✅ Answer\n\n가도 돼요"
    },
    "relatedGrammar": [
      "-아 / 어야 돼요 (-a / eo-ya dwae-yo) Must / Have to"
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "앉다",
        "rom": "an-da",
        "en": "to sit"
      },
      {
        "kr": "찍다",
        "rom": "jjik-da",
        "en": "to take (a picture)"
      }
    ],
    "teacherNote": "Core function: May I...? / It's okay to.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G071",
    "grammar": "-아 / 어야 돼요",
    "romanization": "-a / eo-ya dwae-yo",
    "title": "Must / Have to",
    "keywords": [
      "-아 / 어야 돼요",
      "must / have to",
      "-a / eo-ya dwae-yo"
    ],
    "sentencePatterns": [
      "-아 / 어야 돼요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine your teacher says,\n\n\"You have to study.\"\n\nOr your mom says,\n\n\"You must sleep early.\"\n\nKorean uses\n\n-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\nto express necessity or obligation.\n\nIt means\n\nmust\n\nor\n\nhave to.",
    "memoryTrick": "🟥\n\n-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\n=\n\n❗\n\nMust\n\nThink:\n\nYou need to do it.",
    "easyExplanation": "-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\nmeans\n\nmust\n\nor\n\nhave to.\n\nUse it when something is necessary or required.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-아 / 어야 돼요\n\n(-a / eo-ya dwae-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가야 돼요.\n\n(Ga-ya dwae-yo.)\n\nI have to go.\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹어야 돼요.\n\n(Meo-geo-ya dwae-yo.)\n\nI have to eat.",
    "examples": [
      {
        "kr": "공부해야 돼요.",
        "rom": "Gong-bu-hae-ya dwae-yo.",
        "en": "I have to study."
      },
      {
        "kr": "지금 가야 돼요.",
        "rom": "Ji-geum ga-ya dwae-yo.",
        "en": "I have to go now."
      },
      {
        "kr": "약을 먹어야 돼요.",
        "rom": "Ya-geul meo-geo-ya dwae-yo.",
        "en": "You have to take medicine."
      },
      {
        "kr": "일찍 자야 돼요.",
        "rom": "Il-jjik ja-ya dwae-yo.",
        "en": "You have to sleep early."
      }
    ],
    "nativeTip": "In casual conversations, Koreans often shorten\n\n돼요\n\nto\n\n돼.\n\nExample:\n\n가야 돼.\n\n(Ga-ya dwae.)\n\nI have to go.\n\nThis sounds natural among friends.",
    "commonMistakes": [
      {
        "wrong": "❌ 가도 돼요. (Ga-do dwae-yo.) This means May I go? Not I have to go.",
        "correct": "✅ 가야 돼요. (Ga-ya dwae-yo.) I have to go. Correct."
      },
      {
        "wrong": "❌ 먹어요. (Meo-geo-yo.) This simply means I eat.",
        "correct": "✅ 먹어야 돼요. (Meo-geo-ya dwae-yo.) I have to eat."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 가야 돼요 (ga-ya dwae-yo) I have to go",
        "② 가도 돼요 (ga-do dwae-yo) May I go?"
      ],
      "answer": "✅ Answer\n\n① 가야 돼요",
      "reason": "Because you're expressing an obligation."
    },
    "speakingPractice": {
      "kr": "오늘 공부해야 돼요.",
      "rom": "O-neul gong-bu-hae-ya dwae-yo.",
      "en": "I have to study today.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "약을 _____. (Ya-geul _____.) You have to take the medicine.",
      "answer": "✅ Answer\n\n먹어야 돼요"
    },
    "relatedGrammar": [
      "-아 / 어도 돼요 (-a / eo-do dwae-yo) May I...? / It's okay to..."
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "자다",
        "rom": "ja-da",
        "en": "to sleep"
      }
    ],
    "teacherNote": "Core function: Must / Have to. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G072",
    "grammar": "-(으)ㄹ까요?",
    "romanization": "-(eu)l-kka-yo?",
    "title": "Shall we...? / Should I...?",
    "keywords": [
      "-(으)ㄹ까요?",
      "shall we...? / should i...?",
      "-(eu)l-kka-yo?"
    ],
    "sentencePatterns": [
      "-(으)ㄹ까요?"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Imagine you're with a friend.\n\nYou ask,\n\n\"Shall we eat?\"\n\nOr you ask,\n\n\"Shall I help you?\"\n\nKorean uses\n\n-(으)ㄹ까요?\n\n(-(eu)l-kka-yo?)\n\nto make suggestions or politely ask what to do.\n\nIt means\n\nShall we...?\n\nor\n\nShould I...?",
    "memoryTrick": "🟦\n\n-(으)ㄹ까요?\n\n(-(eu)l-kka-yo?)\n\n=\n\n🤝\n\nShall we?\n\nThink:\n\nLet's decide together.",
    "easyExplanation": "-(으)ㄹ까요?\n\n(-(eu)l-kka-yo?)\n\nmeans\n\nShall we...?\n\nor\n\nShould I...?\n\nUse it to make a polite suggestion or offer.\n\nNative Koreans use this grammar constantly.",
    "basicRule": "Verb Stem\n\n-(으)ㄹ까요?\n\n(-(eu)l-kka-yo?)\n\nIf the verb stem ends in a vowel or ㄹ → -ㄹ까요?\nIf the verb stem ends in a consonant → -을까요?\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n갈까요?\n\n(Gal-kka-yo?)\n\nShall we go?\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹을까요?\n\n(Meo-geul-kka-yo?)\n\nShall we eat?",
    "examples": [
      {
        "kr": "같이 갈까요?",
        "rom": "Ga-chi gal-kka-yo?",
        "en": "Shall we go together?"
      },
      {
        "kr": "점심을 먹을까요?",
        "rom": "Jeom-si-meul meo-geul-kka-yo?",
        "en": "Shall we eat lunch?"
      },
      {
        "kr": "제가 도와드릴까요?",
        "rom": "Je-ga do-wa deu-ril-kka-yo?",
        "en": "Shall I help you?"
      },
      {
        "kr": "커피를 마실까요?",
        "rom": "Keo-pi-reul ma-sil-kka-yo?",
        "en": "Shall we drink coffee?"
      }
    ],
    "nativeTip": "-(으)ㄹ까요? is much softer than giving a command.\n\nInstead of saying:\n\n갑시다.\n\n(Gap-si-da.)\n\nLet's go.\n\nMany Koreans naturally say:\n\n갈까요?\n\n(Gal-kka-yo?)\n\nShall we go?\n\nIt sounds more friendly.",
    "commonMistakes": [
      {
        "wrong": "❌ 갈래요? (Gal-lae-yo?) This asks about someone's personal intention (\"Do you want to go?\").",
        "correct": "✅ 갈까요? (Gal-kka-yo?) Shall we go? Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 갈까요 (gal-kka-yo) Shall we go?",
        "② 가야 돼요 (ga-ya dwae-yo) Have to go"
      ],
      "answer": "✅ Answer\n\n① 갈까요?",
      "reason": "Because you're making a suggestion."
    },
    "speakingPractice": {
      "kr": "같이 점심을 먹을까요?",
      "rom": "Ga-chi jeom-si-meul meo-geul-kka-yo?",
      "en": "Shall we eat lunch together?",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "제가 _____? (Je-ga _____?) Shall I help you?",
      "answer": "✅ Answer\n\n도와드릴까요"
    },
    "relatedGrammar": [
      "-겠어요 (-get-sseo-yo) I will... / I intend to..."
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "돕다",
        "rom": "dop-da",
        "en": "to help"
      },
      {
        "kr": "마시다",
        "rom": "ma-si-da",
        "en": "to drink"
      }
    ],
    "teacherNote": "Core function: Shall we...? / Should I...?. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G073",
    "grammar": "-네요",
    "romanization": "-ne-yo",
    "title": "Oh! / I see! / Wow!",
    "keywords": [
      "-네요",
      "oh! / i see! / wow!",
      "-ne-yo"
    ],
    "sentencePatterns": [
      "-네요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "You walk outside.\n\nIt's snowing.\n\nYou say,\n\n\"Oh! It's snowing!\"\n\nOr you taste delicious food.\n\nYou say,\n\n\"Wow! It's delicious!\"\n\nKorean uses\n\n-네요\n\n(-ne-yo)\n\nto express surprise, realization, or admiration.",
    "memoryTrick": "🟦\n\n-네요\n\n(-ne-yo)\n\n=\n\n😮\n\nOh!\n\nThink:\n\nYou just noticed something.",
    "easyExplanation": "-네요\n\n(-ne-yo)\n\nmeans\n\nOh!\n\nI see!\n\nWow!\n\nIt expresses a new realization or surprise.\n\nNative Koreans use it very often in everyday conversations.",
    "basicRule": "Verb / Adjective Stem\n\n-네요\n\n(-ne-yo)\n\nExample\n\n예쁘다\n\n(ye-ppeu-da)\n\nto be pretty\n\n↓\n\n예쁘네요.\n\n(Ye-ppeu-ne-yo.)\n\nOh, it's pretty!\n\nExample\n\n오다\n\n(o-da)\n\nto come\n\n↓\n\n오네요.\n\n(O-ne-yo.)\n\nOh, it's coming!",
    "examples": [
      {
        "kr": "오늘 춥네요.",
        "rom": "O-neul chup-ne-yo.",
        "en": "Oh, it's cold today."
      },
      {
        "kr": "음식이 맛있네요.",
        "rom": "Eum-si-gi ma-sit-ne-yo.",
        "en": "Wow, the food is delicious."
      },
      {
        "kr": "비가 오네요.",
        "rom": "Bi-ga o-ne-yo.",
        "en": "Oh, it's raining."
      },
      {
        "kr": "한국어를 잘하시네요.",
        "rom": "Han-gu-geo-reul jal-ha-si-ne-yo.",
        "en": "Wow, you speak Korean well."
      }
    ],
    "nativeTip": "Native Koreans use -네요 when they notice something at that moment.\n\nExample:\n\n와! 예쁘네요!\n\n(Wa! Ye-ppeu-ne-yo!)\n\nWow! It's beautiful!\n\nIt sounds warm and natural.",
    "commonMistakes": [
      {
        "wrong": "❌ 맛있어요. (Ma-si-sseo-yo.) This simply states a fact: It's delicious.",
        "correct": "✅ 맛있네요. (Ma-sit-ne-yo.) Wow, it's delicious! Shows your reaction."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 맛있네요 (ma-sit-ne-yo) Wow, it's delicious!",
        "② 맛있는 것 같아요 (ma-sit-neun geot gat-a-yo) I think it's delicious."
      ],
      "answer": "✅ Answer\n\n① 맛있네요",
      "reason": "Because you're reacting with surprise or admiration."
    },
    "speakingPractice": {
      "kr": "와! 정말 예쁘네요.",
      "rom": "Wa! Jeong-mal ye-ppeu-ne-yo.",
      "en": "Wow! It's really beautiful.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "비가 _____. (Bi-ga _____. ) Oh, it's raining.",
      "answer": "✅ Answer\n\n오네요"
    },
    "relatedGrammar": [
      "-는 것 같아요 (-neun geot gat-a-yo) I think..."
    ],
    "relatedVocabulary": [
      {
        "kr": "예쁘다",
        "rom": "ye-ppeu-da",
        "en": "to be pretty"
      },
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      },
      {
        "kr": "춥다",
        "rom": "chup-da",
        "en": "to be cold"
      },
      {
        "kr": "오다",
        "rom": "o-da",
        "en": "to come / to rain"
      }
    ],
    "teacherNote": "Core function: Oh! / I see! / Wow!. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G074",
    "grammar": "-잖아요",
    "romanization": "-ja-na-yo",
    "title": "You know... / As you know... / Remember?",
    "keywords": [
      "-잖아요",
      "you know... / as you know... / remember?",
      "-ja-na-yo"
    ],
    "sentencePatterns": [
      "-잖아요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Your friend says,\n\n\"I'm hungry.\"\n\nYou reply,\n\n\"You skipped breakfast, you know.\"\n\nOr,\n\n\"It's Sunday, remember?\"\n\nKorean uses\n\n-잖아요\n\n(-ja-na-yo)\n\nwhen both people already know the information.\n\nIt means\n\nYou know...\n\nor\n\nRemember...?",
    "memoryTrick": "🟦\n\n-잖아요\n\n(-ja-na-yo)\n\n=\n\n💡\n\nYou know!\n\nThink:\n\nWe both already know this.",
    "easyExplanation": "-잖아요\n\n(-ja-na-yo)\n\nmeans\n\nYou know...\n\nAs you know...\n\nor\n\nRemember...?\n\nUse it when reminding someone about something they already know.\n\nNative Koreans use this grammar all the time in conversations.",
    "basicRule": "Verb / Adjective / Noun\n\n-잖아요\n\n(-ja-na-yo)\n\nExample\n\n알다\n\n(al-da)\n\nto know\n\n↓\n\n알잖아요.\n\n(Al-ja-na-yo.)\n\nYou know.\n\nExample\n\n학생이다\n\n(hak-saeng-i-da)\n\nto be a student\n\n↓\n\n학생이잖아요.\n\n(Hak-saeng-i-ja-na-yo.)\n\nYou know he's a student.",
    "examples": [
      {
        "kr": "오늘 일요일이잖아요.",
        "rom": "O-neul il-yo-i-ri-ja-na-yo.",
        "en": "It's Sunday, you know."
      },
      {
        "kr": "이미 먹었잖아요.",
        "rom": "I-mi meo-geo-jja-na-yo.",
        "en": "You already ate, remember?"
      },
      {
        "kr": "한국에 가고 싶었잖아요.",
        "rom": "Han-gu-ge ga-go si-peot-jja-na-yo.",
        "en": "You wanted to go to Korea, remember?"
      },
      {
        "kr": "그 사람은 우리 친구잖아요.",
        "rom": "Geu sa-ra-meun u-ri chin-gu-ja-na-yo.",
        "en": "He's our friend, you know."
      }
    ],
    "nativeTip": "Koreans use -잖아요 very naturally when reminding someone of shared information.\n\nIt doesn't always sound angry.\n\nIt often simply means:\n\n\"You know...\"\n\nor\n\n\"Remember?\"",
    "commonMistakes": [
      {
        "wrong": "❌ 오늘 일요일이에요. (O-neul il-yo-i-ri-e-yo.) This only states a fact.",
        "correct": "✅ 오늘 일요일이잖아요. (O-neul il-yo-i-ri-ja-na-yo.) It's Sunday, you know. Shows you're reminding the listener."
      },
      {
        "wrong": "❌ 알아요? (A-ra-yo?) Means: Do you know?",
        "correct": "✅ 알잖아요. (Al-ja-na-yo.) You know."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 잖아요 (ja-na-yo) You know",
        "② 네요 (ne-yo) Oh!"
      ],
      "answer": "✅ Answer\n\n① 잖아요",
      "reason": "Because you're reminding someone of something they already know."
    },
    "speakingPractice": {
      "kr": "우리 약속했잖아요.",
      "rom": "U-ri yak-sok-haet-jja-na-yo.",
      "en": "We already promised, remember?",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "그 사람은 학생_____. (Geu sa-ra-meun hak-saeng_____.) He's a student, you know.",
      "answer": "✅ Answer\n\n이잖아요"
    },
    "relatedGrammar": [
      "-네요 (-ne-yo) Oh! / I just realized..."
    ],
    "relatedVocabulary": [
      {
        "kr": "알다",
        "rom": "al-da",
        "en": "to know"
      },
      {
        "kr": "약속하다",
        "rom": "yak-sok-ha-da",
        "en": "to promise"
      },
      {
        "kr": "학생",
        "rom": "hak-saeng",
        "en": "student"
      },
      {
        "kr": "친구",
        "rom": "chin-gu",
        "en": "friend"
      }
    ],
    "teacherNote": "Core function: You know... / As you know... / Remember?. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G075",
    "grammar": "-(으)려고 해요",
    "romanization": "-(eu)ryeo-go hae-yo",
    "title": "I'm planning to... / I'm going to...",
    "keywords": [
      "-(으)려고 해요",
      "i'm planning to... / i'm going to...",
      "-(eu)ryeo-go hae-yo"
    ],
    "sentencePatterns": [
      "-(으)려고 해요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Tomorrow is Saturday.\n\nYou say,\n\n\"I'm going to meet my friend.\"\n\nOr,\n\n\"I'm planning to study Korean tonight.\"\n\nKorean uses\n\n-(으)려고 해요\n\n(-(eu)ryeo-go hae-yo)\n\nto talk about your plan or intention.\n\nIt means\n\nI'm planning to...\n\nor\n\nI'm going to...",
    "memoryTrick": "🟦\n\n-(으)려고 해요\n\n(-(eu)ryeo-go hae-yo)\n\n=\n\n📅\n\nPlan\n\nThink:\n\nI've already decided to do it.",
    "easyExplanation": "-(으)려고 해요\n\n(-(eu)ryeo-go hae-yo)\n\nmeans\n\nI'm planning to...\n\nor\n\nI'm going to...\n\nUse it when talking about something you intend to do.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-(으)려고 해요\n\n(-(eu)ryeo-go hae-yo)\n\nIf the verb stem ends in a vowel or ㄹ → -려고 해요\nIf the verb stem ends in a consonant → -으려고 해요\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가려고 해요.\n\n(Ga-ryeo-go hae-yo.)\n\nI'm going to go.\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹으려고 해요.\n\n(Meo-geu-ryeo-go hae-yo.)\n\nI'm going to eat.",
    "examples": [
      {
        "kr": "오늘 친구를 만나려고 해요.",
        "rom": "O-neul chin-gu-reul man-na-ryeo-go hae-yo.",
        "en": "I'm going to meet my friend today."
      },
      {
        "kr": "한국어를 더 공부하려고 해요.",
        "rom": "Han-gu-geo-reul deo gong-bu-ha-ryeo-go hae-yo.",
        "en": "I'm planning to study more Korean."
      },
      {
        "kr": "주말에 여행하려고 해요.",
        "rom": "Ju-ma-re yeo-haeng-ha-ryeo-go hae-yo.",
        "en": "I'm planning to travel this weekend."
      },
      {
        "kr": "저녁을 먹으려고 해요.",
        "rom": "Jeo-nyeo-geul meo-geu-ryeo-go hae-yo.",
        "en": "I'm going to eat dinner."
      }
    ],
    "nativeTip": "-(으)려고 해요 sounds stronger than -고 싶어요.\n\n먹고 싶어요. → I want to eat.\n먹으려고 해요. → I'm planning to eat.\n\nThe second means you've already decided.",
    "commonMistakes": [
      {
        "wrong": "❌ 먹고 싶어 해요. (Meok-go si-peo hae-yo.) This means Someone else wants to eat.",
        "correct": "✅ 먹으려고 해요. (Meo-geu-ryeo-go hae-yo.) I'm planning to eat. Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 하려고 해요 (ha-ryeo-go hae-yo) I'm planning to",
        "② 하고 싶어요 (ha-go si-peo-yo) I want to"
      ],
      "answer": "✅ Answer\n\n① 하려고 해요",
      "reason": "Because it expresses a plan."
    },
    "speakingPractice": {
      "kr": "오늘 운동하려고 해요.",
      "rom": "O-neul un-dong-ha-ryeo-go hae-yo.",
      "en": "I'm going to exercise today.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "한국에 _____. (Han-gu-ge _____. ) I'm planning to go to Korea.",
      "answer": "✅ Answer\n\n가려고 해요"
    },
    "relatedGrammar": [
      "-고 싶어요 (-go si-peo-yo) I want to..."
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "여행하다",
        "rom": "yeo-haeng-ha-da",
        "en": "to travel"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      }
    ],
    "teacherNote": "Core function: I'm planning to... / I'm going to.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G076",
    "grammar": "-지요? (죠?)",
    "romanization": "-ji-yo? / -jyo?",
    "title": "Right? / Isn't it?",
    "keywords": [
      "-지요? (죠?)",
      "right? / isn't it?",
      "-ji-yo? / -jyo?"
    ],
    "sentencePatterns": [
      "-지요? (죠?)"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "You and your friend are looking at the sky.\n\nYou say,\n\n\"It's beautiful, isn't it?\"\n\nOr,\n\n\"You're Korean, right?\"\n\nKorean uses\n\n-지요?\n\nor the shorter form\n\n-죠?\n\nto ask for agreement or confirmation.\n\nIt means\n\nRight?\n\nor\n\nIsn't it?",
    "memoryTrick": "🟦\n\n-죠?\n\n(-jyo?)\n\n=\n\n👍\n\nRight?\n\nThink:\n\nYou agree with me, don't you?",
    "easyExplanation": "-지요?\n\n(-ji-yo?)\n\nor\n\n-죠?\n\n(-jyo?)\n\nmeans\n\nRight?\n\nIsn't it?\n\nUse it when you think the other person already knows the answer and you just want confirmation.\n\nNative Koreans use -죠? constantly in daily conversations.",
    "basicRule": "Verb / Adjective / Noun\n\n-지요?\n\nor\n\n-죠?\n\nExample\n\n맞다\n\n(mat-da)\n\nto be correct\n\n↓\n\n맞죠?\n\n(Mat-jyo?)\n\nRight?\n\nExample\n\n학생이다\n\n(hak-saeng-i-da)\n\nto be a student\n\n↓\n\n학생이죠?\n\n(Hak-saeng-i-jyo?)\n\nYou're a student, right?",
    "examples": [
      {
        "kr": "오늘 춥죠?",
        "rom": "O-neul chup-jyo?",
        "en": "It's cold today, isn't it?"
      },
      {
        "kr": "한국 사람이죠?",
        "rom": "Han-guk sa-ra-mi-jyo?",
        "en": "You're Korean, right?"
      },
      {
        "kr": "맛있죠?",
        "rom": "Ma-sit-jyo?",
        "en": "It's delicious, isn't it?"
      },
      {
        "kr": "내일 쉬죠?",
        "rom": "Nae-il swi-jyo?",
        "en": "We're off tomorrow, right?"
      }
    ],
    "nativeTip": "In everyday speech,\n\n-죠?\n\nis much more common than\n\n-지요?\n\nBoth mean exactly the same thing.\n\nNative speakers almost always say:\n\n맞죠?\n\ninstead of\n\n맞지요?",
    "commonMistakes": [
      {
        "wrong": "❌ 맞아요? (Ma-ja-yo?) This asks: \"Is it correct?\"",
        "correct": "✅ 맞죠? (Mat-jyo?) This means: \"It's correct, right?\" You're expecting agreement."
      },
      {
        "wrong": "❌ 예뻐요? (Ye-ppeo-yo?) Means: \"Is it pretty?\"",
        "correct": "✅ 예쁘죠? (Ye-ppeu-jyo?) Means: \"It's pretty, isn't it?\""
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 죠 (jyo) Right?",
        "② 나요 (na-yo) Is it?"
      ],
      "answer": "✅ Answer\n\n① 죠",
      "reason": "Because you're asking for agreement."
    },
    "speakingPractice": {
      "kr": "좋죠?",
      "rom": "Jo-jyo?",
      "en": "It's good, right?",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "오늘 날씨가 좋_____? (O-neul nal-ssi-ga jo_____?) The weather is nice today, isn't it?",
      "answer": "✅ Answer\n\n죠"
    },
    "relatedGrammar": [
      "-나요? (-na-yo?) Is it...?"
    ],
    "relatedVocabulary": [
      {
        "kr": "맞다",
        "rom": "mat-da",
        "en": "to be correct"
      },
      {
        "kr": "좋다",
        "rom": "jo-ta",
        "en": "to be good"
      },
      {
        "kr": "춥다",
        "rom": "chup-da",
        "en": "to be cold"
      },
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      }
    ],
    "teacherNote": "Core function: Right? / Isn't it?. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G077",
    "grammar": "-겠어요",
    "romanization": "-get-sseo-yo",
    "title": "I will... / It looks like...",
    "keywords": [
      "-겠어요",
      "i will... / it looks like...",
      "-get-sseo-yo"
    ],
    "sentencePatterns": [
      "-겠어요"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "You're cold.\n\nSomeone gives you a jacket.\n\nYou say,\n\n\"I'll wear it.\"\n\nOr you see dark clouds.\n\nYou say,\n\n\"It looks like it's going to rain.\"\n\nKorean uses\n\n-겠어요\n\n(-get-sseo-yo)\n\nto express intention, guess, or future prediction.",
    "memoryTrick": "🟦\n\n-겠어요\n\n(-get-sseo-yo)\n\n=\n\n➡️\n\nWill\n\nThink:\n\nI will...\n\nor\n\nIt probably will...",
    "easyExplanation": "-겠어요\n\n(-get-sseo-yo)\n\ncan mean\n\nI will...\n\nor\n\nIt looks like...\n\nDepending on the situation.\n\nNative Koreans use it often in polite conversations.",
    "basicRule": "Verb / Adjective Stem\n\n-겠어요\n\n(-get-sseo-yo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가겠어요.\n\n(Ga-get-sseo-yo.)\n\nI'll go.\n\nExample\n\n맛있다\n\n(ma-sit-da)\n\nto be delicious\n\n↓\n\n맛있겠어요.\n\n(Ma-sit-get-sseo-yo.)\n\nIt looks delicious.",
    "examples": [
      {
        "kr": "제가 하겠어요.",
        "rom": "Je-ga ha-get-sseo-yo.",
        "en": "I'll do it."
      },
      {
        "kr": "내일 비가 오겠어요.",
        "rom": "Nae-il bi-ga o-get-sseo-yo.",
        "en": "It looks like it will rain tomorrow."
      },
      {
        "kr": "정말 맛있겠어요.",
        "rom": "Jeong-mal ma-sit-get-sseo-yo.",
        "en": "That looks really delicious."
      },
      {
        "kr": "제가 전화하겠어요.",
        "rom": "Je-ga jeon-hwa-ha-get-sseo-yo.",
        "en": "I'll call."
      }
    ],
    "nativeTip": "When talking about your own plans, Koreans often use\n\n-(으)려고 해요\n\nmore frequently.\n\nBut\n\n-겠어요\n\nsounds more formal and is often used for:\n\nOffering help\nMaking polite promises\nPredictions",
    "commonMistakes": [
      {
        "wrong": "❌ 맛있어요. (Ma-si-sseo-yo.) Means: It is delicious.",
        "correct": "✅ 맛있겠어요. (Ma-sit-get-sseo-yo.) Means: It looks delicious. You haven't eaten it yet."
      },
      {
        "wrong": "❌ 가려고 해요. Means: I'm planning to go.",
        "correct": "✅ 가겠어요. Means: I'll go. A decision made at the moment."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 하겠어요 (ha-get-sseo-yo) I'll do it",
        "② 하려고 해요 (ha-ryeo-go hae-yo) I'm planning to do it"
      ],
      "answer": "✅ Answer\n\n① 하겠어요",
      "reason": "Because it's an immediate decision or offer."
    },
    "speakingPractice": {
      "kr": "제가 도와드리겠어요.",
      "rom": "Je-ga do-wa deu-ri-get-sseo-yo.",
      "en": "I'll help you.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "내일 비가 _____. (Nae-il bi-ga _____. ) It looks like it will rain tomorrow.",
      "answer": "✅ Answer\n\n오겠어요"
    },
    "relatedGrammar": [
      "-(으)려고 해요 (-(eu)ryeo-go hae-yo) I'm planning to..."
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "하다",
        "rom": "ha-da",
        "en": "to do"
      },
      {
        "kr": "전화하다",
        "rom": "jeon-hwa-ha-da",
        "en": "to call"
      },
      {
        "kr": "맛있다",
        "rom": "ma-sit-da",
        "en": "to be delicious"
      }
    ],
    "teacherNote": "Core function: I will... / It looks like.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G078",
    "grammar": "-기 때문에",
    "romanization": "-gi ttae-mun-e",
    "title": "Because",
    "keywords": [
      "-기 때문에",
      "because",
      "-gi ttae-mun-e"
    ],
    "sentencePatterns": [
      "-기 때문에"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "You say,\n\n\"I'm tired because I worked all day.\"\n\nOr,\n\n\"I stayed home because it was raining.\"\n\nKorean uses\n\n-기 때문에\n\n(-gi ttae-mun-e)\n\nto explain the reason or cause of something.\n\nIt means\n\nbecause.",
    "memoryTrick": "🟦\n\n-기 때문에\n\n(-gi ttae-mun-e)\n\n=\n\n➡️\n\nBecause\n\nThink:\n\nReason → Result",
    "easyExplanation": "-기 때문에\n\n(-gi ttae-mun-e)\n\nmeans\n\nbecause.\n\nUse it when explaining why something happened.\n\nNative Koreans use this grammar in both speaking and writing.",
    "basicRule": "Verb / Adjective Stem\n\n-기 때문에\n\n(-gi ttae-mun-e)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가기 때문에\n\n(Ga-gi ttae-mun-e)\n\nBecause (someone) goes\n\nExample\n\n춥다\n\n(chup-da)\n\nto be cold\n\n↓\n\n춥기 때문에\n\n(Chup-gi ttae-mun-e)\n\nBecause it's cold",
    "examples": [
      {
        "kr": "비가 오기 때문에 집에 있어요.",
        "rom": "Bi-ga o-gi ttae-mun-e ji-be i-sseo-yo.",
        "en": "I'm staying home because it's raining."
      },
      {
        "kr": "피곤하기 때문에 일찍 자요.",
        "rom": "Pi-go-na-gi ttae-mun-e il-jjik ja-yo.",
        "en": "I go to bed early because I'm tired."
      },
      {
        "kr": "한국어를 좋아하기 때문에 공부해요.",
        "rom": "Han-gu-geo-reul jo-a-ha-gi ttae-mun-e gong-bu-hae-yo.",
        "en": "I study because I like Korean."
      },
      {
        "kr": "아프기 때문에 학교에 안 가요.",
        "rom": "A-peu-gi ttae-mun-e hak-gyo-e an ga-yo.",
        "en": "I don't go to school because I'm sick."
      }
    ],
    "nativeTip": "In casual conversations, Koreans often shorten this to:\n\n-아서 / -어서\n\nExample:\n\n비가 와서 집에 있어요.\n\n(Bi-ga wa-seo ji-be i-sseo-yo.)\n\nI'm staying home because it's raining.\n\nBut -기 때문에 sounds more formal and clearer.",
    "commonMistakes": [
      {
        "wrong": "❌ 비가 오기 집에 있어요. (Bi-ga o-gi ji-be i-sseo-yo.) Wrong.",
        "correct": "✅ 비가 오기 때문에 집에 있어요. (Bi-ga o-gi ttae-mun-e ji-be i-sseo-yo.) I'm staying home because it's raining. Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 춥기 때문에 (chup-gi ttae-mun-e) Because it's cold",
        "② 춥겠어요 (chup-get-sseo-yo) It looks cold"
      ],
      "answer": "✅ Answer\n\n① 춥기 때문에",
      "reason": "Because it expresses the reason."
    },
    "speakingPractice": {
      "kr": "피곤하기 때문에 쉬어요.",
      "rom": "Pi-go-na-gi ttae-mun-e swi-eo-yo.",
      "en": "I rest because I'm tired.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "아프_____ 병원에 가요. (A-peu_____ byeong-won-e ga-yo.) I go to the hospital because I'm sick.",
      "answer": "✅ Answer\n\n기 때문에"
    },
    "relatedGrammar": [
      "-아서 / -어서 (-a-seo / -eo-seo) Because / So"
    ],
    "relatedVocabulary": [
      {
        "kr": "비",
        "rom": "bi",
        "en": "rain"
      },
      {
        "kr": "춥다",
        "rom": "chup-da",
        "en": "to be cold"
      },
      {
        "kr": "아프다",
        "rom": "a-peu-da",
        "en": "to be sick"
      },
      {
        "kr": "피곤하다",
        "rom": "pi-go-na-da",
        "en": "to be tired"
      }
    ],
    "teacherNote": "Core function: Because. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G079",
    "grammar": "-아 / 어서",
    "romanization": "-a / eo-seo",
    "title": "Because / And then",
    "keywords": [
      "-아 / 어서",
      "because / and then",
      "-a / eo-seo"
    ],
    "sentencePatterns": [
      "-아 / 어서"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "It's raining.\n\nYou say,\n\n\"I stayed home because it was raining.\"\n\nOr,\n\nYou buy coffee,\n\nthen drink it.\n\n\"I bought coffee and drank it.\"\n\nKorean uses\n\n-아 / 어서\n\n(-a / eo-seo)\n\nfor reasons and natural sequence of actions.",
    "memoryTrick": "🟦\n\n-아서 / -어서\n\n(-a-seo / -eo-seo)\n\n=\n\n➡️\n\nBecause\n\nor\n\nAnd then\n\nThink:\n\nAction A → Action B",
    "easyExplanation": "-아 / 어서\n\nmeans\n\nbecause\n\nor\n\nand then.\n\nIt connects two related actions or explains the reason for something.\n\nNative Koreans use this grammar constantly.",
    "basicRule": "Verb / Adjective Stem\n\n-아서 / -어서\n\n(-a-seo / -eo-seo)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가서\n\n(Ga-seo)\n\nGo and then...\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹어서\n\n(Meo-geo-seo)\n\nBecause I ate / Eat and then...",
    "examples": [
      {
        "kr": "비가 와서 집에 있어요.",
        "rom": "Bi-ga wa-seo ji-be i-sseo-yo.",
        "en": "I'm staying home because it's raining."
      },
      {
        "kr": "피곤해서 일찍 자요.",
        "rom": "Pi-go-na-seo il-jjik ja-yo.",
        "en": "I sleep early because I'm tired."
      },
      {
        "kr": "밥을 먹어서 배가 불러요.",
        "rom": "Ba-beul meo-geo-seo bae-ga bul-leo-yo.",
        "en": "I'm full because I ate."
      },
      {
        "kr": "학교에 가서 공부해요.",
        "rom": "Hak-gyo-e ga-seo gong-bu-hae-yo.",
        "en": "I go to school and study."
      }
    ],
    "nativeTip": "-아서 / -어서 is much more common in daily conversations than -기 때문에.\n\nFriends usually say:\n\n피곤해서 집에 갈게.\n\n(Pi-go-na-seo ji-be gal-ge.)\n\nI'm going home because I'm tired.\n\nInstead of:\n\n피곤하기 때문에...",
    "commonMistakes": [
      {
        "wrong": "❌ 비가 와서 때문에 Wrong. Don't use -아서/-어서 together with 때문에.",
        "correct": "✅ 비가 와서 (Bi-ga wa-seo) Because it's raining Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 해서 (hae-seo) Because",
        "② 겠어요 (get-sseo-yo) Will"
      ],
      "answer": "✅ Answer\n\n① 해서",
      "reason": "Because it explains the reason."
    },
    "speakingPractice": {
      "kr": "학교에 가서 공부해요.",
      "rom": "Hak-gyo-e ga-seo gong-bu-hae-yo.",
      "en": "I go to school and study.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "밥을 _____ 커피를 마셔요. (Ba-beul _____ keo-pi-reul ma-syeo-yo.) I eat and then drink coffee.",
      "answer": "✅ Answer\n\n먹어서"
    },
    "relatedGrammar": [
      "-기 때문에 (-gi ttae-mun-e)",
      "Because (formal)"
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      },
      {
        "kr": "피곤하다",
        "rom": "pi-go-na-da",
        "en": "to be tired"
      }
    ],
    "teacherNote": "Core function: Because / And then. Use page examples first, then Grammar DB examples, then generate new examples if needed."
  },
  {
    "id": "G080",
    "grammar": "-기 전에",
    "romanization": "-gi jeon-e",
    "title": "Before...",
    "keywords": [
      "-기 전에",
      "before...",
      "-gi jeon-e"
    ],
    "sentencePatterns": [
      "-기 전에"
    ],
    "rating": "★★★★★ Used Every Day",
    "imagine": "Before you sleep,\n\nyou brush your teeth.\n\nOr,\n\nbefore eating,\n\nyou wash your hands.\n\nKorean uses\n\n-기 전에\n\n(-gi jeon-e)\n\nto talk about something that happens before another action.\n\nIt means\n\nbefore...",
    "memoryTrick": "🟦\n\n-기 전에\n\n(-gi jeon-e)\n\n=\n\n⏪\n\nBefore\n\nThink:\n\nFirst this → Then that",
    "easyExplanation": "-기 전에\n\n(-gi jeon-e)\n\nmeans\n\nbefore doing something.\n\nUse it to describe an action that happens earlier than another action.\n\nNative Koreans use this grammar every day.",
    "basicRule": "Verb Stem\n\n-기 전에\n\n(-gi jeon-e)\n\nExample\n\n가다\n\n(ga-da)\n\nto go\n\n↓\n\n가기 전에\n\n(Ga-gi jeon-e)\n\nBefore going\n\nExample\n\n먹다\n\n(meok-da)\n\nto eat\n\n↓\n\n먹기 전에\n\n(Meok-gi jeon-e)\n\nBefore eating",
    "examples": [
      {
        "kr": "자기 전에 이를 닦아요.",
        "rom": "Ja-gi jeon-e i-reul dak-ka-yo.",
        "en": "I brush my teeth before sleeping."
      },
      {
        "kr": "먹기 전에 손을 씻어요.",
        "rom": "Meok-gi jeon-e so-neul ssi-seo-yo.",
        "en": "I wash my hands before eating."
      },
      {
        "kr": "학교에 가기 전에 아침을 먹어요.",
        "rom": "Hak-gyo-e ga-gi jeon-e a-chi-meul meo-geo-yo.",
        "en": "I eat breakfast before going to school."
      },
      {
        "kr": "공부하기 전에 커피를 마셔요.",
        "rom": "Gong-bu-ha-gi jeon-e keo-pi-reul ma-syeo-yo.",
        "en": "I drink coffee before studying."
      }
    ],
    "nativeTip": "This grammar is extremely common in daily routines.\n\nExamples:\n\n자기 전에 (before sleeping)\n집에 가기 전에 (before going home)\n일하기 전에 (before working)\n\nYou'll hear these expressions every day in Korea.",
    "commonMistakes": [
      {
        "wrong": "❌ 먹기 후에 (Meok-gi hu-e) This means after eating, not before eating.",
        "correct": "✅ 먹기 전에 (Meok-gi jeon-e) Before eating Correct."
      },
      {
        "wrong": "❌ 가기 먼저 Not natural.",
        "correct": "✅ 가기 전에 (Ga-gi jeon-e) Correct."
      }
    ],
    "compare": [],
    "miniQuiz": {
      "question": "",
      "options": [
        "① 먹기 전에 (meok-gi jeon-e) Before eating",
        "② 먹고 나서 (meok-go na-seo) After eating"
      ],
      "answer": "✅ Answer\n\n① 먹기 전에",
      "reason": "Because the action happens first."
    },
    "speakingPractice": {
      "kr": "자기 전에 책을 읽어요.",
      "rom": "Ja-gi jeon-e chae-geul il-geo-yo.",
      "en": "I read a book before sleeping.",
      "repeat": 3
    },
    "practiceChallenge": {
      "question": "학교에 _____ 아침을 먹어요. (Hak-gyo-e _____ a-chi-meul meo-geo-yo.) I eat breakfast before going to school.",
      "answer": "✅ Answer\n\n가기 전에"
    },
    "relatedGrammar": [
      "-고 나서 (-go na-seo) After..."
    ],
    "relatedVocabulary": [
      {
        "kr": "가다",
        "rom": "ga-da",
        "en": "to go"
      },
      {
        "kr": "먹다",
        "rom": "meok-da",
        "en": "to eat"
      },
      {
        "kr": "자다",
        "rom": "ja-da",
        "en": "to sleep"
      },
      {
        "kr": "공부하다",
        "rom": "gong-bu-ha-da",
        "en": "to study"
      }
    ],
    "teacherNote": "Core function: Before.... Use page examples first, then Grammar DB examples, then generate new examples if needed."
  }
];


   // 하위 호환 맵 (기존 GRAMMAR_DB 접근 코드가 있다면 계속 동작하도록)
  const GRAMMAR_DB = {};
  grammarData.forEach(item => {
    GRAMMAR_DB[item.id] = {
      ...item,
      k: item.grammar,
      rom: item.romanization,
      mean: item.title,
      rule: item.basicRule,
      ex: item.examples ? item.examples.map(e => `${e.kr} (${e.rom}) ${e.en}`).join(' / ') : '',
      tip: item.nativeTip,
      mistake: item.commonMistakes ? item.commonMistakes.map(m => `❌ ${m.wrong} → ✅ ${m.correct}`).join(' / ') : ''
    };
  });
 
  // ==================== 여기부터 핵심 변경: 로컬 DB 매칭 + 렌더링 ====================
 
  // 사용자의 질문(또는 클릭한 칩)이 DB의 어떤 문법과 매칭되는지 찾는다.
  // 1순위: 정확한 id (G001, g001 등 대소문자 무관)
  // 2순위: grammar 필드에 있는 개별 조각(예: "은", "는", "이", "가")이 질문 텍스트에 포함되는지
  // 3순위: romanization 조각(예: "eun", "neun")이 포함되는지
  // 영어 단어 경계를 지켜서 매칭 (예: "i"라는 로마자가 "him"의 일부로 오탐되는 것 방지)
  function hasWordBoundary(text, token){
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    return pattern.test(text);
  }
 
  // 한글 조각은 앞뒤가 한글 음절이 아닐 때만 인정 (단어 중간에 우연히 낀 경우 방지)
  // — 자유 질문(예: "왜 은/는 써요?")처럼 문법 조각이 독립된 토큰으로 등장할 때 사용
  function hasHangulBoundary(text, token){
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(^|[^가-힣])${escaped}([^가-힣]|$)`);
    return pattern.test(text);
  }
 
  // 뒤쪽 경계만 체크 — 실제 한글 문장 안에서 조사/어미 스캔할 때 사용.
  // 조사는 앞 글자가 항상 한글(예: 먹어요의 '어')이므로 앞쪽은 검사하지 않고,
  // 뒤에 다른 글자가 이어붙어 더 긴 문법이 되는 경우만 걸러냄 (에서의 '에' 등).
  function hasTrailingHangulBoundary(text, token){
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`${escaped}([^가-힣]|$)`);
    return pattern.test(text);
  }
 
  // 로마자를 하이픈 기준으로 쪼개서, 음절 사이에 하이픈/공백이 있어도 없어도 매칭되는 정규식 생성
  // \b(단어 경계)는 그대로 유지해서 "ga"가 "yoga","garbage" 안에 낄 때는 여전히 안 걸림
  function romanizationFlexRegex(token){
    const parts = token.split('-').map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(`\\b${parts.join('[\\s-]*')}\\b`, 'i');
  }
 
  function findAllGrammarMatches(q){
    if(!q) return [];
    const norm = q.toLowerCase().trim();
 
    // 1순위: ID 정확 매칭 — 가장 확실하므로 다른 단계 스킵하고 그 하나로 확정
    const idMatch = grammarData.find(g => norm.includes(g.id.toLowerCase()));
    if(idMatch) return [idMatch];
 
    const seen = new Set();
    const results = [];
    function addIfNew(g){ if(!seen.has(g.id)){ seen.add(g.id); results.push(g); } }
 
    // 2순위: 영어 키워드 매칭 — 이 단계에서 걸리는 건 전부 수집
    // (예: "difference between topic and subject marker" → G001, G002 둘 다)
    for(const g of grammarData){
      const kws = g.keywords || [];
      for(const kw of kws){
        const k = kw.toLowerCase();
        let ok;
        if(k.includes(' ')) ok = norm.includes(k); // 구문은 단어 경계 안 따짐
        else if(k.length <= 3) ok = hasWordBoundary(norm, k); // 짧은 단어는 경계 체크 필수
        else ok = norm.includes(k);
        if(ok){ addIfNew(g); break; }
      }
    }
    if(results.length > 0) return results;
 
    // 3순위: 로마자 매칭 — 하이픈/공백 표기가 달라도 다 잡히면서, 단어 경계는 그대로 지킴
    for(const g of grammarData){
      const romParts = g.romanization.split('/').map(s=>s.trim()).filter(Boolean);
      if(romParts.some(p => p.replace(/-/g,'').length>=2 && romanizationFlexRegex(p).test(norm))) addIfNew(g);
    }
    if(results.length > 0) return results;
 
    // 4순위: 한글 조각 매칭 (한글로 직접 질문한 경우 대비, 경계 체크 적용)
    for(const g of grammarData){
      const parts = g.grammar.split('/').map(s=>s.trim()).filter(Boolean);
      if(parts.some(p => p.length>=1 && hasHangulBoundary(q, p))) addIfNew(g);
    }
    return results;
  }
 
  // DB 항목 하나를 V21_SYSTEM의 9-섹션 포맷(HTML)으로 즉시 렌더링. API 호출 없음.
  function renderFromDB(g, ctx){
    const exHtml = (g.examples||[]).map((e,i)=>`${i+1}. ${e.kr} (${e.rom}) ${e.en}`).join('<br>');
    const mistakeHtml = (g.commonMistakes||[]).map(m=>`❌ ${m.wrong} → ✅ ${m.correct}`).join('<br>') || '—';
    const compareHtml = (g.compare||[]).map(c=>`${c.grammar} = ${c.meaning} (${c.mainJob})`).join('<br>');
    const quizHtml = g.miniQuiz
      ? `${g.miniQuiz.question}<br>${(g.miniQuiz.options||[]).join('<br>')}<br><b>Answer:</b> ${g.miniQuiz.answer}${g.miniQuiz.reason ? ' — '+g.miniQuiz.reason : ''}`
      : '—';
    const practiceHtml = g.practiceChallenge
      ? `${g.practiceChallenge.question}<br><b>Answer:</b> ${g.practiceChallenge.answer}`
      : (g.speakingPractice ? `${g.speakingPractice.kr} (${g.speakingPractice.rom}) ${g.speakingPractice.en}` : '—');
    const ruleHtml = (g.basicRule||'').replace(/\n/g,'<br>');
    const imagineHtml = g.imagine ? `<br><br>${g.imagine}` : '';
 
    return `<b>Short Answer</b><br>${g.grammar} (${g.romanization}) ${g.title}<br><br>`
      + `<b>Easy Explanation</b><br>${g.easyExplanation||''}${imagineHtml}<br><br>`
      + `<b>Grammar</b><br>${ruleHtml}<br><br>`
      + `<b>Examples</b><br>${exHtml}<br><br>`
      + `<b>Native Tip</b><br>👩‍🏫 ${g.nativeTip||''}<br><br>`
      + `<b>Common Mistake</b><br>${mistakeHtml}<br><br>`
      + (compareHtml ? `<b>Compare</b><br>${compareHtml}<br><br>` : '')
      + `<b>Practice</b><br>${practiceHtml}<br><br>`
      + `<b>Mini Quiz</b><br>${quizHtml}<br><br>`
      + `<b>Excellent! Keep practicing. You are improving every day.</b>`;
  }
 
  // ==================== Gemini는 DB에 없는 "일반 질문"일 때만 호출 ====================
 
  const V21_SYSTEM = `
You are Hi Korea Friend AI Tutor v3.0.
 
ROLE
You are a professional Korean language teacher.
Your students are foreigners.
Most students are complete beginners.
Teach like a real Korean teacher.
Always explain WHY, not only WHAT.
Always use simple beginner-friendly English.
Always be patient, encouraging and positive.
 
MISSION
Help students understand Korean, remember Korean, speak naturally, think like Korean speakers, and communicate confidently in real life.
Always teach modern, natural Korean.
Prefer expressions used by native speakers.
 
ABSOLUTE KOREAN DISPLAY RULE
Whenever ANY Korean text appears anywhere in the response, ALWAYS display:
Korean
Romanization
English
Never output Korean alone. Never output Korean without Romanization. Never output Korean without English.
 
TEACHING RULES
Always explain using English. Never explain grammar using Korean.
Always explain WHY.
 
OUTPUT RULES
Always include:
1. Short Answer
2. Easy Explanation
3. Grammar
4. Examples
5. Native Tip
6. Common Mistake
7. Practice
8. Mini Quiz
9. Encouragement
 
COMPARISON RULE
When comparing grammar, always create a comparison table.
 
NATURAL KOREAN
If a more natural expression exists, say: "A more natural way is..."
 
FINAL MESSAGE
Always finish with:
Excellent! Keep practicing. You are improving every day.
 
FORMAT RULE:
Do NOT use Markdown symbols like #, ##, ###, **, --- or bullet dashes.
Write plain text only. Use line breaks between sections. Use a section label like "Short Answer:" followed by a colon, not a heading.
 
You must always follow the OUTPUT RULES above and include all 9 sections, even for simple questions.
`.trim();
 
  // 유저 턴에 들어갈 부분 — 페이지 문맥 + 실제 질문만. 규칙은 위 V21_SYSTEM(systemInstruction)에 이미 있음.
  const V21_USER_TEMPLATE = `
Current sentence on page: {kr} ({rom}) - {en}
Student question: {q}
This question is NOT about a grammar point already in our Grammar DB, so answer generally using the system rules.
Use the page sentence as the main example first if relevant.
Remember: include all 9 sections (Short Answer, Easy Explanation, Grammar, Examples, Native Tip, Common Mistake, Practice, Mini Quiz, Encouragement).
`.trim();
 
  const GEMINI_API_KEY = "AQ.Ab8RN6ItpsOwmsYi-vBN6MuU5_qLkYCBFX35wpdRButkHeExkg";
  const USE_GEMINI = true;
  const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  const GEMINI_STREAM_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;
 
  var file = (location.pathname.split('/').pop()||'').toLowerCase();
  if(file===''||file==='index.html'||file==='/'||file==='index') return;
 
  var oldBtn=document.getElementById('ai-tutor-btn'); if(oldBtn) oldBtn.parentElement.remove();
  var oldStyle=document.getElementById('ai-tutor-style'); if(oldStyle) oldStyle.remove();
  var oldShare=document.getElementById('ai-share-modal'); if(oldShare) oldShare.remove();
 
  var css=document.createElement('style');
  css.id='ai-tutor-style';
  css.textContent=`
  #ai-tutor-btn{display:none;position:fixed;bottom:20px;right:14px;z-index:99999;cursor:pointer;border:none;background:transparent;flex-direction:column;align-items:center;gap:3px;}
  #ai-tutor-btn .ai-bubble{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-size:1.7rem;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(99,102,241,0.4);border:3px solid white;animation:ai-bounce 2s infinite;}
  #ai-tutor-btn .ai-label{background:#1e293b;color:white;font-size:.6rem;font-weight:900;padding:2px 7px;border-radius:20px;}
  @keyframes ai-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
  #ai-tutor-modal{display:none;position:fixed;bottom:85px;right:10px;width:368px;max-width:95vw;height:68vh;max-height:520px;background:white;border-radius:20px;z-index:99999;flex-direction:column;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.2);border:1px solid #e2e8f0;}
  #ai-chat-log{flex:1;overflow-y:auto !important;padding:14px;display:flex;flex-direction:column;gap:12px;-webkit-overflow-scrolling:touch; font-size:0.9rem; line-height:1.6;}
  #ai-faq-chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px;background:#f8fafc;flex-shrink:0;}
  .faq-chip{padding:8px 12px;background:white;border:2px solid #e2e8f0;border-bottom-width:3px;border-radius:14px;font-size:.78rem;font-weight:800;cursor:pointer;text-align:left;line-height:1.3;max-width:100%;}
  .ai-actions{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;}
  .ai-action-btn{padding:5px 10px;border-radius:20px;border:2px solid #e2e8f0;background:white;font-size:.7rem;font-weight:800;cursor:pointer;}
  #ai-error-box{background:#fef2f2;border:2px solid #fca5a5;color:#991b1b;padding:10px 12px;border-radius:12px;font-size:0.8rem;white-space:pre-wrap;word-break:break-word;}
  .ai-source-tag{display:inline-block;font-size:.68rem;font-weight:800;padding:3px 8px;border-radius:20px;margin-bottom:6px;}
  .ai-source-db{background:#dcfce7;color:#166534;}
  .ai-source-api{background:#dbeafe;color:#1e40af;}
  #ai-share-modal{display:none;position:fixed;bottom:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:100000;justify-content:center;align-items:flex-end;}
  #ai-share-card{background:white;width:100%;max-width:400px;border-radius:20px 20px 0 0;padding:20px;animation:slideUp .3s;}
  @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
  .share-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:16px 0;}
  .share-item{display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;border:none;background:transparent;}
  .share-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:white;}
  `;
  document.head.appendChild(css);
 
  var shareModal=document.createElement('div');
  shareModal.id='ai-share-modal';
  shareModal.innerHTML=`<div id="ai-share-card"><div style="width:40px;height:4px;background:#e2e8f0;border-radius:10px;margin:0 auto 14px;"></div><div style="display:flex;justify-content:space-between;align-items:center;"><b>Share Korean Tip</b><span id="share-x" style="cursor:pointer;background:#f1f5f9;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;">✖</span></div><div class="share-grid"><button class="share-item" data-type="kakao"><div class="share-icon" style="background:#FEE500;color:#000;">💬</div><span style="font-size:.7rem;font-weight:800;">Kakao</span></button><button class="share-item" data-type="facebook"><div class="share-icon" style="background:#1877F2;">📘</div><span style="font-size:.7rem;font-weight:800;">Facebook</span></button><button class="share-item" data-type="whatsapp"><div class="share-icon" style="background:#25D366;">📱</div><span style="font-size:.7rem;font-weight:800;">WhatsApp</span></button><button class="share-item" data-type="twitter"><div class="share-icon" style="background:#000;">𝕏</div><span style="font-size:.7rem;font-weight:800;">X</span></button><button class="share-item" data-type="email"><div class="share-icon" style="background:#64748b;">✉</div><span style="font-size:.7rem;font-weight:800;">E-mail</span></button><button class="share-item" data-type="copy"><div class="share-icon" style="background:#8b5cf6;">📋</div><span style="font-size:.7rem;font-weight:800;">Copy</span></button><button class="share-item" data-type="save"><div class="share-icon" style="background:#f59e0b;">💾</div><span style="font-size:.7rem;font-weight:800;">Save</span></button><button class="share-item" data-type="more"><div class="share-icon" style="background:#e2e8f0;color:#334155;">⋯</div><span style="font-size:.7rem;font-weight:800;">More</span></button></div></div>`;
  document.body.appendChild(shareModal);
 
  var wrap=document.createElement('div');
  wrap.innerHTML=`<button id="ai-tutor-btn"><div class="ai-bubble">🤖</div><div class="ai-label">TUTOR V2.1</div></button><div id="ai-tutor-modal"><div style="padding:12px 14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;"><div style="font-weight:900;font-size:0.9rem;">🤖 AI Tutor V2.1 + Grammar DB</div><span id="ai-x" style="cursor:pointer;background:rgba(255,255,255,0.25);width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;">✖</span></div><div id="ai-faq-chips"></div><div id="ai-chat-log"></div><div style="padding:10px;background:#f8fafc;border-top:1px solid #eee;flex-shrink:0;display:flex;gap:8px;"><input id="ai-in" placeholder="Ask anything about Korean..." style="flex:1;min-width:0;padding:11px 14px;border-radius:24px;border:2px solid #e2e8f0;outline:none;font-size:0.9rem;"><button id="ai-send-btn" style="flex-shrink:0;width:44px;height:44px;border-radius:50%;border:none;background:#6366f1;color:white;font-size:1.1rem;font-weight:800;cursor:pointer;display:flex;align-items:center;justify-content:center;">➤</button></div></div>`;
  document.body.appendChild(wrap);
 
  var currentShareText='';
  function openShare(text){currentShareText=text; shareModal.style.display='flex';}
  shareModal.querySelector('#share-x').onclick=()=>shareModal.style.display='none';
  shareModal.onclick=(e)=>{if(e.target.id==='ai-share-modal') shareModal.style.display='none';};
  shareModal.querySelectorAll('.share-item').forEach(btn=>{
    btn.onclick=()=>{
      var t=currentShareText; var url=location.href; var full=t+"\n\n"+url;
      var type=btn.dataset.type;
      if(type==='kakao'){window.open('https://sharer.kakao.com/talk/friends/picker/link?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(t));}
      else if(type==='facebook'){window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url)+'&quote='+encodeURIComponent(t),'_blank','width=600,height=400');}
      else if(type==='whatsapp'){window.open('https://wa.me/?text='+encodeURIComponent(full),'_blank');}
      else if(type==='twitter'){window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(t)+'&url='+encodeURIComponent(url),'_blank');}
      else if(type==='email'){location.href='mailto:?subject='+encodeURIComponent('Korean Study Tip')+'&body='+encodeURIComponent(full);}
      else if(type==='copy'){navigator.clipboard.writeText(full); btn.querySelector('span').innerText='Copied!'; setTimeout(()=>{btn.querySelector('span').innerText='Copy'; shareModal.style.display='none';},1000); return;}
      else if(type==='save'){let s=JSON.parse(localStorage.getItem('aiSaved')||'[]'); s.push({txt:t,date:new Date().toLocaleDateString()}); localStorage.setItem('aiSaved',JSON.stringify(s)); btn.querySelector('span').innerText='Saved!'; setTimeout(()=>{btn.querySelector('span').innerText='Save'; shareModal.style.display='none';},1000); return;}
      else if(type==='more'){if(navigator.share){navigator.share({title:'Korean Tip',text:t,url:url});} else {navigator.clipboard.writeText(full); alert('Copied!');}}
      shareModal.style.display='none';
    };
  });
 
  var btn=wrap.querySelector('#ai-tutor-btn'), modal=wrap.querySelector('#ai-tutor-modal'), log=wrap.querySelector('#ai-chat-log'), faq=wrap.querySelector('#ai-faq-chips'), input=wrap.querySelector('#ai-in'), open=false;
 
  function getCtx(){
    const krEl=document.getElementById('korean-sentence')||document.querySelector('.kr-text');
    const romEl=document.getElementById('romanization')||document.querySelector('.rom-text');
    const tipEl=document.getElementById('category-tip-text');
    return { kr: (krEl&&krEl.innerText.trim())||'가족', rom: (romEl&&romEl.innerText.trim())||'ga-jok', en: (tipEl&&tipEl.innerText.trim().slice(0,120))||'family' };
  }
 
  function mdToHtml(text){
    let t = text;
    t = t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    t = t.replace(/^#{1,6}\s*(.+)$/gm, '<br><b style="color:#4f46e5;">$1</b><br>');
    t = t.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    t = t.replace(/^---+$/gm, '');
    t = t.replace(/^[-*]\s+(.+)$/gm, '• $1<br>');
    t = t.replace(/\n{2,}/g, '<br><br>');
    t = t.replace(/\n/g, '<br>');
    return t;
  }
 
  // HTML을 태그는 즉시, 글자는 하나씩 타이핑하는 효과. 클릭하면 즉시 전체 표시로 스킵.
  function typeWriterHTML(container, html, speed, onDone){
    const tokens = html.match(/<[^>]+>|[^<]/g) || [];
    let i = 0;
    let skipped = false;
    container.innerHTML = '';
    container.style.cursor = 'pointer';
    function skipToEnd(){
      if(skipped) return;
      skipped = true;
      container.innerHTML = html;
      container.style.cursor = 'default';
      log.scrollTop = log.scrollHeight;
      if(onDone) onDone();
    }
    container.addEventListener('click', skipToEnd, { once:true });
    function step(){
      if(skipped) return;
      if(i >= tokens.length){
        container.style.cursor = 'default';
        if(onDone) onDone();
        return;
      }
      // 태그는 한 번에, 글자는 한 개씩 — 타이핑 속도를 자연스럽게
      let chunk = tokens[i];
      i++;
      // 연속된 일반 문자를 몇 개씩 묶어서 너무 느리지 않게 (태그는 그대로 1개씩 즉시)
      while(i < tokens.length && !tokens[i].startsWith('<') && !chunk.endsWith('>') && chunk.length < 2){
        chunk += tokens[i];
        i++;
      }
      container.innerHTML += chunk;
      log.scrollTop = log.scrollHeight;
      setTimeout(step, speed);
    }
    step();
  }
 
  function escapeAndBr(text){
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\n{2,}/g,'<br><br>')
      .replace(/\n/g,'<br>');
  }
 
  // Gemini 스트리밍 응답을 실시간으로 읽어서 onChunk(누적된 전체 텍스트)를 계속 호출.
  // 다 끝나면 onDone(최종 텍스트), 실패하면 onError(에러 메시지) 호출.
  async function streamGemini(systemInstruction, userText, onChunk, onDone, onError){
    try{
      const res = await fetch(GEMINI_STREAM_ENDPOINT, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          systemInstruction: { parts:[{ text: systemInstruction }] },
          contents:[{ role:'user', parts:[{ text: userText }] }],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.6,
            thinkingConfig: { thinkingBudget: 0 } // 내부 reasoning 토큰 비활성화 (지원 안 하면 API가 무시함)
          }
        })
      });
      if(!res.ok || !res.body){
        let msg = 'Unknown error';
        try{ const data = await res.json(); msg = data?.error?.message || msg; }catch(e){}
        onError(`HTTP ${res.status} - ${msg}`);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let fullText = '';
      while(true){
        const { done, value } = await reader.read();
        if(done) break;
        buffer += decoder.decode(value, { stream:true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // 마지막 줄이 아직 완성 안 됐을 수 있으니 버퍼에 남겨둠
        for(const line of lines){
          const trimmed = line.trim();
          if(!trimmed.startsWith('data:')) continue;
          const jsonStr = trimmed.slice(5).trim();
          if(!jsonStr || jsonStr === '[DONE]') continue;
          try{
            const obj = JSON.parse(jsonStr);
            if(obj?.error){ onError(obj.error.message || 'Stream error'); return; }
            const piece = obj?.candidates?.[0]?.content?.parts?.[0]?.text;
            if(piece){ fullText += piece; onChunk(fullText); }
            const finishReason = obj?.candidates?.[0]?.finishReason;
            if(finishReason && finishReason !== 'STOP'){
              console.warn('[AI Tutor] Gemini finishReason:', finishReason, '(MAX_TOKENS면 답변이 잘린 것)');
            }
          }catch(e){ /* 아직 완성 안 된 JSON 조각일 수 있으니 무시하고 계속 */ }
        }
      }
      onDone(fullText);
    }catch(e){
      onError('Network/Stream error: ' + e.message);
    }
  }
 
  // 한글 음절의 받침이 ㅆ인지 확인 (갔어요, 왔어요처럼 았/었이 축약된 과거형 감지용)
  // 단, 있다(있어요)처럼 원래 어간 자체에 ㅆ받침이 있는 예외는 제외
  function hasSsBatchimBeforeEoyo(text){
    for(let i=0; i<text.length-2; i++){
      const ch = text[i];
      const code = text.charCodeAt(i);
      if(ch === '있') continue; // 있다 예외 (과거형 아님)
      if(code >= 0xAC00 && code <= 0xD7A3){
        const finalIdx = (code - 0xAC00) % 28;
        if(finalIdx === 20 && text.slice(i+1, i+3) === '어요'){ // 20 = ㅆ 받침
          return true;
        }
      }
    }
    return false;
  }
 
  // 주어진 한글 문장 안에 어떤 문법 포인트들이 들어있는지 찾아서 매칭된 것들을 전부 반환
  // hasHangulBoundary로 조사/어미가 다른 단어 중간에 우연히 낀 경우(가다의 '가', 에서의 '에')를 거른다.
  function detectGrammarInText(text){
    if(!text) return [];
    const found = [];
    for(const g of grammarData){
      const patterns = g.sentencePatterns && g.sentencePatterns.length
        ? g.sentencePatterns
        : g.grammar.split('/').map(s=>s.trim()).filter(Boolean);
      let hit = patterns.some(p => p && hasTrailingHangulBoundary(text, p));
      // G014(과거형)는 갔어요/왔어요처럼 축약된 형태도 별도 로직으로 추가 감지
      if(!hit && g.id === 'G014' && hasSsBatchimBeforeEoyo(text)) hit = true;
      if(hit) found.push(g);
    }
    return found;
  }
 
  // 현재 화면(퀴즈)에 나온 문장들 — Key Sentence / Related Words 를 최대 4개까지 가져옴
  function getPageSentences(){
    const list = [];
    try{
      const quiz = (typeof currentCategoryData !== 'undefined' && Array.isArray(currentCategoryData) && typeof currentIdx !== 'undefined')
        ? currentCategoryData[currentIdx] : null;
      if(quiz){
        if(Array.isArray(quiz.examples)){
          quiz.examples.forEach(e=>{ if(e && e.kr) list.push({ kr:e.kr, rom:e.rom||'', en:e.en||'' }); });
        }
        if(Array.isArray(quiz.options)){
          quiz.options.forEach(o=>{ if(o && o.kr) list.push({ kr:o.kr, rom:o.rom||'', en:o.en||'' }); });
        }
        if(list.length===0 && quiz.kr){
          list.push({ kr:quiz.kr, rom:quiz.rom||'', en:quiz.en||'' });
        }
      }
    }catch(e){ console.warn('[AI Tutor] getPageSentences error:', e); }
 
    // 혹시 위 방법으로 못 찾으면 화면(detail-area)에서 직접 긁어오기
    if(list.length===0){
      document.querySelectorAll('#detail-area li strong').forEach(el=>{
        const kr = el.innerText.trim();
        if(kr) list.push({ kr, rom:'', en:'' });
      });
    }
    return list.slice(0,4);
  }
 
  function makeActions(txt){var safe=txt.replace(/'/g,"").replace(/"/g,'').slice(0,400); return `<div class="ai-actions"><button class="ai-action-btn" onclick="navigator.clipboard.writeText('${safe}');this.innerText='✅ Copied!'">📋 Copy</button><button class="ai-action-btn" onclick="openShare('${safe}')">📤 Share</button><button class="ai-action-btn" onclick="let s=JSON.parse(localStorage.getItem('aiSaved')||'[]');s.push({txt:'${safe}',date:new Date().toLocaleDateString()});localStorage.setItem('aiSaved',JSON.stringify(s));this.innerText='❤ Saved!'">💾 Save</button></div>`;}
 
  // FAQ 칩 = 지금 화면(퀴즈)에 있는 Key Sentence / Related Words. 소개 문구(Native Tip 등)는 없음.
  function renderFaq(){
    var sentences = getPageSentences();
 
    if(sentences.length === 0){
      faq.innerHTML = '';
      log.innerHTML = `<div style="background:#f5f3ff;padding:12px;border-radius:14px;line-height:1.6;font-size:0.85rem;color:#64748b;">Ask me anything about Korean below!</div>`;
      faq.style.display='none';
      return;
    }
 
    faq.innerHTML = sentences.map((s,i) =>
      `<button class="faq-chip" data-sidx="${i}"><div>${s.kr}</div><div style="font-size:.72em;font-weight:600;opacity:.8;margin-top:2px;">${s.rom ? '('+s.rom+') ' : ''}${s.en || ''}</div></button>`
    ).join('');
 
    log.innerHTML = `<div style="background:#f5f3ff;padding:10px 12px;border-radius:14px;font-size:0.85rem;color:#64748b;">👆 Tap a sentence you studied above to see its grammar explained instantly.</div>`;
 
    faq.style.display='flex';
    log.scrollTop = 0;
 
    wrap.querySelectorAll('.faq-chip').forEach(c=>{
      c.onclick=()=>{
        const idx = parseInt(c.getAttribute('data-sidx'), 10);
        const s = sentences[idx];
        if(s) handleSentenceClick(s);
      };
    });
  }
 
  // 문장 칩 클릭 시: 문장 안 문법을 스캔해서 DB에 있는 건 즉시 렌더링, 없으면 일반 질문으로 처리(API)
  function handleSentenceClick(s){
    const label = s.en ? `${s.kr} (${s.en})` : s.kr;
    log.innerHTML += `<div style="align-self:flex-end;background:#6366f1;color:white;padding:8px 12px;border-radius:16px;max-width:82%;font-weight:700;font-size:0.9rem;">${s.kr}${s.rom?` <span style="opacity:.8;font-weight:500;">(${s.rom})</span>`:''}</div>`;
    faq.style.display='none';
    log.scrollTop = log.scrollHeight;
 
    const matches = detectGrammarInText(s.kr);
 
    if(matches.length > 0){
      let block = `<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">`
        + `<span class="ai-source-tag ai-source-db">📚 문장 속 문법 ${matches.length}개 발견 (API 호출 없음)</span>`;
      matches.forEach(g=>{
        block += `<div style="margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0;">`
          + `<div style="font-size:0.85rem;color:#6366f1;font-weight:800;margin-bottom:6px;">🤖 ${g.grammar} (${g.id})</div>`
          + renderFromDB(g, {kr:s.kr, rom:s.rom, en:s.en})
          + `</div>`;
      });
      const plainForCopy = matches.map(g=>`${g.grammar} (${g.romanization}) ${g.title}`).join(' / ');
      block += makeActions(plainForCopy)
        + `<br><button onclick="document.getElementById('ai-faq-chips').style.display='flex'" style="margin-top:10px;padding:6px 12px;border-radius:20px;border:2px solid #e2e8f0;background:white;font-weight:800;cursor:pointer;font-size:0.8rem;">↩ Show questions</button></div>`;
      log.innerHTML += block;
      log.scrollTop = log.scrollHeight;
    } else {
      // DB에서 못 찾으면 일반 질문 흐름(Gemini)으로 넘김
      handleQuestion(s.kr);
    }
  }
 
  // gramForced: FAQ 칩 클릭 시 확정된 grammarData 항목(있으면 매칭 스킵하고 바로 사용)
  async function handleQuestion(q, gramForced){
    var ctx=getCtx();
    var grams = gramForced ? [gramForced] : findAllGrammarMatches(q);
 
    log.innerHTML+=`<div style="align-self:flex-end;background:#6366f1;color:white;padding:8px 12px;border-radius:16px;max-width:82%;font-weight:700;font-size:0.9rem;">${q}</div>`;
    faq.style.display='none';
 
    // ===== 케이스 1: DB에 매칭되는 문법 1개 이상 → API 호출 없이 순서대로 타이핑 표시 =====
    if(grams.length > 0){
      const cid = 'ai-content-' + Date.now();
      const tag = grams.length > 1 ? `📚 DB 즉시 답변 — ${grams.length}개 문법 매칭 (API 호출 없음)` : `📚 DB 즉시 답변 (API 호출 없음)`;
      log.innerHTML+=`<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">`
        + `<span class="ai-source-tag ai-source-db">${tag}</span>`
        + `<div id="${cid}"></div>`
        + `<div id="${cid}-actions"></div></div>`;
      log.scrollTop = log.scrollHeight;
      const container = document.getElementById(cid);
      let combinedPlain = '';
 
      function typeNext(idx){
        if(idx >= grams.length){
          const actionsEl = document.getElementById(cid+'-actions');
          if(actionsEl){
            actionsEl.innerHTML = makeActions(combinedPlain.slice(0,200))
              + `<br><button onclick="document.getElementById('ai-faq-chips').style.display='flex'" style="margin-top:10px;padding:6px 12px;border-radius:20px;border:2px solid #e2e8f0;background:white;font-weight:800;cursor:pointer;font-size:0.8rem;">↩ Show questions</button>`;
          }
          return;
        }
        const g = grams[idx];
        const headerDiv = document.createElement('div');
        headerDiv.style.cssText = `font-size:0.85rem;color:#6366f1;font-weight:800;margin:${idx>0 ? '14px 0 6px;padding-top:10px;border-top:1px dashed #e2e8f0;' : '6px 0;'}`;
        headerDiv.textContent = `🤖 ${g.grammar} (${g.id})`;
        container.appendChild(headerDiv);
        const bodyDiv = document.createElement('div');
        container.appendChild(bodyDiv);
        const finalAnswer = renderFromDB(g, ctx);
        combinedPlain += (idx>0?' / ':'') + finalAnswer.replace(/<[^>]*>/g,'').slice(0,150);
        typeWriterHTML(bodyDiv, finalAnswer, 6, ()=>{ typeNext(idx+1); });
      }
      typeNext(0);
      return; // API 호출 안 함
    }
 
    // ===== 케이스 2: DB에 없는 일반 질문 → Gemini API 스트리밍 호출 =====
    log.innerHTML+=`<div id="ai-thinking" style="background:#f8fafc;border:2px solid #e2e8f0;padding:10px 12px;border-radius:14px;font-size:0.85rem;color:#64748b;">🤖 DB에 없는 질문이라 Gemini에게 물어보는 중...</div>`;
    log.scrollTop=log.scrollHeight;
 
    if(!USE_GEMINI){
      const th0=document.getElementById('ai-thinking'); if(th0) th0.remove();
      const fallback = `<b>Short Answer</b><br>${ctx.kr} (${ctx.rom}) ${ctx.en}<br><br><b>Excellent! Keep practicing. You are improving every day.</b>`;
      log.innerHTML+=`<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">${fallback}</div>`;
      log.scrollTop=log.scrollHeight;
      return;
    }
 
    const userText = V21_USER_TEMPLATE.replace('{kr}',ctx.kr).replace('{rom}',ctx.rom).replace('{en}',ctx.en).replace('{q}',q);
    const cid2 = 'ai-content-' + Date.now();
    let wrapperInserted = false;
    let rawFullText = '';
 
    function ensureWrapper(){
      if(wrapperInserted) return;
      wrapperInserted = true;
      const th=document.getElementById('ai-thinking'); if(th) th.remove();
      log.innerHTML+=`<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">`
        + `<span class="ai-source-tag ai-source-api">🌐 Gemini API 응답 (실시간)</span><br>`
        + `<div style="font-size:0.85rem;color:#6366f1;font-weight:800;margin:6px 0;">🤖 V2.1 Answer</div>`
        + `<div id="${cid2}"></div><div id="${cid2}-actions"></div></div>`;
      log.scrollTop = log.scrollHeight;
    }
 
    streamGemini(
      V21_SYSTEM,
      userText,
      // onChunk: 새 텍스트 조각이 도착할 때마다 실시간으로 화면 업데이트
      (accumulatedText)=>{
        ensureWrapper();
        rawFullText = accumulatedText;
        const el = document.getElementById(cid2);
        if(el){ el.innerHTML = escapeAndBr(accumulatedText); log.scrollTop = log.scrollHeight; }
      },
      // onDone: 스트리밍 끝나면 버튼 표시
      (finalText)=>{
        ensureWrapper();
        const finalAnswer = escapeAndBr(finalText || rawFullText || '');
        const el = document.getElementById(cid2);
        if(el) el.innerHTML = finalAnswer;
        const actionsEl2 = document.getElementById(cid2+'-actions');
        if(actionsEl2){
          actionsEl2.innerHTML = makeActions((finalText||'').slice(0,200))
            + `<br><button onclick="document.getElementById('ai-faq-chips').style.display='flex'" style="margin-top:10px;padding:6px 12px;border-radius:20px;border:2px solid #e2e8f0;background:white;font-weight:800;cursor:pointer;font-size:0.8rem;">↩ Show questions</button>`;
        }
        log.scrollTop = log.scrollHeight;
      },
      // onError: 스트리밍 실패 시 로컬 대체 답변 + 에러 표시
      (errMsg)=>{
        console.error('[AI Tutor] Stream error:', errMsg);
        const th=document.getElementById('ai-thinking'); if(th) th.remove();
        const fallback = `<b>Short Answer</b><br>${ctx.kr} (${ctx.rom}) ${ctx.en}<br><br><b>Excellent! Keep practicing. You are improving every day.</b>`;
        log.innerHTML+=`<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">`
          + `<div id="ai-error-box">⚠️ Gemini 스트리밍 실패, 기본 답변으로 대체했어요.<br>에러: ${errMsg}</div>`
          + `<div style="font-size:0.85rem;color:#6366f1;font-weight:800;margin:6px 0;">🤖 V2.1 Answer</div>${fallback}</div>`;
        log.scrollTop = log.scrollHeight;
      }
    );
  }
 
  window.openShare=openShare;
  btn.onclick=()=>{open=!open; modal.style.display=open?'flex':'none'; if(open) renderFaq();};
  wrap.querySelector('#ai-x').onclick=()=>{open=false; modal.style.display='none';};
  input.addEventListener('keypress',e=>{if(e.key==='Enter'&&e.target.value.trim()){var q=e.target.value.trim(); e.target.value=''; handleQuestion(q);}});
  wrap.querySelector('#ai-send-btn').onclick=()=>{ var q=input.value.trim(); if(q){ input.value=''; handleQuestion(q); } };
 
  window.showAiTutor=()=>{var d=document.getElementById('detail-area'); if(d&&d.style.display!=='none'&&d.innerText.includes('Correct')){btn.style.display='flex';}};
  window.hideAiTutor=()=>{btn.style.display='none'; modal.style.display='none'; open=false;};
  var oldR=window.renderLearningProgress; window.renderLearningProgress=function(){if(oldR) oldR(); setTimeout(window.showAiTutor,300);};
 
  console.log('✅ AI Tutor loaded! Grammar DB entries:', grammarData.length, '(local render, no API for matched grammar)');
  console.log(USE_GEMINI?'✅ Gemini fallback ready for general questions':'⚠️ Gemini disabled');
})();
