<template>
  <Tabs>
    <TabPane label="作品信息" class="tab-info">
      <div class="intro" v-if="book">
        <p>{{book.describe1}}</p>
      </div>
      <div class="book-state">
        <div class="one">
          <span class="self">作者自定义标签</span>
          <span class="choose">
            <a href>坚毅</a>
            <a href>种田文</a>
            <a href>龙</a>
          </span>
        </div>
        <div class="two">
          <span class="self">荣誉动态</span>
          <span class="time">2019-03-05 累积获得一千个收藏</span>
          <a href class="honer">荣誉殿堂</a>
        </div>
        <div class="three">
          <span class="self">最近更新</span>
          <span>
            <a href class="num">第四十六章：恶魔伪装者Ⅱ</a>
            <span class="before">·17小时前</span>
          </span>
        </div>
      </div>
      <div class="fans">
        <h3>粉丝互动</h3>
        <div class="fans-tags">
          <div>
            <h4>
              <a href class="tic">推荐票</a>
            </h4>
            <p id="week">本周票数</p>
            <p id="fan-num">267</p>
            <p id="fan-rank">排名2525·还差 0 票追上前一名</p>
            <span id="fan-pic"></span>
            <p id="tou">
              <a href>投推荐票</a>
            </p>
          </div>
          <div>
            <h4>
              <a href class="tic">打赏</a>
            </h4>
            <p id="reward">本周打赏人数</p>
            <p id="reward-num">2</p>
            <p id="reward-day">今日0人打赏</p>
            <span id="reward-pic"></span>
            <p id="reward-author">
              <a href>打赏作者</a>
            </p>
          </div>
          <div id="grade">
            <h4>
              <a href class="my">我的粉丝等级</a>
            </h4>
            <span id="grade-head">
              <a href>
                <img src="../assets/head.png" alt>
              </a>
            </span>
            <span id="grade-logo">
              <a href>登录</a>
              <span id="grade-fan">查看粉丝等级</span>
            </span>
            <div id="fans-dynamic">
              <p>本书粉丝动态</p>
              <ul>
                <li>柠檬不算投了1张推荐票</li>
                <li>读书人zlfm投了1张推荐票</li>
                <li>认认真真投了1张推荐票</li>
                <li>读书人zlfm投了1张推荐票</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="games-op-wrap">
        <img id="games-op-wrap-one" src="../assets/0.jpg" alt>
        <img src="../assets/1.jpg" alt>
      </div>
      <div id="like">
        <h3>喜欢这本书的人还喜欢</h3>
        <div id="like-book">
          <div>
            <img src="../assets/likeone.jpg" alt>
            <h4>邪神降尘</h4>
          </div>
          <div>
            <img src="../assets/liketwo.jpg" alt>
            <h4>盖世圣朝</h4>
          </div>
          <div>
            <img src="../assets/likethree.jpg" alt>
            <h4>我的任务面板</h4>
          </div>
          <div>
            <img src="../assets/likefour.jpg" alt>
            <h4>五行萨满</h4>
          </div>
          <div>
            <img src="../assets/likefive.jpg" alt>
            <h4>我是军团扛把子</h4>
          </div>
          <div>
            <img src="../assets/likesix.jpg" alt>
            <h4>战锤之凡人凡</h4>
          </div>
        </div>
      </div>
      <div id="discussion">
        <div id="comment-head">
          <span id="dis-one">作品讨论区</span>
          <i></i>
          <span id="dis-two">书友评价</span>
          <span id="dis-three" @click="modal1 = true">我要发帖</span>
        </div>
        <Modal
        v-model="modal1"
        title="我要评论"
        @on-ok="ok"
        @on-cancel="cancel">
        评分：<Rate allow-half v-model="valueHalf" ></Rate>
        <br>
        <i-input type="textarea" :rows="4" placeholder="请输入..."  v-model="content"></i-input>
    </Modal>
        <div id="user">
          <ul>
            <li v-for="(item,ind) in remark" :key="ind">
              <div id="user-photo">
                <img :src="item.uimg" alt>
              </div>
              <div class="remark">
                 <span class='uname'>{{item.uname}}</span>
                 <Rate disabled v-model="item.score"></Rate><br>
                 <span class='date'>{{new Date(item.time).getFullYear()}}年{{new Date(item.time).getMonth()+1}}月{{new Date(item.time).getDate()}}日</span>
                 
                 <p>{{item.content}}</p>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </TabPane>
    <TabPane label="目录"> 
       <ul v-if="section[0]" class="section">
          <li v-for="(item,ind) in section" :key="ind"> <router-link :to="{path:'/read',query: {sid:section[ind].sid}}">第{{ind+1}}章 &nbsp;{{item.sname}}</router-link></li>
      </ul>
    </TabPane>
    <TabPane label="作品讨论（115条）">标签三的内容</TabPane>
  </Tabs>
</template>

<script>
export default {
  props:['book','section','collect'],
  inject:['reload'],
  data() {
    return {
       modal1: false,
       valueHalf:2.5,
       content:'',
       comment:{
         uname:'',
         uid:'',
         bid:'',
         score:'',
         content:'',
         uimg:''
       },
       remark:[]
    }
  },
  methods: {
    refresh: function() {
      this.reload();
    },
    ok () {
      if(!this.collect.uid){
        this.$Message.warning('请先登录！！！');
        return;
      }
      this.comment.uid=this.collect.uid;
      this.comment.bid=this.collect.bid;
      this.comment.score=this.valueHalf;
      this.comment.content=this.content;
      this.comment.uname=this.collect.uname;
       this.comment.uimg=this.collect.uimg;
      // console.log(this.comment);
      this.axios({
        method:'post',
        url:'/addComment',
        data:this.comment,
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
               this.$Message.info('评论成功！！！');
               this.refresh();
             }
            }).catch(res=>{
                console.log("获取章节失败");
      })
    },
    cancel () {
      this.$Message.info('点击了取消');
    },
    getComment() {
      // console.log(this.$route.query.bid);
      let data={
        bid:this.$route.query.bid
      }
       this.axios({
        method:'post',
        url:'/getComment',
        data:data,
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
                this.remark=res.data.r;
            }).catch(res=>{
                console.log("获取失败");
      })
    }
  },
  mounted:function(){
    let This=this;
    // setTimeout(()=>{
    This.getComment();
    // },10)
    
  }
};
</script>

<style scoped>
.ivu-tabs {
  width: 990px;
  position: relative;
  left: 185px;
  color: #a6a6a6;
}
.intro {
  width: 700px;
  height: 112px;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e6e6e6;
  text-align: left;
  color: #262626;
  font: 14px/28px PingFangSC-Regular, "-apple-system", Simsun;
  overflow: hidden;
  line-height: 28px;
  text-indent: 2em;
}
/* .ivu-tabs-nav >>> .ivu-tabs-tab:hover {
  color: #d80b1e;
}
.ivu-tabs-nav-container:focus >>> .ivu-tabs-tab-focused {
  border-color: #d80b1e;
}
.ivu-tabs-nav >>> .ivu-tabs-tab-active {
  color: #d80b1e;
}
.ivu-tabs-nav-container {
  line-height: 1.5;
  font-size: 18px;
  font-weight: 500;
} */

.book-state {
  width: 700px;
  height: 258px;
  margin-top: 25px;
}
.one {
  width: 700px;
  height: 65px;
}
.two {
  width: 700px;
  height: 121px;
}
.three {
  width: 700px;
  height: 72px;
}
.self {
  font: 14px/24px PingFangSC-Regular, "-apple-system", Simsun;
  width: 98px;
  margin: 19px 20px 0 0;
  color: #999;
}
.choose > a {
  font: 12px/16px PingFangSC-Regular, "-apple-system", Simsun;
  display: inline-block;
  margin-right: 8px;
  padding: 3px 9px;
  vertical-align: middle;
  color: #3f5a93;
  border: 1px solid #3f5a93;
  border-radius: 100px;
}
.time {
  font-size: 14px;
  color: black;
  margin-left: 40px;
  cursor: pointer;
}
.honer {
  width: 80px;
  height: 50px;
  display: block;
  margin-left: 120px;
  margin-top: 10px;
  line-height: 50px;
  font-size: 14px;
  color: #3f5a93;
}
.three >>> a {
  width: 140px;
  height: 22px;
  line-height: 22px;
  font-size: 14px;
  color: #3f5a93;
  margin-left: 40px;
}
.before {
  font: 14px/24px PingFangSC-Regular, "-apple-system", Simsun;
  color: #999;
  font-weight: 540;
}
.fans {
  width: 700px;
  height: 351px;
}
.fans > h3 {
  width: 700px;
  font-size: 22px;
  line-height: 25px;
  height: 25px;
  margin-bottom: 12px;
  color: black;
  font-family: FZZCYSK;
  font-weight: 400;
}
.fans-tags {
  width: 700px;
  height: 312px;
  text-align: center;
  background: #f7f6f2;
  display: flex;
}
.fans-tags > div {
  float: left;
  width: 232px;
  height: 264px;
  padding: 24px 0;
  position: relative;
}
.tic {
  color: #ed4259;
  font-size: 18px;
  line-height: 22px;
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: middle;
  font-family: FZZCYSK;
  font-weight: 400;
}
.my {
  color: black;
  font-size: 18px;
  line-height: 22px;
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: middle;
  font-family: FZZCYSK;
  font-weight: 400;
}
#week {
  font: 12px/16px PingFangSC-Regular, "-apple-system", Simsun;
  height: 16px;
  margin-bottom: 7px;
  margin-top: 15px;
  color: #a6a6a6;
}
#fan-num {
  color: black;
  font-size: 28px;
  line-height: 22px;
  margin-top: 12px;
  font-family: FZZCYSK;
  font-weight: 400;
}
#fan-rank {
  color: #262626;
  margin-top: 12px;
  font: 12px/28px PingFangSC-Regular, "-apple-system", Simsun;
}
#fan-pic {
  width: 36px;
  height: 52px;
  background-image: url(../assets/icon.png);
  background-repeat: no-repeat;
  background-position: -299px -54px;
  background-size: 335px;
  position: absolute;
  z-index: 1;
  top: 158px;
  left: 50%;
  margin-left: -18px;
  transition: top 0.5s ease-out;
}
#tou > a {
  transition: color 0.3s, background-color 0.3s;
  font: 14px/34px PingFangSC-Regular, "-apple-system", Simsun;
  position: relative;
  z-index: 1;
  display: block;
  width: 140px;
  height: 34px;
  margin: 20px auto 3px;
  text-align: center;
  color: #fff;
  border-radius: 20px;
  background-color: #bf2c24;
  margin-top: 80px;
}
#tou > a:hover {
  color: #fff;
  background: #ed4259;
}
#reward {
  font: 12px/16px PingFangSC-Regular, "-apple-system", Simsun;
  height: 16px;
  margin-bottom: 7px;
  margin-top: 15px;
  color: #a6a6a6;
}
#reward-num {
  color: black;
  font-size: 28px;
  line-height: 22px;
  margin-top: 12px;
  font-family: FZZCYSK;
  font-weight: 400;
}
#reward-day {
  color: #262626;
  margin-top: 12px;
  font: 12px/28px PingFangSC-Regular, "-apple-system", Simsun;
}
#reward-pic {
  width: 40px;
  height: 40px;
  background-image: url(../assets/icon.png);
  background-repeat: no-repeat;
  background-position: -146px -222px;
  background-size: 335px;
  position: absolute;
  z-index: 1;
  top: 158px;
  left: 50%;
  margin-left: -18px;
  transition: top 0.5s ease-out;
}
#reward-author > a {
  transition: color 0.3s, background-color 0.3s;
  font: 14px/34px PingFangSC-Regular, "-apple-system", Simsun;
  position: relative;
  z-index: 1;
  display: block;
  width: 140px;
  height: 34px;
  margin: 20px auto 3px;
  text-align: center;
  color: #fff;
  border-radius: 20px;
  background-color: #bf2c24;
  margin-top: 80px;
}
#grade {
  position: relative;
}
#grade-head > a > img {
  z-index: 1;
  width: 44px;
  height: 44px;
  border-radius: 100%;
  position: absolute;
  left: 35px;
  top: 65px;
}
#grade-logo {
  width: 190px;
  height: 89px;
  border-bottom: 1px solid #e5e5e5;
  display: inline-block;
}
#grade-logo > a {
  color: #3f5a93;
  position: absolute;
  transition: color 0.3s, background-color 0.3s;
  text-decoration: none;
  left: 90px;
  top: 80px;
}
#grade-logo > a:hover {
  color: #2972cc;
}
#grade-fan {
  color: #262626;
  margin-top: 12px;
  font: 12px/28px PingFangSC-Regular, "-apple-system", Simsun;
  position: absolute;
  right: 40px;
  top: 63px;
}
#fans-dynamic {
  width: 190px;
  height: 147px;
  margin-left: 18px;
  margin-top: 20px;
  text-align: center;
}
#fans-dynamic > p {
  color: black;
  font-size: 18px;
  line-height: 22px;
  position: relative;
  z-index: 1;
  display: inline-block;
  vertical-align: middle;
  font-family: FZZCYSK;
  font-weight: 400;
}
#fans-dynamic > ul {
  margin-top: 15px;
  margin-left: 15px;
}

#fans-dynamic > ul > li {
  font: 12px/28px PingFangSC-Regular, "-apple-system", Simsun;
  overflow: hidden;
  height: 28px;
  text-align: left;
  list-style: none outside none;
  border-top: none;
  color: black;
  border-bottom: 1px solid #e5e5e5;
}
#games-op-wrap {
  width: 700px;
  height: 70px;
  margin-top: 36px;
}
#games-op-wrap > img {
  width: 345px;
  height: 70px;
}
#games-op-wrap-one {
  margin-right: 5px;
}
#like {
  width: 700px;
  height: 219px;
  margin-top: 30px;
}
#like > h3 {
  width: 700px;
  height: 25px;
  color: black;
  font-size: 22px;
  font-weight: 500;
}
#like-book {
  width: 700px;
  height: 180px;
  position: relative;
  margin-top: 20px;
  display: flex;
}
#like-book >>> img {
  width: 84px;
  height: 112px;
  margin-right: 38px;
  transition: transform 0.3s ease-out;
}
#like-book >>> img:hover {
  transform: scale(1.1);
}
#like-book >>> h4 {
  color: black;
  font-size: 14px;
  font-weight: 600;
}
#like-book >>> h4:hover {
  color: #ed4259;
  cursor: pointer;
}
#discussion {
  width: 700px;
  /* height: 1823px; */
  margin-top: 30px;
}
#comment-head {
  width: 700px;
  height: 36px;
  border-bottom: 1px solid #ccc;
}
#dis-one {
  color: #262626;
  font-size: 22px;
  line-height: 25px;
  font-weight: 500;
}
#comment-head >>> i {
  display: inline-block;
  width: 2px;
  height: 20px;
  background-color: #6a6a6a;
  margin-left: 15px;
  margin-right: 20px;
}
#dis-two {
  color: #6a6a6a;
  font-size: 22px;
  line-height: 25px;
  font-weight: 500;
}
#dis-three {
  font: 12px/22px PingFangSC-Regular, "-apple-system", Simsun;
  float: right;
  width: 66px;
  height: 22px;
  margin-top: 1px;
  transition: 0.2s;
  text-align: center;
  border: 1px solid #9facc9;
  border-radius: 12px;
  color: #3f5a93;
  cursor: pointer;
}
#dis-three:hover {
  color: #2972cc;
}
#user {
  margin-top: 30px;
  width: 700px;
  height: auto;
  /* border-bottom: 1px solid #ccc; */
  position: relative;
}
#user>ul>li {
  position: relative;
  width: 700px;
  height: 138px;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
}
#user-photo >>> img {
  /* display: block; */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  top:5px;
}
.remark {
  width: 620px;
  height:138px;
   text-overflow: ellipsis;
  overflow: hidden;
  /* border: 1px solid #ccc; */
  position: absolute;
  top: 0px;
  left: 55px;
}
.remark>.uname {
  vertical-align: middle;
    color: #333;
    font-size: 16px;
}
.remark p{
  font-size: 14px;
  color: #666;
}
.section a{
     color: #fff;
}
.section>ul {
    width: 100%;
 
}
.section>li {
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
.section>li:hover {
    border-bottom: 2px solid #ff6600;
}
.section>li:hover a {
    color: #ff6600;
}
.section li>a{
    color: #000;
}
</style>
