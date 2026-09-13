/* =========================================================
   오늘의 모의고사 — 문제 뱅크 + 날짜 시드 자동 생성기
   -----------------------------------------------------------
   설계 원칙:
   - 여기 있는 각 항목의 matchTitle은 script.js의 quizDB에 있는
     title과 정확히 일치해야 함 → 그래야 sourceUrl이 자동으로 맞게 연결됨.
   - 오늘 날짜를 시드로 써서, 같은 날에는 전 세계 누구나 같은 문제를 보고,
     자정이 지나면 자동으로 다른 조합으로 바뀜.
   - 교육 콘텐츠(설명/선택지)는 한글+로마자+영어를 항상 함께 표시.
     UI 버튼/피드백 문구는 사이트 전체 컨벤션에 맞춰 영어로 표시(test.html에서 처리).
   ========================================================= */

window.dailyQuizBank = window.dailyQuizBank || [
  // ---- 공구/도구 ----
  { kr: "커터칼", rom: "keoteokal", en: "Cutter Knife",
    tip: "종이나 박스를 자를 때 쓰는 날카로운 칼입니다.",
    tipRom: "Jongi-na bakseu-reul jareul ttae sseuneun nalkaroun kal-imnida.",
    tipEn: "A sharp knife used to cut paper or boxes.", matchTitle: "Cutter Knife" },
  { kr: "가위", rom: "gawi", en: "Scissors",
    tip: "손으로 종이나 천을 자를 때 쓰는 도구입니다.",
    tipRom: "Son-euro jongi-na cheon-eul jareul ttae sseuneun dogu-imnida.",
    tipEn: "A tool used by hand to cut paper or cloth.", matchTitle: "Scissors" },
  { kr: "망치", rom: "mangchi", en: "Hammer",
    tip: "못을 박거나 물건을 두드릴 때 쓰는 도구입니다.",
    tipRom: "Mos-eul bakgeona mulgeon-eul dudeuril ttae sseuneun dogu-imnida.",
    tipEn: "A tool used to drive nails or strike objects.", matchTitle: "Hammer" },
  { kr: "드라이버", rom: "deuraibeo", en: "Screwdriver",
    tip: "나사를 돌려서 조이거나 풀 때 쓰는 도구입니다.",
    tipRom: "Nasa-reul dollyeoseo joigeona pul ttae sseuneun dogu-imnida.",
    tipEn: "A tool used to turn screws to tighten or loosen them.", matchTitle: "Screwdriver" },
  { kr: "스패너", rom: "seupaeneo", en: "Spanner / Wrench",
    tip: "볼트나 너트를 돌려서 조이는 공구입니다.",
    tipRom: "Bolteu-na neoteu-reul dollyeoseo joineun gonggu-imnida.",
    tipEn: "A tool used to turn and tighten bolts or nuts.", matchTitle: "Spanner / Wrench" },
  { kr: "펜치", rom: "penchi", en: "Pliers",
    tip: "물건을 집거나 철사를 구부릴 때 쓰는 도구입니다.",
    tipRom: "Mulgeon-eul jipgeona cheolsa-reul guburil ttae sseuneun dogu-imnida.",
    tipEn: "A tool used to grip objects or bend wire.", matchTitle: "Pliers" },
  { kr: "니퍼", rom: "nipeo", en: "Nippers",
    tip: "철사나 전선을 자를 때 쓰는 작은 도구입니다.",
    tipRom: "Cheolsa-na jeonseon-eul jareul ttae sseuneun jageun dogu-imnida.",
    tipEn: "A small tool used to cut wire or cables.", matchTitle: "Nippers" },
  { kr: "줄자", rom: "julja", en: "Tape Measure",
    tip: "물건의 길이를 잴 때 쓰는 도구입니다.",
    tipRom: "Mulgeon-ui giri-reul jael ttae sseuneun dogu-imnida.",
    tipEn: "A tool used to measure the length of an object.", matchTitle: "Tape Measure" },

  // ---- 안전 장비 ----
  { kr: "안전모", rom: "anjeonmo", en: "Safety Helmet",
    tip: "머리를 다치지 않게 보호하기 위해 쓰는 모자입니다.",
    tipRom: "Meori-reul dachiji anke bohohagi wihae sseuneun moja-imnida.",
    tipEn: "A hat worn to protect the head from injury.", matchTitle: "Safety Helmet" },
  { kr: "안전화", rom: "anjeonhwa", en: "Safety Shoes",
    tip: "발을 보호하기 위해 신는 튼튼한 신발입니다.",
    tipRom: "Bal-eul bohohagi wihae sinneun teunteunhan sinbal-imnida.",
    tipEn: "Sturdy shoes worn to protect the feet.", matchTitle: "Safety Shoes" },
  { kr: "안전장갑", rom: "anjeonjanggap", en: "Safety Gloves",
    tip: "손을 다치지 않게 보호하기 위해 끼는 장갑입니다.",
    tipRom: "Son-eul dachiji anke bohohagi wihae kkineun janggap-imnida.",
    tipEn: "Gloves worn to protect the hands from injury.", matchTitle: "Safety Gloves" },
  { kr: "보안경", rom: "boangyeong", en: "Safety Goggles",
    tip: "눈을 보호하기 위해 쓰는 안경입니다.",
    tipRom: "Nun-eul bohohagi wihae sseuneun angyeong-imnida.",
    tipEn: "Glasses worn to protect the eyes.", matchTitle: "Safety Goggles" },
  { kr: "방진마스크", rom: "bangjinmaseukeu", en: "Dust Mask",
    tip: "먼지를 막기 위해 코와 입에 쓰는 마스크입니다.",
    tipRom: "Meonji-reul makgi wihae ko-wa ib-e sseuneun maseukeu-imnida.",
    tipEn: "A mask worn over the nose and mouth to block dust.", matchTitle: "Dust Mask" },
  { kr: "귀마개", rom: "gwimagae", en: "Earplug",
    tip: "시끄러운 소리로부터 귀를 보호하기 위해 끼는 물건입니다.",
    tipRom: "Sikkeureoun sori-robuteo gwi-reul bohohagi wihae kkineun mulgeon-imnida.",
    tipEn: "A small item worn to protect the ears from loud noise.", matchTitle: "Earplug" },
  { kr: "안전대", rom: "anjeondae", en: "Safety Harness",
    tip: "높은 곳에서 일할 때 떨어지지 않도록 몸에 착용하는 장비입니다.",
    tipRom: "Nopeun gos-eseo ilhal ttae tteoreojiji ando-rok mom-e chagyonghaneun jangbi-imnida.",
    tipEn: "Equipment worn on the body to prevent falling while working at heights.", matchTitle: "Safety Harness" },
  { kr: "소화기", rom: "sohwagi", en: "Fire Extinguisher",
    tip: "불이 났을 때 불을 끄는 데 쓰는 도구입니다.",
    tipRom: "Bul-i nass-eul ttae bul-eul kkeuneun de sseuneun dogu-imnida.",
    tipEn: "A tool used to put out a fire.", matchTitle: "Fire Extinguisher" },
  { kr: "구급함", rom: "gugeupham", en: "First Aid Kit",
    tip: "다쳤을 때 응급 처치에 필요한 물건이 들어 있는 상자입니다.",
    tipRom: "Dachyeoss-eul ttae eunggeup cheochi-e pilyohan mulgeon-i deur-eo issneun sangja-imnida.",
    tipEn: "A box containing items needed for emergency treatment when injured.", matchTitle: "First Aid Kit" },
  { kr: "방독마스크", rom: "bangdokmaseukeu", en: "Gas Mask",
    tip: "유해 가스로부터 호흡기를 보호하기 위해 쓰는 마스크입니다.",
    tipRom: "Yuhae gaseu-robuteo hoheubgi-reul bohohagi wihae sseuneun maseukeu-imnida.",
    tipEn: "A mask worn to protect the respiratory system from harmful gas.", matchTitle: "Gas Mask" },

  // ---- 근로/노무 용어 ----
  { kr: "병가", rom: "byeongga", en: "Sick Leave",
    tip: "몸이 아파서 회사를 쉬는 것입니다.",
    tipRom: "Mom-i apaseo hoesa-reul swineun geos-imnida.",
    tipEn: "Taking time off work because you are sick.", matchTitle: "Sick Leave" },
  { kr: "휴가", rom: "hyuga", en: "Vacation",
    tip: "일하지 않고 쉬는 날입니다.",
    tipRom: "Ilhaji anko swineun nal-imnida.",
    tipEn: "A day off from work.", matchTitle: "Vacation" },
  { kr: "지각", rom: "jigak", en: "Lateness",
    tip: "정해진 시간보다 늦게 도착하는 것입니다.",
    tipRom: "Jeonghaejin sigan-boda neutge dochakhaneun geos-imnida.",
    tipEn: "Arriving later than the scheduled time.", matchTitle: "Lateness" },
  { kr: "조퇴", rom: "jotoe", en: "Leaving Early",
    tip: "정해진 시간보다 일찍 회사에서 나가는 것입니다.",
    tipRom: "Jeonghaejin sigan-boda iljjik hoesa-eseo naganeun geos-imnida.",
    tipEn: "Leaving work earlier than the scheduled time.", matchTitle: "Leaving Early" },
  { kr: "결근", rom: "gyeolgeun", en: "Absence",
    tip: "출근해야 하는 날에 회사에 나오지 않는 것입니다.",
    tipRom: "Chulgeunhaeya haneun nal-e hoesa-e naoji anneun geos-imnida.",
    tipEn: "Not coming to work on a day you are scheduled to work.", matchTitle: "Absence" },
  { kr: "야근", rom: "yageun", en: "Night Overtime",
    tip: "밤늦게까지 일을 더 하는 것입니다.",
    tipRom: "Bam-neutge-kkaji il-eul deo haneun geos-imnida.",
    tipEn: "Working extra hours late into the night.", matchTitle: "Night Overtime" },
  { kr: "퇴근", rom: "toegeun", en: "Leave Work",
    tip: "일을 마치고 회사에서 집으로 가는 것입니다.",
    tipRom: "Il-eul machigo hoesa-eseo jib-euro ganeun geos-imnida.",
    tipEn: "Finishing work and going home from the company.", matchTitle: "Leave Work" },
  { kr: "출근", rom: "chulgeun", en: "Go to Work",
    tip: "일하러 회사에 가는 것입니다.",
    tipRom: "Ilhareo hoesa-e ganeun geos-imnida.",
    tipEn: "Going to the company to work.", matchTitle: "Go to Work" },
  { kr: "급여명세서", rom: "geupyeo-myeongseoseo", en: "Payslip",
    tip: "월급이 얼마이고 어떻게 계산됐는지 적혀 있는 문서입니다.",
    tipRom: "Wolgeub-i eolma-igo eotteoke gyesandwaess-neunji jeokhyeo issneun munseo-imnida.",
    tipEn: "A document showing how much your salary is and how it was calculated.", matchTitle: "Payslip" },
  { kr: "시급", rom: "sigeup", en: "Hourly Wage",
    tip: "한 시간 일할 때 받는 돈입니다.",
    tipRom: "Han sigan ilhal ttae bad-neun don-imnida.",
    tipEn: "The money you earn for one hour of work.", matchTitle: "Hourly Wage" },
  { kr: "월급", rom: "wolgeup", en: "Monthly Salary",
    tip: "한 달 동안 일하고 받는 돈입니다.",
    tipRom: "Han dal dong-an ilhago bad-neun don-imnida.",
    tipEn: "The money you earn for a month of work.", matchTitle: "Monthly Salary" },
  { kr: "최저임금", rom: "choejeoimgeum", en: "Minimum Wage",
    tip: "법으로 정해진, 반드시 지급해야 하는 가장 적은 임금입니다.",
    tipRom: "Beob-euro jeonghaejin, bandeusi jigeuphaeya haneun gajang jeog-eun imgeum-imnida.",
    tipEn: "The lowest wage set by law that must be paid.", matchTitle: "Minimum Wage" },
  { kr: "퇴직금", rom: "toejikgeum", en: "Severance Pay",
    tip: "회사를 그만둘 때 받는 돈입니다.",
    tipRom: "Hoesa-reul geumandul ttae bad-neun don-imnida.",
    tipEn: "The money you receive when you leave a company.", matchTitle: "Severance Pay" },
  { kr: "사직", rom: "sajik", en: "Resignation",
    tip: "스스로 회사를 그만두는 것입니다.",
    tipRom: "Seuseuro hoesa-reul geumanduneun geos-imnida.",
    tipEn: "Quitting a job by your own choice.", matchTitle: "Resignation" },

  // ---- 음식 ----
  { kr: "비빔밥", rom: "bibimbap", en: "Bibimbap",
    tip: "밥에 여러 나물과 고추장을 넣고 비벼 먹는 한국 음식입니다.",
    tipRom: "Bab-e yeoreo namul-gwa gochujang-eul neoko bibyeo meokneun hanguk eumsik-imnida.",
    tipEn: "A Korean dish made by mixing rice with vegetables and chili paste.", matchTitle: "Bibimbap" },
  { kr: "불고기", rom: "bulgogi", en: "Bulgogi",
    tip: "얇게 썬 고기를 양념에 재워서 구운 한국 음식입니다.",
    tipRom: "Yalgge sseon gogi-reul yangnyeom-e jaewoseo guun hanguk eumsik-imnida.",
    tipEn: "A Korean dish of thinly sliced meat marinated and grilled.", matchTitle: "Bulgogi" },
  { kr: "김치", rom: "gimchi", en: "Kimchi",
    tip: "배추나 무를 양념에 절여서 만든 한국의 대표 반찬입니다.",
    tipRom: "Baechu-na mu-reul yangnyeom-e jeolyeoseo mandeun hanguk-ui daepyo banchan-imnida.",
    tipEn: "Korea's representative side dish made by fermenting cabbage or radish in seasoning.", matchTitle: "Kimchi" },
  { kr: "삼겹살", rom: "samgyeopsal", en: "Samgyeopsal",
    tip: "돼지고기의 한 부위로, 구워 먹는 인기 있는 한국 음식입니다.",
    tipRom: "Dwaejigogi-ui han buwi-ro, guwo meokneun ingi issneun hanguk eumsik-imnida.",
    tipEn: "A popular Korean food made from a pork cut that is grilled.", matchTitle: "Samgyeopsal" },
  { kr: "떡볶이", rom: "tteokbokki", en: "Tteokbokki",
    tip: "떡을 매운 양념에 볶아 만든 한국의 분식입니다.",
    tipRom: "Tteog-eul maeun yangnyeom-e bokk-a mandeun hanguk-ui bunsig-imnida.",
    tipEn: "A Korean street food made by stir-frying rice cakes in spicy sauce.", matchTitle: "Tteokbokki" },
  { kr: "라면", rom: "ramyeon", en: "Ramen",
    tip: "뜨거운 물에 끓여 먹는 인스턴트 국수입니다.",
    tipRom: "Tteugeoun mul-e kkeulyeo meokneun inseuteonteu guksu-imnida.",
    tipEn: "Instant noodles cooked in hot water.", matchTitle: "Ramen" },
  { kr: "김밥", rom: "gimbap", en: "Gimbap",
    tip: "밥과 여러 재료를 김으로 말아서 만든 한국 음식입니다.",
    tipRom: "Bab-gwa yeoreo jaeryo-reul gim-euro mar-aseo mandeun hanguk eumsik-imnida.",
    tipEn: "A Korean food made by rolling rice and various ingredients in dried seaweed.", matchTitle: "Gimbap" },

  // ---- 일상 어휘 ----
  { kr: "고양이", rom: "goyangi", en: "Cat",
    tip: "야옹 하고 우는, 사람들이 많이 키우는 동물입니다.",
    tipRom: "Yaong hago uneun, saramdeul-i mani kiuneun dongmul-imnida.",
    tipEn: "An animal that meows and is commonly kept as a pet.", matchTitle: "Cat" },
  { kr: "강아지", rom: "gangaji", en: "Dog",
    tip: "멍멍 하고 짖는, 사람들이 많이 키우는 동물입니다.",
    tipRom: "Meongmeong hago jitneun, saramdeul-i mani kiuneun dongmul-imnida.",
    tipEn: "An animal that barks and is commonly kept as a pet.", matchTitle: "Dog" },
  { kr: "버스", rom: "beoseu", en: "Bus",
    tip: "여러 사람이 함께 타는 큰 대중교통 수단입니다.",
    tipRom: "Yeoreo saram-i hamkke taneun keun daejunggyotong sudan-imnida.",
    tipEn: "A large public transportation vehicle many people ride together.", matchTitle: "Bus" },
  { kr: "택시", rom: "taeksi", en: "Taxi",
    tip: "돈을 내고 원하는 곳까지 갈 수 있는 자동차입니다.",
    tipRom: "Don-eul naego wonhaneun gos-kkaji gal su issneun jadongcha-imnida.",
    tipEn: "A car you can pay to ride to your destination.", matchTitle: "Taxi" },
  { kr: "기차", rom: "gicha", en: "Train",
    tip: "철로 위를 달리는 대중교통 수단입니다.",
    tipRom: "Cheollo wi-reul dallineun daejunggyotong sudan-imnida.",
    tipEn: "A public transportation vehicle that runs on rails.", matchTitle: "Train" },

  // ---- 서류/신분 ----
  { kr: "외국인등록증", rom: "oegugindeungrokjeung", en: "Alien Registration Card",
    tip: "한국에 사는 외국인이 신분을 증명하기 위해 갖고 있어야 하는 카드입니다.",
    tipRom: "Hanguk-e saneun oegugin-i sinbun-eul jeungmyeonghagi wihae gajgo iss-eoya haneun kadeu-imnida.",
    tipEn: "A card foreign residents in Korea must have to prove their identity.", matchTitle: "Alien Registration Card" },
  { kr: "여권", rom: "yeogwon", en: "Passport",
    tip: "다른 나라를 여행하거나 입국할 때 필요한 신분증명서입니다.",
    tipRom: "Dareun nara-reul yeohaenghageona ipgukhal ttae pilyohan sinbunjeungmyeongseo-imnida.",
    tipEn: "An identity document needed to travel to or enter another country.", matchTitle: "Passport" },
  { kr: "비자", rom: "bija", en: "Visa",
    tip: "외국인이 한국에 들어와서 머무를 수 있도록 허가하는 증명입니다.",
    tipRom: "Oegugin-i hanguk-e deur-eowaseo meomureul su issdorok heogahaneun jeungmyeong-imnida.",
    tipEn: "Permission that allows a foreigner to enter and stay in Korea.", matchTitle: "Visa" }
];

/* =========================================================
   날짜 시드 기반 의사난수 (같은 날짜 → 항상 같은 결과)
   ========================================================= */
function getTodayDateStr(){
  return new Date().toISOString().slice(0, 10); // "2026-09-14"
}

function seedFromString(str){
  let hash = 0;
  for (let i = 0; i < str.length; i++){
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// mulberry32: 가볍고 충분히 균등한 시드 기반 PRNG
function mulberry32(seed){
  return function(){
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, rand){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =========================================================
   오늘의 모의고사 큐 생성 (문제 하나씩 순서대로 풀도록)
   -----------------------------------------------------------
   count: 오늘 몇 문제를 낼지 (기본 10개)
   sourceUrl은 script.js의 window.quizDB에서 matchTitle로 자동 매칭.

   반환되는 각 문제 객체:
   {
     question, questionRom, questionEn   → 설명(tip) 한글/로마자/영어
     options: [{kr, rom, en}, ...]        → 선택지 4개, 각각 한글/로마자/영어
     answer                               → 정답 인덱스
     sourceUrl, sourceTitle               → 개별 페이지 연결용
   }
   ========================================================= */
function buildDailyQuizQueue(count){
  count = count || 10;
  const dateStr = getTodayDateStr();
  const rand = mulberry32(seedFromString(dateStr));
  const bank = window.dailyQuizBank || [];
  if (bank.length === 0) return [];

  const picked = seededShuffle(bank, rand).slice(0, Math.min(count, bank.length));

  return picked.map(item => {
    const distractorPool = bank.filter(b => b.en !== item.en);
    const distractorItems = seededShuffle(distractorPool, rand).slice(0, 3);
    const optionItems = seededShuffle([item, ...distractorItems], rand);
    const options = optionItems.map(o => ({ kr: o.kr, rom: o.rom, en: o.en }));
    const answerIndex = optionItems.findIndex(o => o.en === item.en);
    const sourceEntry = (window.quizDB || []).find(q => q.title === item.matchTitle);

    return {
      question: item.tip,
      questionRom: item.tipRom,
      questionEn: item.tipEn,
      options: options,
      answer: answerIndex,
      sourceUrl: sourceEntry ? sourceEntry.url : null,
      sourceTitle: item.matchTitle
    };
  });
}

window.buildDailyQuizQueue = buildDailyQuizQueue;
window.getTodayDateStr = getTodayDateStr;
