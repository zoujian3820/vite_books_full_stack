<template>
    <toSearch />
    <div class="adv">
        <img :src="getImg('1.png')" alt="">
    </div>
    <div class="bookctgys">
        <breadcrumbs />
        <thrdctgys />
        <booksort />
        <bookitem />
    </div>

</template>

<script setup lang="ts">
import getImg from '@/utils/imgUtil'
import toSearch from './components/toSearch.vue';
import breadcrumbs from './components/breadcrumbs.vue';
import thrdctgys from './components/thrdctgys.vue';
import bookitem from './components/bookitem.vue';
import booksort from './components/booksort.vue';

import books from './service'
import FstToThrCtgy from '@/piniaviews/ctgy/service';
import { thirdAllCtgy } from '@/piniastore/ctgy'
import { useRoute } from 'vue-router';
const { query: { thirdctgyid, secondctgyid } } = useRoute()

// 持久化搜索数据
FstToThrCtgy.persistentBookSearchData()

if (secondctgyid && thirdctgyid) {
    const scid = Number(secondctgyid)
    const tcid = Number(thirdctgyid)

    thirdAllCtgy.thirdctgyid == tcid
        ? books.findAllBooksByScId(scid)
        : books.findBooksByThirdCtgyId(tcid)
}

</script>
<style lang="scss" scoped>
.adv {
    position: absolute;
    top: 0.86rem;
    top: 1.215rem;
    margin: 0 0.18rem 0.18rem;
    width: 5.04rem;
    height: 1.62rem;

    img {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
        object-fit: cover;
    }
}

.bookctgys {
    position: absolute;
    top: 2.875rem;
    width: 5.04rem;
    margin: 0.18rem;
}
</style>