import { Button, Form, Input, message } from 'antd'
import styles from './login.module.scss'
import { login, register } from './service'
import { useNavigate } from 'react-router'
import { useState } from 'react'

type Props = {}

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const Login = (props: Props) => {
  const navigate = useNavigate()
  const [loginOrRegister, setLoginOrRegister] = useState<string>('login')
  //登录
  const onLoginFinish = async (values: any) => {
    if (loginOrRegister === 'login') {
      const result = await login(values)
      console.log(result)
      if (result.code === 200) {
        message.success('登录成功')
        window.localStorage.setItem('token', result.data.token)
        window.localStorage.setItem('username', values.username)
        navigate('/')
      }
    } else {
      const result = await register(values)
      console.log(result)
      if (result.code === 200) {
        message.success('注册成功')
        setLoginOrRegister('login')
      }
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
            {loginOrRegister === 'login' ? '登录' : '注册'}
          </Button>
          <a
            style={{ marginLeft: '5px' }}
            onClick={() => {
              if (loginOrRegister === 'login') {
                setLoginOrRegister('register')
              } else {
                setLoginOrRegister('login')
              }
            }}
          >
            {' '}
            {loginOrRegister === 'login' ? '没有账号，先注册' : '已有账号，直接登录'}
          </a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
