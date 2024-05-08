<template>
    <div class="login">
        <div class="avatar">
            <img class="pic" :src="getImg('avatar_man.png')">
        </div>
        <div class="username">
            <input type="text" v-model.trim="username" name="username" placeholder="昵称、手机号、邮箱" class="username-input" />
        </div>
        <div class="psw">
            <input type="password" v-model.trim="password" name="psw" placeholder="输入密码" class="psw-input" />
        </div>
        <div class="psw">
            <input type="password" v-model.trim="password2" name="psw2" placeholder="再次输入密码" class="psw-input" />
        </div>
        <div class="loginbtn" @click="register">注册</div>
    </div>
</template>

<script setup lang="ts">
import { showNotify } from 'vant'
import getImg from '@/utils/imgUtil'
import loginService from './service/loginService';
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const password2 = ref('')

const { registeredUsers } = loginService
function register() {
    if (!username.value) return showNotify({
        type: 'warning',
        message: '请输入用户名'
    })
    if (!password.value || !password2.value) return showNotify({
        type: 'warning',
        message: '请完善密码'
    })
    if (password.value !== password2.value) return showNotify({
        type: 'warning',
        message: '两次密码输入不一致'
    })
    if (password.value.length < 4) return showNotify({
        type: 'warning',
        message: '密码不能小于4位数'
    })
    registeredUsers(username.value, password.value)
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
            @include wh(85%, 60%);
            border: none;
            background: none;
            font-size: 0.2rem;
            margin-left: 0.3rem;
            color: #333;
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