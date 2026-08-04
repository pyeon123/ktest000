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

// 🌐 [전역화] 관련 퀴즈(Related) 추천 + My Review List 기능이 공통으로 참조하는 데이터[cite: 2]
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

function visitFacebook() {
    window.open("https://www.facebook.com/profile.php?id=100091484077264", "_blank");
}

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
    if (!list || typeof allQuizData === 'undefined') return;

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
        "cat_25": "sentencelover1.html",
        "cat_26": "sentencefriend1.html",
    };

    let html = "";
    Object.keys(allQuizData).forEach(catId => {
        const cat = allQuizData[catId];
        const targetUrl = fileMapping[catId] || "index.html"; 

        html += `
            <a href="${targetUrl}" target="_top" class="cat-btn" style="text-decoration:none; color:inherit; display:block;">
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

    injectQuizSchema({ question: data.kr, answer: data.en });

    if (autoSpeak) { setTimeout(speak, 1000); }
}

// =============================
// Learning Progress (3000 Lessons)
// =============================
function renderLearningProgress() {
    const TOTAL_LESSONS = 3000;
    const currentPage = window.location.pathname.split("/").pop();
    let learnedPages = JSON.parse(localStorage.getItem("learnedPages") || "[]");
    
    if (!learnedPages.includes(currentPage)) {
        learnedPages.push(currentPage);
        localStorage.setItem("learnedPages", JSON.stringify(learnedPages));
    }
    
    const learned = learnedPages.length;
    const percent = Math.min((learned / TOTAL_LESSONS) * 100, 100);
    
    const progressHtml = `
    <div style="
        margin:18px 0;
        padding:18px;
        background:#fff;
        border:2px solid #e5e7eb;
        border-radius:14px;
        text-align:center;
        box-shadow:0 3px 10px rgba(0,0,0,.05);">
        <div style="font-size:1.2rem;font-weight:bold;color:#2563eb;">
            📚 Your Korean Learning Progress
        </div>
        <div style="font-size:1.6rem;font-weight:bold;margin-top:12px;">
            ${learned} / ${TOTAL_LESSONS} Lessons
        </div>
        <div style="
            width:100%;
            height:16px;
            background:#e5e7eb;
            border-radius:20px;
            overflow:hidden;
            margin-top:15px;">
            <div style="
                width:${percent}%;
                height:100%;
                background:linear-gradient(90deg,#22c55e,#16a34a);
                transition:.5s;">
            </div>
        </div>
        <div style="
            margin-top:10px;
            font-weight:bold;
            color:#16a34a;">
            ${percent.toFixed(1)}% Completed
        </div>
        <div style="
            margin-top:12px;
            color:#64748b;
            font-size:14px;">
           🔥 Complete all 3,000 lessons and the Korean government might send you a Kimchi Refrigerator! 🧊
        </div>
    </div>`;

    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.insertAdjacentHTML("afterend", progressHtml);
    }
}

// =============================
// ❤️ My Review List
// =============================
function toggleFavorite() {
    const currentFile = window.location.pathname.split("/").pop();
    const currentItem = quizDB.find(item => item.url === currentFile);
    if (!currentItem) return;

    let favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
    const index = favorites.findIndex(x => x.url === currentItem.url);

    if (index === -1) {
        favorites.push(currentItem);
    } else {
        favorites.splice(index, 1);
    }

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
        btn.innerHTML = "❤️ Saved to My Review List";
        btn.style.background = "#dc2626";
        btn.style.color = "#ffffff";
        btn.style.borderColor = "#dc2626";
    } else {
        btn.innerHTML = "🤍 Save to My Review List";
        btn.style.background = "#ffffff";
        btn.style.color = "#dc2626";
        btn.style.borderColor = "#fecaca";
    }
}


function renderFavoriteBox() {
    const box = document.getElementById("favorite-box");
    if (!box) return;

    // 박스 자체를 다른 박스(search-container)와 동일 규격으로 맞춤
    box.style.position = "relative";
    box.style.width = "100%";
    box.style.maxWidth = "500px";
    box.style.margin = "0 auto 25px auto";
    box.style.padding = "0 15px";
    box.style.boxSizing = "border-box";

    const favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");

    if (favorites.length === 0) {
        box.innerHTML = `
        <div style="
            width:100%;
            box-sizing:border-box;
            background:#fff;
            border:2px dashed #fecaca;
            border-radius:12px;
            padding:18px;
            text-align:center;
            color:#94a3b8;
        ">
            <div style="font-size:1.05rem; font-weight:bold; color:#dc2626; margin-bottom:6px;">📖 My Review List (0)</div>
            <div style="font-size:0.85rem; line-height:1.4;">Tap 🤍 Save on the quiz page</div>
        </div>`;
        return;
    }

    const showList = favorites.slice(0, 20);

    box.innerHTML = `
        <div style="
            width:100%;
            box-sizing:border-box;
            background:#fff;
            border:2px solid #fecaca;
            border-radius:12px;
            box-shadow:0 3px 10px rgba(0,0,0,.05);
            overflow:hidden;
        ">
            <button
                onclick="openFavoriteList()"
                style="
                    width:100%;
                    padding:16px 18px;
                    border:none;
                    background:#fff;
                    cursor:pointer;
                    font-size:1rem;
                    font-weight:bold;
                    color:#dc2626;
                    box-sizing:border-box;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                ">
                <span>📖 My Review List (${favorites.length})</span>
                <span>▼</span>
            </button>

            <div id="favorite-list-content" style="display:none;">
                ${showList.map(item => `
                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        padding:10px 16px;
                        border-top:1px solid #f1f5f9;
                    ">
                        <a href="${item.url}"
                           style="
                                flex:1;
                                text-decoration:none;
                                color:#2563eb;
                                font-weight:bold;
                                font-size:0.95rem;
                                white-space:nowrap;
                                overflow:hidden;
                                text-overflow:ellipsis;
                           ">
                            📖 ${item.title}
                        </a>
                        <span
                            onclick="removeFavorite('${item.url}')"
                            title="Remove"
                            style="
                                cursor:pointer;
                                font-size:20px;
                                margin-left:10px;
                                flex-shrink:0;
                            ">
                            ❤️
                        </span>
                    </div>
                `).join("")}

                ${
                    favorites.length > 20
                    ? `
                    <div style="
                        padding:10px;
                        text-align:center;
                        color:#64748b;
                        font-weight:bold;
                        border-top:1px solid #f1f5f9;
                        font-size:0.85rem;
                    ">
                        + ${favorites.length - 20} more...
                    </div>
                    `
                    : ""
                }

                <button
                    onclick="closeFavoriteList()"
                    style="
                        display:block;
                        width:calc(100% - 32px);
                        margin:12px auto 14px;
                        padding:10px;
                        border:1px solid #fecaca;
                        border-radius:10px;
                        background:#fff;
                        color:#dc2626;
                        font-weight:bold;
                        cursor:pointer;
                    ">
                    ✕ Close
                </button>
            </div>
        </div>
    `;
}


function openFavoriteList() {
    const content = document.getElementById("favorite-list-content");
    if (!content) return;
    content.style.display = "block";
}

function closeFavoriteList() {
    const content = document.getElementById("favorite-list-content");
    if (!content) return;
    content.style.display = "none";
}

function removeFavorite(url) {
    let favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
    favorites = favorites.filter(x => x.url !== url);
    localStorage.setItem("favoriteLessons", JSON.stringify(favorites));
    renderFavoriteBox();
    updateFavoriteButton();
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

        const currentFileName = window.location.pathname.split("/").pop();
        const currentItem = quizDB.find(item => item.url === currentFileName);

        const currentKeywords = currentItem
            ? currentItem.keywords.toLowerCase().split(" ")
            : [];

        const relatedList = quizDB
            .filter(item => item.url !== currentFileName)
            .map(item => {
                const words = item.keywords.toLowerCase().split(" ");
                const score = words.filter(w => currentKeywords.includes(w)).length;
                return { ...item, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);

        const chosenList = relatedList.slice(0, 3);

        const recHtml = chosenList.length > 0 ? `
        <div style="margin-bottom:15px;">
            <div style="font-size:0.9rem;font-weight:bold;color:#64748b;margin-bottom:8px;text-align:center;">
                🔄 Related
            </div>

            <div style="display:flex;gap:8px;">
                ${chosenList.map(item => `
                    <button class="rec-btn-item"
                        data-target="${item.url}"
                        style="flex:1;padding:12px 8px;background:#f8fafc;border:2px dashed #cbd5e1;border-radius:10px;cursor:pointer;font-size:0.9rem;font-weight:bold;color:#475569;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                        📚 ${item.title}
                    </button>
                `).join("")}
            </div>
        </div>
        ` : "";

        // ❤️ My Review List 하트 버튼 (Related 바로 위에 표시)
        const favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
        const isSaved = favorites.some(x => x.url === currentFileName);

        const favoriteHtml = `
            <button id="favorite-btn" onclick="toggleFavorite()" style="
                display:block;
                width:100%;
                margin:0 0 15px 0;
                padding:12px 24px;
                font-size:15px;
                font-weight:bold;
                border-radius:30px;
                cursor:pointer;
                transition:all 0.2s ease;
                box-shadow:0 4px 10px rgba(0,0,0,0.08);
                border:2px solid ${isSaved ? '#dc2626' : '#fecaca'};
                background:${isSaved ? '#dc2626' : '#ffffff'};
                color:${isSaved ? '#ffffff' : '#dc2626'};
            ">
                ${isSaved ? '❤️ Saved to My Review List' : '🤍 Save to My Review List'}
            </button>`;

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

        let grammarHtml = "";
        if (quiz.grammar && Array.isArray(quiz.grammar.breakdown)) {
            grammarHtml = `
                <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 10px; border-left: 4px solid #3b82f6;">
                    <h4 style="margin: 0 0 10px 0; color: #1e293b;">${quiz.grammar.title || '📚 Simple Grammar'}</h4>
                    ${quiz.grammar.breakdown.map(b => `
                        <p style="margin: 5px 0; font-size: 0.95rem; color: #334155;">
                            <strong>${b.kr}</strong> <span style="color:#64748b;">(${b.rom})</span> — ${b.en}
                        </p>
                    `).join('')}
                    <p style="margin-top: 10px; font-weight: 700; color: #1e40af;">${quiz.grammar.meaning || ''}</p>
                </div>
            `;
        }

        let optionsHtml = "";
        if (quiz.options && Array.isArray(quiz.options)) {
            const showOptionAudio = quiz.optionAudio === true;

            optionsHtml = `<h3 style="margin-top: 25px; color: #1e293b;">💡 Related Words</h3>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                ${quiz.options.map((opt, idx) => `
                <div style="padding: 12px 15px; background: #f1f5f9; border-radius: 10px; border-left: 4px solid #64748b; display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 1.2rem; color: #1e293b;">${opt.kr}</strong>
                            <span style="font-size: 0.95rem; color: #64748b; margin-left: 6px;">(${opt.rom})</span>
                        </div>
                        <span style="font-size: 1.05rem; font-weight: bold; color: #475569;">${opt.en}</span>
                    </div>
                    ${showOptionAudio ? `
                    <div class="control-group" style="scale: 0.85; margin: 0; justify-content: center; gap: 10px;">
                        <button class="btn-main" onclick="event.stopPropagation(); window.speakOption('${opt.kr.replace(/'/g, "\\'")}')">
                            <span class="icon">🔊</span><span style="font-size: 0.8rem;">LISTEN</span>
                        </button>
                        <button class="btn-main" id="opt-mic-btn-${idx}" onclick="event.stopPropagation(); window.startOptionMic('${opt.kr.replace(/'/g, "\\'")}', 'opt-feedback-${idx}')">
                            <span class="icon">🎤</span><span style="font-size: 0.8rem;">SPEAK</span>
                        </button>
                    </div>
                    <div id="opt-feedback-${idx}" style="height: 20px; font-weight: 900; font-size: 1rem; text-align: center;"></div>
                    ` : ``}
                </div>
                `).join('')}
            </div>`;
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
                ${grammarHtml}
                ${optionsHtml}
                ${examplesHtml}
                
                <div style="margin-top: 25px;">
                    ${favoriteHtml}
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

        document.querySelectorAll('.rec-btn-item').forEach(btn => {
            btn.onclick = () => {
                const targetFile = btn.getAttribute('data-target') || "index.html";
                window.location.href = targetFile;
            };
        });

        renderLearningProgress();

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

    renderFavoriteBox();

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

function speakOption(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "ko-KR";
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
}

function startOptionMic(targetText, feedbackId) {
    if (!recognition) {
        alert("Speech recognition is not supported.");
        return;
    }
    resetRecognitionState();

    const feedback = document.getElementById(feedbackId);

    recognition.start();

    if (feedback) {
        feedback.textContent = "Please speak now...";
        feedback.style.color = "#4f46e5";
    }

    silenceTimer = setTimeout(() => {
        resetRecognitionState();
        if (feedback) {
            feedback.textContent = "No voice detected. Try again!";
            feedback.style.color = "#ef4444";
        }
    }, 4200);

    recognition.onresult = (event) => {
        clearTimeout(silenceTimer);
        const speech = event.results[0][0].transcript;
        const target = targetText.replace(/[?!\s~,.]/g, '');
        const voiced = speech.replace(/[?!\s~,.]/g, '');

        if (feedback) {
            if (voiced.includes(target) || target.includes(voiced)) {
                feedback.textContent = "Excellent! 🎉";
                feedback.style.color = "#22c55e";
            } else {
                feedback.textContent = "Try Again! ❌";
                feedback.style.color = "#ef4444";
            }
        }
    };

    recognition.onerror = () => {
        clearTimeout(silenceTimer);
        resetRecognitionState();
        if (feedback) {
            feedback.textContent = "Error occurred. Try again.";
            feedback.style.color = "#ef4444";
        }
    };
}

function injectQuizSchema(data) {
    const oldSchema = document.getElementById('quiz-schema');
    if (oldSchema) oldSchema.remove();

    if (!data) return;

    const qText = data.question || data.q || "No question provided";
    const aText = data.answer || data.a || "No answer provided";

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Quiz",
        "name": document.title,
        "hasPart": {
            "@type": "Question",
            "name": qText, 
            "acceptedAnswer": {
                "@type": "Answer",
                "text": aText
            }
        }
    };

    const script = document.createElement('script');
    script.id = 'quiz-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

// ===== FIXED: Search + Trending + ABC + Footer (merged from index.html) =====
function autoSearch() {
    const input = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const container = document.getElementById('resultContainer');
    const list = document.getElementById('resultsList');
    if (!container || !list) return;
    if (input.length < 1) { container.style.display = "none"; return; }
    container.style.display = "block";
    list.innerHTML = "";
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
    container.style.display = "block";
    list.innerHTML = "";
    let found = false;
    (window.quizDB || []).forEach(item => {
        if (item.title.toLowerCase().includes(input) || item.keywords.toLowerCase().includes(input)) {
            list.innerHTML += `<li style="border-bottom: 1px solid #eee;"><a href="${item.url}" style="display: block; padding: 15px; text-decoration:none; color:#333;">${item.title}</a></li>`;
            found = true;
        }
    });
    if (!found) list.innerHTML = `<li style="padding: 15px; color:#999;">관련 퀴즈가 없습니다.</li>`;
}

// Close search when clicking outside
document.addEventListener('click', function(e) {
    const c1 = document.getElementById('resultContainer');
    const i1 = document.getElementById('searchInput');
    if (c1 && i1 && !c1.contains(e.target) && e.target !== i1) c1.style.display = "none";
    const c2 = document.getElementById('resultContainerTop');
    const i2 = document.getElementById('searchInputTop');
    if (c2 && i2 && !c2.contains(e.target) && e.target !== i2) c2.style.display = "none";
});

// Trending + ABC
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

// Footer About Us - fixed event param
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


// ===== FIX: 모든 개별 페이지 트렌드 쏠림 강제 교정 (예쁘게) =====
(function injectTrendingPrettyFix(){
  const css = `
.trending-container{width:100%!important;max-width:600px!important;margin:30px auto 20px auto!important;background:#fff!important;border:1px solid #e2e8f0!important;border-radius:16px!important;box-shadow:0 8px 24px rgba(0,0,0,0.06)!important;overflow:hidden!important;box-sizing:border-box!important;display:block!important;float:none!important}
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

/* 원래 옵션 선택지 스타일 복구 - mother / relative / sister 밀림 해결 */
.options-container, #options-container, #today-options, #alphabet-word-list{
  display:grid!important;
  grid-template-columns:1fr!important;
  gap:12px!important;
  width:100%!important;
  max-width:500px!important;
  margin: 0 auto!important;
  box-sizing:border-box!important;
}
.opt-item{
  display:flex!important;
  align-items:center!important;
  justify-content:center!important;
  width:100%!important;
  padding:16px 18px!important;
  background:#ffffff!important;
  border:2px solid #e2e8f0!important;
  border-radius:12px!important;
  font-size:1.1rem!important;
  font-weight:600!important;
  color:#334155!important;
  cursor:pointer!important;
  text-align:center!important;
  box-sizing:border-box!important;
  transition:all 0.2s!important;
}
.opt-item:hover{border-color:#4f46e5!important;background:#f8fafc!important}
body,main,.wrapper,.container,.main-container,.app-container{overflow-x:hidden!important}
@media(max-width:768px){
  .quiz-app{width:100%!important;max-width:100%!important;box-sizing:border-box!important}
  .content-area{width:100%!important;max-width:100%!important;padding:10px!important;box-sizing:border-box!important}
  .trending-container{max-width:95%!important;margin:20px auto!important}
}

`;
  const style = document.createElement('style');
  style.id = 'trending-pretty-fix';
  style.textContent = css;
  document.head.appendChild(style);
})();







// ===== FIX: ABOUT US 메인/개별 전부 안열림 완전 복구 - 최종 =====
(function fixKFreeFooterFinal(){
  function robustToggle(eOrSection, maybeSection){
    let section, evt;
    if (maybeSection) {
      evt = eOrSection;
      section = maybeSection;
    } else {
      section = eOrSection;
      evt = window.event || null;
    }
    if (evt && evt.preventDefault) { try{evt.preventDefault();}catch(x){} }
    if (!section) return false;
    section = String(section).trim().toLowerCase();
    // about / privacy / terms / contact 매칭
    if (section.includes('about')) section='about';
    else if (section.includes('privacy')) section='privacy';
    else if (section.includes('terms') || section.includes('service')) section='terms';
    else if (section.includes('contact') || section.includes('disclaimer')) section='contact';

    const target = document.getElementById(`kfree-content-${section}`);
    if (!target) { console.log('kfree target not found', section); return false; }
    const allContents = document.querySelectorAll('.kfree-info-content');
    const allButtons = document.querySelectorAll('.kfree-tab-btn');
    const isActive = target.classList.contains('active');

    allContents.forEach(c => c.classList.remove('active'));
    allButtons.forEach(b => b.classList.remove('active'));

    if (!isActive) {
      target.classList.add('active');
      target.style.display = 'block';
      // 버튼 active
      let clickedBtn = null;
      if (evt) {
        if (evt.currentTarget && evt.currentTarget.classList.contains('kfree-tab-btn')) clickedBtn = evt.currentTarget;
        else if (evt.target) clickedBtn = evt.target.closest ? evt.target.closest('.kfree-tab-btn') : null;
      }
      if (!clickedBtn) {
        document.querySelectorAll('.kfree-tab-btn').forEach(b=>{
          const on = (b.getAttribute('onclick')||"").toLowerCase();
          const txt = (b.textContent||"").toLowerCase();
          if (on.includes(section) || txt.includes(section) || (section==='terms' && txt.includes('terms')) || (section==='contact' && txt.includes('contact'))) {
            clickedBtn = b;
          }
        });
      }
      if (clickedBtn) clickedBtn.classList.add('active');
      // 스크롤 살짝
      setTimeout(()=>{ try{target.scrollIntoView({behavior:'smooth', block:'nearest'});}catch(e){} }, 100);
    } else {
      allContents.forEach(c => { c.style.display = 'none'; });
    }
    return false;
  }

  window.toggleKFreeInfo = robustToggle;

  function attach(){
    document.querySelectorAll('.kfree-tab-btn').forEach(btn=>{
      if (btn.dataset.kfreeFixed === "1") return;
      btn.dataset.kfreeFixed = "1";
      // 기존 인라인 onclick 제거해서 에러 방지
      const oldOnclick = btn.getAttribute('onclick');
      if (oldOnclick) {
        btn.setAttribute('data-old-onclick', oldOnclick);
        btn.removeAttribute('onclick');
      }
      btn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
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
    // 콘텐츠 초기 상태 정리 - display none 강제
    document.querySelectorAll('.kfree-info-content').forEach(el=>{
      if (!el.classList.contains('active')) el.style.display = 'none';
      else el.style.display = 'block';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
  setTimeout(attach, 500);
  setTimeout(()=>{ window.toggleKFreeInfo = robustToggle; attach(); }, 1500);
})();

// ===== AI Tutor Floating Button - Auto Inject for Quiz Pages =====
(function() {
  // 메인 페이지는 제외, 퀴즈 요소가 있는 페이지만
  const isQuizPage = document.querySelector('.kr-text') || document.getElementById('quiz-screen') || location.pathname.includes('/quiz/') || location.pathname.includes('/phrases/');
  if (!isQuizPage) return; // index.html에서는 안 뜸

  // CSS 주입
  const style = document.createElement('style');
  style.innerHTML = `
    #ai-tutor-btn{position:fixed!important;bottom:90px!important;right:18px!important;width:60px!important;height:60px!important;border-radius:50%!important;background:#4f46e5!important;color:white!important;border:2px solid #3730a3!important;border-bottom-width:4px!important;font-size:1.6rem!important;cursor:pointer!important;z-index:9999!important;box-shadow:0 6px 16px rgba(79,70,229,0.35)!important;display:flex!important;align-items:center!important;justify-content:center!important;animation:tutorPulse 2.5s infinite;}
    @keyframes tutorPulse{0%{box-shadow:0 0 0 0 rgba(79,70,229,0.5)}70%{box-shadow:0 0 0 12px rgba(79,70,229,0)}100%{box-shadow:0 0 rgba(79,70,229,0)}}
    #ai-tutor-btn:active{transform:translateY(2px);border-bottom-width:2px!important;}
    #ai-tutor-modal{display:none;position:fixed!important;bottom:160px!important;right:18px!important;width:360px!important;max-width:92vw!important;height:460px!important;background:white!important;border:2px solid #e2e8f0!important;border-bottom-width:4px!important;border-radius:20px!important;z-index:9999!important;flex-direction:column!important;overflow:hidden!important;box-shadow:0 10px 30px rgba(0,0,0,0.15)!important;}
  `;
  document.head.appendChild(style);

  // HTML 주입
  const html = `
    <button id="ai-tutor-btn">💬</button>
    <div id="ai-tutor-modal">
      <div style="padding:14px 16px;font-weight:900;border-bottom:2px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;font-family:'Nunito';">
        <span>🤖 AI Tutor</span>
        <span id="ai-tutor-close" style="cursor:pointer;padding:4px 8px;background:#f1f5f9;border-radius:8px;">✖</span>
      </div>
      <div id="ai-chat-log" style="flex:1;overflow-y:auto;padding:12px;font-size:0.9rem;line-height:1.4;">
        <div style="background:#f5f3ff;padding:10px;border-radius:12px;margin-bottom:8px;"><b>AI:</b> Ask me about "<span id="tutor-current-kr" style="color:#4f46e5;">this sentence</span>"! 👋</div>
      </div>
      <div style="padding:10px;display:flex;gap:8px;border-top:2px solid #f1f5f9;">
        <input id="ai-input" placeholder="Why -요? Meaning?" style="flex:1;padding:12px;border-radius:12px;border:2px solid #e2e8f0;font-weight:700;outline:none;">
        <button id="ai-ask-btn" style="padding:10px 16px;background:#4f46e5;color:white;border:2px solid #3730a3;border-bottom-width:4px;border-radius:12px;font-weight:900;cursor:pointer;">Ask</button>
      </div>
    </div>
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // 로직
  let tutorOpen = false;
  const btn = document.getElementById('ai-tutor-btn');
  const modal = document.getElementById('ai-tutor-modal');
  const close = document.getElementById('ai-tutor-close');
  
  function toggleTutor() {
    tutorOpen = !tutorOpen;
    modal.style.display = tutorOpen ? 'flex' : 'none';
    const krEl = document.querySelector('.kr-text');
    if (krEl) document.getElementById('tutor-current-kr').innerText = krEl.innerText.slice(0,18);
  }
  btn.addEventListener('click', toggleTutor);
  close.addEventListener('click', toggleTutor);

  window.askTutor = async function() {
    const input = document.getElementById('ai-input');
    const q = input.value.trim();
    if(!q) return;
    const log = document.getElementById('ai-chat-log');
    log.innerHTML += `<div style="text-align:right;margin:6px 0;"><span style="background:#4f46e5;color:white;padding:8px 12px;border-radius:16px 16px 4px 16px;display:inline-block;font-weight:700;">${q}</span></div>`;
    input.value = '';
    log.scrollTop = log.scrollHeight;
    
    // API 연동 전까지 임시
    setTimeout(()=> {
      log.innerHTML += `<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:10px;border-radius:12px;margin:6px 0;"><b>AI:</b> Good question! (API 연결하면 진짜 답 와요)</div>`;
      log.scrollTop = log.scrollHeight;
    }, 400);
  };
  
  document.getElementById('ai-ask-btn').addEventListener('click', window.askTutor);
  document.getElementById('ai-input').addEventListener('keypress', (e)=>{ if(e.key==='Enter') window.askTutor(); });
})();
// ===== End AI Tutor =====
