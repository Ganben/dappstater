<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
 
    <div v-if="isConnect" class="mb-4">
    <p> You have connected to:  </p>
    <button class="mx-2 px-4 py-2 text-sm rounded text-white bg-blue-500 focus:outline-none hover:bg-blue-400">{{address}}</button>
  </div>
  


  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
    created() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
