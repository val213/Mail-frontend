<template>
    <MailList :initialUserId="userId" :initialPageNumber="1" :initialPageSize="30" :initialStar="1" />
</template>
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

<style scoped>
</style>