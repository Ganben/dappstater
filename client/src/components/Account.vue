<template>
    <ul class="flex">
         <li v-if="requiredConnect" class="mr-6">
    <button v-on:click="connectMetamask" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Connect
</button>
  </li>
      <li  v-if="requiredConnect"  class="mr-6">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
  Account
</button>
  </li>
  <li v-if="isConnect" class="mr-6">
<router-link to="/query">{{address}} </router-link>
  </li>
    <li v-if="isConnect" class="mr-6">
   <router-link to="/submit">Submit</router-link>
  </li>
    <li v-if="isConnect" class="mr-6">
  <router-link to="/buy">Buy</router-link>
  </li>
    <li v-if="isConnect" class="mr-6">
  <router-link to="/sell">Sell</router-link>
  </li>
    </ul>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

const { ethereum } = window;

export default {
    name: 'Account',
    props: {

    },
    computed: {
        ...mapGetters('account', {
            isConnect: 'isConnect',
            getAddress: 'getAddress'
        }),
        address: {
            get () {
                return this.getAddress
            },
            set (val) {
                this.toConnected({addr: val})
            }
        },
    requiredConnect: {
      get () {
        return !this.isConnect
      },
      set (val) {
        console.log(val)
        this.incrementCount
      }
    }
        
    },
    methods: {
            ...mapActions('account', {
      toConnected: 'toConnected',
      incrementCount: 'incrementCount'
    }),
    async connectMetamask() {
        try {
            const newAccount = await ethereum.request({method: 'eth_requestAccounts'});
            this.toConnected({addr: newAccount[0]});
        } catch (error) {
            console.error(error);
        }
    },
    created() {

    }
    }
}
</script>