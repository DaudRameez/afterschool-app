<template>
  <section class="lessons-container">
    <h2>Available Lessons</h2>

    <div v-if="lessons.length" class="lessons-grid">
      <div v-for="lesson in lessons" :key="lesson.id" class="lesson-card">
        <h3>{{ lesson.title }}</h3>
        <p><strong>Location:</strong> {{ lesson.location }}</p>
        <p><strong>Price:</strong> AED {{ lesson.price }}</p>

        <div class="card-buttons">
          <button @click="openModal(lesson)">View</button>
          <button @click="add(lesson)">Add to Cart</button>
        </div>
      </div>
    </div>

    <p v-else>Loading lessons...</p>

    <!-- Modal -->
    <div v-if="selectedLesson" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <h3>{{ selectedLesson.title }}</h3>
        <p><strong>Location:</strong> {{ selectedLesson.location }}</p>
        <p><strong>Price:</strong> AED {{ selectedLesson.price }}</p>
        <p><strong>Subject:</strong> {{ selectedLesson.subject || 'N/A' }}</p>
        <p><strong>Spaces left:</strong> {{ selectedLesson.spaces || 'N/A' }}</p>
        <button class="close-btn" @click="closeModal">Close</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      lessons: [],
      selectedLesson: null
    }
  },
  inject: ['addToCart'],
  async created() {
    const API_BASE = location.hostname === "localhost"
      ? "http://localhost:3000"
       : "https://afterschool-app-backend.onrender.com";


    const res = await fetch(`${API_BASE}/api/lessons`)
    this.lessons = await res.json()
  },
  methods: {
    add(lesson) {
      this.addToCart(lesson)
    },
    openModal(lesson) {
      this.selectedLesson = lesson
    },
    closeModal() {
      this.selectedLesson = null
    }
  }
}
</script>

<style scoped>
.lessons-container {
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.lesson-card {
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.lesson-card h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
}

.lesson-card p {
  margin: 5px 0;
}

.card-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.card-buttons button {
  flex: 1;
  margin: 2px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.card-buttons button:first-child {
  background: #42b883;
  color: #fff;
}

.card-buttons button:first-child:hover {
  background: #2c3e50;
}

.card-buttons button:last-child {
  background: #B0B0B0;
  color: #fff;
}

.card-buttons button:last-child:hover {
  background: #8f8f8f;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: left;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.modal-card h3 {
  margin-top: 0;
}

.close-btn {
  margin-top: 15px;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #B0B0B0;
  color: #fff;
  float: right;
}

.close-btn:hover {
  background: #8f8f8f;
}
</style>
