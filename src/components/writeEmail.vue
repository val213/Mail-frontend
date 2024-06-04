<template>
    <div>
        <div>
            <button @click="sendEmail">发送</button>
            <button>定时发送</button>
            <button>存草稿</button>
            <button>关闭</button>
        </div>
        <label for="targetEmailAddress">收件人:</label><br>
        <input type="text" id="targetEmailAddress" v-model="targetEmailAddress"><br>
        <label for="lname">主题</label><br>
        <input type="text" id="lname" v-model="theme"><br>
        <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            @change="uploadfile"
            accept=".jpg, .jpeg, .png"
        />
        <div style="border: 1px solid #ccc; margin-top: 10px">
            <!-- 工具栏 -->
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
            />
            <!-- 编辑器 -->
            <Editor
                style="height: 400px; overflow-y: hidden"
                :defaultConfig="editorConfig"
                v-model="html"
           
                @onCreated="onCreated"
            />
        </div>
    </div>
</template>
<script>
    import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
    import {ElMessage} from "element-plus";
    import axios from "axios";
    
    export default {
        name: "MyEditor",
        components: {Editor, Toolbar},
        data()
        {
            return {
                editor: null,
                html: "<p></p>",
                toolbarConfig: {
                    // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                    // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                },
                editorConfig: {
                    placeholder: "请输入内容...",
                    // autoFocus: false,
                    // 所有的菜单配置，都要在 MENU_CONF 属性下
                    MENU_CONF: {}
                },
                multipartFile: new FormData(),
                senderId: localStorage.getItem('senderId'),
                targetEmailAddress: '',
                theme: '',
                content: '',
            }
        }
        ,
        methods: {
            onCreated(editor)
            {
                this.editor = Object.seal(editor);
            }
            ,
          
            sendEmail()
            {
                const data = {
                    multipartFile: this.multipartFile,
                    senderId: this.senderId,
                    targetEmailAddress: this.targetEmailAddress,
                    theme: editor.getHtml(),
                    content: this.content,
                }
                const editor = this.editor
                axios({
                    method: "post",
                    url: '/mail/send',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) =>
                {
                    if (res.data.code === 1)
                    {
                        ElMessage('发送成功')
                    } else
                    {
                        console.log('发送失败' + res.data.message)
                    }
                })
            }
            ,
            uploadfile(event)
            {
                const file = event.target.file
                if (file)
                {
                    this.multipartFile.append('file', file)
                }
            }
            ,
        }
        ,
        mounted()
        {
        }
        ,
        beforeUnmount()
        {
            const editor = this.editor;
            if (editor == null) return;
            editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
        }
        ,
    }
    ;
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
