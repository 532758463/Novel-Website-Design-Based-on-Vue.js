import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import author from '@/pages/author'
import Fantasty from '@/pages/FantastyNovel'
import login from '@/pages/login'
import List from '@/components/novelItem'
import addNovel from '@/pages/addNovel'
import week from '@/components/Fantasty/week'
import read from '@/pages/readBooks'
import authorLog from '@/pages/authorLog'
import detail from'@/pages/detail'
import addChapter from '@/pages/addChapter'
import chapter from '@/pages/chapter'
import Mycollect from '@/pages/mycollect'
import Search from '@/pages/search'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Fantasty',
      name: 'Fantasty',
      component: Fantasty
    },
    {
      path: '/author',
      name: 'author',
      component: author
    },
    {
      path: '/addNovel',
      name: 'addNovel',
      component: addNovel
    },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/week',
      name: 'week',
      component: week
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/read',
      name: 'read',
      component: read
    },
    {
      path: '/authorLog',
      name: 'authorLog',
      component: authorLog
    },
    {
      path:'/detail',
      name:'detail',
      component:detail
    },
    {
      path:'/addChapter',
      name: addChapter,
      component:addChapter
    },
    {
      path:'/chapter',
      name:addChapter,
      component:chapter
    },
    {
      path:'/Mycollect',
      name:'Mycollect',
      component: Mycollect
    },
    {
      path:'/Search',
      name:'Search',
      component: Search
    }
  ]
})
