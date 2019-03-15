<template>
  <div class="login">
    <my-header></my-header>
    <img :src="baseUrl+'/img/slider/3.jpg'" alt srcset>
    <div class="loginform">
      <div>
        <p>
          <i class="iconfont">&#xe6a2;</i>
          管理员登录
        </p>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      baseUrl: this.$store.getters.getBaseUrl,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = `${this.baseUrl}/admin/login`;
          this.axios.get(url, {
              params: {
                  name: this.ruleForm.name,
                  pwd: this.ruleForm.pwd
              }
          }).then(res => {
            if (res.data.code == 200) {
                localStorage.setItem("isLogin","1")
                this.$router.push('/adminIndex')
            } else {
                this.$message.error('用户名或密码有误，请重试。');
                this.ruleForm.pwd = "";
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  position: relative;
}
.loginform {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 5%;
}
.loginform > div {
  width: 30%;
  background: hsla(0, 0%, 100%, 0.5);
  padding: 3% 3% 3% 0;
  box-shadow: 0 0 5px #ccc;
}
.login p {
  font-size: 20px;
  font-weight: 550;
  padding-left: 7%;
  text-align: center;
}

img {
  width: 100%;
  position: absolute;
}
</style>
