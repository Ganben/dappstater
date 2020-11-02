const state = () => ({
    address: null,
    connect: false,
    opcount: 0
})

//getters

const getters = {
    isConnect: (state) => {
        return state.connect
    },
    getAddress: (state) => {
        return state.address
    },
    getCount: (state) => {
        return state.opcount
    }
}

//actions

const actions = {
    toConnected({commit}, gotAddress) {
        commit('setAddress', gotAddress)
    },
    incrementCount({commit}) {
        commit('increment')
    }
}

// mutations

const mutations = {
    setAddress: (state, {addr}) => {
        state.address = addr
        if (addr !== null) {
            state.connect = true
        }
    },
    increment: (state) => {
        state.opcount += 1
    }
}

//export
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}