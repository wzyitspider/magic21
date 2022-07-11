/*
 * @Author: Jimmy
 * @Date: 2022-07-07 11:05:13
 * @LastEditors: Jimmy
 * @LastEditTime: 2022-07-11 14:07:46
 * @FilePath: \Spider\检查哪些站可以爬取\test\magic21自动测试.js
 */

// import inquirer from 'inquirer';



import inquirer from "inquirer"

const pokers = ["JOKER", "BLACK"]
const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const colors = ["♦", "♣", "♥", "♠"]
var list21 = []


for (let index = 0; index < colors.length; index++) {
    const color = colors[index];
    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        pokers.push(color + num)
    }
}

//洗牌
shuffle(pokers)

// for (let index = 0; index < 21; index++) {
//     list21.push(pokers.splice[Math.floor(Math.random() * pokers.length)])
// }


list21 = pokers.slice(0,21)

//在洗牌并选定21张后,我们让程序随机帮我挑选一张牌
var  choosePoker = list21[Math.floor(Math.random()*list21.length) ]

await fenzu(list21) 
await fenzu(list21) 
await fenzu(list21) 

await new Promise(res=>{
    setTimeout(res,2000)
})

console.log("系统选中的牌所在的位置:"+ list21.findIndex(ele=>ele==choosePoker) );


//每次随机取一张跟最后一张交换
function shuffle(pokers) {
    var count = pokers.length; //扑克未交换的牌数

    while (count > 0) {
        const index = Math.floor(Math.random() * count);
        var tmp = pokers[pokers.length - 1];
        pokers[pokers.length - 1] = pokers[index];
        pokers[index] = tmp
        count--
    }

}

//不断抽牌放到一边 产生了新数组
function shuffle2(pokers) {
    var res = []
    while (pokers.length > 0) {
        res.push(pokers.splice(Math.floor(Math.random() * pokers.length), 1)[0])
    }
    return res
}



//选取21张
async function fenzu(list) {

    var list7_1 = list.filter((ele,index)=>index%3==0)
    var list7_2 = list.filter((ele,index)=>index%3==1)
    var list7_3 = list.filter((ele,index)=>index%3==2)

    const all7List = []
       
    all7List.push(list7_1 )
    all7List.push(list7_2)
    all7List.push(list7_3)
    
    const group = (all7List.findIndex(list=>{
        return list.find(ele=>ele==choosePoker)
    })) + 1 

    console.log(`系统选定第${group}组`);

    list21 = []

    if (group == 1) {
        list21.push(...list7_2)
        list21.push(...list7_1)
        list21.push(...list7_3)
    } else if (group == 2) {
        list21.push(...list7_1)
        list21.push(...list7_2)
        list21.push(...list7_3)
    } else if (group == 3) {
        list21.push(...list7_2)
        list21.push(...list7_3)
        list21.push(...list7_1)
    }

}