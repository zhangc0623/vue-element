<template>
  <div>
    <el-button type="primary" size="mini" @click="openDialog">弹出弹窗</el-button>
  </div>
</template>

<script>
import {toolDialog} from "@/utils";
export default {
  name: "DialogExample",
  data() {
    return {}
  },
  methods: {
    openDialog() {
      toolDialog(()=>import('./Table.vue'), { title: '弹框',width:'60%'},
          {
            info: '组件信息'
          }
      ).then((res)=>{
        // 回调函数
      })
    }
  }
}
</script>

<style scoped>

</style>
