<template>
    <div class="container-fluid">
        <div class="login">
            <section>
                <div class="logo">
                    <img :src="baseUrl+'/img/login-logo.png'" alt="" class="">
                </div>
                <div class="input-group mb-3 phone-div">
                    <input type="text" class="form-control phone-number" placeholder="手机号" maxlength="11" v-model="phone">
                    <!-- <input type="hidden" id="codeFromUser" v-model="code"> -->
                    <div class="input-group-append get-code">
                        <span id="validate_code" :class="{'input-group-text':true,getcode:codeStyle}" @click="getCode">{{code_span}}</span>
                    </div>
                </div>
                <div class="input-group mb-3 phone-div">
                    <input type="text" class="form-control phone-number" placeholder="验证码" id="code" v-model="pwd"
                        :disabled="isDisabled">
                </div>
                <p>
                    新用户登录即自动注册，并表示已同意<a href="#">《用户服务协议》</a>
                </p>
                <button class="btn form-control" @click="login()">登录</button>
            </section>
        </div>
    <my-footer></my-footer>

    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                phone: '',
                pwd: '',
                codeStyle: false,
                code: '',
                code_span: '获取验证码',
                time: 60,
                isDisabled: true,
                baseUrl: this.$store.getters.getBaseUrl,
            }
        },
        watch: {
            phone(val) {
                if (val.length == 11) {
                    var reg = /^[1][3|4|5|7|8]\d{9}$/g;
                    if (reg.test(val)) {
                        this.codeStyle = true;
                    } else {
                        this.codeStyle = false;
                    }
                }
            }
        },
        created() {
            
        },
        methods: {
            getCode() {
                if (this.codeStyle) {
                    $.ajax({
                        url: `${this.baseUrl}/user/getVCode`,
                        type: 'post',
                        data: {
                            phone: this.phone
                        },
                        dataType: 'json'
                    }).then((data) => {
                        if (data.code == 200) {
                            console.log('验证码发送成功!');
                            this.code = data.vcode;
                            this.startTime();
                            this.isDisabled = false;
                        } else {
                            console.log('验证码发送失败！');
                        }
                        this.codeStyle = false;
                    })
                }
            },
            startTime() {
                var timer = setInterval(() => {
                    this.code_span = `已发送${this.time}`;
                    this.time--;
                }, 1000)
                setTimeout(() => {
                    clearInterval(timer);
                    this.codeStyle = true;
                    this.code_span = '重新发送';
                    this.isDisabled = true;
                }, 30000)
            },
            login() {
                var url = `${this.baseUrl}/user/login`;
                var data = qs.stringify({phone: this.phone, user_code: this.code, code: this.pwd});
                this.axios.post(url, data).then(result => {
                    localStorage.setItem('user',this.phone);
                    this.$router.push('/UserIndex');
                })
            }
        },
    }
</script>
<style lang="css" scoped>
    @import '../assets/css/userLogin.css'
</style>