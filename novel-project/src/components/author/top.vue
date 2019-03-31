<template>
    <div class="box">
    
        <ul class="nav">
            <li class="title">
                    作家专区
            </li>
            <li class="right book" v-if="hidden">
    <Dropdown @on-click="clearAuthor">
        <a href="javascript:void(0)">
            <img v-if="!author.imgUrl" src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3909309988,2110782801&fm=173&app=49&f=JPEG?w=218&h=146&s=D60AA2E215718BC002DC3D810300F08A" alt="">
            <img v-if="author.imgUrl" :src="author.imgUrl"/>
            <span>{{author.username}}</span>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item name="1">修改资料</Dropdown-item>
            <Dropdown-item name="2">更改密码</Dropdown-item>
            <Dropdown-item name="3"><router-link to="/authorLog">退出登录</router-link> </Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
            </li>
  
        </ul>
    
    </div>
</template>
<script>

export default {
    props:['hidden','author'],
    data() {
        return {
          
        }
    },
    methods:{
        clearAuthor(name) {
            console.log(name)
              if(name==='3'){
                  this.axios({
                    method:'get',
                    url:'/clearAuthor',
                }).then(res=>{ 
                    // console.log(this.author);
                    // window.location.href="/authorLog";
                }).catch(res=>{
                    console.log("请求失败");
                })
            }
        }
    }

}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .box {
        width: 100%;
        border-top: 3px solid #50A8FF;
        border-bottom: 1px solid #DDD;
    }
    ul,li,ol{
        list-style: none;
    }
    a{
        text-decoration: none;
        color: #333;
    }
    .nav {
        background: #FFF; 
        width: 100%;
        height: 62px;
        line-height: 62px;
    }
    .nav>li{
        color: rgba(255,255,255,.7);
        float: left;
        width: 68px;
        height: 60px;
        text-align: center;
    }
  
    
    .nav>li>a {
        font-size: 14px;
    }

    .nav>.title{
        position: relative;
        left: 7%;
        font-size: 28px;
        width: 165px;
        color: #50A8FF;
    }
    
    .right {
        position: absolute;
        left: 1000px;
    }
    .right .ivu-dropdown-item {
        height: 36px;
        line-height: 36px;
    }
    .right img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: relative;
        top: 12px;

    }
    .nav>.book {
        left: 84%;
        width: 150px;
    }
   
</style>
