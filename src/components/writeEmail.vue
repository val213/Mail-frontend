<template>
    <div style="padding-top: 20px;padding-left: 20px">
        <table>
            <tr>
                <td>
                </td>
                <td>
                    <div style="">
                        <button @click="sendEmail">发送</button>
                        <button>定时发送</button>
                        <button @click="saveDraft">存草稿</button>
                        <button @click="close">关闭</button>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="  vertical-align: top;
    text-align: right;padding-right:5px;color: #1f74c0">收件人
                </td>
                <td><input style='width:80vw' type="text" id="targetEmailAddress" v-model="targetEmailAddress"></td>
            </tr>
            <tr>
                <td style="  vertical-align: top;
    text-align: right;padding-right:5px;color: #1f74c0;">主题
                </td>
                <td><input style='width:80vw' type="text" id="lname" v-model="theme"><br></td>
            </tr>
          
            <tr>
                <td style="
    text-align: right;padding-right:5px;color: #1f74c0;">
                    <el-upload
                        :before-upload="uploadFiles"
                        multiple
                        :limit="3"
                    >
                        <a>附件</a>
                    </el-upload>
                </td>
                <td><span v-if="File.length===0">暂无附件</span>
                    <div v-for="(file,index) in File" :key="index" style="background-color: #cce2fa">
                        <span> {{
                                file.name
                            }}<span style="font-size:10px;color: #2e353a">({{ file.size }}MB)</span></span>
                        <el-link
                            @click="deleteFile(index)">删除
                        </el-link>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="  vertical-align: top;
    text-align: right;padding-top: 10px;color: #1f74c0;padding-right:5px">正文:
                </td>
                <td>
                    <div style="border: 1px solid #ccc; margin-top: 10px;width:80vw">
                        <!-- 工具栏 -->
                        <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editor"
                            :defaultConfig="toolbarConfig"
                        />
                        <!-- 编辑器 -->
                        <Editor
                            style="height: 600px; overflow-y: hidden"
                            :defaultConfig="editorConfig"
                            v-model="html"
                            @onCreated="onCreated"
                        />
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
    // import {ElMessage} from "element-plus";
    import {useToast} from "vue-toastification"
    import axios from "axios";
    
    export default {
        name: "MyEditor",
        computed: {},
        components: {Editor, Toolbar},
        setup()
        {
            const toast = useToast();
            return {toast};
        },
        data()
        {
            return {
                editor: null,
                html: "<p></p>",
                toolbarConfig: {
                    // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                    excludeKeys: ['group-video',
                        'group-image', 'blockquote', 'headerSelect', 'todo', 'fullScreen'],
                },
                editorConfig: {
                    placeholder: "请输入内容...",
                    // autoFocus: false,
                    // 所有的菜单配置，都要在 MENU_CONF 属性下
                    MENU_CONF: {}
                },
                multipleFiles: [],
                File: [],
                senderId: localStorage.getItem('userId'),
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
                const editor = this.editor
                // 创建一个FormData实例
                let formData = new FormData();
                this.multipleFiles.forEach((file) =>
                {
                    // 为每个文件使用相同的键名 "multipleFiles"
                    // 服务器端可以根据这个键名接收到一个文件数组
                    formData.append('multipleFiles', file);
                });
                // 添加其他表单字段
                formData.append('senderId', this.senderId);
                formData.append('targetEmailAddress', this.targetEmailAddress);
                formData.append('theme', this.theme); // 使用theme字段作为邮件主题
                formData.append('content', editor.getHtml()); // 使用editor.getHtml()获取的HTML内容作为邮件内容
                formData.append('draft', 0); // 使用draft字段标记为非草稿
                formData.append('junk', 0); // 使用junk字段标记为非垃圾邮件
                formData.append('isread', 1); // 使用isread字段标记为已读
                // 打印日志检查 formData中的每个字段的值
                for (let pair of formData.entries())
                {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                axios({
                    method: "post",
                    url: '/mail/send',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) =>
                {
                    if (res.data.code === 1)
                    {
                        // ElMessage('发送成功')
                        this.showSuccessToast('发送成功');
                    } else
                    {
                        console.log('发送失败' + res.data.message);
                        this.showErrorToast('发送失败');
                    }
                })
                    .catch(error =>
                    {
                        console.error('发送邮件失败', error);
                        this.showErrorToast('发送邮件失败');
                    });
            },
            
            deleteFile(index)
            {
                // 移除指定索引的文件
                this. multipleFiles.delete(`${this.File[index].name}`);
                this.File.splice(index, 1);
            },
            saveDraft()
            {
                const editor = this.editor
                // 创建一个FormData实例
                let formData = new FormData();
                this.multipleFiles.forEach((file) =>
                {
                    // 为每个文件使用相同的键名 "multipleFiles"
                    // 服务器端可以根据这个键名接收到一个文件数组
                    formData.append('multipleFiles', file);
                });
                // 添加其他表单字段
                formData.append('senderId', this.senderId);
                formData.append('targetEmailAddress', this.targetEmailAddress);
                formData.append('theme', this.theme); // 使用theme字段作为邮件主题
                formData.append('content', editor.getHtml()); // 使用editor.getHtml()获取的HTML内容作为邮件内容
                formData.append('draft', 1); // 使用draft字段标记为草稿
                formData.append('junk', 0); // 使用junk字段标记为非垃圾邮件
                formData.append('isread', 1); // 使用isread字段标记为已读
                // 打印日志检查 formData中的每个字段的值
                for (let pair of formData.entries())
                {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                axios({
                    method: "post",
                    url: '/mail/send',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) =>
                {
                    if (res.data.code === 1)
                    {
                        // ElMessage('发送成功')
                        this.showSuccessToast('保存草稿成功');
                    } else
                    {
                        console.log('保存失败' + res.data.message);
                        this.showErrorToast('保存失败');
                    }
                })
                    .catch(error =>
                    {
                        console.error('保存草稿失败', error);
                        this.showErrorToast('保存草稿失败');
                    });
            },
            uploadFiles(file)
            {
                // const files = event.target.files; // 正确获取文件列表
                if (file)
                {
                    // 使用扩展运算符将新选择的文件追加到multipleFiles数组中
                    this.multipleFiles.push(file);
                    this.File.push({name: file.name, size: (file.size / 10000).toFixed(2)});
                }
            },
            showSuccessToast(message)
            {
                this.toast.success(message, {
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: 'top-center',
                });
                //  ElMessage({
                //   message: message,
                //   type: 'success',
                //   duration: 3000,
                //   showClose: true,
                //   center: true,
                // });
            },
            showErrorToast(message)
            {
                this.toast.error(message, {
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: 'top-center',
                });
                //  ElMessage({
                //   message: message,
                //   type: 'error',
                //   duration: 3000,
                //   showClose: true,
                //   center: true,
                // });
            },
            close()
            {
                this.$router.push('/mainpage')
            },
        }
        ,
        mounted()
        {
        }
        ,
        beforeUnmount()
        {
            const editor = this.editor;
            if (editor == null)
            {
                return;
            }
            editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
        }
        ,
    }
    ;
</script>
<style src="@wangeditor/editor/dist/css/style.css">
</style>
