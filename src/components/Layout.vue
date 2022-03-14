<template>
  <div class="layout">
    <el-container class="container">
      <!--头部-->
      <el-header class="header">不吃葱</el-header>
      <el-container>
        <!--左侧导航-->
        <el-aside width="200px" class="aside">
          <el-menu
              default-active="/"
              :router="true"
              class="el-menu-vertical-demo">
            <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.path">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.text }}</span>
              </template>
              <el-menu-item v-for="(childItem,childIndex) in item.children" :key="childIndex" :index="childItem.path">
                <span slot="title">{{ childItem.text }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--内容-->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {menuList} from "@/assets/js/menuList";
export default {
  name: 'Layout',
  components: {
  },
  mounted () {
  },
  data () {
    return {
      menuList: menuList
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.layout{
  .header{
    background-image: linear-gradient(to right, rgba(30, 111, 255, 0.8) , rgba(30, 111, 255, 0.3));
    text-align: left;
    color: white;
    font-size: 24px;
    line-height: 60px;
  }
  .aside{
    text-align: left;
    height: calc(100vh - 60px);
  }
}
</style>
