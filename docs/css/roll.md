# 滚动效果

## 利用隐藏的滑动条慢慢滑动实现滚动效果

1. 准备两个一样的需要滚动的内容
2. 包裹滚动内容的 div 大小和一个滚动内容区一样
3. 通过使用定时器慢慢下拉滑动条实现滚动效果

::: demo vue
<template>

  <div class="roll-content" @mouseover="stop" @mouseout="begin">
    <div class="roll-test">定时器滚动，鼠标移入停止，移出继续</div>
    <div class="roll-test">定时器滚动，鼠标移入停止，移出继续</div>
  </div>
</template>

<script>
export default {
      data(){
      return {
        timer:null
      }
    },
    methods: {
      stop() {
        clearInterval(this.timer);
      },
      begin() {
        clearInterval(this.timer);
        this.init();
      },
      init(){
        this.timer = setInterval(() => {
          let content = document.getElementsByClassName("roll-content")[0];
          let test = window.document.getElementsByClassName("roll-test")[0];
          if (content.scrollTop >= test.offsetHeight) {
            content.scrollTop = 0;
          } else {
            content.scrollTop++;
          }
        }, 50);
      }
    },
    mounted(){
      this.init();
    }
}
</script>

<style>
.roll-content {
  width: 100%;
  height: 20px;
  overflow-y: hidden;
}
.roll-test {
  font-size: 20px;
  line-height: 20px;
}
</style>

:::
