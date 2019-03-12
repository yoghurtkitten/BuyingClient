<template>
  <div class="content">
    <div class="left">
      <div class="search">
        <input type="text" placeholder="搜索菜品" @keyup.13="search" v-model="food_name">
        <i class="iconfont" @click="search">&#xe694;</i>
      </div>
      <ul>
        <li
          v-for="(item,index) in typeList"
          :key="index"
          :class="{'active':item.active}"
          @click="selectType"
          :data-id="item.id"
        >{{item.type_name}}</li>
      </ul>
    </div>
    <div class="right">
      <div class="type">
        <div class="title">
          <p v-if="!showChange">{{currentType}}</p>
          <el-button type="info" icon="el-icon-edit" v-if="!showChange" @click="showChange=true">编辑</el-button>
          <div v-if="showChange" class="showChangeBox">
            <input type="text" v-model="currentType">
            <el-button type="primary" @click="edit(current_type_id)">提交</el-button>
          </div>
        </div>
        <div class="food">
          <div class="food-item" v-for="(item, index) in foodList" :key="index">
            <div class="item-top">
              <div>
                <p>{{item.name}}</p>
                <p>￥{{item.price.toFixed(2)}}</p>
                <p>{{item.inventory}}/{{item.initial}}</p>
              </div>
              <img :src="baseUrl+'/'+item.food_img" alt>
            </div>
            <div class="btns">
              <div>
                <button @click="addCount" :data-id="item.food_id">置满</button>
                <button @click="foodZero" :data-id="item.food_id">沽清</button>
              </div>
              <!-- <button @click="del" :data-id="item.food_id">删除</button> -->
              <button @click="manage" :data-id="item.food_id">管理</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="oprate">
      <div>
        <div class="oprate-item" v-if="isAdd" @click="changeModel">
          <i class="el-icon-menu"></i>
          <span>添加分类</span>
        </div>
        <div class="oprate-item" @click="addFood" v-if="isAdd">
          <i class="el-icon-goods"></i>
          <span>添加菜品</span>
        </div>
        <div class="oprate-item" @click="showAdd">
          <i class="el-icon-plus"></i>
          <span>添加</span>
        </div>
      </div>
    </div>
    <div class="addTypeModel" v-if="isAddType">
      <div class="form">
        <p @click="cancle">X</p>
        <p>添加分类名称</p>
        <div>
          <el-input placeholder="请输入内容" v-model="addTypeName" clearable></el-input>
          <el-button type="info" @click="cancle">取消</el-button>
          <el-button type="primary" @click="addType">提交</el-button>
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
      food_name: "",
      baseUrl: this.$store.getters.getBaseUrl,
      typeName: "",
      isAdd: false,
      typeList: [],
      currentType: "",
      current_type_id: 1,
      foodList: [],
      allFood: [],
      typeIndex: "",
      showChange: false,
      addTypeName: "",
      isAddType: false
    };
  },
  created() {
    this.getType().then(this.getFood);
  },
  methods: {
    manage(e) {
      var food_id = e.target.dataset.id;
      this.$router.push(`/MainPage/updateFood?food_id=${food_id}`);
    },
    changeModel() {
      //   console.log("123");
      this.isAddType = true;
    },
    search() {
      for (const item of this.allFood) {
        if (item.name == this.food_name) {
          this.currentType = item.type_name;
          this.current_type_id = item.id;
          this.foodList = [];
          this.foodList.push(item);
        }
      }
    },
    addFood() {
      this.$router.push("/MainPage/addFood");
    },
    addType() {
      var url = `${this.baseUrl}/business/addFoodType`;
      var data = qs.stringify({
        type_name: this.addTypeName,
        bphone: localStorage.getItem("business")
      });
      this.axios.post(url, data).then(res => {
          if (res.data.code == 200) {
            this.getType();
            this.isAddType = false;
            this.addTypeName = '';
          } else {
            this.$message.error("添加错误，请重试");
          }
        });
    },
    showAdd() {
      this.isAdd = !this.isAdd;
    },
    getType() {
      var _self = this;
      return new Promise(function(open, err) {
        var url = `${_self.baseUrl}/business/getFoodCata`;
        _self.axios
          .get(url, {
            params: {
              bphone: localStorage.getItem("business")
            }
          })
          .then(res => {
            _self.typeList = res.data.data;
            for (const item of _self.typeList) {
              item.active = false;
            }
            if (_self.typeIndex == "") {
              _self.typeList[0].active = true;
              _self.currentType = _self.typeList[0].type_name;
              _self.current_type_id = _self.typeList[0].id;
            } else {
              _self.typeList[_self.typeIndex].active = true;
            }
            open();
          });
      });
    },
    selectType(e) {
      var id = e.target.dataset.id;
      var mylist = this.typeList;
      for (const item of mylist) {
        if (item.id == id) {
          for (const i of mylist) {
            i.active = false;
          }
          item.active = true;
          this.currentType = item.type_name;
          this.current_type_id = item.id;
          var myList = [];
          for (const i of this.allFood) {
            if (i.id == this.current_type_id) {
              myList.push(i);
            }
          }
          this.foodList = myList;
          return;
        }
      }
      this.typeList = [];
      this.typeList = this.typeList.concat(mylist);
    },
    getFood() {
      var _self = this;
      return new Promise(function(open, err) {
        var url = `${_self.baseUrl}/business/getFoodInfo`;
        _self.axios
          .get(url, {
            params: {
              bphone: localStorage.getItem("business")
            }
          })
          .then(res => {
            _self.allFood = res.data.data;
            var myList = [];
            for (const item of _self.allFood) {
              if (item.id == _self.current_type_id) {
                myList.push(item);
              }
            }
            _self.foodList = myList;
            open();
          });
      });
    },
    addCount(e) {
      var food_id = e.target.dataset.id;
      var url = `${this.baseUrl}/business/initFood`;
      this.axios
        .get(url, {
          params: {
            food_id: food_id
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "置满成功",
              type: "success"
            });
            this.getFood();
          } else {
            this.$message.error("置满失败");
          }
        });
    },
    foodZero(e) {
      var food_id = e.target.dataset.id;
      var url = `${this.baseUrl}/business/foodZero`;
      this.axios
        .get(url, {
          params: {
            food_id: food_id
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              message: "沽清成功",
              type: "success"
            });
            this.getFood();
          } else {
            this.$message.error("沽清失败");
          }
        });
    },
    edit(type_id) {
      var url = `${this.baseUrl}/business/changeFoodType`;
      var data = qs.stringify({
        id: type_id,
        type_name: this.currentType
      });
      this.axios.post(url, data).then(res => {
        if (res.data.code == 200) {
          for (let i = 0; i < this.typeList.length; i++) {
            const element = this.typeList[i];
            if (element.id == type_id) {
              this.typeIndex = i;
              break;
            }
          }
          this.showChange = false;
          this.getType();
        } else {
          this.$message.error("更改失败");
        }
      });
      this.dialogchangeVisible = false;
    },
    cancle() {
      this.isAddType = false;
    }
  }
};
</script>
<style scoped>
p {
  padding: 0;
  margin: 0;
}
ul {
  margin: 0;
  padding: 0;
}
.content {
  display: flex;
  width: 100%;
}
.left {
  width: 20%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding-top: 1.5%;
  min-height: 700px;
}
.left > ul {
  list-style: none;
  width: 100%;
  margin-top: 5%;
}
.left > ul > li {
  width: 100%;
  padding-left: 10%;
  padding: 5% 0 5% 9%;
  font-size: 16px;
  color: #979797;
  font-weight: bold;
  cursor: pointer;
}
.left > ul > li:hover {
  background: #f1f1f1;
}
.active {
  border-left: 3px solid #e54c2a;
  background: #f1f1f1;
}
.right {
  width: 60%;
  padding-left: 2%;
  padding-top: 2%;
}
.oprate {
  width: 14%;
}
.search {
  position: relative;
  text-align: center;
}
.search > input {
  border-radius: 3px;
  border: 1px solid #e2dfdf;
  width: 80%;
  height: 36px;
  padding-left: 4%;
  font-size: 14px;
}
.search > i {
  position: absolute;
  right: 15%;
  top: 18%;
  color: #ccc;
  font-size: 18px;
  cursor: pointer;
}
.item-top {
  display: flex;
  justify-content: space-between;
}
.item-top > div > p:first-child {
  margin-bottom: 4%;
  font-weight: 700;
}
.item-top > div > p:nth-child(2) {
  margin-bottom: 18%;
  font-size: 14px;
  color: #e54c2a;
}
.item-top > div > p:last-child {
  font-weight: 500;
}
.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 5%;
}
.btns button {
  border: none;
  font-size: 14px;
  padding: 5px 25px;
  color: #333;
}
.btns > div > button:first-child {
  color: #fff;
  background: #4dc16f;
}
.food {
  display: flex;
  flex-wrap: wrap;
}
.food-item {
  margin-right: 2%;
  margin-bottom: 2%;
  padding: 2.5% 4%;
  width: 48%;
  background: #fff;
  box-shadow: 0 2px 10px #ccc;
}
.title {
  display: flex;
  margin-bottom: 3%;
}
.title > p {
  font-size: 24px;
  font-weight: 500;
  margin-right: 1.5%;
  color: #333;
}
.type {
  margin-bottom: 2%;
}
.oprate-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 14px;
  background: #4a7bf8;
  color: #fff;
  box-shadow: 3px 5px 10px #ccc;
  margin-bottom: 5%;
  cursor: pointer;
}
.oprate-item i {
  font-size: 26px;
}
.oprate > div {
  position: fixed;
  bottom: 25%;
  right: 7%;
}
img {
  width: 100px;
  height: 100px;
}
.showChangeBox {
  width: 50%;
}
.showChangeBox > input {
  height: 100%;
  border-radius: 4px;
  border: 1px solid #e2dfdf;
  padding-left: 2%;
}
.addTypeModel {
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 800px;
  top: 0;
}
.form {
  width: 30%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 30%;
  margin-top: 15%;
  border-radius: 4px;
  padding-bottom: 1%;
}
.form > p {
  align-self: flex-start;
  margin-left: 15%;
  margin-bottom: 2%;
}
.form > p:first-child {
  width: 80%;
  text-align: right;
  margin-top: 2%;
  cursor: pointer;
}
.form > div {
  text-align: right;
}
.form > div > button {
  margin-top: 3%;
}
</style>
