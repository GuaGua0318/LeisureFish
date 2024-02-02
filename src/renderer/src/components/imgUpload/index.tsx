import { useState } from 'react'
import styles from './imgUpload.module.scss'
import { PlusOutlined } from '@ant-design/icons'

const ImgUpload = () => {
  const [imgUrl, setImgUrl] = useState()
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
              style={{ fontSize: '60px', position: 'absolute', left: '50%', top: '50%',transform:'translate(-50%,-50%)' }}
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
      <div>{imgUrl?.length > 0 ? <img src={imgUrl} /> : null}</div>
      <div
        onClick={() => {
          eyeDropper
            .open()
            .then((result) => {
              console.log(result)
            })
            .catch((e) => {
              console.log(e)
            })
        }}
      >
        test
      </div>
    </>
  )
}

export default ImgUpload
