import { Avatar, Col, Dropdown, MenuProps, Row, Space } from 'antd'
import React from 'react'
import styles from './userLoginHd.module.scss'
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'

type Props = {}
const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
];

const UserLoginHd = (props: Props) => {
    return (
        <>
            <Row className={styles.userLoginHd}>
                <Col span={24}>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar size={22} icon={<UserOutlined />} />
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
                </Col>
            </Row>
        </>
    )
}

export default UserLoginHd