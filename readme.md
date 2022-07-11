## 代码模拟扑克读心术（21张牌魔术）, 关于魔术得数学原理与证明
　
 有这样一个魔术，我相信大家多少都自己玩过或者见别人玩过
 

魔术流程：

 1. 随便找出21张纸牌。
  2. 让观众随便找出一张，并让其他观众看到。（魔术师自己是不看，经过下面的过程我们就会知道那是张什么牌了）
  3. 把21张牌分成3堆，每堆7张。（让牌背对自己，左到右排三张，从上到下依次按顺序排成三叠）
  4. 从第一堆牌开始询问观众他所选的牌有没有在里面
  5. 将有的那一堆放在没有的两堆中间，然后又开始分三堆，询问观众。（如此循环一共三次）这样之后观众的牌就在整叠牌中的第十一张（已经知道答案是第11张了）
    6. 展露观众所选的牌了，向观众说：在玩21张牌是，第一张牌是有邪气的，我们一般都不用。将第一张牌放一边。（这里的台词可以自己发挥）
    7. 这样整叠牌还剩20张，将所有牌交给观众。告诉观众自己就会把牌找出来。让观众随便说一个10到20中间的任何一个数。比方观众说17
    8. 那就让观众将牌一张一张，往桌上发共发17张。让观众把手上剩下的牌放一边
    9. 再让观众拿起桌上的牌（刚发的那叠牌），问1+7等于多少。自然是8，那好就再往桌上发8张牌
    10. 最后做一个魔术动作，揭开第一张牌就是观众所选的牌了

### 有一天作者心血来潮，想写代码来证明下模拟下该魔术

#### 接下来是模拟得全部过程

##### 步骤一
 初始化54张扑克
 

```

const pokers = ["JOKER", "BLACK"]
const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const colors = ["♦", "♣", "♥", "♠"]

for (let index = 0; index < colors.length; index++) {
    const color = colors[index];
    for (let index = 0; index < nums.length; index++) {
        const num = nums[index];
        pokers.push(color + num)
    }
}
```

##### 步骤二
 进行洗牌

  1. 洗牌方案1
   
```
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
```
  2. 洗牌方案2
  
```
//不断抽牌放到一边 产生了新数组
function shuffle2(pokers) {
    var res = []
    while (pokers.length > 0) {
        res.push(pokers.splice(Math.floor(Math.random() * pokers.length), 1)[0])
    }
    return res
}
```

两种洗牌方案得区别：方案一不产生新的数组，不断得随机抽取没有洗过得牌放到牌堆得最后一张.方案二是不断随机抽取牌放到一旁，直到所有牌都抽取完毕。在这里，方案一没有产生新得数组，方案二产生了新的数组
 
##### 步骤三
 挑取其中21张（这里其实可以忽略第二部，直接第三步，但是为了模拟更真实的情况，我们还是进行了洗牌操作）
 
```
 for (let index = 0; index < 21; index++) {
     list21.push(pokers.splice[Math.floor(Math.random() * pokers.length)])
}
```

##### 步骤四
21 张牌进行分组，一张张发牌，从左到右分成三堆

```
    var list7_1 = list21.filter((ele,index)=>index%3==0)
    var list7_2 = list21.filter((ele,index)=>index%3==1)
    var list7_3 = list21.filter((ele,index)=>index%3==2)
```

##### 步骤五
模拟观众选牌，并告诉魔术师在哪一堆
```
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
```

##### 步骤六
三堆牌叠在一起，把观众选定的那一组放在牌中间

```
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
```
##### 步骤七
重复两次步骤四五六，这样牌一定会在21张的最中间

```
await new Promise(res=>{
    setTimeout(res,2000)
})

console.log("经过预测，你选中得牌是:" + list21[10]);
```


### 思考与扩展一
我们多次用上述程序模拟，结果是对的，但是人工选牌并输入始终次数有限。我们希望看到成千上万次的结果，所以我们把程序修改为程序自己选牌并且输出结果


```
//在洗牌并选定21张后,我们让程序随机帮我挑选一张牌
  var  choosePoker = list21[Math.floor(Math.random()*list21.length) ]
```


修改步骤五为

```
    var list7_1 = list21.filter((ele,index)=>index%3==0)
    var list7_2 = list21.filter((ele,index)=>index%3==1)
    var list7_3 = list21.filter((ele,index)=>index%3==2)

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

```

重复三次步骤四五六，打印系统选中的牌位置

```
    console.log("系统选中的牌所在的位置:"+ list21.findIndex(ele=>ele==choosePoker) );
```

执行1000次，上面结果都是返回10


### 思考与扩展二

#### 关于这块的数学原理

在这里，笔者菜鸡的用两张数学稿纸来绘个图

 <img src="https://img-blog.csdnimg.cn/ecd0314d81384f92ab5e8341411d8b70.png" width="45%"  alt="还在路上，稍等..."/> 
 <img src="https://img-blog.csdnimg.cn/3c9f917df67d4b6f9f68097bb4a82334.png" width="40%" alt="还在路上，稍等..."/> 

我们发现其实原理就是不断的指定一组将其放在牌堆中间，继续重排后这一组牌会均匀分布在每一组的中间，比如说我们27张牌，经过用户一次指定就固定在了9张牌内，重排后再分组，用户继续选定就能固定在3张内,在继续重排分组，就能筛出用户选的那一张。

## **笔者发现**

**如果分了N组，我们每次分组都能确定出其中的 1/N
总共N组 ，每组M张牌 ， 总共扑克数目 COUNT = N*M
总共经过  log(N)M 向上取整+1 次数分组，就可以确定观众选取的牌**

我们来简单验证上述公式正确性，假设总共9张 ，我们取下边界值，有如下几个情况

 1.  3组 每组3个   log(3)3  = 1 => N = 1+1 = 2    <font color="red">（正解）</font>
 2.  9组 每组1个   log(9)1 = 0  => N = 0+1 = 1    <font color="red">（正解）</font>
 3.  1组 每个9个  log(1)9  无解 => N = 无解        <font color="red">（正解）</font>

**疑问：这里如果是分成两组，是不是有点类似于咱们代码中的二分查找。至少，笔者愿意把这个当成N分查找的变体**


### 思考与扩展三
根据上述公式，我们来扩展一个维度，看看超过21张或者无限多张的情况是怎么样的呢？

话不多说，用代码进行验证

选出牌的个数不一定是21,我们把其提取为一个变量
```
var choosePokersCount ;
```

修改步骤三
 挑取其中21张改为挑取choosePokersCount 张
 
```
 for (let index = 0; index < choosePokersCount ; index++) {
     choosePokers.push(pokers.splice[Math.floor(Math.random() * pokers.length)])
}
```

结果打印改为

```
   const result = choosePokers[((choosePokersCount - 1) / 2)] == choosePoker
   console.log(`当前选取${choosePokersCount}张,执行结果为${result}` );
```

我们做下多值测试
```
for (let index = 0; index < 10; index++) {
    choosePokersCount = 9 + 6 * index

    if(choosePokersCount>54){
        break;
    }
    await test()
}
```

打印结果如下

```
choosePoker:♦5
当前选取9张,执行结果为true
choosePoker:♣J
当前选取15张,执行结果为true
choosePoker:♠A
当前选取21张,执行结果为true
choosePoker:♣4
当前选取27张,执行结果为true
choosePoker:♣6
当前选取33张,执行结果为true
choosePoker:♠A
当前选取39张,执行结果为true
choosePoker:♦5
当前选取45张,执行结果为false
choosePoker:♥Q
当前选取51张,执行结果为false
```


我们发现打印结果后面不准确，仔细思考，通过公式（**总共经过  log(N)M 向上取整+1 次数分组，就可以确定观众选取的牌**）发现超过27张扑克需要进行至少四次分组才能确定，我们多进行一次分组，所以我们把重复3次步骤四五六改成4次，再观察结果

```
choosePoker:♦8
当前选取9张,执行结果为true
choosePoker:♣7
当前选取15张,执行结果为true
choosePoker:♦7
当前选取21张,执行结果为true
choosePoker:♥3
当前选取27张,执行结果为true
choosePoker:♥K
当前选取33张,执行结果为true
choosePoker:♣J
当前选取39张,执行结果为true
choosePoker:♥J
当前选取45张,执行结果为true
choosePoker:♣2
当前选取51张,执行结果为true
```
果然，发现结果是符合预期的

### 思考与扩展四

问题: 既然分成3组可以经过几次可以选出观众的牌，那么我们再扩展一个维度，超过3组或者无限多组的情况是怎么样的呢？

我们继续修改代码

这次，挑出的牌不一定是3组，每组也不一定7张，我们把其定义为两个变量

```
var GROUP_COUNT  //总共多少组
var GROUP_SUM  //一组多少张牌
```

传统扑克54张，已经不够用了，我们定义一个广义的扑克列表

```
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

```

修改步骤三

```
    choosePokers = allPokers.slice(0, GROUP_COUNT * GROUP_SUM)
```

修改步骤五为

```
  		var pokersGroups = []
        //分组
        for (let indexI = 0; indexI < GROUP_COUNT; indexI++) {
            var list = choosePokers.filter((ele, indexJ) => indexJ % GROUP_COUNT == indexI)
            pokersGroups.push(list)
        }
        
        //计算选定的是哪一叠
        const groupIndex = (pokersGroups.findIndex(list => {
            return list.find(ele => ele == choosePoker)
        }))
        
        //把选定那一叠放到中间
        pokersGroups.splice((pokersGroups.length - 1) / 2, 0, pokersGroups.splice(groupIndex, 1)[0]);
        
        choosePokers = []
        for (let index = 0; index < pokersGroups.length; index++) {
            choosePokers.push(...pokersGroups[index])
        }
```

程序化执行步骤四五六次数

```
 var handlerCount = 0; //统计步骤四五六执行的次数

    while (Math.pow(GROUP_COUNT, handlerCount) < GROUP_SUM) {
        choosePokers = await fenzu(choosePokers)
        handlerCount++;
    }

    //需要多执行一次
    choosePokers = await fenzu(choosePokers)
```

我们用程序做下多值测试

```
   for (let index = 1; index < 200 ; index++) {
        GROUP_COUNT = Math.floor(Math.random()*10) 
        GROUP_SUM = Math.floor(Math.random()*100) 
        
        if( GROUP_COUNT <= 1 ||GROUP_COUNT%2==0||GROUP_SUM%2==0|| GROUP_SUM*GROUP_COUNT > 4000 ){
            //GROUP_COUNT GROUP_SUM 必须为奇数  而且求和不能大于扑克总数 GROUP_COUNT要>1
            continue
        }

        console.log("GROUP_COUNT:"+GROUP_COUNT + " GROUP_SUM:"+GROUP_SUM);
        await ideal()
    }
```

修改打印结果

```
   const result = choosePokers[((GROUP_COUNT * GROUP_SUM - 1) / 2)] == choosePoker
   console.log(`当前分${GROUP_COUNT}组 ,每组分${GROUP_SUM}个 ,执行结果为${result}` );
```

最终结果打印符合预期

```
choosePoker:♠446
当前分9组 ,每组分79个 ,执行结果为true
choosePoker:♦101
当前分9组 ,每组分65个 ,执行结果为true
choosePoker:♠98
当前分9组 ,每组分43个 ,执行结果为true
choosePoker:♥932
当前分7组 ,每组分77个 ,执行结果为true
choosePoker:♠495
当前分3组 ,每组分19个 ,执行结果为true
```

### 思考与扩展五
问题: 如果是偶数组 ，每组偶数个，怎么办呢？

答案：偶数组也会不断的把观众选到的牌筛选到中间来，但是魔术师无法知道具体是哪一组，因为偶数组没有最中间的那一组之说，只能定位到中间的那两组。同理，每组偶数个也是一样的，多次筛选后观众选中的牌会到某一组的中间那两张，具体哪一张就要看运气了!

## **所有代码都托管在github,需要请点击 [传送门](https://github.com/wzyitspider/magic21)**


