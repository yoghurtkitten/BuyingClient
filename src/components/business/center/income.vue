<template>
  <div class="content">
    <div class="income">
      <div>
        <p>交易额</p>
        <div class="money">
          <p>{{curPrice}}</p>
          <p>今日交易额</p>
        </div>
        <p>30天总营业额 ￥{{priceCount+orderCount*deliver_fee}}</p>
      </div>
      <div id="income" :style="{width: '700px', height: '350px'}"></div>
    </div>
    <div class="orderCount">
      <div>
        <p>订单数</p>
        <div class="count">
          <p>{{curOrder}}</p>
          <p>今日订单数</p>
        </div>
        <p>30天总订单数 {{orderCount}}</p>
      </div>
      <div id="orderCount" :style="{width: '700px', height: '350px'}"></div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      orderCount: 0,
      priceCount: 0,
      curPrice: 0,
      curOrder: 0,
      times: [],
      deliver_fee: 0,
      idList: [],
      orderList: []
    };
  },
  mounted() {
    this.getCurrentDay();
    this.getOrderCount();
    this.drawOrder();
    this.getPrice();
    this.get30Price();
    this.getWeekOrder().then(this.getWeekPrice);
  },
  methods: {
    getCurrentDay() {
      var date = new Date();
      var timeList = [];
      var now = date.getDay();
      var start = now + 1;
      for (let i = 0; i < 7; i++) {
        //   console.log((start + i)%7);
        switch ((start + i) % 7) {
          case 1:
            timeList.push("周一");
            break;
          case 2:
            timeList.push("周二");
            break;
          case 3:
            timeList.push("周三");
            break;
          case 4:
            timeList.push("周四");
            break;
          case 5:
            timeList.push("周五");
            break;
          case 6:
            timeList.push("周六");
            break;
          case 0:
            timeList.push("周日");
            break;

          default:
            break;
        }
      }
      this.times = timeList;
    },
    drawLine(priceList) {
      // 基于准备好的dom，初始化echarts实例
      let income = this.$echarts.init(document.getElementById("income"));
      // 绘制图表
      income.setOption({
        title: {},
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.times
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: [
          {
            name: "最高收入",
            type: "line",
            data: priceList,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    drawOrder(timeList) {
      // 基于准备好的dom，初始化echarts实例
      let orderCount = this.$echarts.init(
        document.getElementById("orderCount")
      );
      // 绘制图表
      orderCount.setOption({
        title: {},
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.times
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: [
          {
            name: "最高订单量",
            type: "line",
            data: timeList,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      });
    },
    getOrderCount() {
      var url = `${this.baseUrl}/business/getOrder30`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(res => {
          //   console.log(res.data);
          if (res.data.code == 200) {
            this.orderCount = res.data.data[0].count;
          }
        });
    },
    getPrice() {
      var url = `${this.baseUrl}/business/getAllPrice`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(result => {
          for (const item of result.data.data) {
            if (
              new Date(item.order_time).getFullYear() ==
                new Date().getFullYear() &&
              new Date(item.order_time).getMonth() == new Date().getMonth() &&
              new Date(item.order_time).getDate() == new Date().getDate()
            ) {
              this.curPrice += item.price;
              this.curOrder++;
            }
          }
        });
    },
    get30Price() {
      var url = `${this.baseUrl}/business/getPrice30`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(res => {
          this.deliver_fee = res.data.data[0].deliver_fee;
          //   console.log(res.data);
          var prices = res.data.data;
          var sum = 0;
          for (const item of prices) {
            sum += item.price;
          }
          this.priceCount = sum;
        });
    },
    getWeekOrder() {
      var _self = this;
      return new Promise(function(open, err) {
        var url = `${_self.baseUrl}/business/getOrder7`;
        _self
          .axios(url, {
            params: {
              bphone: localStorage.getItem("business")
            }
          })
          .then(res => {
            var result = res.data.data;
            var timeList = [];
            var date = new Date();
            var now = date.getDay();
            var start = now + 1;
            var idList = [];
            var index = 0;

            for (let i = 0; i < 14; i++) {
              timeList[i] = 0;
            }
            for (const item of result) {
              var i = new Date(item.order_time).getDay();
              timeList[(i+(start+i))%7]++;
              idList[index++] = item.id;
            }
            _self.drawOrder(timeList);
            _self.orderList = timeList;
            _self.idList = idList;
            // console.log(start)
            open();
          });
      });
    },
    getWeekPrice() {
      var _self = this;
      return new Promise(function(open, err) {
        var url = `${_self.baseUrl}/business/getPriceWeek`;
        _self.axios
          .post(url, qs.stringify({ idList: _self.idList }, { indices: false }))
          .then(res => {
            var result = res.data.data;
            var date = new Date();
            var now = date.getDay();
            var start = now + 1;
            var priceLlist = [];
            for (let i = 0; i < 7; i++) {
              priceLlist[i] = 0;
            }
            for (const item of result) {
              var i = new Date(item.order_time).getDay();
              priceLlist[(i+(start+i))%7] +=
                item.un_price * item.number +
                _self.orderList[i] * _self.deliver_fee;
            }
            _self.drawLine(priceLlist);
          });
      });
    }
  }
};
</script>
<style scoped>
.content {
  background: #fff;
  padding-top: 3%;
  width: 100%;
}
.content p {
  margin: 0;
  padding: 0;
}
.income,
.orderCount {
  display: flex;
  padding-left: 5%;
  color: #333;
  font-size: 18px;
  font-weight: 500;
}
.income {
  /* border-bottom: 1px solid #ccc; */
  box-shadow: 0 3px 3px #ccc;
  margin-bottom: 2%;
}
.income > div:first-child,
.orderCount > div:first-child {
  width: 30%;
}
.income > div:first-child > p:first-child,
.orderCount > div:first-child > p:first-child {
  font-size: 20px;
  font-weight: bold;
}
.income > div:first-child > p:last-child,
.orderCount > div:first-child > p:last-child {
  text-align: center;
  width: 80%;
}
.income > div:first-child > div,
.orderCount > div:first-child > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50%;
  margin-top: 10%;
  box-shadow: 0px 0 5px #ccc;
  margin-bottom: 3%;
}
.money > p:first-child,
.count > p:first-child {
  font-size: 38px;
  color: #333;
  font-weight: 500;
}
</style>
