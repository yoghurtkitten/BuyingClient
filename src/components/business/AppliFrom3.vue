<template>
  <div>
    <login-header></login-header>
    <div class="container">
      <my-step :step="step"></my-step>
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户">
          <el-input type="text" :value="phone" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import MyStep from "@/components/single_comp/step.vue";
import qs from "qs";
export default {
  components: { MyStep },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      step: 3,
      phone: this.$route.query.phone,
      baseUrl: this.$store.getters.getBaseUrl
    };
  },
  methods: {
    submitForm(formName) {
      var vm = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = qs.stringify({
            password: this.ruleForm2.pass,
            phone: this.$route.query.phone,
            shopman_name: this.$route.query.bname,
            idCard: this.$route.query.idCard,
            business_img: this.$route.query.imgUrl1,
            contact: this.$route.query.uname,
            shop_name: this.$route.query.shopname,
            shop_type: this.$route.query.classify,
            province: this.$route.query.province,
            city: this.$route.query.city,
            county: this.$route.query.area,
            address: this.$route.query.detailAddress,
            license: this.$route.query.registId,
            shop_img: this.$route.query.imgUrl1,
            shop_phone: this.$route.query.phone,
            licenseName: this.$route.query.registName
          });
          var url = `${vm.baseUrl}/business/registe`;
          this.axios.post(url, data).then(res => {
            console.log(res.data);
            if (res.data.code == 200) {
              this.$message({
                message: "信息提交成功，等待管理员审核",
                type: "success"
              });
              this.$router.push('/')
            } else {
              this.$message.error('提交失败，请稍后重试');
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAppli2() {
      console.log(this.$route.query);
    }
  },
  created() {
    this.getAppli2();
  }
};
</script>
<style scoped>
.container {
  width: 65%;
  background: #fff;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 5%;
}
.container form {
  padding-right: 30%;
}
</style>
