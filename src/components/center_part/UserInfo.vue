<template>
  <div class="UserInfo">
    <div class="top">个人资料</div>
    <div>
      <p>头像</p>
      <img :src="baseUrl+'/img/user/default-avatar.38e40d.png'">
    </div>
    <div class="name">
      <span>用户名</span>
      <span>{{user}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      user: ""
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      var url = `${this.baseUrl}/user/session`;
      this.axios.get(url).then(result => {
        this.user = result.data.msg.name;
      });
    }
  }
};
</script>
<style scoped>
.UserInfo {
  width: 80%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding: 1.5625rem;
}
.UserInfo .top {
  font-size: 1.125rem;
  font-weight: 700;
}
.UserInfo .top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f4f4f4;
  margin-top: 10px;
  margin-bottom: 5%;
}
.UserInfo img {
  width: 100px;
  height: 100px;
  margin-left: 2%;
}
.UserInfo .top + div {
  display: flex;
  padding-left: 8%;
  font-size: 14px;
  color: #333;
}
.UserInfo .name {
  margin-top: 5%;
  padding-left: 5%;
}
.UserInfo .name span:first-child {
  margin-right: 3%;
  font-size: 14px;
  color: #333;
}
</style>
