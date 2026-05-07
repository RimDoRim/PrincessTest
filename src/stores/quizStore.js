import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const questions = [
  { id: 1, text: "친구와 만났을 때, 음식이 식더라도 완벽한 'MZ 구도'의 사진이 나올 때까지 젓가락을 들지 못하게 하는 편이다.", isReverse: false },
  { id: 2, text: "집 앞 편의점에 가더라도 '누군가 나를 볼 수 있다'는 생각에 최소한의 톤업 크림과 착장 셋업은 갖춰야 마음이 편하다.", isReverse: false },
  { id: 3, text: "길을 걷다 우연히 쇼윈도나 전신거울을 마주치면, '오늘 내 착장 좀 완벽한데?' 하며 속으로 런웨이를 걷는 상상을 한 적이 꽤 많다.", isReverse: false },
  { id: 4, text: "아무리 들어갈 짐이 없어도 코디를 위해 불편한 마이크로 미니백을 메고, 거기에 비싼 인형 키링(백꾸)을 주렁주렁 다는 건 절대 포기할 수 없는 패션 철학이다.", isReverse: false },
  { id: 5, text: "웨이팅이 길어도 두쫀쿠처럼 '지금 유행하는 것'을 위해서라면 내 지갑은 언제든 열릴 준비가 되어 있다.", isReverse: false },
  { id: 6, text: "야심 차게 꾸미고 나간 날, 주변에서 '오늘 옷 예쁘다' 또는 '이거 어디서 샀어?'라는 질문을 받지 못하면 집에 돌아오는 길에 은근히 서운함을 느낀다.", isReverse: false },
  { id: 7, text: "인스타 감성 낭낭한 '등받이 없고 딱딱한 의자'가 있는 핫플보다는, 푹신한 소파와 빵빵한 와이파이가 있는 대형 프랜차이즈 카페가 솔직히 훨씬 좋다.", isReverse: true },
  { id: 8, text: "친구나 남자친구한테 하루에 보내는 릴스가 5개 미만이다.", isReverse: true },
]

const resultDescriptions = {
  '진짜 공주님': {
    image: '/images/princess-real.png',
    emoji: '👑',
    color: '#FFD700',
    description: "숨만 쉬어도 뼛속까지 핫걸인 당신, 혹시 공주님이신가요? 😍😍😍😍😍👑✨",
  },
  '무언가 부족한 공주님': {
    image: '/images/princess-fake.svg',
    emoji: '🎀',
    color: '#B57BFF',
    description: "머리부터 발끝까지 완벽한 세팅! 하지만 마지막 결제창 배송비 3천 원에 가끔 이성이 돌아오는 당신은 '노력형' 공주네요. 🎀😏",
  },
  '평민': {
    image: '/images/commoner.svg',
    emoji: '🌿',
    color: '#6BCB77',
    description: "트렌드 탑승은 적당히, 내 지갑 사정도 적당히. 갓생과 폼생폼사 사이에서 완벽한 줄타기를 하는 프로 현실러. 나쁘지 않아요, 진짜로요. 🌿😎",
  },
  '서민': {
    image: '/images/peasant.svg',
    emoji: '🪴',
    color: '#A0C878',
    description: "예쁜 쓰레기보단 실용성이 최고! 낭만보다는 가성비를 챙기는 당신, 상남자 매력 철철 넘치는 명예 '테토녀' 되기에 충분합니다. 🪴💪",
  },
  '하녀': {
    image: '/images/servant.svg',
    emoji: '🧹',
    color: '#AAAAAA',
    description: "도파민? 백꾸? 그게 다 무어란 말이냐. 속세의 허영심을 버리고 묵묵히 제 갈 길을 가는 진정한 K-일개미. 공주님들 모시느라 고생이 많습니다! 🧹💦",
  },
}

export const useQuizStore = defineStore('quiz', () => {
  const userName = ref('')
  const answers = ref([])
  const result = ref(null)

  const totalScore = computed(() =>
    answers.value.reduce((sum, answer, i) => {
      const q = questions[i]
      return sum + (q?.isReverse ? 6 - answer : answer)
    }, 0)
  )

  const getResultGrade = computed(() => {
    if (userName.value.trim() === '김민정') return '진짜 공주님'
    const score = totalScore.value
    if (score >= 43) return '진짜 공주님'
    if (score >= 33) return '무언가 부족한 공주님'
    if (score >= 25) return '평민'
    if (score >= 17) return '서민'
    return '하녀'
  })

  function computeResult() {
    const grade = getResultGrade.value
    const info = resultDescriptions[grade]
    result.value = { grade, description: info.description, image: info.image, emoji: info.emoji, color: info.color }
  }

  function resetQuiz() {
    userName.value = ''
    answers.value = []
    result.value = null
  }

  return { userName, answers, result, totalScore, getResultGrade, questions, computeResult, resetQuiz }
})
