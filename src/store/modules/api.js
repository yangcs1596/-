const baseUrl = process.env.BASE_API
const api = {
  state: {
    // 实时控制台
    socketApi: baseUrl + '/websocket?token=kl',
    // 图片上传
    imagesUploadApi: baseUrl + '/api/pictures',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent',
    // Sql 监控
    sqlApi: baseUrl + '/druid',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html',
    // baseUrl，
    baseApi: baseUrl,
    // 缩略图
    thumbnailPhoto: '/api/file/fileService/downloadFileAbbreviateImage?fileId=',
    // 节假日导入
    dateUpload: '/api/base/sysDateConfigure/uploadDate',
    // 文书上传
    uploadFileUrl: '/api/file/download/fileAllSwitchPdf'
  }
}

export default api
