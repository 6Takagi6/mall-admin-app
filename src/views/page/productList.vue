<template>
  <div class="product-list">
    <Search @submit="searchSubmit" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <ProductsTable
      :data="tableData"
      :page="page"
      @changePage="changePage"
      @editProduct="editProduct"
      @removeProduct="removeProduct"
    />
  </div>
</template>
<script>
import Search from "@/components/search.vue";
import ProductsTable from "@/components/productsTable.vue";
import api from "@/api/product.js";
import categoryApi from "@/api/category.js";
export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      categoryObj: [],
      page: { current: 1, pageSize: 10, showSizeChanger: true, total: 1 },
    };
  },
  async created() {
    //需要在得到商品数据之前就得到商品类目的数据，这样才能有数据来判断商品类目的编号对应的文字显示，
    //为此需要用到async来保证商品类目的数据先一步得到
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item; //拿到商品类目的五个数据
      });
      // console.log(this.categoryList);
    });
    this.getTableData();
  },
  components: {
    Search,
    ProductsTable,
    api,
    categoryApi,
  },
  methods: {
    searchSubmit(form) {
      console.log(form, this.searchForm);
      this.searchForm = form;
      // console.log(this.searchForm)

      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current, //当前页数
          size: this.page.pageSize, //每一页的条数
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.total;
          this.tableData = res.data.map((item) => {
            return { ...item, category: this.categoryObj[item.category].name }; //通过此步完成商品类目由原本数字显示改为文字显示
          });
          // console.log(this.tableData);
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: "确定要删除吗?",
        content: "点击确定将删除" + record.title,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk:()=> {
          console.log("OK");
          api.remove({ id: record.id });
          this.getTableData();
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
  },
};
</script>
<style lang="less">
.product-list {
  padding: 10px 30px;
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 15px;
  }
}
</style>