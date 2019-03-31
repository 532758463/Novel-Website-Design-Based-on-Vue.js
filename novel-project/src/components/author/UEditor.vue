<template>
  <div>
    <div id="editor" class="editor"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editor',
  data() {
      return {
          formArticle:{
              content:''
          }
      }
  },
  mounted () {
    var editor = new E('#editor')
    editor.customConfig.onchange = (html) => {
      this.formArticle.content = html;
      this.$emit("getContent",this.formArticle.content);
    }
    editor.create()
  }
}
</script>