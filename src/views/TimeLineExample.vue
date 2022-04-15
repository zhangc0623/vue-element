<template>
  <div class="time-line">
    <time-line theme-color="red"></time-line>
  </div>
</template>

<script>
import TimeLine from "@/components/TimeLine";
export default {
  name: "TimeLineExample",
  data() {
    return {
    }
  },
  components: {
    TimeLine
  },
  methods: {}
}
</script>

<style scoped>
  .time-line{
    width: calc(100% - 230px);
    position: absolute;
    bottom: 10px;
  }
</style>
