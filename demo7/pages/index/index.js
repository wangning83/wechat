//index.js
//获取公用数据和逻辑
const app = getApp()

Page({
  data: {
    longitude: "",
    latitude: "",
    controls: [{
      id: 1,
      iconPath: '/resources/1.jpg',
      position: {
        left: (app.globalData.windowWidth / 2) - 12.5,
        top: (app.globalData.windowHeight - 40) / 2 - 30 ,
        width: 25,
        height: 25
      }
    },
      {
        id: 2,
        iconPath: '/resources/1.jpg',
        position: {
          left: 20,
          top: app.globalData.windowHeight - 90,
          width: 25,
          height: 25
        },
        clickable: true
      }
    ]
  },
  onReady(){
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  onShow(){
    this.getLocation();
  },
  getLocation(){
    wx.getLocation({
      type: 'gcj02',
      success: this.handleGetLocationSucc.bind(this)
    })
  },
  handleGetLocationSucc(res){
    this.setData({
      longitude: res.longitude,
      latitude: res.latitude
    })
    console.log(res)
  },
  onShareAppMessage() {
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  },
  controltap(e){
    this.mapCtx.moveToLocation()
  }
})
