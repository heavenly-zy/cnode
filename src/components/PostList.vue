<template>
  <div class="PostList">
    <!-- 在数据未返回的时候，显示这个正在加载的loading动画 -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.svg" alt="loading" />
    </div>
    <!-- 下面是主题帖子列表 -->
    <div class="posts" v-else>
      <ul>
        <li>
          <div class="topbar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="post in posts">
          <!--这里为啥有错??? -->
          <!-- 头像 -->
          <img :src="post.author.avatar_url" alt="头像" />
          <!-- img 里面为什么要用v-bind??? -->
          <!-- 回复/浏览 -->
          <span class="allcount">
            <span class="reply_count">{{post.reply_count}}</span>
            /{{post.visit_count}}
          </span>
          <!-- 帖子的分类 -->
          <span
            :class="[{put_good:(post.good === true),
            put_top:(post.top===true),
            'topiclist-tab':(post.good !== true && post.top !== true)}]"
          >
            <span class="postTitle">{{post | tabFormat}}</span>
          </span>
          <!-- 标题 -->
          <router-link :to="{
              name:'post_content', 
              params:{
                  id:post.id,  // 点击PostList时就把id传给Article
				  name:post.author.loginname // 点击PostList时就把name传递给SlideBar
              }
          }">
          <span>{{post.title}}</span>
          </router-link>
          <!-- 最后回复时间 -->
          <span class="last_reply">{{post.last_reply_at | formatDate}}</span>
        </li>
		<li>
		   <!--分页按钮-->
		  <Pagination @handleList="renderList"></Pagination>
		</li>
      </ul>
    </div>
  </div>
</template>


<script>
import Pagination from './Pagination'

export default {
  name: "PostList",
  components:{
    Pagination
  },
  data() {
    return {
      isLoading: false, // 默认不显示loading动画
      posts: [], // 代表当前页面的所有内容列表数组
	  postPage:1
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
			params:{ // 注意get请求一定要加params
				page: this.postPage,
                limit: 20
			}
        })
        .then(response => {
          this.isLoading = false; // 加载成功之后去除 loading 动画
          console.log(response);
          this.posts = response.data.data;
        })
        .catch(error => {
          // 处理请求失败
          console.log(error);
        })
    },
	renderList(value){
		this.postPage = value
		this.getData()
	}
  },
  beforeMount() {
    this.isLoading = true; // 在页面加载成功之前显示 lodaing 动画
    this.getData(); // 在页面加载之前获取数据
  }
};
</script>


<style scoped>
.PostList {
  background-color: #e1e1e1;
}
.posts {
  margin-top: 10px;
}
.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
.loading > img {
  width: 80px;
  height: 80px;
}
ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}
ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}
li:not(:first-child):hover {
  background: #f5f5f5;
}
li:last-child:hover {
  background: white;
}
li span {
  line-height: 30px;
}
.allcount {
  min-width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  color: #b4b4b4;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}
.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}
.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}
.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}
.topbar {
  height: 40px;
  background-color: #f5f5f5;
}
.topbar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}
.topbar span:hover {
  color: #9e78c0;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline;
}
.loading {
  text-align: center;
  padding-top: 300px;
}
</style>