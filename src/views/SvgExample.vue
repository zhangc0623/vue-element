<template>
  <div>
    颜色：<el-color-picker v-model="color" size="mini"></el-color-picker>
    大小：<el-input-number v-model="fontSize" size="mini"></el-input-number>
    <div>
      <svg-icon icon-class="grid" :color="color" :fontSize="fontSize"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "SvgExample",
  data() {
    return {
      color: '#409EFF',
      fontSize: 100,
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
