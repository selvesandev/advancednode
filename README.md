# advancednode

## Node Threads
When you run program in a computer you start something called process withing which we can have multiple threads. Threads are the to do list of instructions that needs to be perfomed by CPU. 

<img width="494" alt="image" src="https://user-images.githubusercontent.com/21096850/174421282-fc3e2643-8d75-4a8f-834f-4fb88026bf17.png">


`Activity Monitor` check here to see the list of processes in CPU tab and click a process to see the list of threads being used.

Which thread to process when is determined by something called scheduling.

Threads are unit of instructions that are waiting to be executed by CPU. Desciding which order to execute this thread is called scheduling which is decided by your OS.

Some threads like mouse movement, keyboard type etc does not have to wait for the scheduling.

<img width="1078" alt="image" src="https://user-images.githubusercontent.com/21096850/174421898-f43ec0ac-0145-4984-b416-e4750a54e56f.png">


1 core can process more that one threads at a time through a process called multithreading or hyperthreading and More Cores in the CPU is equals to more thread being processed at once.

<img width="1082" alt="image" src="https://user-images.githubusercontent.com/21096850/174421927-153ba0b9-5abc-4844-97b6-33eb8962264d.png">

In javascript world if we have two threads are processing 1 is reading file and other is multiplying two numbers. Since thread 1 is reading file it will take some time to do so. During this time the thread 1 has absolutely no work to do it's just sitting there for the read to complete. Your operating system's scheduler has the ability to detect this downtime so it's decides to pause the thread 1 and execute thread 2 and go back to thread 1 and continue waiting.

**NOTE** Threads are unique of instructions that are waiting to be executed by the CPU deciding which order to execute this thread in is refer to as scheduling which is operated by your operating system. Two ways we can improve the rate at which we execute the thread is either add more CPU core or to allow our OS scheduler to detech big pauses in processing time.

## Event Loop
Whenever a nodejs application is started in a computer node create 1 thread and executes all of our code inside of that 1 single thread.

![image](https://user-images.githubusercontent.com/21096850/133538057-99e5b8bd-9e80-4118-8768-19a92e3f6c97.png)

Inside of this single thread there is something called event loop. Every node program that we run has 1 event loop. The event loop is a control structure that decides what 1 thread should be doing at any given point of time. This event loop is the core of every node programming that is gets run. Node js does three checks to decide whether to continue the event loop or not as soon as we start the node js server.

1) Is there any function that is registered with `setTimeout`, `setInterval`, `setImmediate`
2) Is there any operating system task. E.g. server listening to http request in some port.
3) Any pending long running operations. E.g. fs module reading a file

Below is the things that gets checked in every single tick of a event loop 

1) Node looks at pending timers and sees if any functions are ready to be called.
2) Node looks at pending OS task (eg: reading file) and pending operations and calls relevant callback.
3) Pauses execution temporarily and continue it whenever some 
    - a new pending os task is done
    - a new pending operation 
    - a time is about to complete.
4) Pauses execution temporarily and continue it whenever some
5) looks at pending timer only the function that is registered with setImmediate.
6) Handle any 'close' events
    ```
        readStream.on('close',()=>{
            console.log('clean up code');
        })
    ```
   

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

