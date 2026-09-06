console.log('🔥 AI_SCRIPT_CLEAN v999 - 절반높이+라벨삭제 버전 로드됨');
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
    { title: "Sick Leave", url: "byeongga.html", keywords: "sick leave medical leave illness absence" },
    { title: "Vacation", url: "hyuga.html", keywords: "vacation holiday time off leave" },
    { title: "Lateness", url: "jigak.html", keywords: "lateness late tardiness arriving late" },
    { title: "Leaving Early", url: "jotoe.html", keywords: "leaving early early departure leave work early" },
    { title: "Absence", url: "gyeolgeun.html", keywords: "absence absent missing work attendance" },
    { title: "Special Shift Work", url: "teukgeun.html", keywords: "special shift work special duty work shift" },
    { title: "Night Overtime", url: "yageun.html", keywords: "night overtime overtime work night shift" },
    { title: "Leave Work", url: "toegeun.html", keywords: "leave work clock out finish work leaving work" },
    { title: "Go to Work", url: "chulgeun.html", keywords: "go to work commute arrive at work attendance" },
    { title: "Remaining Work", url: "janeop.html", keywords: "remaining work unfinished work leftover work" },
    { title: "Foreman", url: "banjang.html", keywords: "foreman supervisor work leader" },
    { title: "Employer", url: "saeopju.html", keywords: "employer boss company owner" },
    { title: "Workplace", url: "geunmuji.html", keywords: "workplace place of work job site" },
    { title: "Contract Period", url: "gyeyak-gigan.html", keywords: "contract period employment period contract duration" },
    { title: "Labor Contract", url: "geunro-gyeyakseo.html", keywords: "labor contract employment contract work contract" },
    { title: "Payslip", url: "geupyeo-myeongseoseo.html", keywords: "payslip pay statement salary statement wage slip" },
    { title: "Allowance", url: "sudang.html", keywords: "allowance extra pay benefit work allowance" },
    { title: "Hourly Wage", url: "sigeup.html", keywords: "hourly wage hourly pay wage per hour" },
    { title: "Monthly Salary", url: "wolgeup.html", keywords: "monthly salary monthly pay wages" },
    { title: "Worker", url: "geunroja.html", keywords: "worker employee laborer" },
    { title: "Team Leader", url: "timjang.html", keywords: "team leader supervisor team manager" },
    { title: "President", url: "sajang.html", keywords: "president company president boss owner" },
    { title: "Co-worker", url: "dongryo.html", keywords: "co-worker coworker colleague workmate" },
    { title: "Shift Work", url: "gyodae-geunmu.html", keywords: "shift work rotating shifts work shift" },
    { title: "Base Pay", url: "gibongeup.html", keywords: "base pay basic salary basic wage" },
    { title: "Bonus", url: "sangyeogeum.html", keywords: "bonus incentive extra payment" },
    { title: "Deduction", url: "gongje.html", keywords: "deduction salary deduction wage deduction" },
    { title: "Tax", url: "segeum.html", keywords: "tax income tax wage tax" },
    { title: "Net Pay", url: "silsuryeongae.html", keywords: "net pay take home pay after tax" },
    { title: "Severance Pay", url: "toejikgeum.html", keywords: "severance pay retirement allowance retirement pay" },
    { title: "Dismissal / Firing", url: "haego.html", keywords: "dismissal firing termination fired from work" },
    { title: "Resignation", url: "sajik.html", keywords: "resignation quit leaving a job" },
    { title: "Re-contract / Renewal", url: "jaegyeyak.html", keywords: "re-contract renewal contract renewal employment renewal" },
    { title: "Probationary Period", url: "suseupgigan.html", keywords: "probationary period probation trial period" },
    { title: "Employment Rules", url: "chwieopgyuchik.html", keywords: "employment rules workplace rules labor rules" },
    { title: "Minimum Wage", url: "choejeoimgeum.html", keywords: "minimum wage lowest wage legal minimum pay" },
    { title: "Working Hours", url: "geunrosigan.html", keywords: "working hours work hours hours of work" },
    { title: "Annual Leave", url: "yeonchahyuga.html", keywords: "annual leave paid leave vacation days" },
    { title: "Monthly Leave", url: "wolcha.html", keywords: "monthly leave monthly vacation leave" },
    { title: "Alien Registration Card", url: "oegugindeungrokjeung.html", keywords: "alien registration card ARC foreigner registration card" },
    { title: "Passport", url: "yeogwon.html", keywords: "passport travel document" },
    { title: "Visa", url: "bija.html", keywords: "visa entry visa Korean visa" },
    { title: "Period of Stay", url: "cheryugigan.html", keywords: "period of stay length of stay visa stay period" },
    { title: "Extension of Stay", url: "cheryuyeonjang.html", keywords: "extension of stay visa extension stay extension" },
    { title: "Re-entry", url: "jaeipguk.html", keywords: "re-entry return to Korea reentry" },
    { title: "Ministry of Employment and Labor", url: "goyongnodongbu.html", keywords: "Ministry of Employment and Labor labor ministry employment ministry" },
    { title: "Employment Center", url: "goyongcenter.html", keywords: "employment center job center employment office" },
    { title: "Industrial Accident", url: "saneupjaehae.html", keywords: "industrial accident workplace accident work injury" },
    { title: "Industrial Accident Insurance", url: "sanjaeboheom.html", keywords: "industrial accident insurance workplace injury insurance" },
    { title: "National Health Insurance", url: "gukmingeongangboheom.html", keywords: "national health insurance health insurance Korea" },
    { title: "Application Form", url: "sincheongseo.html", keywords: "application form application document form" },
    { title: "Stamp / Seal", url: "dojang.html", keywords: "stamp seal official seal signature stamp" },
    { title: "Signature", url: "seomyeong.html", keywords: "signature sign signing" },
    { title: "ID Card", url: "sinbunjeung.html", keywords: "ID card identification identity card" },
    { title: "Exchange Rate", url: "hwanyul.html", keywords: "exchange rate currency exchange rate" },
    { title: "Money Transfer", url: "songgeum.html", keywords: "money transfer remittance send money" },
    { title: "Account Number", url: "gyejwabeonho.html", keywords: "account number bank account number" },
    { title: "Employment Insurance", url: "goyongboheom.html", keywords: "employment insurance unemployment insurance" },
    { title: "National Pension", url: "gukminyeongeum.html", keywords: "national pension pension Korea" },
    { title: "Bank Account", url: "tongjang.html", keywords: "bank account bankbook account" },
    { title: "Fee", url: "susuryo.html", keywords: "fee charge cost service fee" },
    { title: "Certificate", url: "jeungmyeongseo.html", keywords: "certificate document proof certification" },
    { title: "Reception / Filing", url: "jeopsu.html", keywords: "reception filing submission application received" },
    { title: "Approval", url: "seungin.html", keywords: "approval permission authorization approved" },
    { title: "Rejection", url: "geojeol.html", keywords: "rejection refusal rejected denial" },
    { title: "Consent / Agreement", url: "dongui.html", keywords: "consent agreement approval permission" },
    { title: "Documents", url: "eoryu.html", keywords: "documents paperwork papers forms" },
    { title: "Identity Verification", url: "sinwon_hwagin.html", keywords: "identity verification identity check identification" },
    { title: "Meal Allowance", url: "sikdae.html", keywords: "meal allowance food allowance meal benefit" },
    { title: "Dormitory", url: "gisuksa.html", keywords: "dormitory dorm accommodation worker housing" },
    { title: "Work", url: "jakeop.html", keywords: "work job task labor" },
    { title: "Process", url: "gongjeong.html", keywords: "process production manufacturing process" },
    { title: "Product", url: "jepum.html", keywords: "product goods manufactured product" },
    { title: "Parts", url: "bupum.html", keywords: "parts components machine parts" },
    { title: "Raw Materials", url: "wonjajae.html", keywords: "raw materials material manufacturing materials" },
    { title: "Packaging", url: "pojang.html", keywords: "packaging packing package" },
    { title: "Assembly", url: "jorip.html", keywords: "assembly assembling put together" },
    { title: "Transport", url: "unban.html", keywords: "transport transportation carrying moving goods" },
    { title: "Loading / Stacking", url: "jeokjae.html", keywords: "loading stacking loading goods cargo" },
    { title: "Inspection", url: "geomsa.html", keywords: "inspection examination quality inspection" },
    { title: "Sorting / Classification", url: "bunryu.html", keywords: "sorting classification categorize separate" },
    { title: "Processing / Machining", url: "gagong.html", keywords: "processing machining manufacturing processing" },
    { title: "Welding", url: "yongjeop.html", keywords: "welding weld welder" },
    { title: "Cutting", url: "jeoldan.html", keywords: "cutting cut material cutting work" },
    { title: "Quantity", url: "suryang.html", keywords: "quantity amount number of items" },
    { title: "Defective Product", url: "bulryangpum.html", keywords: "defective product defective goods faulty product" },
    { title: "Finished Product", url: "wanseongpum.html", keywords: "finished product completed product final product" },
    { title: "Delivery", url: "napgi.html", keywords: "delivery delivering goods delivery date" },
    { title: "Warehouse", url: "changgo.html", keywords: "warehouse storage warehouse goods" },
    { title: "Shipping Out", url: "chulha.html", keywords: "shipping out shipment dispatch goods" },
    { title: "Receiving Goods", url: "ipgo.html", keywords: "receiving goods receiving stock goods received" },
    { title: "Replacement", url: "gyoche.html", keywords: "replacement replace exchange change" },
    { title: "Checking / Inspection", url: "jeomgeom.html", keywords: "checking inspection checking condition examination" },
    { title: "Repair", url: "suri.html", keywords: "repair fixing maintenance repair work" },
    { title: "Washing / Cleaning", url: "secheok.html", keywords: "washing cleaning wash clean" },
    { title: "Drying", url: "geonjo.html", keywords: "drying dry drying process" },
    { title: "Polishing", url: "yeonma.html", keywords: "polishing grinding polishing work" },
    { title: "Plating", url: "dogeum.html", keywords: "plating metal plating coating" },
    { title: "Casting", url: "jujo.html", keywords: "casting metal casting molding" },
    { title: "Injection Molding", url: "sachul.html", keywords: "injection molding plastic molding molding process" },
    { title: "Pressing", url: "peureseu.html", keywords: "pressing press press work pressing process" },
    { title: "Cutting", url: "jaedan.html", keywords: "cutting cutting work cut material" },
    { title: "Sewing", url: "bongje.html", keywords: "sewing sewing work stitching" },
    { title: "Embroidery", url: "jasu.html", keywords: "embroidery embroidery work stitching" },
    { title: "Dyeing", url: "yeomsaek.html", keywords: "dyeing dye coloring textile dyeing" },
    { title: "Sorting", url: "seonbyeol.html", keywords: "sorting selection classification separate" },
    { title: "Measurement", url: "cheukjeong.html", keywords: "measurement measuring measure size" },
    { title: "Adjustment", url: "jojeol.html", keywords: "adjustment adjust control setting" },
    { title: "Fastening", url: "gojeong.html", keywords: "fastening fixing securing fasten" },
    { title: "Disassembly", url: "bunhae.html", keywords: "disassembly dismantling taking apart" },
    { title: "Joining", url: "gyeolhap.html", keywords: "joining connection connecting combine" },
    { title: "Unloading", url: "hayeok.html", keywords: "unloading unloading goods cargo" },
    { title: "Loading onto Vehicle", url: "sangcha.html", keywords: "loading onto vehicle loading cargo vehicle" },
    { title: "Unloading from Vehicle", url: "hacha.html", keywords: "unloading from vehicle unloading cargo vehicle" },
    { title: "Inventory / Stock", url: "jaego.html", keywords: "inventory stock goods in stock warehouse stock" },
    { title: "Shortage of Quantity", url: "suryangbujok.html", keywords: "shortage quantity shortage insufficient amount" },
    { title: "Damage / Breakage", url: "pason.html", keywords: "damage breakage damaged broken goods" },
    { title: "Standard / Specification", url: "gyugyeok.html", keywords: "standard specification requirements size specifications" },
    { title: "Dimensions / Size", url: "chisu.html", keywords: "dimensions size measurement length width height" },
    { title: "Weight", url: "muge.html", keywords: "weight heavy light kilograms weight measurement" },
    { title: "Capacity", url: "yongryang.html", keywords: "capacity volume maximum capacity amount" },
    { title: "Sample / Prototype", url: "sample_sijepum.html", keywords: "sample prototype test product model" },
    { title: "Production Volume", url: "saengsallyang.html", keywords: "production volume production quantity output" },
    { title: "Target Quantity", url: "mokpyoryang.html", keywords: "target quantity target amount production target" },
    { title: "Efficiency", url: "neungnyul.html", keywords: "efficiency productivity work efficiency" },
    { title: "Calibration", url: "gyojeong.html", keywords: "calibration adjustment measurement calibration" },
    { title: "Setting / Configuration", url: "seoljeong.html", keywords: "setting configuration setup machine setting" },
    { title: "Operation", url: "jakdong.html", keywords: "operation operating machine operation" },
    { title: "Stop / Halt", url: "jeongji.html", keywords: "stop halt shutdown machine stop" },
    { title: "Operation / Running", url: "gadong.html", keywords: "operation running machine running operating" },
    { title: "Overload", url: "gwabuhwa.html", keywords: "overload excessive load machine overload" },
    { title: "Malfunction", url: "ojakdong.html", keywords: "malfunction faulty operation abnormal operation" },
    { title: "Breakdown", url: "gojang.html", keywords: "breakdown machine failure equipment failure" },
    { title: "Neglect", url: "bangchi.html", keywords: "neglect leave unattended ignore" },
    { title: "Management / Care", url: "gwalli.html", keywords: "management care handling maintenance" },
    { title: "Maintenance", url: "yujibosu.html", keywords: "maintenance repair upkeep equipment maintenance" },
    { title: "Test Run", url: "siunjeon.html", keywords: "test run trial operation testing" },
    { title: "Waste Material", url: "pyegimul.html", keywords: "waste material waste scrap discarded material" },
    { title: "Residue", url: "janjaemul.html", keywords: "residue leftover material remaining material" },
    { title: "Recycling", url: "jaehwalyong.html", keywords: "recycling reuse recyclable material" },
    { title: "Collection", url: "sugeo.html", keywords: "collection gathering collecting waste" },
    { title: "Compression", url: "apchuk.html", keywords: "compression compress pressing" },
    { title: "Bundle", url: "mukkeum.html", keywords: "bundle bundling tie together package" },
    { title: "Labeling", url: "rabelling.html", keywords: "labeling label marking product label" },
    { title: "Barcode", url: "bakodeu.html", keywords: "barcode barcode scanner product code" },
    { title: "Serial Number", url: "ilryeonbeonho.html", keywords: "serial number identification number product number" },
    { title: "Quality Control", url: "pumjilgwanri.html", keywords: "quality control quality management inspection QC" },
    { title: "Improvement", url: "gongjeonggaeseon.html", keywords: "improvement process improvement production improvement" },
    { title: "Safety Helmet", url: "anjeonmo.html", keywords: "safety helmet hard hat protective helmet" },
    { title: "Safety Shoes", url: "anjeonhwa.html", keywords: "safety shoes protective footwear work shoes" },
    { title: "Safety Gloves", url: "anjeonjanggap.html", keywords: "safety gloves protective gloves work gloves" },
    { title: "Safety Goggles", url: "boangyeong.html", keywords: "safety goggles protective glasses eye protection" },
    { title: "Dust Mask", url: "bangjinmaseukeu.html", keywords: "dust mask protective mask respirator" },
    { title: "Earplug", url: "gwimagae.html", keywords: "earplug ear protection hearing protection" },
    { title: "Safety Harness", url: "anjeondae.html", keywords: "safety harness fall protection harness" },
    { title: "Emergency Exit", url: "bisanggu.html", keywords: "emergency exit escape exit evacuation" },
    { title: "Gas Mask", url: "bangdokmaseukeu.html", keywords: "gas mask respirator protective mask" },
    { title: "Fire Extinguisher", url: "sohwagi.html", keywords: "fire extinguisher fire safety extinguisher" },
    { title: "Alarm", url: "gyeongbogi.html", keywords: "alarm warning alarm safety alarm" },
    { title: "First Aid Kit", url: "gugeupham.html", keywords: "first aid kit emergency medical kit" },
    { title: "Electric Shock", url: "gamjeon.html", keywords: "electric shock electrical accident shock" },
    { title: "Fall from Height", url: "churak.html", keywords: "fall from height falling accident fall" },
    { title: "Slip / Trip", url: "jeondo.html", keywords: "slip trip falling accident slippery" },
    { title: "Jamming / Pinched", url: "hyeopchak.html", keywords: "jamming pinched caught accident machine" },
    { title: "Collision", url: "chungdol.html", keywords: "collision impact crash accident" },
    { title: "Fire", url: "hwajae.html", keywords: "fire workplace fire fire accident" },
    { title: "Explosion", url: "pokbal.html", keywords: "explosion explosive accident blast" },
    { title: "Burn", url: "hwasang.html", keywords: "burn burn injury heat injury" },
    { title: "Suffocation", url: "jilsik.html", keywords: "suffocation choking lack of oxygen" },
    { title: "Danger", url: "wiheom.html", keywords: "danger hazard risk dangerous" },
    { title: "Warning", url: "gyeonggo.html", keywords: "warning caution alert" },
    { title: "Prohibition", url: "geumji.html", keywords: "prohibition prohibited forbidden" },
    { title: "Caution", url: "juui.html", keywords: "caution care attention warning" },
    { title: "Maintenance", url: "jeongbi.html", keywords: "maintenance repair equipment servicing" },
    { title: "Cleaning", url: "cheongso.html", keywords: "cleaning clean workplace cleaning" },
    { title: "Tidying Up", url: "jeongrijeongdon.html", keywords: "tidying up organizing cleaning arrange" },
    { title: "Ventilation", url: "hwangi.html", keywords: "ventilation ventilation system air circulation" },
    { title: "Disinfection", url: "sodok.html", keywords: "disinfection disinfect sterilization" },
    { title: "Protective Gear", url: "bohogu.html", keywords: "protective gear safety equipment PPE" },
    { title: "Electricity Leakage", url: "nujeon.html", keywords: "electricity leakage electrical leakage power leakage" },
    { title: "Short Circuit", url: "hapseon.html", keywords: "short circuit electrical short circuit" },
    { title: "Gas Leak", url: "gaseunuchul.html", keywords: "gas leak gas leakage leaking gas" },
    { title: "Hazardous Material", url: "yuhaemuljil.html", keywords: "hazardous material dangerous substance toxic material" },
    { title: "Flammability", url: "inhwasung.html", keywords: "flammability flammable fire risk" },
    { title: "Corrosiveness", url: "busiksung.html", keywords: "corrosiveness corrosive material corrosion" },
    { title: "Emergency Bell", url: "bisangbel.html", keywords: "emergency bell alarm safety bell" },
    { title: "Evacuation", url: "daepi.html", keywords: "evacuation escape emergency evacuation" },
    { title: "Report / Notification", url: "singo.html", keywords: "report notification report an accident notify" },
    { title: "First Aid", url: "eunggeupcheochi.html", keywords: "first aid emergency treatment immediate treatment" },
    { title: "Wound", url: "sangcheo.html", keywords: "wound cut injury wound care" },
    { title: "Injury", url: "busang.html", keywords: "injury accident injury hurt" },
    { title: "Fracture", url: "goljeol.html", keywords: "fracture broken bone bone fracture" },
    { title: "Bleeding", url: "chulhyeol.html", keywords: "bleeding blood loss wound bleeding" },
    { title: "Bandage", url: "bungdae.html", keywords: "bandage wound dressing medical bandage" },
    { title: "Adhesive Plaster", url: "banchanggo.html", keywords: "adhesive plaster band aid wound plaster" },
    { title: "Ointment", url: "yeongo.html", keywords: "ointment medicine cream wound ointment" },
    { title: "Antiseptic", url: "sodongyak.html", keywords: "antiseptic disinfectant wound medicine" },
    { title: "Pain Relief Patch", url: "paseu.html", keywords: "pain relief patch pain patch muscle pain patch" },
    { title: "Abrasion / Scrape", url: "chalgwasang.html", keywords: "abrasion scrape scraped skin skin injury" },
    { title: "Laceration / Cut", url: "yeolsang.html", keywords: "laceration cut wound deep cut injury" },
    { title: "Poisoning / Intoxication", url: "jungdok.html", keywords: "poisoning intoxication poisoned toxic substance" },
    { title: "Dizziness", url: "eojireumjeung.html", keywords: "dizziness dizzy lightheaded" },
    { title: "Vomiting", url: "guto.html", keywords: "vomiting vomit throwing up" },
    { title: "Fainting / Unconsciousness", url: "honsu_gijeol.html", keywords: "fainting unconsciousness faint unconscious" },
    { title: "CPR", url: "simpyesosaengsul.html", keywords: "CPR cardiopulmonary resuscitation cardiac arrest" },
    { title: "Emergency Contact", url: "bisang_yeollakcheo.html", keywords: "emergency contact emergency number contact information" },
    { title: "Safety Rules", url: "anjeon_suchik.html", keywords: "safety rules safety regulations workplace safety" },
    { title: "Safety Training", url: "anjeon_gyoyuk.html", keywords: "safety training safety education workplace training" },
    { title: "Safety Passageway", url: "anjeon_tongro.html", keywords: "safety passageway safety route walkway passage" },
    { title: "Circuit Breaker", url: "chadangi.html", keywords: "circuit breaker electrical breaker power breaker" },
    { title: "Grounding / Earthing", url: "jeopji.html", keywords: "grounding earthing electrical grounding" },
    { title: "Insulation", url: "jeoryeon.html", keywords: "insulation electrical insulation insulating" },
    { title: "Fire Shutter", url: "banghwasyeoteo.html", keywords: "fire shutter fire door fire protection shutter" },
    { title: "Escape Exit", url: "pinangu.html", keywords: "escape exit emergency exit escape route" },
    { title: "Descent Device", url: "wanganggi.html", keywords: "descent device emergency descent escape device" },
    { title: "Fire Hydrant", url: "sohwajeon.html", keywords: "fire hydrant fire hose hydrant" },
    { title: "Smoking Area", url: "heupyeonguyeok.html", keywords: "smoking area smoking zone designated smoking area" },
    { title: "Non-smoking Area", url: "geumyeonguyeok.html", keywords: "non-smoking area no smoking zone smoking prohibited" },
    { title: "No Entry", url: "chulipgeumji.html", keywords: "no entry entry prohibited restricted area" },
    { title: "No Pedestrians", url: "bohaenggeumji.html", keywords: "no pedestrians pedestrians prohibited walking prohibited" },
    { title: "Do Not Use", url: "sayonggeumji.html", keywords: "do not use prohibited use not allowed" },
    { title: "No Riding", url: "tapseunggeumji.html", keywords: "no riding riding prohibited" },
    { title: "No Flammable Materials", url: "hwagi_eomgeum.html", keywords: "no flammable materials flammable prohibited fire safety" },
    { title: "Keep Away from Water", url: "mulgi_eomgeum.html", keywords: "keep away from water keep dry water prohibited" },
    { title: "Safety Sign", url: "anjeon_pyojipan.html", keywords: "safety sign safety symbol warning sign" },
    { title: "Safety Inspection", url: "anjeon_jeomgeom.html", keywords: "safety inspection workplace safety check" },
    { title: "Shelter", url: "daepiso.html", keywords: "shelter emergency shelter safe place" },
    { title: "Cutter Knife", url: "kal.html", keywords: "cutter knife utility knife box cutter" },
    { title: "Scissors", url: "gawi.html", keywords: "scissors cutting tool" },
    { title: "Hammer", url: "mangchi.html", keywords: "hammer hand tool" },
    { title: "Screwdriver", url: "deuraibeo.html", keywords: "screwdriver hand tool screw" },
    { title: "Spanner / Wrench", url: "seupaeneo_renchi.html", keywords: "spanner wrench hand tool" },
    { title: "Pliers", url: "penchi.html", keywords: "pliers hand tool gripping tool" },
    { title: "Nippers", url: "nipeo.html", keywords: "nippers cutting pliers wire cutters" },
    { title: "Tape Measure", url: "julja.html", keywords: "tape measure measuring tape length measurement" },
    { title: "Spirit Level", url: "supyeongdae.html", keywords: "spirit level level tool horizontal measurement" },
    { title: "Friend sentence ", url: "sentencefriend1.html", keywords: "sentence friend study korean conversation" }
 ];    
const quizDB = window.quizDB;

// ==================== 번역 방지 헬퍼 (전역) ====================
// 한글 문장/단어와 그 로마자 표기는 사용자 자국어로 자동번역되면 안 되므로,
// notranslate 클래스 + translate="no" 속성으로 감싼다.
// 1) krSafe: 필드 하나(예: quiz.kr, 로마자 표기)를 통째로 감쌀 때 사용
function krSafe(text){
  const raw = String(text == null ? '' : text);
  if(!raw) return '';
  const escaped = raw
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  return `<span class="notranslate" translate="no">${escaped}</span>`;
}
// 2) protectKoreanNoTranslate: AI가 자유 형식으로 생성한 텍스트(영어+한글 혼합)에서
//    한글 구간(및 바로 뒤에 오는 로마자 괄호)만 찾아서 감쌈. 영어 설명 부분은 그대로 번역 가능하게 둠.
function protectKoreanNoTranslate(html){
  if(!html) return html;
  return String(html).replace(
    /[가-힣][가-힣\s.,!?~"'“”‘’、，。！？]*(?:[^가-힣(]{0,10}\([^)가-힣]{0,80}\))?/gu,
    (m) => `<span class="notranslate" translate="no">${m}</span>`
  );
}

// ==================== 전체 사이트 자동 번역 방지 스캐너 ====================
// script.js는 index.html과 모든 개별 레슨 페이지(250개+)에 공통으로 로드되므로,
// 이 함수 하나로 사이트 전체(FAQ 섹션, EPS-TOPIK 설명, 퀴즈 정답 화면, AI 튜터 채팅 등
// 어디에 있든)의 한글 텍스트를 자동으로 찾아서 notranslate 처리한다.
// 각 페이지 HTML을 일일이 수정할 필요가 없다.
(function setupGlobalKoreanTranslateGuard(){
  const KOREAN_RUN_REGEX = /[가-힣][가-힣\s.,!?~"'“”‘’、，。！？]*(?:[^가-힣(]{0,10}\([^)가-힣]{0,80}\))?/gu;

  function shouldSkip(el){
    if(!el || !el.closest) return true;
    return !!el.closest('.notranslate, script, style, textarea, input, [translate="no"]');
  }

  // "보고 싶어요 (bo-go sip-eo-yo)"처럼 한글 옆에 로마자가 붙어있는 경우는 KOREAN_RUN_REGEX가 잡지만,
  // "Real-Life Examples"의 <strong>한글</strong><span>로마자만</span> 처럼 로마자가
  // 한글 없이 완전히 별도 태그로 떨어져 있으면 한글 감지로는 못 잡는다.
  // 이런 경우를 위해 "하이픈으로 음절이 이어진 로마자 표기" 패턴을 별도로 감지한다.
  // (예: "bo-go sip-eo-yo. man-hi bo-go sip-eo-yo." → 각 단어가 자음-모음 하이픈으로 연결됨)
  function looksLikeRomanization(text){
    const words = text.trim().split(/\s+/).filter(Boolean);
    if(words.length === 0) return false;
    let hyphenated = 0;
    words.forEach(w=>{
      const clean = w.replace(/[.,!?]+$/,'');
      if(/^[a-zA-Z]+(-[a-zA-Z]+)+$/.test(clean)) hyphenated++;
    });
    return (hyphenated / words.length) >= 0.5;
  }

  function wrapTextNode(node){
    const text = node.nodeValue;
    if(!text || !text.trim()) return;
    const parent = node.parentNode;
    if(!parent) return;
    if(shouldSkip(node.parentElement)) return;

    const hasHangul = /[가-힣]/.test(text);

    if(!hasHangul){
      // 한글은 없지만 하이픈 로마자 패턴으로 보이면 통째로 보호 (Real-Life Examples 등)
      if(looksLikeRomanization(text)){
        const span = document.createElement('span');
        span.className = 'notranslate';
        span.setAttribute('translate', 'no');
        span.textContent = text;
        parent.replaceChild(span, node);
      }
      return;
    }

    KOREAN_RUN_REGEX.lastIndex = 0;
    let lastIndex = 0, m, matched = false;
    const frag = document.createDocumentFragment();
    while((m = KOREAN_RUN_REGEX.exec(text)) !== null){
      matched = true;
      if(m.index > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
      const span = document.createElement('span');
      span.className = 'notranslate';
      span.setAttribute('translate', 'no');
      span.textContent = m[0];
      frag.appendChild(span);
      lastIndex = KOREAN_RUN_REGEX.lastIndex;
    }
    if(!matched) return;
    if(lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    parent.replaceChild(frag, node);
  }

  // 사이트 전반에서 로마자 전용으로 쓰이는 걸로 알려진 클래스/ID는
  // 하이픈 유무와 상관없이 무조건 보호 (짧은 로마자, 하이픈 없는 경우의 백업)
  function protectKnownRomanizationContainers(root){
    const selector = '.seo-example span, .rom-text, #romanization, #today-rom';
    let nodes = [];
    if(root.querySelectorAll) nodes = Array.from(root.querySelectorAll(selector));
    if(root.matches && root.matches(selector)) nodes.push(root);
    nodes.forEach(el=>{
      if(!el.classList.contains('notranslate')) el.classList.add('notranslate');
      el.setAttribute('translate', 'no');
    });
  }

  function scan(root){
    if(!root || root.nodeType === undefined) return;
    protectKnownRomanizationContainers(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(wrapTextNode);
  }

  function runInitialScan(){
    scan(document.body);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', runInitialScan);
  } else {
    runInitialScan();
  }

  // 퀴즈 정답 화면, AI 튜터 채팅, FAQ 펼치기 등으로 새로 추가되는 콘텐츠도 계속 감시해서 보호
  let pending = [];
  let scheduled = false;
  function flush(){
    scheduled = false;
    const targets = pending;
    pending = [];
    targets.forEach(scan);
  }
  function startObserver(){
    if(!document.body) { setTimeout(startObserver, 50); return; }
    const observer = new MutationObserver((mutations)=>{
      mutations.forEach(mut=>{
        if(mut.addedNodes) mut.addedNodes.forEach(node=>{
          if(node.nodeType === 1) pending.push(node);
          else if(node.nodeType === 3 && node.parentNode) pending.push(node.parentNode);
        });
      });
      if(pending.length && !scheduled){
        scheduled = true;
        setTimeout(flush, 150);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  startObserver();
})();

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
        document.getElementById('seo-title').innerText = "Learn Korean Free  3000  Word Quiz (FREE)";
        document.getElementById('seo-desc').setAttribute("content", "Master Korean through fun interactive games! Challenge yourself with over 1,000 Korean Word quizzes. Perfect for K-Drama fans and learners worldwide.");
        document.getElementById('main-header').innerText = "Learn Korean Free  3000  Word Quiz";
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
        let chosenList = relatedList.slice(0, 3);
        if (chosenList.length === 0) {
            const fallbackPool = quizDB.filter(item => item.url !== currentFileName);
            chosenList = fallbackPool.sort(() => Math.random() - 0.5).slice(0, 3);
        }
        const recHtml = chosenList.length > 0
    ? `<div style="margin-bottom:15px;">
        <div style="font-size:0.9rem;font-weight:bold;color:#64748b;margin-bottom:8px;text-align:center;">
            🔄 Related Korean Sentences
        </div>
        <div style="display:flex;gap:8px;">
            ${chosenList.map(item => `
                <a href="${item.url}"
                   style="flex:1;
                          display:block;
                          box-sizing:border-box;
                          padding:12px 8px;
                          background:#f8fafc;
                          border:2px dashed #cbd5e1;
                          border-radius:10px;
                          cursor:pointer;
                          font-size:0.9rem;
                          font-weight:bold;
                          color:#475569;
                          text-decoration:none;
                          text-align:center;
                          overflow:hidden;
                          text-overflow:ellipsis;
                          white-space:nowrap;">
                    📚 ${item.title}
                </a>
            `).join("")}
        </div>
    </div>`
    : "";
        const favorites = JSON.parse(localStorage.getItem("favoriteLessons") || "[]");
        const isSaved = favorites.some(x => x.url === currentFileName);
        const favoriteHtml = `<button id="favorite-btn" onclick="toggleFavorite()" style="display:block;width:100%;margin:0 0 15px 0;padding:12px 24px;font-size:15px;font-weight:bold;border-radius:30px;cursor:pointer;transition:all 0.2s ease;box-shadow:0 4px 10px rgba(0,0,0,0.08);border:2px solid ${isSaved ? '#dc2626' : '#fecaca'};background:${isSaved ? '#dc2626' : '#ffffff'};color:${isSaved ? '#ffffff' : '#dc2626'};">${isSaved ? '❤ Saved to My Review List' : '🤍 Save to My Review List'}</button>`;
        let formsHtml = "";
        if (quiz.forms && (quiz.forms.present || quiz.forms.past || quiz.forms.future)) {
            formsHtml = `<p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #10b981;"><strong>Present:</strong> ${krSafe(quiz.forms.present || '---')}</p><p style="margin: 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Past:</strong> ${krSafe(quiz.forms.past || '---')}</p><p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Future:</strong> ${krSafe(quiz.forms.future || '---')}</p>`;
        } else {
            const casualText = (quiz.forms && quiz.forms.casual) || quiz.casual || quiz.kr || "---";
            const politeText = (quiz.forms && quiz.forms.polite) || quiz.polite || quiz.kr || "---";
            formsHtml = `<p style="margin: 10px 0 5px 0; font-size: 1.1rem; color: #ef4444;"><strong>Casual:</strong> ${krSafe(casualText)}</p><p style="margin: 5px 0; font-size: 1.1rem; color: #3b82f6;"><strong>Polite:</strong> ${krSafe(politeText)}</p>`;
        }
        let grammarHtml = "";
        if (quiz.grammar && Array.isArray(quiz.grammar.breakdown)) {
            grammarHtml = `<div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 10px; border-left: 4px solid #3b82f6;"><h4 style="margin: 0 0 10px 0; color: #1e293b;">${quiz.grammar.title || '📚 Simple Grammar'}</h4>${quiz.grammar.breakdown.map(b => `<p style="margin: 5px 0; font-size: 0.95rem; color: #334155;"><strong>${krSafe(b.kr)}</strong> <span style="color:#64748b;">(${krSafe(b.rom)})</span> — ${b.en}</p>`).join('')}<p style="margin-top: 10px; font-weight: 700; color: #1e40af;">${quiz.grammar.meaning || ''}</p></div>`;
        }
        let optionsHtml = "";
        if (quiz.options && Array.isArray(quiz.options)) {
            const showOptionAudio = quiz.optionAudio === true;
            optionsHtml = `<h3 style="margin-top: 25px; color: #1e293b;">💡 Related Words</h3><div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">${quiz.options.map((opt, idx) => `<div style="padding: 12px 15px; background: #f1f5f9; border-radius: 10px; border-left: 4px solid #64748b; display: flex; flex-direction: column; gap: 10px;"><div style="display: flex; justify-content: space-between; align-items: center;"><div><strong style="font-size: 1.2rem; color: #1e293b;">${krSafe(opt.kr)}</strong><span style="font-size: 0.95rem; color: #64748b; margin-left: 6px;">(${krSafe(opt.rom)})</span></div><span style="font-size: 1.05rem; font-weight: bold; color: #475569;">${opt.en}</span></div>${showOptionAudio ? `<div class="control-group" style="scale: 0.85; margin: 0; justify-content: center; gap: 10px;"><button class="btn-main" onclick="event.stopPropagation(); window.speakOption('${opt.kr.replace(/'/g, "\\'")}')"><span class="icon">🔊</span><span style="font-size: 0.8rem;">LISTEN</span></button><button class="btn-main" id="opt-mic-btn-${idx}" onclick="event.stopPropagation(); window.startOptionMic('${opt.kr.replace(/'/g, "\\'")}', 'opt-feedback-${idx}')"><span class="icon">🎤</span><span style="font-size: 0.8rem;">SPEAK</span></button></div><div id="opt-feedback-${idx}" style="height: 20px; font-weight: 900; font-size: 1rem; text-align: center;"></div>` : ``}</div>`).join('')}</div>`;
        }
        let examplesHtml = "";
        if (quiz.examples && Array.isArray(quiz.examples)) {
            examplesHtml = `<h3 style="margin-top: 25px; color: #1e293b;">📚 Key Sentences</h3><ul style="list-style: none; padding: 0; margin-bottom: 20px;">${quiz.examples.map((ex, idx) => `<li style="margin-bottom: 15px; padding: 15px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);"><strong style="font-size: 1.3rem; display: block; margin-bottom: 5px; color: #1e293b;">${krSafe(ex.kr)}</strong><span style="font-size: 1.1rem; color: #64748b; display: block; margin-bottom: 5px;">${ex.en}</span><em style="color: var(--primary); font-size: 1rem; display: block; margin-bottom: 10px;">${krSafe(ex.rom || '')}</em><div class="control-group" style="scale: 0.85; margin: 10px 0 0 0; justify-content: center; gap: 10px;"><button class="btn-main" onclick="event.stopPropagation(); speakExampleText('${ex.kr.replace(/'/g, "\\'")}')"><span class="icon">🔊</span><span style="font-size: 0.8rem;">LISTEN</span></button><button class="btn-main" id="ex-mic-btn-${idx}" onclick="event.stopPropagation(); startExampleRecognition('${ex.kr.replace(/'/g, "\\'")}', ${idx})"><span class="icon">🎤</span><span style="font-size: 0.8rem;">SPEAK</span></button></div><div id="ex-feedback-${idx}" style="height: 25px; font-weight: 900; font-size: 1.1rem; margin-top: 5px; text-align: center;"></div></li>`).join('')}</ul>`;
        }
        const situationText = quiz.situation || "No context provided.";
        detailArea.innerHTML = `<div class="result-container" style="padding: 20px; width: 100%; max-width: 600px; margin: 0 auto;"><h2 style="text-align: center; color: var(--primary);">⭕ Correct! 🎉</h2><div class="info-box" style="margin: 15px 0; padding: 15px; border: 2px solid #e2e8f0; border-radius: 10px; background: #f8fafc;"><p style="margin: 5px 0; font-size: 1.1rem;"><strong>Context:</strong> ${situationText}</p>${formsHtml}</div>${grammarHtml}${examplesHtml}${optionsHtml}<div style="margin-top: 25px;">${favoriteHtml}${recHtml}<button id="next-btn" class="esim-btn-link" style="width: 100%; margin-bottom: 15px; padding: 15px; border: none; cursor: pointer;">Next Quiz ⏭</button><button id="home-btn" class="esim-btn-link" style="width: 100%; padding: 15px; background: #64748b; border: none; cursor: pointer;">🏠 Home</button></div></div>`;
        detailArea.classList.add('active'); detailArea.style.display = 'block'; window.scrollTo(0, 0);
        document.getElementById('next-btn').onclick = nextQuiz;
        document.getElementById('home-btn').onclick = () => window.location.href = 'index.html';
        
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
        window.scrollTo(0, 0);
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
const adTexts = ["Stuck on Korean grammar? Ask our AI Tutor! 🤖","Ask Any Korean Grammar Question — Instantly","Your Personal AI Korean Tutor — 100% Free","Tap the AI Tutor button for real-time help"];
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
    if (!found) list.innerHTML = `<li style="padding: 15px; color:#999;">No matching quizzes found.</li>`;
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
    if (!found) list.innerHTML = `<li style="padding: 15px; color:#999;">No matching quizzes found.</li>`;
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
 
  function hasWordBoundary(text, token){
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
    return pattern.test(text);
  }
 
  function hasHangulBoundary(text, token){
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(^|[^가-힣])${escaped}([^가-힣]|$)`);
    return pattern.test(text);
  }
 
  function hasTrailingHangulBoundary(text, token){
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`${escaped}([^가-힣]|$)`);
    return pattern.test(text);
  }
 
  function romanizationFlexRegex(token){
    const parts = token.split('-').map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(`\\b${parts.join('[\\s-]*')}\\b`, 'i');
  }
 
  function findAllGrammarMatches(q){
    if(!q) return [];
    const norm = q.toLowerCase().trim();
 
    const idMatch = grammarData.find(g => norm.includes(g.id.toLowerCase()));
    if(idMatch) return [idMatch];
 
    const seen = new Set();
    const results = [];
    function addIfNew(g){ if(!seen.has(g.id)){ seen.add(g.id); results.push(g); } }
 
    for(const g of grammarData){
      const kws = g.keywords || [];
      for(const kw of kws){
        const k = kw.toLowerCase();
        let ok;
        if(k.includes(' ')) ok = norm.includes(k);
        else if(k.length <= 3) ok = hasWordBoundary(norm, k);
        else ok = norm.includes(k);
        if(ok){ addIfNew(g); break; }
      }
    }
    if(results.length > 0) return results;
 
    for(const g of grammarData){
      const romParts = g.romanization.split('/').map(s=>s.trim()).filter(Boolean);
      if(romParts.some(p => p.replace(/-/g,'').length>=2 && romanizationFlexRegex(p).test(norm))) addIfNew(g);
    }
    if(results.length > 0) return results;
 
    for(const g of grammarData){
      const parts = g.grammar.split('/').map(s=>s.trim()).filter(Boolean);
      if(parts.some(p => p.length>=1 && hasHangulBoundary(q, p))) addIfNew(g);
    }
    return results;
  }
 
  function renderFromDB(g, ctx){
    const exHtml = (g.examples||[]).map((e,i)=>`${i+1}. ${krSafe(e.kr)} (${krSafe(e.rom)}) ${e.en}`).join('<br>');
    const mistakeHtml = (g.commonMistakes||[]).map(m=>`❌ ${krSafe(m.wrong)} → ✅ ${krSafe(m.correct)}`).join('<br>') || '—';
    const compareHtml = (g.compare||[]).map(c=>`${krSafe(c.grammar)} = ${c.meaning} (${c.mainJob})`).join('<br>');
    const ruleHtml = (g.basicRule||'').replace(/\n/g,'<br>');
    const imagineHtml = g.imagine ? `<br><br>${g.imagine}` : '';
 
    return `<b>Short Answer</b><br>${krSafe(g.grammar)} (${krSafe(g.romanization)}) ${g.title}<br><br>`
      + `<b>Easy Explanation</b><br>${g.easyExplanation||''}${imagineHtml}<br><br>`
      + `<b>Grammar</b><br>${ruleHtml}<br><br>`
      + `<b>Examples</b><br>${exHtml}<br><br>`
      + `<b>Native Tip</b><br>👩‍🏫 ${g.nativeTip||''}<br><br>`
      + `<b>Common Mistake</b><br>${mistakeHtml}<br><br>`
      + (compareHtml ? `<b>Compare</b><br>${compareHtml}<br><br>` : '')
      + `<b>Excellent! Keep practicing. You are improving every day.</b>`; 
     
  }

  function renderStudyModeButtons(){
    return `<div class="ai-actions" style="margin-top:10px;">`
      + `<button class="ai-action-btn" onclick="window.__aiTutorMode('epstopik')">📘 EPS-TOPIK</button>`
      + `<button class="ai-action-btn" onclick="window.__aiTutorMode('quiz')">🎯 Quiz</button>`
      + `<button class="ai-action-btn" onclick="window.__aiTutorMode('example')">💬 Example</button>`
      + `</div>`;
  }

  function getDetectedGrammars(){
    try{
      const quiz = (typeof currentCategoryData !== 'undefined' && Array.isArray(currentCategoryData) && typeof currentIdx !== 'undefined')
        ? currentCategoryData[currentIdx] : null;
      if(!quiz) return [];
      let combined = (quiz.kr||'') + ' ';
      if(Array.isArray(quiz.examples)) combined += quiz.examples.map(e=>e.kr||'').join(' ') + ' ';
      if(Array.isArray(quiz.options)) combined += quiz.options.map(o=>o.kr||'').join(' ') + ' ';
      return detectGrammarInText(combined).slice(0,3);
    }catch(e){ return []; }
  }

  function handleLocalGrammarDisplay(specificG, allGrams){
    let grams = [];
    if(specificG) grams = [specificG];
    else if(allGrams && allGrams.length>0) grams = allGrams;
    else grams = getDetectedGrammars();

    const ctx = getCtx();
    if(grams.length===0){
      log.innerHTML += `<div style="background:#fefce8;border:2px solid #fde68a;padding:12px 14px;border-radius:14px;font-size:.85rem;">⚠️ No grammar point was detected for this sentence. Try asking a question in the search bar below.</div>`;
      log.scrollTop = log.scrollHeight;
      return;
    }
    log.innerHTML += `<div style="align-self:flex-end;background:#16a34a;color:white;padding:8px 12px;border-radius:16px;max-width:82%;font-weight:700;font-size:0.9rem;">📚 ${grams.length===1?krSafe(grams[0].grammar)+' View grammar':'View Grammar DB'}</div>`;
    let block = `<div style="background:#f0fdf4;border:2px solid #bbf7d0;padding:12px 14px;border-radius:14px;">`
      + `<span class="ai-source-tag ai-source-db">📚 ${grams.length} Grammar - Free Unlimited Grammar </span>`;
    grams.forEach(g=>{
      block += `<div style="margin-top:10px;padding-top:10px;border-top:1px dashed #bbf7d0;">`
        + `<div style="font-size:0.85rem;color:#166534;font-weight:800;margin-bottom:6px;">📚 ${krSafe(g.grammar)} (${escapeHtml(g.id)})</div>`
        + renderFromDB(g, ctx)
        + `</div>`;
    });
    block += makeActions(grams.map(g=>g.grammar).join(' / ').slice(0,200)) + renderStudyModeButtons() + `</div>`;
    log.innerHTML += block;
    log.scrollTop = log.scrollHeight;
  }

  window.__localDbMode = function(mode){
    handleLocalGrammarDisplay();
  };

  window.__aiSentenceMode = function(kr, en, rom){
    const q = kr + (en? ' - '+en : '');
    handleQuestion(q, null, true);
  };

  window.__aiTutorMode = function(mode){
    const ctx = getCtx();
    const lessonLabel = ctx.kr ? `"${ctx.kr}"` : "this lesson";
    const presetQuestions = {
      epstopik: `Please explain ${lessonLabel} in EPS-TOPIK exam style. Cover the key vocabulary and grammar I need to know for the exam, using the current lesson as the main material.`,
      quiz: `Please give me a short EPS-TOPIK-style quiz question based on ${lessonLabel}. Wait for my answer, then explain why it is correct or incorrect.`,
      example: `Please give me 2-3 additional natural example sentences using the vocabulary or grammar from ${lessonLabel}, each with Korean, romanization, and English meaning.`
    };
    const q = presetQuestions[mode] || presetQuestions.epstopik;
    handleQuestion(q, null, true);
  };

  const ASK_TUTOR_ENDPOINT = "https://kwfiidykbaargsxuuvvy.supabase.co/functions/v1/ask-tutor";
  const USE_GEMINI = true;

  function getDeviceId(){
    let id = localStorage.getItem('koreanAppDeviceId');
    if(!id){
      id = 'anon-' + (crypto?.randomUUID ? crypto.randomUUID() : (Date.now()+'-'+Math.random().toString(36).slice(2)));
      localStorage.setItem('koreanAppDeviceId', id);
    }
    return id;
  }
 
  var file = (location.pathname.split('/').pop()||'').toLowerCase();
  if(file===''||file==='index.html'||file==='/'||file==='index') return;
 
  var oldBtn=document.getElementById('ai-tutor-btn'); if(oldBtn) oldBtn.parentElement.remove();
  var oldStyle=document.getElementById('ai-tutor-style'); if(oldStyle) oldStyle.remove();
  var oldShare=document.getElementById('ai-share-modal'); if(oldShare) oldShare.remove();
 
  var css=document.createElement('style');
  css.id='ai-tutor-style';
  css.textContent=`
  #ai-tutor-btn{display:none;position:fixed;top:70px;right:14px;z-index:99999;cursor:pointer;border:none;background:transparent;flex-direction:column;align-items:center;gap:3px;}
  #ai-tutor-btn .ai-bubble{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;font-size:1.7rem;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(99,102,241,0.4);border:3px solid white;animation:ai-bounce 2s infinite;}
  #ai-tutor-btn .ai-label{background:#1e293b;color:white;font-size:.6rem;font-weight:900;padding:2px 7px;border-radius:20px;}
  @keyframes ai-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
  #ai-tutor-modal{display:none;position:fixed;bottom:85px;right:10px;width:368px;max-width:95vw;height:75vh;max-height:700px;background:white;border-radius:20px;z-index:99999;flex-direction:column;overflow:hidden;box-shadow:0 15px 40px rgba(0,0,0,0.2);border:1px solid #e2e8f0;}
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
     @media (max-width:600px){
    #ai-tutor-modal{
      top:10px !important;
      bottom:10px !important;
      left:8px !important;
      right:8px !important;
      width:auto !important;
      max-width:none !important;
      height:auto !important;
      max-height:none !important;
      border-radius:18px !important;
    }

    #ai-chat-log{
      overflow-y:auto !important;
      -webkit-overflow-scrolling:touch;
    }
  }
  
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
 
 function getCurrentQuizData(){
  try{
    if(
      typeof currentCategoryData !== 'undefined' &&
      Array.isArray(currentCategoryData) &&
      typeof currentIdx !== 'undefined' &&
      currentCategoryData[currentIdx]
    ){
      return currentCategoryData[currentIdx];
    }
  }catch(e){
    console.warn('[AI Tutor] getCurrentQuizData error:', e);
  }

  return null;
}


function getCtx(){

  const quiz = getCurrentQuizData();

  if(quiz){

    return {
      kr: String(quiz.kr || '').trim(),
      rom: String(quiz.rom || '').trim(),
      en: String(quiz.en || '').trim()
    };

  }

  const krEl =
    document.getElementById('korean-sentence') ||
    document.querySelector('.kr-text');

  const romEl =
    document.getElementById('romanization') ||
    document.querySelector('.rom-text');

  const enEl =
    document.getElementById('english') ||
    document.querySelector('.en-text');

  return {
    kr: krEl ? krEl.innerText.trim() : '',
    rom: romEl ? romEl.innerText.trim() : '',
    en: enEl ? enEl.innerText.trim() : ''
  };
}

function buildPageContext(){

  const quiz = getCurrentQuizData();

  const pageTitle = document.title || '';
  const pageUrl = window.location.href;
  const pagePath = window.location.pathname;

  const categoryId =
    (typeof activeCatId !== 'undefined' && activeCatId)
      ? activeCatId
      : '';

  const categoryName =
    (typeof activeCategoryName !== 'undefined' && activeCategoryName)
      ? activeCategoryName
      : '';

  const currentNumber =
    (
      typeof currentCategoryData !== 'undefined' &&
      Array.isArray(currentCategoryData) &&
      typeof currentIdx !== 'undefined'
    )
      ? currentIdx + 1
      : 0;

  const totalNumber =
    (
      typeof currentCategoryData !== 'undefined' &&
      Array.isArray(currentCategoryData)
    )
      ? currentCategoryData.length
      : 0;


  const lesson = quiz ? {

    korean: String(quiz.kr || ''),
    romanization: String(quiz.rom || ''),
    english: String(quiz.en || ''),

    tip: String(quiz.tip || ''),
    situation: String(quiz.situation || ''),

    casual:
      String(
        (quiz.forms && quiz.forms.casual) ||
        quiz.casual ||
        ''
      ),

    polite:
      String(
        (quiz.forms && quiz.forms.polite) ||
        quiz.polite ||
        ''
      ),

    present:
      String(
        (quiz.forms && quiz.forms.present) ||
        ''
      ),

    past:
      String(
        (quiz.forms && quiz.forms.past) ||
        ''
      ),

    future:
      String(
        (quiz.forms && quiz.forms.future) ||
        ''
      ),

    grammar: quiz.grammar || {},

    examples:
      Array.isArray(quiz.examples)
        ? quiz.examples.map(e => ({
            korean: String(e.kr || ''),
            romanization: String(e.rom || ''),
            english: String(e.en || '')
          }))
        : [],

    options:
      Array.isArray(quiz.options)
        ? quiz.options.map(o => ({
            korean: String(o.kr || ''),
            romanization: String(o.rom || ''),
            english: String(o.en || '')
          }))
        : []

  } : {};


  return {

    page: {
      title: pageTitle,
      url: pageUrl,
      path: pagePath
    },

    category: {
      id: categoryId,
      name: categoryName
    },

    lesson: lesson,

    currentLesson: {
      korean: lesson.korean || '',
      romanization: lesson.romanization || '',
      english: lesson.english || ''
    },

    quiz: quiz ? {

      question: String(quiz.kr || ''),
      answer: String(quiz.en || ''),

      options:
        Array.isArray(quiz.options)
          ? quiz.options.map(o => ({
              korean: String(o.kr || ''),
              romanization: String(o.rom || ''),
              english: String(o.en || '')
            }))
          : []

    } : {},

    quizProgress: {
      current: currentNumber,
      total: totalNumber
    },

    epsTopik: {

      enabled: true,

      target:
        'EPS-TOPIK Korean learner',

      lessonTitle:
        pageTitle,

      topic:
        categoryName,

      Korean:
        lesson.korean || '',

      English:
        lesson.english || '',

      grammar:
        lesson.grammar || {},

      situation:
        lesson.situation || '',

      vocabulary:
        lesson.options || [],

      examples:
        lesson.examples || []

    }

  };
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
      let chunk = tokens[i];
      i++;
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

  function escapeHtml(text){
    return String(text || '')
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
 
  async function askTutorStream(ctx, q, onChunk, onDone, onQuotaExceeded, onError){
    try{
      const user = window.getKoreanAuthUser ? await window.getKoreanAuthUser() : null;
      const headers = { 'Content-Type':'application/json' };
      let bodyExtra = {};

      const SUPABASE_ANON_KEY = "sb_publishable_VThH1zOjeve9iqeBqPWbTQ_1vB5CS_X";

      if(user){
        const token = window.getKoreanAuthToken ? await window.getKoreanAuthToken() : null;
        if(token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            headers['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`;
        }
      } else {
        bodyExtra.deviceId = getDeviceId(); 
        headers['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`;
      }
     
      const pageContext = buildPageContext();

const res = await fetch(ASK_TUTOR_ENDPOINT, {
  method: 'POST',
  headers,

  body: JSON.stringify({

    kr: ctx.kr,
    rom: ctx.rom,
    en: ctx.en,

    q: q,

    pageContext: pageContext,

    currentPage: pageContext.page,
    currentCategory: pageContext.category,
    currentLesson: pageContext.lesson,
    currentQuiz: pageContext.quiz,
    quizProgress: pageContext.quizProgress,
    epsTopik: pageContext.epsTopik,

    ...bodyExtra

  })
});
      

      if(res.status === 403){
        const data = await res.json().catch(()=>({}));
        onQuotaExceeded(data.message || 'You have used up all your questions for today.', data.plan || 'free', !user);
        return;
      }

      if(!res.ok || !res.body){
        let msg = 'Unknown error';
        try{ const data = await res.json(); msg = data?.error || msg; }catch(e){}
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
        buffer = lines.pop();
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
              console.warn('[AI Tutor] finishReason:', finishReason, '(MAX_TOKENS면 답변이 잘린 것)');
            }
          }catch(e){ /* 아직 완성 안 된 JSON 조각일 수 있으니 무시하고 계속 */ }
        }
      }
      onDone(fullText);
    }catch(e){
      onError('Network/Stream error: ' + e.message);
    }
  }
 
  function hasSsBatchimBeforeEoyo(text){
    for(let i=0; i<text.length-2; i++){
      const ch = text[i];
      const code = text.charCodeAt(i);
      if(ch === '있') continue;
      if(code >= 0xAC00 && code <= 0xD7A3){
        const finalIdx = (code - 0xAC00) % 28;
        if(finalIdx === 20 && text.slice(i+1, i+3) === '어요'){
          return true;
        }
      }
    }
    return false;
  }
 
function hasGrammarPattern(text, pattern){
  if(!text || !pattern) return false;

  pattern = pattern.trim();

  const parts = pattern
    .split('/')
    .map(p => p.trim())
    .filter(Boolean);

  if(parts.length > 1){
    return parts.some(p => hasGrammarPattern(text, p));
  }

  pattern = parts[0];

  if(pattern.startsWith('-')){
    const actualPattern = pattern.slice(1).trim();
    if(!actualPattern) return false;
    return hasTrailingHangulBoundary(text, actualPattern);
  }

  return hasTrailingHangulBoundary(text, pattern);
}

function detectGrammarInText(text){
  if(!text) return [];

  const found = [];

  for(const g of grammarData){

    const rawPatterns = (
      g.sentencePatterns && g.sentencePatterns.length
        ? g.sentencePatterns
        : g.grammar.split('/')
    );

    const patterns = rawPatterns
      .flatMap(p => String(p).split('/'))
      .map(p => p.trim())
      .filter(Boolean);

    let hit = patterns.some(
      p => hasGrammarPattern(text, p)
    );

    if(
      !hit &&
      g.id === 'G014' &&
      hasSsBatchimBeforeEoyo(text)
    ){
      hit = true;
    }

    if(hit){
      found.push(g);
    }
  }

  return found;
}
 
function getPageSentences(){

  const list = [];

  function normalizeSentence(text){
    return String(text || '')
      .trim()
      .replace(/^[A-Za-z]\s*[:：.)]\s*/i, '')
      .replace(/[.!?。！？]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function cleanSentence(text){
    return String(text || '')
      .trim()
      .replace(/^[A-Za-z]\s*[:：.)]\s*/i, '')
      .trim();
  }

  function isSentence(item){

    if(!item || !item.kr) return false;

    const original = String(item.kr).trim();
    const kr = cleanSentence(original);

    if(!kr) return false;

    if(/[.!?。！？]/.test(original)) return true;

    if(/\s/.test(kr)) return true;

    return false;
  }

  function isDuplicate(text){

    const normalized = normalizeSentence(text);

    return list.some(item =>
      normalizeSentence(item.kr) === normalized
    );
  }

  function addSentence(item){

    if(list.length >= 3) return;

    if(!isSentence(item)) return;

    if(isDuplicate(item.kr)) return;

    list.push({
      kr: cleanSentence(item.kr),
      rom: item.rom || '',
      en: item.en || ''
    });
  }

  try{

    const quiz =
      (
        typeof currentCategoryData !== 'undefined' &&
        Array.isArray(currentCategoryData) &&
        typeof currentIdx !== 'undefined'
      )
      ? currentCategoryData[currentIdx]
      : null;

    if(quiz){

      if(quiz.kr){

        list.push({
          kr: cleanSentence(quiz.kr),
          rom: quiz.rom || '',
          en: quiz.en || ''
        });

      }

      if(Array.isArray(quiz.examples)){

        for(const e of quiz.examples){

          if(list.length >= 3) break;

          addSentence(e);

        }

      }

      if(Array.isArray(quiz.options)){

        for(const o of quiz.options){

          if(list.length >= 3) break;

          addSentence(o);

        }

      }

    }

  }catch(e){

    console.warn(
      '[AI Tutor] getPageSentences error:',
      e
    );

  }

  return list.slice(0, 3);

}
 
  function makeActions(txt){var safe=txt.replace(/'/g,"").replace(/"/g,'').slice(0,400); return `<div class="ai-actions"><button class="ai-action-btn" onclick="navigator.clipboard.writeText('${safe}');this.innerText='✅ Copied!'">📋 Copy</button><button class="ai-action-btn" onclick="openShare('${safe}')">📤 Share</button><button class="ai-action-btn" onclick="let s=JSON.parse(localStorage.getItem('aiSaved')||'[]');s.push({txt:'${safe}',date:new Date().toLocaleDateString()});localStorage.setItem('aiSaved',JSON.stringify(s));this.innerText='❤ Saved!'">💾 Save</button></div>`;}
 




  function renderFaq(){
    var sentences = getPageSentences();

    let grammarsPerSentence = [];
    let fallbackPool = [];
    try{
      if(sentences.length>0){
        const combinedText = sentences.map(s=>s.kr||'').join(' ');
        fallbackPool = detectGrammarInText(combinedText);
        grammarsPerSentence = sentences.map(s=>{
          const found = detectGrammarInText(s.kr||'');
          return found.length>0 ? found[0] : null;
        });
      }
      const lessonFallback = getDetectedGrammars();
      fallbackPool = [...fallbackPool, ...lessonFallback];
      const seen = new Set();
      const uniqueFallback = [];
      for(const g of fallbackPool){
        if(g && !seen.has(g.id)){
          seen.add(g.id);
          uniqueFallback.push(g);
        }
      }
      fallbackPool = uniqueFallback;

      let usedIds = new Set(grammarsPerSentence.filter(Boolean).map(g=>g.id));
      for(let i=0;i<grammarsPerSentence.length;i++){
        if(!grammarsPerSentence[i]){
          const next = fallbackPool.find(g=>!usedIds.has(g.id));
          if(next){
            grammarsPerSentence[i]=next;
            usedIds.add(next.id);
          }
        }
      }
      for(let i=0;i<3;i++){
        if(i>=grammarsPerSentence.length) grammarsPerSentence[i]=null;
      }
      if(grammarsPerSentence.filter(Boolean).length < 3){
        for(let i=0;i<3;i++){
          if(!grammarsPerSentence[i]){
            const next = fallbackPool.find(g=>!grammarsPerSentence.some(x=>x && x.id===g.id));
            if(next) grammarsPerSentence[i]=next;
          }
        }
      }
    }catch(e){ console.warn(e); }

    let modeButtonsHtml = '';
    if(sentences.length>0){
      modeButtonsHtml = `<div style="width:100%;display:flex;gap:5px;">`
        + [0,1,2].map(i=>{
          const g = grammarsPerSentence[i];
          const sentence = sentences[i];
          if(g){
            return `<button class="faq-chip" data-gram-idx="${i}" style="flex:1;text-align:center;background:#f0fdf4;border-color:#bbf7d0;padding:5px 6px;line-height:1.2;min-height:auto;">`
              + `<div style="font-size:.82rem;font-weight:900;color:#166534;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${krSafe(g.grammar)}</div>`
              + `<div style="font-size:.62rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${krSafe(g.romanization||'')}</div>`
              + `<div style="font-size:.6rem;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(g.title||'').slice(0,22)}</div>`
              + `</button>`;
          } else {
            return `<button class="faq-chip" data-gram-idx="${i}" style="flex:1;text-align:center;background:#f0fdf4;border-color:#bbf7d0;opacity:0.6;padding:5px 6px;line-height:1.2;min-height:auto;">`
              + `<div style="font-size:.75rem;font-weight:800;">${escapeHtml((sentence&&sentence.kr||'').slice(0,6))}</div>`
              + `<div style="font-size:.6rem;color:#64748b;">Grammar</div>`
              + `</button>`;
          }
        }).join('') + `</div>`;
    } else {
      modeButtonsHtml = `<div style="width:100%;display:flex;gap:5px;">`
        + (fallbackPool.slice(0,3).map((g,i)=>
          `<button class="faq-chip" data-gram-idx="${i}" style="flex:1;text-align:center;background:#f0fdf4;border-color:#bbf7d0;padding:5px 6px;line-height:1.2;min-height:auto;"><div style="font-size:.82rem;font-weight:900;color:#166534;">${krSafe(g.grammar)}</div><div style="font-size:.62rem;color:#64748b;">${krSafe(g.romanization||'')}</div><div style="font-size:.6rem;color:#475569;">${escapeHtml(g.title||'').slice(0,22)}</div></button>`
        ).join('') || `<button class="faq-chip" style="flex:1;padding:5px;">📚 Grammar DB</button>`.repeat(3))
        + `</div>`;
    }

    if(sentences.length === 0){
      faq.innerHTML = modeButtonsHtml;
      log.innerHTML = ``;
      faq.style.display='flex';
      wrap.querySelectorAll('.faq-chip[data-gram-idx]').forEach(c=>{
        c.onclick=()=>{
          const idx = parseInt(c.getAttribute('data-gram-idx'),10);
          const g = grammarsPerSentence[idx] || fallbackPool[idx];
          if(g) handleLocalGrammarDisplay(g);
          else handleLocalGrammarDisplay(null, grammarsPerSentence.filter(Boolean));
        };
      });
      return;
    }

    faq.innerHTML = modeButtonsHtml + `<div style="width:100%;height:1px;background:#e2e8f0;margin:6px 0;"></div>` + sentences.map((s,i) =>
  `<button class="faq-chip" data-sidx="${i}" style="width:100%;background:#f5f3ff;border-color:#ddd6fe;text-align:left;margin-bottom:5px;padding:8px 10px;">
    <div style="font-size:.9em;font-weight:700;color:#1e293b;">${krSafe(s.kr)}</div>
    <div style="font-size:.8em;font-weight:500;margin-top:3px;color:#64748b;">${s.rom ? '('+krSafe(s.rom)+') ' : ''}${escapeHtml(s.en || '')}</div>
  </button>`
).join('');

    log.innerHTML = ``;

    faq.style.display='flex';
    log.scrollTop = 0;
 
    wrap.querySelectorAll('.faq-chip[data-gram-idx]').forEach(c=>{
      c.onclick=()=>{
        const idx = parseInt(c.getAttribute('data-gram-idx'),10);
        const g = grammarsPerSentence[idx] || fallbackPool[idx];
        if(g) handleLocalGrammarDisplay(g);
        else {
          const s = sentences[idx];
          if(s){ const f=detectGrammarInText(s.kr); if(f.length>0) handleLocalGrammarDisplay(f[0]); else handleLocalGrammarDisplay(null, fallbackPool); }
        }
      };
    });
    wrap.querySelectorAll('.faq-chip[data-sidx]').forEach(c=>{
      c.onclick=()=>{
        const idx = parseInt(c.getAttribute('data-sidx'), 10);
        const s = sentences[idx];
        if(s) window.__aiSentenceMode(s.kr, s.en, s.rom);
      };
    });
  }

 // [수정된 부분] 1. AI 퀴즈 정답을 저장할 전역 상태 추가
let currentGeneratedQuiz = {
  correctAnswerIndex: null,
  options: []
};

// [수정된 부분] 2. 1~4번 보기 클릭 시 JS가 직접 채점하고 AI에게 해설만 요청하는 함수 추가
window.handleOptionClick = function(userSelectedIndex) {
  const correctIndex = currentGeneratedQuiz.correctAnswerIndex;
  const isCorrect = (userSelectedIndex === correctIndex);

  // 기존 필수 UI 기능 유지 (함수가 존재할 경우 안전하게 호출)
  if(typeof showCorrectIncorrectDisplay === 'function') showCorrectIncorrectDisplay(isCorrect);
  if(typeof playResultAudio === 'function') playResultAudio(isCorrect);
  if(typeof enableListenAgainButton === 'function') enableListenAgainButton();
  if(typeof enableMicrophoneButton === 'function') enableMicrophoneButton();
  if(typeof displayHandEmoji === 'function') displayHandEmoji();

  // 채팅창에 사용자의 선택과 채점 결과 표시
  const resultMark = isCorrect ? "✅ Correct!" : "❌ Incorrect!";
  const bgColor = isCorrect ? "#10b981" : "#ef4444";
  log.innerHTML += `<div style="align-self:flex-end;background:${bgColor};color:white;padding:8px 12px;border-radius:16px;max-width:82%;font-weight:700;font-size:0.9rem;margin-top:10px;">Selected: Option ${userSelectedIndex} (${resultMark})</div>`;
  log.scrollTop = log.scrollHeight;

  // AI에게 정답 추론을 맡기지 않고, '이미 확정된 결과'를 주입하여 해설만 요청
  const explanationPrompt = `The user selected option ${userSelectedIndex}, but the correct answer is option ${correctIndex}. Result: ${isCorrect ? 'Correct' : 'Incorrect'}. Please explain briefly why option ${correctIndex} is the correct answer and why the other options are wrong, based solely on the current lesson context.`;
  
  // 강제 AI 모드로 해설 요청 (문법 DB 매칭 스킵)
  handleQuestion(explanationPrompt, null, true);
};

  function handleSentenceClick(s){
    log.innerHTML += `<div style="align-self:flex-end;background:#6366f1;color:white;padding:8px 12px;border-radius:16px;max-width:82%;font-weight:700;font-size:0.9rem;">${escapeHtml(s.kr)}${s.rom?` (${escapeHtml(s.rom)})`:''}${s.en?` - ${escapeHtml(s.en)}`:''}</div>`;
    
    log.scrollTop = log.scrollHeight;
 
    const matches = detectGrammarInText(s.kr);
 
    if(matches.length > 0){
      let block = `<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">`
  + `<span class="ai-source-tag ai-source-db">📚 ${matches.length} grammar point${matches.length === 1 ? '' : 's'} found in the sentence</span>`
  + `<div style="font-size:0.72rem;color:#64748b;margin-top:4px;margin-bottom:8px;line-height:1.4;">`
  + `📚 Grammar Database Answer — Unlimited use, no AI usage<br>`
  + `💡 Want a deeper explanation? Ask the AI teacher below.`
  + `</div>`;
      matches.forEach(g=>{
        block += `<div style="margin-top:10px;padding-top:10px;border-top:1px dashed #e2e8f0;">`
          + `<div style="font-size:0.85rem;color:#6366f1;font-weight:800;margin-bottom:6px;">🤖 ${escapeHtml(g.grammar)} (${escapeHtml(g.id)})</div>`
          + renderFromDB(g, {kr:s.kr, rom:s.rom, en:s.en})
          + `</div>`;
      });
      const plainForCopy = matches.map(g=>`${g.grammar} (${g.romanization}) ${g.title}`).join(' / ');
      block += makeActions(plainForCopy)
        + renderStudyModeButtons() + `</div>`;
      log.innerHTML += block;
      log.scrollTop = log.scrollHeight;
    } else {
      handleQuestion(s.kr);
    }
  }
 
  // gramForced: FAQ 칩 클릭 시 확정된 grammarData 항목(있으면 매칭 스킵하고 바로 사용)
  async function handleQuestion(q, gramForced, forceAiMode){
    // forceAiMode=true면 로컬 DB 스킵하고 무조건 AI
    var ctx=getCtx();
    var grams = [];
    if(!forceAiMode){
      grams = gramForced ? [gramForced] : findAllGrammarMatches(q);
    }
 
    // 사용자 입력을 화면에 넣기 전 이스케이프 처리 (XSS 방지)
    // [수정된 부분] AI 해설 요청(내부 프롬프트)일 때는 사용자 화면에 프롬프트를 숨기거나 다르게 표시
    const safeQ = escapeHtml(q);
    if (!forceAiMode) {
      log.innerHTML+=`<div style="align-self:flex-end;background:#6366f1;color:white;padding:8px 12px;border-radius:16px;max-width:82%;font-weight:700;font-size:0.9rem;">${safeQ}</div>`;
    }
    
 
    if(grams.length > 0){
      const cid = 'ai-content-' + Date.now();
      const tag = `📚 ${grams.length} grammar point${grams.length === 1 ? '' : 's'} found in the sentence`;
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
              + renderStudyModeButtons();
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
      return;
    }
 
    log.innerHTML+=`<div id="ai-thinking" style="background:#f8fafc;border:2px solid #e2e8f0;padding:10px 12px;border-radius:14px;font-size:0.85rem;color:#64748b;animation:aiThinkingBlink 1.2s ease-in-out infinite;">👩‍🏫 Your teacher is preparing your answer...</div>`;
    log.scrollTop=log.scrollHeight;
 
    if(!USE_GEMINI){
      const th0=document.getElementById('ai-thinking'); if(th0) th0.remove();
      const fallback = `<b>Short Answer</b><br>${ctx.kr} (${ctx.rom}) ${ctx.en}<br><br><b>Have more questions? Feel free to ask in the search bar below</b>`;
      log.innerHTML+=`<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">${fallback}</div>`;
      log.scrollTop=log.scrollHeight;
      return;
    }
 
    const cid2 = 'ai-content-' + Date.now();
    let wrapperInserted = false;
    let rawFullText = '';
 
    function ensureWrapper(){
      if(wrapperInserted) return;
      wrapperInserted = true;
      const th=document.getElementById('ai-thinking'); if(th) th.remove();
      log.innerHTML+=`<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">`
        + `<span class="ai-source-tag ai-source-api">>👩‍🏫 Teacher Response</span><br>`
        + `<div style="font-size:0.85rem;color:#6366f1;font-weight:800;margin:6px 0;">👩‍🏫 Teacher Response</div>`
        + `<div id="${cid2}"></div><div id="${cid2}-actions"></div></div>`;
      log.scrollTop = log.scrollHeight;
    }
 
    askTutorStream(
      ctx, q,
      (accumulatedText)=>{
        ensureWrapper();
        rawFullText = accumulatedText;
        const el = document.getElementById(cid2);
        // [수정된 부분] JSON 스트리밍 중에는 임시로 텍스트 렌더링 생략 (깜빡임 방지)
        if(el && !accumulatedText.includes('correctAnswerIndex')){ 
           el.innerHTML = escapeAndBr(accumulatedText); 
           log.scrollTop = log.scrollHeight; 
        }
      },
      (finalText)=>{
        ensureWrapper();
        let rawText = finalText || rawFullText || '';
        let finalAnswerHtml = '';

        // [수정된 부분] 3. AI 응답이 퀴즈 JSON 구조인지 파싱하여 버튼 렌더링
        try {
          const cleanText = rawText.replace(/```json|```/g, '').trim();
          if(cleanText.startsWith('{') && cleanText.includes('correctAnswerIndex')) {
            const quizData = JSON.parse(cleanText);
            currentGeneratedQuiz.correctAnswerIndex = quizData.correctAnswerIndex;
            currentGeneratedQuiz.options = quizData.options;

            finalAnswerHtml = `<div style="font-weight:800;color:#1e293b;margin-bottom:12px;font-size:0.95rem;">${escapeHtml(quizData.question)}</div>`;
            quizData.options.forEach((opt, idx) => {
              const optNum = idx + 1;
              finalAnswerHtml += `<button onclick="handleOptionClick(${optNum})" style="display:block;width:100%;text-align:left;margin:6px 0;padding:12px;border:2px solid #e2e8f0;border-radius:10px;background:white;cursor:pointer;font-size:0.9rem;font-weight:600;color:#475569;transition:all 0.2s;">${optNum}. ${escapeHtml(opt)}</button>`;
            });
          } else {
            finalAnswerHtml = escapeAndBr(rawText);
          }
        } catch(e) {
          finalAnswerHtml = escapeAndBr(rawText);
        }

        const el = document.getElementById(cid2);
        if(el) el.innerHTML = finalAnswerHtml;
        const actionsEl2 = document.getElementById(cid2+'-actions');
        if(actionsEl2){
          actionsEl2.innerHTML = makeActions((finalText||'').slice(0,200))
            + renderStudyModeButtons();
        }
        log.scrollTop = log.scrollHeight;
      },

(message, plan, isAnonymous)=>{
  const th = document.getElementById('ai-thinking');
  if(th) th.remove();

  const limitMessage = `
    <div style="background:#f8fafc;border:2px solid #e2e8f0;padding:14px;border-radius:14px;line-height:1.55;">
      <div style="font-size:0.9rem;font-weight:800;color:#475569;margin-bottom:12px;">
        ${escapeHtml(message)}
      </div>

      <div style="margin-bottom:14px;background:white;border:1px solid #e0e7ff;padding:12px;border-radius:12px;">
        <div style="font-weight:800;color:#6366f1;margin-bottom:10px;">🤖 AI Learning Assistant — Unlimited Questions (Pro Mode)</div>
        <div style="text-align:center;line-height:1.5;margin-bottom:12px;background:#f8fafc;padding:10px 12px;border-radius:10px;">
          <div style="font-size:0.9rem;font-weight:900;color:#1e293b;">20/day = <span style="color:#6366f1;">600/month</span> for just <b>$3.99</b> <span style="color:#94a3b8;font-weight:600;">(₱199)</span></div>
          <div style="font-size:0.75rem;color:#94a3b8;margin-top:3px;">Less than a coffee ☕ · 20 questions every day</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <button onclick="window.payWithPayMongo ? window.payWithPayMongo() : window.openAuthModal && window.openAuthModal()" style="width:100%;padding:11px 14px;background:#0070ba;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:0.88rem;cursor:pointer;">🇵🇭 Pay with GCash / Maya — ₱199</button>
          <button onclick="window.payWithLemonSqueezy ? window.payWithLemonSqueezy() : window.openAuthModal && window.openAuthModal()" style="width:100%;padding:11px 14px;background:#111827;color:#fff;border:none;border-radius:10px;font-weight:800;font-size:0.88rem;cursor:pointer;">🌍 Pay with Card — $3.99/mo</button>
        </div>
      </div>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:12px;border-radius:12px;margin-top:12px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="font-weight:800;color:#15803d;font-size:0.82rem;">✅ FREE PLAN</div>
          <div style="font-size:0.68rem;background:#dcfce7;color:#166534;padding:3px 8px;border-radius:999px;font-weight:800;">Always Free</div>
        </div>
        <div style="margin-top:8px;font-size:0.9rem;font-weight:800;color:#1e293b;">3000 Quizzes, Speaking & Listening — Unlimited!</div>
        <div style="margin-top:10px;background:white;border:1px dashed #bbf7d0;padding:9px 10px;border-radius:10px;display:flex;align-items:center;gap:8px;">
          <span>⏰</span>
          <span style="font-size:0.82rem;color:#475569;">Your <b style="color:#15803d;">3 AI questions</b> will refill tomorrow</span>
        </div>
      </div>

    </div>
  `;
  log.innerHTML += limitMessage;
  log.scrollTop = log.scrollHeight;
},

      (errMsg)=>{
        console.error('[AI Tutor] Stream error:', errMsg);
        const th = document.getElementById('ai-thinking');
        if(th) th.remove();
        const fallback = `<b>Short Answer</b><br>${ctx.kr} (${ctx.rom}) ${ctx.en}<br><br><b>Excellent! Keep practicing. You are improving every day.</b>`;
        log.innerHTML+=`<div style="background:#f8fafc;border:2px solid #e2e8f0;padding:12px 14px;border-radius:14px;">`
          + `<div id="ai-error-box">⚠️ 서버 연결 실패, 기본 답변으로 대체했어요.<br>에러: ${escapeHtml(errMsg)}</div>`
          + `<div style="font-size:0.85rem;color:#6366f1;font-weight:800;margin:6px 0;">👩‍🏫 Teacher Response</div>${fallback}</div>`;
        log.scrollTop = log.scrollHeight;
      }
    );
  }
 
window.openShare=openShare;
btn.onclick=()=>{open=!open; modal.style.display=open?'flex':'none'; if(open){ renderFaq(); const g=document.getElementById('usageGuide'); if(g) g.style.display='block'; }};
wrap.querySelector('#ai-x').onclick=()=>{open=false; modal.style.display='none';};

// 검색창 클릭 / 포커스 하면 설명 사라짐
input.addEventListener('focus', ()=>{ document.getElementById('usageGuide')?.style.setProperty('display','none'); });
input.addEventListener('click', ()=>{ document.getElementById('usageGuide')?.style.setProperty('display','none'); });

input.addEventListener('keypress',e=>{if(e.key==='Enter'&&e.target.value.trim()){var q=e.target.value.trim(); e.target.value=''; document.getElementById('usageGuide')?.style.setProperty('display','none'); handleQuestion(q);}});
wrap.querySelector('#ai-send-btn').onclick=()=>{ var q=input.value.trim(); if(q){ document.getElementById('usageGuide')?.style.setProperty('display','none'); input.value=''; handleQuestion(q); } };

// 설명은 검색창 위 빈 여백에만 고정
(function addUsageGuide(){
  if(document.getElementById('usageGuide')) return;
  const guide = document.createElement('div');
  guide.id = 'usageGuide';
  guide.innerHTML = `
    <div style="font-weight:800;color:#6366f1;margin-bottom:6px;font-size:0.9rem;">💡 How to use: Select and tap!</div>
    <span style="font-size:0.82rem;">📚 Tap top grammar → Free grammar (unlimited)<br>
    💬 Tap middle sentence → Ask AI<br>
    ✨ Bottom buttons → EPSTOPIK · More Quiz · More Explain</span>
      
  `;
  guide.style.cssText = "display:block;background:#f8fafc;border:1px dashed #e2e8f0;padding:10px 12px;border-radius:10px;margin:-12px 12px 8px 12px;transform:translateY(-18px);position:relative;z-index:2;color:#94a3b8;font-size:0.72rem;line-height:1.5;box-sizing:border-box;flex-shrink:0;";
  const searchRow = input.parentElement;
  searchRow.insertAdjacentElement('beforebegin', guide);

  document.addEventListener('click', (e)=>{
    if(e.target.closest('.faq-chip')){
      guide.style.display='none';
    }
  });
})();

window.showAiTutor=()=>{var d=document.getElementById('detail-area'); if(d&&d.style.display!=='none'&&d.innerText.includes('Correct')){btn.style.display='flex';}};
window.hideAiTutor=()=>{btn.style.display='none'; modal.style.display='none'; open=false;};
var oldR=window.renderLearningProgress; window.renderLearningProgress=function(){if(oldR) oldR(); setTimeout(window.showAiTutor,300);};
 
  console.log('✅ AI Tutor loaded! Grammar DB entries:', grammarData.length, '(local render, no API for matched grammar)');
  console.log(USE_GEMINI?'✅ Gemini fallback ready for general questions (with pageContext)':'⚠️ Gemini disabled');
})();
(function autoHideFaqOnCorrectPage(){
 
  function findFaqSection(){
    const headers = document.querySelectorAll('h3');
    for(const h of headers){
      if(h.textContent.trim() === 'Frequently Asked Questions'){
        return h.closest('div');
      }
    }
    return null;
  }
 
  function syncFaqVisibility(){
    const faqSection = findFaqSection();
    if(!faqSection) return;
    const detailArea = document.getElementById('detail-area');
    const onCorrectPage = !!(detailArea && detailArea.style.display === 'block');
    faqSection.style.display = onCorrectPage ? 'none' : '';
  }
 
  function wrap(fnName){
    const original = window[fnName];
    if(typeof original !== 'function') return;
    window[fnName] = function(...args){
      const result = original.apply(this, args);
      setTimeout(syncFaqVisibility, 0);
      return result;
    };
  }
 
  function initHooks(){
    wrap('checkAnswer');
    wrap('nextQuiz');
    wrap('goHome');
    syncFaqVisibility();
  }
 
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initHooks);
  } else {
    initHooks();
  }
  window.addEventListener('load', syncFaqVisibility);
 
  setInterval(syncFaqVisibility, 800);
 
})();
(function moveFaqAboveTrending(){
 
  function findFaqSection(){
    const headers = document.querySelectorAll('h3');
    for(const h of headers){
      if(h.textContent.trim() === 'Frequently Asked Questions'){
        return h.closest('div');
      }
    }
    return null;
  }
 
  function moveFaq(){
    const faqSection = findFaqSection();
    const trending = document.querySelector('.trending-container');
    if(!faqSection || !trending) return;
 
    if(trending.previousElementSibling === faqSection) return;
 
    trending.insertAdjacentElement('beforebegin', faqSection);
    faqSection.style.marginTop = '50px';  
  }
 
  function init(){
    moveFaq();
    setTimeout(moveFaq, 500);
    setTimeout(moveFaq, 1500);
  }
 
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', moveFaq);
 
})();
