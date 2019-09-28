// pages/income/income.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datatab:[],
    aq:true,
    limit:'',
    page:'',
    starttime:'',
    endtime:'',
    datetype:'4',
    date: '2016-09-01',
    date1: '2016-09-02',
    xz1:true,
    xz2: false,
    xz3: false,
    xz4: false,
  },

  dj1(){
    this.setData({
      xz1: true,
      xz2: false,
      xz3: false,
      xz4: false
    })
    this.data.datetype = 4
    this.data.starttime = ''
    this.data.endtime = ''
    this.data.limit = 15
    this.data.page = 1
    this.aq = true
    this.getlist()
  },
  dj2() {
    this.setData({
      xz1: false,
      xz2: true,
      xz3: false,
      xz4: false
    })
    this.data.datetype = 3
    this.data.starttime = ''
    this.data.endtime = ''
    this.data.limit = 15
    this.data.page = 1
    this.aq = true
    this.getlist()
  },
  dj3() {
    this.setData({
      xz1: false,
      xz2: false,
      xz3: true,
      xz4: false
    })
    this.data.datetype = 2
    this.data.starttime = ''
    this.data.endtime = ''
    this.data.limit = 15
    this.data.page = 1
    this.aq = true
    this.getlist()
  },
  dj4() {
    this.setData({
      xz1: false,
      xz2: false,
      xz3: false,
      xz4: true
    })
    this.data.datetype = 5
    this.data.starttime = ''
    this.data.endtime = ''
    this.data.limit = 15
    this.aq = true
    this.data.page = 1
    this.getlist()
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.data.starttime = e.detail.value
    this.data.limit = 15
    this.aq = true
    this.data.page = 1
    this.getlist()
  },
  bindDateChange1: function (e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
    this.data.endtime = e.detail.value
    this.data.limit = 15
    this.aq = true
    this.data.page = 1
    this.getlist()
  },
  getlist(){
    wx.request({
      url: `${api}/mini/member/comeinlog`,
      data:{
        rd_session: this.rd_session,
        storeid: this.storeid,
        datetype: this.data.datetype,
        starttime: this.data.starttime,
        endtime: this.data.endtime,
        limit:this.data.limit,
        page:this.data.page
      },
      success:res=>{
        console.log(res)
        this.data.datatab = res.data.result.data
        this.setData({
          data1:this.data.datatab,
          totalcomeinprice: res.data.result.totalcomeinprice
        })
        // console.log(res.data.result.data)
      },
      fail:res=>{

      }
    })
  },
  lower(){
    console.log(11)
    if(this.data.aq == false){
      return
    }
    if(this.data.page == 1){
      this.data.page++
    }
    wx.request({
      url: `${api}/mini/member/comeinlog`,
      data: {
        rd_session: this.rd_session,
        storeid: this.storeid,
        datetype: this.data.datetype,
        starttime: this.data.starttime,
        endtime: this.data.endtime,
        limit: this.data.limit,
        page: this.data.page
      },
      success: res => {
        console.log(res)
        if(res.data.status == 1){
          if(res.data.result.data.length>0){
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rd_session = wx.getStorageSync('rd_session')
    // this.storeid = 4
    this.storeid = wx.getStorageSync('storeid')
    // console.log(this.data.datetype)
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