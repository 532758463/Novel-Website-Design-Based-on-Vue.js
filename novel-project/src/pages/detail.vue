<template>
  <div>
    <Header v-on:uid="uid"></Header>
    <div class="bg">
      <img src="../assets/detail-bg.jpg" alt>
    </div>
    <div class="info">
      <div class="info-pic"  v-if="bookInfo[0]">
        <img :src="'http://xiaoyang:81/'+bookInfo[0].cover" alt>
      </div>
      <div class="book-info">
        <h1 v-if="bookInfo[0]">
          <span class="bl">{{bookInfo[0].bname}}</span>
          <span class="author">
            <a href  v-if="bookInfo[0].author">{{bookInfo[0].author}}</a>著
          </span>
        </h1>
        <p class="tag" v-if="bookInfo[0]"> 
          <span class="blue">连载</span>
          <span class="blue">签约</span>
          <span class="blue">免费</span>
          <a href class="red"  v-if="bookInfo[0].kinds">{{bookInfo[0].kinds}}</a>
          <a href class="red">剑与魔法</a>
        </p>
        <p class="intro"  v-if="bookInfo[0]">{{bookInfo[0].describe1}}</p>
        <p class="detail-num">
         <ul>
           <li>11.4
             <span>万字</span>
           </li>
           <li>3.22
             <span>万阅文总点击</span>
           </li>
           <li>2084
             <span>会员周点击</span>
           </li>
            <li>754
             <span>总推荐</span>
           </li>
            <li>47
             <span>周推荐</span>
           </li>
         </ul>
        </p>
        <p class="detail-btn">
          <a href class="free">免费试读</a>
          <span  href="http://xiaoyang:8080/#/" class="enter" @click="AdddCollection" v-if="!exist">加入书架</span>
            <a href="javascript:(void(0))" class="enter gray" v-if="exist">已在书架</a>
          <a href class="enter">推荐投票</a>
          <a href class="free">下载App</a>
        </p>
      </div>
      <div class="aside">
        <p class="score">暂无评分</p>
        <p class="num">少于10人评价</p>
        <p class="want" >我要评价</p>
        <p>
            <Rate allow-half disabled  v-model="valueHalf" />
          </Row>
        </p>
      </div>
 
    </div>
     <Tabs :book="bookInfo[0]" :section="section" :collect="collect"></Tabs>
     <Footer  class="foot" ></Footer>
  </div>
</template>
<script>
import Header from "@/components/Fantasty/header";
import Tabs from "@/components/tabs";
import Footer from "@/components/footer";
export default {
  data () {
        return {
            valueText: 0,
            valueHalf: 4.5,
            bookInfo:[],
            section:[],
            book:{
              bid:''
            },
            collect:{
              uid:'',
              bid:'',
              uimg:''
            },
            exist:false
            
          }
    },
  components: {
    'Header': Header,
    'Footer': Footer,
    'Tabs':Tabs
  },
  methods:{
    getBook() {
        this.book.bid=this.$route.query.bid;
        // console.log( this.book.bid);
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
                // this.collect.bid=this.bookInfo[0].bid;
                 this.collect.bid=res.data.book[0].bid;
            }).catch(res=>{
                console.log("获取章节失败");
            })
        },
    uid: function(data) {
        // console.log(data);
        // return;
        this.collect.uid=data.uid;
        this.collect.uname=data.uname;
        this.collect.uimg=data.uimg;
        // console.log(this.collect.uid);
        this.getCollection(this.collect.uid);
      },
    AdddCollection() {
      let uid=this.collect.uid;
      // let uid=confirm("您还未登录，是否前去登录？");
      if(!uid){
        if(confirm("您还未登录，是否前去登录？")){
          window.location.href="http://xiaoyang:8080/#/login";
          return;
        }
      }
      this.axios({
        method:'post',
        url:'/insert',
        data: this.collect,
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
               if(res.data.r==='ok'){
                 this.$Message.success("添加成功");
                 this.exist=true;
               }
               if(res.data.r==='exist'){
                 this.exist=true;
               }
            }).catch(res=>{
                // console.log("获取章节失败")
            })
    },
    getCollection(uid) {
       this.exist=false;
      if(!uid){
        return;
      }
     
      let This=this;
      setTimeout(() => {
         let data={
        uid:This.collect.uid,
        bid:This.collect.bid
      }
        This.axios({
        method:'post',
        url:'/checkbook',
        data: data,
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
              // console.log(res.data);
               if(res.data.r=='exist'){
                 this.exist=true;
               }
              
            }).catch(res=>{
                console.log("获取章节失败")
            })
      }, 200);
      
    }    
  },
  mounted:function() {
        this.getBook();
        // this.getCollection();
  },
};
</script>
<style scoped>
.bg > img {
  width: 1366px;
  height: 220px;
  z-index: 0;
}
.info {
  width: 990px;
  height: 232px;
  position: relative;
  background-color: #fff;
  z-index: 100000;
  margin-top: -120px;
  margin-left: 190px;
}
.info-pic {
  width: 144px;
  height: 192px;
   left: 20px;
  top: 20px;
  border: 1px solid #ccc;
  overflow: hidden;
  position: relative;
}
.info-pic img {
  position: absolute;

  width: 144px;
  height: 192px;
}
.info-pic img:hover{
  cursor: pointer;
  transition: transform .3s ease-out;
  transform: scale(1.1,1.1);
}
.book-info {
  position: absolute;
  left: 184px;
  top: 20px;
  width: 545.5px;
  height: 192px;
}
.book-info > h1 {
  width: 545.5px;
  height: 38px;
}
.bl {
  text-align: left;
  color: #262626;
  font-size: 28px;
}
.author {
  width: 49px;
  height: 14px;
  font: 12px/22px PingFangSC-Regular, "-apple-system", Simsun;
  color: #262626;
  margin-left: 25px;
  font-weight: 400;
}
span > a {
  margin-right: 5px;
  text-decoration: none;
  color: #262626;
  outline: 0;
}
.tag {
  width: 545.5px;
  height: 25px;
  margin-top: 12px;
  font-size: 14px;
}
.tag > .blue {
  color: #3f5a93;
  border-color: #9fadc9;
  font: 12px/22px PingFangSC-Regular, "-apple-system", Simsun;
  display: inline-block;
  overflow: hidden;
  height: 22px;
  margin-right: 12px;
  padding: 0 10px;
  text-align: center;
  vertical-align: middle;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
}
.tag > .red {
  transition: border 0.3s;
  color: #bf2c24;
  border-color: #ffb0b4;
  font: 12px/22px PingFangSC-Regular, "-apple-system", Simsun;
  display: inline-block;
  overflow: hidden;
  height: 22px;
  margin-right: 12px;
  padding: 0 10px;
  text-align: center;
  vertical-align: middle;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
}
.intro {
  margin-top: 11px;
  width: 545.5px;
  height: 20px;
  font: 14px/20px PingFangSC-Regular, "-apple-system", Simsun;
  overflow: hidden;
  margin-bottom: 11px;
}
.detail-btn {
  width: 545.5px;
  height: 36px;
  font: 14px/20px PingFangSC-Regular, "-apple-system", Simsun;
}
.detail-num{
  width: 568.75px;
  height: 24px;
}
.detail-num > ul{
  float: left;
}
.detail-num > ul>li{
  float: left;
  font: 20px/22px Arial;
  letter-spacing: .5px;
  margin-right: 22px;
  color: #262626;
}
.detail-num > ul>li>span{
  font: 12px/20px PingFangSC-Regular, "-apple-system", Simsun;
}
.detail-btn{
  width: 568.75px;
  height: 36px; 
  line-height: 36px;
  margin-top: 12px;
}
.detail-btn > .free{
    font: 14px/34px PingFangSC-Regular,'-apple-system',Simsun;
    display: inline-block;
    width: 102px;
    height: 34px;
    margin-right: 15px;
    text-align: center;
    vertical-align: middle;
    border-width: 1px;
    border-style: solid;
    border-color: #bf2c24;
    background: #bf2c24;
     color: #fff;
}
.detail-btn > .free:hover{
    color: #fff;
    border-color: #ed4259;
    background: #ed4259;
}
.detail-btn > .enter{
    font: 14px/34px PingFangSC-Regular,'-apple-system',Simsun;
    display: inline-block;
    width: 102px;
    height: 34px;
    margin-right: 15px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    color: #3f5a93;
    border-color: #3f5a93;
}
.detail-btn > .enter:hover{
  background: #e8eaee;
}
.aside{
  width: 200px;
  height: 166px;
  position: absolute;
  right: 0px;
  top: 20px;
}
.aside>.score{
      margin-right: 30px;
      text-align: right;
      font: 14px/44px PingFangSC-Regular,'-apple-system',Simsun;  
}
.aside>.num{
      margin-right: 30px;
      text-align: right;
      font: 12px/44px PingFangSC-Regular,'-apple-system',Simsun;
      color: #ccc; 
}
.aside>.want{
      margin-right: 30px;
      text-align: right;
      font: 12px/44px PingFangSC-Regular,'-apple-system',Simsun;
}
.ivu-rate-star ivu-rate-star-zero{
  margin-right: -2px;
}
.ivu-rate{
    position: absolute;
    right: 30px;
}
.foot {
  width: 100%;
  position: absolute;
}
.detail-btn>.gray {
  border-color: #aaa;
  color: #ccc;
}
</style>
