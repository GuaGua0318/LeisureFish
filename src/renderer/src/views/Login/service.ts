import request from '../../service/request'

export const login = (params: unknown) => {
  return request('/user/login', { method: 'POST', data: params, getResponse: true })
}
