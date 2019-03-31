<template>
    <div  class="card">
        <Card :bordered="false">
            <router-link to=""><img :src="imgUrl" alt=""/></router-link>
        </Card>
    </div>
</template>
<script>
    export default { 
        props:['imgUrl'],
        data(){
            return{

            }
        }  
    }
</script>
<style scoped>
    .ivu-card {
        height: 128px;
    }
    .card img{

        height: 110px;
    }
</style>
