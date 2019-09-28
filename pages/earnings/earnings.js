// pages/earnings/earnings.js

const app = getApp()
const api = app.data.baseUrl;
var template = require('../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid:'',
    erji:[],
    xa: [],
    xa1: [],
    xxa: [false],
    xxa1: [true],
    storeid:'',
    goodsid:'',
    starttime:'',
    endtime:'',
    datetype:'4',
    updatememberline:'1',
    index:0,
    selected: true,
    selected2: false,
    selected3: false,
    selected4: false,
    hidden: false,
    hidden1: false,
    hidden2: false,
    date: '2016-09-01',
    date1: '2016-09-02',
  },
  srmx(){
    wx.navigateTo({
      url: `/pages/income/income`,
    })
  },
  tz1(e){
    wx.navigateTo({
      url: `/pages/discountcoupon/discountcoupon?mid=${e.target.dataset.mid}&nickname=${e.target.dataset.nickname}&img=${e.target.dataset.img}`,
    })
    console.log(e.target.dataset)
  },
  tz2(e){
    wx.navigateTo({
      url: `/pages/discountcoupon/discountcoupon?mid=${e.target.dataset.mid}&nickname=${e.target.dataset.nickname}&img=${e.target.dataset.img}`,
    })
    console.log(e.target.dataset)
  },
  xxx(e){
    let aindex = e.target.dataset.index
    console.log(e.target.dataset.index)
    this.data.xa[aindex] = false
    this.data.xa1[aindex] = true
    this.setData({
      xa: this.data.xa,
      xa1: this.data.xa1
    })
    this.data.erji = []
  },
  yyy(e){
    let aindex = e.target.dataset.index
    this.data.mid = e.target.dataset.iq
    this.data.xa[aindex] = true
    this.data.xa1[aindex] = false
    for(let a=0;a<this.data.xa.length;a++){
      if(aindex == a){
        this.data.xa[a] = true
        this.data.xa1[a] = false
        this.data.erji = []
      }else{
        this.data.xa[a] = false
        this.data.xa1[a] = true
      }
    }
    this.setData({
      xa1: this.data.xa1,
      xa: this.data.xa
    })
    this.getlist2()
  },
  xxxx(e) {
    let aindex = e.target.dataset.index
    console.log(e.target.dataset.index)
    this.data.xxa[aindex] = false
    this.data.xxa1[aindex] = true
    this.setData({
      xxa: this.data.xxa,
      xxa1: this.data.xxa1
    })
    this.data.erji.splice(this.data.erji.length-1,1)
    this.setData({
      erji:this.data.erji
    })
  },
  yyyy(e) {
    let aindex = e.target.dataset.index
    this.data.mid = e.target.dataset.iq
    console.log(e.target.dataset)
    this.data.xxa[aindex] = true
    this.data.xxa1[aindex] = false
    this.setData({
      xxa1: this.data.xxa1,
      xxa: this.data.xxa
    })
    this.getlist2()
  },
  // 日期左
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.data.starttime = e.detail.value
    this.getlist1()
  },
  // 日期右
  bindDateChange1: function (e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      date1: e.detail.value
    })
    this.data.endtime = e.detail.value
    this.getlist1()
  },
  // 商品
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    console.log('选择的下拉的id',e.target.dataset.iq)
    this.setData({
      index: e.detail.value
    })
    that.getlist1()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this)//0表示第一个tabbar
    this.rd_session = wx.getStorageSync('rd_session')
    this.data.storeid = wx.getStorageSync('storeid')
    this.getlist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  selected: function (e) {
    var that=this;
    that.setData({
      selected: true,
      selected2: false,
      selected3: false,
      selected4: false
    })
    that.data.datetype = 4
    that.data.starttime = ''
    that.data.endtime = ''
    that.getlist1()
  },
  selected2: function (e) {
    var that = this;
    that.setData({
      selected: false,
      selected2: true,
      selected3: false,
      selected4: false
    })
    that.data.datetype = 3
    that.data.starttime = ''
    that.data.endtime = ''
    that.getlist1()
  },
  selected3: function (e) {
    var that = this;
    that.setData({
      selected: false,
      selected2: false,
      selected3: true,
      selected4: false
    })
    that.data.datetype = 2
    that.data.starttime = ''
    that.data.endtime = ''
    that.getlist1()
  },
  selected4: function (e) {
    var that = this;
    that.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4:true
    })
    that.data.datetype = 5
    that.data.starttime = ''
    that.data.endtime = ''
    that.getlist1()
  },

  getlist(){
    wx.request({
      url: `${api}/mini/member/mycomein`,
      data:{
        rd_session: this.rd_session,
        storeid: this.data.storeid
      },
      success:res=>{
        console.log(res.data.result.sellgoods != '')
        // console.log(res.data.result.sellgoods[0].goodsinfo)
        this.setData({
          data1: res.data.result,
        })
        var datatab1 = []
        if (res.data.result.sellgoods != ''){
          for (let a = 0; a < res.data.result.sellgoods.length; a++) {
            datatab1.push({
              'id': res.data.result.sellgoods[a].goodsinfo.id,
              'title': res.data.result.sellgoods[a].goodsinfo.title,
            })
            console.log(res.data.result.sellgoods[a].goodsinfo)
          }
          this.data.goodsid = datatab1[0].id
          this.setData({
            datatab: datatab1
          })
          this.getlist1()
        }
        // console.log(this.data.oneid)
        // console.log(datatab1)
        
        
      },
      fail:err=>{

      }
    })
  },
  getlist1(){
    wx.request({
      url: `${api}/mini/member/memberline`,
      data:{
        rd_session: this.rd_session,
        storeid: this.data.storeid,
        goodsid: this.data.goodsid,
        starttime: this.data.starttime,
        endtime: this.data.endtime,
        datetype: this.data.datetype,
        updatememberline: this.data.updatememberline
      },
      success:res=>{
        for (let a = 0; a < res.data.result.memberline.length;a++){
          this.data.xa.push(
            false
          )
          this.data.xa1.push(
            true
          )
        }
        console.log(this.data.xa)
        console.log(this.data.xa1)
        this.setData({
          data2: res.data.result,
          xa:this.data.xa,
          xa1: this.data.xa1,
        })
        
      }
    })
  },
  getlist2(){
    wx.request({
      url: `${api}/mini/member/getmemberline`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        goodsid: this.data.goodsid,
        mid: this.data.mid
      },
      success:res=>{
        for (let a = 0; a < res.data.result.memberline.length;a++){
          this.data.erji.push(
            res.data.result.memberline[a]
          )
        }
        this.setData({
          erji: this.data.erji
        })
        console.log(this.data.erji)
      }
    })
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