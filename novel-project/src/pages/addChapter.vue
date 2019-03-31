<template>
<div>
    <Header :hidden="hidden" :author="author"></Header>
    <div class="novelBox">
      <i-form ref="formNovel" :model="formNovel" :label-width="100" :rules="rule">
        <Form-item label="章节标题" prop="sname">
            <i-input v-model="formNovel.sname" type="text"></i-input>
        </Form-item>
        <Form-item label="章节内容" prop="content">
            <UEditor v-model="formNovel.content" v-on:getContent="getContent"></UEditor>
        </Form-item>
          <Form-item>
            <i-button type="primary" @click="handleSubmit('formNovel')">提交</i-button>
            <i-button type="primary" @click="handleReset('formNovel')" style="margin-left: 8px">重置</i-button>
        </Form-item>
    </i-form>
    </div>
 </div>
</template>
<script>
import Header from '@/components/author/top'
import UEditor from '@/components/author/UEditor'
    export default {
        data () {
            return {
               visible: '1',
                info:[],
                hidden:true,
                author:{
                    username:'',
                    imgUrl:'',
                    aid:''
                },
                formNovel:{
                    sname:'',
                    content:'',
                    bid:''
                },
                rule: {
                    sname: [
                            { required: true, message: '章节标题不能为空', trigger: 'blur' },
                        { type: 'string', max: 15, message: '不能超过15个字符', trigger: 'blur' },
                    ]
                 }
            }
        },
        components:{
            'Header': Header,
            'UEditor': UEditor
            
        },
        methods: {
        getAuthor(){
            this.axios({
            method: 'get',
            url:'/getAuthor',
        }).then(res=>{
            this.author.username=res.data.aname;
            this.author.imgUrl=res.data.aimg;
            this.author.aid = res.data.aid;
        }).catch(res=>{
            console.log("get请求失败");
        })
        },
        // 获取富文本编辑器里面的内容
        getContent:function(content){
            // console.log(content)
            this.formNovel.content=content;
        },
             handleSubmit (name) {
                this.formNovel.bid=this.$route.query.bid;
                this.$refs[name].validate((valid) => {
                    if(this.formNovel.content===''){
                        this.$Message.warning('章节标题或者章节内容不能为空');
                         return;
                    }
                    if (valid) {
                    let This=this;
                     	this.axios({
						method: "post",
                    url:  "/addChapter",
                    data: This.formNovel,
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
                        .then (response =>{
                            console.log("post请求成功");
                            if(response.data.r==='ok'){
                               this.$router.push({path:'/chapter',query:{bid:this.formNovel.bid}});;
                            }
                        })
                        .catch (response => {
                            console.log("请求失败");
                        })
                       this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
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
.novelBox{
    width: 80%;
    position: relative;
    top: 30px;
    left: 120px;
}
</style>