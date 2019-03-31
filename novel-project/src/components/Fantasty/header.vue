<template>
  <div>
    <ul class="nav">
      <li class="title">
        <Icon type="ios-flame-outline" style="font-size: 25px;color:#FF5722;"></Icon>火柴阅读
      </li>
      <li v-for="(item,index) in type" :key="index">
        <routerLink @click.native="refresh" :to="{path:'/Fantasty',query: {value: item}}">{{item}}</routerLink>
      </li>
      <li class="search">
        <input type="text">
        <button>
          <Icon
            type="ios-search"
            style="font-size: 30px; color:#fff;position: absolute; top: 16px;right: -345px;"
          ></Icon>
        </button>
      </li>
      <li class="right">
        <Dropdown>
          <a href="javascript:void(0)" v-if="!user.uimg">
            <img  src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3909309988,2110782801&fm=173&app=49&f=JPEG?w=218&h=146&s=D60AA2E215718BC002DC3D810300F08A"
              alt >
             用户
          </a>
        <a href="javascript:void(0)" v-if="user.uimg">
            <img v-if="user"
              :src="user.uimg"
              alt 
            >
            <span>{{user.uname}}</span>
        </a>
           <Dropdown-menu slot="list">
                <Dropdown-item name="1">修改资料</Dropdown-item>
                <Dropdown-item name="2">更改密码</Dropdown-item>
                <Dropdown-item name="3">
                  <router-link to="/" style="color:#000;">退出登录</router-link>
                </Dropdown-item>
              </Dropdown-menu>
            <Dropdown-menu slot="list"  v-if="!user">
            <Dropdown-item>登录</router-link></Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </li>
      <li class="right book">
        <router-link to>
          <Icon type="ios-book-outline" style="font-size: 25px;"></Icon>
          <router-link to="/login" v-if="!user.uname">我的书架</router-link>
            <router-link :to="{path:'/Mycollect',query: {uid: user.uid}}" v-if="user.uid">我的书架</router-link>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      type: ["玄幻", "都市", "仙侠", "科幻", "历史"],
      user: {
        uid: "",
        uname: "",
        uimg: ""
      },
    };
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
            this.$emit("uid",this.user);
          })
          .catch(res => {
            console.log("请求失败");
          });
    },
    clearUser(name) {
      console.log(name);
      if (name === "3") {
        this.axios({
          method: "get",
          url: "clearUser"
        })
          .then(res => {
        //    this.refresh();
            // console.log(this.user);
          })
          .catch(res => {
            console.log("请求失败");
          });
      }
    }
  },
  mounted: function(){
      this.getUser();
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
}
.nav {
  background-color: #393d49;

  width: 100%;
  height: 62px;
  line-height: 62px;
}
.nav > li {
  color: rgba(255, 255, 255, 0.7);
  float: left;
  width: 68px;
  height: 60px;
  text-align: center;
}

.nav > li > a {
  font-size: 14px;
}
.nav > li > a:hover {
  color: #fff;
  display: block;
  height: 60px;
  border-bottom: 4px solid #5fb878;
  transition: all 0.5s;
  -webkit-transition: all 0.5s ease-out;
}
.nav > .title {
  font-size: 20px;
  width: 165px;
}
.search {
  position: relative;
}
.search > input {
  width: 180px;
  height: 31px;
  border: none;
  outline: none;
  background: #393d49;
  border-bottom: 1px solid #aaa;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  left: 200px;
}
.search > input:focus {
  border-bottom: 2px solid #fff;
}
.search > button {
  cursor: pointer;
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
.nav > .book {
  left: 1180px;
  width: 100px;
}
.ivu-dropdown {
    width: 100px;
}

</style>
