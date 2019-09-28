var theUrl=getApp();

// pages/firstpage/productEvaluate/productEvaluate.js
Page({
  onShareAppMessage() {
    return {
      title: '图片',
      path: "pages/firstpage/productEvaluate/productEvaluate"
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    nativeproductId:"",
    allEvaluateList:[],
    allEvaluateImgList:[],
    imgList: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558089579854&di=f4757cc13749439edea6cce9153c21d2&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F27%2F1309a28f34323cd0a1654f37bb4bef5f.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558089579854&di=f4757cc13749439edea6cce9153c21d2&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F27%2F1309a28f34323cd0a1654f37bb4bef5f.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558089579854&di=f4757cc13749439edea6cce9153c21d2&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F27%2F1309a28f34323cd0a1654f37bb4bef5f.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558089579854&di=f4757cc13749439edea6cce9153c21d2&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F27%2F1309a28f34323cd0a1654f37bb4bef5f.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558089579854&di=f4757cc13749439edea6cce9153c21d2&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F27%2F1309a28f34323cd0a1654f37bb4bef5f.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558089579854&di=f4757cc13749439edea6cce9153c21d2&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2F201612%2F27%2F1309a28f34323cd0a1654f37bb4bef5f.jpg",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这是在评价列表页面获取的产品的id--" + options.productId);
    this.setData({
      nativeproductId:options.productId
    });
    this.getAllProductaEvaluateList();
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
  previewImage: function (e) {
    var that = this;
    var current = e.target.dataset.src;
    console.log("选择的图片路径是" + current);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: e.currentTarget.dataset.list // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  //获取评价列表
  getAllProductaEvaluateList:function()
  {
    var that=this;
    wx.request({
      url: theUrl.data.baseUrl +'/mini/goods/comment',
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        storeid:wx.getStorageSync("storeid"),
        rd_session:wx.getStorageSync("rd_session"),
        page:1,
        limit: 15,
        goodsid: that.data.nativeproductId
      },
      success:function(res)
      {
        if(res.data.status==1)
        {
          console.log("这是请求评价列表接口返回的数据***************:"+res);
          that.setData({
            allEvaluateList: res.data.result.data
          })
        }
      },
      fail:function(res)
      {

      }
    })
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