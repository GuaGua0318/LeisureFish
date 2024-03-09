import React, { useEffect, useRef, useState } from 'react'
import {
  Card,
  Col,
  Row,
  ColorPicker,
  Space,
  Modal,
  Checkbox,
  Avatar,
  Badge,
  List,
  Input,
  Button
} from 'antd'
import UserLoginHd from '@renderer/components/userLoginHd'
import DrinkRemind from './components/DrinkRemind'
import styles from './home.module.scss'
import { useNavigate } from 'react-router'
import { ArrowRightOutlined, UserOutlined } from '@ant-design/icons'
import { LuckyWheel, LuckyGrid } from 'react-luck-draw'
import { io } from 'socket.io-client'
import 'wc-waterfall'

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]

const socket = io('http://localhost:3001')
socket.on('connect', () => {
  socket.emit('findAllChat', (res) => {
    console.log(res)
  })
})

const imgg =
  'https://img0.baidu.com/it/u=146494919,1943694376&fm=253&fmt=auto&app=138&f=JPEG?w=5&h=5'

const blocks = [{ padding: '13px', background: '#d64737' }]
const prizes = [
  { title: '1元红包', background: '#f9e3bb', fonts: [{ text: '1元红包', top: '18%' }] },
  { title: '100元红包', background: '#f8d384', fonts: [{ text: '100元红包', top: '18%' }] },
  { title: '0.5元红包', background: '#f9e3bb', fonts: [{ text: '0.5元红包', top: '18%' }] },
  { title: '2元红包', background: '#f8d384', fonts: [{ text: '2元红包', top: '18%' }] },
  { title: '10元红包', background: '#f9e3bb', fonts: [{ text: '10元红包', top: '18%' }] },
  { title: '50元红包', background: '#f8d384', fonts: [{ text: '50元红包', top: '18%' }] }
]
const buttons = [
  { radius: '50px', background: '#d64737' },
  { radius: '45px', background: '#fff' },
  { radius: '41px', background: '#f6c66f', pointer: true },
  {
    radius: '35px',
    background: '#ffdea0',
    fonts: [{ text: '开始\n抽奖', fontSize: '18px', top: -18 }]
  }
]
const defaultStyle = {
  fontColor: '#d64737',
  fontSize: '14px'
}

const options = [
  { label: <img style={{ width: '100px', height: '100px' }} src={imgg} />, value: 'Apple' },
  { label: <img style={{ width: '100px', height: '100px' }} src={imgg} />, value: 'Pear' },
  { label: <img style={{ width: '100px', height: '100px' }} src={imgg} />, value: 'Orange' }
]

const Home = () => {
  const navigate = useNavigate()
  const myLuckey = useRef(null)
  const [eatSetting, setEatSetting] = useState<boolean>(false)
  const [selectCheckbox, setSelectCheckbox] = useState([1, 2, 3, 4, 5, 6, 7, 8])
  const [userList, setUserList] = useState([])
  const [isModalOpenChat, setIsModalOpenChat] = useState(true)
  const [resolveInfo, setResolveInfo] = useState({})
  const [message, setMessage] = useState('')

  const handleCancelChat = () => {
    setIsModalOpenChat(false)
  }

  //获取消息
  const getMessage = async () => {
    const value = {
      sendUser: window.localStorage.getItem('username'),
      receiveUser: resolveInfo.username,
    }
    try {
      socket.emit('getMessage', value, (res) => {
        console.log('------dududu', res)
      })
    } catch (error) {
      console.log(error)
    }
  }

  //发送消息
  const sendMessage = async () => {
    const value = {
      sendUser: window.localStorage.getItem('username'),
      receiveUser: resolveInfo.username,
      message: message
    }
    try {
      socket.emit('sendMessage', value, (res) => {
        console.log('----res', res)
        if (res.code == 200) {
          getMessage()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    socket.emit('isOnline', (res) => {
      console.log(res)
      if (res.code === 200) {
        setUserList(res.data)
      }
      // setUserList(res)
    })
  }, [])

  return (
    <>
      <UserLoginHd />
      <DrinkRemind />

      <Row gutter={16}>
        <Col span={8}>
          <Card title="取色器" bordered={false}>
            <Space size={100}>
              <ColorPicker size="small" showText />
              <ArrowRightOutlined
                style={{ fontSize: '20px' }}
                onClick={() => {
                  navigate('/ColorPicker')
                }}
              />
            </Space>
          </Card>
        </Col>
        <Col span={10}>
          <Card
            title="吃什么"
            bordered={false}
            extra={
              <a
                href="#"
                onClick={() => {
                  setEatSetting(true)
                }}
              >
                设置
              </a>
            }
          >
            <LuckyWheel
              width="300px"
              height="300px"
              ref={myLuckey}
              blocks={blocks}
              prizes={
                selectCheckbox &&
                selectCheckbox.map((item) => {
                  return {
                    title: '1元红包',
                    background: '#f9e3bb',
                    imgs: [
                      {
                        src: 'https://img0.baidu.com/it/u=146494919,1943694376&fm=253&fmt=auto&app=138&f=JPEG?w=5&h=5',
                        width: '40%',
                        height: '50%',
                        top: '10%'
                      }
                    ]
                  }
                })
              }
              buttons={buttons}
              defaultStyle={defaultStyle}
              onStart={() => {
                // 点击抽奖按钮会触发star回调
                // 调用抽奖组件的play方法开始游戏
                myLuckey.current.play()
              }}
            ></LuckyWheel>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="用户" bordered={false}>
            {userList.length > 0
              ? userList.map((item, idnex) => {
                  return (
                    <Row
                      key={item.id}
                      onClick={() => {
                        setResolveInfo(item)
                        setIsModalOpenChat(true)
                      }}
                    >
                      <Col span={6}>
                        <Avatar size="large" icon={<UserOutlined />} />
                      </Col>
                      <Col span={18}>
                        <div>{item.username}</div>
                        <div>
                          <Badge key="green" color="green" text={item.isOnline ? '在线' : '离线'} />
                        </div>
                      </Col>
                    </Row>
                  )
                })
              : null}
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="社区"
            bordered={false}
            onClick={() => {
              navigate('/community')
            }}
          ></Card>
        </Col>
      </Row>
      <Modal
        title="设置"
        open={eatSetting}
        onCancel={() => {
          setEatSetting(false)
        }}
      >
        <Checkbox.Group
          options={options}
          onChange={(e) => {
            setSelectCheckbox(e)
          }}
        />
      </Modal>
      <Modal title={resolveInfo.username} open={isModalOpenChat} onCancel={handleCancelChat}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <Row>
              <Col span={3}>
                <Avatar size="large" icon={<UserOutlined />} style={{ marginTop: '20px' }} />
              </Col>
              <Col span={21}>
                <p>username</p>
                <p>message</p>
              </Col>
            </Row>
          )}
        />
        <Input
          value={message}
          onChange={(val) => {
            setMessage(val.target.value)
          }}
        />
        <Button
          onClick={() => {
            sendMessage()
          }}
        >
          发送
        </Button>
      </Modal>
    </>
  )
}

export default Home
