<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="modal.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="modal.icon" :src="modal.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      modal: {}
    };
  },
  created() {
    // 当id不为空才会执行后面的方法
    this.id && this.findItemById(this.id);
  },
  methods: {
    // 上传图片
    afterUpload(res) {
      // 当你要赋值的这个对象在一开始的data中并没有定义这个属性的时候，最好使用vue提供的$set方法显示赋值
      this.$set(this.modal, "icon", res.url);
    },
    // 通过id查询分类
    async findItemById(id) {
      const res = await this.$http.get(`rest/items/${id}`);
      this.modal = res.data;
      console.log(this.modal)
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

<style scoped>
</style>