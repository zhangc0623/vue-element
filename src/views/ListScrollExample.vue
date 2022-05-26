<template>
  <div>
    <ul>
      <div class="menu-div" id="menu">
        <li v-for="i in list" :key="i.value">{{i.value}}</li>
      </div>
    </ul>
    <el-button @click="handleScroll('up')" size="mini" type="primary">向上</el-button>
    <el-button @click="handleScroll('down')" size="mini" type="primary">向下</el-button>
  </div>
</template>

<script>
export default {
  name: "ListScrollExample",
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.handleList()
  },
  methods: {
    // 生成list
    handleList() {
      for (let i = 0; i < 100; i++) {
        this.list.push({
          label: i + 1,
          value: i + 1
        })
      }
    },
    // 滚动效果
    easeInQuad(curtime,begin,end,duration){
      let x = curtime/duration; //x值
      let y = x*x; //y值
      return begin+(end-begin)*y; //套入最初的公式
    },
    easeOutQuad(curtime,begin,end,duration){
      let x = curtime/duration;         //x值
      let y = -x*x + 2*x;  //y值
      return begin+(end-begin)*y;        //套入最初的公式
    },
    easeInoutQuad(curtime,begin,end,duration){
      if(curtime<duration/2){ //前半段时间
        return this.easeInQuad(curtime,begin,(begin+end)/2,duration/2);//改变量和时间都除以2
      }else{
        let curtime1 = curtime-duration/2; //注意时间要减去前半段时间
        let begin1 = (begin+end)/2;//初始量要加上前半段已经完成的
        return this.easeOutQuad(curtime1,begin1,end,duration/2);//改变量和时间都除以2
      }
    },
    // 滚动
    handleScroll (action) {
      let menuScroll = document.getElementById('menu')
      // 每次滚动距离
      let dis = 60;
      // 滚动时长
      let duration = 500;
      // 初始距离
      let preX = 0;
      let startTime = new Date().getTime();
      let func = ()=>{
        let nowTime = new Date().getTime();
        let t = nowTime - startTime;
        // 当时长大于500时，停止滚动
        if (t > duration){
          return;
        }
        let s = this.easeInoutQuad(t, 0, dis, duration);
        // 每次滚动距离
        let x = s - preX;
        preX = s;
        if (action === 'up') {
          // 向上滚动
          menuScroll.scrollTop -= x
        } else if (action === 'down') {
          // 向上滚动
          menuScroll.scrollTop += x
        }
        // 请求滚动
        requestAnimationFrame(func)
      }
      requestAnimationFrame(func)
    }
  }
}
</script>

<style scoped lang="scss">
.menu-div{
  margin: 16px 0;
  height: 200px;
  overflow-y: hidden;
  ul li {
    list-style: none;
  }
}
</style>
