<template>
  <div class="setting" v-if="shopInfo">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <ul>
          <li>
            <p>联系电话</p>
            <p>{{shopInfo.shop_phone}}</p>
            <p>
              <a href="javascript:;" @click="dialogPhone = true">修改</a>
            </p>
          </li>
          <li>
            <p>推荐指数</p>
            <p>{{shopInfo.shop_start}}</p>
            <p class="nochange">随着订单增加自动改变</p>
          </li>
          <li>
            <p>店铺公告</p>
            <p>{{shopInfo.notice == 0 ? '' : shopInfo.notice}}</p>
            <p>
              <a href="javascript:;" @click="dialogNotice = true">修改</a>
            </p>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="配送管理" name="second">
        <ul>
          <li>
            <p>配送费</p>
            <p>{{shopInfo.deliver_fee}}</p>
            <a href="javascript:;" @click="dialogFee = true">修改</a>
          </li>
          <li>
            <p>起送费</p>
            <p>{{shopInfo.deliver_cost}}</p>
            <a href="javascript:;" @click="dialogCost = true">修改</a>
          </li>
          <li>
            <p>配送时间</p>
            <p>{{shopInfo.deliver_time}}</p>
            <a href="javascript:;" @click="dialogTime = true">修改</a>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        <ul>
          <li>
            <p>暂时停业</p>
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="联系电话" :visible.sync="dialogPhone">
      <el-input placeholder="请输入内容" v-model="shopPhone" clearable @blur="valiphone"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPhone = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="phoneDisable"
          @click="changeShopInfo('shop_phone',shopPhone)"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="店铺公告" :visible.sync="dialogNotice">
      <el-input placeholder="请输入内容" v-model="shopNotic" clearable></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNotice = false">取 消</el-button>
        <el-button type="primary" @click="changeShopInfo('notice',shopNotic)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="配送费" :visible.sync="dialogFee">
      <el-input type="number" placeholder="请输入内容" v-model="shopFee" clearable></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFee = false">取 消</el-button>
        <el-button type="primary" @click="changeShopInfo('deliver_fee',shopFee)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="起送费" :visible.sync="dialogCost">
      <el-input type="number" placeholder="请输入内容" v-model="shopCost" clearable></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCost = false">取 消</el-button>
        <el-button type="primary" @click="changeShopInfo('deliver_cost',shopCost)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="配送时间" :visible.sync="dialogTime">
      <el-input type="number" placeholder="请输入内容" v-model="shopTime" clearable></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTime = false">取 消</el-button>
        <el-button type="primary" @click="changeShopInfo('deliver_time',shopTime)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      activeName: "first",
      value: false,
      baseUrl: this.$store.getters.getBaseUrl,
      shopInfo: null,
      dialogPhone: false,
      dialogNotice: false,
      dialogFee: false,
      dialogCost: false,
      dialogTime: false,
      shopPhone: "",
      shopNotic: "",
      shopFee: "",
      shopCost: "",
      shopTime: "",
      phoneDisable: true
    };
  },
  created() {
    this.getShopSet();
  },
  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    getShopSet() {
      var url = `${this.baseUrl}/business/getShopInfo`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(res => {
          if (res.data.code) {
            this.shopInfo = res.data.data[0];
            this.shopPhone = this.shopInfo.shop_phone;
            this.shopNotic = this.shopInfo.notice;
            this.shopFee = this.shopInfo.deliver_fee;
            this.shopCost = this.shopInfo.deliver_cost;
            this.shopTime = this.shopInfo.deliver_time;
            this.value = this.shopInfo.isPass ? true : false;
            // console.log(this.shopInfo.isPass);
          } else {
            alert("诶吖~~~系统开了小差~");
          }
        });
    },
    changeShopInfo(option, value) {
      var url = `${this.baseUrl}/business/changeShopInfo`;
      var data = qs.stringify({
        option: option,
        content: value,
        bphone: localStorage.getItem("business")
      });
      this.axios.post(url, data).then(res => {
        if (res.data.code == 200) {
          this.dialogPhone = false;
          this.dialogNotice = false;
          this.dialogFee = false;
          this.dialogCost = false;
          this.dialogTime = false;
          this.getShopSet();
        } else {
          this.$message.error("诶吖~~~系统开了小差~");
          this.dialogPhone = false;
          this.dialogNotice = false;
          this.dialogFee = false;
          this.dialogCost = false;
          this.dialogTime = false;
        }
      });
    },
    valiphone() {
      var res = /^1[3-9]\d{9}$/;
      if (!res.test(this.shopPhone)) {
        this.$message.error("手机号格式有误");
        this.phoneDisable = true;
      } else {
        this.phoneDisable = false;
      }
    }
  },
  watch: {
    value: function() {
      var isPass = this.value ? 1 : 0;
      this.changeShopInfo("isPass", isPass);
    }
  }
};
</script>
<style scoped>
.setting {
  width: 100%;
  background: #fff;
  padding: 3% 4%;
}
.setting p {
  margin: 0;
  padding: 0;
}
.setting ul {
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
}
.setting ul > li {
  display: flex;
  justify-content: space-between;
  padding: 2% 0%;
  border-bottom: 1px solid #e4e7ed;
  font-size: 14px;
}
.setting ul > li > p:first-child {
  font-size: 16px;
  font-weight: 600;
  width: 15%;
}
.setting ul > li > p:nth-child(2) {
  width: 50%;
  font-size: 16px;
}
.setting ul > li > p:last-child {
  text-align: right;
  width: 35%;
  font-size: 16px;
}
a {
  text-decoration: none;
  font-size: 16px;
}
.nochange {
  color: #ccc;
}
</style>
