<template>
  <div class="index">
    <div class="order">
      <p>待处理订单</p>
      <div>
          <ul>
              <li>
                  <p>3</p>
                  <p>新订单</p>
              </li>
              <li>
                  <p>0</p>
                  <p>异常订单</p>
              </li>
              <li>
                  <p>0</p>
                  <p>退单</p>
              </li>
          </ul>
      </div>
    </div>
    <div>
      <p>今日总览</p>
    </div>
  </div>
</template>
<style scoped>
.index p {
    margin: 0;
}
.index ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.index > div {
  background: #fff;
  box-shadow: 0 0 5px #ccc;
}
.index > div > p {
  font-size: 1rem;
  color: #666;
  font-weight: 700;
}
.index .order{
    padding: 8% 12% 8% 12%;
}
.index .order ul{
    display: flex;
}
</style>
