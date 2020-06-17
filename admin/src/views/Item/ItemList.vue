<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="itemList">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <!-- <el-table-column prop="icon" label="图标"></el-table-column> -->
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/items/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button @click="deleteItem(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ItemList",
  data() {
    return {
      itemList: []
    };
  },
  created() {
    this.findAllItem();
  },
  methods: {
    async findAllItem() {
      const res = await this.$http.get("rest/items");
      console.log(res);
      this.itemList = res.data;
    },
    async deleteItem(row) {
      this.$confirm(`是否删除该物品"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/items/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.findAllItem();
      }).catch(() => {
         this.$message({
          type: "info",
          message: "取消删除!"
        });
      });
    }
  }
};
</script>