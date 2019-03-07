<template>
  <div class="order">
    <div class="header">
      <ul>
        <li>
          <router-link to="/MainPage/order">新订单</router-link>
        </li>
        <li>
          <router-link to="/MainPage/cancelOrder">取消订单</router-link>
        </li>
        <li>
          <router-link to="/MainPage/queryOrder" class="active">查询订单</router-link>
        </li>
      </ul>
    </div>
    <section>
      <aside>
        <div class="order_info" v-for="(item, index) in orderList" :key="index" v-if="item">
          <div class="orderStatus">
            <p>
              <span>{{item[0].id}}</span>
              <span>希望尽快送达</span>
            </p>
            <p>{{item[0].status | statu}}</p>
          </div>
          <div>
            <p class="person">
              <span>{{item[0].receiver}}</span>
              
              <span>
                <i class="iconfont">&#xe678;</i>
                {{item[0].phone}}
              </span>
            </p>
            <p class="addr">
              <span>{{item[0].province}}{{item[0].city}}{{item[0].country}}{{item[0].address}}</span>
              <span>地图</span>
            </p>
            <p>
              <span>备注:</span>
              <span>{{item[0].message}}</span>
            </p>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>商品</th>
                  <th>数量</th>
                  <th class="toggle">
                    <p>单价</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(f, index) in item" :key="index">
                  <td>{{f.name}}</td>
                  <td>X{{f.number}}</td>
                  <td>{{f.price.toFixed(2)}}</td>
                </tr>
                <tr>
                  <td class="other">其他</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>配送费</td>
                  <td></td>
                  <td>{{item[0].deliver_fee.toFixed(2)}}</td>
                </tr>
                <tr class="total">
                  <td>总价</td>
                  <td></td>
                  <td>￥{{item | countPrice}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </aside>
      <aside>
        <div class="query">
          <p>查询订单</p>
          <el-select v-model="chooseStatus" clearable placeholder="请选择订单状态" @change="selectStatus">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-model="value"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1"
          ></el-date-picker>
          <!-- {{Date.parse(value)}} -->
          <div class="form-item">
            <el-input v-model="queryId" placeholder="请输入要查询的订单号" clearable></el-input>
            <el-button type="danger" :disabled="isQuery" @click="queryById">查询</el-button>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      smallTable: true,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value: "",
      orderId: "",
      queryId: "",
      baseUrl: this.$store.getters.getBaseUrl,
      orderList: [],
      isQuery: true,
      options: [
        {
          value: "0",
          label: "未付款"
        },
        {
          value: "1",
          label: "等待接单"
        },
        {
          value: "2",
          label: "已完成"
        }
      ],
      chooseStatus: ""
    };
  },
  watch: {
    queryId(value) {
      var reg = /^\d{19}$/;
      if (reg.test(value)) {
        this.isQuery = false;
      } else {
        this.isQuery = true;
      }
    },
    value(value) {
      // console.log(Date.parse(value))
      var selectValue = Date.parse(value);
      var statusList = [];
      for (let index = 0; index < this.allList.length; index++) {
        if (this.allList[index] != undefined) {
          /* if (this.allList[index][0].status == this.chooseStatus) {
            statusList.push(this.allList[index]);
          } */
          if (
            new Date(selectValue).getFullYear() ==
              new Date(this.allList[index][0].order_time).getFullYear() &&
            new Date(selectValue).getMonth() ==
              new Date(this.allList[index][0].order_time).getMonth() &&
            new Date(selectValue).getDate() ==
              new Date(this.allList[index][0].order_time).getDate()
          ) {
            statusList.push(this.allList[index]);
          }
        }
      }
      this.orderList = statusList;
    }
  },
  created() {
    this.getOrderInfo();
  },
  methods: {
    queryById() {
      var statusList = [];
      for (let index = 0; index < this.allList.length; index++) {
        if (this.allList[index] != undefined) {
          if (this.allList[index][0].order_no == this.queryId) {
            statusList.push(this.allList[index]);
          }
        }
      }
      this.orderList = statusList;
    },
    toggleTable() {
      this.smallTable = !this.smallTable;
    },
    getOrderInfo() {
      var url = `${this.baseUrl}/business/getAllOrderInfo`;
      this.axios(url, {
        params: {
          bphone: localStorage.getItem("business")
        }
      }).then(res => {
        var list = [];
        for (const item of res.data.data) {
          list[item.id] = new Array();
        }
        for (const item of res.data.data) {
          list[item.id].push(item);
        }
        this.orderList = list;
        this.allList = list;
      });
    },
    selectStatus() {
      var statusList = [];
      for (let index = 0; index < this.allList.length; index++) {
        if (this.allList[index] != undefined) {
          if (this.allList[index][0].status == this.chooseStatus) {
            statusList.push(this.allList[index]);
          }
        }
      }
      this.orderList = statusList;
    }
  },
  filters: {
    countPrice(value) {
      var price = 0;
      for (const item of value) {
        price += item.price * item.number;
      }
      return price + value[0].deliver_fee;
    },
    statu(value) {
      switch (value) {
        case 0:
          return "未付款";
          break;
        case 1:
          return "等待接单";
          break;
        case 2:
          return "已完成";
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.order {
  width: 100%;
}
.order p {
  margin: 0;
  padding: 0;
}
.order ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.order > .header {
  background: #fff;
  width: 100%;
  padding-top: 1%;
  padding-bottom: 1%;
}
.order > .header > ul {
  list-style: none;
  display: flex;
}
.order > .header > ul > li {
  margin-left: 5%;
  cursor: pointer;
}
.order > .header > ul > li > a {
  text-decoration: none;
  color: #464646;
}
.order > section > aside:first-child {
  width: 60%;
}
.order_info {
  background: #fff;
  margin-bottom: 5%;
  /* box-shadow: 0 0 5px #ccc; */
}
.active {
  color: #e54c2a !important;
  font-weight: bold;
  border-bottom: 3px solid #e54c2a;
  padding-bottom: 16%;
}
.order_info {
  padding: 3%;
}
.order > section {
  padding-top: 1.3%;
  padding-left: 2%;
}
.order .person,
.order .addr {
  display: flex;
  justify-content: space-between;
}
.order table {
  width: 100%;
}
.order table > thead {
  color: #424242;
}
.order table > tbody {
  color: #464646;
  font-size: 14px;
}
.order table td:last-child,
.order table th:last-child {
  width: 15%;
  text-align: right;
}
.order table td:nth-child(2) {
  width: 10%;
  font-weight: bold;
}
.order table tr {
  height: 40px;
}
.order > section {
  display: flex;
}
.order > section > aside:last-child {
  width: 35%;
}
.order > section > aside:last-child > div {
  background: #fff;
  margin-left: 10%;
  padding: 4% 6% 6% 8%;
  box-shadow: 0 0 5px #ccc;
}
.order > section > aside:last-child > div:first-child {
  margin-bottom: 10%;
}
.order .orderStatus {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3%;
}
.order .orderStatus > p:last-child {
  font-weight: 700;
  color: #333;
}
.order .orderStatus > p:first-child {
  width: 25%;
  color: #333;
}
.order .orderStatus > p:first-child > span:first-child {
  color: #e54c2a;
  font-weight: 700;
  font-size: 26px;
  margin-right: 5%;
}
.order .orderStatus > p:first-child > span:last-child {
  font-size: 14px;
}
.order .person {
  margin-bottom: 1%;
}
.order .person > span:first-child {
  color: #414141;
  font-weight: bold;
  font-size: 22px;
  width: 30%;
}
.order .person > span:last-child {
  width: 30%;
  text-align: right;
}
.order .person > span > i {
  font-style: normal;
  font-size: 12px;
  font-weight: normal;
  color: #a2a2a2;
  margin-left: 5%;
}
.order .addr {
  color: #666;
  font-size: 14px;
  margin-bottom: 3%;
}
.order .addr + p {
  margin-bottom: 3%;
  color: #474747;
}
.order .addr + p > span:first-child {
  color: #ff7c1b;
  margin-right: 2%;
}
.order .toggle {
  font-size: 14px;
  font-weight: normal;
  color: #e54c2a;
  cursor: pointer;
}

.order .info > ul > li {
  padding-top: 4%;
  padding-bottom: 4%;
  font-size: 14px;
  margin-left: 4%;
}
.order .other {
  font-size: 12px;
  color: #ccc;
}
.order .total {
  font-size: 18px;
  font-size: #333;
  font-weight: bold;
}
.order .search {
  background: #fff;
  width: 100%;
  padding: 3%;
}
.order .query > p {
  margin-bottom: 5%;
}
.order .query > div {
  margin-bottom: 5%;
}
.form-item {
  display: flex;
}
.form-item > div {
  margin-right: 2%;
}
</style>

