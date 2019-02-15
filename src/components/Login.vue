<template>
    <div class="container-fluid">
        <div class="login">
            <section>
                <div class="logo">
                    <img src="http://127.0.0.1:5050/img/login-logo.png" alt="" class="">
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
                time: 30,
                isDisabled: true,
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
                        url: 'http://127.0.0.1:5050/user/getVCode',
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
                var url = 'http://127.0.0.1:5050/user/login';
                var data = qs.stringify({phone: this.phone, user_code: this.code, code: this.pwd});
                this.axios.post(url, data).then(result => {
                    // console.log(result.data)
                    this.$router.push('/UserIndex')

                })
            }
        },

    }
</script>
<style scoped>
    .container-fluid {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .login {
        width: 300px;
        height: 86%;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }

    .logo {
        text-align: center;
        width: 100%;
        height: auto;
        margin-bottom: 5%;
        /* border: 1px solid #000; */
    }

    .input-group {
        width: 100%;
        height: 14%;
    }

    .input-group-text {
        background-color: #fff;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .get-code {
        position: absolute;
        right: 5px;
        z-index: 100;
        top: 30%;
    }

    .get-code span {
        color: #ccc;
    }

    .font-color {
        color: #e8694c;
    }

    .phone-number {
        height: 44px;
    }

    .btn {
        background: #e54c2a;
        color: #fff;
        /* height: 13%; */
    }

    section {
        width: 100%;
        height: 40%;
        padding-top: 50%;
        padding-bottom: 37%;
    }

    section p {
        margin-bottom: 8%;
        color: #999;
    }

    section a {
        text-decoration: none !important;
        color: #e8694c;
    }

    a:hover {
        text-decoration: none;
    }

    .choose_login {
        margin-bottom: 2% !important;
        text-align: right;
        color: #999 !important;
        width: 100%;
        display: inline-block;
    }

    .choose_login i {
        color: #e8694c;
    }

    .choose_login:hover {
        color: #999;
    }

    .getcode {
        color: #e54c2a !important;
    }
</style>