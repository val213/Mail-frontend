<script>
    export default {
        name: "StarEmail",
        data(){
            return{
                userId:localStorage.getItem('userId'),
                pageNumber:1,
                pageSize:30,
                type:0
            }
            
            
        }
        
        
    }
</script>
<template>
    <div>StarEmail</div>
</template>
<style scoped>
</style>