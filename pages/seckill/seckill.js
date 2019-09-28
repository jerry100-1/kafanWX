// pages/seckill/seckill.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeid:'',
    page:'1',
    limit:'15',
    keyword:'',
    isoffer:'1',
    aq:true,
    datatab:[],
  },
  getlist(){
    wx.request({
      url: `${api}/mini/goods`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        page: this.data.page,
        limit: this.data.limit,
        keyword: this.data.keyword,
        isoffer: this.data.isoffer
      },
      success:res=>{
        console.log(res.data.result.data)
        this.data.datatab = res.data.result.data
        this.setData({
          data: this.data.datatab
        })
      }
    })
  },
  lower(){
    console.log(11)
    if (this.data.aq == false) {
      return
    } 
    if (this.data.page == 1) {
      this.data.page++
    }
    wx.request({
      url: `${api}/mini/goods`,
      data: {
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        page: this.data.page,
        limit: this.data.limit,
        keyword: this.data.keyword,
        isoffer: this.data.isoffer
      },
      success: res => {
        console.log(res)
        if(res.data.status == 1){
          if (res.data.result.data.length>0){
            this.data.page++
            let qqq = res.data.result.data
            for (let a = 0; a < qqq.length; a++) {
              this.data.datatab.push(
                qqq[a]
              )
            }
            console.log(this.data.datatab)
            this.setData({
              data1: this.data.datatab,
            })
          }else{
            this.data.aq = false
            return
          }
        }else{
          this.data.aq = false
          return
        }
      },
      fail: res => {

      }
    })
  },
  tomai(e){
    wx.navigateTo({
      url: `/pages/productdetail/productdetail?productId=${e.target.dataset.goodsid}`,
    })
    console.log(e.target.dataset.goodsid)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rd_session = wx.getStorageSync('rd_session')
    this.data.storeid = wx.getStorageSync('storeid')
    this.getlist()
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