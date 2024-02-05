import { useState } from 'react'
import styles from './imgUpload.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'

type randomcolorFn = () => string
type colorstyle = {
  height: string
  fontSize: string
  textAlign: string
  lineHeight: string
}
const randomColor: randomcolorFn = () => {
  return '#' + Math.random().toString(16).substr(2, 6)
}
const colorStyle: colorstyle = {
  height: '70px',
  fontSize: '22px',
  textAlign: 'center',
  lineHeight: '70px'
}

const ImgUpload = () => {
  const [imgUrl, setImgUrl] = useState()
  const [color, setColor] = useState<string>()
  const eyeDropper = new EyeDropper()

  const getBase64 = (e) => {
    const localUrl = URL.createObjectURL(e.target.files[0])
    setImgUrl(localUrl)
  }

  return (
    <>
      {imgUrl?.length > 0 ? null : (
        <span className={styles.fileinputButton}>
          <span>
            <PlusOutlined
              style={{
                fontSize: '60px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)'
              }}
            />
          </span>
          <input
            type="file"
            onChange={(val) => {
              getBase64(val)
            }}
          />
        </span>
      )}
      <div style={{ maxWidth: '90%', margin: '0 auto' }}>
        {imgUrl?.length > 0 ? (
          <img
            style={{ width: '100%', height: '100%' }}
            src={imgUrl}
            onClick={() => {
              eyeDropper
                .open()
                .then((result) => {
                  setColor(result.sRGBHex)
                })
                .catch((e) => {
                  console.log(e)
                })
            }}
          />
        ) : null}
      </div>
      <Row>
        <Col
          span={6}
          style={{
            height: '70px',
            background: `${color}`,
            fontSize: '22px',
            textAlign: 'center',
            lineHeight: '70px'
          }}
        >
          {color}
        </Col>
        <Col span={6} style={{ ...colorStyle, background: `${randomColor()}` }}>
          {randomColor()}
        </Col>
        <Col span={6} style={{ ...colorStyle, background: `${randomColor()}` }}>
          {randomColor()}
        </Col>
        <Col span={6} style={{ ...colorStyle, background: `${randomColor()}` }}>
          {randomColor()}
        </Col>
      </Row>
      <Row>
        <Col span={6} style={{ ...colorStyle, background: `${randomColor()}` }}>
          {randomColor()}
        </Col>
        <Col span={6} style={{ ...colorStyle, background: `${randomColor()}` }}>
          {randomColor()}
        </Col>
        <Col span={6} style={{ ...colorStyle, background: `${randomColor()}` }}>
          {randomColor()}
        </Col>
        <Col span={6} style={{ ...colorStyle, background: `${randomColor()}` }}>
          {randomColor()}
        </Col>
      </Row>
    </>
  )
}

export default ImgUpload
