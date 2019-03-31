<template>
<div>
    <Header :hidden="hidden" :author="author"></Header>
    <div class="book" v-if="bookInfo[0]">
        <img :src="'http://xiaoyang:81/'+bookInfo[0]['cover']"  alt="">
        <div class="info" v-if="bookInfo[0]">
            <h1>{{bookInfo[0].bname}}</h1>
            <span class="desc">{{bookInfo[0].describe1}}</span>
        </div>
        <div class="section" v-if="bookInfo[0]">
            <i-button type="success"><router-link :to="{path:'/addChapter',query:{bid:bookInfo[0].bid}}">添加章节</router-link></i-button>
            <router-link to="/author" class="reback">后退到首页</router-link>
            <ul v-if="section[0]">
                  <li v-for="(item,ind) in section" :key="ind"> <router-link to="">第{{ind+1}}章 &nbsp;{{item.sname}}</router-link></li>
            </ul>
        </div>
    </div>
 </div>
</template>
<script>
import Header from '@/components/author/top'

    export default {
        data () {
            return {
                hidden:true,
                author:{
                    username:'',
                    imgUrl:'',
                    aid:''
                },
                bookInfo:[],
                section:[],
                book:{
                    bid:''
                }
            }
        },
        components:{
            'Header': Header,
        },
        methods: {
        getAuthor(){
            // console.log(this.$route.query.bid);
            this.axios({
            method: 'get',
            url:'/getAuthor',
        }).then(res=>{
            // console.log(res.data);
            this.author.username=res.data.aname;
            this.author.imgUrl=res.data.aimg;
            this.author.aid = res.data.aid;
        }).catch(res=>{
            console.log("get请求失败");
        })
        },
        getBook() {
        //    console.log(this.$route.query.bid);
            // return;
            this.book.bid=this.$route.query.bid;
            this.axios({
                method:'post',
                url:'/getcbook',
                data:this.book,
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
                this.bookInfo=res.data.book;
                this.section=res.data.section;
            }).catch(res=>{
                console.log(res.data.r);
                
                console.log("获取章节失败")
            })
        }
        },
        beforeMount:function(){
            this.getBook();
        },
         mounted:function(){
             this.getAuthor();  
   }
    }
</script>
<style scoped>
 
.right {
    width: 1124px;
    position: absolute;
    top: 70px;
    left: 240px;    
}
.ivu-menu {
  height: 560px;
  border-left: 1px solid #ccc;
}
.book {
 width: 80%;
 height: 200px;
 position: relative;
 left: 10%;
 /* border: 1px solid #ccc; */
box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.15)
}
.book>img{
    width: 150px;
    height: 180px;
    position: absolute;
    top: 5px;
    left: 5px;
}
.info {
    position: absolute;
    left: 180px;
    display: inline-block;
}
.desc {
    position: relative;
    top: 50px;
    font-size: 16px;
}
.section {
    width:100%;
    height: 400px;
    /* border: 1px solid #ccc; */
    position: relative;
    top: 200px;
    /* padding-left: 50px; */
}
.section a{
     color: #fff;
}
.section>ul {
    width: 100%;
 
}
.section>ul>li {
    width: 19%;
    margin-top: 5px;
    margin-right: 5px;
    height: 50px;
    position: relative;
    top: 10px;
    line-height: 50px;
    background: #f5f7f9; 
    padding-left: 20px;
    display: inline-block;
}
.section>ul>li:hover {
    border-bottom: 2px solid #ff6600;
}
.section>ul>li:hover a {
    color: #ff6600;
}
.section li>a{
    color: #000;

}
.reback{
    display: inline-block;
    font-size: 12px;
    border-radius: 4px;
    position: relative;
    top: 5px;
    color:#fff;
    width: 80px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    background-color: #19be6b;
    border-color: #19be6b;
}

.ivu-btn-success {
    margin-top: 10px;
}
</style>