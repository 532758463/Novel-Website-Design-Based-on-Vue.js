<template>
  <div>
    <Top :hidden="hidden" :author="author"></Top>
    <Nav></Nav>
    <!--添加小说的栏目 -->
    <img src="../assets/pen.gif" alt class="pen">
    <i-form ref="formValidate" :model="formValidate" :label-width="290" :rules="ruleValidate">
      <Form-item label="书名" prop="name">
        <i-input v-model="formValidate.name" placeholder="请输入书名"></i-input>
      </Form-item>

      <Form-item label="字数" prop="number">
        <i-input v-model="formValidate.number" placeholder="字数"></i-input>
      </Form-item>
      <Form-item label="类型" prop="type">
        <i-select v-model="formValidate.type" placeholder="请选择小说类型">
          <i-option v-for="item in novelList" :key="item" :value="item">{{item}}</i-option>
        </i-select>
      </Form-item>
      <Form-item label="封面上传:">
        <upload2 v-on:imgPath="imgPath"></upload2>
      </Form-item>
      <Form-item label="介绍" prop="desc">
        <i-input
          v-model="formValidate.desc"
          type="textarea"
          style="width: 300px;"
          placeholder="请输入..."
        ></i-input>
      </Form-item>
      <Form-item>
        <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
        <i-button type="primary" style="margin-left: 8px" @click="handleReset('formValidate')">重置</i-button>
      </Form-item>
    </i-form>
  </div>
</template>
<script>
import Top from "@/components/author/top";
import Book from "@/components/author/book";
import Nav from "@/components/author/nav";

import Upload2 from "@/components/author/upload2";
export default {
  data() {
    return {
      formValidate: {
        name: "",
        pename: "",
        type: "",
        number: "",
        desc: "",
        path: "",
        aid: ""
      },
      author: {
        username: "",
        imgUrl: "",
        aid: ""
      },
      hidden: true,
      novelList: [
        "玄幻",
        "奇幻",
        "仙侠",
        "武侠",
        "都市",
        "现实",
        "军事",
        "历史",
        "游戏",
        "体育",
        "科幻",
        "灵异",
        "女生网",
        "二次元"
      ],
      ruleValidate: {
        name: [
          { required: true, message: "书名不能为空", trigger: "blur" },
          {
            type: "string",
            max: 15,
            message: "不能超过15个字符",
            trigger: "blur"
          }
        ],

        type: [{ required: true, message: "类型不能为空", trigger: "change" }],
        date: [
          {
            required: true,
            type: "date",
            message: "日期不能为空",
            trigger: "change"
          }
        ],
        number: [{ required: true, message: "字数不能为空", trigger: "blur" }],
        desc: [{ required: true, message: "描述不能为空", trigger: "blur" }]
      }
    };
  },
  components: {
    Top: Top,
    Nav: Nav,
    Upload2: Upload2
  },
  methods: {
    imgPath(url) {
      this.formValidate.path = url;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        console.log(this.formValidate);
        //    return;
        if (valid) {
          let This = this;
          this.axios({
            method: "post",
            url: "/addNovel",
            data: This.formValidate,
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
          })
            .then(response => {
              if (response.data.r === "success") {
                this.$Message.success("添加成功");
                setTimeout(() => {
                  window.location.href = "http://xiaoyang:8080/#/author";
                }, 1000);
              }
            }).catch(response => {
              console.log("请求失败");
              this.$Message.error("表单验证失败!");
            });
        } 
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getAuthor() {
      this.axios({
        method: "get",
        url: "/getAuthor"
      })
        .then(res => {
          // console.log(res.data);
          this.author.username = res.data.aname;
          this.author.imgUrl = res.data.aimg;
          this.author.aid = res.data.aid;
          this.formValidate.aid = res.data.aid;
          this.formValidate.pename = res.data.aname;
        })
        .catch(res => {
          console.log("get请求失败");
        });
    }
  },
  mounted: function() {
    this.getAuthor();
  }
};
</script>



<style scoped>
.right {
  width: 1124px;
  position: absolute;
  top: 70px;
  left: 240px;
}
.ivu-form {
  position: absolute;
  top: 100px;
  left: 270px;
}
.ivu-form .ivu-form-item-label {
  font-size: 18px;
}
.pen {
  position: absolute;
  top: 200px;
  right: 100px;
}
</style>
