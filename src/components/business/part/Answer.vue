<template>
  <div class="answer">
    <div>
      <p>处理用户评论</p>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="回复评论" name="first">
          <!-- {{activeComment}} -->
          <el-collapse v-model="activeComment" accordion>
            <el-collapse-item
              :title="item.phone"
              :name="index+1"
              v-for="(item, index) of newComment"
              :key="index"
            >
              <div>
                <div class="userComment">
                  <div>
                    <span>评分:</span>
                    <i class="iconfont" v-for="(obj, i) of item.order_star" :key="i">&#xec43;</i>
                  </div>
                  <div>
                    <span>评论:</span>
                    <span>{{item.comment}}</span>
                  </div>
                </div>
                <div class="busiComment">
                  <el-input
                    type="textarea"
                    @blur="valiComment"
                    :rows="7"
                    placeholder="请输入回复评论内容"
                    v-model="commentsText"
                  ></el-input>
                  <el-button type="primary" @click="answer(item.order_no,index)">确认回复</el-button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="查看评论" name="second">
          <el-table
            :data="allCommentList.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
          >
            <el-table-column label="用户" prop="phone"></el-table-column>
            <el-table-column label="评分" prop="order_star"></el-table-column>
            <el-table-column label="评论" prop="comment"></el-table-column>
            <el-table-column label="我的回复" prop="busi_comment"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      activeName: "",
      activeComment: "1",
      search: "",
      baseUrl: this.$store.getters.getBaseUrl,
      allCommentList: [],
      newComment: [],
      commentsText: "",
      choose: this.$route.query.choose
    };
  },
  created() {
    this.getComment();
    this.activeName = this.$route.query.choose == "1" ? "second" : "first";
  },
  methods: {
    handleClick(tab, event) {
      this.getComment();
    },
    getComment() {
      var url = `${this.baseUrl}/user/getUserComment`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.allCommentList = res.data.data;
            // console.log(this.allCommentList)
            var arr = [];
            for (const item of res.data.data) {
              if (item.busi_comment == "") {
                arr.push(item);
              }
            }
            this.newComment = arr;
          }
        });
    },
    valiComment() {},
    answer(order_no, index) {
      var url = `${this.baseUrl}/user/setBusiComment`;
      var data = qs.stringify({
        comment: this.commentsText,
        order_no: order_no
      });
      this.axios.post(url, data).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: "回复成功",
            type: "success"
          });
          this.newComment.splice(index, 1);
          this.commentsText = "";
          this.activeComment = "";
        } else {
          this.$message.error("回复失败，请重试~");
        }
      });
    }
  }
};
</script>
<style scoped>
.answer {
  width: 100%;
  background: #fff;
  margin: 2%;
  padding: 2%;
}
.answer > div:last-child {
  padding: 0 3%;
}
.answer > div:first-child > p {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
}
.userComment {
  background: #f5f5f5;
  padding: 2% 4%;
  margin-bottom: 2%;
}
.userComment i {
  color: #e54c2a;
}
.userComment > div > span:first-child {
  margin-right: 2%;
  font-size: 16px;
  color: #333;
}
.busiComment {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.busiComment button {
  align-self: flex-end;
  margin-top: 3%;
}
</style>
