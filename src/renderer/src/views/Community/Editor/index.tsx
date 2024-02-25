import { Button, Input } from 'antd'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = (props: Props) => {
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')

  return (
    <>
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
        style={{ background: '#fff', height: '80vh' }}
      />
      <Button
        onClick={() => {
          console.log(value, title)
        }}
      >
        发布
      </Button>
    </>
  )
}

export default Editor
