<template>
    <div>
         <img src="../../assets/right.png" alt="" class="true" v-if="active">
          <img src="../../assets/err.png" alt="" class="true" v-if="err">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom">
        <FormItem prop="user">
            <Input type="text" v-model="formCustom.user" placeholder="请输入您的昵称" @on-blur="check()">
                <Icon type="ios-person-outline" slot="prepend" size="20"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="passwd">
            <Input type="password" v-model="formCustom.passwd" placeholder="请输入您的密码">
                <Icon type="ios-lock-outline" slot="prepend" size="20"></Icon>
               
            </Input>
            
        </FormItem>
       
        <FormItem prop="pwdcheck">
            <Input type="password" v-model="formCustom.pwdcheck" placeholder="请再次输入密码">
                <Icon type="ios-lock-outline" slot="prepend" size="20"></Icon>
            </Input>
        </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit(formCustom)" class="btn">注册</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formCustom: {
                    user: '',
                    passwd: '',
                    pwdcheck:''
                },
             ruleCustom: {
                    passwd: [
                         { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少为6位', trigger: 'blur' }
                    ],
                    pwdcheck:[
                       { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码至少为6位', trigger: 'blur' }
                        ],
                    user: [
                       { required: true, message: '请输入您的笔名', trigger: 'blur' }
                    ]
                },
                active: false,
                err:false 
        }
    },
    methods:{
        check() {
            if(this.formCustom.user===''){
                return;
            }
            this.axios({
                method:'post',
                url:'/check',
                data:this.formCustom,
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
                // console.log(res.data.r);
                if(res.data.r==='repeate'){
                    this.$Message.error('笔名重复，请重新输入');
                    this.active=false;
                    this.err=true;
                    return;
                }
                if(res.data.r==='ok'){
                    this.active=true;
                    this.err=false;
                    return;
                }
            }).catch(res=>{
                console.log("get请求失败");
            })
        },
        handleSubmit(formdata){
            if(formdata.passwd!==formdata.pwdcheck){
                this.$Message.error('密码不一致，请重新确认密码');
                return;
            }
            this.axios({
                method:'post',
                url:'/regist',
                data:formdata,
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
                    this.$Message.success('注册成功,请登录！！！');
                    setTimeout(()=>{
                        window.location.reload();
                    },1000);
                }
            }).catch(res=>{

            })
        }
    }
}
</script>
<style scoped>
    .btn {
        width: 100%;

    }
    .true {
        position: absolute;
        top: 145px;
        right: 25px;
        width: 25px;
        height: 25px;
        z-index: 999;
    }
</style>

