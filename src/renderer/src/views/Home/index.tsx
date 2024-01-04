import React from 'react'
import { Card, Col, Row } from 'antd'
import UserLoginHd from '@renderer/components/userLoginHd'
import DrinkRemind from './components/DrinkRemind'
import styles from './home.module.scss'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <UserLoginHd />
      <DrinkRemind />
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="取色器"
            bordered={false}
            className={styles.test}
            onClick={() => {
              navigate('/ColorPicker')
            }}
          >
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
    </>
  )
}

export default Home
