<template>
    <div class="bookshell">
       <Header></Header>
       <Collect class="collect" :books="books"></Collect>
 
    </div>
</template>
<script>
import Header from '@/components/user/pheader'
import Collect from '@/components/user/collect'
export default {
    data(){
        return{
            books:[]
        }
    },
    components: {
        'Header':Header,
        'Collect':Collect
    },
    methods: {
        getCollect() {
            let uid=this.$route.query.uid;
            let user={
                uid:uid
            };
            // console.log(uid);
            this.axios({
                method:'post',
                url:'/getCollect',
                data: user,
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
                this.books=res.data.r;
                console.log(res.data.r);
            }).catch(res=>{
                console.log("请求失败")
            })
        }
    },
    mounted: function(){
        this.getCollect();
    }
}
</script>
<style scoped>
.bookshell {
    position: relative;
}
.collect {
    width: 80%;
    height: 500px;
    display: block;
    /* border: 1px solid #666; */
    position: absolute;
    left: 10%;
    top: 90px;
}
.foot {
    position: absolute;
    top: 1000px;
    /* bottom: 10px; */
}
</style>
