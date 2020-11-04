<template>
    <div class="flex flex-wrap">

        <div class="w-full">
            <button v-on:click="submitContract" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {{deployButtonText}}
            </button>
        </div>
        <div class="w-full bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                NFT Contract
                </h3>
                    <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                        Details and Raw Data
                    </p>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                    ABI
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {{contractABI}}
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                    Binary
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {{contractBinary}}
                </dd>
            </div>
            <div v-if="deployed" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                    Address
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {{contractAddress}}
                </dd>
            </div>
            
        </div>
        <div class="w-full">
            <button v-on:click="web3Submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {{deployButtonText2}}
            </button>
        </div>
        <div class="w-full">
            {{contractAddress2}}
        </div>
        
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Contract from 'web3-eth-contract'
// import Web3 from 'web3'

// 替换掉你编译的合约ABI和BIN
const mtAbi = [{ 'constant': false, 'inputs': [{ 'name': 'withdrawAmount', 'type': 'uint256' }], 'name': 'withdraw', 'outputs': [{ 'name': 'remainingBal', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'deposit', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': true, 'stateMutability': 'payable', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }]

const mtBinary = "0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000808190555061023b806100686000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632e1a7d4d1461005c5780638da5cb5b1461009d578063d0e30db0146100f4575b600080fd5b34801561006857600080fd5b5061008760048036038101908080359060200190929190505050610112565b6040518082815260200191505060405180910390f35b3480156100a957600080fd5b506100b26101d0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100fc6101f6565b6040518082815260200191505060405180910390f35b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561017057600080fd5b8160008082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501580156101c5573d6000803e3d6000fd5b506000549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60003460008082825401925050819055506000549050905600a165627a7a72305820f237db3ec816a52589d82512117bc85bc08d3537683ffeff9059108caf3e5d400029"
// 构建web3下的合约对象



export default {
    name: 'SubmitView',
    data () {
        return {
            deployButtonText: "Deploy",
            contractABI: mtAbi,
            contractBinary: mtBinary,
            deployed: false,
            contractAddress: "",
            deployButtonText2: "testThis",
            contractAddress2: "",
        }
    },
    computed: {
        ...mapGetters('account', {
            getAddress: 'getAddress'
        })
    },
    methods: {
        ...mapActions('submitview',{
            pushContractAddress: 'pushContractAddress'
        }),
        async submitContract() {
            this.deployButtonText = "submitting..."
            const address = this.getAddress
            const transactionParameters = {
                gasPrice: '0x0100000000',//customizable
                gas: '0x120000',
                from: address,
                value: '0x00',
                data: mtBinary
            }
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            })
            console.log(txHash)
            //
            const receiptResult = await window.ethereum.request({
                method: 'eth_getTransactionReceipt',
                params: [txHash],
            })
            console.log(receiptResult)
            if (receiptResult.contractAddress) {
                this.deployed = true
                this.contractAddress = receiptResult.contractAddress
            }
            //
            this.deployButtonText = "Deployed!!"
        },
        async web3Submit() {
            // test method 2
            const address = this.getAddress
            console.log(address)
            
            Contract.setProvider(window.ethereum)
            const myContract = new Contract(mtAbi)
            // myContract.setProvider(window.ethereum)
            const t11 = await myContract.deploy({
                data: mtBinary,
            }).send({
                from: address,
                data: mtBinary,
                gas: '4700000',
            })
            .on('error', function(error){
                // this.deployButtonText2 = "deploy error"
                throw error
            })
            .on('receipt', function(receipt){
                this.deployButtonText2 = receipt.contractAddress
                this.contractAddress = receipt.contractAddress
                console.log('receipt!!')
                console.log(receipt.contractAddress)
            })
            .on('transactionHash', function(transactionHash){
                this.deployButtonText2 = transactionHash
                console.log(transactionHash)
            })
            
            console.log(t11)
            if (t11._address) {
                this.deployButtonText2 = "deployed success"
                this.contractAddress2 = t11._address
                this.deployed = true
            }
        },
        created() {
            
        }
    }
}
</script>