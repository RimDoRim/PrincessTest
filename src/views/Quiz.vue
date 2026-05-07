<template>
  <div class="main-wrapper">
    <div class="princess-card">
      <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span style="font-size: 0.85rem; color: #888;">진행도</span>
          <span style="font-size: 0.85rem; font-weight: 700; color: #B57BFF;">
            {{ currentIndex + 1 }} / {{ questions.length }}
          </span>
        </div>
        <div class="progress-custom">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <QuestionCard
          :key="currentIndex"
          :question="currentQuestion"
          :questionNumber="currentIndex + 1"
        />
      </Transition>

      <div class="mt-4">
        <button
          v-for="option in answerOptions"
          :key="option.value"
          class="answer-btn"
          @click="selectAnswer(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quizStore.js'
import QuestionCard from '../components/QuestionCard.vue'

const router = useRouter()
const quizStore = useQuizStore()
const currentIndex = ref(0)

const { questions } = quizStore

const answerOptions = [
  { value: 1, label: '1️⃣  전혀 아니다' },
  { value: 2, label: '2️⃣  아니다' },
  { value: 3, label: '3️⃣  보통이다' },
  { value: 4, label: '4️⃣  그렇다' },
  { value: 5, label: '5️⃣  매우 그렇다' },
]

const currentQuestion = computed(() => questions[currentIndex.value])
const progressPercent = computed(() => ((currentIndex.value + 1) / questions.length) * 100)

function selectAnswer(value) {
  quizStore.answers.push(value)
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    quizStore.computeResult()
    router.push('/result')
  }
}

function handlePopState() {
  window.history.pushState(null, '', window.location.href)
}

onMounted(() => {
  if (!quizStore.userName) {
    router.push('/home')
    return
  }
  window.history.pushState(null, '', window.location.href)
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})
</script>
