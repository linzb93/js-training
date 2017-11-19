const PENDING = 'PENDING' // Promise 的 初始状态
const FULFILLED = 'FULFILLED' // Promise 成功返回后的状态
const REJECTED = 'REJECTED' // Promise 失败后的状态

const statusProvider = (promise, status) => data => {
    if (promise.status !== PENDING) return false
    promise.status = status
    promise.result = data
    switch(status) {
case FULFILLED: return promise.successListener.forEach(fn => fn(data))
case REJECTED: return promise.failurelistener.forEach(fn => fn(data))
}
}
class P {
    constructor(executor) {
        this.status = PENDING // 创建一个promise时，首先进行状态初始化。pending
        this.successListener = []
        this.failureListener = []
        this.result = undefined // result属性用来缓存promise的返回结果，可以是成功的返回结果，或失败的返回结果
        executor(statusProvider(this, FULFILLED), statusProvider(this, REJECTED))
    }
    /**
    * Promise原型上面的方法
    */
    then(...args) {
        switch (this.status) {
            case PENDING: {
                this.successListener.push(args[0])
                this.failureListener.push(args[1])
                break
            }
            case FULFILLED: {
                args[0](this.result)
                break
            }
            case REJECTED: {
                args[1](this.result)
            }
        }
    }
    catch(arg) {
        return this.then(undefined, arg)
    }
}

new P((resolve, reject) => {setTimeout(() => resolve(5), 2000)}).then(data => console.log(data)) // 5
/*创建一个及时resolve的promise*/