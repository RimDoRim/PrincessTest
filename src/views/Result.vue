<template>
  <div class="main-wrapper">
    <div class="princess-card" :class="{ 'gold-card': result?.grade === '진짜 공주님' }">
      <div v-if="result" class="text-center">
        <ResultCard :result="result" :userName="quizStore.userName" />

        <div class="d-flex flex-column gap-3 mt-4">
          <button class="btn-princess" @click="shareResult">
            {{ shareText }}
          </button>
          <button class="btn-secondary-princess" @click="retry">
            다시 하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quizStore.js'
import ResultCard from '../components/ResultCard.vue'

const router = useRouter()
const quizStore = useQuizStore()
const result = ref(quizStore.result)
const shareText = ref('결과 공유하기')

onMounted(() => {
  if (!quizStore.result) {
    router.push('/home')
  }
})

async function shareResult() {
  if (!result.value) return
  const text = `${quizStore.userName}님의 공주 테스트 결과: ${result.value.grade}!\n${result.value.description}\n👉 테스트 해보기: ${window.location.origin}`
  try {
    await navigator.clipboard.writeText(text)
    shareText.value = '✅ 복사됨!'
  } catch {
    shareText.value = '복사 실패 😢'
  }
  setTimeout(() => { shareText.value = '결과 공유하기' }, 1500)
}

function retry() {
  quizStore.resetQuiz()
  router.push('/home')
}
</script>
