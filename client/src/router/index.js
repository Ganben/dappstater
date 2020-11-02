import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/HomeView.vue'
import SubmitView from '../components/SubmitView.vue'
import BuyView from '../components/BuyView.vue'
import SellView from '../components/SellView.vue'
import QueryView from '../components/QueryView.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', component: HomeView},
        { path: '/submit', component: SubmitView},
        { path: '/buy', component: BuyView},
        { path: '/sell', component: SellView},
        { path: '/query/:q', component: QueryView, name: 'param'}
    ]
})

export default router