<template>
  <div class="title">
    <el-steps :active="step">
      <el-step title="门店信息" icon="el-icon-location-outline"></el-step>
      <el-step title="资质信息" icon="el-icon-edit"></el-step>
      <el-step title="安全中心" icon="el-icon-setting"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  props: ['step'],
};
</script>
<style scoped>
.title {
  background: #fff;
  padding: 3%;
  margin-top: 4%;
  margin-bottom: 4%;
}
</style>
