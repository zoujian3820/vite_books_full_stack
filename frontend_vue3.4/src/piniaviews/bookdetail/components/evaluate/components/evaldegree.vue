<template>
    <div class="evaldegree" v-show="headAndDegree">
        <div class="evaldegree-wrapper">
            <div class="more">
                <Button color="#d8596c" class="all evaluate" @click="showAllEvalRplLst">合部</Button>
                <Button color="#d8596c" class="newest evaluate">最新</Button>
                <Button color="#d8596c" class="figure-video evaluate">图/视频</Button>
            </div>
            <div class="ratings">
                <Button color="#d8596c" class="goodEvals evaluate" @click="showGoodEvalRplLst">
                    好评 (<strong>{{ goodEvalNums }}</strong>)
                </Button>
                <Button color="#d8596c" class="mediumEvals evaluate" @click="showMediumEvalRplLst">
                    中评 (<strong>{{ mediumEvalsNums }}</strong>)
                </Button>
                <Button color="#d8596c" class="negativeEvals evaluate" @click="showNegativeEvalRplLst">
                    差评 (<strong>{{ negativeEvalsNums }}</strong>)
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from 'vant'
import { EvaluateService } from '@/piniaviews/bookdetail/service/bookdetailService';
const {
    goodEvalNums,
    mediumEvalsNums,
    negativeEvalsNums,
    showGoodEvalRplLst,
    showMediumEvalRplLst,
    showNegativeEvalRplLst,
    showAllEvalRplLst
} = EvaluateService
const { headAndDegree } = EvaluateService.storeRefs

</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.evaldegree {
    margin-top: 0.3rem;
    @include flex-box(center, flex-start);
    width: 4.6rem;
    margin-bottom: 0.3rem;

    &-wrapper {

        .more,
        .ratings {
            @include flex-box(center, center);
            gap: 0.3rem;
            line-height: 0.35rem;
            font-size: 0.2rem;

            .evaluate {
                // background-color: #fef2f6;
                border-radius: 0.08rem;
                // padding: 0.06rem 0.17rem;
                font-size: 100%;
            }
        }

        .more {
            margin-bottom: 0.2rem;
        }

    }
}
</style>