<template>
  <div>
    <login-header></login-header>
    <div class="container">
      <div>
        <p class="title">门店信息</p>
      </div>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="门店名称" prop="shopname">
            <el-input v-model="ruleForm.shopname" placeholder="请与门店照上的名称保持一致"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="uname">
            <el-input v-model="ruleForm.uname" placeholder="输入联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="输入联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="门店分类" prop="classify">
            <el-select v-model="ruleForm.classify" placeholder="主营分类，必选">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="ruleForm.classify" placeholder="次营分类，选填">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="Address">
            <v-distpicker :province="province" :city="city" :area="area" @selected="selected"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailAddress">
            <el-input v-model="ruleForm.detailAddress" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item label="门店logo" prop="logo">
             <span>请选择或者拍照上传照片</span>
			<input type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange">
            <!-- <input type="file" name="fileUpload" id="fileUpload" onchange="filePrevImg(this.files);" multiple="true" /> -->

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import lrz from "lrz";
export default {
  components: { VDistpicker },
  data() {
    return {
      ruleForm: {
        shopname: "",
        uname: "",
        phone: "",
        classify: "",
        logo: "",
        Address: "",
        detailAddress: "",
        Address: ""
      },
      rules: {
        shopname: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        uname: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            pattern: /1[3-9]\d{9}/,
            message: "请依据手机号格式输入",
            trigger: "blur"
          }
        ],
        classify: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        Address: [
          {
            required: true
          }
        ],
        detailAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      province: "",
      city: "",
      area: "",
      base64: ""
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
    },
    selected() {},
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files, e);
    },
    createImage: function(file, e) {
      let vm = this;
      lrz(file[0], { width: 480 })
        .then(function(rst) {
          //   vm.imgUrls.push(rst.base64);
          console.log(rst.base64);
          return rst;
        })
        .always(function() {
          // 清空文件上传控件的值
          e.target.value = null;
        });
    }
  }
};
</script>
<style scoped>
.container {
  width: 60%;
}
.content {
  width: 100%;
  margin: 0 auto;
}
.title {
  padding: 3% 3% 3% 0;
  margin-top: 3%;
  font-size: 1rem;
  color: #666;
  font-weight: 700;
}
.lodingImg {
  width: 100px;
  height: 70px;
}
</style>
