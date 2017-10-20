import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/home'
import carbon_detail from '@/pages/carbon_detail'
import Date from '@/components/Date'
import add_cards from '@/pages/add_cards'
import add_jmk from '@/pages/add_jmk'
import add_fjmk from '@/pages/add_fjmk'
import add_cards_ls from '@/pages/add_cards_ls'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/carbon_detail',
      name: 'carbon_detail',
      component: carbon_detail,
      children: [
      	{
      		path: 'Date',
      		name: 'Date',
      		component: Date
      	}
      ]
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/add_cards',
      name: 'add_cards',
      component: add_cards,
      children: [
      	{
      		path: 'add_jmk',
      		name: 'add_jmk1',
      		component: add_jmk
      	},
      	{
      		path: 'add_fjmk',
      		name: 'add_fjmk1',
      		component: add_fjmk
      	}
      ]
    },
    {
      path: '/add_cards_ls',
      name: 'add_cards_ls',
      component: add_cards_ls,
      children: [
      	{
      		path: 'add_jmk',
      		name: 'add_jmk2',
      		component: add_jmk
      	},
      	{
      		path: 'add_fjmk',
      		name: 'add_fjmk2',
      		component: add_fjmk
      	}
      ]
    },
  ]
})
