<template>
    <div>
        <label class="header" for="imgNovel">
            <img src="http://www.xbiquge.la/files/article/image/10/10489/10489s.jpg" style="width:104px;height:140px;" alt="" id="imgCover">
        </label>
                <input type="file" multiple @click="upload()" name="images" id="imgNovel" style="display:none">
                <input type="hidden" value="" id="imgPath" name='images'>
    </div>
</template>
<script>
export default {
   data () {
            return {
              
               
            }
        },
    methods: {
        upload(){
               let imgNovel = document.querySelector('#imgNovel');
    //当选择文件时，value值改变会触发change事件
    imgNovel.onchange = function () {
        //获取选中的文件信息：文件内容
        console.log(this.files[0]);
        let This = this;
        //使用ajax发送图片到服务器
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://xiaoyang:81/coverImg');
        // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencode')
        //创建一个表单数据对象
        let formdata = new FormData();

        formdata.append('images', This.files[0]); //往表单追加input 名字，值
        //formdata.append('username', '晓晓'); //这里相当于 input：text,nmae=username,value=晓晓
        // console.log(formdata)

        xhr.send(formdata);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                
                document.querySelector('#imgCover').src ='\\'+ data.path;
                document.querySelector('#imgPath').value ='\\'+data.path;   
            }
        }
    }
        }
    }
}
</script>