<template>
  <div id="app">
    <Header></Header>
    <div class="main">
	<!--注意先后顺序，SlideBar要放在main的上面-->
	  <router-view name="SlideBar"></router-view>
      <router-view name="main"></router-view>	  
    </div>
  </div>
</template>

<script> 
import Header from './components/Header'
import PostList from './components/PostList'
import SlideBar from './components/SlideBar'

export default {
  name:"App",
  components:{
    Header,
    PostList
  }
}

</script>
<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
body{
  background-color: #e1e1e1;
}
.main{
  width:80%;
  margin: 0 auto;
}
</style>
