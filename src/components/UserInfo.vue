<template>
  <div id="UserInfo">
  <!-- 在数据未返回的时候，显示这个正在加载的loading动画 -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.svg" alt="loading" />
    </div>
    <div class="userInfomation" v-else>
	    <section>
           <img :src="userinfos.avatar_url" >
           <span>{{userinfos.loginname}}</span>
           <p>{{userinfos.score}}积分</p>
           <p>注册时间：{{userinfos.create_at | formatDate}}</p>
        </section>
		<div class="replies">
		   <p>最近创建的话题</p>
		   <ul>
		      <li v-for="userinfo in userinfos.recent_topics"> <!--注意这里是userinfos.recent_topics-->
			    <router-link :to="{
					name:'post_content',
					params:{
						id:userinfo.id
					}
				}">
			        {{userinfo.title}}
				</router-link>
			  </li>
		   </ul>
		</div>
		<div class="topics">
		   <p>最近参与的话题</p>
		   <ul>
		      <li v-for="userinfo in userinfos.recent_replies"> <!--注意这里是userinfos.recent_replies-->
			    <router-link :to="{
					name:'post_content',
					params:{
						id:userinfo.id
					}
				}">
			        {{userinfo.title}}
				</router-link>
			  </li>
		   </ul>
		</div>
    </div>
  </div>
</template>

<script> 

export default {
  name:"UserInfo",
  data() {
    return {
      isLoading: false, // 默认不显示loading动画
      userinfos: [] // 代表当前页面的所有内容
    }
  },
  methods:{
	  getUserInfoData(){// 这里的name为name:reply.author.loginname
		    this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)// ES6 语法，字符串拼接
			.then((response)=>{
				this.isLoading = false
				console.log(response)
				this.userinfos = response.data.data;
			})
			.catch((error)=>{
				console.log(error)
			})
	  }
  },
  beforeMount() {
    this.isLoading = true; // 在页面加载成功之前显示 lodaing 动画
    this.getUserInfoData(); // 在页面加载之前获取数据
  }
}

</script>

<style scoped>
.userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }
  .userInfomation li {
    list-style:none;
  }
  .userInfomation .replies,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }
</style>
