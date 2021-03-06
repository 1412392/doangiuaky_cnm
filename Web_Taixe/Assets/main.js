﻿import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

import Login from './components/Login.vue';
import Index from './components/Index.vue';
import VueFire from 'vuefire';

var routes = [
  { path: '/login', component: Login },
  {
      path: '/',
      component: Index,
      beforeEnter: (to, from, next) => {
          if (localStorage.access_token && localStorage.access_token === 'appdriver') {
              next();
          } else {
              next('login');
          }
      }
  },
];


Vue.use(VueRouter);
Vue.use(VueFire);

var router = new VueRouter({
    routes
});


//http://localhost:51074/Home/Index?#/
new Vue({
    el: '#app',
    router, //router: router,
    render: h => h(App)
});

//router.beforeEach((to, from, next) => {
//    if (to.matched.some(record => record.meta.requiresAuth)) {
//        if (localStorage.access_token && localStorage.access_token === '1234567890') {
//            next();
//        } else {
//            next('login');
//        }
//    } else {
//        next();
//    }
//});