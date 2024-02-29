import UserLoginHd from '@renderer/components/userLoginHd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { articleDetail } from '../service'

type Props = {}

const ArticleDetail = (props: Props) => {
  const { id } = useParams()
  const [articleDetailObj, setArticleDetailObj] = useState({})
  //获取页面详情数据
  const fetchDetail = async () => {
    const result = await articleDetail(id)
    if (result.code === 200) {
      setArticleDetailObj(result.data)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [])
  return (
    <>
      <UserLoginHd />
      <div>{articleDetailObj.title}</div>
      <div dangerouslySetInnerHTML={{ __html: articleDetailObj.content }}></div>
    </>
  )
}

export default ArticleDetail
