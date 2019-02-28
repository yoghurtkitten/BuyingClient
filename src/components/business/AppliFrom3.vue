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
        <el-form-item label="用户" >
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
  </div>
</template>
<script>
import MyStep from "@/components/single_comp/step.vue";
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
      phone: '15072772685',
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
.container {
  width: 65%;
  background: #fff;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 5%;
}
.container form{
  padding-right: 30%;
}



</style>
