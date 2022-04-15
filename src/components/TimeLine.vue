<template>
  <div class='time-line-container' :style="{'--themeColor': themeColor}">
    <!--播放控制-->
    <div class='play-controller'>
      <!--播放、暂停-->
      <div @click='startAutoPlay' v-show='!isPlay' class='play'>
        <svg t='1615535988442' class='icon' viewBox='0 0 1024 1024' version='1.1'
             xmlns='http://www.w3.org/2000/svg' p-id='5225' width='16' height='16'>
          <path
            d='M870.7 465.8L218.1 12.4c-17-12.1-39.7-13.8-58.3-4S129 37.5 129 58.5v906.8c0 21.1 11.3 40.5 30.8 50.2 8.1 4 17 6.5 25.9 6.5 11.3 0 22.7-3.2 32.4-10.5l652.6-453.4c15.4-10.5 24.3-28.3 24.3-46.2 0-18.6-8.9-35.6-24.3-46.1z'
            p-id='5226' fill='#ffffff'></path>
        </svg>
      </div>
      <div @click='isPlay = false' v-show='isPlay' class='pause'>
        <svg t='1615536000943' class='icon' viewBox='0 0 1024 1024' version='1.1'
             xmlns='http://www.w3.org/2000/svg' p-id='5490' width='16' height='16'>
          <path
            d='M767 2c-58.3 0-109.3 51-109.3 109.3v801.4c0 58.3 51 109.3 109.3 109.3s109.3-51 109.3-109.3V111.3C876.3 53 825.3 2 767 2zM257 2c-58.3 0-109.3 51-109.3 109.3v801.4c0 58.3 51 109.3 109.3 109.3s109.3-51 109.3-109.3V111.3C366.3 53 315.3 2 257 2z'
            p-id='5491' fill='#ffffff'></path>
        </svg>
      </div>
      <!--上一个时间-->
      <div class='pre' @click='preTime' v-if='false'>
        <svg t='1615535648117' class='icon' viewBox='0 0 1024 1024' version='1.1'
             xmlns='http://www.w3.org/2000/svg' p-id='15278' width='16' height='16'>
          <path
            d='M57.727096 4.248201c11.271894 0 22.090646 3.823381 30.020621 10.648824a33.985609 33.985609 0 0 1 12.46139 25.772421v946.725787c0 20.108152-19.031941 36.421245-42.482011 36.421245S15.245084 1007.503385 15.245084 987.395233V40.641124C15.245084 20.532972 34.277026 4.248201 57.727096 4.248201z m910.87097 9.431007a73.097381 73.097381 0 0 1 35.854817 63.383161v873.883298a73.097381 73.097381 0 0 1-35.854817 63.383161 68.990787 68.990787 0 0 1-71.284816-0.934604L189.194761 576.452575v0.028321a73.267309 73.267309 0 0 1-34.382108-62.448557c0-25.602492 13.027817-49.307455 34.382108-62.476878L897.31325 14.613812a68.990787 68.990787 0 0 1 71.284816-0.934604z'
            p-id='15279' fill='#ffffff'></path>
        </svg>
      </div>
      <!--下一个时间-->
      <div class='next' @click='nextTime' v-if='false'>
        <svg t='1615535715557' class='icon' viewBox='0 0 1024 1024' version='1.1'
             xmlns='http://www.w3.org/2000/svg' p-id='781' width='16' height='16'>
          <path
            d='M967.11117 0.000284c-11.320879 0-22.186648 3.839997-30.151086 10.723547a34.133305 34.133305 0 0 0-12.515545 25.855979v950.840096c0 20.195539 19.114651 36.579525 42.666631 36.579525s42.666631-16.383986 42.666631-36.579525V36.57981C1009.777801 16.384271 990.663151 0.000284 967.11117 0.000284zM50.205268 9.500721A73.41505 73.41505 0 0 0 14.223076 73.159335v877.681046a73.41505 73.41505 0 0 0 35.982192 63.658614 69.290609 69.290609 0 0 0 71.594607-0.938666l711.195852-438.840523v0.028444A73.585716 73.585716 0 0 0 867.555698 512.028302c0-25.713756-13.112878-49.521737-34.559971-62.748392L121.799875 10.439387A69.290609 69.290609 0 0 0 50.205268 9.500721z'
            p-id='782' fill='#ffffff'></path>
        </svg>
      </div>
    </div>
    <!--        <SplitLine color="#999"></SplitLine>-->
    <!--时间选择-->
    <!--            <div class="time-picker">-->
    <!--                <el-date-picker-->
    <!--                    style="width: 180px"-->
    <!--                    v-model="datePickerTime"-->
    <!--                    size="mini"-->
    <!--                    type="datetime"-->
    <!--                    :format="datePickerFormat"-->
    <!--                    @blur="datePickerChanged"-->
    <!--                    :clearable="false"-->
    <!--                    :disabledDate="outOfTimeRange"-->
    <!--                    placeholder="选择日期时间">-->
    <!--                </el-date-picker>-->
    <!--            </div>-->
    <!--        <SplitLine color="#999"></SplitLine>-->
    <!--时间轴-->
    <div class='time-axis'>
      <div class='progress-bar progress-bar-out' ref='time-line-progress-bar-out'
           :class='[progressOutBarClassName]'
           @mouseout='timeHoverOffsetLeft = -1'
           @mousemove='progressBarOutHover'
           @click='progressBarOutClick'>
        <div :style="{width: progressInBarWidth+'px'}" class='progress-bar progress-bar-in'
             ref='time-line-progress-bar-in'></div>
      </div>
      <!--时间标签-->
      <div class='time-label' v-if='showTimeLabel'>
        <!--时间分割线-->
                <div class='split-line' v-for="timeLabel in timeLabels" :style="{
                  position: 'absolute',
                  height: '5px',
                  left: timeLabel.offsetLeft + 'px',
                  background: '#999',
                  width: '1px'
                }"></div>

        <!--时间标签-->
        <span @click='timeLabelClick(timeLabel.timeMillis)' v-for='timeLabel in timeLabels'
              :class="[outOfTimeRange(timeLabel.timeMillis)?'disable': 'enable']"
              :style="{left: timeLabel.offsetLeft - 20 + 'px'}">{{ timeLabel.label }}</span>
      </div>

      <!--日期分割线-->
      <div class='split-line' v-for="dateLineLabel in dateLineLabels" :style="{
        position: 'absolute',
        height: 'calc(100% - 7px)',
        left: dateLineLabel.offsetLeft + 'px',
        background: '#999',
        width: '1px',
      }"></div>


      <!--日期标签-->
      <div class='date-label' :style="{'margin-top': showTimeLabel? '20px':'10px'}">
                <span @click='timeLabelClick(dateLabel.timeMillis)' v-for='dateLabel in dateLabels'
                      :class="[outOfTimeRange(dateLabel.timeMillis)?'disable': 'enable']"
                      :style="{left: dateLabel.offsetLeft - 60 + 'px'}">{{ dateLabel.label }}</span>
      </div>
      <!--时间指示框-->
      <div class='time-tip'>
        <div
          ref='time-line-time-tip-container'
          @mousedown='timeTipMouseDown' @touchstart='timeTipMouseDown'
          :style="{left: (progressInBarWidth >= progressOutBarWidth - timeTipContainerWidth? progressOutBarWidth - timeTipContainerWidth - 20: progressInBarWidth - 20) + 'px'}"
        >{{ new Date(currentTime).format(timeTipFormat) }}
        </div>
      </div>
      <!--时间指示hover框-->
      <div class='time-tip-hover'>
        <div
          ref='time-line-time-tip-hover-container'
          v-show='(timeHoverOffsetLeft >= 0 && !isTimeTipMouseDown)'
          :style="{left: (timeHoverOffsetLeft> progressOutBarWidth - timeTipHoverContainerWidth?progressOutBarWidth - timeTipHoverContainerWidth - 19.5: timeHoverOffsetLeft - 19.5) + 'px'}"
        >{{ new Date(timeHoverTimeMillis).format(timeTipHoverFormat) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 时间、日期标签
 */
class TimeLabel {
  _timeMillis = 0
  _label = ''
  _offsetLeft = 0

  constructor(timeMillis, label, offsetLeft) {
    this._timeMillis = timeMillis
    this._label = label
    this._offsetLeft = offsetLeft
  }

  get timeMillis() {
    return this._timeMillis
  }

  get label() {
    return this._label
  }

  get offsetLeft() {
    return this._offsetLeft
  }
}

export default {
  name: 'TimeLine',
  data() {
    return {
      isPlay: false,    //自动播放
      autoPlayPreTimeMillis: 0,   //自动播放的上一个时间
      previousTime: new Date().getTime(),    //上一个时间
      currentTime: new Date().getTime(),    //当前时间
      startTime: new Date().getTime(),    //时间轴的起始时间
      endTime: new Date().getTime(),     //时间轴的结束时间
      datePickerTime: new Date(),     //时间选择器的时间
      timeTipContainerWidth: 0,     //时间指示框的div宽度
      timeTipHoverContainerWidth: 0,     //时间指示hover框的div宽度
      progressOutBarWidth: 0,     //进度条容器的宽度
      progressInBarWidth: 0,     //进度条的宽度
      timeHoverOffsetLeft: -1,     //时间指示hover框的div距离左边的距离
      timeHoverTimeMillis: -1,     //时间指示hover框的时间  鼠标移动时鼠标所指的时间
      progressOutBarElement: null,     //进度条容器的div对象(HTMLElement)
      progressInBarElement: null,     //进度条的div对象(HTMLElement)
      progressOutBarClassName: 'enable',     //控制鼠标移入到进度条上的鼠标样式  enable: pointer   disable: not-allowed
      timeLabels: [],     //时间标签列表TimeLabel[]
      dateLabels: [],     //日期标签列表TimeLabel[]
      dateLineLabels: [],     //日期分隔符的列表TimeLabel[]
      isTimeTipMouseDown: false,     //时间指示框的鼠标按下与否
      timeTipMouseDownX: -1,     //时间指示框的鼠标按下时鼠标的横坐标位置 x
      timeTipMouseDownProgressInBarWidth: -1     //时间指示框的鼠标按下时进度条的宽度

    }
  },
  props: {
    // 主题颜色
    themeColor: {
      type: String,
      default: '#00c7ac'
    },
    //自动播放间隔
    autoPlayInterval: {
      type: Number,
      default: 16
    },
    //自动播放每次向前的步长
    autoPlayStep: {
      type: Number,
      default: 60000
    },
    //上一个、下一个时间的步长
    timeStep: {
      type: Number,
      default: 3600000
    },
    //自动播放时向父组件emit时间的规则
    autoPlayTimeEmitRule: {
      type: Function,
      default: null
    },
    //向父组件emit时间的规则
    timeEmitRule: {
      type: Function,
      default: null
    },
    //最小时间
    minTime: {
      type: Number,
      default: null
    },
    //最大时间
    maxTime: {
      type: Number,
      default: null
    },
    //默认的当前时间  父组件传入
    defaultCurrentTime: {
      type: Number,
      default: null
    },
    //默认的起始时间  父组件传入
    defaultStartTime: {
      type: Number,
      default: null
    },
    //默认的结束时间  父组件传入
    defaultEndTime: {
      type: Number,
      default: null
    },
    //时间选择器的时间格式
    datePickerFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm'
    },
    //时间指示框的时间格式
    timeTipFormat: {
      type: String,
      default: 'MM-dd hh:mm'
    },
    //鼠标移入到时间轴上时时间指示框（时间指示hover框）的时间格式
    timeTipHoverFormat: {
      type: String,
      default: 'MM-dd hh:mm'
    },
    //是否显示时间标签
    showTimeLabel: {
      type: Boolean,
      default: true
    },
    //时间标签间隔
    generateTimeLabelStep: {
      type: Number,
      default: 3600000
    },
    //控制移动时间指示框到左右两边时 时间轴滚动的步长(1帧内)
    timeTipMoveStep: {
      type: Number,
      default: 60000
    },
    //自定义时间标签
    customTimeLabelList: {
      type: Array,
      default: null
    },
    //时间标签筛选函数   return true的显示，return false的不显示
    timeLabelFilter: {
      type: Function,
      default: (time) => {
        let h = new Date(time).getHours()
        if (h != 0 && h % 3 == 0) {
          return true
        }
        return false
      }
    }
  },
  beforeMount() {
    let currentDate = new Date(this.currentTime)
    if (this.defaultCurrentTime) {
      currentDate = new Date(this.defaultCurrentTime)
      this.currentTime = this.defaultCurrentTime
    } else {
      currentDate.setHours(0, 0, 0, 0)
    }

    let startTimeMillis = currentDate.getTime() - 2 * 24 * 3600000
    let endTimeMillis = currentDate.getTime() + 3 * 24 * 3600000 - 1
    this.startTime = this.defaultStartTime || startTimeMillis
    this.endTime = this.defaultEndTime || endTimeMillis
  },
  mounted() {
    this.progressOutBarElement = this.$refs['time-line-progress-bar-out']
    this.progressInBarElement = this.$refs['time-line-progress-bar-in']
    this.moveTo(this.currentTime)
    this.showTimeLabels()
    this.showDateLabels()

    window.addEventListener('resize', this.windowResize.bind(this))

    window.addEventListener('mouseup', this.timeTipMouseUp.bind(this))
    window.addEventListener('touchend', this.timeTipMouseUp.bind(this))

    window.addEventListener('mousemove', this.timeTipMouseMove.bind(this))
    window.addEventListener('touchmove', this.timeTipMouseMove.bind(this))

    this.setTimeTipContainerWidth()
  },
  methods: {
    /**
     * 向父组件emit时间
     */
    emitTime(currentTime) {
      this.previousTime = currentTime
      this.$emit('timeChange', currentTime)
      // return currentTime;
    },
    /**
     * 向父组件emit时间 emit前的判断
     */
    onTimeChange() {
      this.$nextTick(() => {
        let previousTime = this.previousTime
        let currentTime = this.currentTime

        // debugger

        if (this.timeEmitRule && this.timeEmitRule instanceof Function) {
          if (this.timeEmitRule(previousTime, currentTime)) {
            this.emitTime(currentTime)
          }
        } else {
          this.emitTime(currentTime)
        }
      })
    },
    /**
     * 设置时间指示框和时间指示hover框的宽度
     */
    setTimeTipContainerWidth() {
      let timeTipContainer = this.$refs['time-line-time-tip-container']
      let timeTipHoverContainer = this.$refs['time-line-time-tip-hover-container']
      let timeTipContainerWidth = this.getDivWidth(timeTipContainer)
      let timeTipHoverContainerWidth = this.getDivWidth(timeTipHoverContainer)
      this.timeTipContainerWidth = timeTipContainerWidth || 0
      this.timeTipHoverContainerWidth = timeTipHoverContainerWidth || 0
    },
    /**
     * 时间选择器确认选择时间后的回调
     */
    datePickerChanged() {
      let time = new Date(this.datePickerTime).getTime()
      if (this.outOfTimeRange(time)) {
        this.datePickerTime = new Date(this.currentTime)
        return
      }
      if (time > this.startTime && time < this.endTime) {
        this.moveTo(time)
        this.onTimeChange()
      } else {
        let length = this.endTime - this.startTime
        let startTime = time - length / 2
        let endTime = time + length / 2

        this.startTime = startTime
        this.endTime = endTime
        this.currentTime = time
        this.refreshTimeLine()
        this.onTimeChange()
      }
    },
    /**
     * 重置时间轴
     */
    refreshTimeLine() {
      this.showTimeLabels()
      this.showDateLabels()
      this.moveTo(this.currentTime)
    },

    /**
     * 开始自动播放
     */
    startAutoPlay() {
      this.isPlay = true
      this.autoPlay()
    },
    /**
     * 自动播放
     */
    autoPlay() {
      if (!this.isPlay) {
        return
      }

      let now = new Date().getTime()
      let autoPlayInterval = this.autoPlayInterval || 16
      //按照指定的自动播放间隔播放
      if (now - this.autoPlayPreTimeMillis < autoPlayInterval) {
        requestAnimationFrame(this.autoPlay.bind(this))
        return
      }
      this.autoPlayPreTimeMillis = now

      let currentTime = this.currentTime
      let nextTime = currentTime + this.autoPlayStep
      let progressInWidth = this.getOffsetLeft(nextTime)
      if (this.progressOutBarWidth - progressInWidth < this.timeTipContainerWidth) {
        this.endTime += this.autoPlayStep
        this.startTime += this.autoPlayStep
        this.showTimeLabels()
        this.showDateLabels()
      }
      this.moveTo(nextTime)

      //按照指定的emit规则向父组件emit时间
      if (this.autoPlayTimeEmitRule) {
        if (this.autoPlayTimeEmitRule(currentTime, nextTime)) {
          // console.log('emit: ' + new Date(nextTime))
          this.onTimeChange()
        }
      } else {
        // console.log('emit: ' + new Date(nextTime))
        this.onTimeChange()
      }

      requestAnimationFrame(this.autoPlay.bind(this))

    },
    /**
     * 上一个时间
     */
    preTime() {
      let currentTime = this.currentTime - this.timeStep
      if (currentTime < this.startTime) {
        let length = this.endTime - this.startTime
        this.endTime = this.startTime
        this.startTime = this.endTime - length
        this.showTimeLabels()
        this.showDateLabels()
      }
      this.moveTo(currentTime)
      this.onTimeChange()
    },

    /**
     * 下一个时间
     */
    nextTime() {
      let currentTime = this.currentTime + this.timeStep
      if (this.outOfTimeRange(currentTime)) {
        return
      }
      if (currentTime > this.endTime) {
        let length = this.endTime - this.startTime
        this.startTime = this.endTime
        this.endTime = this.startTime + length
        this.showTimeLabels()
        this.showDateLabels()
      }
      this.moveTo(currentTime)
      this.onTimeChange()
    },

    /**
     * 窗口尺寸改变事件
     */
    windowResize() {
      this.progressOutBarWidth = this.getDivWidth(this.progressOutBarElement)
      this.moveTo(this.currentTime)
      this.showTimeLabels()
      this.showDateLabels()
    },

    /**
     * 时间指示框鼠标按下事件
     */
    timeTipMouseDown(e) {
      this.isTimeTipMouseDown = true
      this.timeTipMouseDownX = e.x || e.targetTouches[0].pageX
      this.timeTipMouseDownProgressInBarWidth = this.progressInBarWidth
    },

    /**
     * 鼠标抬起事件
     */
    timeTipMouseUp() {
      if (this.isTimeTipMouseDown) {
        this.onTimeChange()
      }
      this.isTimeTipMouseDown = false
    },

    /**
     * 用于移动时间指示框
     * @param offsetX  1或-1  用于控制向右还是向左移动
     */
    timeTipMouseMoveTimeLine(offsetX) {
      if (!this.isTimeTipMouseDown) {
        return
      }
      let timeTipMoveStep = this.timeTipMoveStep || 60000

      //当进度条不在两边时停止移动
      let currentTime = this.currentTime + offsetX * timeTipMoveStep
      let progressInBarWidth = this.getOffsetLeft(currentTime)
      if (!(this.progressOutBarWidth - progressInBarWidth < this.timeTipContainerWidth + 10 || progressInBarWidth < 20)) {
        return
      }

      this.endTime += offsetX * timeTipMoveStep
      this.startTime += offsetX * timeTipMoveStep

      //超出最大最小时间范围停止移动
      if (this.outOfTimeRange(currentTime)) {
        return
      }

      this.showDateLabels()
      this.showTimeLabels()
      this.moveTo(currentTime)
      // if (this.progressOutBarWidth - progressInBarWidth < 120 || progressInBarWidth < 30) {
      //     requestAnimationFrame(this.timeTipMouseMoveTimeLine.bind(this, offsetX));
      // }

      requestAnimationFrame(this.timeTipMouseMoveTimeLine.bind(this, offsetX))
    },
    /**
     * 鼠标移动事件  当鼠标在时间指示框上按下时，用来移动时间指示框
     * @param e
     */
    timeTipMouseMove(e) {
      if (!this.isTimeTipMouseDown) {
        return
      }
      let x = e.x || e.targetTouches[0].pageX
      let offsetX = x - this.timeTipMouseDownX

      let progressInBarWidth = this.timeTipMouseDownProgressInBarWidth + offsetX

      //当时间指示框移到两边时自动滚动进度条，否则只移动指示框
      if (this.progressOutBarWidth - progressInBarWidth < this.timeTipContainerWidth || progressInBarWidth < 10) {
        requestAnimationFrame(this.timeTipMouseMoveTimeLine.bind(this, offsetX / Math.abs(offsetX)))
      } else {
        // this.progressInBarWidth = progressInBarWidth;
        let percent = progressInBarWidth / this.progressOutBarWidth
        if (percent < 0 || percent > 1) {
          return
        }
        let currentTime = this.startTime + percent * (this.endTime - this.startTime)
        this.moveTo(currentTime)
      }
    },
    /**
     * 进度条容器鼠标hover事件
     * @param e
     */
    progressBarOutHover(e) {
      return
      let offsetX = e.offsetX
      let outBarWidth = this.progressOutBarWidth
      let percent = offsetX / outBarWidth
      let offsetTime = (this.endTime - this.startTime) * percent
      this.timeHoverOffsetLeft = offsetX
      this.timeHoverTimeMillis = this.startTime + offsetTime

      //不在范围内的鼠标显示禁用手势
      if (this.outOfTimeRange(this.timeHoverTimeMillis)) {
        this.progressOutBarClassName = 'disable'
      } else {
        this.progressOutBarClassName = 'enable'
      }
    },

    /**
     * 进度条容器鼠标点击事件
     * @param e
     */
    progressBarOutClick(e) {
      let offsetX = e.offsetX
      let outBarWidth = this.progressOutBarWidth
      let percent = offsetX / outBarWidth
      let offsetTime = (this.endTime - this.startTime) * percent
      let currentTime = this.startTime + offsetTime
      this.moveTo(currentTime)
      this.onTimeChange()
    },

    /**
     * 时间、日期标签点击事件
     * @param timeMillis
     */
    timeLabelClick(timeMillis) {
      this.moveTo(timeMillis)
      this.onTimeChange()
    },
    /**
     * 根据时间获取距离进度条左边的距离
     * @param time
     * @private
     */
    getOffsetLeft(time) {
      let outBarWidth = this.progressOutBarWidth
      let percent = (time - this.startTime) / (this.endTime - this.startTime)
      let offsetLeft = outBarWidth * percent
      return offsetLeft
    },
    /**
     * 根据时间列表获取时间标签列表
     * @private TimeLabel[]：时间标签列表
     */
    getCustomTimeLabels() {
      if (this.customTimeLabelList == null) {
        return []
      }
      let timeLabels = []
      for (let time of this.customTimeLabelList) {
        let offsetLeft = this.getOffsetLeft(time)
        if (offsetLeft < 0 || offsetLeft > this.progressOutBarWidth) continue
        let label = new Date(time).getHours()
        timeLabels.push(new TimeLabel(time, label, offsetLeft))
      }
      return timeLabels
    },
    /**
     * 获取时间标签列表
     * @private
     */
    getTimeLabels() {
      //如果有自定义的时间标签，则返回自定义的时间标签列表
      if (this.customTimeLabelList != null && this.customTimeLabelList.length > 0) {
        return this.getCustomTimeLabels()
      }
      //否则按照generateTimeLabelStep(默认为一个小时)的间隔获取从startTime到endTime之间的时间标签
      let arr = []
      for (let t = this.startTime; t <= this.endTime; t += this.generateTimeLabelStep) {
        let tDate = new Date(t)
        tDate.setMinutes(0, 0, 0)
        let offsetLeft = this.getOffsetLeft(tDate.getTime())
        if (offsetLeft < 0 || offsetLeft > this.progressOutBarWidth) continue
        arr.push(new TimeLabel(tDate.getTime(), tDate.getHours(), offsetLeft))
      }
      return arr
    },
    /**
     * 获取日期标签列表
     * @private
     */
    getDateLabels() {
      let arr = []
      let weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      for (let t = this.startTime; t <= this.endTime; t += 24 * 3600000) {
        let tDate = new Date(t)
        tDate.setHours(12, 0, 0, 0)
        let offsetLeft = this.getOffsetLeft(tDate.getTime())
        // if (offsetLeft < 0 || offsetLeft > this.progressOutBarWidth) continue;
        let week = tDate.getDay()
        //@ts-ignore
        arr.push(new TimeLabel(tDate.getTime(), tDate.format(weeks[week] + '(MM-dd)'), offsetLeft))
      }
      return arr
    },
    /**
     * 获取日期分割线列表
     * @private
     */
    getDateLineLabels() {
      let outBarWidth = this.progressOutBarWidth
      let arr = []
      for (let t = this.startTime; t <= this.endTime; t += 24 * 3600000) {
        let tDate = new Date(t)
        tDate.setHours(0, 0, 0, 0)
        let percent = (tDate.getTime() - this.startTime) / (this.endTime - this.startTime)
        let offsetLeft = outBarWidth * percent
        if (offsetLeft < 0 || offsetLeft > this.progressOutBarWidth) continue
        arr.push(new TimeLabel(tDate.getTime(), '', offsetLeft))
      }
      return arr
    },
    /**
     * 显示日期标签和日期分割线标签
     */
    showDateLabels() {
      let _dateLabels = this.getDateLabels()
      let _dateLineLabels = this.getDateLineLabels()

      this.dateLabels = _dateLabels
      this.dateLineLabels = _dateLineLabels
    },
    /**
     * 显示时间标签
     */
    showTimeLabels() {
      let _timeLabels = this.getTimeLabels()
      let timeLabels = []

      //如果没有自定义的时间标签且有自定义的时间标签筛选函数，则进行时间标签筛选
      if (this.timeLabelFilter && !this.customTimeLabelList) {
        for (let timeLabel of _timeLabels) {
          if (this.timeLabelFilter(timeLabel.timeMillis)) {
            timeLabels.push(timeLabel)
          }
        }
      } else {
        timeLabels = _timeLabels
      }
      this.timeLabels = timeLabels
    },
    /**
     * 将进度条跳转到指定时间
     * @param time
     */
    moveTo(time) {
      //超出时间范围的就return
      if (this.outOfTimeRange(time)) {
        this.isPlay = false
        return
      }
      this.currentTime = time
      if (this.progressOutBarWidth == 0) {
        this.progressOutBarWidth = this.getDivWidth(this.progressOutBarElement)
      }
      let outBarWidth = this.progressOutBarWidth
      let percent = (this.currentTime - this.startTime) / (this.endTime - this.startTime)
      let inBarWidth = outBarWidth * percent
      this.progressInBarWidth = inBarWidth
    },
    /**
     * 获取div的实际宽度
     * @param div
     */
    getDivWidth(div) {
      if (div == null) {
        throw 'div is null'
      }
      let style = window.getComputedStyle(div, null)
      let sWidth = style.width
      if (sWidth) {
        sWidth = sWidth.replace('px', '')
      }
      let width = Number.parseInt(sWidth)
      return width
    },
    /**
     * 判断时间是否超过最大值
     * @param time
     */
    greaterThanMaxTime(time) {
      if (this.maxTime == null) {
        return false
      }
      return time > this.maxTime
    },
    /**
     * 判断时间是否小于最小值
     * @param time
     */
    lessThanMinTime(time) {
      if (this.minTime == null) {
        return false
      }
      return time < this.minTime
    },
    /**
     * 判断时间是否在最大值和最小值范围之内
     * @param time
     */
    outOfTimeRange(time) {
      return this.greaterThanMaxTime(time) || this.lessThanMinTime(time)
    }

  },
  watch: {
    /**
     * 监听timeHoverOffsetLeft
     * 当时间指示hover框的距离左边的距离改变时判断如果timeTipHoverContainerWidth == 0的话给它赋值
     * 因为hover框默认是隐藏的，所以在初始化的时候没法获取到其div的宽度
     * 所以要在其显示的时候计算其宽度
     */
    timeHoverOffsetLeft() {
      if (this.timeTipHoverContainerWidth == 0) {
        this.setTimeTipContainerWidth()
      }
    },
    /**
     * 监听timeTipFormat
     * 如果日期显示格式有改变的话要重新设置时间指示框和时间指示hover框的宽度
     */
    timeTipFormat() {
      this.setTimeTipContainerWidth()
    },
    /**
     * 监听timeTipHoverFormat
     * 如果日期显示格式有改变的话要重新设置时间指示框和时间指示hover框的宽度
     */
    timeTipHoverFormat() {
      this.setTimeTipContainerWidth()
    },
    /**
     * 监听customTimeLabelList
     * 当自定义时间标签改变时重新显示时间标签
     */
    customTimeLabelList() {
      this.showTimeLabels()
    },
    /**
     * 监听currentTime
     */
    currentTime() {
      // this.previousTime = previousTime;
    },
    /**
     * 监听defaultEndTime
     * 如果父组件改变了defaultEndTime要重置时间轴
     */
    defaultEndTime() {
      if (!this.defaultEndTime) return
      this.endTime = this.defaultEndTime
      this.refreshTimeLine()
    },
    /**
     * 监听defaultStartTime
     * 如果父组件改变了defaultStartTime要重置时间轴
     */
    defaultStartTime() {
      if (!this.defaultStartTime) return
      this.startTime = this.defaultStartTime
      this.refreshTimeLine()
    },
    /**
     * 监听defaultCurrentTime
     * 如果父组件改变了defaultCurrentTime要重新设置时间轴时间
     */
    defaultCurrentTime() {
      if (!this.defaultCurrentTime) return

      this.moveTo(this.defaultCurrentTime)
    }

  }
}
</script>

<style scoped>

.time-line-container {
  width: 100%;
  /*min-width: 500px;*/
  height: 60px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.52);
  display: flex;
  color: #fff;
}

.play-controller {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
}

.play-controller > div {
  border-radius: 100%;
  width: 26px;
  height: 26px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  cursor: pointer;
}

.play-controller .play, .play-controller .pause {
  background: var(--themeColor);
}

.time-picker {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-axis {
  flex: 1;
  height: 100%;
  margin-right: 30px;
  position: relative;
}

.progress-bar.progress-bar-out {
  width: 100%;
  background: #b1b5c4;
  height: 7px;
  border-radius: 3px;
  position: relative;
  z-index: 100;
}

.progress-bar.progress-bar-out.enable {
  cursor: pointer;
}

.progress-bar.progress-bar-out.disable {
  cursor: not-allowed;
}

.progress-bar.progress-bar-in {
  width: 50%;
  height: 100%;
  border-radius: 3px;
  background: var(--themeColor);
  z-index: 100;

}

.time-label, .date-label, .time-tip, .time-tip-hover {
  width: 100%;
  position: absolute;
}

.date-label {
  margin-top: 20px;
  height: calc(100% - 30px);
  position: absolute;
  overflow-x: hidden;
}

.time-label > span, .date-label > span {
  position: absolute;
  left: -10000px;
  top: 6px;
  text-align: center;
  width: 40px;
  font-size: 0.9em;
}

.time-label > span.enable, .date-label > span.enable {
  cursor: pointer;
}

.time-label > span.disable, .date-label > span.disable {
  cursor: not-allowed;
}

.date-label > span {
  width: 120px;
}

.time-tip > div {
  position: absolute;
  background: var(--themeColor);
  padding: 5px 5px;
  /*width: 100px;*/
  text-align: center;
  color: #fff;
  border-radius: 15px 15px 15px 0;
  top: -38px;
  font-size: 0.9em;
  cursor: pointer;
  user-select: none;
}

.time-tip > div:active {
  /*cursor: move;*/
}

.time-tip-hover > div {
  background: rgba(74, 74, 74, 0.67);
  position: absolute;
  padding: 5px 5px;
  /*width: 80px;*/
  text-align: center;
  border-radius: 5px;
  top: -38px;
  font-size: 0.8em;

  word-break: keep-all;
  white-space: nowrap;
}

.time-tip-hover > div::before {
  content: "";
  width: 0;
  position: absolute;
  bottom: -10px;
  left: 15px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(74, 74, 74, 0.67) transparent transparent transparent;
  z-index: 1;
}
</style>
