<template>
    <div>
         <Tabs active-key="key1" type="card">
        <Tab-pane label="我的书架" key="key1">
            <ul class="books" v-if="!books">
                <li v-for="ind in 5">
                    <img src="https://bookcover.yuewen.com/qdbimg/349573/1014179752/180" alt="">
                  <p>　2020年全世界第一款虚拟游戏《创世》发售，却在公测当天因发生大规模玩家猝死事故而惨遭停服。</p>
                  <h2><router-link to>伏天氏</router-link> </h2>
                </li>
            </ul>
            <ul class="books" v-if="books">
                <li v-for="(item,ind) in books">
                    <router-link :to="{path:'/detail',query: {bid: item.bid}}" class="bookimg">
                    <img :src="'http://xiaoyang:81/'+item.cover" alt="">
                   
                  <p>{{item.describe1}}</p>
                   </router-link>
                  <h2><router-link :to="{path:'/detail',query: {bid: item.bid}}">{{item.bname}}</router-link> </h2>
                </li>
            </ul>
        </Tab-pane>
    
    </Tabs>
        <Footer class="foot"></Footer>
    </div>
</template>
<script>
import Footer from '@/components/footer'
export default {
    props:['books'],
    components: {
        'Footer':Footer
    }
}
</script>
<style scoped>
.books {
    width: 100%;
}
.books li {
    width: 160px;
    height: 260px;
    position: relative;
    border: none;
    display: inline-block;
    margin:20px 0 0 40px;
    border-radius: 5px;
    cursor: pointer;
}
.books li img {
    width: 160px;
    height: 220px;
    border-radius: 4px;
}
.books li p {
    width: 160px;
    height: 220px;
    line-height: 30px;
    position: absolute;
    top: 0px;
    font-size: 16px;
    letter-spacing: 0.93px;
    color: #fff;
    background: rgba(0, 0, 0, .5);
    text-align: center;
    display: none;
}
.books li:hover p {
    display: block;
}
.books h2 {
    position: relative;
    left: 5px;
    top: 15px;
    
}
.books h2>a {
    font-weight: 600;
    overflow: hidden;
    max-width: 106px;
    color: #333;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    color: #333 !important;
}
.bookimg {
    display: inline-block;
}
.foot {
    position: absolute;
}
</style>
