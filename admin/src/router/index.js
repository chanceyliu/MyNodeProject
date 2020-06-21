import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/Category/CategoryEdit.vue'
import CategoryList from '../views/Category/CategoryList.vue'

import ItemEdit from '../views/Item/ItemEdit.vue'
import ItemList from '../views/Item/ItemList.vue'

import HeroEdit from '../views/Hero/HeroEdit.vue'
import HeroList from '../views/Hero/HeroList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/heroes/list', component: HeroList },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
