import { useState } from 'react'
import styles from './imgUpload.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'

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
        <Col span={6} style={{ height: '70px', background: `${color}`,fontSize:'22px',textAlign:'center',lineHeight:'70px' }}>
          {color}
        </Col>
        <Col span={6} style={{ height: '70px', background: 'pink' }}></Col>
        <Col span={6} style={{ height: '70px', background: 'greeb' }}></Col>
        <Col span={6} style={{ height: '70px', background: 'yellow' }}></Col>
      </Row>
    </>
  )
}

export default ImgUpload
