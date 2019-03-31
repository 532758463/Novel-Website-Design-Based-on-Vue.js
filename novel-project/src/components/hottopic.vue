<template>
    <div>
    <Row>
        <Col>
         <Card>
                <p slot="title">
                <Icon type="md-bonfire" color="#ed4014" size="18"/>{{hottopic.title}}
                </p>
                <router-link to="">{{hottopic.desc}}</router-link>
            </Card> 
        </Col>
 
    </Row>
        </div>
</template>
<script>
    export default {
        props:['hottopic']
    }
</script>
<style scoped>
    .ivu-card-body>a{
        color: #333;
        overflow:hidden;
        text-overflow: ellipsis;
    }
</style>
