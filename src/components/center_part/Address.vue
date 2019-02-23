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
        <input type="text" name id="user_phone" placeholder="请输入您的手机号" v-model="phone">
      </div>
      <div>
        <button @click="saveAddre">保存</button>
        <span data-cancal @click="cancelAdd">取消</span>
      </div>
    </aside>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import qs from 'qs'
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
      updateId: '',
    };
  },
  created() {
    this.getAddress();
  },
  methods: {
    del(e) {
      var index = e.target.dataset.index;
      var newObj = this.addressList[index];
      newObj.showDel = true;
      this.addressList.splice(index, 1, newObj)
    },
    cancel(e) {
      var index = e.target.dataset.index;
      var newObj = this.addressList[index];
      newObj.showDel = false;
      this.addressList.splice(index, 1, newObj)
    },
    cancelAdd(){
      this.isAdd = false;
    },
    selected(data) {
      this.city = data.city.value;
      this.area = data.area.value;
      this.province = data.province.value;
    },
    saveAddre() {
      if(this.isUpdate){
        var addr = `${this.province}-${this.city}-${this.area}`;
        var _self = this;
        var data = qs.stringify( {
          id:this.updateId,
          receiver: this.receiver,
          province: this.province,
          city: this.city,
          country: this.area,
          address: this.datail_address,
          phone: this.phone,
          gender: this.gender
          })
        var url = `${_self.baseUrl}/user/update_address`;
        this.axios.post(url, data).then(result => {
          if(result.data.code == 200){
            _self.isAdd = false;
            this.isUpdate = false;
            this.getAddress();
          }
        })
      } else {
        var addr = `${this.province}-${this.city}-${this.area}`;
        var _self = this;
        var data = qs.stringify( {
            receiver: this.receiver,
            province: this.province,
            city: this.city,
            country: this.area,
            address: this.datail_address,
            phone: this.phone,
            gender: this.gender
          })
        var url = `${_self.baseUrl}/user/save_address`;
        this.axios.post(url, data).then(result => {
          if(result.data.code == 200){
            _self.isAdd = false;
            this.isUpdate = false;
          }
        })
      }
    },
    addAddress() {
      this.isAdd = true;
    },
    getAddress() {
      var url = `${this.baseUrl}/user/get_address`;
      this.axios(url).then(result => {
        this.addressList = result.data.data;
        for(var item of this.addressList){
          item.showDel = false;
        }
        console.log(result.data.data);
      })
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
          console.log(result.data.msg)
        })
        this.addressList.splice(index,1);
    },
    updataAddress(e) {
      var index = e.target.dataset.index;
      var id = e.target.dataset.id;
      this.isAdd = true;
      var url = `${this.baseUrl}/user/selectAddress`;
        this.axios(url,{
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
        })
    }
  },
  watch: {
    are(newName, oldName){
      this.are = newName;
    }
  },
};
</script>
<style scoped>
.address p {
  margin: 0;
  padding: 0;
}
.address {
  width: 80%;
  background: #fff;
  padding: 1.5625rem;
}
.address .top {
  font-size: 1.125rem;
  font-weight: 700;
}
.address .top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f8f8f8;
  margin-top: 10px;
}
.address .main {
  margin: 0.3125rem;
  /* border: 1px solid #000; */
  display: flex;
  flex-wrap: wrap;
}
.address .main > div {
  position: relative;
}
.address .main > div,
.addAddress {
  min-width: 32%;
  border: 1px solid #ccc;
  margin-top: 1.8%;
  font-size: 14px;
  color: #333;
  padding: 2%;
}
.main > button {
  background: #fff;
  height: 107px;
  color: #bbb !important;
}
.address .main > div:not(:nth-child(3n)) {
  margin-right: 2%;
}

.address .main > div a {
  font-size: 12px;
  text-decoration: none;
  color: #bbb;
}
.address .main > div > div:first-child {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
}
.del {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.del button {
  border: none;
  border-radius: 4%;
  width: 3.75rem;
  height: 1.5rem;
  background: #fff;
}
.del button:first-child {
  color: #fff;
  background: #e54c2a;
  margin-right: 4%;
}
.del p {
  text-align: center;
  margin-bottom: 2%;
}
.del > div {
  display: flex;
  justify-content: center;
}
#modal {
  position: fixed;
  top: 0;
  background: #fff;
  width: 55%;
  z-index: 101;
  font-size: 14px;
  color: #666;
  padding: 2%;
  margin-left: -10%;
  margin-top: 9%;
}
#modal > div {
  display: flex;
  margin-bottom: 4%;
  align-items: center;
}
#modal > h2 {
  margin-top: 0;
  margin-bottom: 4%;
  font-size:18px;
  color: #333;
  font-weight: 700;
}
#modal > div > label {
  width: 8%;
  text-align: right;
  margin-right: 5%;
}
#modal > div > span {
  display: inline-block;
  margin-left: 1%;
  margin-right: 5%;
  cursor: pointer;
}
#modal > div > input:not([type="radio"]) {
  height: 39px;
  width: 40%;
  border: 1px solid #dedede;
  padding-left: 2%;
}
input::-webkit-input-placeholder {
  color: #bbbbbb;
}

#modal > div > button {
  width: 20%;
  height: 42px;
  margin-left: 13%;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  background: #e45c2a;
  cursor: pointer;
}
#modal > div > button + span {
  margin-left: 5%;
}
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
