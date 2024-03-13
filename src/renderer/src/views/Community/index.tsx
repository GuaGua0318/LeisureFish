import UserLoginHd from '@renderer/components/userLoginHd'
import React, { useEffect, useState } from 'react'
import styles from './community.module.scss'
import { Button, Col, Row } from 'antd'
import { useNavigate } from 'react-router'
import { getArticles } from './service'

type Props = {}

const Community = (props: Props) => {
  const navigate = useNavigate()
  const [articleList, setArticleList] = useState([])

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

  return (
    <>
      <UserLoginHd />
      <Row>
        <Col span={18} style={{ border: '1px solid red' }}>
          <div className={styles.listBox}>
            {articleList.length > 0
              ? articleList.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className={styles.item}
                      onClick={() => {
                        navigate(`/detail/${item.id}`)
                      }}
                    >
                      <Row>
                        <Col
                          span={24}
                          style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}
                        >
                          {item.title}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ fontSize: '16px', color: 'gray' }}>
                          {item.title}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>col</Col>
                        <Col span={12}>col</Col>
                      </Row>
                    </div>
                  )
                })
              : null}
          </div>
        </Col>
        <Col span={5} style={{ paddingRight: '10px', marginLeft: '20px' }}>
          <Button
            type="primary"
            style={{ height: '70px', width: '100%', fontSize: '20px' }}
            onClick={() => {
              navigate('/editor')
            }}
          >
            发布
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Community
