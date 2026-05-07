<template>
  <div class="question-card">
    <div class="q-label">Q{{ questionNumber }}</div>
    <p class="q-text">{{ question.text }}</p>
  </div>
</template>

<script setup>
defineProps({
  question: { type: Object, required: true },
  questionNumber: { type: Number, required: true },
})
</script>

<style scoped>
.question-card {
  background: #FAFAFA;
  border-radius: 16px;
  padding: 1.5rem;
  min-height: 130px;
}

.q-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #B57BFF;
  margin-bottom: 0.75rem;
  letter-spacing: 0.06em;
}

.q-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.65;
  color: #1A1A1A;
  margin: 0;
}
</style>
