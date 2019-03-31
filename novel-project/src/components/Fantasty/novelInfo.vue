<template>

            <div class="layui-col-md11 layui-col-md-offset1">
    <h2>玄幻新书</h2>
    <hr>
    <ul class="fantasyDis">
        	
        <li>
            <div class="book-img">
                <a  href="" class="sendbid" sendBid="<%=c.bid%>">
                    <img src="http://static.zongheng.com/upload/cover/f1/61/f161028361a18fd4533b8c31b9c02939.jpeg" alt="念动全球">
                </a>
            </div>
            <div class="book-info1">
                <h4><a href="" class="sendbid" sendBid="<%=c.bid%>">三寸人间</a></h4>
                <p>再生少年时，重行修行路，既如此，此生当无敌，诸天千域，万世为王</p>
                <div class="state-box cf">
                    <span>日更2千+</span>
                    <i>东方玄幻</i>
                    <a class="author">海洋的水</a>
                </div>
            </div>
        </li>
      
    </ul>
    </div>
 
</template>
<style scoped>
   .book-img{
    width: 72px;
    height: 96px;
    overflow: hidden;
}
.book-img img{
    width: 72px;
    height: 96px;
}
.book-img img:hover{
    -webkit-transform: scale(1.1) ;
    transform: scale(1.1);
    -webkit-transition:all ease 0.5s;
    transition:all ease 0.5s;
}
 .book-info1{
    width: 144px;
    position: relative;
    top: -72px;
    left: 110px;
}
.book-info1 p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
.fantasyDis li{
    display: inline-block;
    width: 228px;
    height: 138px;
    margin-right: 35px;
}
.state-box span{
    max-width: 66px;
    height: 18px;
    color: #bf2c24;
    border: 1px solid #df9591;
}
.state-box i{
    max-width: 52px;
    height: 18px;
    margin-right: 8px;
    color: #a6a6a6;
    border: 1px solid #bfbfbf;
}
</style>
