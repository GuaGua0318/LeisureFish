import UserLoginHd from '@renderer/components/userLoginHd'
import React, { useEffect, useState } from 'react'
import styles from './community.module.scss'
import { Col, Row } from 'antd'
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
                    <Col span={24} style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
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
    </>
  )
}

export default Community
