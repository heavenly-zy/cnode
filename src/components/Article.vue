<template>
  <div class="article">
    <!-- 在数据未返回的时候，显示这个正在加载的loading动画 -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.svg" alt="loading" />
    </div>
    <div v-else>
	   <div class="topic_header">
	      <div class="topic_title">{{posts.title}}</div>
		  <ul class="aaa">
		     <li>发布于{{posts.create_at | formatDate}}</li>&nbsp;
			 <li>作者{{posts.author.loginname}}</li>&nbsp;
			 <li>{{posts.visit_count}}次浏览</li>&nbsp;
			 <li>来自 {{posts | tabFormat}}</li>&nbsp;
		  </ul>
		  <div v-html="posts.content" class="topic_content"></div>
	   </div>
	<div id="reply">
	   <div class="topbar">回复</div>
	   <div v-for="(reply,index) in posts.replies" class="replySec">
		   <router-link :to="{
			   name:'user_info',
			   params:{
				   name:reply.author.loginname // 注意这里不是字符串，踩坑了
			   }
		   }">
	          <img :src="reply.author.avatar_url" alt="头像" style="width:30px;height:30px;">
		   </router-link>
		      <span>{{reply.author.loginname}}</span>
		      <span>{{index + 1}}楼</span>
			  <div class="replyUP">
		      <span v-if="reply.ups.length>0" class="ups">{{reply.ups.length}}</span>
		      <span v-else></span>
		 </div>
		 <p v-html="reply.content" class="markdown-text"></p>
	   </div>
	</div>
	</div>
  </div>
</template>

<script>
export default {
    name:"Article",
    data(){
        return{
            isLoading:false, // 默认不显示loading动画
            posts: [] // 代表当前页面的所有内容列表数组
        }
    },
	methods:{
		getArticleData(){ // 这里的id为id:post.id
			this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)// ES6 语法，字符串拼接
			.then((response)=>{
				this.isLoading = false
				console.log(response)
				this.posts = response.data.data;
			})
			.catch((error)=>{
				console.log(error)
			})
		}
	},
    beforeMount() {
       this.isLoading = true; // 在页面加载成功之前显示 lodaing 动画
       this.getArticleData(); // 在页面加载之前获取数据
    },
	watch:{ // 监听路由的变化，暂时不是很理解为什么要监听路由的变化
		'$route'(to,from){
			this.getArticleData()
		}
	}
};
</script>

<style>
/*引入外部CSS时要去掉scoped*/
@import url('../assets/markdown-github.css');
.aaa>li::before{
   content:"•";
}
.ups{
    float:right;
}
.ups::before{
	content: "👍";
}
.topbar {
    padding: 10px;
    background-color: #f6f6f6;
    font-size: 12px;
    margin-top:0px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }

  #reply a{
	display:inline-block;
	margin-top:10px;
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  #reply span{
	display:inline-block;
	margin-top:-50px;
    font-size: 13px;
    color: #666;
    text-decoration: none;
	margin-left:5px;
  }
  
  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:5px 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }

  .topic_header {
    padding: 10px;
	margin-top: 10px;
  }

  .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .topic_header ul {
    list-style: none;
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .topic_header li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    border-top:1px solid #e5e5e5;
	padding: 10px;
	background-color: #fff;
  }

  .markdown-text img {
    width: 92% 
  }
  .markdown-text p {
	padding: 2px 30px 5px;
	font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
    font-size:16px; 
	line-height:30px;
  }
</style>