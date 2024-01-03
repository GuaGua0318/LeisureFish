import { Card, Form, InputNumber, Modal, Statistic, TimePicker, message } from 'antd'
import type { CountdownProps } from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'
const { Countdown } = Statistic

type FieldType = {
  end_time?: string
  interval_time?: number
}

const deadline = Date.now() + 1000 * 60

const DrinkRemind = () => {
  const [settingOpen, setIsSettingOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const handleSettingCancel = () => {
    setIsSettingOpen(false)
  }
  return (
    <>
      {contextHolder}
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
      <Modal
        title=" "
        open={settingOpen}
        onCancel={handleSettingCancel}
        cancelText="取消"
        okText="确定"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              window.localStorage.setItem(
                'drinkTime',
                JSON.stringify({
                  ...values,
                  end_time: dayjs(values.end_time).format('YYYY-MM-DD HH:mm')
                })
              )
              messageApi.open({
                type: 'success',
                content: '设置成功'
              })

              // 关闭 Modal
            })
            .catch((e) => {
              console.log(e)
            })
        }}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          style={{ maxWidth: 1000 }}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="结束时间" name="end_time">
            <TimePicker />
          </Form.Item>

          <Form.Item<FieldType> label="间隔时间" name="interval_time">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default DrinkRemind
