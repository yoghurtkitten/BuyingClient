<template>
  <div class="address">
    <div class="top">订单详情</div>
    <div class="main">
        <div>
            <div></div>
            <div>旋木音乐教室 实验小学</div>
            <div>15912345678</div>
        </div>
    </div>
  </div>
</template>
<style scoped>
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
.address .main{
    margin: .3125rem;
    border: 1px solid #000;
    display: flex;
    flex-wrap: nowrap;
}
</style>
