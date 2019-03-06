<template>
  <div>
    <my-header :toggleFixed="isFixed"></my-header>
    <div class="container-fluid">
      <div class="main_img">
        <div class="carousel" data-ride="carousel" id="demo">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="baseUrl+'/img/slider/1.jpg'" class="img-fluid" alt>
            </div>
            <div class="carousel-item">
              <img :src="baseUrl+'/img/slider/2.jpg'" class="img-fluid" alt>
            </div>
            <div class="carousel-item">
              <img :src="baseUrl+'/img/slider/3.jpg'" class="img-fluid" alt>
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
          <button type="button" class="btn btn-warning my-btn" @click="regist">我要入驻</button>
        </div>
      </div>

      <div class="server">
        <div class="sub-title">
          <img
            :src="baseUrl+'/img/server.png'"
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
            <div class="out-phone"  :style="`background-image:url(${baseUrl}/img/phone.png)`">
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
      baseUrl: this.$store.getters.getBaseUrl,
      isFixed: false,
      isAddAnimate: false,
      server_type: [
        {
          id: 0,
          main: "美食 Delicacy",
          sub: "大牌优惠",
          beforeImg: `${this.$store.getters.getBaseUrl}/img/small_img/Delicacy-nopick.png`,
          afterImg: `${this.$store.getters.getBaseUrl}/img/small_img/Delicacy-picked.png`,
          phoneImg: `${this.$store.getters.getBaseUrl}/img/phone/delicacy.png`,
          ismouse: true
        },
        {
          id: 1,
          main: "甜点饮品 Desserts&Drinks",
          sub: "幸福甜蜜",
          beforeImg: `${this.$store.getters.getBaseUrl}/img/small_img/Desserts-nopick.png`,
          afterImg: `${this.$store.getters.getBaseUrl}/img/small_img/Desserts-picked.png`,
          phoneImg: `${this.$store.getters.getBaseUrl}/img/phone/desserts.png`,
          ismouse: false
        },
        {
          id: 2,
          main: "水果生鲜 Fresh food",
          sub: "新鲜速达",
          ismouse: false,
          beforeImg:
            `${this.$store.getters.getBaseUrl}/img/small_img/Supermarket-nopick.png`,
          afterImg:
            `${this.$store.getters.getBaseUrl}/img/small_img/Supermarket-picked.png`,
          phoneImg: `${this.$store.getters.getBaseUrl}/img/phone/fresh.png`
        },
        {
          id: 3,
          main: "超市便利 Supermarket",
          sub: "优惠促销",
          ismouse: false,
          beforeImg: `${this.$store.getters.getBaseUrl}/img/small_img/fruit-nopick.png`,
          afterImg: `${this.$store.getters.getBaseUrl}/img/small_img/fruit-picked.png`,
          phoneImg: `${this.$store.getters.getBaseUrl}/img/phone/supermarket.png`
        }
      ],
      index: 0
    };
  },
  mounted() {
    
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    regist() {
      this.$router.push(`/register`);
    },
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
<style lang="css" scoped>
    @import '../assets/css/index.css'
</style>
