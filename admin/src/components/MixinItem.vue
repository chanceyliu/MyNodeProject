<template></template>

<script>
export default {
  name: "MixinItem",
  data() {
    return {
      mixinMsg: "我是混入中的变量"
    };
  },
  methods: {
    getMixinValues() {
      return "我是混入中的方法";
    }
  }
};
</script>

<style scoped>
</style>
