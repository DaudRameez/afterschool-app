<template>
  <section>
    <h2>Available Lessons</h2>

    <div v-if="lessons.length">
      <div v-for="lesson in lessons" :key="lesson._id">
        <h3>{{ lesson.title }}</h3>
        <p>Location: {{ lesson.location }}</p>
        <p>Price: AED {{ lesson.price }}</p>

        <button @click="add(lesson)">Add to cart</button>
      </div>
    </div>

    <p v-else>Loading...</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      lessons: []
    };
  },

  async created() {
    const API_BASE =
      location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://your-backend.onrender.com";

    try {
      const res = await fetch(`${API_BASE}/api/lessons`);
      this.lessons = await res.json();
    } catch (err) {
      console.error("Failed to load lessons:", err);
    }
  },

  methods: {
    add(lesson) {
      this.$bus.$emit("add-to-cart", {
  id: lesson._id,
  title: lesson.title,
  price: lesson.price,
  location: lesson.location,
  image: lesson.image || "https://via.placeholder.com/300x200?text=Lesson"
})

    }
  }
};
</script>

<style scoped>
section {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
}

div {
  margin-bottom: 15px;
}

button {
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: #42b883;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #2c3e50;
}
</style>
