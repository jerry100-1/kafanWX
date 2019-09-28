// pages/firstpage/productdetail/productdetail.js
const app = getApp();
var template = require('../template/template.js');

var WxParse = require('../wxParse/wxParse.js');

var theUrl = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate: 'meat',
    scrollTop: 0,
    content: "",
    myoptionthumb:"",
    myoptionsales:" ",
    choosestate: "",
    myprice: "",
    myinitprice: "",
    disabled:true,
    billtitle: "",
    billgoodssshareimg: "",
    billgoodsshareimgall: "",
    billchangeimage: "",
    activeFlag1: true,
    selectConfirmFlag: true,
    selectindex: "",
    activeFlag2: false,
    theProductPrice: "",
    activeFlag3: false,
    indicatorDots: true,
    autoplay: true,
    productdetailcomment: "",
    interval: 2000,
    chooseFlag: true,
    src: "",
    count2: 1,
    toggleShareFlag: false,
    hotGoodsList: [],
    productId: "",//产品的id
    productScaleId: "",//产品规格的id
    productScalePrice: "",//产品价格
    goodsSales: "",
    hidden188: false,
    couponsnum: "",//优惠券的数量
    hidden: false,
    repectiveComment: "",
    optionspriceArray: [],
    couponsList: [],//优惠券的列表
    couponsPrice: "",//优惠券价值
    couponsNum: "",//优惠券数量
    optionsinfo: [],//产品规格列表
    optionsinfoLength: "",
    myinitprice: "",
    goodsInfo: "",
    repectiveCommentUserMsg: "",
    detailPageBanner: [],
    duration: 1000,
    imgUrl: [
      { id: "0", picUrl: "./images/h-19.png" },
      { id: "1", picUrl: "./images/h-19.png" }
    ],


    productScaleList: [
      { id: "1", text: "258ml" },
      { id: "2", text: "580ml" },
      { id: "3", text: "580ml首次购买赠送价值" }
    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  changeselectColor: function (e) {
    var choosestate = e.currentTarget.dataset.selectindex;
    var myprice = e.currentTarget.dataset.myprice;
    this.setData({
      myprice: myprice
    });
    this.setData({
      theProductPrice: this.data.myprice
    })
    console.log("获取的当前的点击的规格产品的索引是" + choosestate);
    this.setData({
      choosestate: choosestate
    })
  },
  
  shareTheBigImg: function () {
    this.setData({
      disabled: false
    });
    if (this.data.billtitle == "") {
      wx.showToast({
        title: '该商品无分享内容',
      })
      return;
    } else {
      var that = this;
      
      that.setData({
        billchangeimage:that.data.billgoodsshareimgall
      });
      that.onShareAppMessage();
    }
  },
  shareTheBigImg2:function()
  {
    wx.showToast({
      title: '点击触发分享功能!',
    })
    this.setData({
      disabled: false
    });
    if (this.data.billtitle == "") {
      wx.showToast({
        title: '该商品无分享内容',
      })
      return;
    } else {
      var that = this;

      that.setData({
        billchangeimage: that.data.billgoodsshareimgall
      });
      that.onShareAppMessage();
    }
  },
  // https://www.jb51.net/article/151751.htm
  saveMyImageToPhotosAlbum: function () {
    console.log("点击了保存图片到相册!!!");
    this.setData({
      disabled: true
    });
  //  this.savePhoto();
    console.log("点击了保存图片到相册2!!!");
    var that = this;
    that.setData({
      billchangeimage: that.data.billgoodsshareimg
    });
 
    // let that = this
    //若二维码未加载完毕，加个动画提高用户体验
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    //判断用户是否授权"保存到相册"
    // wx.getSetting({
    //   success(res) {
    //     //没有权限，发起授权
    //     if (!res.authSetting['scope.writePhotosAlbum']) {
    //       wx.authorize({
    //         scope: 'scope.writePhotosAlbum',
    //         success() {//用户允许授权，保存图片到相册
    //           this.savePhoto();
    //           wx.showToast({
    //             title: '授权成功!!!',
    //           })
    //         },
    //         fail() {//用户点击拒绝授权，跳转到设置页，引导用户授权
    //           wx.openSetting({
    //             success() {
    //               wx.authorize({
    //                 scope: 'scope.writePhotosAlbum',
    //                 success() {
    //                   this.savePhoto();
    //                 }
    //               })
    //             }
    //           })
    //         }
    //       })
    //     } else {//用户已授权，保存到相册
    //       this.savePhoto()
    //     }
    //     that.savePhoto();
    //   }
    // });
    wx.saveImageToPhotosAlbum({
      filePath: that.data.billchangeimage,
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          duration: 1500,
        })
      },
      fail: function (res) {
        console.log(res)
        if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("打开设置窗口");
          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)
              if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                console.log("获取权限成功，再次点击图片保存到相册")
              } else {
                console.log("获取权限失败")
              }
            }
          })
        }
      }
    })
     
  },

  savePhoto:function() {
    let that = this
    console.log("保存图片到相册之前需要先下载！！！");
    wx.showToast({
      title: '保存中...',
    })
    wx.downloadFile({
      url: that.data.billchangeimage,
      success: function (res) {
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              wx.showToast({
                title: '保存成功...',
              })
            },
            fail(res) {
              wx.showToast({
                title: '保存失败...',
              });
              // that.setData({
              //   hidden188: false,
              //   toggleShareFlag:false
              // })
              console.log( res);
            }
          });
        }
      }
    });
    console.log("执行到此条语句！！！");
  },
  
  saveImage() {
    wx.showToast({
      title: '保存中...',
      })
    wx.downloadFile({
      url: that.data.billchangeimage,
      success: function (res) {
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              wx.showToast({
                title: '保存成功...',
              })
            },
            fail(res) {
              wx.showToast({
                title: '保存失败...',
              })
              console.log("保存失败的原因.."+res.data.result);
            }
          });
        }
      }
    });
  },



  openShareCtnFun: function () {
    //var that=this;
    // if (that.data.billgoodsshareimg=="")
    // {
    //   that.setData({
    //     hidden188: false
    //   });
    //   that.setData({
    //     toggleShareFlag: false
    //   });
    //   wx.showToast({
    //     title: '此商品暂无分享内容',
    //   })
    // }
    wx.showModal({
      title: '温馨提示',
      content: '分享时请点击微信图像激活',
    })
    var that = this;
    // var billtitle="";
    // var billgoodsshareimgall="";
    // var billgodosshareimg="";
    console.log("获取的商品的id是" + that.data.productId);

    wx.request({
      url: theUrl.data.baseUrl + '/mini/goodsShareQrcode',
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        goodsid: that.data.productId
      },
      method: "GET",
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        if (res.data.status == 1) {
          that.setData({
            hidden188: true
          });
          that.setData({
            toggleShareFlag: true
          });
          console.log("这是分享海报接口返回的数据 " + res.data.result);
          that.setData({
            billtitle: res.data.result.title,
            billgoodsshareimgall:res.data.result.goodsshareimgall,
            billgoodsshareimg: res.data.result.goodsshareimg
          });
          that.setData({
            billchangeimage: that.data.billgoodsshareimgall
          })
        } else {
          // wx.showToast({
          //   title: '此商品暂无分享内容',
          // })
          wx.showModal({
            title: '温馨提示',
            content: '此商品暂无分享内容,请分享其它商品吧!',
          })
          that.setData({
            hidden188: false
          });
          that.setData({
            toggleShareFlag: false
          });
        }

      },
      fail: function (res) {
        wx.showToast({
          title: '此商品暂无分享内容',
        })
        that.setData({
          hidden188: false
        });
        that.setData({
          toggleShareFlag: false
        });

        return;
      }
    })
  },
  closeAllShareCtn: function () {
    console.log("点击了关闭按钮");
    this.setData({
      toggleShareFlag: false
    })
  },
  clickMenu: function (e) {
    if (e.currentTarget.dataset.cate == "fruit") {
      this.setData({
        activeFlag1: true,
        activeFlag2: false,
        activeFlag3: false,
      })
    } else if (e.currentTarget.dataset.cate == "vegetables") {
      this.setData({
        activeFlag1: false,
        activeFlag2: true,
        activeFlag3: false,
      })
    } else if (e.currentTarget.dataset.cate == "meat") {
      this.setData({
        activeFlag1: false,
        activeFlag2: false,
        activeFlag3: true,
      })
    }
    this.setData({
      cate: e.currentTarget.dataset.cate
    })
    console.log("你好,这是本页面获取的所有数据信息---------------------------------------" + e)
  },
  scroll(e) {
    this.setData({
      scrollTop: 1000
    })
    console.log(e)
  },

  closeAllShareCtn: function () {
    console.log("点击了关闭按钮");
    this.setData({
      toggleShareFlag: false
    })
  },
  goShoppingCart: function () {
    var that = this;
    // wx.showToast({
    //   title: '请先选择产品规格和数量',
    // });
    that.setData({
      hidden: true
    })
    console.log("此方法已执行了");
    // wx.navigateTo({
    //   url: '../shoppingcart/shoppingcart',
    // });
  },
  //增加数量
  plusNum: function () {
    this.setData({
      count2: ++this.data.count2
    })
  },
  //减少数量
  minusNum: function () {

    this.setData({
      count2: --this.data.count2
    });
    if (this.data.count2 < 0) {
      this.setData({
        count2: 0
      });
    }
  },
  onLoad: function (options) {

    // console.log("我在详情页获得的s是" + wx.getStorageSync("s"));
    // console.log("我在详情页获得的g是" + wx.getStorageSync("g"));
    // console.log("我在详情页获得的f是" + wx.getStorageSync("f"));
    var content = "";
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
    var that = this;
    // this.data.productScaleId="";
    this.data.productScalePrice = "";
    // this.data.count2=0;
    var that = this;
    var optionspriceArray = [];
    var minValue = "";//获取最低价
    var maxValue = "";//获取最高价
    var thecommenCtn = "";//详情内容
    console.log("这是在详情页面获得的rd_session是" + wx.getStorageSync("rd_session"));

    console.log("这是在首页页面获得传过来的productId为" + options.productId);
    this.setData({
      productId: options.productId
    });

    wx.request({
      url: theUrl.data.baseUrl + '/mini/goods/'.concat(options.productId),
      data: {
        rd_session: wx.getStorageSync("rd_session"),
        id: options.productId,
        storeid: wx.getStorageSync("storeid"),
      },
      method: "GET",

      success(v) {

        console.log("这是产品详情接口返回给我的信息" + v);
        console.log(v.data.status);
        console.log(v.data.result.optionsinfo);
        console.log("这是产品详情页面接口返回的产品的content" + v.data.result.goodsinfo.content)

        that.setData({
          thecommenCtn: v.data.result.goodsinfo.content
        });
        WxParse.wxParse('thecommenCtn', 'html', that.data.thecommenCtn, that, 5);
        for (var i = 0; i < v.data.result.optionsinfo.length; i++) {
          optionspriceArray.push(v.data.result.optionsinfo[i].price);
        }
        that.setData({
          optionspriceArray: optionspriceArray
        }),

          Array.prototype.compareVal = function () {

            if (this instanceof Array) {

              minValue = this[0];

              maxValue = this[0];

              for (var i = 0; i < this.length; i++) {

                var cur = this[i];

                cur > maxValue ? maxValue = cur : null;

                cur < minValue ? minValue = cur : null;

              }

              console.log("min= " + minValue + ",max = " + maxValue);  // min=1 ,max = 33

            }

          }

        optionspriceArray.compareVal();
        that.setData({
          minValue: minValue,
          maxValue: maxValue
        })
        console.log("组装后的数组的长度是" + optionspriceArray.length);

        that.setData({
          detailPageBanner: v.data.result.goodsinfo.pic,
          goodsInfo: v.data.result.goodsinfo,
          goodsSales: v.data.result.sales,
          optionsinfo: v.data.result.optionsinfo,
          optionsinfoLength: v.data.result.optionsinfo.length,
          couponsnum: v.data.result.couponsnum,
          couponsList: v.data.result.coupons,
          couponsPrice: v.data.result.couponsprice,
          couponsNum: v.data.result.couponsnum,
          repectiveComment: v.data.result.comment,
          repectiveCommentUserMsg: v.data.result.comment,
          hotGoodsList: v.data.result.hotgoods,

        });
        that.setData({
          myprice: that.data.optionsinfo[0]["price"]
        });
        that.setData({
          myoptionthumb: that.data.optionsinfo[0]["thumb"]
        });
        that.setData({
          myoptionsales: that.data.optionsinfo[0]["sales"]
        });
        that.setData({
          productScaleId: that.data.optionsinfo[0]["id"]
        })
        // for(var f=0;f<that.data.optionsinfo.length;f++)
        // {
        //   for(var j=0;j<that.data.optionsinfo[f].length;j++)
        //   {
        //     console.log("90909090909090909090");
        //   }
        // }
        // that.setData({
        //   myprice: that.data.optionsinfo[0][0]   
        // });        
        // if(v.data.status==1)
        // {
        // wx.showToast({
        //   title: v.data.message,
        // });
        // }
        // console.log("这是产品详情接口返回给我的信息--------" + v.data.message);
        // console.log("这是产品详情接口返回给我的轮播图信息--------" + v.data.result.adv);
        // that.setData({
        //   bannerImgList: v.data.result.adv
        // })
        // that.data.rd_session = v.data.result.rd_session;
        // wx.setStorageSync("rd_session", v.data.result.rd_session);
        // wx.setStorage({
        //   key: 'rd_session',
        //   data: v.data.result.rd_session
        // });

        // wx.navigateTo({
        //   url: '../firstpage/firstpage',
        // })
      }

    });

  },
  goProductEvaluatePage: function () {
    console.log("当前的商品的id---------------是" + this.data.productId);
    // alert("666");
    wx.navigateTo({
      url: '../firstpage/productEvaluateList/productEvaluateList?productId=' + this.data.productId,
    })
  },
  close: function () {
    console.log("9999999999999999999");
  },
  chooseTheOptitleSele: function (e) {
    console.log("你好,你选择的规格产品的id是" + e.currentTarget.dataset.optionid);
    console.log("你好,你选择的规格产品的销量是" + e.currentTarget.dataset.optionsales);
    console.log("你好,你选择的规格产品的图像是" + e.currentTarget.dataset.optionthumb);
    this.setData({
       myoptionthumb: e.currentTarget.dataset.optionthumb
    })
    this.setData({
       myoptionsales: e.currentTarget.dataset.optionsales
    })


    var theProductPrice = e.currentTarget.dataset.optionprice;
    this.setData({
      theProductPrice: theProductPrice,
      selectConfirmFlag: false
    });
    this.setData({
      myprice: this.data.theProductPrice
    })

    var choosestate = e.currentTarget.dataset.choosestate;

    //this.data.chooseFlag=false;
    this.setData({
      choosestate: choosestate,
    })
    console.log("我获取的点击的产品的规格current是" + e.currentTarget.dataset.current);
    console.log("这是所有的e" + e);
    console.log("我选择的产品的规格的id是" + e.currentTarget.dataset.optionid);
    console.log("我选择的产品的规格的价格是" + e.currentTarget.dataset.optionprice);
    this.setData({
      minValue: e.currentTarget.dataset.optionprice,
      maxValue: e.currentTarget.dataset.optionprice,
      productScaleId: e.currentTarget.dataset.optionid,
      productScalePrice: e.currentTarget.dataset.optionprice
    })

  },
  submitToShoppingCart: function () {
    var that = this;
    console.log("---------------------------------你提交的规格产品的id是" + that.data.productScaleId);
    console.log("提交到购物车之前的产品id是" + that.data.productId);
    console.log("提交到购物车之前的规格产品id是" + that.data.productScaleId);
    console.log("提交到购物车之前的规格产品价格是" + that.data.productScalePrice);
    console.log("提交到购物车之前的规格产品的数量是" + that.data.count2);

    if (that.data.count2 === 0) {
      wx.showToast({
        title: '亲,请选数量!',
      });
      return;
    }
    // if (that.data.productScaleId == "") {
    //   wx.showToast({
    //     title: '亲,请选规格!',
    //   });
    //   return;
    // }

    wx.request({
      url: theUrl.data.baseUrl + '/mini/cart', // 
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        goodsid: that.data.productId,
        optionid: that.data.productScaleId,
        num: that.data.count2
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("这是提交到购物车接口返回给我的信息" + res);
        console.log(res.data)
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.message,
          });
          wx.navigateTo({
            url: '../shoppingcart/shoppingcart?id=' + that.data.productId,
          });
          that.setData({
            hidden: false
          })
        }
      }
    });



  },
  goFirstPage: function () {
    wx.navigateTo({
      url: '../firstpage/firstpage',
    })
  },
  printConsole: function () {
    console.log("打印内容");
  },
  goShoppingCartPage: function () {
    wx.navigateTo({
      url: '../shoppingcart/shoppingcart',
    })
  },
  showChooseModal: function (e) {
    this.setData({
      hidden: true
    })
  },
  showModalView: function (e) {
    this.setData({
      hidden: true
    })
  },
  getAllMsgList: function () {
    console.log("点击了确定按钮");
  },
  closeTheModal: function () {
    this.setData({
      hidden: false
    })
    //this.data.hidden=false;
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
  onShareAppMessage: function (res) {
    var that = this;
    that.setData({
      billchangeimage: that.data.billgoodsshareimgall
    });
 
    console.log("点击了分享的按钮!!!");
    console.log("这是分享之前的图片的路径" + that.data.billchangeimage);
    // return {
    //   title: '图片',
    //   imgUrl: that.data.billgoodsshareimgall,
    //   path: "pages/firstpage/firstpage",
    //   success:function()
    //   {

    //   }
    // }
    // if (res.from === 'button') {
    //   console.log("来自页面内转发按钮");
    //   console.log(res.target);
    // }
    // else {
    //   console.log("来自右上角转发菜单")
    // }
    return{
      title: '转发',
      path: '/pages/firstpage/firstpage',
      success: function (res) {
        console.log('成功', res)

      }
    }
   
    // that.setData({
    //   hidden188:false
    // });
  
  },
  transpond: function (e) {
    this.onShareAppMessage();
  },
  // sharetheAll:function()
  // {
  //   this.onShareAppMessage();
  // }
})