/* =========================================================
   EPS-TOPIK 정식 모의고사 데이터
   -----------------------------------------------------------
   실제 EPS-TOPIK 형식 기준(2026년):
   - 총 40문항, 50분, 쉬는 시간 없음
   - 듣기 20문항(25분) + 읽기 20문항(25분)
   - 전부 4지선다, 각 2.5점 (합계 100점)
   - 합격선은 업종마다 다름 (제조업 60점 / 그 외 45점 / 어업 특례 30점)
     → 이 앱은 참고용 연습이며, 실제 시험 채점 기준은 HRD Korea 공식 안내를 따라야 함

   세트 추가 방법: 아래 mockExamSets 배열에 같은 형식으로 객체를 추가하면 됨.
   free: true 인 세트만 무료로 열림. 나머지는 유료(paid) 플랜만 접근 가능.

   ✅ sourceUrl/sourceTitle:
   각 문항이 quizDB(script.js) 600개 레슨 페이지 중 어떤 페이지와 "주제"로 연결되는지
   나타내는 필드. 문제 문장과 레슨 페이지 문장이 토씨 하나까지 일치할 필요는 없음 —
   같은 주제를 더 공부하고 싶을 때 찾아갈 곳을 안내하는 용도. 시험 응시 중에는
   화면에 노출되지 않고, 결과 화면(정답/오답 40문항 리뷰)에서만
   "📚 Study [제목] →" 버튼을 만드는 데 쓰인다.
   나중에 quizDB에 새 페이지가 추가되면, 그 페이지를 주제로 새 문항/새 세트를
   똑같은 방식으로 계속 만들어나갈 수 있음.

   ✅ 2회차 수정 사항 (1회차 대비):
   - R05: 오답 중 하나("버스를 내려요")가 사실 자연스러운 표현이라
     복수 정답처럼 읽히던 문제 → 명확하게 하나만 맞는 조사 문제로 교체
   - sourceUrl 중복 제거: jakeop.html(R02/R09), geunmuji.html(R05/R19),
     apayo1.html(L08/R07)이 겹쳐 쓰이던 것을 40문항 전부 서로 다른 페이지로 재매핑
   ========================================================= */

window.mockExamSets = window.mockExamSets || [
  {
    id: "set_01",
    title: "EPS-TOPIK Mock Test #1",
    free: true,
    listening: [
      { id: "L01", audioText: "안녕하세요. 처음 뵙겠습니다.", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["네, 반갑습니다.", "네, 맛있어요.", "네, 비싸요.", "네, 늦었어요."], answer: 0,
        sourceUrl: "annyeonghaseyo1.html", sourceTitle: "Hello" },
      { id: "L02", audioText: "지금 몇 시예요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["9시예요.", "월요일이에요.", "회사예요.", "3만원이에요."], answer: 0,
        sourceUrl: "jigeummyeotsiyeyo1.html", sourceTitle: "What Time Is It?" },
      { id: "L03", audioText: "오늘 날씨가 어때요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["추워요.", "친구예요.", "먹어요.", "일요일이에요."], answer: 0,
        sourceUrl: "weather.html", sourceTitle: "Weather" },
      { id: "L04", audioText: "이거 얼마예요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["5천원이에요.", "5시예요.", "5개예요.", "5층이에요."], answer: 0,
        sourceUrl: "eolmayeyo1.html", sourceTitle: "How Much Is It" },
      { id: "L05", audioText: "화장실이 어디에 있어요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["저기 있어요.", "내일 있어요.", "많이 있어요.", "친구가 있어요."], answer: 0,
        sourceUrl: "hwajangsil1.html", sourceTitle: "Where Is the Restroom?" },
      { id: "L06", audioText: "남자: 오늘 회사에 몇 시까지 가요? 여자: 8시까지 가요.", question: "여자는 몇 시까지 회사에 갑니까?",
        options: ["8시", "9시", "7시", "6시"], answer: 0,
        sourceUrl: "chulgeun.html", sourceTitle: "Go to Work" },
      { id: "L07", audioText: "남자: 안전모를 써 주세요. 여자: 네, 알겠습니다.", question: "남자가 여자에게 부탁한 것은 무엇입니까?",
        options: ["안전모 착용", "장갑 착용", "마스크 착용", "안전화 착용"], answer: 0,
        sourceUrl: "anjeonmo.html", sourceTitle: "Safety Helmet" },
      { id: "L08", audioText: "여자: 오늘 몸이 아파서 병원에 가야 해요. 남자: 그럼 오늘 회사를 쉬세요.", question: "여자는 오늘 무엇을 합니까?",
        options: ["병원에 간다", "회사에 간다", "학교에 간다", "여행을 간다"], answer: 0,
        sourceUrl: "apayo1.html", sourceTitle: "Im Sick" },
      { id: "L09", audioText: "남자: 이 서류에 사인해 주세요. 여자: 네, 여기 사인할게요.", question: "여자가 하는 행동은 무엇입니까?",
        options: ["서류에 사인한다", "서류를 버린다", "서류를 복사한다", "서류를 읽는다"], answer: 0,
        sourceUrl: "seomyeong.html", sourceTitle: "Signature" },
      { id: "L10", audioText: "남자: 다음 주에 휴가를 가고 싶어요. 여자: 언제부터 언제까지예요?", question: "여자가 남자에게 물어본 것은 무엇입니까?",
        options: ["휴가 기간", "휴가 이유", "휴가 장소", "휴가 비용"], answer: 0,
        sourceUrl: "hyuga.html", sourceTitle: "Vacation" },
      { id: "L11", audioText: "공장 안에서는 뛰지 마세요. 위험합니다.", question: "이 방송의 목적은 무엇입니까?",
        options: ["안전 주의를 준다", "휴식을 알린다", "식사를 안내한다", "퇴근을 알린다"], answer: 0,
        sourceUrl: "wiheom.html", sourceTitle: "Danger" },
      { id: "L12", audioText: "오늘 야근이 있습니다. 저녁 8시까지 근무합니다.", question: "오늘 근무는 몇 시까지입니까?",
        options: ["저녁 8시", "저녁 6시", "밤 10시", "낮 12시"], answer: 0,
        sourceUrl: "yageun.html", sourceTitle: "Night Overtime" },
      { id: "L13", audioText: "이번 달 월급은 25일에 나옵니다.", question: "월급은 언제 나옵니까?",
        options: ["25일", "15일", "30일", "1일"], answer: 0,
        sourceUrl: "wolgeup.html", sourceTitle: "Monthly Salary" },
      { id: "L14", audioText: "남자: 이 기계가 고장 났어요. 여자: 반장님께 말씀드릴게요.", question: "여자는 무엇을 할 것입니까?",
        options: ["반장에게 알린다", "기계를 고친다", "기계를 버린다", "집에 간다"], answer: 0,
        sourceUrl: "banjang.html", sourceTitle: "Foreman" },
      { id: "L15", audioText: "다음 버스는 10분 후에 도착합니다.", question: "버스는 언제 도착합니까?",
        options: ["10분 후", "10시간 후", "지금", "내일"], answer: 0,
        sourceUrl: "bus.html", sourceTitle: "Bus" },
      { id: "L16", audioText: "남자: 실례합니다. 은행이 어디예요? 여자: 이 길로 쭉 가세요. 왼쪽에 있어요.", question: "은행은 어느 쪽에 있습니까?",
        options: ["왼쪽", "오른쪽", "위쪽", "뒤쪽"], answer: 0,
        sourceUrl: "oenjjogeurodoseyo1.html", sourceTitle: "Turn Left" },
      { id: "L17", audioText: "물건을 받으면 바로 검사해 주세요.", question: "물건을 받은 후에 해야 할 일은 무엇입니까?",
        options: ["검사한다", "판매한다", "포장한다", "버린다"], answer: 0,
        sourceUrl: "geomsa.html", sourceTitle: "Inspection" },
      { id: "L18", audioText: "남자: 오늘 왜 늦었어요? 여자: 죄송합니다. 버스를 놓쳤어요.", question: "여자가 늦은 이유는 무엇입니까?",
        options: ["버스를 놓쳤다", "길을 잃었다", "몸이 아팠다", "잠을 잤다"], answer: 0,
        sourceUrl: "jigak.html", sourceTitle: "Lateness" },
      { id: "L19", audioText: "이 작업은 장갑을 끼고 하세요.", question: "이 작업을 할 때 착용해야 하는 것은 무엇입니까?",
        options: ["장갑", "안경", "모자", "신발"], answer: 0,
        sourceUrl: "anjeonjanggap.html", sourceTitle: "Safety Gloves" },
      { id: "L20", audioText: "남자: 내일부터 3일 동안 휴가입니다. 여자: 네, 잘 다녀오세요.", question: "남자는 며칠 동안 휴가입니까?",
        options: ["3일", "1일", "5일", "일주일"], answer: 0,
        sourceUrl: "yeonchahyuga.html", sourceTitle: "Annual Leave" }
    ],
    reading: [
      /* [1~4] 설명을 보고 알맞은 단어/문장 고르기 (실제 시험은 그림 제시, 이 앱은 이미지 대신 설명 텍스트로 대체) */
      { id: "R01", question: "다음 설명에 알맞은 단어를 고르세요.\n\n손으로 종이나 천을 자를 때 쓰는 도구입니다.",
        options: ["가위", "볼펜", "안경", "가방"], answer: 0,
        sourceUrl: "gawi.html", sourceTitle: "Scissors" },
      { id: "R02", question: "다음 설명에 알맞은 단어를 고르세요.\n\n공사장에서 땅을 파는 데 쓰는 큰 기계입니다.",
        options: ["굴착기", "지게차", "트랙터", "자전거"], answer: 0,
        sourceUrl: "jakeop.html", sourceTitle: "Work" },
      { id: "R03", question: "다음 상황 설명에 알맞은 문장을 고르세요.\n\n한 사람이 의자에 앉아서 종이책을 펴고 들여다보고 있습니다.",
        options: ["책을 읽고 있습니다.", "밥을 먹고 있습니다.", "피아노를 치고 있습니다.", "친구를 만나고 있습니다."], answer: 0,
        sourceUrl: "book.html", sourceTitle: "Book" },
      { id: "R04", question: "다음 표지판 설명에 어울리는 문장을 고르세요.\n\n노란 바탕에 번개 모양이 그려진 경고 표지판입니다.",
        options: ["전기가 흐르니까 조심하세요.", "바닥이 미끄러우니까 조심하세요.", "불이 붙을 수 있으니까 조심하세요.", "떨어질 수 있으니까 조심하세요."], answer: 0,
        sourceUrl: "gyeonggo.html", sourceTitle: "Warning" },

      /* [5~6] 밑줄 친 조사/표현이 맞는 것 고르기 */
      { id: "R05", question: "다음 중 밑줄 친 조사가 맞는 것을 고르세요.\n\n저는 매일 아침 8시에 ___에서 일해요.",
        options: ["공장에서 일해요.", "공장에게 일해요.", "공장을 일해요.", "공장이 일해요."], answer: 0,
        sourceUrl: "geunroja.html", sourceTitle: "Worker" },
      { id: "R06", question: "다음 중 밑줄 친 부분이 맞는 것을 고르세요.",
        options: ["오늘 시내에서 많이 걸었어요.", "심심하면 한국 노래를 듣어요.", "친구한테서 선물을 받었어요.", "퇴근할 때 문을 닫라요."], answer: 0,
        sourceUrl: "city.html", sourceTitle: "City" },

      /* [7~10] 짧은 글(공고문/안내문 등) 읽고 답하기 */
      { id: "R07", question: "다음 안내문을 읽고 물음에 답하세요.\n\n\"튼튼치과 진료 시간: 오전 9시 ~ 오후 6시 (일요일 휴무)\"\n\n이 병원이 문을 여는 시간은 언제입니까?",
        options: ["오전 9시", "오전 6시", "오후 9시", "휴무일 없음"], answer: 0,
        sourceUrl: "byeongga.html", sourceTitle: "Sick Leave" },
      { id: "R08", question: "다음 단어와 관계있는 것을 고르세요.\n\n복장",
        options: ["작업복", "컴퓨터", "비빔밥", "기차표"], answer: 0,
        sourceUrl: "bohogu.html", sourceTitle: "Protective Gear" },
      { id: "R09", question: "다음 단어와 관계있는 것을 고르세요.\n\n작업장",
        options: ["근로자가 일하는 곳입니다.", "근로자가 거주하는 곳입니다.", "근로자가 운동하는 곳입니다.", "근로자가 상담하는 곳입니다."], answer: 0,
        sourceUrl: "geunmuji.html", sourceTitle: "Workplace" },
      { id: "R10", question: "다음 안내문을 읽고 물음에 답하세요.\n\n\"이번 주 급여는 통장으로 입금됩니다. 급여 명세서는 이메일로 발송됩니다.\"\n\n급여 명세서는 어떻게 받습니까?",
        options: ["이메일로 받습니다.", "직접 받으러 갑니다.", "우편으로 받습니다.", "문자로 받습니다."], answer: 0,
        sourceUrl: "geupyeo-myeongseoseo.html", sourceTitle: "Payslip" },

      /* [11~16] 빈칸에 들어갈 가장 알맞은 표현 고르기 */
      { id: "R11", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n지급 방법: _____________",
        options: ["통장 입금", "가족 모임", "생일 선물", "출근 시간"], answer: 0,
        sourceUrl: "tongjang.html", sourceTitle: "Bank Account" },
      { id: "R12", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n한국어를 배우고 싶지만 학원에 갈 시간이 없습니다. 그래서 퇴근 후에 인터넷 강의를 ______ 한국어를 공부하고 있습니다.",
        options: ["들으면서", "듣느라고", "들으려고", "듣자마자"], answer: 0,
        sourceUrl: "gongbu1.html", sourceTitle: "Let's Study" },
      { id: "R13", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n오늘은 다른 날보다 길이 많이 막힙니다. ______ 가지 않으면 회사에 늦을 것 같습니다.",
        options: ["서둘러서", "조심해서", "서두르게", "조심하게"], answer: 0,
        sourceUrl: "ppalli1.html", sourceTitle: "Hurry Up" },
      { id: "R14", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n오늘은 날씨가 너무 덥습니다. 집에 오자마자 선풍기를 ______ 시원한 물을 마셨습니다.",
        options: ["틀고", "틀면", "틀려고", "틀려면"], answer: 0,
        sourceUrl: "water.html", sourceTitle: "Water" },
      { id: "R15", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n작업 중 손을 다쳤을 때는 상처가 가벼워도 바로 소독을 해야 합니다. 그리고 병원에 가서 진료를 받고 필요하면 주사를 ______",
        options: ["맞는 것이 좋습니다.", "놓는 것이 좋습니다.", "맞지 않도록 합니다.", "놓지 않도록 합니다."], answer: 0,
        sourceUrl: "eunggeupcheochi.html", sourceTitle: "First Aid" },
      { id: "R16", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n어두운 곳에서 작업할 때는 가시성이 높은 ______ 이것을 입으면 멀리서도 잘 보여서 사고를 막을 수 있습니다.",
        options: ["반사 조끼를 착용해야 합니다.", "보호 장갑을 구매해야 합니다.", "비상 계단을 이용해야 합니다.", "환기 장치를 작동해야 합니다."], answer: 0,
        sourceUrl: "anjeon_suchik.html", sourceTitle: "Safety Rules" },

      /* [17] 설명 보고 어휘 맞추기 */
      { id: "R17", question: "다음 설명에 알맞은 어휘를 고르세요.\n\n손에 쥐고 철사를 끊거나 구부릴 때 쓰는 도구입니다. 전선이나 작은 부품을 잡을 때도 사용합니다.",
        options: ["펜치", "토치", "쇠톱", "망치"], answer: 0,
        sourceUrl: "penchi.html", sourceTitle: "Pliers" },

      /* [18] 글 읽고 주제 고르기 */
      { id: "R18", question: "다음 글을 읽고 무엇에 대한 글인지 고르세요.\n\n한국 사람들은 계절마다 즐겨 먹는 음식이 있습니다. 여름에는 차갑고 시원한 냉면, 콩국수, 팥빙수 등을 많이 먹습니다. 겨울에는 뜨거운 국이나 따뜻한 팥죽, 군고구마, 호떡 등을 자주 먹습니다.",
        options: ["계절 음식", "음식 재료", "조리 방법", "조리 시기"], answer: 0,
        sourceUrl: "food.html", sourceTitle: "Food" },

      /* [19~20] 긴 글 읽고 내용과 같은 것 고르기 */
      { id: "R19", question: "다음을 읽고 내용과 같은 것을 고르세요.\n\n\"사내 휴게실 이용 안내: 출입문 비밀번호는 게시판에서 확인하세요. 회사 직원이면 누구나 이용할 수 있습니다. 이용 후에는 문을 꼭 닫고 나가야 합니다.\"",
        options: ["회사 직원은 누구나 휴게실을 이용할 수 있습니다.", "휴게실 출입문에는 비밀번호가 없습니다.", "이용 후에는 문을 열어 두고 나가야 합니다.", "다른 회사 직원도 이용할 수 있습니다."], answer: 0,
        sourceUrl: "chwieopgyuchik.html", sourceTitle: "Employment Rules" },
      { id: "R20", question: "다음을 읽고 내용과 같은 것을 고르세요.\n\n\"한국에서 일하는 외국인 근로자는 4대 사회보험 혜택을 받습니다. 이 중 산재보험은 사업주만 가입하면 되지만, 국민연금·건강보험·고용보험은 사업주와 근로자 모두 반드시 가입해야 합니다.\"",
        options: ["산재보험은 사업주만 가입하면 됩니다.", "산재보험은 근로자와 사업주가 모두 가입해야 합니다.", "국민연금은 사업주만 가입하면 됩니다.", "근로자는 원하는 보험만 선택해서 가입할 수 있습니다."], answer: 0,
        sourceUrl: "sanjaeboheom.html", sourceTitle: "Industrial Accident Insurance" }
    ]
  }
];
