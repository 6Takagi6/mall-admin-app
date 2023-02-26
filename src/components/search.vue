<template>
 <div class="search-box">
   <a-form-model
    layout="inline"
    :model="searchForm"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="搜索关键字">
      <a-input v-model="searchForm.searchWord" placeholder="搜索关键字">
        <!-- <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" /> -->
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目">
      <!-- <a-input v-model="searchForm.password" placeholder="选择商品类目"> -->
        <!-- <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" /> -->
        <a-select
          allowClear
          placeholder="选择商品类目"
          style="width: 200px"
          @change="handleChange"
        >
            <a-select-option v-for="c in data" :key="c.id" :value="c.id">{{c.name}}</a-select-option>
    
        </a-select>
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
 </div>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: "",
        category: "",
      },
      
    };
  },
  props:["data"],
  methods: {
    //提交表单时出发的函数
    handleSubmit() {
      this.$emit("submit", this.searchForm); //将子组件的数据searchForm传递给父组件
    },
    //转换类目时出发的函数
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>
