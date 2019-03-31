<template>
    <div class="box">
        <ul>
            <li><span>本周推荐</span></li>
            <li v-for="(item,ind) in book" :key="ind">
               <router-link to="" class="small">「{{item.kinds}}」</router-link>
               <router-link @click.native="refresh" :to="{path:'/detail',query: {bid: item.bid}}" class="black">{{item.bname}}</router-link>
                <router-link to="" class="right">{{item.author}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:['book'],
    inject:['reload'],
    methods:{
        refresh: function() {
        this.reload();
    },
    }
}
</script>
<style scoped>
    ul,li,ol{
        list-style: none;
    }
    .box {
        width: 21%;
        height: 353px;
        /* background: #f5f5f5;; */
    }
  
    .box>ul li {
        height: 31px;
        line-height: 31px;
        /* border-bottom: 1px dashed #ccc; */
    }
    .box>ul li:nth-child(1){
         text-align: center;
        border-bottom: 1px solid #000;
    }
    .box>ul>li>span{
      font-size: 18px;
      font-weight: 400; 
      color: #333; 
      
    }
    .box>ul a{
        color: #b3b3b3;
        font-size: 14px;
    }
   
    .box>ul a.black {
        color: #1a1a1a;

    }
    .box>ul a:hover {
        color: #ee4259;
    }
    .box>ul a.right{
        color:#999;
        font-size: 12px;
        float: right;
        padding-right: 10px;
    }
</style>