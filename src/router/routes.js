import App from '../App.vue'
import login from "../views/Login/Login.vue";

import test from "../views/publicmodel/test.vue";
import test1 from "../views/publicmodel/test1.vue";
import test2 from "../views/publicmodel/test2.vue";
import test3 from "../views/publicmodel/test3.vue";
import NotFound from "@/views/NotFound";
import UserInfo from "@/views/publicmodel/UserInfo";
import MDCourse from "@/views/publicmodel/MDCourse";


import ChangePassword from "@/views/publicmodel/ChangePassword";

import index from "@/views/index";
import EditUser from "@/views/Admin/EditUser.vue";
import EditCollege from "@/views/Admin/EditCollege.vue";
import EditMajor from "@/views/Admin/EditMajor.vue";
import MyTopic from "@/views/Student/MyTopic.vue";
import TopicT from "@/views/Teacher/TopicT.vue";
import Topic from "@/views/Admin/Topic.vue";


export default [
	{
		path: '/',
		component: App,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		},
		children: [
			{
				path: '',
				redirect: '/login',
				meta:{
					requireAuth: false,
					roles:['admin','student','teacher','user']
				}
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: login,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		}
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		}
	},
	{
		path: '/index',
		name: 'index',
		component: index,
		meta: {
			requireAuth: true,
			roles:['admin','student','teacher','user']

		},
		children: [
			{
				path: 'UserInfo',
				name: 'UserInfoForAdmin',
				component: UserInfo,
				meta:{
					requireAuth: true,
					roles:['admin','student','teacher','user']

				}
			},
			{
				path: 'changepassword',
				name:'ChangePasswordForAdmin',
				component: ChangePassword,
				meta: {
					requireAuth: true,
					roles:['admin','student','teacher','user']

				}
			},
			{
				path: 'MDCourse',
				name: 'MDCourseForAdmin',
				component: MDCourse,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'EditUser',
				name: 'EditUser',
				component: EditUser,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'EditCollege',
				name: 'EditCollege',
				component: EditCollege,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'EditMajor',
				name: 'EditMajor',
				component: EditMajor,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'MyTopic',
				name: 'MyTopic',
				component: MyTopic,
				meta:{
					requireAuth: true,
					roles:['student']
				}
			},
			{
				path: 'TopicT',
				name: 'TopicT',
				component: TopicT,
				meta:{
					requireAuth: true,
					roles:['teacher']
				}
			},
			{
				path: 'Topic',
				name: 'Topic',
				component: Topic,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'test',
				name: 'test',
				component: test,
				meta:{
					requireAuth: true,
					roles:['student','teacher','user']
				}
			},
			{
				path: 'test1',
				name: 'test1',
				component: test1,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'test2',
				name: 'test2',
				component: test2,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},

			{
				path: 'test3',
				name: 'test3',
				component: test3,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
		]
	},
	{
		path: '*',
		name: '*',
		component: login,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		}
	},
];

