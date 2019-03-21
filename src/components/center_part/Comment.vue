<template>
  <div class="comment" v-if="infoList">
    <div class="top">待评价订单</div>
    <div class="shopInfo">
      <div>
        <img :src="baseUrl+'/img/brand/miaomiao.jpg'" alt srcset>
        <div>
          <p class="shop-name" v-if="infoList[0]">{{infoList[0].shop_name}}</p>
          <p>
            <span v-for="(item,index) of infoList" :key="index">{{item.name}}-</span>
          </p>
        </div>
      </div>
      <div>
        <p v-if="infoList[0]">下单时间：{{infoList[0].order_time | dateFormat}}</p>
      </div>
    </div>
    <div class="content">
      <p>
        <span>*</span> 评价商品
      </p>
      <div>
        <el-rate v-model="value"></el-rate>
        <el-input
          type="textarea"
          @blur="valiComment"
          :rows="10"
          placeholder="请输入评论内容"
          v-model="commentsText"
        ></el-input>
        <el-button type="primary" @click="commit" :disabled="notCommit">提交评论</el-button>
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
      value: 0,
      commentsText: "",
      infoList: [],
      notCommit: true,
      order_no: this.$route.query.order_no
    };
  },
  created() {
    this.getInfoToComment();
  },
  methods: {
    getInfoToComment() {
      var url = `${this.baseUrl}/user/getInfoToComment`;
      this.axios
        .get(url, {
          params: {
            order_no: this.order_no
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.infoList = res.data.data;
          }
        });
    },
    valiComment() {
      if (this.commentsText.length > 64) {
        this.$message.error("评论内容最多64个字");
        this.notCommit = true;
      } else {
        this.notCommit = false;
      }
    },
    commit() {
      var data = qs.stringify({
        comment: this.commentsText,
        order_star: this.value,
        order_no: this.order_no
      });
      var url = `${this.baseUrl}/user/setUserComment`;
      this.axios.post(url, data).then(res => {
        //   console.log(res.data.code)
        if (res.data.code == 200) {
          this.$message({
            message: "评论成功~",
            type: "success"
          });
          this.$router.push(`/UserCenter/OrderDetail?order_no=${this.order_no}`)
        } else {
          this.$message.error("哎呀~出了点问题~");
        }
      });
    }
  },
  filters: {
    dateFormat: function(val) {
      var date = new Date(val);
      return `${date.getFullYear()}-${
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)
      }-${date.getDate() > 10 ? date.getDate() : "0" + date.getDate()} ${
        date.getHours() > 10 ? date.getHours() : "0" + date.getHours()
      }:${
        date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
      }:${
        date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds()
      }`;
    }
  }
};
</script>
<style scoped>
.comment {
  width: 80%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding: 1.5625rem;
}

.comment .top {
  font-size: 1.125rem;
  font-weight: 700;
}

.comment .top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f4f4f4;
  margin-top: 10px;
  margin-bottom: 5%;
}
.shopInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  padding: 3% 4%;
  font-size: 14px;
  color: #9f9ea2;
}
.shopInfo > div:first-child {
  display: flex;
  justify-items: center;
  align-items: center;
  width: 60%;
}
.shopInfo p {
  margin: 0;
  padding: 0;
}
.shopInfo img {
  width: 5rem;
  margin-right: 3%;
}
img + div {
  width: 100%;
}
.shop-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.content {
  margin-top: 3%;
  display: flex;
  padding-left: 3%;
}
.content > p {
  font-size: 16px;
  color: #333;
}
.content > p > span {
  color: red;
}
.content > div {
  width: 80%;
  margin-left: 3%;
  display: flex;
  flex-direction: column;
}
.content > div > div:first-child {
  margin-bottom: 3%;
}
.content > div > button {
  width: 20%;
  align-self: flex-end;
  margin-top: 3%;
}
.shop-name + p {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
