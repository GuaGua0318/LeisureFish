import React, { useRef, useState } from 'react'
import { Card, Col, Row, ColorPicker, Space, Modal, Checkbox } from 'antd'
import UserLoginHd from '@renderer/components/userLoginHd'
import DrinkRemind from './components/DrinkRemind'
import styles from './home.module.scss'
import { useNavigate } from 'react-router'
import { ArrowRightOutlined } from '@ant-design/icons'
import { LuckyWheel, LuckyGrid } from 'react-luck-draw'

const blocks = [
  { padding: '13px', background: '#d64737' }
]
const prizes = [
  { title: '1元红包', background: '#f9e3bb', fonts: [{ text: '1元红包', top: '18%' }] },
  { title: '100元红包', background: '#f8d384', fonts: [{ text: '100元红包', top: '18%' }] },
  { title: '0.5元红包', background: '#f9e3bb', fonts: [{ text: '0.5元红包', top: '18%' }] },
  { title: '2元红包', background: '#f8d384', fonts: [{ text: '2元红包', top: '18%' }] },
  { title: '10元红包', background: '#f9e3bb', fonts: [{ text: '10元红包', top: '18%' }] },
  { title: '50元红包', background: '#f8d384', fonts: [{ text: '50元红包', top: '18%' }] },
]
const buttons = [
  { radius: '50px', background: '#d64737' },
  { radius: '45px', background: '#fff' },
  { radius: '41px', background: '#f6c66f', pointer: true },
  {
    radius: '35px', background: '#ffdea0',
    fonts: [{ text: '开始\n抽奖', fontSize: '18px', top: -18 }]
  }
]
const defaultStyle = {
  fontColor: '#d64737',
  fontSize: '14px'
}
const plainOptions = ['Apple', 'Pear', 'Orange'];

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false },
];
const imgg = 'https://img0.baidu.com/it/u=146494919,1943694376&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'

const Home = () => {
  const navigate = useNavigate()
  const myLuckey = useRef(null)
  const [eatSetting, setEatSetting] = useState<boolean>(false)

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
        <Col span={8}>
          <Card title="吃什么" bordered={false} extra={
            <a
              href="#"
              onClick={() => {
                setEatSetting(true)
              }}
            >
              设置
            </a>
          }>
            <LuckyWheel width="300px" height="300px" ref={myLuckey} blocks={blocks}
              prizes={prizes}
              buttons={buttons}
              defaultStyle={defaultStyle}
              onStart={() => { // 点击抽奖按钮会触发star回调
                // 调用抽奖组件的play方法开始游戏
                myLuckey.current.play()
              }}
            ></LuckyWheel>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
      <Modal title="设置" open={eatSetting} onCancel={() => {
        setEatSetting(false)
      }}>
        <Checkbox.Group options={plainOptions} defaultValue={['Apple']}/>
        <br />
        <br />
        <Checkbox.Group options={options} defaultValue={['Pear']}/>
        <br />
        <br />
        <Checkbox.Group 
          options={optionsWithDisabled}
          disabled
          defaultValue={['Apple']}
        />
      </Modal>
    </>
  )
}

export default Home
