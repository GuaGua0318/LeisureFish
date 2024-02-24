import { Avatar, Col, Dropdown, MenuProps, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './userLoginHd.module.scss'
import { DownOutlined, LeftOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

type Props = {}
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <>
        <div>个人资料</div>
        <div>修改密码</div>
        <div>退出</div>
      </>
    )
  }
]

const UserLoginHd = () => {
  const [isLogin, setIslogin] = useState<boolean>(false) //模拟登录状态
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      setIslogin(true)
    }
  }, [])
  const navigate = useNavigate()
  return (
    <>
      <Row className={styles.userLoginHd}>
        <Col span={4} style={{ lineHeight: '40px' }}>
          <LeftOutlined
            onClick={() => {
              navigate(-1)
            }}
          />
        </Col>
        <Col span={20} style={{ textAlign: 'right', paddingRight: '10px', lineHeight: '40px' }}>
          {isLogin ? (
            <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                <Avatar size={40} icon={<UserOutlined />} />
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      游仙
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Space>
            </Space>
          ) : (
            <a
              onClick={() => {
                navigate('/login')
              }}
            >
              立刻登录
            </a>
          )}
        </Col>
      </Row>
    </>
  )
}

export default UserLoginHd
