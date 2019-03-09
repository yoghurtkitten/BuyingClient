<template>
  <div class="addfood">
    <div class="header">
      <p>
        <router-link to="/MainPage/foodIndex">商品管理</router-link>添加菜品
      </p>
      <div>
        <button>取消</button>
        <button @click="save">保存</button>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div>
          <div class="info">
            <div class="foodname">
              <p>菜品名称</p>
              <el-input v-model="foodname" placeholder="请输入菜品名称" clearable @blur="valiname"></el-input>
            </div>
            <div class="foodtype">
              <p>菜品所属分类</p>
              <el-select v-model="foodType" clearable placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.type_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="discript">
            <p>菜品描述</p>
            <el-input v-model="fooddiscript" placeholder="请输入50字以内的描述（非必填 ）" clearable></el-input>
          </div>
        </div>
        <div class="price">
          <div class="info">
            <div class="foodname">
              <p>单价</p>
              <el-input placeholder="请输入内容" v-model="price" type="number">
                <template slot="prepend">￥</template>
              </el-input>
            </div>
            <div class="foodtype">
              <p>推荐指数</p>
              <el-input placeholder="请输入内容" v-model="star" type="number"></el-input>
            </div>
          </div>
          <div class="stoke">
            <p>
              库存
              <span>(当前/最大)</span>
            </p>
            <el-input v-model="num" type="number"></el-input>/
            <el-input v-model="maxNum" type="number"></el-input>
          </div>
        </div>
        <div class="btns">
          <button>取消</button>
          <button @click="save">保存</button>
        </div>
      </div>
      <div class="right">
        <p>点击上传图片</p>
        <div>
          <el-upload
            class="avatar-uploader"
            :action="baseUrl+'/uploadFood'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="baseUrl +'/' +imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      foodname: "",
      foodType: "",
      fooddiscript: "",
      star: "",
      price: "",
      num: "1000",
      maxNum: "1000",
      imageUrl: "",
      typeList: []
    };
  },
  created() {
    this.getFoodType();
  },
  watch: {
    star: function(value) {
      if (value < 1 || value > 5) {
        this.$message({
          showClose: true,
          message: "最低1颗星，最高5颗星哦",
          type: "error"
        });
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = res.path.substring(9);
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    valiname() {
      if (this.foodname == "") {
        this.$message({
          showClose: true,
          message: "请输入菜品名称",
          type: "error"
        });
      }
    },
    getFoodType() {
      var url = `${this.baseUrl}/business/getFoodCata`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(res => {
          this.typeList = res.data.data;
        });
    },
    vali() {
      // console.log(arguments);
      for (const item of arguments) {
        if (item == "") {
          return false;
        }
      }
      return true;
    },
    save() {
      var isSave = this.vali(
        this.foodname,
        this.foodType,
        this.star,
        this.price,
        this.num,
        this.maxNum,
        this.imageUrl
      );
      if (isSave) {
        var data = qs.stringify({
          bphone: localStorage.getItem("business"),
          food_name: this.foodname,
          price: this.price,
          discript: this.fooddiscript,
          type_id: this.foodType,
          star: this.star,
          imageUrl: this.imageUrl,
          inventory: this.num,
          initial: this.maxNum
        });
        var url = `${this.baseUrl}/business/addFood`;
        this.axios.post(url, data).then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.push('/MainPage/foodIndex')
          } else {
            this.$message.error("添加失败~");
          }
        });
      } else {
        this.$message.error("请将页面中的内容按要求填写完整哦~");
      }
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
}
.addfood {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 2%;
  background: #fff;
  box-shadow: 0 2px 10px #ccc;
}
.header > div {
  width: 30%;
  text-align: right;
}
.header button,
.btns > button {
  border: none;
  color: #333;
  border-radius: 3px;
  background: #fff;
  border: 1px solid #ccc;
}
.header button {
  padding: 1.5% 5%;
}
.btns > button {
  padding: 1% 3% !important;
}
.header button:last-child,
.btns > button:last-child {
  color: #fff;
  background: #4a7bf8;
  margin-left: 4%;
  border: none;
}
.btns {
  margin-top: 3%;
  padding-bottom: 15%;
}
.content {
  display: flex;
  margin-top: 1%;
}
.left {
  width: 58%;
  margin: 0 1%;
}
.left > div:not(:last-child) {
  padding: 1.5% 1.5% 5% 1.5%;
  background: #fff;
  box-shadow: 0 3px 5px #ccc;
}
.left > div:first-child {
  margin-bottom: 3%;
}
.right {
  width: 35%;
  background: #fff;
  padding: 1.5% 1.5% 4% 1.5%;
  margin-right: 5%;
  height: 100%;
  box-shadow: 0 2px 10px #ccc;
}
.info {
  display: flex;
  margin-bottom: 20px;
}
.info p,
.discript p {
  margin-bottom: 10px;
}
.foodname {
  width: 70%;
  margin-right: 3%;
}
.stoke > div {
  width: 15%;
}
.stoke > p > span {
  font-size: 14px;
  color: #909399;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.right i {
  border: 1px dashed #d9d9d9 !important;
}
.right > div > div {
  text-align: center;
}
.right > p {
  margin-bottom: 5%;
}
</style>
