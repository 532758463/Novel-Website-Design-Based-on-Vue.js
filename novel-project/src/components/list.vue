<template>
    <div class="box">
    <ul>
         <li>
             <h2>月票榜</h2>
             <router-link to="" class="right">更多></router-link>
        </li>
        <li>
            <span>1</span><router-link to="">绝世高手</router-link>
             <router-link to="" class="right">264131</router-link>
        </li>
         <li>
            <span>2</span><router-link to="">绝世高手</router-link>
             <router-link to="" class="right">264131</router-link>
        </li>
         <li>
            <span>3</span><router-link to="">绝世高手</router-link>
             <router-link to="" class="right">264131</router-link>
        </li>
          <li>
            <span>4</span><router-link to="">绝世高手</router-link>
             <router-link to="" class="right">264131</router-link>
        </li>
    </ul>

    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    ul,li,ol{
        list-style: none;
    }
    .box {
        width: 21%;
        height: 597px;
        /* background: #eee; */
    }
    .box>ul h2{
        display: inline-block;
    }
    .box>ul li {
        height: 31px;
        line-height: 31px;
    }
    .box>ul li:nth-child(1){
        border-bottom: 1px solid #000;
    }
    .box>ul>li>span{
      display: inline-block;
      width: 15px;
      height: 15px;
      font-size: 16px;
      font-weight: 400; 
      color: #a9aeb7;; 
      line-height: 15px;
      text-align: center;
      margin-right: 10px;
    }
    .box>ul>li:nth-child(2)>span {
        background:#ee4259;
        color: #fff;
    }
    .box>ul>li:nth-child(3)>span{
        background:#fc7403;
        color: #fff;
    }
    .box>ul>li:nth-child(4)>span{
        background:#f8cc1c;
        color: #fff;
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
    
    .box>ul li>a.right{
        position: relative;
        left: 50%;
    }
    .box>ul>li:nth-child(1)>a.right{
        left: 70%;
    }
     .box>ul a.right:hover {
           color: #b3b3b3;
     }
</style>