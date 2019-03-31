<template>
  <div class="mind-book">
    <router-link  @click.native="refresh" :to="{path:'/detail',query: {bid: book.bid}}" class="img-box">
      <img :src="'http://xiaoyang:81/'+book.cover" alt>
    </router-link>
    <div class="desc">
      <h3>
        <router-link @click.native="refresh" :to="{path:'/detail',query: {bid: book.bid}}">{{book.bname}}</router-link>
      </h3>
      <p>
        <!-- 回到那情窦初开的时代，怀风华正茂之心，谱一曲指点江山的赞歌。 -->
        {{book.describe1}}
      </p>
      <router-link to class="left">{{book.author}}</router-link>
      <router-link to class="right">{{book.kinds}}娱乐</router-link>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  props: ["book"],
  methods:{
     refresh: function() {
      this.reload();
    },
  }
};
</script>
<style scoped>
.mind-book {
  width: 332px;
  height: 128px;
  /* background: #ccc; */
  position: relative;
}
.img-box {
  width: 92px;
  height: 126px;
  display: inline-block;
  overflow: hidden;
}
.img-box img {
  width: 92px;
  height: 126px;
}
.img-box img:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-transition: all ease 0.5s;
  transition: all ease 0.5s;
}
.mind-book > .desc {
  display: inline-block;
  position: absolute;
  margin-left: 8px;
  font-size: 13px;
  color: #666;
}
.desc > a {
  position: absolute;
  bottom: -48px;
  color: #999;
}
.desc > p {
  line-height: 24px;
  color: #444;
  letter-spacing: 0.93px;
  height: 48px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  /* white-space: nowrap; */
}
.desc > a.right {
  right: 5px;
  width: 60px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border: 1px solid #ccc;
}
.desc a:nth-child(1) {
  color: #333;
}
.desc a:hover {
  color: #e84848;
}
.desc a.right:hover {
  border: 1px solid#e84848;
}
.desc > p {
  margin-top: 10px;
}
</style>