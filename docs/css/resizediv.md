# 可调整宽高的 div

## 原理

1. 两个区域一个定高一个撑满剩余
2. 中间有个分割栏
3. 分割栏处按下鼠标进入拉动状态，任意地方放开鼠标结束拉动
4. 进入拉动状态时 根据上次 `mousemove` 相对位置 `movementY` 更新高度
5. 可以设置一个最小高度

::: demo vue

<template>
  <div class="resize-content"  @mouseup="endMove" @mousemove="resize">
    <div class="resize-top" :style="{height:topH}"></div>
    <div class="resize-bar" @mousedown="beginMove"></div>
    <div class="resize-bottom"></div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        selected: false, // 是否选中分割栏
        topH: "150px"
      }
    },
    methods: {
      beginMove() {
        this.selected = true;
      },
      endMove() {
        this.selected = false;
      },
      resize(e) {
        if (this.selected && e.clientY > 100) {
          this.topH =(+this.topH.split('px')[0]+ e.movementY )+ "px";
        }
      }
    },
}
</script>

<style>
.resize-content{
  height: 300px;
  width: 100%;
  background: aquamarine;
  display: flex;
  flex-direction: column;
}
.resize-top{
  width: 100%;
  background: bisque;
}
.resize-bottom{
  flex: 1;
  background-color: brown;
}
.resize-bar{
  height: 5px;
  width: 100%;
  cursor: row-resize;
  background: black;
  opacity: 50%;
}
</style>

:::
