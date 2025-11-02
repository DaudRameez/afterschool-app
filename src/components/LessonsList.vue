<template>
  <section class="lessons-section">
    <h2>Available Lessons</h2>

    <div class="lesson-container">
      <div
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card"
      >
        <div class="icon-box">
          <i :class="['fa-brands', lesson.icon]" v-if="brandIcon(lesson.icon)"></i>
          <i :class="['fa-solid', lesson.icon]" v-else></i>
        </div>

        <h3>{{ lesson.title }}</h3>

        <div class="details">
          <p><strong>Subject:</strong> {{ lesson.subject }}</p>
          <p><strong>Location:</strong> {{ lesson.location }}</p>
          <p><strong>Price:</strong> AED {{ lesson.price }}</p>
          <p><strong>Spaces:</strong> {{ lesson.spaces }}</p>
        </div>

        <div class="card-actions">
          <button
            class="add-btn"
            :disabled="isInCart(lesson.id)"
            @click="handleAdd(lesson)"
          >
            <span v-if="!isInCart(lesson.id)">Add to Cart</span>
            <span v-else>Added</span>
          </button>

          <button class="detail-btn" @click="openDetail(lesson)">
            View
          </button>
        </div>
      </div>
    </div>

    <!-- Lesson detail modal / panel -->
    <div v-if="selected" class="modal-overlay" @click.self="selected = null">
      <div class="modal">
        <button class="back-btn" @click="selected = null">← Close</button>
        <h2>{{ selected.title }}</h2>
        <p><i :class="['fa-solid', selected.icon]"></i></p>
        <p><strong>Subject:</strong> {{ selected.subject }}</p>
        <p><strong>Location:</strong> {{ selected.location }}</p>
        <p><strong>Price:</strong> AED {{ selected.price }}</p>
        <p><strong>Spaces left:</strong> {{ selected.spaces }}</p>

        <div style="margin-top:12px">
          <button
            class="add-btn"
            :disabled="isInCart(selected.id)"
            @click="handleAdd(selected)"
          >
            <span v-if="!isInCart(selected.id)">Add to Cart</span>
            <span v-else>Added</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, inject } from 'vue'
import { lessons as lessonsData } from '../data/lessons.js'

const addToCart = inject('addToCart')
const isInCart = inject('isInCart')
const goToCart = inject('goToCart')

// local lessons (read-only copy). We won't change spaces here.
const lessons = lessonsData

const selected = ref(null)

function handleAdd(lesson) {
  addToCart(lesson)
  // optional: auto open cart after add; we keep UX simple and stay on page
}

function openDetail(lesson) {
  selected.value = lesson
}

// Font Awesome icon helper: some icons are brand icons (fa-vuejs etc.)
function brandIcon(name) {
  const brandList = ['fa-vuejs', 'fa-react', 'fa-python', 'fa-js', 'fa-node', 'fa-react', 'fa-github']
  return brandList.includes(name)
}
</script>

<style scoped>
.lessons-section {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto 100px;
}

.lesson-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.lesson-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon-box {
  width: 60px;
  height: 60px;
  background: #42b883;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  margin: 0 auto 10px;
}

.details p {
  margin: 4px 0;
  font-size: 0.95rem;
}

.card-actions {
  display:flex;
  gap: 10px;
  justify-content:center;
  align-items:center;
  margin-top:12px;
}

.add-btn, .detail-btn {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.add-btn {
  background: #2c3e50;
  color: white;
}

.add-btn[disabled] {
  opacity: 0.6;
  cursor: default;
}

.detail-btn {
  background: transparent;
  border: 1px solid #ddd;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index: 2000;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 18px;
  width: 90%;
  max-width: 520px;
}
.back-btn {
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
