import UserLoginHd from '@renderer/components/userLoginHd'
import React from 'react'
import styles from './community.module.scss'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router'

type Props = {}

const Community = (props: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <UserLoginHd />
      <div className={styles.listBox}>
        <div
          className={styles.item}
          onClick={() => {
            navigate('/editor')
          }}
        >
          <Row>
            <Col span={24} style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              嘟嘟嘟嘟嘟嘟嘟嘟
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ fontSize: '16px', color: 'gray' }}>
              啦啦啦啦啦啦啦啦啦啦啦啦啦啦
            </Col>
          </Row>
          <Row>
            <Col span={12}>col</Col>
            <Col span={12}>col</Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Community
