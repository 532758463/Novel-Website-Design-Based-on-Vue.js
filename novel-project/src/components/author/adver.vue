<template>
    <div class="box">
        <div class="headBox">
            <img v-if="!author.imgUrl" src="../../assets/person.png" class="headImg" alt="">
            <img v-if="author.imgUrl" :src="author.imgUrl" class="headImg" alt="">
            <span class="username">{{author.username}}</span>
            <router-link to="/" class="home">火柴首页</router-link>
        </div>
        <div class="newsBox">
            <span>作家新闻</span>
            <i-table :columns="columns1" :data="data1" :show-header="false" class="table"></i-table>
        </div>
    </div>
</template>
<script>
export default {
    props:['author'],
     data () {
            return {
                columns1: [
                    {
                    
                        key: 'spot',
                        width: '20',
                          render:(h,parms)=>{
                            let url="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2458720419,3434473651&fm=58&bpow=2592&bpoh=1944"
                            return h('img',{
                                attrs:{
                                    src: url
                                },
                                style:{
                                    width: '5px',
                                    height: '5px',
                                    borderRadius:'50%',
                                    
                                }
                            })
                        }
                    },
                    {
                        width:'920',
                        key: 'name'
                    },
                    {
                        
                        key: 'time'
                    }
                ],
                data1: [
                    {
                        name: '二次元频道18年拜年祭征文，获奖名单正式公布！',
                        time: '2019.03.05'
                    },
                    {
                        name: '2019火柴仙侠百万征文大赛',
                     
                        time: '2019.02.04'
                    },
                    {
                        name: '2018阅文体育征文大赛——王者之战获奖名单公布',
                     
                        time: '2018.12.04'
                    },
                    {
                        name: '科幻“希望之星”全国争霸大赛',
                        time: '2019.02.10'
                    },
                    {
                        name: '2019年2月集团渠道报酬发放情况说明',
                        time: '2019.02.14'
                    },
                    {
                        name: '科幻“太阳毁灭前夕”征文大赛',
                        time: '2018.12.04'
                    },
                    {
                        name: '星际宇宙主题征文活动',
                        time: '2019.01.04'
                    },
                    {
                        name: '一帝四皇征文获奖名单',
                        time: '2019.03.04'
                    }
                ]
            }
        }
}
</script>
<style scoped>
.box {
    width: 82%;
    position: absolute;
    /* border: 1px solid #000; */
    right: 6px;
    top: 66px;;
}
    .headBox {
        width: 100%;
        height: 100px;
        background:#E5F7F7;
    }
    .headImg {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        left: 80px;
        top: 10px;
    }
    .username {
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        position: relative;
        top: -40px;
        left: 100px;
        color: #376590;
    }
    .newsBox {
        width: 100%;
        /* border: 1px solid #000; */
        padding: 20px;
    }
    .newsBox>span {
        font-size: 18px;
        font-weight: 500;
    }
    .table {
        margin-top: 7px;
    }
    .home {
        font-size: 16px;
        position: absolute;
        top: 50px;
        left: 185px;
        font-weight: 700;
        color: #376590;
    }
</style>
