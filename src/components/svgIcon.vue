<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners" :style="{height:fontSize+'px',width:fontSize+'px',color:color}">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    fontSize:{
      type: Number,
    },
    color:{
      type:String,
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  width:150px;
  height:150px;
  fill: currentColor;
  overflow: hidden;
}
</style>
