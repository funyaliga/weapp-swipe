//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: '滑一下',
    class: '',
    preColor: '#31302B',
    nextColor: '',
    animationData: {},
    canrun: true,
    duration: 300,
  },
  onLoad: function () {
    const animation = wx.createAnimation({
      duration: this.data.duration,
  	  timingFunction: 'ease',
    })
    this.animation = animation
  },

  swipe({ detail: { direction }}) {
    if (this.data.canrun) {
      this.setData({
        text: `direction: ${direction}`,
      })
    }
  },

  swipeup() {
    this.run('#1aad16', 'up')
  },
  swiperight() {
    this.run('#83d0f2', 'right')
  },
  swipedown() {
    this.run('#fcf8e3', 'down')
  },
  swipeleft() {
    this.run('#ea6f5a', 'left')
  },


  run(color, direction) {
    if (!this.data.canrun) {
      return;
    }
    const anim = {
      up: () => this.animation.width('100%').height(0).top('auto').left(0).right('auto').bottom(0).step({duration: 0}),
      right: () => this.animation.width(0).height('100%').top(0).left(0).right('auto').bottom('auto').step({duration: 0}),
      down: () => this.animation.width('100%').height(0).top(0).left(0).right('auto').bottom('auto').step({duration: 0}),
      left: () => this.animation.width(0).height('100%').top(0).left('auto').right(0).bottom('auto').step({duration: 0}),
    }

    anim[direction]();

    this.setData({
      canrun: false,
      animationData: this.animation.export()
    })
    setTimeout(() => {
      this.animation.width('100%').height('100%').backgroundColor(color).step()
      this.setData({
        animationData: this.animation.export()
      })
      setTimeout(() => {
        this.setData({
          nextColor: color,
          preColor: color,
          canrun: true,
        })
      }, this.data.duration)
    }, 100);
  }

})
