# codeTest
针对问题的代码测试集合
## 正则校验出现true/false交替出现的情况
var imgurl = 'xxxxx.jpg'
var reg = /\.jpg/gim
console.log(reg.test(imgurl))
多次运行运行后发现console交替出现true和false，但直接/\.jpg/gim.test(imgurl)就不会
原因：修饰符g导致，使用一个正则实例，全局匹配，首次匹配成功后记录正则实例reg的lastIndex属性的值，表示上次匹配成功的位置，下次还用这个实例去匹配的时候会在上次结束的位置去匹配
https://blog.csdn.net/changhuzhao/article/details/64922582
