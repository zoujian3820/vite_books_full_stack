<template>
    <div v-if="evalRplLst.length > 0" class="evaluate-list" ref="evalLstRef">
        <div class="evaluate-item" v-for="(item, index) of evalRplLst" :key="item.evaluateid">
            <div class="evaluate-item-user">
                <span class="img-wrapper">
                    <img :src="getImg(item.headportrai)" alt="">
                </span>
                <span>{{ item.isanonymous ? '匿名用户' : item.evaluator }}</span>
                <span class="givealike">
                    <i class="iconfont icon-dianzan zans-icon" :class="{ 'icon-dianzan1': item.givealikenum > 0 }"></i>
                    {{ item.givealikenum || 0 }}
                </span>
            </div>
            <div class="evaluate-item-start">
                <span class="icon">
                    <i class="starticon iconfont icon-wuxinghaoping-quan"
                        :class="{ 'active': i <= convertRatingToStar(item.evaluatedegree) }" v-for="i in 5" :key="i" />
                </span>
                <span class="line">|</span>
                <span class="star-score">{{ convertScore(item.evaluatedegree) }}分</span>
            </div>
            <div class="evaluate-item-content">
                {{ item.content }}
                <div class="reply-action">
                    <span class="date">{{ formatDate(String(item.pubdate)) }}</span>
                    <span class="reply-to-evaluate">
                        <span class="replyinfo">
                            <span v-show="cancelRplShowIndx === -1" class="reply"
                                @click="reply($event, index)">回复</span>
                            <i v-show="cancelRplShowIndx === -1" class="iconfont icon-xiaoxi xiaoxiicon" />
                            <span v-show="cancelRplShowIndx === index" class="cancelreply"
                                @click="cancelReply($event)">取消回复</span>
                        </span>
                        <div class="reply-panel">
                            <div class="overlay-before" ref=overlayEle></div>
                            <div class="publish_area">
                                <textarea v-model="replycontent" :placeholder="'回复' + item.evaluator" id="" cols="30"
                                    rows="10" class="reply-content"></textarea>
                                <span class="publish" :class="{ active: !isEmptyRpct }"
                                    @click="addReply($event, item.evaluateid)">发表</span>
                            </div>
                            <div class="overlay-after"></div>
                        </div>
                    </span>
                </div>

                <div class="replylst">
                    <div class="reply" v-for="(reply) of showReplyLst(item.replyLst, endRplLstIndex)"
                        :key="reply.replyid">
                        <span class="replyor">{{ reply.replyor }}：</span>
                        <span class="reply-content">{{ reply.replycontent }}</span>
                    </div>
                    <div class="allreply">
                        <span v-if="item.replyLst.length === 0">暂无回复</span>
                        <span v-if="item.replyLst.length > endRplLstIndex" @click="foldRplLst(item.replyLst)">
                            展开{{ item.replyLst.length - endRplLstIndex }}条回复
                        </span>
                    </div>
                    <div v-if="item.replyLst.length === endRplLstIndex" class="retract" @click="collapsRplLst">
                        收起 <i class="iconfont icon-youjiantou"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="evaluate-list">
        <div class="noevaluate">暂无评价</div>
    </div>
</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtil';
import { EvaluateService } from '@/piniaviews/bookdetail/service/bookdetailService';
import ReplyService from '@/piniaviews/bookdetail/service/replyService';
const { endRplLstIndex, showReplyLst, foldRplLst, collapsRplLst, addReply, replycontent } = ReplyService
// import { getCurrentInstance } from 'vue';
import dayjs from 'dayjs'
import { computed } from 'vue';
const { evalRplLst, convertRatingToStar, convertScore, reply, cancelReply, cancelRplShowIndx, evalLstRef } = EvaluateService
// getCurrentInstance
// const app = getCurrentInstance()
// const { $dayjs } = app!.appContext.config.globalProperties
function formatDate(date: string) {
    // return $dayjs(date).format('YYYY-MM-DD')
    return dayjs(date).format('YYYY-MM-DD')
}

const isEmptyRpct = computed(() => !replycontent.value.trim())

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.evaluate-list {
    width: 4.6rem;
    display: grid;
    gap: 0.5rem;

    .evaluate-item {
        width: 100%;
        display: grid;
        gap: 0.25rem;
        background-color: #fff;

        &-user {
            @include flex-box(flex-start, center);
            gap: 0.2rem;
            font-size: 0.2rem;

            .img-wrapper {
                @include wh(0.55rem, 0.55rem);

                img {
                    @include wh(100%, 100%);
                    object-fit: contain;
                }
            }
        }

        &-start {
            @include flex-box(flex-start, center);
            gap: 0.1rem;
            line-height: 0.35rem;
            font-size: 0.2rem;

            .icon {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 0.04rem;

                .starticon {
                    font-size: 0.22rem;
                    color: #ccc;
                }

                .active {
                    color: #d8596c;
                }
            }

            .line {
                color: #666;
            }

            .star-score {
                color: #d8596c;
            }
        }

        &-content {
            font-size: 0.2rem;
            text-shadow: 0 0 0.01rem gray;

            .reply-action {
                @include flex-box(flex-start, center);
                color: #999;
                margin-top: 0.12rem;
                font-size: 0.18rem;

                .reply-to-evaluate {
                    flex: 1;
                    text-align: right;
                    position: relative;

                    .xiaoxiicon {
                        position: relative;
                        font-size: 100%;
                    }

                    .reply {
                        margin-right: 0.1rem;
                    }

                    .cancelreply {}

                    .reply-panel {
                        display: none;
                    }

                    .reply-panel-show {
                        display: block;
                        position: absolute;
                        top: 0.3rem;
                        right: 0;
                        z-index: 999;
                        height: 2.2rem;
                        width: 4.8rem;
                        background-color: #fff;

                        .publish_area {
                            display: flex;
                            align-items: center;
                            padding: 0 0.15rem;
                            @include wh(4.5rem, 100%);
                            gap: 0.1rem;

                            .reply-content {
                                flex: 1;
                                height: 80%;
                                width: 4rem;
                                padding: 0.15rem 0.15rem;
                                background-color: #f1f1f1;
                                resize: none;
                                border: none;
                                color: #333;
                                border-radius: 0.1rem;
                            }

                            .publish {
                                width: 0.5rem;
                                flex-basis: 0.5rem;
                                text-align: center;
                                color: #999;

                                &.active {
                                    color: #d8596c;
                                }
                            }
                        }
                    }

                    .overlay-before {
                        position: absolute;
                        top: -6rem;
                        width: 5rem;
                        height: 4rem;
                        background-color: #fff;
                        opacity: 0.6;
                    }

                    .overlay-after {
                        position: absolute;
                        top: 2.1rem;
                        width: 5rem;
                        height: 60vh;
                        background-color: #fff;
                        opacity: 0.6;
                    }
                }
            }

            .replylst {
                font-size: 0.2rem;
                margin-top: 0.2rem;
                line-height: 0.5rem;
                width: 4.6rem;
                background-color: #f6f6f6;
                padding: 0 0.15rem 0 0.16rem;
                box-sizing: border-box;
                border-radius: 0.1rem;

                .reply {
                    .replyor {
                        color: #526198;
                    }

                    &-content {
                        font-family: '楷体';
                    }
                }

                .allreply,
                .retract {
                    @include flex-box(flex-start, center);
                    font-size: 0.18rem;
                    color: #666;

                    .iconfont {
                        font-size: 0.16rem;
                        line-height: 1;
                    }
                }
            }
        }
    }
}

.evaluate-list {
    &::after {
        display: block;
        content: '';
        height: 1rem;
    }

    .noevaluate {
        margin-top: 0.5rem;
        font-size: 0.2rem;
        color: #888;
        text-align: center;
    }

}
</style>