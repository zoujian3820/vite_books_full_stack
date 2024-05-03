<template>
    <div class="search">
        <vheader title="搜索" />
        <div class="search-keyword">
            <div class="search-keyword-wrapper">
                <i class="iconfont icon-fangdajing fangdajing"></i>
                <input type="text" class="search-keyword-input" v-model="keyword" @focus="resetKeyword"
                    @blur="closeKeywords" @keyup="searchKeywords" placeholder="输入搜索内容">
            </div>
            <span class="searchbtn">搜索</span>
        </div>
        <div class="autocomplete" v-show="isOpenAutoComplete">
            <template v-if="keywordList && keywordList.length > 0">
                <div class="autocomplete-item" @touchstart="searchBooksByKey(item.keyword)" v-for="item of keywordList"
                    :key="item.keywordid">
                    <span class="keyword">{{ item.keyword }}</span>
                </div>
            </template>
            <div v-else class="autocomplete-empty">
                <div class="icon-tip"><i class="iconfont icon-weisousuodaoneirong emptyicon" /></div>
                <div class="text">未搜索到相关图书</div>
            </div>
        </div>
        <searchHistory @del="ondelHistoryKwd" @tapitem="ontapHistoryitem" title="搜索历史"
            :keywords="getHistoryKeywordList" />
        <searchHistory @del="ondelDecoveryKwd" @tapitem="ontapDecoveryitem" style="margin-top: 0.2rem;" title="搜索发现"
            :keywordobjlist="getHistoryKeywordObjList" />
    </div>
</template>

<script setup lang="ts">
import vheader from '@/components/vheader.vue';
import searchHistory from './components/searchHistory.vue';
import SearchService from './service';
const {
    init, isOpenAutoComplete, searchKeywords, closeKeywords, resetKeyword, searchBooksByKey,
    ondelHistoryKwd, ondelDecoveryKwd, ontapHistoryitem, ontapDecoveryitem
} = SearchService
const { keyword, keywordList, getHistoryKeywordList, getHistoryKeywordObjList } = SearchService.storeRefs

// 获取搜索历史关键字 前6条热搜关键字 初始数据
init()
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixins.scss';

.search {
    width: 5.4rem;

    &-keyword {
        @include flex-box(flex-start, center);
        @include wh(5.14rem, 0.75rem);
        margin: 0 0.13rem;
        gap: 0.2rem;

        &-wrapper {
            @include flex-box(flex-start, center);
            flex: 1;
            height: 0.5rem;
            background-color: #f6f6f6;
            border-radius: 1rem;
            font-size: 0.22rem;

            .fangdajing {
                margin: 0 0.12rem 0 0.23rem;
                font-size: 0.26rem;
            }

            .search-keyword-input {
                background: none;
                border: none;
                height: 0.5rem;
                flex: 1;
                font-size: 0.2rem;
                color: #555;
            }
        }

        .searchbtn {
            @include wh(0.5rem, 100%);
            @include flex-box(center, center);
            font-weight: bolder;
            font-size: 0.2rem;
        }
    }

    .autocomplete {
        position: fixed;
        @include wh(5.4rem, calc(100% - 0.85rem));
        background-color: #fff;

        &-item {
            @include flex-box(flex-start, center);
            height: 0.5rem;
            border-bottom: 1px solid #f4f4f4;
            padding: 0 0.15rem;

            .keyword {
                font-size: 0.17rem;
                @include clamp(1);
            }
        }

        &-empty {
            text-align: center;
            margin-top: 0.7rem;

            .icon-tip .emptyicon {
                font-size: 1.3rem;
                color: #666;
            }

            .text {
                margin-top: 0.16rem;
                font-size: 0.2rem;
                color: #666;
            }
        }
    }
}
</style>