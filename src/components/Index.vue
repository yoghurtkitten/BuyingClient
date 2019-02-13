<template>
  <div>
    <my-header :toggleFixed="isFixed"></my-header>
    <div class="container-fluid">
      <div class="main_img">
        <div class="carousel" data-ride="carousel" id="demo">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="http://127.0.0.1:5050/img/slider/1.jpg" class="img-fluid" alt>
            </div>
            <div class="carousel-item">
              <img src="http://127.0.0.1:5050/img/slider/2.jpg" class="img-fluid" alt>
            </div>
            <div class="carousel-item">
              <img src="http://127.0.0.1:5050/img/slider/3.jpg" class="img-fluid" alt>
            </div>
          </div>
          <ul class="carousel-indicators">
            <li class="active" data-slide-to="0" data-target="#demo"></li>
            <li class data-slide-to="1" data-target="#demo"></li>
            <li class data-slide-to="2" data-target="#demo"></li>
          </ul>
        </div>
        <div class="slider">
          <p class="welcome">Welcome Resta Restawant</p>
          <p class="loves">LOVES HEALTHY FOOD</p>
          <p class="detail">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.pellentesque vel volutpat felis, eu
            codimentum.Lorem ipsum dolor sit amet.
          </p>

          <button type="button" class="btn btn-danger my-btn buying" @click="buying">我要点外卖</button>
          <button type="button" class="btn btn-warning my-btn">我要入驻</button>
        </div>
      </div>

      <div class="server">
        <div class="sub-title">
          <img
            src="img/server.png"
            alt
            :class="{'img-responsive':true, 'server-img':true, 'addAnimate':isAddAnimate}"
          >
        </div>
        <div class="row server-content">
          <div class="col-md-6 server-left">
            <div :class="{'server-title':true, 'col':true, 'addAnimate':isAddAnimate}">品类全覆盖，应有尽有</div>
            <ul :class="{'server-list':true, 'addAnimate':isAddAnimate}">
              <li
                v-for="(item, index) in server_type"
                :key="index"
                @mouseenter="enter(item.id)"
                @mouseleave="leave(item.id)"
              >
                <div
                  class="img"
                  :style="{'background-image':`url('${item.afterImg}')`}"
                  v-if="item.ismouse"
                ></div>
                <div class="img" :style="{'background-image':`url('${item.beforeImg}')`}" v-else></div>

                <div>
                  <div :class="{'main-title':true,'main-title_hover':item.ismouse}">{{item.main}}</div>
                  <div :class="{'subTitle':item.ismouse}">{{item.sub}}</div>
                </div>
              </li>
            </ul>
          </div>
          <div :class="{'col-md-6':true,'addAnimate':isAddAnimate}">
            <div class="out-phone">
              <div
                class="phone"
                :style="{'background-image':`url('${server_type[index].phoneImg}')`}"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      isFixed: false,
      isAddAnimate: false,
      server_type: [
        {
          id: 0,
          main: "美食 Delicacy",
          sub: "大牌优惠",
          beforeImg: "http://127.0.0.1:5050/img/small_img/Delicacy-nopick.png",
          afterImg: "http://127.0.0.1:5050/img/small_img/Delicacy-picked.png",
          phoneImg: "http://127.0.0.1:5050/img/phone/delicacy.png",
          ismouse: true
        },
        {
          id: 1,
          main: "甜点饮品 Desserts&Drinks",
          sub: "幸福甜蜜",
          beforeImg: "http://127.0.0.1:5050/img/small_img/Desserts-nopick.png",
          afterImg: "http://127.0.0.1:5050/img/small_img/Desserts-picked.png",
          phoneImg: "http://127.0.0.1:5050/img/phone/desserts.png",
          ismouse: false
        },
        {
          id: 2,
          main: "水果生鲜 Fresh food",
          sub: "新鲜速达",
          ismouse: false,
          beforeImg:
            "http://127.0.0.1:5050/img/small_img/Supermarket-nopick.png",
          afterImg:
            "http://127.0.0.1:5050/img/small_img/Supermarket-picked.png",
          phoneImg: "http://127.0.0.1:5050/img/phone/fresh.png"
        },
        {
          id: 3,
          main: "超市便利 Supermarket",
          sub: "优惠促销",
          ismouse: false,
          beforeImg: "http://127.0.0.1:5050/img/small_img/fruit-nopick.png",
          afterImg: "http://127.0.0.1:5050/img/small_img/fruit-picked.png",
          phoneImg: "http://127.0.0.1:5050/img/phone/supermarket.png"
        }
      ],
      index: 0
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    buying() {
      this.$router.push(`/UserIndex`);
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop)
      if (scrollTop > 199) {
        this.isFixed = true;
        this.isAddAnimate = true;
      } else {
        this.isAddAnimate = false;
      }
      if (scrollTop < 50) {
        this.isFixed = false;
      }
    },
    enter(id) {
      this.server_type[id].ismouse = true;
      this.index = id;
    },
    leave(id) {
      this.server_type[id].ismouse = false;
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  font-size: 20px;
}
* {
  margin: 0;
  padding: 0;
}
iframe {
  width: 100%;
  z-index: 10;
  height: 117px;
}
.container-fluid {
  width: 100%;
  margin: 0;
  padding: 0;
}
.main_img {
  height: auto;
  width: 100%;
  overflow: hidden;
}
.main_img div {
  float: left;
}
@keyframes my-btn-Animate {
  0% {
    transform: translateY(2000px);
    opacity: 0;
  }
  40% {
    transform: translateY(-20px);
    opacity: 1;
  }
  60% {
    transform: translateY(20px);
    opacity: 1;
  }
  80% {
    transform: translateY(-5px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.my-btn {
  width: 8%;
  height: 2.5rem;
  animation: my-btn-Animate 1s ease 1;
  animation-fill-mode: forwards;
  color: #fff;
}

@media screen and (max-width: 1540px) {
  .my-btn {
    font-size: 16px;
  }
}
@media screen and (max-width: 1540px) and (min-width: 981px) {
  .my-btn {
    width: 10% !important;
  }
  .detail {
    width: 45% !important;
  }
}
@media screen and (max-width: 1510px) and (min-width: 1150px) {
  .server-content {
    width: 80% !important;
  }
}
@media screen and (max-width: 1149px) {
  .server-content {
    width: 100% !important;
  }
}
@media screen and (max-width: 910px) {
  .server-title {
    font-size: 32px !important;
  }
  ul li .main-title {
    font-size: 1.1rem !important;
  }
}
@media screen and (max-width: 982px) and (min-width: 849px) {
  .loves {
    font-size: 2rem !important;
  }
  .detail {
    width: 70% !important;
  }
  .my-btn {
    width: 10%;
  }
}

@media screen and (max-width: 850px) and (min-width: 741px) {
  .detail {
    display: none;
  }
  .welcome {
    font-size: 1.6rem;
  }
  .loves {
    font-size: 2rem !important;
  }
  .my-btn {
    width: 14%;
  }
  .fixed {
    position: static !important;
  }
}
@media screen and (max-width: 740px) {
  .loves {
    font-size: 1.5rem !important;
  }
  .detail {
    display: none;
  }
  .welcome {
    font-size: 1.6rem;
  }
  .my-btn {
    width: 18%;
  }
}
@media screen and (max-width: 580px) {
  .welcome {
    font-size: 1rem;
  }
  .loves {
    display: none;
  }
  .my-btn {
    width: 18%;
  }
}
@media screen and (max-width: 450px) {
  .welcome {
    font-size: 0.9rem !important;
  }
  .my-btn {
    height: 50%;
  }
}
@media screen and (max-width: 320px) {
  .out-phone {
    width: 80% !important;
    height: 500px !important;
  }
}
.slider {
  width: 100%;
  height: auto;
  float: left;
  margin-top: -28.5%;
  margin-left: 17.5%;
}
@keyframes welcomeAnimate {
  0% {
    transform: translate(900px, -2000px);
    opacity: 0;
  }
  40% {
    transform: translate(200px, -1000px);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
.welcome {
  font-size: 1.8rem;
  font-family: "mv boli";
  margin-bottom: 2px;
  animation: welcomeAnimate 1s ease 1;
  animation-fill-mode: forwards;
}
@keyframes loveAnimate {
  0% {
    transform: translateX(2000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.loves {
  font-size: 2.5rem;
  font-weight: bold;
  color: #535353;
  margin-bottom: 10px;

  animation: loveAnimate 1s ease 1;
  animation-fill-mode: forwards;
}

@keyframes detailAnimate {
  0% {
    transform: translateX(2000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.detail {
  width: 29.1%;
  font-size: 0.7rem;
  color: #757575;

  animation: detailAnimate 1.5s ease 1;
  animation-fill-mode: forwards;
}
.row {
  padding: 0;
  margin: 0;
}
.sub-title {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes navAnimate {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
.fixed {
  position: fixed;
  z-index: 10000;
  background-color: #f5f5f5;
  width: 100%;
  top: -0px;
  animation: navAnimate 2s ease 1;
}
.server-img {
  margin-top: 4%;
  margin-bottom: 2%;
}
@keyframes upAnimate {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
.server-title {
  font-size: 40px;
}
ul {
  list-style: none;
}
ul li .main-title {
  font-size: 1.3rem;
}
.img {
  width: 40px;
  height: 40px;
  float: left;
  margin-right: 5%;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.out-phone {
  width: 346px;
  height: 708px;
  background: url("http://127.0.0.1:5050/img/phone.png") no-repeat center center;
  background-size: 100%;
}
.phone {
  width: 90%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-left: 5%;
  transition: all 0.5s;
}
.server-title {
  margin-top: 5%;
  margin-bottom: 14%;
  padding: 0;
}
.server-list li {
  display: block;
  margin-bottom: 5.5%;
}
.main-title_hover {
  transition: transform 0.5s, transform-origin 0.5s;
  transform: scale(1.5);
  transform-origin: 10% 70%;
  color: #e54c2a;
}
.main-title_out {
  transition: transform 0.5s, transform-origin 0.5s;
  transform-origin: 10% 50%;
  color: #333;
}
.server-content {
  margin: 0 auto;
  width: 60%;
}
.server-left {
  padding-left: 4%;
}
.carousel {
  z-index: 0;
}
.carousel-control-prev,
.carousel-control-next {
  width: 2%;
  height: 10%;
  top: 40%;
}
.carousel-indicators .active {
  margin: 0;
  background-color: #e54c2a;
}
.main-title + div {
  border-top: 3px solid transparent;
  width: 20%;
  margin-left: 13%;
}

#demo {
  width: 100%;
}
.carousel-item img {
  width: 100%;
}
.header {
  position: fixed;
}
.addAnimate {
  opacity: 1;
  animation: upAnimate 2s ease 1 forwards;
}
.subTitle {
  color: #e54c2a;
  border-top-color: #e54c2a;
}
</style>
