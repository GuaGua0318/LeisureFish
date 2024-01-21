import { useState } from "react"
import { Image } from "antd"

const getBase64 = (file): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  })

const ImgUpload = () => {
  const [imgUrl, setImgUrl] = useState<string>()
  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default ImgUpload
