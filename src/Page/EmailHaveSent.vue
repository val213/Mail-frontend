<template>
    <MailList :initialUserId="userId" :initialPageNumber="1" :initialPageSize="30" :initialType="1" />
</template>

<script>
    import MailList from "@/components/MailList.vue";
    export default {
        name: "EmailSent",
        components: {
            MailList,
    },
    data() {
        return {
            userId: '', // 初始值为空，稍后从用户信息中获取
        }
    },
    methods: {
        fetchUserInfo() {
            // 假设有一个方法来获取用户信息
            // 这里简化为直接赋值
            this.userId = '6'; // 假设的用户ID
        }
    },
    created() {
        this.fetchUserInfo(); // 组件创建时获取用户信息
    }
}
</script>

<style scoped>
</style>