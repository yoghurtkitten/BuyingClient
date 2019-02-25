<template>
  <div>
    <login-header></login-header>
    <div class="container">
        <h3>账号密码登录</h3>
        <el-input v-model="user" placeholder="请输入账号"></el-input>
    </div>
    
  </div>
</template>
<script>
export default {
    data() {
        return {
            user: ''
        }
    },
}
</script>
<style scoped>
.container{
    width: 50%;
    margin: 0 auto;
    border: 1px solid #000;
    background: #fff;
    padding-left: 3%;
    padding-right: 3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.container>h3{
    text-align: center;
}
</style>
