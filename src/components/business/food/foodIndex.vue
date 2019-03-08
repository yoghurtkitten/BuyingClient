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
          <p>{{currentType}}</p>
          <el-button type="info" icon="el-icon-edit">编辑</el-button>
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
                <button>置满</button>
                <button>沽清</button>
              </div>
              <button>编辑</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="oprate">
      <div>
        <div class="oprate-item" @click="addType" v-if="isAdd">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      food_name: "",
      baseUrl: this.$store.getters.getBaseUrl,
      typeName: "",
      isAdd: false,
      typeList: [],
      currentType: "",
      foodList: [],
      allFood: []
    };
  },
  created() {
    this.getType();
    this.getFood();
  },
  methods: {
    search() {
    //   console.log(this.food_name);
    //   this.food_name = "";
      for (const item of this.allFood) {
          if (item.name == this.food_name) {
            //   console.log(item);
            this.currentType = item.type_name;
            this.foodList = [];
            this.foodList.push(item)
          }
      }
    },
    addFood() {
      this.$router.push("MainPage/addFood");
    },
    addType() {
      this.$alert(
        '<p style="color:#333">分类名称</p><input type="text"  placeholder="请输入内容"  v-model="typeName" style="width:300px; margin-top:20px"  clearable></input>',
        "添加新的分类",
        {
          dangerouslyUseHTMLString: true
        }
      );
    },
    showAdd() {
      this.isAdd = !this.isAdd;
    },
    getType() {
      var url = `${this.baseUrl}/business/getFoodCata`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(res => {
          this.typeList = res.data.data;
          for (const item of this.typeList) {
            item.active = false;
          }
          this.typeList[0].active = true;
          this.currentType = this.typeList[0].type_name;
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
          var myList = [];
          for (const item of this.allFood) {
            if (item.type_name == this.currentType) {
              myList.push(item);
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
      var url = `${this.baseUrl}/business/getFoodInfo`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(res => {
          this.allFood = res.data.data;
          var myList = [];
          for (const item of this.allFood) {
            if (item.type_name == this.currentType) {
              myList.push(item);
            }
          }
          this.foodList = myList;
        });
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
</style>
