import { Button, Card, Checkbox, Form, Input, InputNumber, Modal, Radio, Statistic, TimePicker } from 'antd'
import type { CountdownProps } from 'antd'
import { useState } from 'react'
const { Countdown } = Statistic

type FieldType = {
  start_time?: string
  end_time?: string
  interval_time?: string
}

type Props = {}
const deadline = Date.now() + 1000 * 60

const DrinkRemind = (props: Props) => {
  const [settingOpen, setIsSettingOpen] = useState<boolean>(false)
  const [form] = Form.useForm();

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
      <Modal title=" " open={settingOpen} onCancel={handleSettingCancel} cancelText="取消" okText="确定" onOk={() => {
                 form.validateFields().then((values) => {
                  // 提交表单数据到后端
                  console.log(values);
                  // 关闭 Modal
                }).catch((e) => {
                  console.log(e);
                });
      }}>
        {/* <Form
          name="basic"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          style={{ maxWidth: 1000 }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="开始时间"
            name="start_time"
          >
             <TimePicker />
          </Form.Item>

          <Form.Item<FieldType>
            label="结束时间"
            name="end_time"
          >
            <TimePicker />
          </Form.Item>

          <Form.Item<FieldType>
            label="间隔时间"
            name="interval_time"
          >
            <InputNumber/> 分钟
          </Form.Item>
        </Form> */}
         <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      </Modal>
    </>
  )
}

export default DrinkRemind
