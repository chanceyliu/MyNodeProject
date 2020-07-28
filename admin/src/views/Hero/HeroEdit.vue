<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="modal.name"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="modal.avatar" :src="modal.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="modal.title"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="modal.categories" multiple>
              <el-option
                v-for="item in categoriesOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="操作难度">
            <el-rate
              style="margin-top: 0.6rem"
              v-model="modal.scores.difficult"
              :max="9"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能评分">
            <el-rate style="margin-top: 0.6rem" v-model="modal.scores.skills" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击评分">
            <el-rate style="margin-top: 0.6rem" v-model="modal.scores.attack" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存评分">
            <el-rate style="margin-top: 0.6rem" v-model="modal.scores.survive" :max="9" show-score></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="modal.items1.item" multiple>
              <el-option
                v-for="item in itemsOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顺风提示">
            <el-input v-model="modal.items1.tips"></el-input>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="modal.items2.item" multiple>
              <el-option
                v-for="item in itemsOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风提示">
            <el-input v-model="modal.items2.tips"></el-input>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="modal.usageIips"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="modal.battleIips"></el-input>
          </el-form-item>

          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="modal.teamIips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息">
          <el-button size="small" @click="modal.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in modal.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>

              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger" size="small" @click="modal.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroEdit",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      modal: {
        name: "",
        avatar: "",
        title: "",
        categories: [],
        scores: {},
        items1: {},
        items2: {},
        usageIips: "",
        battleIips: "",
        teamIips: "",
        skills: []
      },
      categoriesOptions: [],
      itemsOptions: []
    };
  },
  created() {
    this.findHeroCategory();
    this.findAllItem();
    // 当id不为空才会执行后面的方法
    this.id && this.findHeroById(this.id);
  },
  methods: {
    // 查询所有物品
    async findAllItem() {
      const res = await this.$http.get(`rest/items`);
      this.itemsOptions = res.data;
    },
    // 查询英雄分类
    async findHeroCategory() {
      const res = await this.$http.get(`rest/categories`);
      this.categoriesOptions = res.data;
    },
    // 上传图片
    afterUpload(res) {
      this.modal.avatar = res.url;
    },
    // 通过id查询分类
    async findHeroById(id) {
      const res = await this.$http.get(`rest/heroes/${id}`);
      // 使用Object.assign，后端请求来的同名属性会将this.modal的属性替换掉，this.modal中没有的则会添加上
      this.modal = Object.assign({}, this.modal, res.data);
    },
    // 提交表单
    async save() {
      // Es6新语法，使用async/await使异步操作写法和同步一样，post请求第一个参数代表请求的接口/路由，第二个参数要发送的数据
      let res;
      if (this.id) {
        // 存在id则做编辑
        res = await this.$http.put(`rest/heroes/${this.id}`, this.modal);
      } else {
        // 不存在则做新增
        res = await this.$http.post("rest/heroes", this.modal);
      }
      // 请求成功后，页面跳转
      console.log("提交表单", res);
      this.$router.push("/heroes/list");
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