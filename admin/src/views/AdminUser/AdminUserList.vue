<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="itemList">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >编辑</el-button>
          <el-button @click="deleteAdminUser(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminUserList",
  data() {
    return {
      itemList: []
    };
  },
  created() {
    this.findAllAdminUser();
  },
  methods: {
    async findAllAdminUser() {
      const res = await this.$http.get("rest/admin_users");
      console.log(res);
      this.itemList = res.data;
    },
    async deleteAdminUser(row) {
      this.$confirm(`是否删除"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/admin_users/${row._id}`);
        console.log(res);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.findAllAdminUser();
      });
    }
  }
};
</script>