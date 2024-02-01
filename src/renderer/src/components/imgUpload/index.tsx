import { useState } from "react"
import Color from 'color-thief-react';


const ImgUpload = () => {
  const [imgUrl, setImgUrl] = useState()

  const getBase64 = (e) => {
    const localUrl = URL.createObjectURL(e.target.files[0])
    setImgUrl(localUrl)
  }

  return (
    <>
      {
        imgUrl?.length > 0 ?

          null : <div>
            <input type="file" onChange={(val) => {
              getBase64(val)
            }} />
          </div>
      }

      <div>
        {
          imgUrl?.length > 0 ?
          <Color src={imgUrl}>
          {({ data, loading, error }) => {
            console.log('-----dudu',data,loading,error)
            return (
              <div style={{ color: data }}>
              Text with the predominant color
            </div>
            )
          }}
        </Color> : null
        }
      </div>
      


    </>
  )
}

export default ImgUpload
