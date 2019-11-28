//app.js
App({
  globalData: {},
  onLaunch: function () {
    try {
      var res = wx.getSystemInfoSync()
      this.globalData.windowHeight = res.windowHeight;
      this.globalData.windowWidth = res.windowWidth;
      console.log(this.globalData)
    } catch (e) {
      // Do something when catch error
    }
  }
})