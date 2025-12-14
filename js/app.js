const API_BASE =
  location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://afterschool-app-backend.onrender.com";

new Vue({
  el: "#app",
  data: {
    lessons: [],
    sortAttribute: "subject",
    sortOrder: "asc"
  },
  created() {
    fetch(`${API_BASE}/api/lessons`)
      .then(res => res.json())
      .then(data => this.lessons = data);
  },
  computed: {
    sortedLessons() {
      return [...this.lessons].sort((a, b) => {
        let A = a[this.sortAttribute];
        let B = b[this.sortAttribute];

        if (this.sortAttribute === "price" || this.sortAttribute === "spaces") {
          A = Number(A);
          B = Number(B);
        }

        return this.sortOrder === "asc"
          ? A > B ? 1 : -1
          : A < B ? 1 : -1;
      });
    }
  },
  methods: {
    addToCart(lesson) {
      lesson.spaces--;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(lesson);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart");
    }
  }
});
