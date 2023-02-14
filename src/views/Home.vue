<template>
  <div class="home">
    <LeftMenu />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <SliderNav />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import LeftMenu from "./layout/menu.vue";
import SliderNav from "./layout/sliderNav.vue";
export default {
  data() {
    return{};
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
