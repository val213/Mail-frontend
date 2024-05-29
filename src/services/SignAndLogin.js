import axios from 'axios';
//重点:使用async的作用,让函数返回promise
export const UserRegister = async (username, password) =>
{

        // 创建一个用户对象
        const SignUpMessage = {
            username: username,
            password: password
        };
        // 使用 axios.post 方法进行用户注册
        const response = await axios({
            method: 'post',
            url: '/user/register',
            data: {SignUpMessage}
        });
        // 注册成功时的处理逻辑

        if (response.status === 2000)
        {  console.log('用户注册成功，返回信息:', response.statusText);
            return response; // 返回成功响应
        }
        else{
            console.log('用户注册失败，返回信息:',response.statusText)

        }

};
export const UserLogin = async (emailAddress, password) =>
{
    try
    {
        const LoginMessage = {
            emailAddress: emailAddress,
            password: password
        };
        // 使用 axios.post 方法进行用户注册
       const response=await axios({
            method: 'post',
            url: '/user/login',
            data: {LoginMessage}
        });
            if(response.status===200){

                // 注册成功时的处理逻辑
                console.log('用户注册成功，返回信息:', response.statusText);
                return response; // 返回成功响应
            }
            else
            {

                console.error('用户注册失败:', response.statusText);
                return response; // 抛出错误，以便外部可以捕获
            }
    } catch (error)
    {
        console.error('用户注册失败:', error);
        throw error; // 抛出错误，以便外部可以捕获
    }
}
export const sendverificationcode = (phonenumber) =>
{
    console.log(phonenumber)
}





