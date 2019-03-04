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
        <div class="order_info">
          <div class="orderStatus">
            <p>
              <span>31</span>
              <span>希望尽快送达</span>
            </p>
            <p>等待接单</p>
          </div>
          <div>
            <p class="person">
              <span>
                王小虎
                <i>#90天内第3次下单</i>
              </span>
              
              <span>
                <i class="iconfont">&#xe678;</i>
                18812345678
              </span>
            </p>
            <p class="addr">
              <span>上海市普陀路金沙江路151号</span>
              <span>地图</span>
            </p>
            <p>
              <span>备注:</span>
              <span>不要辣椒，不要一次性筷子</span>
            </p>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>商品</th>
                  <th></th>
                  <th class="toggle">
                    <p v-if="smallTable" @click="toggleTable">
                      收起
                      <i class="iconfont">&#xeb6e;</i>
                    </p>
                    <p v-if="!smallTable" @click="toggleTable">
                      查看详情
                      <i class="iconfont">&#xeb6d;</i>
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody v-if="smallTable">
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td class="other">其他</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>餐盒费</td>
                  <td></td>
                  <td>6.00</td>
                </tr>
                <tr>
                  <td>配送费</td>
                  <td></td>
                  <td>5.00</td>
                </tr>
                <tr class="total">
                  <td>总价</td>
                  <td></td>
                  <td>￥152.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="order_info">
          <div class="orderStatus">
            <p>
              <span>31</span>
              <span>希望尽快送达</span>
            </p>
            <p>等待接单</p>
          </div>
          <div>
            <p class="person">
              <span>
                王小虎
                <i>#90天内第3次下单</i>
              </span>
              
              <span>
                <i class="iconfont">&#xe678;</i>
                18812345678
              </span>
            </p>
            <p class="addr">
              <span>上海市普陀路金沙江路151号</span>
              <span>地图</span>
            </p>
            <p>
              <span>备注:</span>
              <span>不要辣椒，不要一次性筷子</span>
            </p>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>商品</th>
                  <th></th>
                  <th class="toggle">
                    <p v-if="smallTable" @click="toggleTable">
                      收起
                      <i class="iconfont">&#xeb6e;</i>
                    </p>
                    <p v-if="!smallTable" @click="toggleTable">
                      查看详情
                      <i class="iconfont">&#xeb6d;</i>
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody v-if="smallTable">
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td>烤肉拌饭</td>
                  <td>X1</td>
                  <td>25.00</td>
                </tr>
                <tr>
                  <td class="other">其他</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>餐盒费</td>
                  <td></td>
                  <td>6.00</td>
                </tr>
                <tr>
                  <td>配送费</td>
                  <td></td>
                  <td>5.00</td>
                </tr>
                <tr class="total">
                  <td>总价</td>
                  <td></td>
                  <td>￥152.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </aside>
      <aside>
        <div class="money">
          <p>今日总营业额</p>
          <p>
            订单量：
            <span>20</span>单
          </p>
          <p>
            营业额：
            <span>1821</span>元
          </p>
        </div>
        <div class="info">
          <p>订单小贴士</p>
          <ul>
            <li>建议在十点前打开客户端</li>
            <li>建议填写接单手机号</li>
            <li>建议填写菜品的介绍</li>
            <li>建议填写完整的详细地址</li>
          </ul>
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
      orderId: ""
    };
  },
  methods: {
    toggleTable() {
      this.smallTable = !this.smallTable;
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
  padding: 4% 4%;
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
  width: 20%;
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
.order .money > p {
  color: #3d3d3d;
}
.order .money > p:first-child,
.order .info > p {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 6%;
}
.order .money > p > span {
  font-weight: bold;
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
</style>

