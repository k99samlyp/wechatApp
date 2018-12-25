// pages/index/mainPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // domain: "https://127.0.0.1:9800",
    domain: "https://paydata.andedu.net:9800",

    //province: "",
    captchaImage: "",
    type_index: 0,
    typeArray: [
      {
        id: 0,
        key: '01',
        name: '工号'
      },
      {
        id: 1,
        key: '02',
        name: '集团'
      }
    ],
    type_id: "",
    provinceArray: [
      {
        id: 0,
        key: '2710',
        name: '北京'
      },
      {
        id: 1,
        key: '2810',
        name: '上海'
      },
      {
        id: 2,
        key: '2110',
        name: '广东'
      },
      {
        id: 3,
        key: '2910',
        name: '天津'
      },
      {
        id: 4,
        key: '3910',
        name: '重庆'
      },
      {
        id: 5,
        key: '3110',
        name: '辽宁'
      },
      {
        id: 6,
        key: '2310',
        name: '江苏'
      },
      {
        id: 7,
        key: '3510',
        name: '湖北'
      },
      {
        id: 8,
        key: '3810',
        name: '四川'
      },
      {
        id: 9,
        key: '4010',
        name: '陕西'
      },
      {
        id: 10,
        key: '3010',
        name: '河北'
      },
      {
        id: 11,
        key: '4110',
        name: '山西'
      },
      {
        id: 12,
        key: '2510',
        name: '河南'
      },
      {
        id: 13,
        key: '4310',
        name: '吉林'
      },
      {
        id: 14,
        key: '4410',
        name: '黑龙江'
      },
      {
        id: 15,
        key: '4210',
        name: '内蒙古'
      },
      {
        id: 16,
        key: '3210',
        name: '山东'
      },
      {
        id: 17,
        key: '3410',
        name: '安徽'
      },
      {
        id: 18,
        key: '2210',
        name: '浙江'
      },
      {
        id: 19,
        key: '2410',
        name: '福建'
      },
      {
        id: 20,
        key: '3610',
        name: '湖南'
      },
      {
        id: 21,
        key: '3310',
        name: '广西'
      },
      {
        id: 22,
        key: '3710',
        name: '江西'
      },
      {
        id: 23,
        key: '4510',
        name: '贵州'
      },
      {
        id: 24,
        key: '4610',
        name: '云南'
      },
      {
        id: 25,
        key: '4710',
        name: '西藏'
      },
      {
        id: 26,
        key: '2610',
        name: '海南'
      },
      {
        id: 27,
        key: '4810',
        name: '甘肃'
      },
      {
        id: 28,
        key: '5010',
        name: '宁夏'
      },
      {
        id: 29,
        key: '4910',
        name: '青海'
      },
      {
        id: 30,
        key: '5110',
        name: '新疆'
      },
      {
        id: 31,
        key: '0318',
        name: '政企分公司'
      }
    ],
    province_id: "",
    province_index: 0,

    // 按钮状态
    gen_loading: false,
    read_loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.setData({
      province_id: this.data.provinceArray[0].key,
      type_id: this.data.typeArray[0].key
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

  },

  // 表单提交
  onSubmit: function(e){
    var that = this;
    console.info(e.detail.value);
    that.setData({
      gen_loading: true
    }),

    wx.request({
      url: that.data.domain + '/weapp/qrcode', //仅为示例，并非真实的接口地址
      data: {
         paramsBody: e.detail.value
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          gen_loading: false
        }),
        //console.log(res.data);
        //var array = wx.base64ToArrayBuffer(res.data)
        //var base64 = wx.arrayBufferToBase64(array)
        //that.setData({ captchaImage: '../../test.jpg'});

        that.setData({ captchaImage: 'data:img/jpg;base64,' + res.data});

        if (res.statusCode == 200){
          wx.showToast({
            title: '生成成功',
            icon: 'success',
            duration: 2000
          })
        }
        else{
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  bindTypeChange: function (e) {
    console.log('类型改变，携带值为', this.data.typeArray[e.detail.value].key)
    this.setData({
      type_index: e.detail.value,
      type_id: this.data.typeArray[e.detail.value].key
    })
  },

  provinceChange: function (e) {
    console.log('省份改变，携带值为', this.data.provinceArray[e.detail.value].key)
    this.setData({
      province_index: e.detail.value,
      province_id: this.data.provinceArray[e.detail.value].key
    })
  },

  resetForm: function (e) {
    this.setData({
      province_index: 0,
      type_index: 0,
      province_id: this.data.provinceArray[0].key,
      type_id: this.data.typeArray[0].key,
      captchaImage: null
    })
  },

  scanQrCode: function(e) {
    var that = this;
    that.setData({
      read_loading: true
    }),

    wx.scanCode({
      scanType: "qrCode",
      success(res){
        console.info("结果:" + res.result )
        wx.request({
          url: that.data.domain + '/weapp/checkqrcode', //仅为示例，并非真实的接口地址
          data: {
            content: res.result
          },
          method: 'POST',
          header: {
            'content-type': 'text/plain' // 默认值
          },
          success(res) {

            that.setData({
              read_loading: false
            })

            if (res.statusCode == 200) {
              wx.showModal({
                title: '您的二维码信息',
                content: '省：' + res.data.province + '\r\n地市：' + res.data.city + '\r\n区县：' + res.data.district + '\r\n类型：' + res.data.type + '\r\n发展渠道名称：' + res.data.channelName + '\r\n发展渠道ID：' + res.data.channelId + '\r\n产品ID：' + res.data.productId,
                showCancel:false,
                confirmText:'我知道了'
              })
            }
            else {
              wx.showModal({
                title: '有错误！',
                content: res.data.errorMsg,
                showCancel: false,
                confirmText: '我知道了'
              })
            }
          }
        })

      },
      fail(res) {

        that.setData({
          read_loading: false
        })

        wx.showToast({
          title: "解析二维码失败",
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})