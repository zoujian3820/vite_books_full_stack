<template>
    <div class="login">
        <div class="avatar">
            <img class="pic" :src="getImg('avatar_man.png')">
        </div>
        <div class="username">
            <input type="text" v-model="username" name="username" placeholder="昵称、手机号、邮箱" class="username-input" />
        </div>
        <div class="psw">
            <input type="password" v-model="password" name="psw" placeholder="密码" class="psw-input" />
        </div>
        <div class="psw captcha-box">
            <input type="text" v-model="captchaCode" name="captcha" placeholder="验证码" class="psw-input" />
            <div class="captcha" @click="getCaptcha" v-html="storeCaptcha.img"></div>
        </div>

        <div class="loginbtn" @click="login">登录</div>
        <div class="loginbtn register" @click="register">去注册</div>
    </div>
</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtil'
import loginService from './service/loginService';
import router from '@/router';
const { login, username, password, getCaptcha, captchaCode } = loginService
const { storeCaptcha } = loginService.storeToRefs

getCaptcha()

function register() {
    // router.replace('/register')
    router.push('/register')
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.login {
    @include wh(100%, 100vh);
    @include flex-box(center, center, column);
    gap: 0.15rem;

    .avatar {
        @include wh(1.22rem, 1.22rem);
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 0.2rem;
        background-color: #f6f6f6;
        border: 0.02rem solid #f6f6f6;
        box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.1);
        background: #f6f6f6 url('@/assets/img/user/avatar_man.png') no-repeat center;
        background-size: 100%;

        .pic {
            @include wh(100%, 100%);
        }
    }

    .username,
    .psw {
        @include wh(4.23rem, 0.7rem);
        line-height: 0.7rem;
        background-color: #f6f6f6;
        border-radius: 1rem;

        &-input {
            @include wh(2rem, 60%);
            border: none;
            background: none;
            font-size: 0.2rem;
            margin-left: 0.3rem;
            color: #333;
        }
    }

    .captcha-box {
        position: relative;
        background-color: #fff;

        .psw-input {
            @include wh(2.5rem, 0.7rem);
            background-color: #f6f6f6;
            border-radius: 1rem;
            margin-left: 0;
            text-indent: 0.3rem
        }

        .captcha {
            @include wh(1.4rem, 0.7rem);
            padding-left: 0.2rem;
            position: absolute;
            left: 2.5rem;
            top: 0;
            z-index: 1;
            background-color: #fff;
            @include flex-box(center, center);

            ::v-deep svg {
                width: 100%
            }
        }
    }

    .loginbtn {
        @include wh(2rem, 0.6rem);
        background-color: #f3655e;
        @include flex-box(center, center);
        box-sizing: border-box;
        border-radius: 1rem;
        font-size: 0.22rem;
        color: #fff;
        margin-top: 0.2rem;
    }

    .register {
        background-color: #fff;
        color: #f3655e;
        border: 0.02rem solid #f3655e;
        box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.1);
        margin-top: 0.1rem;
    }
}
</style>