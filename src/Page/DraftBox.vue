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
    <MailList :initialDraft="1" :initialJunk="0"/>
</template>
<style scoped>
</style>