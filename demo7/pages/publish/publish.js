//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
  },
  onShareAppMessage() {
    return {
      title: '萌宠交易平台信息发布',
      path: '/pages/publish/publish'
    }
  }
})
