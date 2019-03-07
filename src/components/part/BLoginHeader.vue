<template>
  <div class="header">
    <img :src="baseUrl+'/img/login-logo.png'" @click="toIndex">
    <p> <span>商家版</span> </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl
    };
  },
  methods: {
    toIndex() {
      this.$router.push('/')
    }
  },
};
</script>
<style scoped>
* {
  margin: 0;
}
.header {
  height: 100px;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  display: flex;
  align-items: center;
  padding-left: 10%;
  min-width: 472px;
}
.header > img {
  height: 41px;
  flex-shrink: 0;
  cursor: pointer;
}
p::before {
  content: "";
  display: inline-block;
  margin-right: 3%;
  height: 34px;
  width: 2px;
  background: #e54c2a;
}
.header > p {
  color: #e54c2a;
  font-size: 26px;
  font-weight: 700;
  margin-left: 1%;
  width: 20%;
  display: flex;
  margin-top: 1%;
}

</style>
