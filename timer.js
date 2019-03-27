new Vue({
  el: "#app",
  data() {
    return {
      color: "teal", // teal, red, orange
      started: false,
      darkmode: true,
      intervals: {
        timer: null,
        blink: null
      },
      seconds: 60,
      secondsLeft: 60,
      tick: 1000
    };
  },
  beforeDestroy() {
    this.stopTimer();
    this.stopBlink();
  },
  computed: {
    percent() {
      return this.secondsLeft / this.seconds * 100;
    }
  },
  methods: {
    debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        var later = function later() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
    },
    reset() {
      console.log("reset");
      this.stopTimer();
      this.secondsLeft = this.seconds;
      this.color = "teal";
      this.darkmode = true;
      setTimeout(this.startTimer, this.tick);
    },
    decrease() {
      if (this.secondsLeft === 0) {
         return this.startBlink();
      }
      this.stopBlink();
      this.secondsLeft--;
      if (this.secondsLeft <= 15) {
        this.color = "red";
      } else if (this.secondsLeft <= 30) {
        this.color = "orange";
      }
    },
    start() {
      console.log("start");
      this.startTimer();
    },
    startTimer() {
      if (!this.intervals.timer) {
        console.log("startTimer");
        this.intervals.timer = setInterval(this.decrease, this.tick);
      }
    },
    stopTimer() {
      if (this.intervals.timer) {
        console.log("stopTimer");
        clearInterval(this.intervals.timer);
        this.intervals.timer = null;
      }
    },
    blink() {
      this.darkmode = !this.darkmode;
    },
    startBlink() {
      if (!this.intervals.blink) {
        console.log("startBlink");
        this.intervals.blink = setInterval(this.blink, 100);
      }
    },
    stopBlink() {
      if (this.intervals.blink) {
        console.log("stopBlink");
        clearInterval(this.intervals.blink);
        this.intervals.blink = null;
      }
    },
    onKeyPress() {
      if (this.intervals.timer) {
        this.reset();
      } else {
        this.start();
      }
    },
    detectKeyPress() {
      const callbackDebounced = this.debounce(this.onKeyPress, 300);
      document.addEventListener("keydown", callbackDebounced);
    }
  },
  mounted() {
    this.detectKeyPress();
  }
});
