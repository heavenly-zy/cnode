import Vue from 'vue'
import Router from 'vue-router'
import Article from './components/Article'
import PostList from './components/PostList'
import UserInfo from './components/UserInfo'
import SlideBar from './components/SlideBar'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
	    {
			name: 'root',
			path: '/',
			components: {
				main: PostList
			}
		}, 
		{
			name: 'post_content',
			path: '/topic/:id&author=:name', // 接收PostList传过来的id和name
			components: {
				main: Article,
				SlideBar: SlideBar
			}
		},
		{
			name: 'user_info',
			path: '/userinfo/:name', // 接收Article传过来的name
			components: {
				main: UserInfo
			}
		}
	]
})
