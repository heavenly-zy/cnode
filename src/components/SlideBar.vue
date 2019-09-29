<template>
  <div class="authorinfo">
    <div class="authorsummary">
      <div class="topbar">作者</div>
      <router-link
        :to="{
			   name:'user_info',
			   params:{
				   name:userinfos.loginname 
			   }
		   }"
      >
        <img :src="userinfos.avatar_url" alt="头像" />
      </router-link>
    </div>
    <div class="recent_topics">
      <div class="topbar">作者其它话题</div>
      <ul>
        <li v-for="userinfo in topiclimited">
          <!--这里使用了计算属性-->
          <router-link
            :to="{
					name:'post_content',
					params:{
						id:userinfo.id
					}
				}"
          >{{userinfo.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">无人回复的话题</div>
      <ul>
        <li v-for="userinfo in replylimited">
          <!--这里使用了计算属性-->
          <router-link
            :to="{
					name:'post_content',
					params:{
						id:userinfo.id
					}
				}"
          >{{userinfo.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideBar",
  data() {
    return {
      userinfos: [] // 代表当前页面的所有内容
    };
  },
  methods: {
    getUserInfoData() {
      // 这里的name为name:post.author.loginname
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`) // SlideBar和UserInfo的请求相同
        .then(response => {
          console.log(response);
          this.userinfos = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    topiclimited() {
      if (this.userinfos.recent_topics) {
        return this.userinfos.recent_topics.slice(0, 5); // 只截取前5条topic
      }
    },
    replylimited() {
      if (this.userinfos.recent_replies) {
        return this.userinfos.recent_replies.slice(0, 5); // 只截取前5条topic
      }
    }
  },
  beforeMount() {
    this.getUserInfoData(); // 在页面加载之前获取数据
  }
};
</script>


<style scoped>
.authorsummary,
.recent_replies,
.recent_topics {
  background-color: #fff;
}
.authorinfo {
  width: 328px;
  float: right;
  margin-top: 0;
}
li {
  padding: 3px 0;
}
.recent_replies ul,
.recent_topics ul {
  list-style: none;
  padding-left: 14px;
}
.recent_topics ul > li,
.recent_replies ul > li {
  padding: 5px 0;
}
.recent_topics,
.recent_replies {
  margin-top: 15px;
}
ul a {
  font-size: 12px;
  text-decoration: none;
  color: #778087;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  font-size: 12px;
}

img {
  height: 48px;
  width: 48px;
  border-radius: 3px;
  margin: 10px;
}

.loginname {
  width: 100px;
  float: right;
  margin-top: 22px;
  margin-right: 159px;
  font-size: 14px;
}

.loginname a {
  text-decoration: none;
  color: #778087;
}

.authorsummay .topbar {
  margin-top: 0px;
}
</style>
