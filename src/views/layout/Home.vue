<template>
  <div class="home">
    <LeftMenu :key="key"/>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <SliderNav />
       <router-view></router-view>
    </div>
   
  </div>
</template>

<script>
import LeftMenu from "./components/menu.vue";
import SliderNav from "./components/sliderNav.vue";
export default {
  data() {
    return{
      key:new Date().getTime()
    };
  },
  watch:
  {
    $route()
    {
      this.key = new Date().getTime();//监测路由是否变化，如果变化则给key一个新的时间戳
    }
  },
  components: {
    LeftMenu,
    SliderNav,
  },
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
