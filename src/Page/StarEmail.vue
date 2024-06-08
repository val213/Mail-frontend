<script>
    import MailList from "@/components/MailList.vue";
    export default {
        name: "StarEmail",
        components: {
            MailList,
        },
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
    <MailList/>
</template>
<style scoped>
</style>