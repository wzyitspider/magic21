/*
 * @Author: Jimmy
 * @Date: 2022-07-07 11:05:13
 * @LastEditors: Jimmy
 * @LastEditTime: 2022-07-11 11:36:26
 * @FilePath: \Spider\检查哪些站可以爬取\test\magic21.js
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

await fenzu(list21) 
await fenzu(list21) 
await fenzu(list21) 

await new Promise(res=>{
    setTimeout(res,2000)
})

console.log("你选中得牌是:" + list21[10]);


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

    console.log("第一组" + list7_1);
    console.log("第二组" + list7_2);
    console.log("第三组" + list7_3);

    var questions = [
        {
            type: 'input',
            name: 'ChooseCard',
            message: `选定一张牌,如果在第1组,请输入1","如果在第2组,请输入2","如果在第3组,请输入3\n`
        }
    ]

    const answers = await inquirer.prompt(questions)

    const group = answers['ChooseCard']

    console.log(`选定第${group}组`);
    
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