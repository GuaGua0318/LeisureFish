import { Button, Card, Checkbox, Form, Input, Modal, Statistic } from 'antd'
import type { CountdownProps } from 'antd'
import { useState } from 'react'
import { FieldType } from './index.d.ts'

const { Countdown } = Statistic

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

type Props = {}
const deadline = Date.now() + 1000 * 60

const DrinkRemind = (props: Props) => {
  const [settingOpen, setIsSettingOpen] = useState<boolean>(false)

  const handleSettingCancel = () => {
    setIsSettingOpen(false)
  }
  return (
    <>
      <Card
        title="别忘了喝水"
        extra={
          <a
            href="#"
            onClick={() => {
              setIsSettingOpen(true)
            }}
          >
            设置
          </a>
        }
        style={{ width: 300 }}
      >
        <p>距离下一次喝水提醒还有</p>
        <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
      </Card>
      <Modal title=" " open={settingOpen} onCancel={handleSettingCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default DrinkRemind
