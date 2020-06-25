<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="itemList">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button @click="deleteArticle(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  data() {
    return {
      itemList: []
    };
  },
  created() {
    console.log('文章列表')
    this.findAllArticle();
  },
  methods: {
    async findAllArticle() {
      const res = await this.$http.get("rest/articles");
      console.log(res);
      this.itemList = res.data;
    },
    async deleteArticle(row) {
      this.$confirm(`是否删除该文章"${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/articles/${row._id}`);
        console.log(res);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.findAllArticle();
      });
    }
  }
};
</script>