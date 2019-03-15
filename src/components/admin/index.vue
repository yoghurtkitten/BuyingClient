<template>
  <div class="index">
    <div class="header">
      <p>Buying · 管理员中心</p>
      <p @click="logOut">退出登录</p>
    </div>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核商家" name="first">
          <div>
            <el-collapse v-model="activeitem" accordion>
              <el-collapse-item
                v-for="(item, index) in newInfoList"
                :key="index"
                :title="item.shop_name"
                :name="index+1"
              >
                <ul class="shop-list">
                  <li>
                    <p>店铺名</p>
                    <p>{{item.shop_name}}</p>
                  </li>
                  <li>
                    <p>店铺地址</p>
                    <p>{{item.address}}</p>
                  </li>
                  <li>
                    <p>营业执照注册号</p>
                    <p>{{item.license}}</p>
                  </li>
                  <li>
                    <p>商家姓名</p>
                    <p>{{item.shopman_name}}</p>
                  </li>
                  <li>
                    <p>商家身份证号</p>
                    <p>{{item.idCard}}</p>
                  </li>
                  <li>
                    <p>商家联系方式</p>
                    <p>{{item.phone}}</p>
                  </li>
                  <li>
                    <el-button type="primary" @click="changeStatus(0,item.id)">同意</el-button>
                    <el-button @click="changeStatus(1,item.id,index)">拒绝</el-button>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史信息" name="second">
          <div>
            <el-table :data="allList" height="250" border style="width: 100%">
              <el-table-column prop="shop_name" label="店铺名"></el-table-column>
              <el-table-column prop="address" label="店铺地址"></el-table-column>
              <el-table-column prop="license" label="营业执照注册号"></el-table-column>
              <el-table-column prop="shopman_name" label="商家姓名"></el-table-column>
              <el-table-column prop="idCard" label="身份证号"></el-table-column>
              <el-table-column prop="phone" label="商家联系方式"></el-table-column>
              <el-table-column prop="isPassStatus" label="审核状态"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="third">
          <div class="changePwd">
            <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="旧密码" prop="oldPass">
                <el-input type="password" v-model="ruleForm2.oldPass" autocomplete="off"></el-input>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
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
      activeName: "first",
      activeitem: "1",
      baseUrl: this.$store.getters.getBaseUrl,
      allList: [],
      newInfoList: [],
      ruleForm2: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        oldPass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    console.log(localStorage.getItem("isLogin"));
    this.getAllInfo();
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.label == "历史信息" || tab.label == "待审核商家") {
        this.allList = [];
        this.newInfoList = [];
        this.getAllInfo();
      }
    },
    getAllInfo() {
      var url = `${this.baseUrl}/admin/getShopBusi`;
      this.axios.get(url).then(res => {
        if (res.data.code == 200) {
          this.allList = res.data.data;
          for (const item of this.allList) {
            item.isPassStatus = item.isPass ? "未审核/审核失败" : "审核通过";
            if (item.isPass == 1) {
              this.newInfoList.push(item);
            }
          }
        } else {
          this.$message.error("系统开了小差~");
        }
      });
    },
    changeStatus(status, sid, index) {
      var url = `${this.baseUrl}/admin/changeShopStatu`;
      this.axios(url, {
        params: {
          id: sid,
          isPass: status
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.newInfoList.splice(index, 1);
          //   this.newInfoList = [];
          //   this.getAllInfo();
        } else {
          this.$message.error("系统开了小差~");
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //   console.log(this.ruleForm2.oldPass, this.ruleForm2.pass);
          var url = `${this.baseUrl}/admin/changeAdminPwd`;
          this.axios
            .get(url, {
              params: {
                oldPwd: this.ruleForm2.oldPass,
                pwd: this.ruleForm2.pass
              }
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "更改成功，3秒后自动跳至登录页面",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push("/adminLogin");
                }, 3000);
              } else {
                this.$message.error("原密码错误");
              }
            });
        } else {
        //   console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    logOut() {
      localStorage.removeItem("isLogin");
      this.$router.push("/adminLogin");
    }
  },
  beforeRouteEnter (to, from, next) {
      if (localStorage.getItem('isLogin') == 1) {
          next();
      } else {
          history.go(-1);
      }
  }
};
</script>
<style scoped>
.index > .header {
  display: flex;
  justify-content: space-between;
  background: #41403f;
  color: #f5f5f5;
  padding: 2% 5%;
}
.index > .header p {
  margin: 0;
  padding: 0;
  font-size: 20px;
}
.index > .header p:last-child {
  font-size: 18px;
  cursor: pointer;
}
.index > .main {
  padding: 2% 4%;
  background: #fff;
}
.index ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.index .shop-list > li {
  display: flex;
  justify-content: space-between;
  padding: 0 3%;
}
.index .shop-list > li:first-child {
  margin-top: 1rem;
}
.index .shop-list > li:last-child {
  justify-content: flex-end;
}
.index .shop-list > li > p:last-child {
  width: 50%;
  text-align: left;
}
.index .shop-list {
  width: 40%;
  /* border: 1px solid #ccc; */
}
.index .changePwd {
  width: 40%;
}
</style>
