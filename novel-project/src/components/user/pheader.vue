<template>
  <div>
    <ul class="nav">
      <li class="title">
        <Icon type="ios-flame-outline" style="font-size: 40px;color:#FF5722;"></Icon>个人中心
      </li>
      <li v-for="(item,index) in type" :key="index" @click="getIndex(index)" ref="li">
        <!-- :to="{path:'/',query: {value: item}}" -->
        <routerLink @click.native="refresh" to="">{{item}}</routerLink>
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
    </ul>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      type: ["我的首页", "我的书架", "消息中心"],
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
        //    this.refresh();
            // console.log(this.user);
          })
          .catch(res => {
            console.log("请求失败");
          });
      }
    },
    getIndex(index) {
           let li= this.$refs.li;
          //  console.log(index);
          if(index===0){
            window.location.href="/";
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
  /* color: rgba(255, 255, 255, 0.7); */
  color: #fff;
}
.nav {
  background-color: #3e3d43;
  width: 100%;
  height: 82px;
  line-height: 82px;
  padding-left: 200px;
}
.nav > li {
  color: rgba(255, 255, 255, 0.7);
  float: left;
  width: 80px;
  height: 82px;
  text-align: center;
  margin-left: 50px;
}

.nav > li > a {
  font-size: 16px;
}
/* .nav > li > a:hover {
  color: #fff;
  display: block;
  height: 60px;
  border-bottom: 4px solid #5fb878;
  transition: all 0.5s;
  -webkit-transition: all 0.5s ease-out;
} */
.nav > .title {
  font-size: 20px;
  width: 165px;
  color: #fff;
}

.right {
  position: absolute;
  left: 1000px;
}
.right a {
  font-size: 14px;
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

.ivu-dropdown {
    width: 100px;
}

</style>
