<template>
  <div class="box">
    <img v-if="!imgUrl" src="http://static.zongheng.com/upload/cover/d3/f4/d3f4196a9389473a4d15b4a36c2a5a21.jpeg"/>
    <img v-if="imgUrl" :src="imgUrl" alt>
    <div class="bookInfo">
      <h1>轮回剑主</h1>
      <span>作者</span>
      <router-link to>风起夏天</router-link>
      <div class="type">
        <span>类型</span>
        <router-link to>东方玄幻</router-link>
      </div>
      <p>剑断生死轮回，逆乱阴阳乾坤。问苍茫大地谁主沉浮，看无背景少年如何站上巅峰笑看风云。</p>
    </div>
    <ul class="imgList" ref="ul" v-if="imgList">
      <li v-for="(item,ind) in imgList" :key="ind" :name="ind" class>
        <router-link to>
          <img :src="item" alt>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
let index = 0;
export default {
  data() {
    return {
      imgList: [
        "http://static.zongheng.com/upload/cover/d3/f4/d3f4196a9389473a4d15b4a36c2a5a21.jpeg",
        "http://static.zongheng.com/upload/cover/2016/12/1482306024388.jpg",
        "http://static.zongheng.com/upload/cover/b4/e1/b4e1c30d49155c913bb4089a0f99a18f.jpeg",
        "http://static.zongheng.com/upload/cover/12/9a/129afbace05eeba328c13e27ed36d9d9.jpeg",
        "http://static.zongheng.com/upload/cover/2016/07/1467708575259.jpg"
      ],
      imgUrl: ""
    };
  },
  methods: {
    changeImg() {
      let img = this.$refs.ul.children;
      for (var i = 0, len = img.length; i < len; i++) {
        img[i].className = "";
      }
      img[index].className = "active";
      this.imgUrl = this.imgList[index];
    },
    carousel() {
      let This = this;
      
    //   console.log(this.$refs.ul.children);
      let img = this.$refs.ul.children;
    //   console.log(img.length);
       img[0].className = "active";
      setInterval(() => {
        index++;
        if (index >= img.length) {
          index = 0;
        }
        This.changeImg();
      }, 3000);
    },
    getBooks() {
      this.axios({
        method: "get",
        url: "/getList"
      })
        .then(res => {
           let kinds=this.$route.query.value;
        })
        .catch(res => {
          console.log("请求失败");
        });
    }
  },
  mounted: function() {
    this.carousel();
    this.getBooks();
  }
};
</script>
<style scoped>
.box {
  width: 900px;
  height: 350px;
  border: 1px solid #ccc;
}
.box > img {
  width: 230px;
  height: 310px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: absolute;
  left: 20px;
  top: 20px;
}
.bookInfo {
  position: absolute;
  width: 620px;
  height: 202px;
  /* border: 1px solid #000; */
  left: 270px;
  top: 20px;
}
.bookInfo h1 {
  margin-bottom: 10px;
}
.bookInfo span {
  color: #999;
  font-size: 14px;
}
.bookInfo a {
  color: #333;
  font-size: 14px;
}
.type {
  position: relative;
  top: -21px;
  left: 150px;
}
.bookInfo p {
  margin-top: 20px;
  font-size: 16px;
}
.imgList {
  width: 550px;
  height: 104px;
  border: 1px solid #000;
  position: absolute;
  top: 230px;
  left: 270px;
}
.imgList > li {
  float: left;
  width: 77px;
  height: 97px;
  margin-right: 25px;
  padding-top: 2px;
}
.imgList > li img {
  width: 77px;
  height: 97px;
  opacity: 0.5;
}
.imgList > .active img {
  opacity: 1;
}
</style>
