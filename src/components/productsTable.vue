<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="editProduct(record)">编辑</a-button>
      <a-button @click="removeProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: 80,
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "商品类目",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
  },
  {
    title: "商品标签",
    dataIndex: "tags",
    key: "tags",
    ellipsis: true,
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
    ellipsis: true,
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    customRender: function (
      text,
      record //text为当前行的值，record为当前行的数据
    ) {
      return record.status === 1 ? "上架" : "下架";
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
    width: 200,
  },
];
export default {
  props: ["data", "page"],
  data() {
    return {
      columns,
    };
  },
  computed: {
    tableData() {
      return this.data.map((item) => {
        return { ...item, key: item.id }; //为每个商品附上key值
      });
    },
  },
  methods: {
    changePage(page) {
      console.log(page);
      this.$emit("changePage", page);
    },
    editProduct(record) {
      this.$emit('editProduct',record);
    },
    removeProduct(record) {
      this.$emit('removeProduct',record);
    },
  },
};
</script>
