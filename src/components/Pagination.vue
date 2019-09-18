<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
	<button @click="changeBtn">上一页</button>
	<button v-if="judge" class="pagebtn">......</button>
	<button v-for="btn in pagebtns"
	:class="[{currentPage:btn===currentPage},'pagebtn']"
	@click="changeBtn(btn)">
	{{btn}}
	</button>
	<button @click="changeBtn">下一页</button>
  </div>
</template>


<script> 
import $ from 'jquery'

export default {
  name:"Pagination",
  data(){
	  return{
		  pagebtns:[1,2,3,4,5,'......'],
		  currentPage:1,
		  judge: false
	  }
  },
  methods:{
	  changeBtn(page){
		  if(typeof page !== 'number' && page !== undefined){
			switch(page.target.innerText){
			  case '上一页':
			     $('button.currentPage').prev().click() // 点击当前按钮的上一个按钮
			     break 
		      case '下一页':
			     $('button.currentPage').next().click() // 点击当前按钮的下一个按钮
			     break 
			  case '首页':
			     this.pagebtns = [1,2,3,4,5,'......']  // 重置按钮
				 this.changeBtn(1)  // 点击第一页
			     break 
			  default:
                 break	
            }
            return  // 这里为什么要return暂时不懂			
		  }
		  
		  if(page>=5){
			  console.log(page)
			  this.judge = true  // 如果按钮上的数字>=5，就显示v-if
		  }else{
			  this.judge = false
		  }
		  
		  
		  
		  if(page===this.pagebtns[4]){ // 如果当前点击的按钮数字是最后一个
			  this.pagebtns.shift() // 移除第一个数字
			  this.pagebtns.splice(4,0,this.pagebtns[3]+1) // 移除第一个元素后，每次在最后一个位置增加(最后一个数字+1)
		  }else if(page===this.pagebtns[0] && page !== 1){
			  this.pagebtns.unshift(this.pagebtns[0]-1) // 在数组的开头添加一个(第一个数字-1)
			  this.pagebtns.splice(5,1) // 删除最后一个数字
		  }
		  
		  this.currentPage = page // 让currentPage = 当前点击的按钮数字(btn)
		
		  this.$emit('handleList',this.currentPage) // 把currentPage传递给父组件PostList，并用一个自定义事件handleList接收
	  }
  }
}

</script>


<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>
