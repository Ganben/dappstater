<template>
  <div id="app" class="container mx-auto">
<div class="flex flex-col bg-transparent">
  <div class="text-black-700 text-center bg-blue-500 bg-opacity-25 px-4 py-2 m-2">
    <Account />

  </div>
  <div class="text-gray-700 text-center bg-blue-500 bg-opacity-25 px-4 py-2 m-2">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

  </div>
  <router-view />
    
</div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Account from './components/Account.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Account
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
