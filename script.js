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

// ==================== 여기서부터 원본 파일의 "AI TUTOR V2.1" IIFE를 이걸로 통째로 교체하세요 ====================
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
    grammar: "에",
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
    keywords: ["and then", "geurigo", "sentence connector"],
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
  
      }
    }
    // ⬅️ 여기 계속 G021, G022... G120 까지 같은 형식으로 추가하면 됩니다.
    // id, grammar, romanization, title, examples, nativeTip, commonMistakes, compare,
    // miniQuiz, practiceChallenge 필드만 채우면 자동으로 로컬 렌더링됩니다.
    // ⭐ keywords 필드를 꼭 추가하세요! 외국인 사용자는 영어로 질문하므로,
    //    이 문법을 물어볼 때 쓸 만한 영어 단어/구문을 최대한 다양하게 넣어주세요.
    //    예: keywords: ["location marker","at","in","place","time","e-seo"]
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

    // 3순위: 로마자 조각 매칭 (keywords에 없는 경우 대비 백업)
    for(const g of grammarData){
      const romParts = g.romanization.split('/').map(s=>s.trim().toLowerCase()).filter(Boolean);
      if(romParts.some(p => p.length>=2 && hasWordBoundary(norm, p))) addIfNew(g);
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

INSTRUCTION:
Current sentence on page: {kr} ({rom}) - {en}
Student question: {q}
This question is NOT about a grammar point already in our Grammar DB, so answer generally using the rules above.
Use page sentence {kr} as main example first.
Every Korean must have (Roman) English.
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
  async function streamGemini(prompt, onChunk, onDone, onError){
    try{
      const res = await fetch(GEMINI_STREAM_ENDPOINT, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          contents:[{parts:[{text:prompt}]}],
          generationConfig: { maxOutputTokens: 1500, temperature: 0.6 }
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

    const prompt = V21_SYSTEM.replace('{kr}',ctx.kr).replace('{rom}',ctx.rom).replace('{en}',ctx.en).replace('{q}',q);
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
      prompt,
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



  



