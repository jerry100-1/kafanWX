// pages/firstpage/myallorder/myallorder.js
var theUrl=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected2: false,
    selected3: false,
    selected4: false,
    selected5: false,
    selected6: false,
    selected7:false,
    myallexpressList:[],
    hidden: false,
    hidden1: false,
    hidden2: false,
    showTheTransportFlag:false,
    myallOrderList:[],//所有的订单
    myNeedPayOrder:[],//待付款订单
    myselfMention:[],//待自提订单
    myClosedOrderList:[],//已关闭订单
    myToBeShippedOrder:[],//待发货订单
    myOrderToBeReceived:[],//待收货订单
    myOrderHasFinished:[],//已完成订单,
    goNeedToPayOrder:"",//获取个人中心传递过来的标志位--待付款
    goNeedToShipped: "",//获取个人中心传递过来的标志位--待发货
    goMyConfirmOrder: " ",//获取个人中心传递过来的标志位--待确认
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log("此页面接收的goNeedToPayOrder是" + options.goNeedToPayOrder);
    console.log("此页面接收的goNeedToShipped是" + options.goNeedToShipped);
    console.log("此页面接收的goMyConfirmOrder是" + options.goMyConfirmOrder);
    if (options.goNeedToPayOrder==1)
    {
      this.setData({
        selected:false,
        selected2:true,
        selected3: false,
        selected4: false,
        selected5: false,
        selected6: false,
        selected7: false,
      })
    } 
    if (options.goNeedToShipped==2)
    {
      this.setData({
        selected: false,
        selected2: false,
        selected3: false,
        selected4: false,
        selected5: false,
        selected6: false,
        selected7: true,
      })
    }
    if (options.goMyConfirmOrder==3)
    {
      this.setData({
        selected: false,
        selected2: false,
        selected3: false,
        selected4: false,
        selected5: true,
        selected6: false,
        selected7: false,
      })
    }
    this.getMyAllOrderList();
    this.getMyNeedPayOrder();
    this.getMyselfMention();
    this.getMyToBeShippedOrder();
    this.getMyClosedOrder();
    this.getMyOrderToBeReceived();
    this.getMyOrderHasFinished();
  },

  lookMyDetailTransport:function()
  {
   console.log("你点击了查看物流按钮-------------------");

   this.setData({
     showTheTransportFlag: true
   })  
  },
  lookMyDetailTransport2: function (e) {
    console.log("你点击了查看物流按钮-------------------100000");
    console.log("你好,我获得的物流的express是" + e.currentTarget.dataset.express);
    console.log("你好,我获得的物流的expresssn是" + e.currentTarget.dataset.expresssn);
    if (e.currentTarget.dataset.express=="")
    {
      wx.showToast({
        title: '暂无任何物流信息',
      });
      return;
    }else
    {
      this.setData({
        showTheTransportFlag: true
      });
      console.log("--------------9090890-898990-980----");
      console.log("我获取的物流单号express是" + e.currentTarget.dataset.express);
      wx.request({
        url: theUrl.data.baseUrl + '/mini/order/getexpress',
        data: {
          storeid: wx.getStorageSync("storeid"),
          rd_session: wx.getStorageSync("rd_session"),
          express: e.currentTarget.dataset.express,
          expresssn: e.currentTarget.dataset.expresssn
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "get",
        success: function (res) {
          if (res.data.status==1) {
            console.log("这是所有的物流信息");
            this.setData({
              // myallexpressList:res.data.
            })
          }else
          {
            console.log(res.data.message);
          }
        },
        fail: function (res) {

        }
      })
    }
   


  },
  closeTheTransportModal:function()
  {
    this.setData({
      showTheTransportFlag: false
    })  
  },

 
  getMyClosedOrder:function()
  {
    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + "/mini/order",
      method:"get",
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        page: 1,
        limit: 15,
        status: -1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("这是获取已关闭订单接口返回给我的信息" + res.data);
          that.setData({
            myClosedOrderList: res.data.result.data
          })

        }
      },
      fail: function (res) {

      }

    })
  },
  getMyOrderToBeReceived:function()
  {
    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + "/mini/order",
      method: "get",
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        page: 1,
        limit: 15,
        status:2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("这是获取待收货订单接口返回给我的信息" + res.data);
          that.setData({
            myOrderToBeReceived: res.data.result.data
          })

        }
      },
      fail: function (res) {

      }

    })
  },
  getMyOrderHasFinished:function()
  {
    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + "/mini/order",
      method: "get",
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        page: 1,
        limit: 15,
        status: 4
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("这是获取已完成订单接口返回给我的信息" + res.data);
          that.setData({
            myOrderHasFinished: res.data.result.data
          })

        }
      },
      fail: function (res) {

      }

    })
  },
  getMyNeedPayOrder:function()
  {
    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + "/mini/order",
      method: "get",
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        page: 1,
        limit: 15,
        status: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("这是获取待付款订单接口返回给我的信息" + res.data);
          that.setData({
            myNeedPayOrder: res.data.result.data
          })

        }
      },
      fail: function (res) {

      }

    })
  },
  getMyToBeShippedOrder:function()
  {
    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + "/mini/order",
      method: "get",
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        page: 1,
        limit: 15,
        status: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("这是获取所有待发货订单接口返回给我的信息" + res.data);
          that.setData({
            myToBeShippedOrder: res.data.result.data
          })

        }
      },
      fail: function (res) {

      }

    })
  },
  getMyselfMention:function()
  {

    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + "/mini/order",
      method: "get",
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        page: 1,
        limit: 15,
        status:3
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == 1) {
          console.log("这是获取所有待自提订单接口返回给我的信息" + res.data);
          that.setData({
            myselfMention: res.data.result.data
          })

        }
      },
      fail: function (res) {

      }

    })
  },
  getMyAllOrderList:function()
  {
    var that=this;
     wx.request({
       url: theUrl.data.baseUrl +"/mini/order",
       method:"get",
       data:{
         storeid: wx.getStorageSync("storeid"),
         rd_session:wx.getStorageSync("rd_session"),
         page:1,
         limit:15,
         status:""
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success:function(res)
       {
         if(res.data.status==1)
         {
           console.log("这是获取所有订单接口返回给我的信息"+res.data);
           that.setData({
              myallOrderList: res.data.result.data
           })

         }
       },
       fail:function(res)
       {

       }
       
     })

  },
  deleteTheOrder:function(e)
  {
    var that=this;
    console.log("订单的id是" + e.currentTarget.dataset.orderid);
    wx.showModal({
      title: '提示',
      content: '是否删除该订单?',
      success:function(res)
      {
        if(res.confirm)
        {
          wx.request({
            url: theUrl.data.baseUrl + '/mini/order/deleteorder',
            data: {
              id: e.currentTarget.dataset.orderid,
              storeid: wx.getStorageSync("storeid"),
              rd_session: wx.getStorageSync("rd_session"),
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "post",
            success: function (res) {
              if(res.data.status==1)
              {
                  that.getMyNeedPayOrder();
                  wx.showToast({
                    title: '删除成功!',
                  });

              }else
              {
                console.log(res.data.message);
                // wx.showToast({
                //   title: res.data.message,
                // })
              }

            },
            fail: function () {

            }

          })


        }
      }
    })
  },
  selected: function (e) {
    this.setData({
      selected: true,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,
      selected6: false,
      selected7:false,
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected3: false,
      selected4: false,
      selected5: false,
      selected6: false,
      selected7: false,
    })
  },
  selected3: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: true,
      selected4: false,
      selected5: false,
      selected6: false,
      selected7: false,
    })
  },
  selected4: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: true,
      selected5: false,
      selected6: false,
      selected7: false,
    })
  },
  selected5: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: true,
      selected6: false,
      selected7: false,
    })
  },
  selected6: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,
      selected6: true,
      selected7: false,
    })
  },
  selected7: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,
      selected6: false,
      selected7: true,
    })
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