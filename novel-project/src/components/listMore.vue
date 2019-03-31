<template>
  <div class="box">
    <ul v-if="list">
      <li>
        <h2>{{list[0].title}}</h2>
        <router-link to class="right">更多></router-link>
      </li>
      <li>
        <div class="info">
          <span>1</span>
          <router-link
            :to="{path:'/detail',query: {bid: list[0].bid}}"
            class="black"
          >{{list[0].bname}}</router-link>
          <p>
            <router-link to>{{list[0].author}}</router-link>
          </p>
          <p>
            <router-link to>[{{list[0].kinds}}]</router-link>
          </p>
          <router-link  @click.native="refresh" :to="{path:'/detail',query: {bid: list[0].bid}}" class="right">
            <img :src="'http://xiaoyang:81/'+list[0].cover" alt>
          </router-link>
        </div>
      </li>
      <li v-for="(item,ind) in list" :key="ind" v-if="ind+1<list.length">
        <span>{{ind+2}}</span>
        <router-link
         @click.native="refresh" :to="{path:'/detail',query: {bid: list[ind+1].bid}}"
          class="black"
        >{{list[ind+1].bname}}</router-link>
        <!-- <router-link to="" class="right">{{item}}</router-link> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["list"],
  inject: ["reload"],
  methods: {
    refresh: function() {
      this.reload();
    }
  }
};
</script>
<style scoped>
ul,
li,
ol {
  list-style: none;
}
.box {
  width: 21%;
  /* height: 597px; */
  /* background: #eee; */
}
.box > ul h2 {
  display: inline-block;
}
.box > ul li {
  height: 31px;
  line-height: 31px;
  border-bottom: 1px dotted #ccc;
}
.box > ul li:nth-child(1) {
  border-bottom: 1px solid #000;
}
.box > ul > li span {
  display: inline-block;
  width: 15px;
  height: 15px;
  font-size: 16px;
  font-weight: 400;
  color: #a9aeb7;
  line-height: 15px;
  text-align: center;
  margin-right: 10px;
}
.box > ul > li:nth-child(2) {
  height: auto;
  position: relative;
}
.box > ul > li:nth-child(2) span {
  background: #ee4259;
  color: #fff;
}
.box > ul > li:nth-child(2) img {
  width: 67px;
  height: 88px;
  position: absolute;
  right: 10px;
  top: 3px;
  border-radius: 5%;
}
.box > ul > li:nth-child(3) > span {
  background: #fc7403;
  color: #fff;
}
.box > ul > li:nth-child(4) > span {
  background: #f8cc1c;
  color: #fff;
}
.box > ul a {
  color: #b3b3b3;
  font-size: 14px;
}

.box > ul a.black {
  color: #1a1a1a;
}
.box > ul a:hover {
  color: #ee4259;
}

.box > ul li > a.right {
  position: relative;
  left: 50%;
}
.box > ul > li:nth-child(1) > a.right {
  left: 60%;
}
.box > ul a.right:hover {
  color: #b3b3b3;
}
.info p {
  text-indent: 30px;
}
</style>