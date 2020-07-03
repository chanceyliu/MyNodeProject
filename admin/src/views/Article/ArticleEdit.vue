<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="modal.categories" multiple>
          <el-option
            v-for="item in categoriesOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="modal.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <vue-editor v-model="modal.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ArticleEdit",
  components: {
    VueEditor
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      modal: {},
      categoriesOptions: []
    };
  },
  created() {
    this.findAllCategory();
    // 当id不为空才会执行后面的方法
    this.id && this.findArticleById(this.id);
  },
  methods: {
    // 在富文本编辑器中上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();

      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    // 查询所有分类
    async findAllCategory() {
      const res = await this.$http.get(`rest/categories`);
      this.categoriesOptions = res.data;
    },
    // 通过id查询文章
    async findArticleById(id) {
      const res = await this.$http.get(`rest/articles/${id}`);
      this.modal = res.data;
    },
    // 提交表单
    async save() {
      let res;
      if (this.id) {
        // 存在id则做编辑
        res = await this.$http.put(`rest/articles/${this.id}`, this.modal);
      } else {
        // 不存在则做新增
        res = await this.$http.post("rest/articles", this.modal);
      }
      // 请求成功后，页面跳转
      console.log("提交表单", res);
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  }
};
</script>