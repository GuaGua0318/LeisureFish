import { Button, Input, message, Col, Row } from 'antd'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { write } from '../service'
import UserLoginHd from '@renderer/components/userLoginHd'
import { useNavigate } from 'react-router'

const Editor = (props: Props) => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')

  //发布帖子
  const release = async () => {
    const result = await write({
      username: localStorage.getItem('username'),
      title: title,
      content: value
    })
    if (result.code == 200) {
      message.success('发布成功')
      navigate('/community')
    }
  }

  return (
    <>
      <UserLoginHd />
      <Row>
        <Col span={24} style={{ padding: '0 10px' }}>
          <Input
            placeholder="请输入标题"
            value={title}
            onChange={(val) => {
              setTitle(val.target.value)
            }}
          />
          ;
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{ background: '#fff', height: '79vh' }}
          />
          <Button
            type="primary"
            style={{ width: '100%', height: '40px' }}
            onClick={() => {
              release()
            }}
          >
            发布
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Editor
