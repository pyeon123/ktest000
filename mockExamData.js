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
  },
  {
    id: "set_02",
    title: "EPS-TOPIK Mock Test #2",
    free: true,
    listening: [
      { id: "L01", audioText: "이 음식 맛이 어때요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["맛있어요.", "커요.", "빨라요.", "조용해요."], answer: 0,
        sourceUrl: "masisseo1.html", sourceTitle: "It's Delicious" },
      { id: "L02", audioText: "생일이 언제예요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["다음 달이에요.", "회사예요.", "만원이에요.", "형이에요."], answer: 0,
        sourceUrl: "saengilchukha1.html", sourceTitle: "Happy Birthday" },
      { id: "L03", audioText: "이름이 뭐예요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["김민수예요.", "한국이에요.", "일곱 살이에요.", "교실이에요."], answer: 0,
        sourceUrl: "irum1.html", sourceTitle: "What's Your Name" },
      { id: "L04", audioText: "커피 드시겠어요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["네, 주세요.", "아니요, 늦었어요.", "네, 비싸요.", "아니요, 가까워요."], answer: 0,
        sourceUrl: "keopijuseyo1.html", sourceTitle: "Coffee Please" },
      { id: "L05", audioText: "여기서 멀어요?", question: "다음을 듣고 알맞은 대답을 고르세요.",
        options: ["아니요, 가까워요.", "네, 맛있어요.", "아니요, 늦었어요.", "네, 커요."], answer: 0,
        sourceUrl: "gakkawoyo1.html", sourceTitle: "Is It Close?" },
      { id: "L06", audioText: "남자: 이번 달 수당이 얼마예요? 여자: 20만원 정도예요.", question: "여자의 이번 달 수당은 얼마입니까?",
        options: ["20만원", "10만원", "30만원", "5만원"], answer: 0,
        sourceUrl: "sudang.html", sourceTitle: "Allowance" },
      { id: "L07", audioText: "남자: 기숙사에서 지내요? 여자: 네, 회사 기숙사에서 지내요.", question: "여자는 어디에서 지냅니까?",
        options: ["회사 기숙사", "친구 집", "호텔", "고향집"], answer: 0,
        sourceUrl: "gisuksa.html", sourceTitle: "Dormitory" },
      { id: "L08", audioText: "남자: 계약 기간이 언제까지예요? 여자: 내년 12월까지예요.", question: "여자의 계약 기간은 언제까지입니까?",
        options: ["내년 12월까지", "이번 달까지", "다음 주까지", "올해 6월까지"], answer: 0,
        sourceUrl: "gyeyak-gigan.html", sourceTitle: "Contract Period" },
      { id: "L09", audioText: "남자: 오늘 제품 몇 개 만들었어요? 여자: 오백 개 만들었어요.", question: "여자는 오늘 제품을 몇 개 만들었습니까?",
        options: ["오백 개", "오십 개", "오천 개", "오 개"], answer: 0,
        sourceUrl: "jepum.html", sourceTitle: "Product" },
      { id: "L10", audioText: "남자: 이 부품을 어디에 두면 돼요? 여자: 창고에 두세요.", question: "부품을 어디에 둬야 합니까?",
        options: ["창고", "사무실", "식당", "기숙사"], answer: 0,
        sourceUrl: "changgo.html", sourceTitle: "Warehouse" },
      { id: "L11", audioText: "이 기계는 고장 났으니 사용하지 마세요.", question: "이 방송의 목적은 무엇입니까?",
        options: ["기계 사용 금지 안내", "점심시간 안내", "퇴근 시간 안내", "회식 안내"], answer: 0,
        sourceUrl: "gojang.html", sourceTitle: "Breakdown" },
      { id: "L12", audioText: "오늘부터 새 사원증을 지급합니다.", question: "오늘부터 무엇을 지급합니까?",
        options: ["사원증", "안전화", "식권", "교통비"], answer: 0,
        sourceUrl: "sinbunjeung.html", sourceTitle: "ID Card" },
      { id: "L13", audioText: "남자: 다음 주에 회사를 그만둬요. 여자: 왜 그만두세요?", question: "남자는 다음 주에 무엇을 합니까?",
        options: ["회사를 그만둔다", "이직 준비를 한다", "휴가를 간다", "출장을 간다"], answer: 0,
        sourceUrl: "sajik.html", sourceTitle: "Resignation" },
      { id: "L14", audioText: "남자: 이번 달 세금이 얼마 나왔어요? 여자: 몇만 원 나왔어요.", question: "무엇에 대해 이야기하고 있습니까?",
        options: ["세금", "월급", "수당", "상여금"], answer: 0,
        sourceUrl: "segeum.html", sourceTitle: "Tax" },
      { id: "L15", audioText: "여권을 꼭 가지고 다니세요.", question: "무엇을 가지고 다니라고 했습니까?",
        options: ["여권", "우산", "지갑", "휴대폰"], answer: 0,
        sourceUrl: "yeogwon.html", sourceTitle: "Passport" },
      { id: "L16", audioText: "남자: 비자 연장 신청했어요? 여자: 네, 지난주에 했어요.", question: "여자는 언제 비자 연장을 신청했습니까?",
        options: ["지난주", "오늘", "내일", "다음 달"], answer: 0,
        sourceUrl: "cheryuyeonjang.html", sourceTitle: "Extension of Stay" },
      { id: "L17", audioText: "포장한 제품은 창고로 옮겨 주세요.", question: "포장한 제품은 어디로 옮겨야 합니까?",
        options: ["창고", "사무실", "식당", "주차장"], answer: 0,
        sourceUrl: "pojang.html", sourceTitle: "Packaging" },
      { id: "L18", audioText: "남자: 오늘 검사에서 불량품이 나왔어요. 여자: 몇 개나 나왔어요?", question: "무엇에 대해 이야기하고 있습니까?",
        options: ["불량품", "완성품", "원자재", "견본품"], answer: 0,
        sourceUrl: "bulryangpum.html", sourceTitle: "Defective Product" },
      { id: "L19", audioText: "이 자재는 조심히 다뤄 주세요. 깨지기 쉽습니다.", question: "이 자재를 어떻게 다뤄야 합니까?",
        options: ["조심히 다뤄야 한다", "빨리 옮겨야 한다", "밖에 둬야 한다", "버려야 한다"], answer: 0,
        sourceUrl: "wonjajae.html", sourceTitle: "Raw Materials" },
      { id: "L20", audioText: "남자: 다음 달에 최저임금이 오른대요. 여자: 그래요? 잘됐네요.", question: "다음 달에 무엇이 오릅니까?",
        options: ["최저임금", "물가", "기름값", "집세"], answer: 0,
        sourceUrl: "choejeoimgeum.html", sourceTitle: "Minimum Wage" }
    ],
    reading: [
      { id: "R01", question: "다음 설명에 알맞은 단어를 고르세요.\n\n물건을 나르거나 옮길 때 타는 큰 차입니다.",
        options: ["트럭", "자전거", "비행기", "배"], answer: 0,
        sourceUrl: "unban.html", sourceTitle: "Transport" },
      { id: "R02", question: "다음 설명에 알맞은 단어를 고르세요.\n\n음식을 넣어서 차갑게 보관하는 가전제품입니다.",
        options: ["냉장고", "세탁기", "전자레인지", "청소기"], answer: 0,
        sourceUrl: "electronics.html", sourceTitle: "Electronics" },
      { id: "R03", question: "다음 상황 설명에 알맞은 문장을 고르세요.\n\n한 사람이 침대에 누워서 눈을 감고 자고 있습니다.",
        options: ["자고 있습니다.", "일하고 있습니다.", "운전하고 있습니다.", "요리하고 있습니다."], answer: 0,
        sourceUrl: "bed.html", sourceTitle: "Bed" },
      { id: "R04", question: "다음 표지판 설명에 어울리는 문장을 고르세요.\n\n빨간 바탕에 불꽃 모양이 그려진 표지판입니다.",
        options: ["불이 날 수 있으니 조심하세요.", "미끄러우니 조심하세요.", "전기가 흐르니 조심하세요.", "무거우니 조심하세요."], answer: 0,
        sourceUrl: "hwajae.html", sourceTitle: "Fire" },

      { id: "R05", question: "다음 중 밑줄 친 조사가 맞는 것을 고르세요.\n\n저는 아침 8시에 회사___ 도착해요.",
        options: ["회사에 도착해요.", "회사에서 도착해요.", "회사를 도착해요.", "회사가 도착해요."], answer: 0,
        sourceUrl: "company.html", sourceTitle: "Company" },
      { id: "R06", question: "다음 중 밑줄 친 부분이 맞는 것을 고르세요.\n\n출근하기 전에 얼굴을 ______.",
        options: ["씻어요.", "씻으요.", "씻아요.", "씻었요."], answer: 0,
        sourceUrl: "morning.html", sourceTitle: "Morning" },

      { id: "R07", question: "다음 안내문을 읽고 물음에 답하세요.\n\n\"기차 운행 시간: 오전 6시 ~ 오후 11시 (배차 간격 15분)\"\n\n기차는 몇 분마다 옵니까?",
        options: ["15분마다", "6분마다", "11분마다", "30분마다"], answer: 0,
        sourceUrl: "train.html", sourceTitle: "Train" },
      { id: "R08", question: "다음 단어와 관계있는 것을 고르세요.\n\n주방",
        options: ["요리", "운동", "잠", "쇼핑"], answer: 0,
        sourceUrl: "kitchen.html", sourceTitle: "Kitchen" },
      { id: "R09", question: "다음 단어와 관계있는 것을 고르세요.\n\n부품",
        options: ["기계나 제품을 만드는 데 쓰이는 작은 조각입니다.", "근로자가 쉬는 곳입니다.", "회사 대표를 말합니다.", "월급을 받는 날입니다."], answer: 0,
        sourceUrl: "bupum.html", sourceTitle: "Parts" },
      { id: "R10", question: "다음 안내문을 읽고 물음에 답하세요.\n\n\"이번 달 상여금은 급여와 함께 지급됩니다. 지급일은 25일입니다.\"\n\n상여금은 언제 지급됩니까?",
        options: ["25일", "1일", "15일", "30일"], answer: 0,
        sourceUrl: "sangyeogeum.html", sourceTitle: "Bonus" },

      { id: "R11", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n지급 방법: _____________",
        options: ["계좌 이체", "가족 모임", "생일 선물", "출근 시간"], answer: 0,
        sourceUrl: "gyejwabeonho.html", sourceTitle: "Account Number" },
      { id: "R12", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n기계 소리가 이상하면 ______ 반장님께 알려야 합니다.",
        options: ["즉시", "즉시로", "즉시하게", "즉시히"], answer: 0,
        sourceUrl: "ojakdong.html", sourceTitle: "Malfunction" },
      { id: "R13", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n물건이 도착하면 ______ 수량을 확인해야 합니다.",
        options: ["먼저", "먼저는", "먼저가", "먼저를"], answer: 0,
        sourceUrl: "suryang.html", sourceTitle: "Quantity" },
      { id: "R14", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n오늘은 잔업이 있어서 ______ 집에 갈 수 없습니다.",
        options: ["일찍", "일찍이는", "일찍게", "일찍히"], answer: 0,
        sourceUrl: "janeop.html", sourceTitle: "Remaining Work" },
      { id: "R15", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n몸이 안 좋으면 무리하지 말고 팀장님께 ______",
        options: ["말씀드리는 것이 좋습니다.", "말씀드리지 않는 것이 좋습니다.", "말씀드릴 수 없습니다.", "말씀드려야 안 됩니다."], answer: 0,
        sourceUrl: "timjang.html", sourceTitle: "Team Leader" },
      { id: "R16", question: "빈칸에 들어갈 가장 알맞은 것을 고르세요.\n\n밤에 어두운 길을 걸을 때는 ______ 이것을 착용하면 차량 운전자가 멀리서도 알아볼 수 있습니다.",
        options: ["야광 조끼를 착용해야 합니다.", "보호 장갑을 구매해야 합니다.", "마스크를 착용해야 합니다.", "장화를 신어야 합니다."], answer: 0,
        sourceUrl: "anjeon_gyoyuk.html", sourceTitle: "Safety Training" },

      { id: "R17", question: "다음 설명에 알맞은 어휘를 고르세요.\n\n선을 정확하게 재거나 물건의 길이를 측정할 때 쓰는 도구입니다.",
        options: ["줄자", "가위", "망치", "드라이버"], answer: 0,
        sourceUrl: "julja.html", sourceTitle: "Tape Measure" },

      { id: "R18", question: "다음 글을 읽고 무엇에 대한 글인지 고르세요.\n\n한국의 대중교통은 버스, 지하철, 택시가 있습니다. 출퇴근 시간에는 사람이 많아서 복잡합니다. 교통카드를 사용하면 편리하게 이용할 수 있습니다.",
        options: ["대중교통 이용", "음식 문화", "계절별 옷차림", "한국의 명절"], answer: 0,
        sourceUrl: "transport.html", sourceTitle: "Transport" },

      { id: "R19", question: "다음을 읽고 내용과 같은 것을 고르세요.\n\n\"기숙사 이용 안내: 기숙사는 회사 근로자만 이용할 수 있습니다. 외부인 출입은 금지되어 있으며, 밤 12시 이후에는 조용히 해 주시기 바랍니다.\"",
        options: ["기숙사는 회사 근로자만 이용할 수 있습니다.", "외부인도 자유롭게 출입할 수 있습니다.", "밤 12시 이후에는 시끄러워도 됩니다.", "기숙사는 아무나 이용할 수 있습니다."], answer: 0,
        sourceUrl: "chulipgeumji.html", sourceTitle: "No Entry" },
      { id: "R20", question: "다음을 읽고 내용과 같은 것을 고르세요.\n\n\"근로계약서에는 근무 시간, 급여, 휴일 등이 명시되어 있습니다. 근로자와 사업주는 각각 한 부씩 보관해야 합니다.\"",
        options: ["근로자와 사업주가 각각 한 부씩 보관해야 합니다.", "사업주만 보관하면 됩니다.", "근로계약서에는 급여만 적혀 있습니다.", "근로자는 보관할 필요가 없습니다."], answer: 0,
        sourceUrl: "geunro-gyeyakseo.html", sourceTitle: "Labor Contract" }
    ]
  }
];
