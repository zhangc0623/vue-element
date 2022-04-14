<template>
  <div>
    <el-select v-model="listI"  v-loadmore="loadMore" filterable  class="input_width">
      <el-option v-for="(item) in list"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value" />
      <el-option value="1" disabled style="text-align: center;color: #999999;font-size: 12px;">{{selectText}}</el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "LoadMoreExample",
  data() {
    return {
      list: [],
      count: 0,
      selectText: '下拉加载更多...',
      listI: ''
    }
  },
  methods: {
    loadMore() {
      this.count++
      if (this.count < 3) {
        this.list = [...this.list, ...this.handleList()]
      } else {
        this.selectText = '没有更多了'
      }
    },
    handleList() {
      let arr = []
      for (let i = 0; i < 9; i++) {
        arr.push({
          label: this.count + '' + (i + 1),
          value: this.count + '' + (i + 1)
        })
      }
      return arr
    }
  },
  mounted() {
    this.list = this.handleList()
  }
}
</script>

<style scoped>

</style>
