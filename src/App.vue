<template>
  <div id="app">
    <transition name="route-move">
      <router-view class="child-view"/>
    </transition>
    <!-- <cube-tab-bar showSlider v-model="selectedLabelDefault" @change="changeHandler" :data="tabs">
    </cube-tab-bar> -->
    <cube-tab-bar showSlider v-model="selectedLabelDefault" @change="changeHandler">
      <cube-tab v-for="item in tabs" :key="item.label" :label="item.label" :value="item.value">
        <i slot="icon" :class="item.icon"></i>
        <div>{{item.label}}</div>
        <span class="badge" v-if="showBadge(item.label)">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedLabelDefault: "/",
      tabs: [
        {
          value: "/",
          label: "Home",
          icon: "cubeic-home"
        },
        {
          value: "/cart",
          label: "Cart",
          icon: "cubeic-mall"
        },
        {
          value: "/login",
          label: "Me",
          icon: "cubeic-person"
        }
      ]
    };
  },
  watch: {
    $route(router) {
      this.selectedLabelDefault = router.path;
    }
  },
  created() {
    this.selectedLabelDefault = this.$route.path;
  },
  methods: {
    logout() {
      this.$http.get("/api/logout");
    },
    changeHandler(val) {
      this.$router.push(val);
    },
    showBadge(label) {
      return label == "Cart" && this.cartTotal > 0;
    }
  },
  computed: {
    ...mapGetters(["isLogin", "cartTotal"])
  }
};
</script>

<style style="stylus" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #edf0f4;
}
.cube-tab-bar-slider {
  top: 0;
}
/* 页面滑动动画 */
/* 入场前 */
.route-move-enter {
  transform: translate3d(-100%, 0, 0);
}
/* 出场后 */
.route-move-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-move-enter-active,
.route-move-leave-active {
  transition: transform 0.3s;
}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 47px;
  width: 100%;
  overflow: auto;
}
.cube-tab {
  position: relative;
}
span.badge {
  display: inline-block;
  background: #de3529;
  font-size: 0.6rem;
  color: white;
  padding: 0 0.2rem;
  height: 1rem;
  line-height: 1rem;
  border-radius: 0.3rem;
  position: absolute;
  top: 0.5rem;
  left: 5rem;
}
</style>
