import request from '../../service/request'

//登录
export const login = (params: unknown) => {
  return request('/user/login', { method: 'POST', data: params })
}

//注册
export const register = (params: unknown) => {
  return request('/user/register', { method: 'POST', data: params })
}