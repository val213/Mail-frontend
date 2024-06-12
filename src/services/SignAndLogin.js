import axios from 'axios';
//重点:使用async的作用,让函数返回promise
export const UserRegister = async (username, password,telephone,verifyCode) =>
{

        // 创建一个用户对象
        const SignUpMessage = {
            username: username.value,
            password: password.value,
            telephone: telephone.value,
            verifyCode: verifyCode.value,
        };    console.log('请求体:', SignUpMessage);

        try {
            const response = await axios.post('/user/register', SignUpMessage, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('注册失败:', error.response ? error.response.data : error.message);
            throw error;
        }

};
export const UserLogin = async (emailAddress, password) =>
{
    try
    {
        const LoginMessage = {
            emailAddress: emailAddress.value,
            password: password.value,
        };console.log('请求体:', LoginMessage);
        // 使用 axios.post 方法进行用户登录
       const response=await axios({
            method: 'post',
            url: '/user/login',
            data: LoginMessage,
        });
        if(response.status===200){

            // 注册成功时的处理逻辑
            console.log('用户登录成功，返回信息:', response.statusText);
            return response; // 返回成功响应
        }
        else
        {

            console.error('用户登录失败:', response.statusText);
            return response; // 抛出错误，以便外部可以捕获
        }
    } catch (error)
    {
        console.error('用户登录失败:', error);
        throw error; // 抛出错误，以便外部可以捕获
    }
}
export const SendVerificationcode = async(telephone) =>
{
    console.log(telephone);
    try
    {
        // 使用 axios.post 方法进行用户登录
       const response=await axios({
            method: 'post',
            url: '/user/sendverifycode',
            params: {
                telephone: telephone.value,
            }
        });
        if(response.status===200){

            // 注册成功时的处理逻辑
            console.log('验证码发送成功:', response.statusText);
            return response; // 返回成功响应
        }
        else
        {

            console.error('验证码发送失败:', response.statusText);
            return response; // 抛出错误，以便外部可以捕获
        }
    } catch (error)
    {
        console.error('验证码发送失败:', error);
        throw error; // 抛出错误，以便外部可以捕获
    }
}





