<template>
<div>
    
    <Upload
        ref="upload"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        name="images"
        type="drag"
        action="http://xiaoyang:81/coverImg"
        style="display: inline-block;width:108px;">
        <div style="width: 108px;height:128px;line-height: 108px;">
            <Icon type="ios-camera" size="50" v-if="visible"></Icon>
            <img :src="imgUrl" alt="" v-if="!visible" style="width: 108px;height:128px;">
        </div>
    </Upload>
   
    </div>
</template>
<script>
    export default {
        data () {
            return {
                visible: true,
                imgUrl: ''
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                let formdata = new FormData();
                formdata.append('images',file.raw);
                 let _this=this;
                  let config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                  };
            	_this.axios.post("http://xiaoyang:81/coverImg",formdata,config) 
					.then(response => {
                        this.imgUrl = this.url1+file.response.path;
                        this.$emit('imgPath',file.response.path);  //子组件向父组件传值（将图片路径传递给父组件）
                        this.visible = false;
					}).catch(response => {
						console.log("post发送Ajax请求失败");
					})
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
