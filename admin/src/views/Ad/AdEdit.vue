<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="modal.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="modal.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item,index) in modal.items" :key="index">
            <el-form-item label="跳转连接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="图片" style="margin-top: 0.5rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" size="small" @click="modal.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AdEdit",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      modal: {
        items: []
      }
    };
  },
  created() {
    // 当id不为空才会执行后面的方法
    this.id && this.findAdById(this.id);
  },
  methods: {
    // 通过id查询分类
    async findAdById(id) {
      const res = await this.$http.get(`rest/ads/${id}`);
      console.log("通过id查询分类", res);
      this.modal = Object.assign({}, this.modal, res.data);
    },
    // 提交表单
    async save() {
      // Es6新语法，使用async/await使异步操作写法和同步一样，post请求第一个参数代表请求的接口/路由，第二个参数要发送的数据
      let res;
      if (this.id) {
        // 存在id则做编辑
        res = await this.$http.put(`rest/ads/${this.id}`, this.modal);
      } else {
        // 不存在则做新增
        res = await this.$http.post("rest/ads", this.modal);
      }
      // 请求成功后，页面跳转
      console.log("提交表单", res);
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    }
  }
};
</script>