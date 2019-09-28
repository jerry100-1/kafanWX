// pages/login/login.js
var theUrl = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authcode: "",
    rd_session: "",
    mys:"",
    showBtnFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
     this.goLogin();

     console.log("登陆页面得到的s是"+options.s);
    if (options.s!=" ") {
      console.log("您是通过扫码进入的!!!@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log("当前的门店storeid是" + options.s);
      var that = this;
      wx.setStorage({
        key: 'storeid',
        data: options.s
      });
      wx.setStorage({
        key: 'goodsid',
        data: options.g
      });
      wx.setStorage({
        key: 'frommid',
        data: options.f
      });

        wx.login({
          success: function (res) {
            console.log("获取的用户登录凭证是:" + res.code)
            //  ---------------------------------------------------
            wx.request({
              url: theUrl.data.baseUrl + '/mini/login',
              data: {
                code: res.code,
                storeid: options.s,
                goodsid: options.g,
                frommid: options.f
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: "POST",

              success(v) {

                console.log("这是登陆接口返回给我的信息100000" + v);
                console.log(v.data.status);
                wx.setStorage({
                  key: 'rd_session',
                  data: v.data.result.rd_session
                });
              }


            })

          }

        });



    }

    //如果门店id为空,说明用户不是通过扫描二维码进入的;
    if(options.s==" ")
    {
      console.log("您不是通过扫描二维码进入的!!!@@@@@@@@@@@@@@@@@@@@@@@@@")
      wx.login({

        success: function (res) {

          console.log("获取的用户登录凭证是:" + res.code)

          //  ---------------------------------------------------

          wx.request({
            url: theUrl.data.baseUrl + '/mini/login',
            data: {
              code: res.code
            },
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },

            success(v) {

              console.log("这是登陆接口返回给我的信息100000" + v);
              console.log(v.data.status);
              // if(v.data.status==1)
              // {
              // wx.showToast({
              //   title: v.data.message,
              // });

              // }

              // var getAvatar = v.data.result.memberinfo.avatar;
              // var getNickname = v.data.result.memberinfo.nickname;

              // if (getAvatar == "" || getNickname == "") {
              //   // console.log("你有会员信息需要更新!!!");
              //   wx.showToast({
              //     title: '你有会员信息需要更新!!!',
              //   })
              // }
              // console.log("这是登录接口返回给我的信息--------" + v.data.message);
              // console.log("登陆接口返回给我的rd_session是" + v.data.result.rd_session);
              // that.data.rd_session = v.data.result.rd_session;
              // wx.setStorageSync("rd_session", v.data.result.rd_session);
              wx.setStorage({
                key: 'rd_session',
                data: v.data.result.rd_session
              });
              wx.setStorage({
                key: 'storeid',
                data: v.data.result.storeid
              });

              console.log("你好,我获取的rd_session是" + wx.getStorageSync("rd_session"));
              //  wx.navigateTo({
              //    url: '../firstpage/firstpage',
              //  })
            }

          })

        }
      });
 
    }

      console.log(options.s);
    
      this.setData({
        mys: options.s
      })
       
  },
  goLogin: function () {
   
    var that = this;
    wx.login({

      success: function (res) {

        console.log("获取的用户登录凭证是:" + res.code)

        //  ---------------------------------------------------

        wx.request({
          url: theUrl.data.baseUrl + '/mini/login',
          data: {
            code: res.code
          },
          method: "POST",
          success(v) {
            //console.log("这是登陆接口返回给我的信息" + v.data.result.memberinfo.avatar);
             console.log(v.data.status);
// ------------------------------------------------------------------------------------------
            //var getAvatar = v.data.result.memberinfo.avatar||"";
          //   var getNickname = v.data.result.memberinfo.nickname||undefined;
          //   var getMyPhone = v.data.result.memberinfo.phone||null;
          //   console.log("你好,我获取的memberinfo中的avatar是" + getAvatar);
          //   console.log("你好,我获取的memberinfo中的nickname是" + getNickname);
          //   console.log("你好,我获取的memberinfo中的phone是" + getMyPhone);
          //  // 如果用户头像或者昵称为空,需要更新用户信息
          //   if (getAvatar == "" || getNickname == "") {
          //     // console.log("你有会员信息需要更新!!!");
          //     //  wx.showToast({
          //     //    title: '你有会员信息需要更新!!!',
          //     //  })
          //     wx.showModal({
          //       title: '提示',
          //       content: '你有会员信息需要更新',
          //       success(res) {
          //         if (res.confirm) {
          //           //获取用户的信息

          //           wx.getSetting({
          //             success(res) {
          //               if (res.authSetting['scope.userInfo']) {
          //                 wx.getUserInfo({
          //                   success: function (res) {
          //                     console.log("这是在首页的启动阶段");
          //                     var userInfo = res.userInfo
          //                     that.setData({
          //                       myUserInfo: userInfo
          //                     })
          //                     var nickName = userInfo.nickName
          //                     var avatarUrl = userInfo.avatarUrl
          //                     var gender = userInfo.gender //性别 0：未知、1：男、2：女
          //                     var province = userInfo.province
          //                     var city = userInfo.city
          //                     var country = userInfo.country
          //                     var address = userInfo.address;
          //                     console.log("首页在微信获取的用户匿名" + nickName);
          //                     console.log("首页在微信获取的用户省份是" + province);
          //                     console.log("首页在微信获取的用户城市是" + city);
          //                     console.log("首页在微信获取的用户头像是" + avatarUrl);
          //                     // -------------发送请求,更新用户信息----------------------
          //                     wx.request({
          //                       url: theUrl.data.baseUrl + '/mini/updateuserinfo',
          //                       method: "POST",
          //                       header: {
          //                         'content-type': 'application/json' // 默认值
          //                       },
          //                       data: {
          //                         storeid: wx.getStorageSync("storeid"),
          //                         rd_session: wx.getStorageSync("rd_session"),
          //                         userinfo: that.data.myUserInfo
          //                       },
          //                       success: function (res) {
          //                         if (res.data.status == 1) {
          //                           wx.showToast({
          //                             title: '更新成功!!!',
          //                           })
          //                         }
          //                       },
          //                       fail: function () {

          //                       }

          //                     })








          //                     // -------------发送请求,更新用户信息----------------------
          //                   }
          //                 })

          //               }
          //             }
          //           })



          //         } else if (res.cancel) {


          //         }
          //       }

          //     })


          //   }

            //发送请求,更新用户手机号码
            // 更新用户手机号码----------------------------------------------------------------------------
            // if (getMyPhone==null) {
            //   // console.log("你有会员信息需要更新!!!");
            //   //  wx.showToast({
            //   //    title: '你有会员信息需要更新!!!',
            //   // that.setData({
            //   //   showBtnFlag: true
            //   // })  
            //   //  })
            //   wx.showModal({
            //     title: '提示',
            //     content: '您的手机号码需要更新',
            //     success(res) {
            //       if (res.confirm) {
            //                            //获取用户的信息
            //         wx.getSetting({
            //           success(res) {
            //             if (res.authSetting['scope.userInfo']) {
            //               wx.getUserInfo({
            //                 success: function (res) {
            //                    console.log("获取手机号码-----------------------------");
            //                     var userInfo = res.userInfo
            //                     that.setData({
            //                       myUserInfo: userInfo
            //                     });

            //                     //this.getPhoneNumber();
            //                   // -------------发送请求,更新用户手机号码----------------------
            //                   wx.request({
            //                     url: theUrl.data.baseUrl + '/mini/updatephone',
            //                     method: "POST",
            //                     header: {
            //                       'content-type': 'application/json' // 默认值
            //                     },
            //                     data: {
            //                       storeid: wx.getStorageSync("storeid"),
            //                       rd_session: wx.getStorageSync("rd_session"),
            //                       phoneinfo: that.data.myUserInfo
            //                     },
            //                     success: function (res) {
            //                       if (res.data.status == 1) {
            //                         wx.showToast({
            //                           title: '更新成功!!!',
            //                         })
            //                       }
            //                     },
            //                     fail: function () {

            //                     }

            //                   })








            //                   // -------------发送请求,更新用户信息----------------------
            //                 }
            //               })

            //             }
            //           }
            //         })



            //       } else if (res.cancel) {


            //       }
            //     }

            //   })


            // }
            

            // 更新用户手机号码----------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
            
            console.log("这是登录接口返回给我的信息--------" + v.data.message);

            // if(v.data.status==1)
            // {
            // wx.showToast({
            //   title: v.data.message,
            // });
            // }
              console.log("这是登录接口返回给我的信息--------" + v.data.message);
              console.log("登陆接口返回给我的rd_session是" + v.data.result.rd_session);
              console.log("登陆接口返回给我的storeid是" + v.data.result.storeid);
            // that.data.rd_session = v.data.result.rd_session;
            // wx.setStorageSync("rd_session", v.data.result.rd_session);
            wx.setStorage({
              key: 'rd_session',
              data: v.data.result.rd_session
            });
            // wx.setStorage({
            //   key: 'storeid',
            //   data: v.data.result.storeid
            // });
             wx.setStorage({
               key: 'storeid',
               data: that.data.mys
            });
            wx.navigateTo({
              url: '../firstpage/firstpage',
            });
            console.log("你好,我获取的rd_session是" + wx.getStorageSync("rd_session"));
            // wx.navigateTo({
            //   url: '../firstpage/firstpage',
            // });


          }

        })

        //-----------------------------------------------------------------
        // if (res.code) {

        //   //发起网络请求

        //   wx.request({
        //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=appid&secret=secret&js_code=js_code&grant_type=authorization_code',

        //     data: {

        //       appid: 'wxbb799a24a503527c',

        //       secret: '3d50a2dfa4dab5407e0581caf76a0a6d',

        //       js_code: res.code,

        //       grant_type: 'authorization_code'

        //     },

        //     success(v) {

        //       console.log("登陆成功,获取的用户openid是" + v.data.openid);
        //       console.log("登陆成功,获取的用户session_key是" + v.data.session_key);

        //       console.log()

        //     }

        //   })

        // } else {

        //   console.log('登录失败！' + res.errMsg)

        // }

      }

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getPhoneNumber(e) {
    console.log("这是用户手机号的相关信息1" + e.detail.errMsg)
    console.log("这是用户手机号的相关信息2" + e.detail.iv)
    console.log("这是用户手机号的相关信息3" + e.detail.encryptedData)
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