<template>
  <div class="header">
    <div class="nav">
	<router-link :to="{name:'root'}">
      <img src="../assets/cnodejs_light.svg" alt="LOGO" />
	</router-link>
      <ul class="clearfix">
        <li>
		<router-link :to="{name:'root'}">
          <a href="#">首页</a>
		</router-link>
        </li>
        <li>
          <a href="#">新手入门</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">关于</a>
        </li>
        <li>
          <a href="#">注册</a>
        </li>
        <li>
          <a href="#">登录</a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "Header"
};
</script>>



<style scoped>
/*scoped表示该CSS样式只在这个组件内生效*/
ul,
li {
  list-style: none;
}
.header {
  background-color: #444;
  line-height: 50px;
  padding: 5px 68px;
}
.nav {
  line-height: 40px;
  height: 40px;
}
img {
  width: 120px;
  padding: 3px 0;
}
ul {
  float: right;
}
ul > li {
  float: left;
}
a {
  text-decoration: none;
  color: #ccc;
  font-size: 13px;
  padding: 10px 15px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>