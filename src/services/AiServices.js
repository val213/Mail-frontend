import axios from 'axios';

export const AiContentSummarize = async (content) => {
    //创建邮件内容总结请求体
    //请求体内容只有邮件内容字符串
    //console.log('参数：'+content)
    const MailContent = {
        content: content,
    };
    console.log('请求体：', MailContent);

    //请求ai服务
    try {
        const response = await axios({
            method: 'post',
            url: '/ai/summarize',
            data: MailContent,
        });
        if (response.status === 200) {
            console.log('Ai总结内容成功', response.data)
            return response.data
        }
        else {
            console.error('获取Ai服务失败：', response.statusText);
            return response.data;
        }


    } catch (error) {
        console.error('获取Ai总结邮件内容服务失败：', error.response ? error.response.data : error.message);
        throw error;
    }
}