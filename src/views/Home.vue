<template>
  <div class="home">
    <!-- 轮播图 -->
    <cube-slide :data="slide" :interval="3000">
      <cube-slide-item v-for="item in slide" :key="item.id">
        <router-link to="/cart">
          <img :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 过滤按钮 -->
    <cube-button @click="showDrawer">过滤</cube-button>
    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="[selectLable]"
      @select="changeHandler"
    ></cube-drawer>

    <!-- 商品列表 -->
    <div>
      <goods-list :goodsList="selectedData"></goods-list>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import goodsList from '@/components/goodsList.vue'

const labels = {
  all: "全部",
  fe: "前端",
  python: "Python",
  java: "Java",
  bigdata: "大数据",
  ai: "人工智能"
};

export default {
  name: "home",
  components: {
    HelloWorld,
    goodsList
  },
  data() {
    return {
      slide: [], //轮播图
      goods: [], //全部商品
      keys: [], //商品关键词
      selectedKeys: [] //当前显示的商品关键词集合
    };
  },
  async created() {
    const res = await this.$http.get("/api/goods", {
      params: { id: 1, foo: "bar" }
    });
    const { slider, keys, data } = res.data;
    this.slide = slider;
    this.goods = data;
    this.keys = ['all'].concat(keys);
    this.selectedKeys = keys;
  },
  computed: {
    selectedData() {
      let list = [];
      if (this.selectedKeys.find(v => v=='all') ) {
        this.selectedKeys = [...this.keys]
        this.selectedKeys = this.selectedKeys.slice(1)
      }
      this.selectedKeys.forEach(v => {
        list = list.concat(this.goods[v]);
      });
      return list;
    },
    selectLable(){
      return this.keys.map(v => {
        return {
          value: v,
          text: labels[v]
        }
      })
    }
  },
  methods: {
    changeHandler(val) {
      this.selectedKeys = [...val]
    },
    showDrawer() {
      this.$refs.drawer.show()
    },
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

