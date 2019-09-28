//index.js
const app = getApp()
var template = require('../template/template.js');

let _page, _this;
var theUrl = getApp();

Page({
  data: {
    countdown: "21:21:03",
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    hidden188: false,
    duration: 1000,
    myUserInfo:{},
    shareFlagOrNot:false,
    slider: [],
    toggleShareFlag:false,
    disabled:true ,
    billchangeimage:"",
    firstpageShareTitle:"",
    firstpagehomeshareimgall2:"",
    firstpagehomeshareimgall:"",
    billtitle:"", 
    billgoodsshareimgall:"", 
    billgoodsshareimg:"", 
    billchangeimage:"",
    firstpagehomeshareimg:"",
    countdownstr: "",
    superLongTime1: "",
    superLongTime2: "",
    finalCountDownTime: "",
    finalCountDownTimeFinal: "",
    respectiveHour: "",
    respectiveMinute: "",
    respectiveSecond: "",
    hidden: true,
    swiperCurrent: 0,
    bannerImgList: [],//轮播图列表
    hotgoods: [],
    imgUrl: [
      { id: "0", picUrl: "../../images/h-0.png" },
      { id: "1", picUrl: "../../images/h-1.png" }]
  },
  // shareThepic:function()
  // {
  //   this.onShareAppMessage();
  // },
  toshophd(){
    wx.navigateTo({
      url: `/pages/shophd/shophd`,
    })
  },
  tovipqy(){
    wx.navigateTo({
      url: `/pages/vipqy/vipqy`,
    })
  },
  toseckill(){
    wx.navigateTo({
      url: `/pages/seckill/seckill`,
    })
  },
  totimecard(){
    wx.navigateTo({
      url: `/pages/timecard/timecard`,
    })
  },
 
  onShareAppMessage() {
      this.setData({
        shareFlagOrNot: true
      });  
    
    // setTimeout(function () {
   
    var count = 0;
    setInterval(function () {
      count++;
      if (count == 5) {
        console.log("数据到达5了");
        return {
          title: '图片',
          path: "pages/firstpage/firstpage"
        }
        //  continue;
      }
    }, 1000);

    // }, 10000)

      // this.setData({
      //   shareFlagOrNot: false
      // })
  },
  transportShare:function()
  {  
    
     this.onShareAppMessage();
   
    //  this.setData({
    //     shareFlagOrNot: false
    //   })
  },
// --------------------------------------------以下是新的分享全部------------------------------------------------------
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
        billchangeimage: that.data.billgoodsshareimgall
      });
      that.onShareAppMessage();
    }
  },
  shareTheBigImg2: function () {
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
  savePhoto: function () {
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
              console.log(res);
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
              console.log("保存失败的原因.." + res.data.result);
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
    });
    var that = this;
    // var billtitle="";
    // var billgoodsshareimgall="";
    // var billgodosshareimg="";
    console.log("获取的商品的id是" + that.data.productId);

    wx.request({
      url: theUrl.data.baseUrl + '/mini/homeShareQrcode',
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session")
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
            billgoodsshareimgall: res.data.result.homeshareimgall,
            billgoodsshareimg: res.data.result.homeshareimg
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

// --------------------------------------------以上是新的分享全部------------------------------------------------------
  gup:function(name, url){
    if(!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
  },
  // 判断用户是否是通过扫码进入通过options.s是否为空判断,如果为空,则不是通过扫码进入的 ,则将登陆接口返回的storeid直接存入storage

  //如果s不为空,则用户是通过扫码进入的,则将options.s,options,f,options.g的值作为参数storeid,frommid,goodsid作为新的参数,重新请求一遍登录接口,并将这三个值存入storage,其它接口通过wx.getStorage("xxX")来获取storeid，并作为参数请求其它对应的接口
   onLoad: function (options) {
     
    //  wx.setStorageSync("g", options.g);
    //  wx.setStorageSync("f", options.f);
    //  if (options.q) {
    //    let scan_url = decodeURIComponent(options.q);
    //    let platform_id = common.gup('s', scan_url);
    //    console.log("获取的s是" + platform_id);
       
    //    // console.log(platform_id, 'platform_id------')
    //    //app.globalData.platId = platform_id;
    //  }
    this.getFirstSharePic();
    var newFinalTime = "";
    _page = this;
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
    var sliderhotgoods = [];
    // //推荐频道
    // getRecommend(function (data) {
    //   _page.setData({
    //     slider: data.data.slider
    //   })
    // })

    console.log("这是在首页获得的rd_session" + wx.getStorageSync("rd_session"));

    var myDate = new Date(); //实例一个时间对象；
    // myDate.getFullYear();   //获取系统的年；
    // myDate.getMonth() + 1;   //获取系统月份，由于月份是从0开始计算，所以要加1
    // myDate.getDate(); // 获取系统日，
    myDate.getHours(); //获取系统时，
    console.log("当前的时间是" + myDate.getHours());
    myDate.getMinutes(); //分
    console.log("当前的分钟是" + myDate.getMinutes());
    myDate.getSeconds(); //秒
    console.log("当前的秒数是" + myDate.getSeconds());

    console.log("倒计时的小时数是:" + (23 - myDate.getHours()));
    console.log("倒计时的分钟数是:" + (59 - myDate.getMinutes()));
    console.log("倒计时的秒数是:" + (59 - myDate.getSeconds()));
    newFinalTime = (23 - myDate.getHours()) + ":" + (59 - myDate.getMinutes()) + ":" + (59 - myDate.getSeconds());
    console.log("得到的随后的时间是----" + newFinalTime)
    // -----------------------------
    var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
    console.log("获取的时间----------------------是" + endTime);
    console.log("获取的时间----------------是" + (date2 * 1000).toLocaleString().replace(/,/g, ""));
    console.log("获取的时间999999999999999999是" + myDate * 1000);
    _page.setData({
      superLongTime1: (date2 * 1000).toLocaleString().replace(/,/g, ""),
      superLongTime2: myDate * 1000
    });

    console.log("获取的superLongTime1是" + _page.data.superLongTime1);
    console.log("获取的superLongTime2是" + _page.data.superLongTime2);
    console.log("两者相减获得时间是" + (_page.data.superLongTime1 - _page.data.superLongTime2));

    _page.setData({

      finalCountDownTime: _page.data.superLongTime1 - _page.data.superLongTime2

    });

    console.log("倒计时开始时候的总的时间是" + (_page.data.finalCountDownTime));

    // var days = parseInt(mss / (1000 * 60 * 60 * 24));
    _page.setData({
      finalCountDownTimeFinal: (_page.data.finalCountDownTime)
    });

    console.log("当前的finalCountDownTimeFinal是" + _page.data.finalCountDownTimeFinal);
    // var myhours = parseInt(((this.data.finalCountDownTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // var myminutes = parseInt(((this.data.finalCountDownTime) % (1000 * 60 * 60)) / (1000 * 60));
    // var myseconds = ((this.data.finalCountDownTime) % (1000 * 60)) / 1000;
    // var newTime = new Date(this.data.finalCountDownTimeFinal);
    setInterval(function () {
      // console.log("当前的finalCountDownTimeFinal是" + this.data.finalCountDownTimeFinal);
    }, 1000);
    var mydays = parseInt(_page.data.finalCountDownTime / (1000 * 60 * 60 * 24));
    var myhours = parseInt((_page.data.finalCountDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var myminutes = parseInt((_page.data.finalCountDownTime % (1000 * 60 * 60)) / (1000 * 60));
    var myseconds = (_page.data.finalCountDownTime % (1000 * 60)) / 1000;
    console.log("-------------------------我获取的需要的具体的小时是" + myhours);
    console.log("-------------------------我获取的需要的具体的分钟是" + myminutes);
    console.log("-------------------------我获取的需要的具体的秒数是" + myseconds);
    // console.log("我获取的倒计时的具体的时间是" + newTime);
    // console.log("我获取的倒计时的具体的时间是" + newTime.getMinutes());
    // console.log("倒计时开始前的小时数是" + myhours);
    // console.log("倒计时开始前的分钟数是" + myminutes);
    // console.log("倒计时开始前的秒数是" + myseconds);
    // console.log("获取的时间1是" + date2.getHours());
    // console.log("获取的时间2是" + date2.getMinutes());
    // console.log("获取的时间3是" + date2.getSeconds());
    // console.log("获取的时间4是" + myDate.getHours());
    // console.log("获取的时间5是" + myDate.getMinutes());
    // console.log("获取的时间6是" + myDate.getSeconds());
    // this.setData({
    //   myTime: date2.getFullYear()

    // })

    //获取当前的23：59：59 new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)

    console.log("首页倒计时" + new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)); //Mon Dec 04 2017 23:59:59 GMT+0800 (中国标准时间) 
    wx.request({
      url: theUrl.data.baseUrl + '/mini/home',
      data: {
        rd_session: wx.getStorageSync("rd_session"),
        storeid:wx.getStorageSync("storeid"),
      },
      method: "GET",

      success(v) {
        console.log("这是小程序首页接口返回给我的信息" + v);
        console.log(v.data.status);
        // if(v.data.status==1)
        // {
        // wx.showToast({
        //   title: v.data.message,
        // });
        // }
        console.log("这是首页接口返回给我的信息--------" + v.data.message);
        console.log("这是首页接口返回给我的轮播图信息--------" + v.data.result.adv);
        sliderhotgoods = v.data.result.hotgoods.filter(item => item.isoffer == "1");
        _page.setData({
          sliderhotgoods: sliderhotgoods
        });
        _page.setData({
          bannerImgList: v.data.result.adv
        });
        _page.setData({
          hotgoods: v.data.result.hotgoods
        })
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
    this.getCountDownClock();

  },
  getFirstSharePic:function()
  {
    var that=this;
   wx.request({
     url: theUrl.data.baseUrl +'/mini/homeShareQrcode',
     method:"GET",
     header: {
       'content-type': 'application/json' // 默认值
     },
     data:{
       storeid:wx.getStorageSync("storeid"),
       rd_session:wx.getStorageSync("rd_session")
     },
     success:function(res)
     {
      console.log("这是首页获取的分享图片的信息"+res);
          
       that.setData({
         firstpageShareTitle: res.data.result.title,//分享标题
         firstpagehomeshareimgall: res.data.result.homeshareimgall,//分享整图
         firstpagehomeshareimg: res.data.result.homeshareimg //分享图5
       })

     },
     fail:function(res)
     {

     }
   })
  },
  //分享功能完善------------------------------------------------------------------------------

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
        billchangeimage: that.data.billgoodsshareimgall
      });
      that.onShareAppMessage();
    }
  },
  shareTheBigImg2: function () {
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

  savePhoto: function () {
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
              console.log(res);
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
              console.log("保存失败的原因.." + res.data.result);
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
      url: theUrl.data.baseUrl + '/mini/homeShareQrcode',
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
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
            billgoodsshareimgall: res.data.result.homeshareimgall,
            billgoodsshareimg: res.data.result.homeshareimg
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

  //分享功能完善------------------------------------------------------------------------------

  // 得到倒计时的函数
  getCountDownClock: function () {
    var today = new Date(),//当前时间
      h = today.getHours(),
      m = today.getMinutes(),
      s = today.getSeconds();
    var date2 = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    var endTime = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds()
    var stopTime = new Date(endTime),//结束时间
      stopH = stopTime.getHours(),
      stopM = stopTime.getMinutes(),
      stopS = stopTime.getSeconds();
    var shenyu = stopTime.getTime() - today.getTime(),//倒计时毫秒数
      shengyuD = parseInt(shenyu / (60 * 60 * 24 * 1000)),//转换为天
      D = parseInt(shenyu) - parseInt(shengyuD * 60 * 60 * 24 * 1000),//除去天的毫秒数
      shengyuH = parseInt(D / (60 * 60 * 1000)),//除去天的毫秒数转换成小时
      H = D - shengyuH * 60 * 60 * 1000,//除去天、小时的毫秒数
      shengyuM = parseInt(H / (60 * 1000)),//除去天的毫秒数转换成分钟
      M = H - shengyuM * 60 * 1000;//除去天、小时、分的毫秒数
    var S = parseInt((shenyu - shengyuD * 60 * 60 * 24 * 1000 - shengyuH * 60 * 60 * 1000 - shengyuM * 60 * 1000) / 1000)//除去天、小时、分的毫秒数转化为秒
    this.setData({
      respectiveHour: shengyuH < 10 ? ('0' + shengyuH) : shengyuH,
      respectiveMinute: shengyuM < 10 ? ('0' + shengyuM) : shengyuM,
      respectiveSecond: S < 10 ? ('0' + S) : S
    });
    // console.log("你好,我最后获取的倒计时的小时数是" + this.data.respectiveHour);
    // console.log("你好,我最后获取的倒计时的分钟数是" + this.data.respectiveMinute);
    // console.log("你好,我最后获取的倒计时的秒数是" + this.data.respectiveSecond);
    // document.getElementById("div").innerHTML = (shengyuD + "天" + shengyuH + "小时" + shengyuM + "分" + S + "秒" + "<br>");
    setTimeout(this.getCountDownClock, 500);
    //
  },

  goToDetail() {
    wx.navigateTo({
      url: 'productdetail/productdetail',
    })
  },
  goDetailPage: function (e) {
    console.log("当前的商品的id是" + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../productdetail/productdetail?productId=' + e.currentTarget.dataset.id,
    })
  },

  swiperChange(e) {
    _page.setData({
      swiperCurrent: e.detail.current
    })
  }
});


function getRecommend(callback) {
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}