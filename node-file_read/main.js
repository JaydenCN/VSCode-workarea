//传统的异步请求 ，如果比较多的话就会进入---->> 回调地狱
// let p = axios.get("json.txt").then((res) => {
//   axios.get("hello.txt").then((res) => {});
// });
// console.log(p); // ajax axios 目前我了解的这两种请求返回的是一个promise对象
// 使用Promise来处理异步
//resolve ； 成功
// reject ： 失败
// let promise = new Promise((resolve, reject) => {
//   axios.get("hello.txt").then((res) => {
//     resolve(res);
//   });
// });
// 封装异步操作
function AxiosRequest(requestPath) {
  return new Promise((resolve, reject) => {
    axios
      .get(requestPath)
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// AxiosRequest("json.txt");
// async function RequsetAxios() {
//   const p1 = await AxiosRequest("json.txt");
//   const p2 = await AxiosRequest(p1.data);
//   const p3 = await AxiosRequest(p2.data);
// }

//RequsetAxios();

// Promise - 》 消除异步操作  用同步的书写方式，来书写异步代码
// let promise1 = new Promise((resolve, reject) => {
//   axios
//     .get("json.txt")
//     .then((res) => {
//       resolve(res);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });
// let promise2 = new Promise((resolve, reject) => {
//   axios
//     .get("hello3.txt")
//     .then((res) => {
//       resolve(res);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

//不使用封装的操作
// promise.all -> 所有的异步方法都要成功才可以
// Promise.all([promise1, promise2])
//   .then((res) => {
//     let [response1, response2] = res;
//     alert(response1.data);
//     alert(response2.data);
//   })
//   .catch((err) => {
//     console.log("出错了");
//   });
// 使用封装的操作
// Promise.all([AxiosRequest("json.txt"), AxiosRequest("hello.txt")])
//   .then((res) => {
//     let [response1, response2] = res;
//     alert(response1.data);
//     alert(response2.data);
//   })
//   .catch((err) => {
//     console.log("出错了");
//   });

//Promise.race : 谁快用谁,只要有一个成功就不会抛异常
Promise.race([AxiosRequest("json.txt"), AxiosRequest("hell.txt")])
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log("出错了");
  });
