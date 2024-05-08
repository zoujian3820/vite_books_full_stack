<template>
    <div class="header">
        <h1 class="header-title">知书网</h1>
        <div class="header-content">
            <div class="header-searchandsort">
                <div class="header-search">
                    <i class="iconfont icon-fangdajing fangdajing"></i>
                    <input type="text" @click="$router.push('/search')" readonly placeholder="输入搜索内容"
                        class="header-search-input" />
                </div>
                <div class="header-sort">
                    <i class="iconfont icon-fenlei1 fenlei"></i>
                    <span class="sort-text">分类</span>
                </div>
            </div>
            <div class="header-adv-img">
                <img class="imgadv" src="@/assets/img/adv.png" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.header {
    background-color: #fff;
    font-size: 0.22rem;

    &-title {
        line-height: 0.5rem;
        text-align: center;
    }

    &-content {
        height: 2.4rem;
        width: 100%;
        background-image: linear-gradient(#06086c, #04086c, #e7e7ef);

        .header-searchandsort {
            display: flex;
            align-items: center;
            height: 0.58rem;
            gap: 0.2rem;

            .header-search {
                margin-top: 0.15rem;
                margin-left: 0.1rem;
                flex: 1;
                height: 100%;
                background-color: #fff;
                border-radius: 1rem;
                display: flex;
                gap: 0.1rem;
                align-items: center;

                &-input {
                    border: none;
                    background: none;
                    width: 80%;
                }

                .fangdajing {
                    margin-left: 0.2rem;
                    font-size: 0.3rem;
                }
            }

            .header-sort {
                width: 1rem;
                display: flex;
                align-items: center;
                gap: 0.05rem;
                margin-top: 0.1rem;

                .fenlei {
                    color: #fff;
                    font-size: 0.36rem;
                }

                .sort-text {
                    color: #fff;
                }
            }
        }

        .header-adv-img {
            margin-top: 0.15rem;
            width: 5.15rem;
            height: 1.7rem;
            display: flex;
            justify-content: center;

            .imgadv {
                width: 98%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
}
</style>
