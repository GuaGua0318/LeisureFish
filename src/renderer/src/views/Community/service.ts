import request from '../../service/request'

//发布帖子
export const write = (params: unknown) => {
  return request('/articles/write', { method: 'POST', data: params })
}

//获取帖子列表
export const getArticles = () => {
  return request('/articles/getArticles', { method: 'GET' })
}

//获取帖子详情
export const articleDetail = (id: any) => {
  return request(`/articles/detail/${id}`, { method: 'GET' })
}
