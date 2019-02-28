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
              <el-option
                v-for="(item, index) in shopType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="ruleForm.subclassify" placeholder="次营分类，选填">
              <el-option
                v-for="(item, index) in shopType"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市">
            <v-distpicker :province="province" :city="city" :area="area" @selected="selected"></v-distpicker>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailAddress">
            <el-input v-model="ruleForm.detailAddress" placeholder="应与营业执照地址一致"></el-input>
          </el-form-item>
          <el-form-item label="门店logo">
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
import VDistpicker from "v-distpicker";
import lrz from "lrz";
import MyStep from "@/components/single_comp/step.vue";
import qs from "qs";
export default {
  components: { VDistpicker, MyStep },
  data() {
    return {
      ruleForm: {
        shopname: "",
        uname: "",
        phone: "",
        classify: "",
        logo: "",
        Address: "",
        detailAddress: ""
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
            max: 11,
            pattern: /1[3-9]\d{9}/,
            message: "请依据手机号格式输入",
            trigger: "blur"
          }
        ],
        classify: [
          { required: true, message: "请选择主营类型", trigger: "change" }
        ],
        subclassify: [
          { required: true, message: "请选择次营类型", trigger: "change" }
        ],
        Address: [
          {
            required: true
          }
        ],
        detailAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        logo: [{}]
      },
      province: "",
      city: "",
      area: "",
      imgUrl: "",
      shopType: [
        {
          value: 0,
          name: "披萨意面"
        },
        {
          value: 1,
          name: "日韩料理"
        },
        {
          value: 2,
          name: "西餐"
        },
        {
          value: 3,
          name: "面包"
        },
        {
          value: 4,
          name: "烧烤"
        },
        {
          value: 5,
          name: "地方小吃"
        },
        {
          value: 6,
          name: "零食"
        },
        {
          value: 7,
          name: "川湘菜"
        },
        {
          value: 7,
          name: "粤菜"
        },
        {
          value: 7,
          name: "甜品"
        },
        {
          value: 7,
          name: "烧腊饭"
        }
      ],
      mainType: "",
      subType: "",
      step: 1,
      baseUrl: this.$store.getters.getBaseUrl
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(
            `${this.ruleForm.shopname}--${this.ruleForm.uname}
            --${this.ruleForm.phone}--${this.ruleForm.classify}--${
              this.ruleForm.subclassify
            }
            --${this.imgUrl}--${this.province}
            --${this.city}--${this.area}--${this.ruleForm.detailAddress}`
          );
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
              console.log(res.data)
            });
          }
          return rst;
        })
        .always(function() {
          // 清空文件上传控件的值
          // e.target.value = null;
        });
    },
  
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
.smallImg {
  width: 80px;
  height: 60px;
}
</style>
