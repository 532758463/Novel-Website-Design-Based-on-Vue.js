<template>

    <div class="readBox">  
        <div class="readBox__one">
            <ul class="readBox__one-a">
                <li class="readImg" v-if="book.cover">
                    <img :src="'http://xiaoyang:81/'+book.cover" alt="小说背景图">
                </li>
                <li class="bookInfo">
                    <h1 style="">{{book.bname}}</h1>
                    <p class="grayfont" >{{book.author}} 著</p>
                </li>
                <li>
                    <ul class="floatLeft">
                        <li>{{book.kinds}}</li>
                        <li>{{new Date(book.addtime).getFullYear()}}年{{new Date(book.addtime).getMonth()+1}}月{{new Date(book.addtime).getDate()}}日</li>
                        <li >{{book.wordnum}}</li>
                    </ul>
                    <div style="clear: both;"></div>
               
                    <ul class="floatLeft">
                        <li class="grayfont">类型</li>
                        <li class="grayfont">上架 </li>
                        <li class="grayfont word"> 连载(字)</li>
                    </ul>
                    <div style="clear: both;"></div>
                </li>

               <li class="floatLeft"><p>与11.02万书友共同开启伏天的玄幻之旅</p></li>  
               <li class="readBottom">
                   <p>本文由火柴阅读中文网所有</p>
                   <p class="grayfont"> &copy;版权所有 侵权必究</p>
                </li>  
            </ul>
        </div>
        <div class="readBox__two">
            <span class="novelTitle">{{book.bname}}</span>
               <br>
            <p v-html="section.scontent">
                {{section.scontent}}
            </p>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            section:[],
            book:[],
            section:{
                sid:''
            }
        }
    },
    methods: {
        getcook() {
             this.section.sid=this.$route.query.sid;
                this.axios({
                method:'post',
                url:'/readbook',
                data:this.section,
                transformRequest:[function(data){
                    let ret='';
                    for(let i in data){
                         ret+=encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&';
                        }
                    return ret;
                    }],
                    header: {
                         'Content-Type': 'application/x-www-form-urlencoded'
                    }
            }).then(res=>{
                // this.book=res.data.book;
                console.log(res.data);
                this.book=res.data.r2;
                // this.section=res.data.section;
                this.section=res.data.r1;
            }).catch(res=>{
                // console.log(res.data.r);
                console.log("获取章节失败");
            })
        }
    },
    mounted: function(){
       this.getcook();
    }
}
</script>

<style scoped>
    /* 小说阅读页面编写 */

.readBox {
    position: relative;
    margin-left: 25%;
    height: auto !important;
    min-height: 620px
}

.readBox .readBox__one{
    width: 718px;
    height: 609px;
    position: absolute;
    
    background:url("../assets/basic_bg.png");
    background-repeat: repeat;
    margin: 0 auto;
}
.readBox>.readBox__one>.readBox__one-a{
    width: 600px;
    position: absolute;
    top: 50px;
    left: 38%;
} 
.readBox__one-a>li{
    margin-bottom: 40px;
}
.readImg>img{
    width: 120px;
    height: 160px;
    position: relative;
    left: 10px;
}
.readBox__one-a .floatLeft>li{
    float: left;
    margin-right: 50px;
    font-size: 14px;
}
.floatLeft{
    position: relative;
    left: -50px;
}
.grayfont {
    color: rgba(0,0,0,.4);
    padding-top: 5px;
}
.readBox__one-a .readBottom{
    position: relative;
    top: 15px;
}

.readBox__two .novelTitle{
    position: absolute;
    left: 44%;
    font-size: 25px;
    font-weight: bold;
    top: 20px;
}
.readBox__two {
    width: 718px;
    height: auto;
    position: absolute;
    top: 609px;
    margin-top: 20px;
    background: url("../assets/basic_bg.png");
    background-repeat: repeat;
    overflow: hidden;
    padding: 50px 20px 50px 20px;
    font-size: 18px;
    /* letter-spacing:  2px; */
}
.word {
    position: relative;
    left: 60px;
}
.bookInfo {
    width: 300px;
    position: relative;
    left:-80px;
    text-align:center;
}
</style>
