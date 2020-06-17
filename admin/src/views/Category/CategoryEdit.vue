<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="modal.parent">
          <el-option
            v-for="item in parentsOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="modal.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      modal: {},
      parentsOptions: []
    };
  },
  created() {
    this.findAllCategory();
    // 当id不为空才会执行后面的方法
    this.id && this.findCategoryById(this.id);
  },
  methods: {
    // 查询所有分类
    async findAllCategory() {
      const res = await this.$http.get(`rest/categories`);
      console.log("查询所有分类", res);
      this.parentsOptions = res.data;
    },
    // 通过id查询分类
    async findCategoryById(id) {
      const res = await this.$http.get(`rest/categories/${id}`);
      console.log("通过id查询分类", res);
      this.modal = res.data;
    },
    // 提交表单
    async save() {
      // Es6新语法，使用async/await使异步操作写法和同步一样，post请求第一个参数代表请求的接口/路由，第二个参数要发送的数据
      let res;
      if (this.id) {
        // 存在id则做编辑
        res = await this.$http.put(`rest/categories/${this.id}`, this.modal);
      } else {
        // 不存在则做新增
        res = await this.$http.post("rest/categories", this.modal);
      }
      // 请求成功后，页面跳转
      console.log("提交表单", res);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  }
};
</script>