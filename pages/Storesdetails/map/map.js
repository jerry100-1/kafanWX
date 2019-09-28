// pages/Storesdetails/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compass:true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(parseFloat(options.lng))
    console.log(parseFloat(options.lat))
    console.log(options.title)
    console.log(options.address)
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(res)
        wx.openLocation({
          latitude: parseFloat(options.lat),
          longitude: parseFloat(options.lng),
          name: options.title,
          address: options.address,
          scale: 5
        })
      }
    }),
    // wx.getLocation({
    //   type: 'wgs84',
    //   success:res=>{
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //     console.log(res)
    //     console.log(options.lat, options.lng)

        this.setData({
          lng: options.lng,
          lat: options.lat,
          // 点标记
          markers: [{
            id: 0,
            latitude: options.lat,
            longitude: options.lng,
            width: 50,
            height: 50
          }],
          // 两点之间线
          // polyline: [{
          //   points: [{
          //     longitude: options.lng,
          //     latitude: options.lat
          //   }, {
          //       longitude: res.longitude,
          //       latitude: res.latitude
          //   }],
          //   color: "#FF0000DD",
          //   width: 2,
          //   dottedLine: true
          // }]
        })
    //   }
    // }),
      // console.log(lat1)
      
    
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})