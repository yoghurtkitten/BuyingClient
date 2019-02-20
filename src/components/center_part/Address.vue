<template>
  <div class="address">
    <div class="top">订单详情</div>
    <div class="main">
      <div>
        <div>
          <p>张三 &nbsp;先生</p>
          <p>
            <a href="javascript:;">修改</a>
            <a href="javascript">删除</a>
          </p>
        </div>
        <div>旋木音乐教室 实验小学1</div>
        <div>15912345678</div>
        <div class="del">
          <p>确定要删除收货地址？</p>
          <div>
            <button>确定</button>
            <button>取消</button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>张三 先生</p>
          <p>
            <a href="javascript:;">修改</a>
            <a href="javascript">删除</a>
          </p>
        </div>
        <div>旋木音乐教室 实验小学2</div>
        <div>15912345678</div>
      </div>
      <div>
        <div>
          <p>张三 先生</p>
          <p>
            <a href="javascript:;">修改</a>
            <a href="javascript">删除</a>
          </p>
        </div>
        <div>旋木音乐教室 实验小学3</div>
        <div>15912345678</div>
      </div>
      <div>
        <div>
          <p>张三 先生</p>
          <p>
            <a href="javascript:;">修改</a>
            <a href="javascript">删除</a>
          </p>
        </div>
        <div>旋木音乐教室 实验小学4</div>
        <div>15912345678</div>
      </div>
      <div>
        <div>
          <p>张三 先生</p>
          <p>
            <a href="javascript:;">修改</a>
            <a href="javascript">删除</a>
          </p>
        </div>
        <div>旋木音乐教室 实验小学5</div>
        <div>15912345678</div>
      </div>
      <div>
        <div>
          <p>张三 先生</p>
          <p>
            <a href="javascript:;">修改</a>
            <a href="javascript" @click="del">删除</a>
          </p>
        </div>
        <div>旋木音乐教室 实验小学6</div>
        <div>15912345678</div>
      </div>
      <button class="addAddress">
        <i class="iconfont">&#xe845;</i>
        添加新地址
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    del() {}
  }
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
  width: 32%;
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
}
.del p{
  text-align: center;
}
</style>
