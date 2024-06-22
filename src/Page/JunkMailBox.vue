<script>
    import MailList from "@/components/MailList.vue";
    export default {
        name: "JunkMailBox",
        components: {
            MailList,
        }
    }
</script>
<template>
    <div class="warning-message">
    <v-alert type="error" dismissible>
      注意：在此处删除的邮件将会被永久从服务器删除~
    </v-alert>
  </div>
    <MailList :initialJunk="1"/>
</template>
<style scoped>
.warning-message {
  margin: 20px;
}
</style>