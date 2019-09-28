// pages/firstpage/shoppingcart/shoppingcart.js
const app = getApp();
var template = require('../template/template.js');
var theUrl=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAllStatus: false,
    sum: 0,
    checkstatus: [],
    hidden:true,
    count:1,
    resultarray:[],
    thefinalOrder:"",
    goods:[],
    myCheckedTrue:[],
    userfulProductList:[]
    // userfulProductList:[
    //   { id: "1", pic: "../../../images/h-31.png", productTitle: "CANINE丝滑洗发露", productDescribe: "臻致系列_258ml",productPrice:"258"},
    //   { id: "2", pic: "../../../images/h-31.png", productTitle: "CANINE丝滑洗发露", productDescribe: "臻致系列_258ml", productPrice: "258" },
    //   { id: "3", pic: "../../../images/h-31.png", productTitle: "CANINE丝滑洗发露", productDescribe: "臻致系列_258ml", productPrice: "258" },
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 1, this)//0表示第一个tabbar
   console.log("你好,你刚才添加的产品的id是"+options.id);

    this.getAllProductList();
  },
  getAllProductList: function () {
    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + '/mini/cart', // 仅为示例，并非真实的接口地址
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"GET",
      success(res) {
        console.log("这是购物车列表接口返回给我的信息" + res);
        console.log(res.data)
        if (res.data.status == 1) {
          that.setData({
            userfulProductList: res.data.result.cartlist
          })

        }
      }
    });
  },


  minusFun:function(e)
  {
    var that=this;
    var newnum1 = e.currentTarget.dataset.num1;
    console.log("此方法执行了,我获取的点击减号之前的产品的数量是"+e.currentTarget.dataset.num);

    console.log("你好,我获取的e值是" + e);

    this.setData({
      newnum1: newnum1++
    });
    if (that.data.count<0)
    {
     // that.data.count=0;
      // this.setData({
      //   count:0
      // });
    }
  
  },

  newMinus:function(e)
  {
    var that = this;
    var currNum = e.currentTarget.dataset.num;//原来的购买的产品的数量;
    console.log("点击减号之前原来的产品数量是" + currNum);
    console.log("点击减号之前原来的索引是" + e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var userfulProductList = this.data.userfulProductList;
    var num = userfulProductList[index].num;
    var oop = num;
    num--;
    if (num<0) {
      num=0;
    }

    var currId = e.currentTarget.dataset.myid;//需要传给接口的产品的id;
    var currGoodsid = e.currentTarget.dataset.goodsid;//原来的购买的产品的id;
    var curreScaleID = e.currentTarget.dataset.scaleid;//原来的产品的规格的id
    console.log("需要传给接口的id是" + e.currentTarget.dataset.myid);
    console.log("原来的产品的id是" + currGoodsid);
    console.log("原来的产品的数量是" + e.currentTarget.dataset.num);
    console.log("获取的产品规格id是" + curreScaleID)

    userfulProductList[index].num = num;
    this.setData({
      userfulProductList: userfulProductList,
      num: num
    });

    if (this.data.checkstatus[index] == true) {
      var sum = this.data.sum;
      sum = sum - (oop - num) * userfulProductList[index].optionsinfo.price;
      this.setData({
        sum: sum,
      });
    }

    console.log("当前的产品的数量是" + num);


    //index = e.target.dataset['index']; //当前操作对象的 index 
    //userfulProductList[index] = parseInt(replyLikeArr[index]) + 1  //当前对象的原始值 +1 
    wx.request({
      url: theUrl.data.baseUrl + '/mini/cart/'.concat(currId), // 仅为示例，并非真实的接口地址
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        goodsid: currGoodsid,
        optionid: curreScaleID,
        num: num
      },
      method: "PUT",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        console.log("这是---------------------------");
        console.log("这是增加购物车数量接口返回给我的信息" + res);
        console.log(res.data)
        if (res.data.status == 1) {
          //that.getAllProductList();


        }
      }
    });

    //this.onCalcSelect();
  },

  newPlus:function (e) {
        var that=this;
        var currNum = e.currentTarget.dataset.num;//原来的购买的产品的数量;
        console.log("原来的产品数量是"+currNum);
        console.log("原来的索引是" + e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        var userfulProductList = this.data.userfulProductList;
        var num = userfulProductList[index].num;
        var oop = num;
        num++;
        
        userfulProductList[index].num = num;
        this.setData({
            userfulProductList: userfulProductList,
            num:num
        });

    var checkid = 'checkid' + index
    //判断当前商品是否被选中
    if (this.data.checkstatus[index] == true) {
      var sum = this.data.sum;
      sum = sum + (num - oop) * userfulProductList[index].optionsinfo.price;
      this.setData({
        sum: sum,
      });
    };
    console.log(this.data)

        console.log("当前的产品的数量是" +num);


        var currId = e.currentTarget.dataset.myid;//需要传给接口的产品的id;
        var currGoodsid = e.currentTarget.dataset.goodsid;//原来的购买的产品的id;
        var curreScaleID = e.currentTarget.dataset.scaleid;//原来的产品的规格的id
        console.log("需要传给接口的id是" + e.currentTarget.dataset.myid);
        console.log("原来的产品的id是" + currGoodsid);
        console.log("原来的产品的数量是" + num);
        console.log("获取的产品规格id是" + curreScaleID)
    
        //index = e.target.dataset['index']; //当前操作对象的 index 
        //userfulProductList[index] = parseInt(replyLikeArr[index]) + 1  //当前对象的原始值 +1 
        wx.request({
          url: theUrl.data.baseUrl + '/mini/cart/'.concat(currId), // 仅为示例，并非真实的接口地址
          data: {
            storeid: wx.getStorageSync("storeid"),
            rd_session: wx.getStorageSync("rd_session"),
            goodsid: currGoodsid,
            optionid: curreScaleID,
            num: num
          },
          method:"PUT",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {

            console.log("这是---------------------------");
            console.log("这是增加购物车数量接口返回给我的信息" + res);
            console.log(res.data)
            if (res.data.status == 1) {
              //that.getAllProductList();
             // this.bindCalcAll();

            }
          }
        });


    // this.onCalcSelect();


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
   * 单个复选框的选中、取消事件
   */
  checkboxChange: function (e) {
    if (e.detail.value.length == 1) {
      var checkid = e.target.dataset.checkid;
      var sum = this.data.sum;
      var userfulProductList = this.data.userfulProductList;
      sum = sum + userfulProductList[checkid].optionsinfo.price * userfulProductList[checkid].num;
      this.setData({
        sum: sum,
        ['checkstatus[' + checkid + ']']: true,
      });
      //判断是否所有商品都被选中
      var checkstatus = this.data.checkstatus;
      var p = true
      for (var i = 0; i < userfulProductList.length; i++) {
        if (checkstatus[i] == false || checkstatus[i] == undefined) {
          p = false;
        };
      };
      if (p) {
        this.setData({
          tag: true
        });
      } else {
        this.setData({
          tag: false
        });
      };
    } else {
      var checkid = e.target.dataset.checkid;
      var sum = this.data.sum;
      var userfulProductList = this.data.userfulProductList;
      sum = sum - userfulProductList[checkid].optionsinfo.price * userfulProductList[checkid].num;
      this.setData({
        sum: sum,
        ['checkstatus[' + checkid + ']']: false,
        //取消勾选后将全选置false
        tag: false
      });
    };
    console.log("你好,目前这个复选框选中的状态是" + this.data.checkstatus[checkid]);
   


  },
  /**
   * 全选事件（全选按钮和计算总价）
   */
  bindCalcAll: function (e) {
    var userfulProductList = this.data.userfulProductList;
    var checkstatus = [];
    var sum = 0;
    if (e.detail.value.length == 1) {
      for (var i = 0; i < userfulProductList.length; i++) {
        sum = sum + userfulProductList[i].optionsinfo.price * userfulProductList[i].num;
        checkstatus[i] = true;
      };
      this.setData({
        sum: sum,
        selectedAllStatus: true,
        checkstatus: checkstatus
      })
    } else {
      for (var i = 0; i < userfulProductList.length; i++) {
        checkstatus[i] = false;
      };
      this.setData({
        sum: sum,
        selectedAllStatus: false,
        checkstatus: checkstatus
      })
    }
  },
  //删除事件
  bindDelateGoods: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除这件商品吗',
      success: function (res) {
        if (res.confirm) {
          var delateid = e.target.dataset.delateid;
          var postsList = that.data.userfulProductList;
          postsList.splice(delateid, 1);
          that.setData({
            postsList: postsList
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  // //跳转事件
  // onLinkDetail: function (e) {
  //   var postid = e.currentTarget.dataset.post;
  //   console.log(postid)
  //   wx.navigateTo({
  //     url: '../detail/detail?id=' + postid,
  //   })
  // },
     //结算
     onCalcSelect: function (e) {

       console.log("你好,我获取的goodsid是" + e.currentTarget.dataset.goodsid);
       console.log("你好,我获取的scaleid是" + e.currentTarget.dataset.scaleid);
       console.log("你好,我获取的num是" + e.currentTarget.dataset.num);

       var newAkklength="";
        //  -----------请求立即购买提交订单接口-----------------
       var checkstatus = this.data.checkstatus;
       var cartlist = this.data.userfulProductList;
       var cartarray=[];
       var cartarray2=[];
       var cartarray3=[];
       var cartarray4=[];
       var thefinalOrder="";

       var goods=[];



       console.log("这是最初的cartarray的原来的面貌" + this.data.userfulProductList);


       for (var i = 0; i < checkstatus.length; i++) {
         if (checkstatus[i] === true) {
           cartarray.push(cartlist[i].id);
          // cartarray.push(cartlist[i].goodsid);
           console.log("当前的数组中的id有" + cartlist[i].id);
        //   console.log("当前的数组中的goodsid有" + cartlist[i].goodsid);
           this.setData({
             cartarray: cartarray
           })
         }
       };

     //获取所有的goodsid
       for (var a = 0; a < checkstatus.length; a++) {
         if (checkstatus[a] === true) {
          //  cartarray2.push(cartlist[i].id);
           cartarray2.push(cartlist[a].goodsid);
           console.log("当前的数组2中的goodsid有" + cartlist[a].goodsid);
           this.setData({
             cartarray2: cartarray2
           })
         }
       };

      //获取所有的optionsid
      for (var c = 0; c < checkstatus.length; c++) {
        if (checkstatus[c] === true) {
          //  cartarray2.push(cartlist[i].id);
          cartarray3.push(cartlist[c].optionid);
          console.log("当前的数组3中的optionid有" + cartlist[c].optionid);
          this.setData({
            cartarray3: cartarray3
          })
        }
      };

       //获取所有的num
       for (var d = 0; d < checkstatus.length; d++) {
         if (checkstatus[d] === true) {
           //  cartarray2.push(cartlist[i].id);
           cartarray4.push(cartlist[d].num);
           console.log("当前的数组4中的num有" + cartlist[d].num);
           this.setData({
             cartarray4: cartarray4
           })
         }
       };

       newAkklength = cartarray.length;

       console.log("当前的选种的商品的个数有" + newAkklength);


       var myarray2 = new Array();
       console.log("这段代码执行了吗");
       for (var i = 0; i < newAkklength; i++) {
         myarray2[i] = new Array();
         for (var j = 0; j < this.data.userfulProductList[i].optionsinfo.length; j++) {
           myarray2[i][j] = this.data.userfulProductList[i].optionsinfo.id;
           console.log("你好,当前的optionsid有下面这些" + myarray2[i][j]);
         }
       }
      //  this.setData({
      //    myarray2: myarray2
      //  });


      //  var myarray3 = new Array();
      //  console.log("这段代码执行了吗");
      //  for (var i = 0; i < newAkklength; i++) {
      //    myarray3[i] = new myarray3();
      //    for (var j = 0; j < this.data.userfulProductList[i].goodsinfo.length; j++) {
      //      myarray3[i][j] = this.data.userfulProductList[i].goodsinfo[j].id;
      //      console.log("你好,当前的goodsinfo有下面这些" + myarray3[i][j]);
      //    }
      //  }
      //  this.setData({
      //    myarray3: myarray3
      //  });
      //  console.log("这是所有的产品信息" + cartarray.length);
      //  //console.log("这是所有的产品信息的");
      // //  for (var i = 0; i < cartarray.length;i++)
      // //  {
      // //    for (var j = 0; j < cartarray[i].length;j++)
      // //    {
      // //      console.log("当前的num有" + cartarray[i][j].num);
      // //    }

      // //  }
      //  if (cartarray.length != 0) {
      //    var model = JSON.stringify(cartarray);
      //    console.log(model)
      //   //  wx.navigateTo({
      //   //   //  url: '../buyit/buyit?cartlist=' + model,
      //   //    url:'../storeSelfWay/storeSelfWay'
      //   //  });
      //  };
        //发送请求获取订单号码

       console.log("当前的cartarray2对应的goodsid分别是" + cartarray2);
       console.log("当前的cartarray3对应的optionsid分别是" + cartarray3);
       console.log("当前的cartarray4对应的num分别是" + cartarray4);

      //  var arr = [];
      //  var goods=[];
      //  let objs=[];
      //  for (var i = 0; i < cartarray2.length;i++)
      //  {
      //    let obj={
      //      goodsid: cartarray2[i],
      //      optionid: cartarray3[i],
      //      num: cartarray4[i]
      //    }
      //    objs.push(obj)
      //  }
      //  console.log("你好,这是最后的objs的具体的具体结构.........." + objs);
// ----------------------------------------解决数组拼接问题------------------------
       var objs = [];
       for (var i = 0; i < cartarray2.length; i++) {
         let obj = {
           goodsid: cartarray2[i],
           optionid: cartarray3[i],
           num: cartarray4[i]
         }
         // console.log(obj)
         objs[i] = obj;
         console.log(objs)
       }
       console.log("你好,这是最后的objs的具体的具体结构.........." + objs);


// ----------------------------------------解决数组拼接问题------------------------


      //  for (var i = 0; i < cartarray2.length && i < cartarray3.length && i < cartarray4.length;i++)
      //  {
      //    goods.push(cartarray2[i], cartarray3[i], cartarray4[i])
      //  }

      //  var d = cartarray2.map((o, i) => [o, cartarray3[i], cartarray4[i]]);
      //  console.log("这是组装后的新数组" + goods);

      //  var resultarray = [];
      //  for (var i = 0; i < cartarray2.length; i++) {
      //    for (var j = 0; j < cartarray3.length; j++) {
      //      for (var k = 0; k < cartarray4.length; k++) {
      //        arr.push([cartarray2[i], cartarray3[j], cartarray4[k]]);
      //       //  this.setData({
      //        goods = arr;
      //       //  })
      //        console.log("这是我的购物车页面组装成的新的数组" + goods);
      //         }
      //       }
      //     }

    //  var resultarray = [];
    //  for (var i = 0; i < goods.length; i+= 3) {
    //    resultarray.push(goods.slice(i, i + 3).join('}'));
    //  }
    //   console.log("这是第三次组装后的新的数组:" + resultarray);

   
  // var   arr4 =new  Array();
  //      for (var i = 0; i < arr4.length; i++){
  // arr4 = array(cartarray2[i], cartarray3[i],cartarray4[i]);
  //   }

  //      console.log("这是最新的数组" + arr4);

 
              //  goods.prototype.goodsid = cartarray2;
              //  goods.prototype.optionid = cartarray3;
              //  goods.prototype.num= cartarray4;
      //   for (var i = 0; i < cartarray2.length;i++)
      //   {
      //     goods.push(cartarray2[i]);
      //   }
      //   for (var j = 0; j < cartarray3.length; j++) {
      //     goods.push(cartarray3[j]);
      //   }
      //  for (var k = 0; k < cartarray4.length; k++) {
      //    goods.push(cartarray4[k]);
      //  }
        // console.log("当前的goods的长度是" + goods.length);
      //  for (var f = 0; f < newAkklength;f++)
      //  {
      //    goods[f].goodsid
      //  }

      //     this.setData({
      //       resultarray: resultarray
      //     })
      //  console.log("当前的resultarray是" + resultarray);
        wx.request({
          url: theUrl.data.baseUrl + '/mini/order', // 仅为示例，并非真实的接口地址
          data: {
            storeid: wx.getStorageSync("storeid"),
            rd_session: wx.getStorageSync("rd_session"),
            goods: objs,
            // goods[0][goodsid]:this.data.cartarray2,
            // goods[0][optionid]:this.data.cartarray3,
            // goods[0][num]:this.data.cartarray4,         
            // goods:[
            //   {
            //     goodsid:70,
            //     optionid:80,
            //     num:2
            //   }, 
            //   {
            //     goodsid: 70,
            //     optionid: 81,
            //     num:3
            //   }
            // ]
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log("这是立即购买提交订单返回给我的信息" + res);
            console.log(res.data)
            if (res.data.status == 1) {
              thefinalOrder=res.data.result.orderid,
                console.log("这是立即购买提交订单接口生成的订单号码" + thefinalOrder);
              //that.getAllProductList();
             // that.getAllProductList();

             wx.setStorage({
               key: 'theOrderId',
               data: res.data.result.orderid
            });

             wx.navigateTo({
               url: '../firstpage/storeSelfWay/storeSelfWay?theOrderId=' + thefinalOrder,
             })
            }else
            {
              wx.showModal({
                title:res.data.message,
                content: '',
              })
            }
          }
        });




        // 提交的所有的产品是:
       //console.log("这是提交之前的所有产品数量" + this.data.num);
       //console.log("当前选中的总共有" + this.data.myCheckedTrue.length);
          // wx.request({
          //   url: theUrl.data.baseUrl + '/mini/order', // 仅为示例，并非真实的接口地址
          //   data: {
          //     storeid: 4,
          //     rd_session: wx.getStorageSync("rd_session"),
          //   },
          //   method: "POST",
          //   header: {
          //     'content-type': 'application/json' // 默认值
          //   },
          //   success(res) {

          //     console.log("这是---------------------------");
          //     console.log("这是清空购物车返回给我的信息" + res);
          //     console.log(res.data)
          //     if (res.data.status == 1) {
          //       //that.getAllProductList();
          //       that.getAllProductList();
          //     }
          //   }
          // });    

    // ----------- 请求立即购买提交订单接口-----------------
    // wx.navigateTo({
    //   url: '../storeSelfWay/storeSelfWay',
    // });

    // var checkstatus = this.data.checkstatus;
    // var cartlist = this.data.userfulProductList;
    // var cartarray = []
    // for (var i = 0; i < checkstatus.length; i++) {
    //   if (checkstatus[i] === true) {
    //     cartarray.push(cartlist[i].postid);
    //   }
    // };
    if (cartarray.length != 0) {
      var model = JSON.stringify(cartarray);
      console.log(model)
    }
    //   wx.navigateTo({
    //     url: '../buyit/buyit?cartlist=' + model,
    //   });
    // };
  },

//发送请求获取订单号
   



  //清空购物车
  emptyShoppingCart:function()
  {
      var that = this;
        wx.showModal({
          title: '此操作将清空所有物品',
          content: '',
          success:function(res)
          {
            if(res.confirm)
            {
              
                wx.request({
                  url: theUrl.data.baseUrl + '/mini/cart/emptycart', // 仅为示例，并非真实的接口地址
                  data: {
                    storeid: wx.getStorageSync("storeid"),
                    rd_session: wx.getStorageSync("rd_session"),
                  },
                  method: "GET",
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {

                    console.log("这是---------------------------");
                    console.log("这是清空购物车返回给我的信息" + res);
                    console.log(res.data)
                    if (res.data.status == 1) {
                      //that.getAllProductList();
                      that.getAllProductList();
                    }
                  }
                });
            }else{

            }
          }
        })

    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onStopEvent: function () { },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})