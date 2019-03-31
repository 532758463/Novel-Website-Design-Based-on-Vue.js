<template>
  <div>
     <Menu active-name="1"
     @on-select="handBook"
     >
      <MenuItem name="1">
        <Icon type="ios-home"></Icon>专区首页
      </MenuItem>
  

    </Menu>
  </div>
</template>
<script>
export default {
     data(){
       return {

       };
     },
     methods: {
       handBook(name){
         if(name==='1'){
           window.location.href="http://xiaoyang:8080/#/author"
         }
        
       }
     }
};
</script>
<style scoped>
.ivu-menu {
  height: 560px;
  border-left: 1px solid #ccc;
}
</style>
