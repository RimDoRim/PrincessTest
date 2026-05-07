<template>
  <div>
    <div class="mb-3 d-flex justify-content-center">
      <img
        v-if="!imageError"
        :src="result.image"
        :alt="result.grade"
        class="result-img"
        @error="imageError = true"
      />
      <div v-else class="emoji-fallback">{{ result.emoji }}</div>
    </div>

    <h2 class="grade-title" :style="{ color: result.color }">
      {{ result.emoji }} {{ result.grade }}
    </h2>
    <p class="grade-sub">{{ userName }}님은...</p>
    <p class="grade-desc">{{ result.description }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  result: { type: Object, required: true },
  userName: { type: String, required: true },
})

const imageError = ref(false)
</script>

<style scoped>
.result-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.emoji-fallback {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7rem;
  line-height: 1;
}

.grade-title {
  font-size: 1.6rem;
  font-weight: 900;
  margin: 0.75rem 0 0.25rem;
}

.grade-sub {
  color: #aaa;
  font-size: 0.88rem;
  margin-bottom: 0.75rem;
}

.grade-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #333;
  margin: 0;
}
</style>
