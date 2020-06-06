<template>
  <div class="about">
    <h1>新建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
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
  data() {
    return{
      modal: {}
    }
  },
  methods: {
    // 提交表单
    async save() {
      // Es6新语法，使用async/await使异步操作写法和同步一样，post请求第一个参数代表请求的接口/路由，第二个参数要发送的数据
      const res = await this.$http.post('categories',this.modal);
      // 请求成功后，页面跳转
      console.log('提交表单',res);
      this.$router.push('/categories/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
  }
}
</script>