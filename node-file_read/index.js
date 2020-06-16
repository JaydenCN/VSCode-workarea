//导入文件模块
var fs = require("fs");
//node,读写文件也有同步和异步的接口
// fs.open 异步
// fs.openSync 同步

//Buffer缓冲区 内存腾出来的位置
// var buffer = Buffer.alloc(20);

//同步读取方法 等待、阻塞
//高度封装的文件同步读取方法
// fs.readFileSync("路径", { flag: "操作方式（追加、写、读取）", encoding: "编码格式" });
// var content = fs.readFileSync(
//   "E:\\VSCode-workarea\\node-file_read\\hello.txt",
//   {
//     flag: "r",
//     encoding: "utf-8",
//   }
// );
// console.log(content);

//异步读取方法
// console.log("异步读取顶部：111");
// fs.readFile("E:\\VSCode-workarea\\node-file_read\\hello.txt", { flag: "r", encoding: "utf-8" }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
//   // 由于是异步，所以说这里的输出要比函数外面的代码执行的慢
//   console.log("异步读取内部：333");
// });
// console.log("异步读取下部：222");

// 对异步读取方法进行封装
function reFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { flag: "r", encoding: "utf-8" }, function (err, data) {
      // 读取结果会存到fs.readFile（）回调函数中的第二个参数，同时写给Promise的第一个回调函数的参数
      // 如果顺序错了的话就会在使用async异步方法是抛出异常 ： Unhandled promise rejection
      if (data != null) {
        resolve(data);
      } else {
        reject(err);
      }
      // 由于是异步，所以说这里的输出要比函数外面的代码执行的慢
    });
  });
}

var f = reFile("E:\\VSCode-workarea\\node-file_read\\hello.txt");
f.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

async function ReandList() {
  var ftp = await reFile("hello.txt");
  var f2 = await reFile(ftp + ".txt");
  var f3 = await reFile(f2 + ".txt");
  console.log(f3);
}
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection:", reason);
  // 在这里处理
});

ReandList();
