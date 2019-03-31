<template>
    <div>
     <router-link to="/addNovel"><i-button type="primary" class="add">创建作品</i-button></router-link>   
    <Table border :columns="columns12" :data="info">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" 
            style="margin-right: 5px" @click="show(index)">
                章节
            </Button>
            <Button type="error" size="small" @click="remove(index)"><router-link to="" style="color:#fff">删除</router-link> </Button>
        </template>
    </Table>
    </div>
</template>
<script>
    export default {
        props: ['info'],
        data () {
            return {
                columns12: [
                    {
                        title: '书名',
                        key: 'bname',
                         width: 150,
                         align: 'center'
                    },
                    {
                        title: '作者',
                        key: 'author',
                        width: 150,
                        align: 'center'
                    },
                    {
                        title: '描述',
                        key: 'describe1',
                        
                    },
                    {
                        title: '类型',
                        key: 'kinds',
                        width: 80,
                        align: 'center'
                    },
                      {
                        title: '封面',
                        key: 'cover',
                        width: 150,
                        align: 'center',
                        render:(h,parms)=>{
                            let url="http://xiaoyang:81/"+parms.row.cover;
                            return h('img',{
                                attrs:{
                                    src: url
                                },
                                style:{
                                    width: '70px',
                                    height: '90px',
                                    paddingTop:'5px'
                                }
                            })
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                bid:'',
                book:{
                    bid:''
                }
            }
        },
        methods: {
            show (index) {
                this.bid=this.info[index].bid;
                this.$router.push({path:'/chapter',query:{bid:this.bid}});
            },
            remove (index) {
                let This=this;
                this.book.bid=this.info[index].bid;
                this.axios({
                    method:'post',
                    url:'/delete',
                    data:this.book,
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
                if(res.data.r==='success'){
                   This.info.splice(index, 1);
                }
            }).catch(res=>{
                console.log("删除失败")
            })    
            }
        }
    }
</script>
<style scoped>
    .add {
      margin-left: 1000px;
    }
</style>
