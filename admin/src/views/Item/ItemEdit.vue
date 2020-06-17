<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="modal.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="modal.icon"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ItemEdit",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      modal: {},
    };
  },
  created() {
    // 当id不为空才会执行后面的方法
    this.id && this.findItemById(this.id);
  },
  methods: {
    // 通过id查询分类
    async findItemById(id) {
      const res = await this.$http.get(`rest/items/${id}`);
      console.log("通过id查询分类", res);
      this.modal = res.data;
    },
    // 提交表单
    async save() {
      // Es6新语法，使用async/await使异步操作写法和同步一样，post请求第一个参数代表请求的接口/路由，第二个参数要发送的数据
      let res;
      if (this.id) {
        // 存在id则做编辑
        res = await this.$http.put(`rest/items/${this.id}`, this.modal);
      } else {
        // 不存在则做新增
        res = await this.$http.post("rest/items", this.modal);
      }
      // 请求成功后，页面跳转
      console.log("提交表单", res);
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  }
};
</script>