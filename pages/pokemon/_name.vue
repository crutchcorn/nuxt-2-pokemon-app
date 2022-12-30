<template>
  <h1>{{ name }}</h1>
</template>

<script>
export default {
  async asyncData({ params }) {
    const name = params.name;
    return { name };
  },
  async fetch() {
    this.posts = await fetch("https://api.nuxtjs.dev/posts").then((res) =>
      res.json()
    );
  },
};
</script>
