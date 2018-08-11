import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'

import Web3 from 'web3'
// import SimpleStore from './contracts/SimpleStore.json'
import DappGameCom from './contracts/DappGameCom.json'

export default class Contract {
  async loadContract(key) {
    this.onEvent = null
    this._createClient(key)
    this._createCurrentUserAddress()
    this._createWebInstance()
    await this._createContractInstance()
  }

  _createClient(key) {
    // this.privateKey = CryptoUtils.generatePrivateKey()
    this.privateKey = key
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey)
    this.client = new Client(
      'default',
      'ws://127.0.0.1:46657/websocket',
      'ws://127.0.0.1:9999/queryws',
    )

    this.client.on('error', msg => {
      console.error('Error on connect to client', msg)
      console.warn('Please verify if loom command is running')
    })
  }

  _createCurrentUserAddress() {
    this.currentUserAddress = LocalAddress.fromPublicKey(this.publicKey).toString()
  }

  _createWebInstance() {
    this.web3 = new Web3(new LoomProvider(this.client, this.privateKey))
  }

  async _createContractInstance() {
    const networkId = await this._getCurrentNetwork()
    this.currentNetwork = DappGameCom.networks[networkId]
    if (!this.currentNetwork) {
      throw Error('Contract not deployed on DAppChain')
    }

    const ABI = DappGameCom.abi
    this._contract = new this.web3.eth.Contract(ABI, this.currentNetwork.address, {
      from: this.currentUserAddress
    })

  }

  addEventListener(fn) {
    this.onEvent = fn
  }

  async _getCurrentNetwork() {
    return await this.web3.eth.net.getId()
  }

  // async setValue(value) {
  //   return await this._contract.methods.set(value).send({
  //     from: this.currentUserAddress
  //   })
  // }
  //
  // async getValue() {
  //   return await this._contract.methods.get().call({
  //     from: this.currentUserAddress
  //   })
  // }


  //DappGameCom func

  getUser() {
    return this.currentUserAddress
  }

  /**
   * contentType video|image
   */
  async newPost(text, gameId, contentHash, contentType) {
    console.log(text, gameId, contentHash, contentType)
    return await this._contract.methods.newPost(text, gameId, contentHash, contentType).send()
  }

  async newComment(postId, text) {
    return await this._contract.methods.newComment(postId, text).send()
  }

  async hasPosts() {
    return await this._contract.methods.hasPosts().call()
  }

  async getPosts(id) {
    return await this._contract.methods.posts(id).call()
  }

  async getGames(index) {
    return await this._contract.methods.games().call()
  }

  async getPostsFromGame(gameId){
    return await this._contract.methods.getPostsFromGame(gameId).call()
  }

  async likeToPost(postId) {
    return await this._contract.methods.likeToPost(postId).send()
  }

  async getToken(){
    console.log(this._contract.methods)
    return await this._contract.methods.MyToken().send()
  }
}
