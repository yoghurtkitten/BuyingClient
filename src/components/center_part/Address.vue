<template>
  <div class="address">
    <div class="top">订单详情</div>
    <div class="main">
      <div v-for="(item, index) in addressList" :key="index">
        <div>
          <p>{{item.receiver}} &nbsp;{{item.gender | changeGender}}</p>
          <p>
            <a href="javascript:;" @click="updataAddress" :data-index="index" :data-id="item.id">修改</a>
            <a href="javascript:;" @click="del" :data-index="index">删除</a>
          </p>
        </div>
        <div>{{item.address}}</div>
        <div>{{item.phone}}</div>
        <div class="del" v-if="item.showDel">
          <p>确定要删除收货地址？</p>
          <div>
            <button @click="confirm" :data-index="index" :data-id="item.id">确定</button>
            <button @click="cancel" :data-index="index">取消</button>
          </div>
        </div>
      </div>
      <button class="addAddress" @click="addAddress">
        <i class="iconfont">&#xe845;</i>
        添加新地址
      </button>
    </div>
    <div class="modal-bg" v-if="isAdd"></div>
    <aside id="modal" v-if="isAdd">
      <h2 v-if="!isUpdate">添加新地址</h2>
      <h2 v-else>编辑地址</h2>
      <div>
        <label>姓名</label>
        <input type="text" name id="uname" placeholder="请输入您的姓名" v-model="receiver">
      </div>
      <div>
        <label>性别</label>
        <input type="radio" name="gender" value="1" v-model="gender">
        <span>先生</span>
        <input type="radio" name="gender" value="0" v-model="gender">
        <span>女士</span>
      </div>
      <div data-address>
        <label>位置</label>
        <v-distpicker :province="province" :city="city" :area="area" @selected="selected"></v-distpicker>
      </div>
      <div>
        <label>详细地址</label>
        <input type="text" id="detail_address" placeholder="单元、门牌号" v-model="datail_address">
      </div>
      <div>
        <label>手机号</label>
        <input type="text" name id="user_phone" placeholder="请输入您的手机号" v-model="phone" @blur="valiPhone">
        <span v-if="isPhone">手机号格式有误，请检查！</span>
      </div>
      <div>
        <button @click="saveAddre" :disabled="isSave">保存</button>
        <span data-cancal @click="cancelAdd">取消</span>
      </div>
    </aside>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import qs from "qs";
export default {
  components: { VDistpicker },
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      datail_address: "",
      phone: "",
      receiver: "",
      gender: "",
      province: "省",
      city: "市",
      area: "区",
      isAdd: false,
      addressList: [],
      isUpdate: false,
      updateId: "",
      isPhone: false,
      isSave: true,
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    valiPhone() {
      var reg = /^1[3-8]\d{9}$/;
      if (!reg.test(this.phone)) {
        this.isPhone = true;
        this.isSave = true;

      } else {
        this.isPhone = false;
        this.isSave = false;
      }
    },
    del(e) {
      var index = e.target.dataset.index;
      var newObj = this.addressList[index];
      newObj.showDel = true;
      this.addressList.splice(index, 1, newObj);
    },
    cancel(e) {
      var index = e.target.dataset.index;
      var newObj = this.addressList[index];
      newObj.showDel = false;
      this.addressList.splice(index, 1, newObj);
    },
    cancelAdd() {
      this.isAdd = false;
      this.isUpdate = false;
      // console.log(this.isUpdate);
    },
    selected(data) {
      this.city = data.city.value;
      this.area = data.area.value;
      this.province = data.province.value;
    },
    saveAddre() {
      if (this.isUpdate) {
        var addr = `${this.province}-${this.city}-${this.area}`;
        var _self = this;
        var data = qs.stringify({
          id: this.updateId,
          receiver: this.receiver,
          province: this.province,
          city: this.city,
          country: this.area,
          address: this.datail_address,
          phone: this.phone,
          gender: this.gender
        });
        var url = `${_self.baseUrl}/user/update_address`;
        this.axios.post(url, data).then(result => {
          if (result.data.code == 200) {
            _self.isAdd = false;
            this.getAddress();
            this.isUpdate = false;
          }
        });
      } else {
        var addr = `${this.province}-${this.city}-${this.area}`;
        var _self = this;
        var data = qs.stringify({
          receiver: this.receiver,
          province: this.province,
          city: this.city,
          country: this.area,
          address: this.datail_address,
          phone: this.phone,
          gender: this.gender
        });
        var url = `${_self.baseUrl}/user/save_address`;
        this.axios.post(url, data).then(result => {
          if (result.data.code == 200) {
            _self.isAdd = false;
            this.isUpdate = false;
            this.getAddress();
          }
        });
      }
    },
    addAddress() {
      this.isAdd = true;
      // console.log(this.isUpdate);
      if (!this.isUpdate) {
        this.receiver = "";
        this.gender = 0;
        this.province = "省";
        this.city = "市";
        this.area = "区";
        this.datail_address = "";
        this.phone = "";
      }
    },
    getAddress() {
      var url = `${this.baseUrl}/user/get_address`;
      this.axios(url).then(result => {
        this.addressList = result.data.data;
        for (var item of this.addressList) {
          item.showDel = false;
        }
        // console.log(result.data.data);
      });
    },
    confirm(e) {
      var index = e.target.dataset.index;
      var id = e.target.dataset.id;
      var url = `${this.baseUrl}/user/delAddress`;
      this.axios(url, {
        params: {
          id: id
        }
      }).then(result => {
        // console.log(result.data.msg);
      });
      this.addressList.splice(index, 1);
    },
    updataAddress(e) {
      var index = e.target.dataset.index;
      var id = e.target.dataset.id;
      this.isAdd = true;
      var url = `${this.baseUrl}/user/selectAddress`;
      this.axios(url, {
        params: {
          id: id
        }
      }).then(result => {
        var res = result.data.data[0];
        this.receiver = res.receiver;
        this.gender = res.gender;
        this.province = res.province;
        this.city = res.city;
        this.area = res.country;
        this.datail_address = res.address;
        this.phone = res.phone;

        this.isUpdate = true;
        this.updateId = id;
      });
    }
  },
  watch: {
    are(newName, oldName) {
      this.are = newName;
    }
  }
};
</script>
<style lang="css" scoped>
    @import '../../assets/css/centerAddress.css'
</style>
