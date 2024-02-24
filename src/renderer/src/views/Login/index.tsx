import { Button, Form, Input, message } from 'antd'
import styles from './login.module.scss'
import { login } from './service'
import { useNavigate } from 'react-router'

type Props = {}

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Login = (props: Props) => {
  const navigate = useNavigate()
  //登录
  const onLoginFinish = async (values: any) => {
    const result = await login(values)
    console.log(result)
    if (result.data.code === 200) {
      message.success('登录成功')
      window.localStorage.setItem('token', result.data.data.token)
      navigate('/')
    }
  }
  return (
    <div className={styles.loginBox}>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onLoginFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
