<template>
  <div class="box" v-if="data">
    <img
      v-if="!data"
      src="http://static.zongheng.com/upload/cover/d3/f4/d3f4196a9389473a4d15b4a36c2a5a21.jpeg"
    >
    <img v-if="data" :src="books.imgUrl" alt>
    <div class="bookInfo">
      <router-link :to="{path:'/detail',query: {bid: books.bid}}"> <h1> {{books.bname}}</h1></router-link> 
      <span>作者</span>
      <router-link to>{{books.author}}</router-link>
      <div class="type">
        <span>类型</span>
        <router-link to>{{books.kinds}}</router-link>
      </div>
      <!-- <p>剑断生死轮回，逆乱阴阳乾坤。问苍茫大地谁主沉浮，看无背景少年如何站上巅峰笑看风云。</p>
      -->
      <p>{{books.desc}}</p>
    </div>
    <ul class="imgList" ref="ul" v-if="data">
      <li v-for="(item,ind) in data" :key="ind" class>
        <router-link :to="{path:'/detail',query: {bid: books.bid}}">
          <img :src="'http://xiaoyang:81/'+item.cover" alt>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
let index = 0;

export default {
  // props: ["data"],
  inject:['reload'],
  data() {
    return {
      imgList: [
        "http://static.zongheng.com/upload/cover/d3/f4/d3f4196a9389473a4d15b4a36c2a5a21.jpeg",
        "http://static.zongheng.com/upload/cover/2016/12/1482306024388.jpg",
        "http://static.zongheng.com/upload/cover/b4/e1/b4e1c30d49155c913bb4089a0f99a18f.jpeg",
        "http://static.zongheng.com/upload/cover/12/9a/129afbace05eeba328c13e27ed36d9d9.jpeg",
        "http://static.zongheng.com/upload/cover/2016/07/1467708575259.jpg"
      ],
      books: {
        bid:"",
        imgUrl: "",
        bname: "",
        author: "",
        kinds: "",
        desc: ""
      },
      elements: '',
      data: "",
      timer:'',
      timer2:''
    };
  },
  methods: {
    getBooks() {
      this.axios({
        method: "get",
        url: "/getList"
      })
        .then(res => {
          let kinds = this.$route.query.value;
          if (kinds === "玄幻") {
          // console.log(res.data.fantasty);
          this.$emit("novelbook",res.data.fantasty);
          this.data = res.data.fantasty.slice(3,8);
          // console.log( this.data);
          return;
          }
          if (kinds==="仙侠"){
             this.$emit("novelbook",res.data.xian);
             this.data = res.data.xian.slice(0, 5);
             return;
          }
          if(kinds==="都市") {
            this.$emit("novelbook",res.data.city);
            this.data = res.data.city.slice(0,5);
            return;
          }
        })
        .catch(res => {
          console.log("请求失败");
        });
    },
    getInfo(){      
            // console.log(img);
            if (!this.data) {
              this.reload();
              return;
            }
            let img =this.$refs.ul.children;
              img[0].className = "active";
               this.books.bid=this.data[0].bid;
              this.books.imgUrl ="http://xiaoyang:81/" + this.data[0].cover;
              this.books.bname = this.data[0].bname;
              this.books.author = this.data[0].author;
              this.books.desc = this.data[0].describe1;
              this.books.kinds = this.data[0].kinds;
            this.timer=setInterval(() => {
             index++;
              if (index >= img.length) {
                index = 0;
              }
              // This.changeImg(img);
              for (var i = 0, len = img.length; i < len; i++) {
                img[i].className = "";
              }
              img[index].className = "active";
              this.books.imgUrl ="http://xiaoyang:81/" + this.data[index].cover;
              this.books.bname = this.data[index].bname;
              this.books.author = this.data[index].author;
              this.books.desc = this.data[index].describe1;
              this.books.kinds = this.data[index].kinds;
               this.books.bid=this.data[index].bid;
            }, 2000);
          // });
    }
  },
  created: function() {this.getBooks();},
  mounted: function() {
    clearInterval(this.timer);
     clearTimeout(this.timer2);
      this.$nextTick(() => {
    this.timer2=setTimeout(() => {
          this.getInfo();
        }, 0);
      });
    // }
  },
  beforeDestroy: function(){
     clearInterval(this.timer);
     clearTimeout(this.timer2);
  }
};
</script>
<style scoped>
.box {
  width: 900px;
  height: 350px;
  /* border: 1px solid #ccc; */
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
  line-height: 30px;
  color: #444;
  letter-spacing: 0.93px;
  height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.imgList {
  width: 550px;
  height: 104px;
  /* border: 1px solid #000; */
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
