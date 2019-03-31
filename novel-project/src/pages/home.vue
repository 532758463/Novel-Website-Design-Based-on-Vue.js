<template>
  <div>
    <div class="container">
      <!-- 头部导航 -->
      <Row>
        <Col span="4">
          <span><router-link to="/">火柴阅读</router-link> </span>
        </Col>
        <Col span="12" class="search">
          <input type="text" v-model="value"  maxlength="94">
          <div class="btn" @click="search()">
            <Icon type="ios-search-outline" size="18" color="#fff"/>
          </div>
        </Col>
        <Col span="8" class="bookcol">
          <div class="collection">
            <Icon type="ios-book-outline" size="18"/>
            <router-link to="/login" v-if="!user.uname">我的书架</router-link>
            <router-link :to="{path:'/Mycollect',query: {uid: user.uid}}" v-if="user.uid">我的书架</router-link>
          </div>
          <div class="user">
            <router-link to="/login" v-if="!user.uname">登录</router-link>
            <router-link to v-if="!user.uimg" class>注册</router-link>
            <Dropdown @on-click="clearUser">
              <a href="javascript:void(0)">
                <img v-if="user.uimg" :src="user.uimg" class="uimg">
                &nbsp; &nbsp;{{user.uname}}
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item name="1">修改资料</Dropdown-item>
                <Dropdown-item name="2">更改密码</Dropdown-item>
                <Dropdown-item name="3">
                  <router-link to="/">退出登录</router-link>
                </Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <!-- 搜索展示区域 -->
      <div class="seabook" v-if="!homdis">
         <novelItem v-bind:book="item" v-for="(item,ind) in seanovel" :key="ind"  v-if="!nosearch" class="novelItem"></novelItem>
          <h2 v-if="nosearch">目前还未添加该小说,请重新搜索</h2>
      </div>
    
      <!-- 首页主体区域 -->
      <Menu mode="horizontal" :theme="theme1" active-name="1" v-if="homdis">
        <MenuItem name="1" class="firstItem">
          <Icon type="md-menu"/>作品分类
        </MenuItem>
        <MenuItem name="2">
          <router-link to>全部作品</router-link>
        </MenuItem>
        <MenuItem name="3">排行</MenuItem>
        <MenuItem name="4">
          <router-link to="/authorLog">作家专区</router-link>
        </MenuItem>
        <MenuItem name="4">
          <router-link to>免费</router-link>
        </MenuItem>
      </Menu>

      <div class="banner" v-if="homdis">
        <Row>
          <Col span="5" class="typelist">
            <ul>
              <li v-for="(item, index) in novelList" :key="index">
                <router-link
                  @click.native="refresh"
                  :to="{path:'/Fantasty',query: {value: item}}"
                >{{item}}</router-link>
              </li>
            </ul>
          </Col>
          <Col span="14">
            <Carousel autoplay v-model="value2" loop>
              <CarouselItem v-for="(item, index) in imgList" :key="index" class="imgList">
                <div class="demo-carousel">
                  <router-link to="/">
                    <img :src="item">
                  </router-link>
                </div>
              </CarouselItem>
            </Carousel>
            <CardList class="CardList" v-for="(item,ind) in CardList" :key="ind" :imgUrl="item"></CardList>
          </Col>
          <Col span="5">
            <Hottopic class="hottopic" v-for="(item,ind) in Hottopic" :key="ind" :hottopic="item"></Hottopic>
          </Col>
        </Row>

        <Row class="listBox">
          <List class="ticket list-one" :list="List.wordsList"></List>
          <List class="ticket list-two" :list="List.fantasty"></List>
          <List class="ticket list-three" :list="List.city"></List>
          <List class="ticket list-four" :list="List.xian"></List>
        </Row>
      </div>

    </div>
    <Footer class="foot" v-if="homdis"></Footer>
  </div>
</template>
<script>
import Hottopic from "@/components/hottopic";
import CardList from "@/components/cardList";
import Footer from "@/components/footer";
import List from "@/components/listMore";
import novelItem  from "@/components/novelItem";
export default {
  inject: ["reload"],
  data() {
    return {
      value:'',
      theme1: "dark",
      value1: "",
      value2: 0,
      novelList: [
        "玄幻",
        "奇幻",
        "仙侠",
        "武侠",
        "都市",
        "现实",
        "军事",
        "历史",
        "游戏",
        "体育",
        "科幻",
        "灵异",
        "女生网",
        "二次元"
      ],
      imgList: [
        "https://qidian.qpic.cn/qidian_common/349573/7d08609bf6b6f1370c714d157d43c8b2/0",
        "https://qidian.qpic.cn/qidian_common/349573/cb40a4c5e5abcf65abef7a1c0791e2af/0",
        "https://qidian.qpic.cn/qidian_common/349573/445ebe75000bb1df8389276e87f85d77/0",
        "https://qidian.qpic.cn/qidian_common/349573/bb2b5db336ec50775efd64b69068754d/0"
      ],
      user: {
        uid: "",
        uname: "",
        uimg: ""
      },
      CardList: [
        "https://qidian.qpic.cn/qidian_common/349573/39496dc8cfc58c58c9912f7ef7683a95/0",
        "https://qidian.qpic.cn/qidian_common/349573/482c0b7aaba4bfd548786127d6467c69/0",
        "https://qidian.qpic.cn/qidian_common/349573/0ff19bab79cdae3f098315b5e91c0740/0"
      ],
      Hottopic: [
        {
          title: "马前卒作者新书发布",
          desc: "雄踞东方，傲视世界的盛唐，头王的血腥时代。"
        },
        {
          title: "武侠泰斗，一代宗师",
          desc:
            "惊闻金庸老先生去世，享年94岁。对于金老先生，纵有千言万语想写，但落笔之时，终究只浓缩成了两个字：大师。"
        },
        {
          title: "仙侠流派征文获奖公告",
          desc: "大道三千铸仙侠，流派之王今何在。"
        }
      ],
      List: {},
      seanovel:[],
      homdis:true,
      nosearch:false
    };
  },
  components: {
    'Hottopic': Hottopic,
    'CardList': CardList,
    'Footer': Footer,
    'List': List,
    'novelItem':novelItem
  },
  methods: {
    refresh: function() {
      this.reload();
    },
    getUser() {
      this.user.uid = "",
      this.user.uname = "",
      this.user.uimg = "",
        this.axios({
          method: "get",
          url: "getUser"
        })
          .then(res => {
            this.user.uid = res.data.uid;
            this.user.uname = res.data.username;
            this.user.uimg = res.data.uimg;
          })
          .catch(res => {
            console.log("请求失败");
          });
    },
    clearUser(name) {
      // console.log(name);
      if (name === "3") {
        this.axios({
          method: "get",
          url: "clearUser"
        })
          .then(res => {
            window.location.href = "/";
            // console.log(this.user);
          })
          .catch(res => {
            console.log("请求失败");
          });
      }
    },
    getList() {
      this.axios({
        method: "get",
        url: "/getList"
      })
        .then(res => {
          this.List = res.data;
          // console.log(this.List);
        })
        .catch(res => {
          console.log("请求失败");
        });
    },
    search() {
      this.homdis=false;
      let data={
        value:this.value
      };
      this.axios({
        method: "post",
        url:"/search",
        data:data,
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ],
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
      }).then(res=>{
          // console.log(res.data);
          if(res.data.r==='no_data'){
            this.nosearch=true;
          }
          this.seanovel=res.data.r;
      }).catch(res=>{
        console.log("post请求数据失败");
      })
    }
  },
  mounted: function() {
    this.getUser();
    this.getList();
  }
};
</script>
<style scoped>
/* ul,li,ol{
        list-style: none;
    } */
.container {
  margin: 0 100px;
}
.ivu-menu {
  margin-top: 20px;
}
.ivu-col > span {
  font-size: 2rem;
  position: relative;
  top: 10px;
}
.ivu-col >span a{
  color: #666;
}
.search {
  position: relative;
  text-align: center;
  top: 10px;
}
.search > input {
  outline: none;
  width: 60%;
  height: 35px;
  margin-top: 5px;
}
.search > .btn {
  width: 35px;
  height: 35px;
  background-color: #bf2c24;
  line-height: 35px;
  position: absolute;
  cursor: pointer;
  top: 5px;
  left: 80%;
}
.bookcol {
  padding-left: 10%;
  position: relative;
  top: 10px;
}
.bookcol > div {
  width: 100px;
  height: 35px;
  margin-top: 5px;

  font-size: 16px;
  line-height: 35px;
  display: inline-block;
}
.bookcol > div.collection {
  border: 1px solid #ccc;
  cursor: pointer;
  position: absolute;
  right: 150px;
}
.bookcol > div.collection:hover {
  background-color: #ee4259;
  color: #fff;
  border: none;
}
.bookcol > div.user {
  border: none;
}
.bookcol a {
  color: #333;
  font-size: 14px;
}
.bookcol a:hover {
  color: #666;
}
.firstItem {
  width: 220px;
}
.ivu-menu > .ivu-menu-item {
  color: #fff;
  font-size: 16px;
}
.ivu-menu > li:hover {
  background: #000;
  border-bottom: 2px solid #ee4259;
}
.ivu-menu > .ivu-menu-item > a {
  color: #fff;
}
.ivu-menu-dark {
  background: #3e3d43;
}
.banner {
  margin-top: 2px;
}
.typelist > ul {
  background: #f7f6f2;
}
.typelist > ul > li {
  width: 50%;
  height: 60px;
  display: inline-block;
  text-align: center;
}
.typelist a {
  font-size: 16px;
  color: #333;
  line-height: 60px;
}

.imgList img {
  width: 695px;
  height: 280px;
}
.ivu-carousel {
  margin: 5px 5px 2px 5px;
}
.hottopic {
  margin-top: 5px;
}
.CardList {
  width: 32%;
  margin-left: 5px;
  height: 110px;
  display: inline-block;
}
.ticket {
  display: inline-block;
  margin-right: 40px;
  position: absolute;
  top: 50px;
}
.ivu-dropdown {
  position: absolute;
  /* top: 12px; */
  right: 10px;
  z-index: 999;
}
.uimg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  right: 50px;
}
.user {
  position: absolute;
  left: 250px;
}

.listBox {
  position: relative;
  width: 100%;
  height: 400px;
}
.listBox > .list-two {
  left: 280px;
}
.listBox > .list-three {
  left: 560px;
}
.listBox > .list-four {
  left: 840px;
}
.seabook {
  position: absolute;
  width: 90%;
  top: 100px;
}
.seabook h2 {
  margin-left: 350px;
}
.seabook .novelItem {
  display: inline-block;
  margin: 20px;
}
.foot {
  width: 100%;
  position: absolute;
}
</style>