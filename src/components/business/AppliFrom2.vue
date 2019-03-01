<template>
  <div>
    <login-header></login-header>
    <div class="container">
      <my-step :step="step"></my-step>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="真实姓名" prop="bname">
            <el-input v-model="ruleForm.bname"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idCard">
            <el-input v-model="ruleForm.idCard"></el-input>
          </el-form-item>
          <el-form-item label="身份证照片">
            <input
              type="file"
              name="mypic"
              id="avatarInput"
              ref="fileUpload"
              value
              accept="image/jpeg, image/png, image/jpg, image/gif"
              multiple
              @change="onFileChange"
            >
            <img :src="imgUrl" class="smallImg">
          </el-form-item>
          <div class="regist">
            <div class="top">营业执照信息</div>
            <el-form-item label="注册号" prop="registId">
              <el-input v-model="ruleForm.registId"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="registName">
              <el-input v-model="ruleForm.registName"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="registAddr">
              <el-input v-model="ruleForm.registAddr"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import lrz from "lrz";
import MyStep from "@/components/single_comp/step.vue";
import qs from "qs";
export default {
  components: { MyStep },
  data() {
    return {
      step: 2,
      ruleForm: {
        bname: "",
        idCard: "",
        registId: "",
        registName: "",
        registAddr: ""
      },
      rules: {
        bname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { pattern: /\d{18}/, message: "证件号不合法", trigger: "blur" }
        ],
        registId: [
          { required: true, message: "请输入营业执照注册号", trigger: "blur" }
        ],
        registName: [
          { required: true, message: "请营业执照名称", trigger: "change" }
        ],
        registAddr: [
          { required: true, message: "请输入营业执照地址", trigger: "change" }
        ]
      },
      imgUrl: "",
      base64: "",
      baseUrl: this.$store.getters.getBaseUrl
    };
  },
  created() {
    // console.log(this.$route.query)
  },
  methods: {
    submitForm(formName) {
      var _self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var obj2 = qs.stringify({
            bname: this.ruleForm.bname,
            idCard: this.ruleForm.idCard,
            registId: this.ruleForm.registId,
            registName: this.ruleForm.registName,
            registAddr: this.ruleForm.registAddr,
            imgUrl1: _self.base64
          });
          var obj1 = qs.stringify({
            shopname: this.$route.query.shopname,
            uname: this.$route.query.uname,
            phone: this.$route.query.phone,
            classify: this.$route.query.classify,
            subclassify: this.$route.query.subclassify,
            imgUrl2: this.$route.query.imgUrl,
            province: this.$route.query.province,
            city: this.$route.query.city,
            area: this.$route.query.area,
            detailAddress: this.$route.query.detailAddress
          });
          this.$router.push(`/AppliFrom3?obj1=${obj1}&obj2=${obj2}`);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selected(data) {
      this.city = data.city.value;
      this.area = data.area.value;
      this.province = data.province.value;
    },
    onFileChange(e) {
      var file = e.target.files || e.dataTransfer.files;
      if (!file.length) return;
      // this.createImage(files, e);
      let vm = this;
      lrz(file[0], { width: 480 })
        .then(function(rst) {
          if (rst.base64.length > 20 * 1024) {
            alert("文件过大，请选择小于20k的图片");
            e.target.value = null;
          } else {
            vm.imgUrl = rst.base64;

            var form = new FormData();
            form.append("mypic", vm.$refs.fileUpload.files[0]);
            vm.axios({
              method: "post",
              url: `${vm.baseUrl}/upload`,
              anync: true,
              contentType: false,
              processData: false,
              data: form
            }).then(res => {
              vm.base64 = res.data.path;
            });
          }
          return rst;
        })
        .always(function() {
          // 清空文件上传控件的值
          // e.target.value = null;
        });
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
.content {
  width: 100%;
  margin: 0 auto;
}
.smallImg {
  width: 120px;
  height: 80px;
}
.regist {
  box-shadow: 0 0 5px #ccc;
  padding: 3%;
  margin-bottom: 4%;
}
.top {
  font-size: 1.125rem;
  font-weight: 700;
}
.top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f8f8f8;
  margin-top: 10px;
  margin-bottom: 3%;
}
</style>
