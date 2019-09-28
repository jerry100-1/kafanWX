var theUrl = getApp();
// pages/firstpage/storeSelf/storeSelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thesystemrecommencouponid:"",//全场券的id
    thesystemrecommencouponnum:1,//全场券的数量
    activeFlag: 1,
    state:"",
    myownway:0,
    state3:"",
    allPayList:[],
    thebestwaytoPay:"",
    getMyReceiptinfo:{},
    myallPayList:[],
    newallPayList:[],
    paywaystate:0,
    disabled:true,
    allSingleCardCouldPrefer:0,//所有的点击过的单品券可以优惠的总的价格
    theFinalTotalPrice:"",//使用优惠券后的金额
    paywayFlagNum:21,
    afterPreferToPay:"",//优惠之后应付商品的总价格
    allPreferPrice:"",//总共优惠了多少元
    theTotalProductPrice:"",
    payIndex:1,
    allfavarableMoney: "",
    couponsList:[],//最终确定的couponList
    checked: true,
    keChangeText:"选择单品券优惠",
    keChangeText2:"点此选全场券优惠",
    whenSelectCommTotalPrice:"",//选择全场券时总的优惠价格
    hidden100: false,
    theChinaWayDescribePay:"",
    remainingSum:"",//支付前的余额
    state2:"",
    singlecounponid:"",
    danpinquanprice:"",
    mydelievenum:"",//单件商品使用单品券之前的商品数量
    hidden101: false,
    payList: [
      {
        paywayImg: "../../../images/h-34.png",
        paywayText1: "微信支付(默认)",
        payway:1,
        paywayText2: "",
        paywayChooseRadio: ""
      },
      {
        paywayImg: "../../../images/h-35.png",
        paywayText1: "余额",
        payway: 2,
        paywayText2: "",
        paywayChooseRadio: ""
      },


    ],
    mycouponprice:"",
    nopreferPrice:"",//没有优惠之前的总价格
    nopreferNum:"",//没有优惠之前的商品的总的个数
    theSingleCouponCardList:[],
    theSingleCouponCardListLength:"",
    mygoodscouponprice:"",
    theUserCommonCouponCard:[],
    selectSingleWayPushCouponList:[],
    selectCommonWayPushCouponList:[],
    theOrderId:"",
    hariShopBasicMessage: {},
    theCommonUseCouponPrice:{},
    theRecommondFavourableWay:"",
    markers: [{
      iconPath: "../../../images/other.png",
      id: 0,
      latitude: "",
      longitude: "",
      callout: {
        content: '气泡名称',
        color: '#FF0000',
        fontSize: 15,
        borderRadius: 10,
        display: 'ALWAYS',
      },
      width: 35,
      height: 45
    }],
  }, 
  allsinglecouponidArr: [],//获取所有的单品券的id组成的数组
  allsinglecouponNumArr: [],//获取所有的单品券的num组成的数组
  totalSinglecouponArr:[],
  //allsinglecouponPriceArr: [],//获取所有的单品券的price组成的数组
  //allsinglecouponPriceArr:[],
  allsinglecouponPriceArrData:[],

  printTheConsole:function()
  {
      console.log("你点击了全场通用券的按钮");
      // this.setData({
      //   hidden100: false
      // })
  },
  // 选择支付方式支付
  choosePayWayItem:function(e)
  {
   console.log("得到的选中的索引是"+e.currentTarget.dataset.state2);
    var state2 = e.currentTarget.dataset.state2;
    var that=this;
    that.setData({
      state2:state2,
      payIndex: e.currentTarget.dataset.state2
    })
  },
  getRespectiveMyAllSinglePrice:function(e)
  {
    var totalArray=[];
   // var that=this;
    //let allsinglecouponidArr=[];
    //let allsinglecouponNumArr = [];
    var singleMyPrice=[];
    var  allsinglecouponPriceArr=[];
    var singlecounponid = e.currentTarget.dataset.singlecounponid;//点击的单品券的id 
    var ffprice = e.currentTarget.dataset.singlecouponprice;
    var singlecouldprice=e.currentTarget.dataset.singlecouponprice;//当前点击的券的优惠价格
    var ffunusednum = parseInt(e.currentTarget.dataset.unused);//可以使用的优惠券数量
    var myoriginnum =parseInt(this.data.mydelievenum);//没有使用优惠券之前此件商品的个数
    var resultnum = (myoriginnum < ffunusednum ? myoriginnum : ffunusednum) //如果此商品的数量少于券的数量,就使用此商品的数量
    var theSingleCouldPrefer = (((singlecouldprice))*(parseInt(resultnum)));//当前点击的商品可以优惠的价值
    console.log("#################################当前的券的价值是" + singlecouldprice);
    console.log("#################################当前的能用的券的数量是" + resultnum);
    allsinglecouponPriceArr.push(theSingleCouldPrefer);
    console.log("==============$$$$$$$$$$$$$$$$$$$$$$$$$$=======================================")
    console.log(allsinglecouponPriceArr);
    this.totalSinglecouponArr.push(allsinglecouponPriceArr);
    console.log("当前点击的所有可以优惠的商品的优惠价值组成的数组的长度是" + allsinglecouponPriceArr.length);

    console.log("push到数组之前的num是" + resultnum);

    //this.allsinglecouponPriceArr.push();//
    console.log("**********************************此件单品券可以优惠的价格是" + e.currentTarget.dataset.singlecouponprice);

   // var resultnum=6;

      // this.setData({
      //   singlecounponid: singlecounponid
      // })
    console.log("-------这是点击的单品券的id---------------" + singlecounponid);
    this.allsinglecouponidArr.push(singlecounponid);//单品券的id
    this.allsinglecouponNumArr.push(resultnum);//单品券的数量
    var state=e.currentTarget.dataset.state;
    this.setData({
      state:state
    })
    // for (var j = 0; j < allsinglecouponPriceArr.length;++j)
    // {
    //   this.allsinglecouponPriceArrData += allsinglecouponPriceArr[j];
    // }
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@点击过的可以优惠的总价格是" + this.allsinglecouponPriceArrData);
    console.log("6666666666666666666666666666");
    console.log("当前选中的id是" + singlecounponid);
    console.log("6666666666666666666666666666");
    console.log("当前此券可用的num的值是" + resultnum);
    console.log("当前的allsinglecouponidArr的长度是" + this.allsinglecouponidArr.length);
    console.log("当前的allsinglecouponNumArr的长度是" + this.allsinglecouponNumArr.length);

    console.log("此件商品可以使用的券的数量是" + ffunusednum);
    console.log("未推入数组之前数组的长度是" + this.allsinglecouponidArr.length);

    var objs = [];
    for (var i = 0; i < this.allsinglecouponidArr.length; i++) {
      let obj = {
        cid: this.allsinglecouponidArr[i],
        num: this.allsinglecouponNumArr[i],
      }
      // console.log(obj)
      objs[i] = obj;
      console.log(objs);
      // var r = [...new Set(objs)];
    }
    // objs = objs.filter(item => item.cid === "0");
    objs = objs.filter(item => item.cid === "0");  
    objs = objs.filter(item => item.num === "0");
    console.log("这是过滤后的数据*************************************************************************");

    console.log("你好,这是最后的objs的具体的具体结构.........." + objs);
    this.setData({
      selectSingleWayPushCouponList: objs
    });
    // const num = 'num';
    // const r = objs.reduce((all, next) => all.some((atom) => atom[num] == next[num]) ? all : [...all, next], []);
    // console.log("这是对象数组去重过之后的数组" + r);
    // this.setData({
    //   selectSingleWayPushCouponList: r
    // });
    this.setData({
      couponsList: this.data.selectSingleWayPushCouponList
    })


   //发送支付请求

              // ------------------------------------------------------------------------------

    // totalArray.push(allsinglecouponidArr);
   // totalArray = allsinglecouponidArr.concat(allsinglecouponNumArr);

    // console.log("这是组装的新的数组" + totalArray);
      //  this.setData({
      //     allsinglecouponidArr:allsinglecouponidArr
      //  });
      // this.setData({
      //    allsinglecouponNumArr:allsinglecouponNumArr
      // });
    // this.setData({
    //   allsinglecouponidArr:allsinglecouponidArr
    // })
    // console.log("当前的数组中的元素是" + this.data.allsinglecouponidArr);
    // console.log("当前的数组的长度是" + this.data.allsinglecouponidArr.length);
 
    // var singlecouponobjs = [];
    // for (var i = 0; i < this.data.allsinglecouponidArr.length; i++) {
    //   let obj = {
    //     id: this.data.allsinglecouponidArr[i],
    //     num: this.data.allsinglecouponNumArr[i],
    //   }
    //   // console.log(obj)
    //   singlecouponobjs[i] = obj;
    //   console.log(singlecouponobjs)
    // }
    // console.log("你好,这是组装成二维数组之后singlecouponobjs的具体的具体结构.........." + singlecouponobjs);

    //  console.log("当前的数组中的元素单品券id---couponid是" + this.data.allsinglecouponidArr);
    // console.log("当前的数组的长度是" + this.data.allsinglecouponidArr.length);
    var theonlyonesinglewayprice = ffprice * (this.data.mydelievenum > ffunusednum ? ffunusednum : this.data.mydelievenum);
    singleMyPrice.push(theonlyonesinglewayprice);
   // console.log("这是所有的可以优惠的全的具体的列表的长度" + singleMyPrice.length);
    this.setData({
      hidden101:false
    });
    this.setData({
      // keChangeText: "用单券优惠" + theonlyonesinglewayprice.toFixed(2)+"元"
      keChangeText:"选择单品券优惠"
    });
    console.log("--------------------------66666666666-----------------------------");
    console.log("得到的此件商品的单品券优惠价格是" + theonlyonesinglewayprice);
    console.log("--------------------------66666666666-----------------------------");

    this.allsinglecouponPriceArrData.push(theonlyonesinglewayprice);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

    console.log("这是所有的点击过的优惠列表" + this.allsinglecouponPriceArrData);

    var allSingleCardCouldPrefer = 0;
    // for (var i = 0; i < arra.length; i++) {
    //   result += arra[i];
    // }


    for (var m = 0; m < this.allsinglecouponPriceArrData.length;m++)
    {
       allSingleCardCouldPrefer += this.allsinglecouponPriceArrData[m];
    }
    console.log("这是你目前点击已用的所有的单品券加起来可以优惠的总的价格" + allSingleCardCouldPrefer);
    // 所有的单品券加起来优惠的总的价格
    this.setData({
      allSingleCardCouldPrefer:allSingleCardCouldPrefer
    });


   wx.showModal({
     title: '',
     content: '这是你目前点击的所有的单品券加起来可以优惠的总的价格' + allSingleCardCouldPrefer,
   });

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

    //计算应该支付多少元
    // afterPreferToPay = (nopreferPrice - theonlyonesinglewayprice)
    this.setData({
      afterPreferToPay: (this.data.nopreferPrice - this.data.allSingleCardCouldPrefer)
    }) 

    // wx.showToast({
    //   title: '你选择的优惠方式是单品券方式优惠,总共可以优惠' + this.data.afterPreferToPay + "元",
    // });
    wx.showModal({
      title:"",
      content: '你选择的优惠方式是单品券方式优惠,此件商品已为您优惠' + theonlyonesinglewayprice.toFixed(2) + "元"
    });
  //使用单品券总共优惠了多少钱
   this.setData({
      allfavarableMoney: this.data.allSingleCardCouldPrefer.toFixed(2)
   });
    //使用单品券这种方式之后最后需要支付的总的价钱
    this.setData({
      theFinalTotalPrice: (this.data.nopreferPrice - this.data.allSingleCardCouldPrefer)
    });
    //使用单品券这种方式之后最后需要支付的总的价钱
    this.setData({
      afterPreferToPay: this.data.theFinalTotalPrice
    });

    
  },
  chooseSingleCoupon:function(e)
  { 
    console.log("你好,你点击的商品的数量是" + e.currentTarget.dataset.delievenum);
    console.log("你好,你点击的商品的索引是"+e.currentTarget.dataset.index);
   var that=this;
    var stateindex=e.currentTarget.dataset.index;
    that.data.newallPayList[stateindex].flag="1";
    that.setData({
      newallPayList: that.data.newallPayList
    })
    console.log("你好,你点击的商品的价格是" + e.currentTarget.dataset.danpinprice);
    //var that=this;
    var allPayListInde = this.data.allPayList[e.currentTarget.dataset.index];
    // this.setData({
    //     ['allPayListInde.disabled']:true
    //   }); 
    // allPayListInde.disabled="true";
    console.log("你好,我获取的对象是" + this.data.allPayList[e.currentTarget.dataset.index]);
    console.log("当前的按钮可点击状态是"+e.target.dataset.disabled);
    // this.data.allPayList[e.currentTarget.dataset.index].disabled ="true";
    // var theItem = this.data.allReceiveAddressList[e.currentTarget.dataset.index]
    this.setData({
      allPayList: this.data.allPayList
    })
    // that.setData({
    //   disabled:true
    // })
    let state = e.currentTarget.dataset.state;
    console.log("你好,我得到的state是" + state);

    // let that = this;
    this.setData({
      keChangeText:"选择单品券优惠"
    });
    this.setData({
      state: state
    });

    this.setData({
      mydelievenum: e.currentTarget.dataset.delievenum
    })
    // this.setData({
    //     hidden101: true
    //   })
   
    console.log("选择单品券之前获取的规格id-optionid是" + e.currentTarget.dataset.optionid);
    var that = this;
       console.log("点击了显示商品券的按钮来触发弹窗！！！！!!");
    wx.request({
      url: theUrl.data.baseUrl + '/mini/order/getordercoupons', // 
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        type:2,
        optionid: e.currentTarget.dataset.optionid
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("这是---------------------------");
        console.log("这是获取相关的优惠券---单品券接口返回给我的信息" + res);
        console.log(res.data)
        if (res.data.status == 1) {
          //that.getAllProductList();
          // if (that.data.theSingleCouponCardList.length > 0) {
          //   that.setData({
          //     hidden101: true
          //   });
          //   that.setData({
          //     danpinquanprice:res.data.result.list
          //   })
          //   that.setData({
          //     keChangeText: "可优惠"+ +"元"
          //   })  

          // } else {
          //     wx.showToast({
          //       title: '暂无单品券可用哦!',
          //     })
          // }

          that.setData({
             theSingleCouponCardList: res.data.result.list//获取商品-单品优惠券列表
          });
          console.log("--------------------------获取的单品券的个数是-----------------" +that.data.theSingleCouponCardList.length);
          that.setData({
             theSingleCouponCardListLength: res.data.result.list.length
          });
          if (that.data.theSingleCouponCardListLength>0)
          {
              that.setData({
                hidden101: true
              }); 
          }else{
              that.setData({
                hidden101: false
              });
              wx.showToast({
                title: '亲,此商品无券可用哦',
                duration: 3000
              })

          }

          console.log("--------------------------获取的单品券的个数是-----------------" + that.data.theSingleCouponCardListLength);

        }
      }
    });
    // this.setData({
    //   hidden100:true
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  chooseWayToPay:function(e)
  {
    var clickindex = e.currentTarget.id;
   console.log("当前选择的支付方式的id是"+e.currentTarget.id);
    let paywaystate = e.currentTarget.dataset.paywaystate;
    console.log("你好,我得到的paywaystate是" + paywaystate);
    let that = this;
    that.setData({
      paywaystate: clickindex
    })
  },
  getAllPayProductList: function () {
    var that = this;
    var myownway="";
    console.log("你好,这是我从门店自提页面获取过来的订单编号" + that.data.delieveIdOrderId);
    wx.request({
      url: theUrl.data.baseUrl + '/mini/order/showpay', // 
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        orderid: that.data.theOrderId
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("这是---------------------------");
        console.log("这是显示订单支付页接口返回给我的信息" + res);

        console.log("这是系统默认的推荐方式" + res.data.result.orderinfo.coupontype);
        myownway= res.data.result.orderinfo.coupontype;
        console.log("这是组装后的方式" + myownway);
        that.setData({
          myownway: myownway
        })
        console.log(res.data)
        if (res.data.status == 1) {
          //that.getAllProductList();
          that.setData({
            allPayList: res.data.result.goods,//获取商品
            newallPayList: res.data.result.goods,
            thesystemrecommencouponid: res.data.result.orderinfo.couponid,
            nopreferPrice: res.data.result.totalprice,//没有优惠之前商品的总的价格
            nopreferNum: res.data.result.totalnum, //没有优惠之前商品的总的数量
            getMyReceiptinfo: res.data.result.orderinfo.receiptinfo, //获取收货人的信息
            thebestwaytoPay: res.data.result.orderinfo.coupontype
          });
          console.log("没有优惠之前商品的总的数量是" + that.data.nopreferNum);

          console.log("系统默认的优惠方式的coupontype是" + that.data.thebestwaytoPay);

        //  ----------------------------------当用户没有点击任何就提交时--------------------------------------------------------------
          //使用系统默认时通用券的方式的id集合
          var newsinglecouponwayidarray = [];
          var newsinglecouponwaynumarray = [];
          var commonwaycouponidarray = [];
          var commonwaycouponnumarray = [];
          commonwaycouponidarray.push(that.data.thesystemrecommencouponid);
          //使用系统默认时通用券的方式的num集合
          commonwaycouponnumarray.push(1);
          //未点击之前使用系统默认方式
          console.log("6666666666666666666666666666666使用全场券的方式时候的couponid是" + that.data.thesystemrecommencouponid);
          console.log("6666666666666666666666666666666没有优惠之前商品的总的数量是" + that.data.nopreferNum);
          console.log("666666666666666666666666666666未点击之前使用系统默认方式最优方式是" + that.data.myownway);
          console.log("666666666666666666666666666666未点击之前使用系统默认方式总的价格是" + that.data.theTotalProductPrice);
          console.log("666666666666666666666666666666未点击之前使用全场券优惠的总价格是" + that.data.mycouponprice);
          console.log("666666666666666666666666666666未点击之前使用单品券优惠的总价格是" + that.data.mygoodscouponprice);
         
        //  单品券的方式
         
          for (var h = 0; h < that.data.newallPayList.length; h++) {
            console.log("######################################这是单品券的id" + that.data.allPayList[h].couponid);
            console.log("#################################这是单品券的num" + that.data.allPayList[h].couponnum);
            console.log("这是所有单品券的id 集合" + that.data.allPayList[h].couponid);
            console.log("这是所有单品券的num 集合" + that.data.allPayList[h].couponnum);
            newsinglecouponwayidarray.push(that.data.allPayList[h].couponid);
            newsinglecouponwaynumarray.push(that.data.allPayList[h].couponnum);
            // newsinglecouponwaynumarray.filter()
          }
          // newsinglecouponwayidarray = newsinglecouponwayidarray.filter(item => item === 0)
          // newsinglecouponwaynumarray = newsinglecouponwaynumarray.filter(item => item === 0)
          // 选择单品券方式组装的新的二维数组

          var systemsinglecouponobjs = [];

          for (var i = 0; i < newsinglecouponwayidarray.length; i++) {
            let obj = {
              cid: newsinglecouponwayidarray[i],
              num: newsinglecouponwaynumarray[i],
            }
            // console.log(obj)
            systemsinglecouponobjs[i] = obj;
            console.log("这是系统默认的选择单品券的方式的时候组装成的二维数组" + systemsinglecouponobjs)
          }
          systemsinglecouponobjs = systemsinglecouponobjs.filter(item => item.cid!=0);
          systemsinglecouponobjs = systemsinglecouponobjs.filter(item => item.num!=0);
          that.setData({
            systemsinglecouponobjs: systemsinglecouponobjs
          });

         //全场券的方式

          var systemcommonwaycouponobjs = [];

          for (var i = 0; i < commonwaycouponnumarray.length; i++) {
            let obj = {
              cid: commonwaycouponidarray[i],
              num: commonwaycouponnumarray[i],
            }
            // console.log(obj)
            systemcommonwaycouponobjs[i] = obj;
            console.log("这是系统默认的选择通用券的方式的时候组装成的二维数组" + systemcommonwaycouponobjs)
          }
          systemcommonwaycouponobjs = systemcommonwaycouponobjs.filter(item => item.cid!= 0);
          systemcommonwaycouponobjs = systemcommonwaycouponobjs.filter(item => item.num!= 0);
          that.setData({
            systemcommonwaycouponobjs: systemcommonwaycouponobjs
          })

    

          // 一进入到此页面，先做判断,如果系统给的推荐方式
          //获取系统最佳的推荐方式----thebestwaytopay
          //如果是全场券方式，直接用 couponid
          if (that.data.thebestwaytoPay == 1) {
            // thesystemrecommencouponid-----------全场券的id
            // thesystemrecommencouponnum-----------全场券的数量
              that.setData({
                  couponsList: systemcommonwaycouponobjs
              })
          } else {
              that.setData({
                  couponsList: systemsinglecouponobjs
              })
          }
    //如果系统推荐的优惠方式是单品券,则获取每件商品推荐的单品券的num和cid
    //如果系统推荐的优惠方式是全场券,则获取每件商品推荐的全场券的num和cid





// ---------------------------------------------------当用户没有点击任何就提交时--------------------------------------------

          //  给数组中每个对象添加一个新的属性
          let array = [];
          let list = [{ name: 'aa', age: 11 }, { name: 'bb', age: 22 }, { name: 'cc', age: 33 },];
          list.map((item, index) => {
            array.push(
              Object.assign({}, item, { indexNum: 'str' })
            )
          });
          console.log(1236666666666666666666666666, array);
          let newallPayList = [];
          that.data.allPayList.map((item, index) => {
            newallPayList.push(
              Object.assign({}, item, { flag: 0 })
            )
          });
          that.setData({
            newallPayList: newallPayList
          })
          console.log(newallPayList);

        }
      }
    });
  },
  closeTheShowModal:function(e)
  {  
    var comonUseArrId=[];//全场通用券的id集合
    var comonUseArrNum=[];//全场通用券的num集合--固定为1
    console.log("我获得的全场通用券的价格是" + e.currentTarget.dataset.thecommonwayprice);
    console.log("我获得的全场通用券的id是" + e.currentTarget.dataset.id);

    this.setData({
      whenSelectCommTotalPrice: e.currentTarget.dataset.thecommonwayprice
    });
    //使用通用券之后应当支付的总的金额
    this.setData({
      theFinalTotalPrice: (this.data.nopreferPrice- this.data.whenSelectCommTotalPrice)
    });
    //使用通用券之后总共又优惠了多少钱
    this.setData({
      allfavarableMoney:this.data.whenSelectCommTotalPrice
    })
    this.setData({
      afterPreferToPay: this.data.theFinalTotalPrice
    })

    comonUseArrId.push(e.currentTarget.dataset.id);
    // var unusedcommoncardnum=e.currentTarget.dataset.unused;
    // var commonCouponCardNum = this.data.mydelievenum;
    // comonUseArrNum.push(parseInt(this.data.mydelievenum));
    var commoncouponobjs = [];
    for (var i = 0; i <comonUseArrId.length; i++) {
      let obj = {
        cid:comonUseArrId[i],
        num:1,
      }
      // console.log(obj)
      commoncouponobjs[i] = obj;
      console.log(commoncouponobjs)
    }

    console.log("你好,这是组装成二维数组之后commoncouponobjs的具体的具体结构.........." + commoncouponobjs);

     this.setData({
       selectCommonWayPushCouponList:commoncouponobjs
     });

     this.setData({
       couponsList: this.data.selectCommonWayPushCouponList
     });

   
    this.setData({
      keChangeText2: "全场券方式优惠" + e.currentTarget.dataset.thecommonwayprice+"元"
    });
    var fetchThecmPrice = e.currentTarget.dataset.thecommonwayprice
    this.setData({
      hidden100: false
    });
    this.setData({
      afterPreferToPay: (this.data.nopreferPrice - fetchThecmPrice)
    })
    // wx.showToast({
    //   title: '你选择的优惠方式是全场券方式优惠,总共可以优惠' + e.currentTarget.dataset.thecommonwayprice+"元",
    // });
    wx.showModal({
      title: '',
      content:'你选择的优惠方式是全场券方式优惠,此种方式总共可以优惠'+ e.currentTarget.dataset.thecommonwayprice + "元"
    });
    this.setData({
      allfavarableMoney: e.currentTarget.dataset.thecommonwayprice 
    })
    
  },
  chooseUseCommonWay:function()
  {
    console.log("你好,这是请求获取相关的优惠券接口之前我的price的值" + this.data.theCommonUseCouponPrice)
    var that=this;
    that.setData({
      hidden100:true
    });
    wx.request({
      url: theUrl.data.baseUrl + '/mini/order/getordercoupons', // 
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
        orderid: that.data.theOrderId,
        type:1,
        orderprice: that.data.theTotalProductPrice
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("这是---------------------------");
        console.log("这是获取相关的优惠券全场通用券接口返回给我的信息" + res);
        console.log(res.data)
        if (res.data.status == 1) {
          //that.getAllProductList();
          that.setData({
            theUserCommonCouponCard: res.data.result.list
          })

        }
      }
    });

   

  },
  //显示订单支付页获取所有的优惠券--单品券和全场券
   getCouponPrice:function()
   {
     var that=this;
     var unclicktheRecommondFavourableWay="";
     var unclicktheTotalProductPrice = "";
     var unclickthemycouponprice = "";
     var unclickthemygoodscouponprice = "";
     wx.request({
       url: theUrl.data.baseUrl + '/mini/order/showpay', // 
       data: {
         storeid: wx.getStorageSync("storeid"),
         rd_session: wx.getStorageSync("rd_session"),
         orderid: that.data.theOrderId
       },
       method: "GET",
       header: {
         'content-type': 'application/json' // 默认值
       },
       success(res) {
         console.log("这是---------------------------");
         console.log("这是显示订单支付页获取商品优惠券--全场通用券接口返回给我的信息" + res);
         console.log(res.data)



         var remainingSum = (res.data.result.credit2);
         if (res.data.status == 1) {
           //that.getAllProductList();
           
           that.setData({
             theCommonUseCouponPrice:res.data.result.orderinfo.couponprice,//获取商品-全场通用券价格
             theRecommondFavourableWay: res.data.result.orderinfo.coupontype, //系统推荐最省钱的方式

             theTotalProductPrice: res.data.result.totalprice,//商品的总的价格

             mycouponprice:res.data.result.orderinfo.couponprice,//选择通用券总的优惠价值
             mygoodscouponprice: res.data.result.orderinfo.goodscouponprice, //所有单品券的优惠价格

             remainingSum: remainingSum //未支付前的余额
           });

           console.log("未点击之前使用系统默认方式最优方式是" + that.data.theRecommondFavourableWay);
          that.setData({
            unclicktheRecommondFavourableWay: that.data.theRecommondFavourableWay,
            unclicktheTotalProductPrice: that.data.theTotalProductPrice,
            unclickthemycouponprice: that.data.mycouponprice,
            unclickthemygoodscouponprice: that.data.mygoodscouponprice
          })

           that.setData({
             afterPreferToPay: that.data.theRecommondFavourableWay == 1 ? (that.data.theTotalProductPrice - that.data.mycouponprice) : (that.data.theTotalProductPrice - that.data.mygoodscouponprice)
            });
            that.setData({
              allfavarableMoney: that.data.theRecommondFavourableWay == 1 ? (that.data.mycouponprice) : (that.data.mygoodscouponprice)
            })
           console.log("未点击之前使用系统默认方式总的价格是" + that.data.theTotalProductPrice);
           console.log("未点击之前使用全场券优惠的总价格是" + that.data.mycouponprice);
           console.log("未点击之前使用单品券优惠的总价格是" + that.data.mygoodscouponprice);



         }
       }
     });
   },
  showThehidden:function()
  {
     this.setData({
       hidden100:true
     });
  },
  changeWay1: function (e) {
    var that = this;
    that.setData({
      checked: true
    });
    console.log("当前的checked的值是" + e.currentTarget.dataset.checked);
    if (e.currentTarget.dataset.checked == true) {
      console.log("第一个被选中了")
    }

  },
  changeWay2: function (e) {

    var that = this;
    that.setData({
      checked: false
    });
    console.log("当前的checked的值是" + e.currentTarget.dataset.checked);
    if (e.currentTarget.dataset.checked == false) {
      console.log("第二个被选中了")
    }
  },
  onLoad: function (options) {

    var that = this;
    that.setData({
      theOrderId: options.theOrderId
    })

    that.getCouponPrice();
    that.getAllPayProductList();
    

  },
     


  gotopayTheMoney:function()
  {
    var that=this;
    console.log("支付之前获取的订单的id是"+that.data.theOrderId);
    // var cartarray7=[];//获取所有的单品券的id
    // var cartarray8=[];//获取所有的单品券的数量
    // //获取所有的券的couponid
    // for (var a = 0; a < this.data.allPayList.length; a++) {   
    //     //  cartarray2.push(cartlist[i].id);
    //   cartarray7.push(this.data.allPayList[a].couponid);
    //   console.log("当前的数组7中的couponid有" + this.data.allPayList[a].couponid);
    //     this.setData({
    //       cartarray7:cartarray7
    //     })
    // };
    // //获取所有的券的数量
    // for (var b = 0; b < this.data.allPayList.length;b++)
    // {
    //   cartarray8.push(this.data.allPayList[b].couponnum);
    //   console.log("当前的数组8中的couponnum有" + this.data.allPayList[b].couponnum);
    //   this.setData({
    //     cartarray8: cartarray8
    //   })
    // };

    // //组装成二维数组提交给支付接口

    // var payobjs = [];
    // for (var i = 0; i < cartarray7.length; i++) {
    //   let obj = {
    //     id: cartarray7[i],
    //     num: cartarray8[i],
    //   }
    //   // console.log(obj)
    //   payobjs[i] = obj;
    //   console.log(payobjs)
    // }
    // console.log("你好,这是组装城二维数组之后payobjs的具体的具体结构.........." + payobjs);
    console.log("当前选中的支付方式的索引是:"+this.data.payIndex);
    //选择支付方式---参数paytype	1表示余额支付 21-微信支付
    if (this.data.payIndex==0)
    {
      this.setData({
        paywayFlagNum:21
      });
    }else
    {
      this.setData({
        paywayFlagNum: 1
      });
    }
    console.log("请求支付接口之前的couponsList是" + this.data.couponsList);

    wx.request({
      url: theUrl.data.baseUrl+'/mini/order/pay',
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        storeid: wx.getStorageSync("storeid"),
        rd_session:wx.getStorageSync("rd_session"),
        orderid: parseInt(this.data.theOrderId),
        receipttype:1,
        addressinfo:this.data.getMyReceiptinfo,
        coupons: this.data.couponsList,
        paytype: this.data.paywayFlagNum,
        totalprice: this.data.afterPreferToPay
      },
      success:function(res)
      {
        console.log("支付接口返回的结果是" + res.data.result);
        if(res.data.status==1)
        {
          wx.showToast({
            title: '恭喜,支付成功!',
          });
          wx.navigateTo({
            url: '../../firstpage/paySuccess/paySuccess?theOrderId=' + that.data.theOrderId,
          });
        }else
        {
          wx.showToast({
            title:res.data.message+"请重新下单",
          })
        }

      },
      fail:function(res)
      {
        wx.showToast({
          title: res.data.message,
        })
      }
    })
    //使用券的类型coupons   
    //  -----单品券方式------this.data.selectSingleWayPushCouponList
    //  -----全场券方式------this.data.selectCommonWayPushCouponList


    //支付金额 totalprice
    //使用单品券时:

    //使用全场券时: this.data.nopreferPrice-this.data.whenSelectCommTotalPrice
     


    //支付之前获取要传给接口的一些列的参数
    //receipttype-----------收货方式------选择门店自提的时候----1
    //addressinfo
      addressinfo:{
        realname:"张三"
        phone:"15527216789"
        address:"湖北武汉市洪山区"
      }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   // console.log("在onReady函数中获取的系统默认的通用券的id-----------------是" + this.data.thesystemrecommencouponid);
    console.log("在onReady函数中获取获取的系统默认的推荐方式----------------是" + this.data.myownway);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.showMap();
    console.log("在onShow函数中获取的系统默认的通用券的id-----------------是" + this.data.thesystemrecommencouponid);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  chooseway1: function () {
    var that=this;
    console.log("此方法执行了!");
  // var that = this;
    //this.data.activeFlag=1;
    that.setData({
      activeFlag: 1
    });
    wx.navigateTo({
      url: '../storeSelfWay/storeSelfWay?theOrderId=' + that.data.theOrderId,
    })
  },

  chooseway2: function () {
    console.log("此方法执行了!");
    var that = this;
    //this.data.activeFlag = 2;
    //var that = this;
      that.setData({
        activeFlag: 2
      });
    wx.navigateTo({
      url: '../deliveryWay/deliveryWay?theOrderId=' + that.data.theOrderId,
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
  showMap() {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const address = res.address
        const name = res.name

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        // wx.openLocation({
        //   latitude,
        //   longitude,
        //   address,
        //   name,
        //   scale: 5
        // })
      }
    });
    //  获取门店信息

    wx.request({
      url: theUrl.data.baseUrl + '/mini/storeinfo', // 仅为示例，并非真实的接口地址
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session")
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("这是---------------------------");
        console.log("这是获取门店基本信息接口返回给我的信息" + res);
        console.log(res.data)
        if (res.data.status == 1) {
          //that.getAllProductList();
          // this.bindCalcAll();
          that.setData({
            hariShopBasicMessage: res.data.message
          })
        } else {
          wx.showToast({
            title: '未获取到门店信息',
          })
        }
      }
    });

    //  获取门店信息
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     
  }
})