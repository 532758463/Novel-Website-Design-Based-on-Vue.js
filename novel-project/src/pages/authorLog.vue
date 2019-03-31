<template>
    <div>
        <Top :hidden="hidden"></Top>
        <img src="@/assets/timg.jpg" alt="" class="bg">
        <div class="formbox">
          <div class="select">
          <span :class="{active:isActive}" @click="select(1)">登录</span>
          <span :class="{active:!isActive}" @click="select(2)">注册</span>
        </div>
        <!-- 登录界面 -->
        <div :class="{ph:true,hasError:nameerr}">用户名不存在</div>
      <div :class="{ph:true,hasError:pwderr}">密码错误</div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" v-if="isActive">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="其输入您的昵称">
                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入您的密码">
                <Icon type="ios-lock-outline" slot="prepend" size="20"></Icon>
            </Input>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" class="btn">登录</Button>
        </FormItem>
    </Form>
    
      <!-- 注册界面 -->
    <Reg v-if="!isActive"></Reg>
    </div>
  </div>
    </div>
    </div>
</template>
<script>
import Top from '@/components/author/top'
import Reg from '@/components/author/register'
export default {
    data(){
        return {
            hidden:false,
            isActive: true,
            nameerr:false,
            pwderr:false,
            formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入您的笔名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少为6位', trigger: 'blur' }
                    ]
                },
                ruleCustom: {
                    passwd: [
                         { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少为6位', trigger: 'blur' }
                    ],
                    pwd:[
                       { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少为6位', trigger: 'blur' }
                        ],
                    user: [
                       { required: true, message: '请输入您的笔名', trigger: 'blur' }
                    ]
                }
        }
    },
    components: {
        'Top':Top,
        'Reg':Reg
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                  this.login();
                 this.$Message.success('Success!');
              } else {
                  this.$Message.error('Fail!');
                }
              })
          },
        select(value){
            if(value===1){
             this.isActive=true;
           }else{
             this.isActive=false;
           }
          },
        login() {
            let _this=this;
            this.nameerr=false;
            this.pwderr=false;
            this.axios({
            method: 'POST',
            url: '/alogin',
            data: this.formInline,
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
                if(res.data.r=='a_not'){
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
                window.location.href='http://xiaoyang:8080/#/author';
                }
              }).catche(res=>{
                  console.log("请求失败");
              })
          }
        }
}
</script>
<style scoped>
.bg {
    width: 30%;
    height: 330px;
    position: relative;
    top: 100px;
    left: 80px;
}
.formbox {
    width: 400px;
    height: 440px;
    border: 1px solid #E6E6E6;
    position: absolute;
    top: 90px;
    right: 250px;
    padding: 0 20px;
  }
.select {
  font-size: 20px;
  color: #cecece;
  width: 250px;
  margin: 50px auto;
  text-align: center;
}
.select span[data-v-efbb1936] {
  
  display: inline-block;
  width: 50px;
  height: 40px;
  cursor:pointer;
  text-align: center;
  margin: 0 15px;
  
}
.select > span.active {
  color: #50A8FF;
  font-weight: 700;
  border-bottom: 2px solid #50A8FF;
}

.btn {
  width: 358px;
 
}
.ivu-form-item-content {
    z-index: 2;
}
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
    position: absolute;
    top: 5px;
    left: 10px;
    animation: myfirst 5s;
}
</style>

