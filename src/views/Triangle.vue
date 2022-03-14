<template>
  <div class="triangle">
    <div>请编写一个程序，输出杨辉三角中第 n 行第 m 个数字。</div>
    <div>
      第 <el-input-number size="mini" :min="1" v-model="n"></el-input-number> 行
      第 <el-input-number size="mini" :min="1" v-model="m"></el-input-number> 列
      <el-button size="mini" type="primary" @click="search">查询</el-button>
      <div>结果：{{result}}</div><br/><br/>
    </div>
    <div>请编写一个程序，生成杨辉三角</div>
    <div>
      行：<el-input-number size="mini" :min="1" v-model="line" style="margin-right: 10px;"></el-input-number>
      <el-button size="mini" type="primary" @click="get">生成杨辉三角</el-button><br/><br/>
      <div>结果：
        <p v-for="i in triangleResult" style="text-align: center;">
          <span v-for="j in i">{{j}}&nbsp;&nbsp;</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Triangle",
  data() {
    return {
      m: 1,
      n: 1,
      result: null,
      count: 0,
      // 杨辉三角
      line: 1,
      triangleResult: []
    }
  },
  methods: {
    search() {
      this.count = 0
      if (this.n >= this.m) {
        this.result = this.func(this.n, this.m)
      } else {
        this.$message.warning('列不能大于行！')
      }
    },
    // 递归，输出第 n 行第 m 个数字
    func(n, m) {
      this.count ++
      if (m < 1 || m > n) {
        return 0
      }
      if (n == 1){
        return 1
      }
      if (m == 1) {
        return 1
      }
      return this.func((n-1), (m-1)) + this.func((n-1), m)
    },
    get () {
      this.triangleResult = this.sumFunc(this.line)
    },
    // 生成杨辉三角
    sumFunc(n) {
      let res = [[1]]
      if (n === 1) {
        return 1
      }
      // 行
      for (let i = 1; i < n; i++) {
        res[i] = []
        // 列
        for (let j = 0; j <= i; j++) {
          let a = res[i - 1][j-1] || 0
          let b = res[i - 1][j] || 0
          res[i].push(a+b)
        }
      }
      return res
    }
  }
}
</script>

<style scoped lang="less">
.triangle{
  text-align: left;
  div{
    margin-bottom: 10px;
  }
}

</style>
