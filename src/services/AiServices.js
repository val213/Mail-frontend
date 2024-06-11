import axios from 'axios';

export const AiContentSummarize = async (content) => {
    //创建邮件内容总结请求体
    //请求体内容只有邮件内容字符串

    const MailContent = {
        content: content.value,
    };
    console.log('请求体：', MailContent);

    //请求ai服务
    try {
        const response = await axios.post('/ai/summarize', MailContent, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('获取Ai总结邮件内容服务失败：', error.response ? error.response.data : error.message);
        throw error;
    }
}