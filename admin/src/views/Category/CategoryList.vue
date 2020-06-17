<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="itemList">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button @click="deleteCategory(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  data() {
    return {
      itemList: []
    };
  },
  created() {
    this.findAllCategory();
  },
  methods: {
    async findAllCategory() {
      const res = await this.$http.get("rest/categories");
      console.log(res);
      this.itemList = res.data;
    },
    async deleteCategory(row) {
      this.$confirm(`是否删除该分类"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        console.log("111");
        const res = await this.$http.delete(`rest/categories/${row._id}`);
        console.log("222");
        console.log(res);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.findAllCategory();
      });
    }
  }
};
</script>