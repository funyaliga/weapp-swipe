Component({
  data      : {
    x1: null,
    y1: null,
    x2: null,
    y2: null,
  },
  properties: {
  },

  methods: {
    start(e) {
      if (!e.touches) return;
      this.x1 = e.touches[0].pageX == null ? e.touches[0].x : e.touches[0].pageX;
      this.y1 = e.touches[0].pageY == null ? e.touches[0].y : e.touches[0].pageY;
    },
    move(e) {
      if (!e.touches) return;
      this.x2 = e.touches[0].pageX == null ? e.touches[0].x : e.touches[0].pageX;
      this.y2 = e.touches[0].pageY == null ? e.touches[0].y : e.touches[0].pageY;
    },
    end(e) {
      if (!e.changedTouches) return;

      if (
        (this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
        (this.y2 && Math.abs(this.y1 - this.y2) > 30)
      ) {
        const direction = this.getDirection(this.x1, this.x2, this.y1, this.y2);
        this.swipeTimeout = setTimeout( () => {
          this.triggerEvent(
            'swipe',
            { direction },
            { bubbles: true, composed: true }
          )
          this.triggerEvent(
            `swipe${direction}`,
            {},
            { bubbles: true, composed: true }
          )
        }, 0)
      }

      this.x1 = this.x2 = this.y1 = this.y2 = null;
    },
    cancel(e) {
    },
    getDirection(x1, x2, y1, y2) {
      return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
    },
  },

});
