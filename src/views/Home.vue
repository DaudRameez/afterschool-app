<template>
  <section class="lessons-container">
    <h2>Available Lessons</h2>

    <!-- Sort Controls -->
    <div class="sort-controls">
      <label for="sort-attribute">Sort by:</label>
      <select v-model="sortAttribute" id="sort-attribute">
        <option value="subject">Subject</option>
        <option value="location">Location</option>
        <option value="price">Price</option>
        <option value="spaces">Spaces</option>
      </select>

      <label for="sort-order">Order:</label>
      <select v-model="sortOrder" id="sort-order">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <!-- Lessons Grid -->
    <div v-if="lessons.length" class="lessons-grid">
      <div v-for="lesson in sortedLessons" :key="lesson.id" class="lesson-card">
        <h3>{{ lesson.title }}</h3>
        <p><strong>Subject:</strong> {{ lesson.subject }}</p>
        <p><strong>Location:</strong> {{ lesson.location }}</p>
        <p><strong>Price:</strong> AED {{ lesson.price }}</p>
        <p><strong>Spaces left:</strong> {{ lesson.spaces }}</p>

        <div class="card-buttons">
          <button @click="openModal(lesson)">View</button>
          <button 
            @click="add(lesson)" 
            :disabled="lesson.spaces === 0"
          >
            {{ lesson.spaces > 0 ? "Add to Cart" : "Full" }}
          </button>
        </div>
      </div>
    </div>

    <p v-else>Loading lessons or failed to fetch...</p>

    <!-- Modal -->
    <div v-if="selectedLesson" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <h3>{{ selectedLesson.title }}</h3>
        <p><strong>Subject:</strong> {{ selectedLesson.subject || 'N/A' }}</p>
        <p><strong>Location:</strong> {{ selectedLesson.location }}</p>
        <p><strong>Price:</strong> AED {{ selectedLesson.price }}</p>
        <p><strong>Spaces left:</strong> {{ selectedLesson.spaces || 'N/A' }}</p>
        <button class="close-btn" @click="closeModal">Close</button>
      </div>
    </div>
  </section>
</template>

<script>
// Backend URL handling
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://afterschool-app-backend.onrender.com";

export default {
  data() {
    return {
      lessons: [],
      selectedLesson: null,
      sortAttribute: 'subject',
      sortOrder: 'asc'
    }
  },
  inject: ['addToCart'],
  async created() {
    try {
      const res = await fetch(`${API_BASE}/api/lessons`);
      if (!res.ok) throw new Error("Failed to fetch lessons");
      this.lessons = await res.json();
    } catch (err) {
      console.error(err);
      this.lessons = [];
    }
  },
  computed: {
    sortedLessons() {
      return [...this.lessons].sort((a, b) => {
        let attrA = a[this.sortAttribute];
        let attrB = b[this.sortAttribute];

        // Number comparison for price or spaces
        if (this.sortAttribute === 'price' || this.sortAttribute === 'spaces') {
          attrA = Number(attrA);
          attrB = Number(attrB);
        } else {
          attrA = String(attrA).toLowerCase();
          attrB = String(attrB).toLowerCase();
        }

        if (attrA < attrB) return this.sortOrder === 'asc' ? -1 : 1;
        if (attrA > attrB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
  },
  methods: {
    add(lesson) {
      if (lesson.spaces > 0) {
        lesson.spaces -= 1;
        this.addToCart(lesson);
      }
    },
    openModal(lesson) {
      this.selectedLesson = lesson;
    },
    closeModal() {
      this.selectedLesson = null;
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

/* Sort Controls */
.sort-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}
.sort-controls label {
  font-weight: bold;
}

/* Lessons Grid */
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
