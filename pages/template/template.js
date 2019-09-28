
//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "../firstpage/firstpage",
      "iconPath": "../../images/firstpage1.png",
      "selectedIconPath": "../../images/firstpage2.png",
      "text": "首页"
    },
    {
      "current": 0,
      "pagePath": "../shoppingcart/shoppingcart",
      "iconPath": "../../images/shoppingcart1.png",
      "selectedIconPath": "../../images/shoppingcart2.png",
      "text": "购物车"
    },
    {
      "current": 0,
      "pagePath": "../earnings/earnings",
      "iconPath": "../../images/earnings1.png",
      "selectedIconPath": "../../images/earnings2.png",
      "text": "收益"
    },
    {
      "current": 0,
      "pagePath": "../mine/mine",
      "iconPath": "../../images/mine1.png",
      "selectedIconPath": "../../images/mine2.png",
      "text": "我的"
    },
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}
