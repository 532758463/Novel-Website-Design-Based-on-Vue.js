<template>
  <div class="fantasty">
    <Header></Header>
    <img src="https://qidian.qpic.cn/qidian_common/349573/7f689b6db8ad99e6093bae7db9a7d130/0" alt>
    <Row class="margin" span="24" offset="4">
      <i-col>
        <ul class="tnav">
          <li>东方大陆</li>
          <li>王朝争霸</li>
          <li>|</li>
          <li>异世大陆</li>
          <li>高武世界</li>
        </ul>
      </i-col>
      <i-col class="hr">
        <week class="week" :book="novel"></week>
      </i-col>
    </Row>
    <!-- <Carousel class="carousel"></Carousel> -->
    <!-- <Carousel2 class="carousel" :data="data" v-if="data"></Carousel2> -->
    <Carousel2 class="carousel" v-on:novelbook="novelbook"></Carousel2>
    <div class="display">
      <h2>热门书籍</h2>
      <hr>
      <novelItem class="novelItem" :book="item" v-for="(item,ind) in books" :key="ind"></novelItem>
    <foot class="foot"></foot>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Fantasty/header";
import Week from "@/components/Fantasty/week";
import Carousel from "@/components/Fantasty/Carousel";
import Carousel2 from "@/components/Fantasty/Carousel2";
import novelItem from '@/components/novelItem'
import foot from '@/components/footer'
export default {
  inject: ["reload"],
  data() {
    return {
        novel:'',
        books:''
    };
  },
  components: {
    'Header': Header,
    'Week': Week,
    'Carousel': Carousel,
    'Carousel2': Carousel2,
    'novelItem':novelItem,
    'foot':foot
  },
  methods: {
    refresh: function() {
      this.reload();
    },
    novelbook:function(data) {
      this.novel=data;
      this.books=data.slice(0,9);
      // console.log(this.novel);
    }  
  },
  created: function(){
  
      
  },
  mounted: function() {
    
  }


};
</script>

<style scoped>
ul,
li {
  list-style: none;
}
.fantasty {
  position: relative;
}
.fantasty > img {
  width: 100%;
  height: 120px;
}
.margin {
  margin: 20px 100px;
}
.tnav > li {
  float: left;
  margin-right: 40px;
  font-size: 18px;
}
.week {
  position: absolute;
  top: 15px;
  right: 0px;
}
.hr {
  position: relative;
  top: 30px;
  border-top: 1px solid #000;
}
.carousel {
  position: absolute;
  left: 80px;
  top: 240px;
}
.display{
  width: 85.2%;
  /* height: 500px; */
  position: absolute;
  left: 7.4%;
  top: 600px;
}
.display>.novelItem {
  display: inline-block;
  margin: 20px 50px 10px 0;
}
.foot {
  width: 100%;
  /* height: 500px; */
  position: absolute;

}
</style>
