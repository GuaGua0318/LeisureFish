import { Button, Card, Form, InputNumber, Modal, Statistic, TimePicker, message } from 'antd'
import { BrowserWindow, DownloadItem, WebContents } from 'electron'
import type { CountdownProps } from 'antd'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
const { Countdown } = Statistic
import water from '../../../../assets/water.gif'

type FieldType = {
  end_time?: string
  interval_time?: number
}

// let shotScreenWin: BrowserWindow | null = null
// let savePath: string = ''

const DrinkRemind = () => {
  const [settingOpen, setIsSettingOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [deadline, setDealine] = useState<number>(0)
  const [refresh, setRefresh] = useState<number>(0)
  const [isCountDown, setIsCountDown] = useState<boolean>(false)
  // const { width, height } = getScreenSize()

  // shotScreenWin = new BrowserWindow({
  //   title: 'pear-rec 截屏',
  //   icon: path.join(PUBLIC, 'logo@2x.ico'),
  //   width, // 宽度(px), 默认值为 800
  //   height, // 高度(px), 默认值为 600
  //   autoHideMenuBar: true, // 自动隐藏菜单栏
  //   useContentSize: true, // width 和 height 将设置为 web 页面的尺寸
  //   movable: false, // 是否可移动
  //   frame: false, // 无边框窗口
  //   resizable: false, // 窗口大小是否可调整
  //   hasShadow: false, // 窗口是否有阴影
  //   transparent: true, // 使窗口透明
  //   fullscreenable: true, // 窗口是否可以进入全屏状态
  //   fullscreen: true, // 窗口是否全屏
  //   simpleFullscreen: true, // 在 macOS 上使用 pre-Lion 全屏
  //   alwaysOnTop: false, // 窗口是否永远在别的窗口的上面
  //   webPreferences: {
  //     preload,
  //     nodeIntegration: true,
  //     contextIsolation: false
  //   }
  // })

  const handleSettingCancel = () => {
    setIsSettingOpen(false)
  }

  useEffect(() => {
    if (window.localStorage.getItem('drinkTime')) {
      setDealine(
        Date.now() + 1000 * 60 * JSON.parse(window.localStorage.getItem('drinkTime')).interval_time
      )
    }
  }, [refresh])
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
        style={{ width: 300,minHeight:'200px' }}
      >
        {isCountDown ? (
          <>
            <p>距离下一次喝水提醒还有</p>
            <Countdown
              value={deadline}
              onFinish={() => {
                setIsCountDown(false)
              }}
              format="D 天 H 时 m 分 s 秒"
            />
          </>
        ) : (
          <div style={{ width: '60px', height: '60px' }}>
            <img style={{ width: '100%', height: '100%' }} src={water} />
          </div>
        )}

        <Button
          type="primary"
          onClick={() => {
            setRefresh(refresh + 1)
            setIsCountDown(true)
          }}
        >
          开始/重新计时
        </Button>
      </Card>
      <Modal
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
              setRefresh(refresh + 1)
              setIsSettingOpen(false)

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
