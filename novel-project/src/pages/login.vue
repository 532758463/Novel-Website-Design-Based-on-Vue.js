<template>
  <div id="LoginIn">
      <div :class="{ph:true,hasError:nameerr}">用户名不存在</div>
      <div :class="{ph:true,hasError:pwderr}">密码错误</div>
      <div class="container">
        <div class="select">
          <span>登录</span>
            ·
          <span>注册</span>
        </div>
        <form action="" id="login" name="login">
          <div class="info info1">
            <img src="../assets/usename.png" alt="">
            <input type="text" name="username" :placeholder="ph1" v-model="formdata.username">
          </div>
          <div class="info info2">
            <img src="../assets/pwd.png" alt="">
            <input type="password" name="pwd"  :placeholder="ph2" v-model="formdata.pwd">
          </div>
          <div class="rem">
            <input type="checkbox" name="rem">记住我
            <span>登录遇到问题？</span>
          </div>
          <button type="button" class="login" @click="formsubmit">登录</button>
        </form>
        <div class="other">
          <span>
            社交账号登录
          </span>
        </div>
        <div class="icon">
          <img src="../assets/weibo.png" alt="">
          <img src="../assets/weixin.png" alt="">
          <img src="../assets/QQ.png" alt="">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "LoginIn",
  data() {
    return {
        ph1:'用户名',
        ph2:'密码',
        nameerr:false,
        pwderr:false,
        formdata:{
            username:'',
            pwd:'',
        }
    };
  },
  methods:{
    formsubmit:function () {
      if (this.formdata.username=='') {
        this.ph1='请输入用户名';
        return;
      }
      if(this.formdata.pwd==''){
        this.ph2='请输入密码';
        return;
      }
      let _this=this;
      _this.nameerr=false;
      _this.pwderr=false;
      _this.axios({
        method: "POST",
        url: "/login",
        data:_this.formdata,
        transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret;
              }],
        headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
      })
      .then(res => {
        console.log(res.data.r);
         if(res.data.r=='u_not'){
          _this.pwderr=false;
          _this.nameerr=true;
          return;
         }
         if(res.data.r=='p_err'){
          _this.nameerr=false;
          _this.pwderr=true;
           return;
         }
         if(res.data.r=='ok'){
           _this.nameerr=false;
           _this.pwderr=false;
          console.log(res.data);
          window.location.href='/';
         }
           
      })
      .catch(res => {
        console.log("请求失败");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ph{
  width: 380px;
  position: relative;
  top: 100px;
  left: 482px;
  text-align: center;
  overflow: hidden;
  border-radius: 3px;
  height: 0px;
  line-height: 30px;
  color: #d45555
}

@keyframes myfirst
{
	0%   {height: 0px;border: 2px solid #d45555;}
	25%  {height: 30px;}
	50%  {height: 30px;}
	75%  {height: 30px;}
	100% {height: 0px;border: 2px solid #d45555;}
}

.hasError{
    animation: myfirst 5s;
}

#LoginIn {
  width: 100%;
  height: 700px;
  background-color: #f1f1f1;
}

* {
  padding: 0;
  margin: 0;
}

.container {
  width: 405px;
  height: 500px;
  box-shadow: 0px 0px 14px #cecece;
  border-radius: 3px;
  background-color: #fff;
  position: relative;
  border: 1px solid #f1f1f1;
  margin: 0px auto;
  top: 100px;
}
.select {
  font-size: 20px;
  color: #cecece;
  width: 250px;
  margin: 50px auto;
  text-align: center;
}
.select > span:first-child {
  color: #ea6f5a;
  font-weight: 700;
  border-bottom: 2px solid #ea6f5a;
}
.select span:hover {
  border-bottom: 2px solid #ea6f5a;
}
.select span {
  display: inline-block;
  width: 50px;
  text-align: center;
  margin: 0 15px;
 
}

.info {
  margin: 0 auto;
  width: 302px;
  height: 50px;
  border: 1px solid #cecece;
  position: relative;
  background-color: #f1f1f1;
}
.info1{
    border-radius: 4px 4px 0 0;
}
.info2 {
  margin-top: -1px;
  border-radius: 0 0 4px 4px;
}
.info input {
  width: 260px;
  height: 50px;
  border: none;
  outline: none;
  margin: 0 0 0 40px;
  background-color: #f1f1f1;
}
.info img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 16px;
}

.rem {
  color: #cecece;
  font-size: 13px;
  width: 300px;
  margin: 20px 0 20px 54px;
}
.rem > span {
  float: right;
  cursor: pointer;
}

.login {
  width: 300px;
  height: 50px;
  border-radius: 25px;
  border: none;
  background-color: #3194d0;
  margin-left: 50px;
  outline: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.login:hover {
  background-color: #187cb7;
}

.other {
  position: relative;
  width: 300px;
  margin: 30px auto;
  text-align: center;
  color: #b5b5b5;
  font-size: 12px;
}
.other span:before {
  content: "";
  border-top: 1px solid #b5b5b5;
  display: block;
  position: absolute;
  width: 60px;
  top: 8px;
  left: 30px;
}

.other span:after {
  content: "";
  border-top: 1px solid #b5b5b5;
  display: block;
  position: absolute;
  width: 60px;
  top: 8px;
  right: 30px;
}
.icon{
  margin-left: 100px;
}
.icon img{
  width: 30px;
  height: 30px;
  margin-right: 50px;
}
</style>