<template>
  <div class="content">
    <div class="left">
      <div class="search">
        <input type="text" placeholder="搜索菜品" @keyup.13="search" v-model="food_name">
        <i class="iconfont" @click="search">&#xe694;</i>
      </div>
      <ul>
        <li class="active">天天特价</li>
        <li>天天特价</li>
        <li>天天特价</li>
        <li>天天特价</li>
        <li>天天特价</li>
      </ul>
    </div>
    <div class="right">
        <div class="type">
            <p>天天特价</p>
            <div class="food">
                <div class="food-item">
                    <div>
                        <div>
                            <p>香辣鸡腿堡三个</p>
                            <p>￥18.00</p>
                            <p>1000/1000</p>
                        </div>
                        <img :src="baseUrl+'/img/nodata.6477c5.png'" alt>
                    </div>
                    <button>置满</button>
                    <button>沽清</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            food_name: '',
        }
    },
    methods: {
        search() {
            console.log(this.food_name);
            this.food_name = '';
        }
    },
}
</script>
<style scoped>
ul {
  margin: 0;
  padding: 0;
}
.content {
  display: flex;
  width: 100%;
}
.left {
  width: 25%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding-top: 1.5%;
}
.left > ul {
  list-style: none;
  width: 100%;
  margin-top: 5%;
}
.left > ul > li{
    width: 100%;
    padding-left: 10%;
    padding: 5% 0 5% 9%;
    font-size: 16px;
    color: #979797;
    font-weight: bold;
}
.active{
    border-left: 3px solid #e54c2a;
    background: #f1f1f1;
}
.right {
  widows: 74%;
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
</style>
