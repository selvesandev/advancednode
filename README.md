# advancednode

## Node Threads
When you run program in a computer you start something called process withing which we can have multiple threads. Threads are the to do list of instructions that needs to be perfomed by CPU. 

<img width="494" alt="image" src="https://user-images.githubusercontent.com/21096850/174421282-fc3e2643-8d75-4a8f-834f-4fb88026bf17.png">


`Activity Monitor` check here to see the list of processes in CPU tab and click a process to see the list of threads being used.

Which thread to process when is determined by something called scheduling.

Threads are unit of instructions that are waiting to be executed by CPU. Desciding which order to execute this thread is called scheduling which is decided by your OS.

## Event Loop

![image](https://user-images.githubusercontent.com/21096850/133538057-99e5b8bd-9e80-4118-8768-19a92e3f6c97.png)

Inside a single thread there is something called event loop. Node js does three checks to decide whether to continue the event loop or not

1) Is there any function that is registered with `setTimeout`, `setInterval`, `setImmediate`
2) Is there any operating system task. E.g. server listening to http request in some port.
3) Any pending long running operations. E.g. fs module reading a file

## Single Threaded 

Node js is not fully single threaded. When we startup a program with a single instance of event loop is created and placed in one thread. But some of the function that are inside the node js are not single threaded. The event loop uses single threaded but not all the code in node js is single threaded.

```js


const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log(`1: ${Date.now() - start}`);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log(`2: ${Date.now() - start}`);
})

```
Both this would get executed in the same time because both of these are running at the same time in multithreads. The `pbkdf2` is the function that place takes in the `c++`, it uses thread pool to run compliated task.

https://betterprogramming.pub/is-node-js-really-single-threaded-7ea59bcc8d64

![image](https://user-images.githubusercontent.com/21096850/134775842-cbb3f439-8a05-4166-ba68-dca2261423f4.png)

