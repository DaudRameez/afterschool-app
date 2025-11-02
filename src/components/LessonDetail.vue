<template>
<div class= "lesson-detail" v-if="lesson">
<button @click="$emit('back')"class="back-btn">← Back</button>
<h2>{{lesson.title}}</h2>
<p><i :class="['fa-solid',lesson.icon]"></i></p>
<p><strong>Subject:</strong> {{ lesson.subject }}</p>
<p><strong>Location:</strong> {{ lesson.location }}</p> 
<p><strong>Price:</strong> AED {{ lesson.price }}</p>
<p><strong>Spaces left:</strong> {{ lesson.spaces }}</p>

</div>
</template>

<script>
export default {
 name:'LessonDetail',
 props:['lesson']
};
</script> 
