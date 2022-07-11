/*
 * @Author: Jimmy
 * @Date: 2022-07-07 11:05:13
 * @LastEditors: Jimmy
 * @LastEditTime: 2022-07-11 17:27:04
 * @FilePath: \Spider\检查哪些站可以爬取\test\magic扩展为多张.js
 */

// import inquirer from 'inquirer';



import inquirer from "inquirer"

const pokers = ["JOKER", "BLACK"]
const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const colors = ["♦", "♣", "♥", "♠"]

var choosePokersCount = 33;
var choosePokersGroup = 3;
var choosePokers = []
var choosePoker
var results = []

for (let index = 0; index < colors.length; index++) {
    const color = colors[index];
    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        pokers.push(color + num)
    }
}


for (let index = 0; index < 10; index++) {

    choosePokersCount = 9 + 6 * index

    if(choosePokersCount>54){
        break;
    }
    await test()
}




async function test() {
    
    //洗牌
    shuffle(pokers)

    
    choosePokers = pokers.slice(0, choosePokersCount)

    //在洗牌并选定choosePokersCount张后,我们让程序随机帮我挑选一张牌
    choosePoker = choosePokers[Math.floor(Math.random() * choosePokers.length)]

    console.log("choosePoker:" + choosePoker);

    group(choosePokers)
    group(choosePokers)
    group(choosePokers)
    group(choosePokers)

    await new Promise(res => {
        setTimeout(res, 200)
    })

    const result = choosePokers[((choosePokersCount - 1) / 2)] == choosePoker

    
    results.push(result)
    console.log(`当前选取${choosePokersCount}张,执行结果为${result}` );

}



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
function group(list) {

    var list_group_1 = list.filter((ele, index) => index % 3 == 0)
    var list_group_2 = list.filter((ele, index) => index % 3 == 1)
    var list_group_3 = list.filter((ele, index) => index % 3 == 2)

    const groupList = []

    groupList.push(list_group_1)
    groupList.push(list_group_2)
    groupList.push(list_group_3)

   // console.log("JSON.stringify(groupList):" + JSON.stringify(groupList));

    const group = (groupList.findIndex(list => {
        return list.find(ele => ele == choosePoker)
    })) + 1



    choosePokers = []

    if (group == 1) {
        choosePokers.push(...list_group_2)
        choosePokers.push(...list_group_1)
        choosePokers.push(...list_group_3)
    } else if (group == 2) {
        choosePokers.push(...list_group_1)
        choosePokers.push(...list_group_2)
        choosePokers.push(...list_group_3)
    } else if (group == 3) {
        choosePokers.push(...list_group_2)
        choosePokers.push(...list_group_3)
        choosePokers.push(...list_group_1)
    }



}


