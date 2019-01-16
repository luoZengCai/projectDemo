<template>
  <div class="home">
    <cube-slide :data="slide" :interval="3000">
      <cube-slide-item
        v-for="item in slide" :key="item.id">
        <router-link to="/cart">
          <img :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      slide: [],
      goods: []
    };
  },
  async created() {
    const res = await this.$http.get("/api/goods", {
      params: { id: 1, foo: "bar" }
    });
    console.log(res);
    const { slider, keys, data } = res.data;
    this.slide = slider;
    this.goods = data;
  }
};
</script>
<style lang="stylus">
.cube-slide {
  height: auto;
}
.cube-slide-item > a > img {
  width: 100%;
}
</style>

