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
import foodImg from '../../assets/eat.webp'
import { getArticles } from '../Community/service'

const socket = io('http://localhost:3001')
socket.on('connect', () => {
  socket.emit('findAllChat', (res) => {
    console.log(res)
  })
})

const blocks = [{ padding: '13px', background: '#d64737' }]
const prizes = [
  {
    // title: '1元红包',
    background: '#f9e3bb',
    // fonts: [{ text: '1元红包', top: '18%' }],
    imgs: [
      {
        src: { foodImg },
        width: '40%',
        height: '50%',
        top: '10%'
      }
    ]
  }
  // { title: '100元红包', background: '#f8d384', fonts: [{ text: '100元红包', top: '18%' }] },
  // { title: '0.5元红包', background: '#f9e3bb', fonts: [{ text: '0.5元红包', top: '18%' }] },
  // { title: '2元红包', background: '#f8d384', fonts: [{ text: '2元红包', top: '18%' }] },
  // { title: '10元红包', background: '#f9e3bb', fonts: [{ text: '10元红包', top: '18%' }] },
  // { title: '50元红包', background: '#f8d384', fonts: [{ text: '50元红包', top: '18%' }] }
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
  { label: <img style={{ width: '100px', height: '100px' }} src={foodImg} />, value: 'Apple' },
  { label: <img style={{ width: '100px', height: '100px' }} src={foodImg} />, value: 'Pear' },
  { label: <img style={{ width: '100px', height: '100px' }} src={foodImg} />, value: 'Orange' }
]

const Home = () => {
  const navigate = useNavigate()
  const myLuckey = useRef(null)
  const [eatSetting, setEatSetting] = useState<boolean>(false)
  const [selectCheckbox, setSelectCheckbox] = useState([1, 2, 3, 4, 5, 6, 7, 8])
  const [userList, setUserList] = useState([])
  const [isModalOpenChat, setIsModalOpenChat] = useState(false)
  const [resolveInfo, setResolveInfo] = useState({})
  const [message, setMessage] = useState('')
  const [isEatOpen, setIsEatOpen] = useState(false)
  const [selectedEat, setSelectedEat] = useState('')
  const [articleList, setArticleList] = useState([])
  const [messageInfo, setMessageInfo] = useState([])

  const handleCancelChat = () => {
    setIsModalOpenChat(false)
  }

  //获取消息
  const getMessage = async () => {
    const value = {
      sendUser: window.localStorage.getItem('username'),
      receiveUser: resolveInfo.username
    }
    try {
      socket.emit('getMessage', value, (res) => {
        setMessageInfo(res)
        setMessage('')
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
        if (res.code == 200) {
          getMessage()
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  //获取数据列表
  const fetchArticles = async () => {
    const result = await getArticles()
    if (result.code === 200) {
      setArticleList(result.data)
    }
  }
  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    socket.emit('isOnline', (res) => {
      console.log(res)
      if (res.code === 200) {
        setUserList(res.data)
      }
      // setUserList(res)
    })
  }, [])

  const Message = (item) => {
    if (
      item.sendUser === window.localStorage.getItem('username') &&
      item.receiveUser === resolveInfo.username
    ) {
      return (
        <Row>
          <Col span={21} style={{ textAlign: 'right' }}>
            <p>{item.sendUser}</p>
            <p>{item.message}</p>
          </Col>
          <Col span={3}>
            <Avatar size="large" icon={<UserOutlined />} style={{ marginTop: '20px' }} />
          </Col>
        </Row>
      )
    } else if (
      item.sendUser !== window.localStorage.getItem('username') &&
      item.sendUser === resolveInfo.username
    ) {
      return (
        <Row>
          <Col span={3}>
            <Avatar size="large" icon={<UserOutlined />} style={{ marginTop: '20px' }} />
          </Col>
          <Col span={21}>
            <p>{item.receiveUser}</p>
            <p>{item.message}</p>
          </Col>
        </Row>
      )
    }
  }

  return (
    <>
      <UserLoginHd />

      <Row>
        <Col span={7} offset={1}>
          <Card style={{ minHeight: '200px' }} title="取色器" bordered={false}>
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
        <Col span={8} offset={1}>
          <DrinkRemind />
        </Col>
        <Col span={6} offset={1}>
          <Card
            style={{ minHeight: '500px', position: 'fixed', width: '200px' }}
            title="用户"
            bordered={false}
          >
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
                        <div>
                          {item.username}
                          {item.username === window.localStorage.getItem('username')
                            ? ' (本人)'
                            : null}
                        </div>
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
      <Row style={{ marginTop: '15px' }}>
        <Col span={10} offset={1}>
          <Card
            title="吃什么"
            bordered={false}
            // extra={
            //   <a
            //     href="#"
            //     onClick={() => {
            //       setEatSetting(true)
            //     }}
            //   >
            //     设置
            //   </a>
            // }
          >
            <LuckyWheel
              width="300px"
              height="300px"
              ref={myLuckey}
              blocks={blocks}
              // prizes={prizes}
              prizes={
                selectCheckbox &&
                selectCheckbox.map((item, index) => {
                  return {
                    title: `苹果${index + 1}`,
                    background: '#f9e3bb',
                    fonts: [{ text: `苹果${index + 1}`, top: '68%' }],
                    imgs: [
                      {
                        src: 'https://img0.baidu.com/it/u=146494919,1943694376&fm=253&fmt=auto&app=138&f=JPEG?w=5&h=5',
                        width: '60%',
                        top: '20%'
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
                setTimeout(() => {
                  const index = (Math.random() * 6) >> 0
                  myLuckey.current.stop(index)
                }, 2500)
              }}
              onEnd={(val) => {
                setSelectedEat(val.title)
                setIsEatOpen(true)
              }}
            ></LuckyWheel>
          </Card>
        </Col>
        <Col span={6} style={{ marginLeft: '15px' }}>
          <Card
            style={{ height: '300px' }}
            title="社区"
            bordered={false}
            extra={
              <a href="#">
                <ArrowRightOutlined
                  style={{ fontSize: '20px' }}
                  onClick={() => {
                    navigate('/community')
                  }}
                />
              </a>
            }
          >
            <div style={{ height: '180px', overflow: 'hidden' }}>
              {articleList &&
                articleList.map((item, index) => {
                  return (
                    <p
                      key={item.id}
                      style={{ cursor: 'pointer', fontSize: '22px', padding: '0', margin: '0' }}
                    >
                      {item.title}
                    </p>
                  )
                })}
            </div>
            <span style={{ fontSize: '26px', marginTop: '-10px', display: 'inline-block' }}>
              ......
            </span>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}></Row>
      {/* <Modal
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
      </Modal> */}
      <Modal title={resolveInfo.username} open={isModalOpenChat} onCancel={handleCancelChat} footer>
        <List
          itemLayout="horizontal"
          dataSource={messageInfo}
          style={{ height: '300px', overflowY: 'auto' }}
          renderItem={(item, index) => {
            return Message(item)
          }}
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
          type="primary"
        >
          发送
        </Button>
      </Modal>
      <Modal
        open={isEatOpen}
        onCancel={() => {
          setIsEatOpen(false)
        }}
      >
        <p style={{ fontSize: '18px' }}>
          今日适合吃<span style={{ fontSize: '24px', color: 'pink' }}>{selectedEat}</span>
        </p>
      </Modal>
    </>
  )
}

export default Home
