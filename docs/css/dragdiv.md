# 可拖动区域

原理：区域绝对定位，拖动过程中修改区域定位样式

::: demo vue

<template>
<div class='box'>
  <div class='drag-div' :style={top,left} @mousedown="mousedown" @mouseup="mouseup" @mouseleave="mouseleave" @mousemove="mousemove">
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      top:"0",
      left:"0",
      moving:false
    }
  },
  methods: {
    mousedown(){
      this.moving=true;
    },
    mouseup(){
      this.moving=false;
    },
    mouseleave(){
      this.moving=false;
    },
    mousemove(e){
      if(this.moving){
        this.top=Number(this.top.replace('px',''))+e.movementY+'px';
        this.left=Number(this.left.replace('px',''))+e.movementX+'px';
      }
    }
  }
}
</script>
<style>
.box{
  width:200px;
  height:200px;
  background: lightgreen;
  position: relative;
}

.drag-div{
width:50px;
height:50px;
background: red;
position: absolute;
}
</style>

:::
