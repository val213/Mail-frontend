<script>
    import MailList from "@/components/MailList.vue";
    export default {
        name: "DraftBox",
        components: {
            MailList,
        }
    }
</script>
<template>
    <MailList :initialDraft="1"/>
</template>
<style scoped>
</style>