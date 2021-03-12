import Mock from 'mockjs'

Mock.mock('/api/log/login', 'get', (data) => {
  return {
    'msg': 'success',
    'token': 'xxx'
  }
})
