<template>
    <div class="content">
        <div class="tosearch">
            <i class="iconfont icon-fangdajing" />
            <div class="tosearch-keyword">
                <input type="text" placeholder="输入搜索内容" class="tosearch-keyword-input">
                <i class="iconfont icon-saomiao" />
            </div>
        </div>
        <div class="message">
            <span class="message-news">9</span>
            <i class="iconfont icon-xiaoxi2"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';

.content {
    @extend .multiplex-content;

    .tosearch {
        @extend .multiplex-tosearch;

        .icon-fangdajing {
            font-size: 0.31rem;
            margin: 0 0.2rem;
        }

        &-keyword {
            width: 3.5rem;
            height: 0.65rem;
            display: flex;
            align-items: center;
            // 子元素之间 间隙为0.2rem
            gap: 0.2rem;

            &-input {
                height: 0.4rem;
                width: 2.74rem;
                background: none;
                border: none;
                font-size: 0.2rem;
            }

            .icon-saomiao {
                font-size: 0.32rem;
            }
        }

    }

    .message {
        width: 0.76rem;
        position: relative;

        &-news {
            background-color: #fe463c;
            font-size: 0.15rem;
            color: #fff;
            padding: 0.01rem 0.06rem;
            border-radius: 0.15rem;
            position: absolute;
            right: 0.19rem;
            top: -0.04rem;
            transform: translateX(45%);
        }

        .icon-xiaoxi2 {
            font-size: 0.37rem;
        }
    }
}
</style>