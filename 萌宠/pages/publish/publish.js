//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    address: "点击选择，要勾选哦",
    success: false

  },

  staticData: {
    type: "buy",
    message: "",
    contact: ""
  },

  onShareAppMessage() {
    return {
      title: '萌宠交易平台信息发布',
      path: '/pages/publish/publish'
    }
  },

  handleAddressClick() {
    wx.chooseLocation({
      success: this.handleChooseLocationSucc.bind(this)
    })
  },

  handleChooseLocationSucc(res){
    console.log(res)
    this.setData({
      address: res.address
    });
    //存经纬度，es6语法,Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    Object.assign(this.staticData, {
      latitude: res.latitude,
      longitude: res.longitude
    })
  },

  handleTypeChange(e){
   this.staticData.type = e.detail.value
  },

  handleMessageChange(e){
    this.staticData.message = e.detail.value
  },

  handleContactChange(e){
    this.staticData.contact = e.detail.value
  },

  handleSubmit(){
    //提交之前要进行一些判断（值是否为空等)
    if (this.data.address === "点击选择，要勾选哦" || !this.data.address){
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (!this.staticData.message) {
      wx.showToast({
        title: '请填说明信息',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    if (!this.staticData.contact) {
      wx.showToast({
        title: '请填联系方式',
        icon: 'loading',
        duration: 2000
      })
      return;
    }
    //发送ajax请求后台保存数据
    const data = Object.assign({}, this.staticData, {
      address: this.data.address,
      //信息区分
      distinct: "wangning_course"
    })
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d4131d4d9fb5b5023d47f0a/ReactDemo01', //仅为示例，并非真实的接口地址
      // data: {
      //   address: this.data.address,
      //   latitude: this.staticData.latitude,
      //   longitude: this.staticData.longitude,
      //   message: this.staticData.message,
      //   contact: this.staticData.contact,
      //   type: this.staticData.type
      // },
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      success: this.handleSubmitSucc.bind(this)
    })
  },
  handleSubmitSucc(res){
    console.log(res.data)
    if(res.data && res.data.ret){
      this.setData({
        success: true
      })
    }
  },
  handleBackTap(){
    wx.navigateBack();
  }
})
