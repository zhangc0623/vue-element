<template>
  <div>
    <el-table
        :data="tableData"
        border
        :span-method="objectSpanMethod"
        height="650"
        style="width: 60%;">
      <el-table-column
          prop="provinceName"
          label="城市"
          fixed
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="dataTime"
          label="日期"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="aqi"
          align="center"
          width="180"
          label="AQI">
      </el-table-column>
      <el-table-column
          prop="so2"
          align="center"
          width="180"
          label="SO₂">
      </el-table-column>
      <el-table-column
          prop="no2"
          align="center"
          width="180"
          label="NO₂">
      </el-table-column>
      <el-table-column
          prop="pm10"
          align="center"
          width="180"
          label="PM₁₀">
      </el-table-column>
      <el-table-column
          prop="co"
          align="center"
          width="180"
          label="CO">
      </el-table-column>
      <el-table-column
          prop="o3"
          align="center"
          width="180"
          label="O₃">
      </el-table-column>
      <el-table-column
          prop="pm25"
          align="center"
          width="180"
          label="PM₂.₅">
      </el-table-column>
    </el-table>
    {{date}}----{{info}}
  </div>
</template>

<script>
import data from '@/assets/json/data001.json'
import {dateAdd, getWeekday} from '@/utils/dateUtil'
import {isDataNull} from "@/utils";
export default {
  name: 'HomeView',
  data() {
    return {
      tableData: data.data,
      spanArr: [],
      pos: 0,
      date: ''
    }
  },
  props: ['info'],
  methods: {
    getSpanArr(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].provinceName === data[i - 1].provinceName) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        }
      }
    }
  },
  mounted() {
    this.getSpanArr(this.tableData);
    this.date = getWeekday(new Date())
  }
}
</script>

<style>

</style>
