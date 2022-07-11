/*
 * @Author: Jimmy
 * @Date: 2022-07-07 11:05:13
 * @LastEditors: Jimmy
 * @LastEditTime: 2022-07-11 18:25:44
 * @FilePath: \Spider\检查哪些站可以爬取\test\magic扩展为多组.js
 */

// import inquirer from 'inquirer';

//引申多个
import { json } from "express"
import inquirer from "inquirer"

var GROUP_COUNT  //总共多少组
var GROUP_SUM  //一组多少个
var allPokers = []
var colors = ["♦", "♣", "♥", "♠"]
var choosePoker; //选定得那一张牌
var choosePokers = []  //选定得所有牌
var results = []

test()
    
async function test() {
    var nums = []

    for (let index = 0; index < 1000; index++) {
        nums.push(index)
    }

    allPokers = []

    for (let index = 0; index < colors.length; index++) {
        const color = colors[index];
        for (let index = 0; index < nums.length; index++) {
            const num = nums[index];
            allPokers.push(color + num)
        }
    }

    
    for (let index = 1; index < 200 ; index++) {
        GROUP_COUNT = Math.floor(Math.random()*10) 
        GROUP_SUM = Math.floor(Math.random()*100) 
        
        if( GROUP_COUNT <= 1 ||GROUP_COUNT%2==0||GROUP_SUM%2==0|| GROUP_SUM*GROUP_COUNT > 4000 ){
            //GROUP_COUNT GROUP_SUM 必须为奇数  而且求和不能大于扑克总数 GROUP_COUNT要>1
            continue
        }
        await ideal()
    }

        

    console.log(JSON.stringify(results));
}

async function ideal() {
    
    //洗牌
    shuffle(allPokers)

    choosePokers = allPokers.slice(0, GROUP_COUNT * GROUP_SUM)
    
    choosePoker = choosePokers[Math.floor(Math.random() * choosePokers.length)]

    var handlerCount = 0; //统计步骤四五六执行的次数

    while (Math.pow(GROUP_COUNT, handlerCount) < GROUP_SUM) {
        choosePokers = await fenzu(choosePokers)
        handlerCount++;
    }

    //需要多执行一次
    choosePokers = await fenzu(choosePokers)
  


    await new Promise(res => {
        setTimeout(res, 10)
    })

    console.log("choosePoker:"+choosePoker);

    const result = choosePokers[((GROUP_COUNT * GROUP_SUM - 1) / 2)] == choosePoker
    console.log(`当前分${GROUP_COUNT}组 ,每组分${GROUP_SUM}个 ,执行结果为${result}`);

    // console.log("魔术结果,你选中得牌是:" + choosePokers[(GROUP_COUNT * GROUP_SUM - 1) / 2]);
    // console.log(choosePokers[(GROUP_COUNT * GROUP_SUM - 1) / 2] == choosePoker);

    results.push(choosePokers[(GROUP_COUNT * GROUP_SUM - 1) / 2] == choosePoker)
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

    //选定某一组放中间进行重排
    async function fenzu(choosePokers) {
        var pokersGroups = []
        //分组
        for (let indexI = 0; indexI < GROUP_COUNT; indexI++) {
            var list = choosePokers.filter((ele, indexJ) => indexJ % GROUP_COUNT == indexI)
            pokersGroups.push(list)
        }
        const groupIndex = (pokersGroups.findIndex(list => {
            return list.find(ele => ele == choosePoker)
        }))

        pokersGroups.splice((pokersGroups.length - 1) / 2, 0, pokersGroups.splice(groupIndex, 1)[0]);
        choosePokers = []


        for (let index = 0; index < pokersGroups.length; index++) {
            choosePokers.push(...pokersGroups[index])
        }

        return choosePokers
    }

}

