<template>
    <div class="bookitem" ref="bookitemRef" v-for="item of bookList" :key="item.ISBN">
        <img @click="bookDetail(item.ISBN)" :src="getImg(item.bookpicname)" alt="" class="book-pic">
        <div class="bookinfo">
            <div @click="bookDetail(item.ISBN)" class="bookinfo-brief">
                <div class="book-name">{{ item.bookname }}</div>
                <div class="book-author-publs">
                    <span class="author spacing">{{ item.author }}</span>
                    <span class="separator spacing">|</span>
                    <span class="publs spacing">{{ item.publishername }}</span>
                </div>
            </div>
            <div @click="bookDetail(item.ISBN)" class="bookinfo-other">
                <div class="price">
                    <span class="discountprice spacing">
                        <span class="symbol">&yen;</span>
                        {{ item.discountprice }}
                    </span>
                    <span class="originprice spacing">&yen;{{ item.originalprice }}</span>
                    <span class="discount">{{ item.discount }}折</span>
                </div>
                <div class="give">
                    <span class="self-support">自营</span>
                    <span class="coupons">券</span>
                    <span class="free-shipping">包邮</span>
                </div>
                <div class="monthsalescount">
                    <span>月售{{ item.monthsalecount }}</span>
                </div>
                <div class="ranklist">
                    <span>图书畅销总排行榜第1名</span>
                </div>
                <!-- <addsubtrsc :bookitem="item" /> -->
            </div>
            <addsubtrsc :bookitem="item" />
        </div>
        <div class="empty" v-show="false">库存所有书已经售完</div>
    </div>
</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtil'
import books from '../service'
import addsubtrsc from './addsubtrsc.vue';

const { /*findBooksByThirdCtgyId,*/ storeRefs, bookDetail } = books
// findBooksByThirdCtgyId()
const { bookList } = storeRefs

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.bookitem {
    margin-top: 0.2rem;
    display: grid;
    grid-template-columns: 2.3rem 2.7rem;
    // 控制网格布局子元素都靠右对齐
    // justify-items: flex-end;
    justify-items: center;
    row-gap: 0.1rem;

    &:last-child {
        margin-bottom: 0.8rem;
    }

    .book-pic {
        width: 1.8rem;
        max-width: 100%;
        height: 2.2rem;
        object-fit: contain;
        // 控制当前元素靠左对齐
        justify-self: flex-start;
    }

    .bookinfo {
        width: 2.7rem;
        display: grid;
        grid-template-columns: 2.7rem;
        gap: 0.15rem;

        &-brief {
            width: 100%;
            line-height: 0.35rem;

            .book-name {
                font-size: 0.25rem;
                color: #4c4c4c;
                @include clamp(2);
            }

            .book-author-publs {
                color: #848484;
                @include text-overflow;

                .spacing {
                    margin-right: 0.09rem;
                }
            }
        }

        &-other {
            line-height: 0.36rem;

            .price {
                display: flex;

                .spacing {
                    margin-right: 0.09rem;
                }

                .discountprice {
                    font-size: 0.27rem;
                    color: #e94039;

                    .symbol {
                        font-size: 0.22rem;
                    }
                }

                .originprice,
                .discount {
                    color: #c6c6c6;
                    font-size: 0.2rem;
                }

                .originprice {
                    text-decoration: line-through;
                }
            }

            .give {
                display: flex;
                line-height: 0.2rem;
                justify-content: flex-start;
                gap: 0.05rem;
                font-size: 0.15rem;

                .coupons,
                .free-shipping,
                .self-support {
                    @include flex-box(center, center);
                    padding: 0 0.15rem;
                    border-radius: 0.05rem;
                    border: 1px solid #d06d70;
                    background-color: #fff;
                    text-shadow: 0 0.005rem #d06d70;
                    color: #7f7f7f;
                }

                .self-support {
                    border: none;
                    text-shadow: 0 0.005rem #f7f7f7;
                    background-color: #eb636d;
                    color: white;
                }
            }

            .monthsalescount,
            .ranklist {
                color: #db8441;
                font-size: 0.2rem;
                padding: 0 0.04rem;
            }

            .ranklist {
                background-color: #fef3ed;
                width: 2.5rem;
                text-indent: 0.04rem;
            }
        }
    }
}
</style>