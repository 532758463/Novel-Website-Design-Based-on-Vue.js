<template>
<div>
    <Header :hidden="hidden" :author="author"></Header>
     <Menu active-name="1"
     @on-select="handBook"
     >
      <MenuItem name="1">
        <Icon type="ios-home"></Icon>专区首页
      </MenuItem>
      <MenuItem name="2">
        <Icon type="md-document"/>作品管理
      </MenuItem>
    </Menu>
    <Adver  v-if="visible==='1'" :author="author"></Adver>
    <Book class="right" v-if="visible==='2'" :info="info"></Book>
 </div>
</template>
<script>
import Header from '@/components/author/top'
import Book from '@/components/author/book'
import Adver from '@/components/author/adver'
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
                }
            }
        },
        components:{
            'Header': Header,
            'Book': Book,
            'Adver':Adver,
            
        },
        methods: {
            handBook (name) {
                // console.log(name);
                if(name==='1'){
                    this.visible='1';
                }
                if(name==='2'){
                    this.visible='2';
                     this.axios({
                    method: 'post',
                    url:'/novelBooks',
                    data: this.author,
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
                }).then(response=>{
                    // console.log(response.data.r);
                    this.info = response.data.r;
                }).catch(response=>{
                })
                }
            },
        getAuthor(){
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
        }
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
</style>