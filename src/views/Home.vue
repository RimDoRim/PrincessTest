<template>
  <div class="main-wrapper">
    <div class="princess-card">
      <div class="text-center mb-4">
        <div style="font-size: 4rem; line-height: 1; margin-bottom: 0.75rem;">👑</div>
        <h1 style="font-size: 1.75rem; font-weight: 900; margin-bottom: 0.5rem;">
          나는 어떤 공주일까?
        </h1>
        <p style="color: #888; font-size: 0.95rem; margin: 0;">솔직하게 답해야 진짜 결과가 나옵니다 👀</p>
      </div>

      <div class="mb-3">
        <input
          v-model="nameInput"
          type="text"
          class="name-input"
          placeholder="이름을 입력하세요"
          maxlength="20"
          @keyup.enter="startQuiz"
        />
      </div>

      <button
        class="btn-princess w-100"
        :disabled="!nameInput.trim()"
        @click="startQuiz"
      >
        테스트 시작하기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '../stores/quizStore.js'

const router = useRouter()
const quizStore = useQuizStore()
const nameInput = ref('')

function startQuiz() {
  if (!nameInput.value.trim()) return
  quizStore.userName = nameInput.value.trim()
  quizStore.answers = []
  quizStore.result = null
  router.push('/quiz')
}
</script>
