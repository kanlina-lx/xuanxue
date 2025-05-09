<template>
  <view class="container">
    <!-- 问题输入 -->
    <view class="question-input">
      <textarea v-model="question" placeholder="请输入要占问的事情" />
    </view>
    
    <!-- 硬币动画 -->
    <view class="coin-container" v-if="animating">
      <view class="coin" v-for="(coin, index) in 3" :key="index">
        <view class="coin-face" :class="{ flip: isFlipping }">
          <view class="coin-front">阳</view>
          <view class="coin-back">阴</view>
        </view>
        <view class="coin-result" v-if="!isFlipping">
          {{ coinResults[index] ? '阳' : '阴' }}
        </view>
      </view>
    </view>
    
    <!-- 添加结果说明 -->
    <view class="result-explanation" v-if="!isFlipping && animating">
      <text>三枚硬币结果：</text>
      <text v-for="(result, index) in coinResults" :key="index">
        第{{ index + 1 }}枚：{{ result ? '阳' : '阴' }}
      </text>
    </view>
    
    <!-- 卦象展示 -->
    <view class="hexagram" v-if="result && !animating">
      <view v-for="(line, idx) in result.original.lines" :key="idx" 
            class="line" :class="lineClass(line, idx)">
        <text>{{ line === '1' ? '▅▅▅' : '▅▅' }}</text>
        <view v-if="result.changingLines.includes(6 - idx)" 
              class="changing-mark">○</view>
      </view>
    </view>

    <!-- 占卜按钮 -->
    <button class="divination-btn" @click="startDivination" :loading="loading">
      {{ loading ? '占卜中...' : '开始占卜' }}
    </button>

    <!-- 结果显示 -->
    <view v-if="result && !animating" class="result">
      <view class="result-title">{{ result.original.name }}</view>
      <view class="result-content">
        <text>卦辞：{{ result.original.judgment }}</text>
        <text>象曰：{{ result.original.image }}</text>
        <text v-if="result.changed">之卦：{{ result.changed.name }}</text>
      </view>
      
      <!-- 爻辞详解 -->
      <view class="lines-interpret" v-if="result.original.linesInterpret">
        <view class="interpret-title">爻辞详解：</view>
        <view v-for="(interpret, idx) in result.original.linesInterpret" 
              :key="idx" class="interpret-item">
          {{ interpret }}
        </view>
      </view>
      
      <!-- 应用场景 -->
      <view class="application" v-if="result.original.application">
        <view class="application-title">应用场景：</view>
        <text>{{ result.original.application }}</text>
      </view>
    </view>

    <view class="result-container" v-if="result">
      <view class="hexagram-info">
        <view class="hexagram-name">
          <text>本卦：{{ result.original.name }}</text>
          <text v-if="result.changed.name !== result.original.name">
            变卦：{{ result.changed.name }}
          </text>
        </view>
        
        <view class="hexagram-judgment">
          <text class="title">吉凶判断：</text>
          <text class="content">{{ result.original.judgment }}</text>
        </view>
        
        <view class="hexagram-image">
          <text class="title">卦象解释：</text>
          <text class="content">{{ result.original.image }}</text>
        </view>
        
        <view class="hexagram-advice">
          <text class="title">建议提醒：</text>
          <text class="content">{{ result.original.application }}</text>
        </view>
        
        <view class="changing-lines" v-if="result.changingLines.length > 0">
          <text class="title">变爻说明：</text>
          <text class="content">
            第{{ result.changingLines.join('、') }}爻发生变化，
            变卦为{{ result.changed.name }}，表示事情可能会有新的变化。
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 卦象数据
const hexagramDict = [
  {
    "id": 1,
    "name": "乾为天",
    "lines": "111111",
    "judgment": "元亨利贞。",
    "image": "天行健，君子以自强不息。",
    "linesInterpret": [
      "初九：潜龙勿用",
      "九二：见龙在田，利见大人",
      "九三：君子终日乾乾，夕惕若厉，无咎",
      "九四：或跃在渊，无咎",
      "九五：飞龙在天，利见大人",
      "上九：亢龙有悔"
    ],
    "application": "适用于事业决策、领导力提升、重大决策等场景。"
  },
  {
    "id": 2,
    "name": "坤为地",
    "lines": "000000",
    "judgment": "元亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞吉。",
    "image": "地势坤，君子以厚德载物。",
    "linesInterpret": [
      "初六：履霜，坚冰至",
      "六二：直方大，不习无不利",
      "六三：含章可贞，或从王事，无成有终",
      "六四：括囊，无咎无誉",
      "六五：黄裳元吉",
      "上六：龙战于野，其血玄黄"
    ],
    "application": "适用于人际关系、合作共赢、稳健发展等场景。"
  },
  {
    "id": 3,
    "name": "水雷屯",
    "lines": "100010",
    "judgment": "元亨利贞，勿用有攸往，利建侯。",
    "image": "云雷屯，君子以经纶。",
    "linesInterpret": [
      "初九：磐桓，利居贞，利建侯",
      "六二：屯如邅如，乘马班如，匪寇婚媾，女子贞不字，十年乃字",
      "六三：即鹿无虞，惟入于林中，君子几不如舍，往吝",
      "六四：乘马班如，求婚媾，往吉，无不利",
      "九五：屯其膏，小贞吉，大贞凶",
      "上六：乘马班如，泣血涟如"
    ],
    "application": "适用于创业初期、事业起步、困难时期等场景。"
  },
  {
    "id": 4,
    "name": "山水蒙",
    "lines": "010001",
    "judgment": "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。",
    "image": "山下出泉，蒙。君子以果行育德。",
    "linesInterpret": [
      "初六：发蒙，利用刑人，用说桎梏，以往吝",
      "九二：包蒙吉，纳妇吉，子克家",
      "六三：勿用取女，见金夫，不有躬，无攸利",
      "六四：困蒙，吝",
      "六五：童蒙，吉",
      "上九：击蒙，不利为寇，利御寇"
    ],
    "application": "适用于教育、学习、启蒙等场景。"
  },
  {
    "id": 5,
    "name": "水天需",
    "lines": "010111",
    "judgment": "有孚，光亨，贞吉。利涉大川。",
    "image": "云上于天，需。君子以饮食宴乐。",
    "linesInterpret": [
      "初九：需于郊，利用恒，无咎",
      "九二：需于沙，小有言，终吉",
      "九三：需于泥，致寇至",
      "六四：需于血，出自穴",
      "九五：需于酒食，贞吉",
      "上六：入于穴，有不速之客三人来，敬之终吉"
    ],
    "application": "适用于等待时机、耐心准备、把握机会等场景。"
  },
  {
    "id": 6,
    "name": "天水讼",
    "lines": "111010",
    "judgment": "有孚窒惕，中吉，终凶。利见大人，不利涉大川。",
    "image": "天与水违行，讼。君子以作事谋始。",
    "linesInterpret": [
      "初六：不永所事，小有言，终吉",
      "九二：不克讼，归而逋，其邑人三百户，无眚",
      "六三：食旧德，贞厉，终吉，或从王事，无成",
      "九四：不克讼，复即命，渝安贞，吉",
      "九五：讼元吉",
      "上九：或锡之鞶带，终朝三褫之"
    ],
    "application": "适用于处理纠纷、化解矛盾、维护权益等场景。"
  },
  {
    "id": 7,
    "name": "地水师",
    "lines": "000010",
    "judgment": "贞丈人吉，无咎。",
    "image": "地中有水，师。君子以容民畜众。",
    "linesInterpret": [
      "初六：师出以律，否臧凶",
      "九二：在师中，吉无咎，王三锡命",
      "六三：师或舆尸，凶",
      "六四：师左次，无咎",
      "六五：田有禽，利执言，无咎。长子帅师，弟子舆尸，贞凶",
      "上六：大君有命，开国承家，小人勿用"
    ],
    "application": "适用于团队管理、组织建设、领导指挥等场景。"
  },
  {
    "id": 8,
    "name": "水地比",
    "lines": "010000",
    "judgment": "吉。原筮元永贞，无咎。不宁方来，后夫凶。",
    "image": "地上有水，比。先王以建万国，亲诸侯。",
    "linesInterpret": [
      "初六：有孚比之，无咎。有孚盈缶，终来有它，吉",
      "六二：比之自内，贞吉",
      "六三：比之匪人",
      "六四：外比之，贞吉",
      "九五：显比，王用三驱，失前禽。邑人不诫，吉",
      "上六：比之无首，凶"
    ],
    "application": "适用于人际关系、合作共赢、团队协作等场景。"
  },
  {
    "id": 9,
    "name": "风天小畜",
    "lines": "110111",
    "judgment": "亨。密云不雨，自我西郊。",
    "image": "风行天上，小畜。君子以懿文德。",
    "linesInterpret": [
      "初九：复自道，何其咎，吉",
      "九二：牵复，吉",
      "九三：舆说辐，夫妻反目",
      "六四：有孚，血去惕出，无咎",
      "九五：有孚挛如，富以其邻",
      "上九：既雨既处，尚德载，妇贞厉。月几望，君子征凶"
    ],
    "application": "适用于积蓄力量、等待时机、小有成就等场景。"
  },
  {
    "id": 10,
    "name": "天泽履",
    "lines": "111011",
    "judgment": "履虎尾，不咥人，亨。",
    "image": "上天下泽，履。君子以辨上下，定民志。",
    "linesInterpret": [
      "初九：素履，往无咎",
      "九二：履道坦坦，幽人贞吉",
      "六三：眇能视，跛能履，履虎尾，咥人，凶。武人为于大君",
      "九四：履虎尾，愬愬终吉",
      "九五：夬履，贞厉",
      "上九：视履考祥，其旋元吉"
    ],
    "application": "适用于谨慎行事、遵守规则、处理危机等场景。"
  },
  {
    "id": 11,
    "name": "地天泰",
    "lines": "000111",
    "judgment": "小往大来，吉亨。",
    "image": "天地交，泰。后以财成天地之道，辅相天地之宜，以左右民。",
    "linesInterpret": [
      "初九：拔茅茹，以其汇，征吉",
      "九二：包荒，用冯河，不遐遗，朋亡，得尚于中行",
      "九三：无平不陂，无往不复，艰贞无咎。勿恤其孚，于食有福",
      "六四：翩翩不富，以其邻，不戒以孚",
      "六五：帝乙归妹，以祉元吉",
      "上六：城复于隍，勿用师。自邑告命，贞吝"
    ],
    "application": "适用于事业顺利、人际关系和谐、发展壮大等场景。"
  },
  {
    "id": 12,
    "name": "天地否",
    "lines": "111000",
    "judgment": "否之匪人，不利君子贞，大往小来。",
    "image": "天地不交，否。君子以俭德辟难，不可荣以禄。",
    "linesInterpret": [
      "初六：拔茅茹，以其汇，贞吉亨",
      "六二：包承。小人吉，大人否亨",
      "六三：包羞",
      "九四：有命无咎，畴离祉",
      "九五：休否，大人吉。其亡其亡，系于苞桑",
      "上九：倾否，先否后喜"
    ],
    "application": "适用于困难时期、逆境求生、韬光养晦等场景。"
  },
  {
    "id": 13,
    "name": "天火同人",
    "lines": "111101",
    "judgment": "同人于野，亨。利涉大川，利君子贞。",
    "image": "天与火，同人。君子以类族辨物。",
    "linesInterpret": [
      "初九：同人于门，无咎",
      "六二：同人于宗，吝",
      "九三：伏戎于莽，升其高陵，三岁不兴",
      "九四：乘其墉，弗克攻，吉",
      "九五：同人，先号咷而后笑。大师克相遇",
      "上九：同人于郊，无悔"
    ],
    "application": "适用于团队合作、人际关系、共同目标等场景。"
  },
  {
    "id": 14,
    "name": "火天大有",
    "lines": "101111",
    "judgment": "元亨。",
    "image": "火在天上，大有。君子以遏恶扬善，顺天休命。",
    "linesInterpret": [
      "初九：无交害，匪咎，艰则无咎",
      "九二：大车以载，有攸往，无咎",
      "九三：公用亨于天子，小人弗克",
      "九四：匪其彭，无咎",
      "六五：厥孚交如，威如，吉",
      "上九：自天佑之，吉无不利"
    ],
    "application": "适用于事业成功、财富积累、大有作为等场景。"
  },
  {
    "id": 15,
    "name": "地山谦",
    "lines": "000100",
    "judgment": "亨，君子有终。",
    "image": "地中有山，谦。君子以裒多益寡，称物平施。",
    "linesInterpret": [
      "初六：谦谦君子，用涉大川，吉",
      "六二：鸣谦，贞吉",
      "九三：劳谦君子，有终吉",
      "六四：无不利，撝谦",
      "六五：不富，以其邻，利用侵伐，无不利",
      "上六：鸣谦，利用行师，征邑国"
    ],
    "application": "适用于谦虚谨慎、修身养性、待人接物等场景。"
  },
  {
    "id": 16,
    "name": "雷地豫",
    "lines": "001000",
    "judgment": "利建侯行师。",
    "image": "雷出地奋，豫。先王以作乐崇德，殷荐之上帝，以配祖考。",
    "linesInterpret": [
      "初六：鸣豫，凶",
      "六二：介于石，不终日，贞吉",
      "六三：盱豫，悔。迟有悔",
      "九四：由豫，大有得。勿疑。朋盍簪",
      "六五：贞疾，恒不死",
      "上六：冥豫，成有渝，无咎"
    ],
    "application": "适用于准备充分、把握时机、积极进取等场景。"
  },
  {
    "id": 17,
    "name": "泽雷随",
    "lines": "011001",
    "judgment": "元亨利贞，无咎。",
    "image": "泽中有雷，随。君子以向晦入宴息。",
    "linesInterpret": [
      "初九：官有渝，贞吉。出门交有功",
      "六二：系小子，失丈夫",
      "六三：系丈夫，失小子。随有求得，利居贞",
      "九四：随有获，贞凶。有孚在道，以明，何咎",
      "九五：孚于嘉，吉",
      "上六：拘系之，乃从维之。王用亨于西山"
    ],
    "application": "适用于随遇而安、顺势而为、随机应变等场景。"
  },
  {
    "id": 18,
    "name": "山风蛊",
    "lines": "100110",
    "judgment": "元亨，利涉大川。先甲三日，后甲三日。",
    "image": "山下有风，蛊。君子以振民育德。",
    "linesInterpret": [
      "初六：干父之蛊，有子，考无咎，厉终吉",
      "九二：干母之蛊，不可贞",
      "九三：干父之蛊，小有晦，无大咎",
      "六四：裕父之蛊，往见吝",
      "六五：干父之蛊，用誉",
      "上九：不事王侯，高尚其事"
    ],
    "application": "适用于改革整顿、除旧布新、解决问题等场景。"
  },
  {
    "id": 19,
    "name": "地泽临",
    "lines": "000011",
    "judgment": "元亨利贞。至于八月有凶。",
    "image": "泽上有地，临。君子以教思无穷，容保民无疆。",
    "linesInterpret": [
      "初九：咸临，贞吉",
      "九二：咸临，吉无不利",
      "六三：甘临，无攸利。既忧之，无咎",
      "六四：至临，无咎",
      "六五：知临，大君之宜，吉",
      "上六：敦临，吉无咎"
    ],
    "application": "适用于领导管理、监督指导、临事决断等场景。"
  },
  {
    "id": 20,
    "name": "风地观",
    "lines": "110000",
    "judgment": "盥而不荐，有孚颙若。",
    "image": "风行地上，观。先王以省方，观民设教。",
    "linesInterpret": [
      "初六：童观，小人无咎，君子吝",
      "六二：窥观，利女贞",
      "六三：观我生，进退",
      "六四：观国之光，利用宾于王",
      "九五：观我生，君子无咎",
      "上九：观其生，君子无咎"
    ],
    "application": "适用于观察分析、调查研究、决策判断等场景。"
  },
  {
    "id": 21,
    "name": "火雷噬嗑",
    "lines": "101001",
    "judgment": "亨。利用狱。",
    "image": "雷电噬嗑，先王以明罚敕法。",
    "linesInterpret": [
      "初九：履校灭趾，无咎",
      "六二：噬肤灭鼻，无咎",
      "六三：噬腊肉，遇毒；小吝，无咎",
      "九四：噬干胏，得金矢，利艰贞，吉",
      "六五：噬干肉，得黄金，贞厉，无咎",
      "上九：何校灭耳，凶"
    ],
    "application": "适用于处理纠纷、明辨是非、执行纪律等场景。"
  },
  {
    "id": 22,
    "name": "山火贲",
    "lines": "100101",
    "judgment": "亨。小利有攸往。",
    "image": "山下有火，贲。君子以明庶政，无敢折狱。",
    "linesInterpret": [
      "初九：贲其趾，舍车而徒",
      "六二：贲其须",
      "九三：贲如濡如，永贞吉",
      "六四：贲如皤如，白马翰如，匪寇婚媾",
      "六五：贲于丘园，束帛戋戋，吝，终吉",
      "上九：白贲，无咎"
    ],
    "application": "适用于修饰美化、礼仪规范、文化修养等场景。"
  },
  {
    "id": 23,
    "name": "山地剥",
    "lines": "100000",
    "judgment": "不利有攸往。",
    "image": "山附于地，剥。上以厚下安宅。",
    "linesInterpret": [
      "初六：剥床以足，蔑贞凶",
      "六二：剥床以辨，蔑贞凶",
      "六三：剥之，无咎",
      "六四：剥床以肤，凶",
      "六五：贯鱼，以宫人宠，无不利",
      "上九：硕果不食，君子得舆，小人剥庐"
    ],
    "application": "适用于危机处理、防范风险、保存实力等场景。"
  },
  {
    "id": 24,
    "name": "地雷复",
    "lines": "000001",
    "judgment": "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。",
    "image": "雷在地中，复。先王以至日闭关，商旅不行，后不省方。",
    "linesInterpret": [
      "初九：不远复，无祗悔，元吉",
      "六二：休复，吉",
      "六三：频复，厉无咎",
      "六四：中行独复",
      "六五：敦复，无悔",
      "上六：迷复，凶，有灾眚。用行师，终有大败，以其国君，凶；至于十年，不克征"
    ],
    "application": "适用于恢复元气、重新开始、循环往复等场景。"
  },
  {
    "id": 25,
    "name": "天雷无妄",
    "lines": "111001",
    "judgment": "元亨利贞。其匪正有眚，不利有攸往。",
    "image": "天下雷行，物与无妄。先王以茂对时，育万物。",
    "linesInterpret": [
      "初九：无妄，往吉",
      "六二：不耕获，不菑畲，则利有攸往",
      "六三：无妄之灾，或系之牛，行人之得，邑人之灾",
      "九四：可贞，无咎",
      "九五：无妄之疾，勿药有喜",
      "上九：无妄，行有眚，无攸利"
    ],
    "application": "适用于实事求是、避免妄为、顺其自然等场景。"
  },
  {
    "id": 26,
    "name": "山天大畜",
    "lines": "100111",
    "judgment": "利贞，不家食吉，利涉大川。",
    "image": "天在山中，大畜。君子以多识前言往行，以畜其德。",
    "linesInterpret": [
      "初九：有厉利已",
      "九二：舆说辐",
      "九三：良马逐，利艰贞。曰闲舆卫，利有攸往",
      "六四：童牛之牿，元吉",
      "六五：豮豕之牙，吉",
      "上九：何天之衢，亨"
    ],
    "application": "适用于积累知识、培养才能、厚积薄发等场景。"
  },
  {
    "id": 27,
    "name": "山雷颐",
    "lines": "100001",
    "judgment": "贞吉。观颐，自求口实。",
    "image": "山下有雷，颐。君子以慎言语，节饮食。",
    "linesInterpret": [
      "初九：舍尔灵龟，观我朵颐，凶",
      "六二：颠颐，拂经，于丘颐，征凶",
      "六三：拂颐，贞凶，十年勿用，无攸利",
      "六四：颠颐吉，虎视眈眈，其欲逐逐，无咎",
      "六五：拂经，居贞吉，不可涉大川",
      "上九：由颐，厉吉，利涉大川"
    ],
    "application": "适用于养生保健、修身养性、节制欲望等场景。"
  },
  {
    "id": 28,
    "name": "泽风大过",
    "lines": "011110",
    "judgment": "栋桡，利有攸往，亨。",
    "image": "泽灭木，大过。君子以独立不惧，遁世无闷。",
    "linesInterpret": [
      "初六：藉用白茅，无咎",
      "九二：枯杨生稊，老夫得其女妻，无不利",
      "九三：栋桡，凶",
      "九四：栋隆，吉；有它吝",
      "九五：枯杨生华，老妇得士夫，无咎无誉",
      "上六：过涉灭顶，凶，无咎"
    ],
    "application": "适用于非常时期、重大决策、突破常规等场景。"
  },
  {
    "id": 29,
    "name": "坎为水",
    "lines": "010010",
    "judgment": "习坎，有孚，维心亨，行有尚。",
    "image": "水洊至，习坎。君子以常德行，习教事。",
    "linesInterpret": [
      "初六：习坎，入于坎窞，凶",
      "九二：坎有险，求小得",
      "六三：来之坎坎，险且枕，入于坎窞，勿用",
      "六四：樽酒簋贰，用缶，纳约自牖，终无咎",
      "九五：坎不盈，只既平，无咎",
      "上六：系用徽纆，寘于丛棘三岁不得，凶"
    ],
    "application": "适用于面对困难、克服险阻、保持信心等场景。"
  },
  {
    "id": 30,
    "name": "离为火",
    "lines": "101101",
    "judgment": "利贞，亨。畜牝牛，吉。",
    "image": "明两作，离。大人以继明照于四方。",
    "linesInterpret": [
      "初九：履错然，敬之无咎",
      "六二：黄离，元吉",
      "九三：日昃之离，不鼓缶而歌，则大耋之嗟，凶",
      "九四：突如其来如，焚如，死如，弃如",
      "六五：出涕沱若，戚嗟若，吉",
      "上九：王用出征，有嘉折首，获其匪丑，无咎"
    ],
    "application": "适用于光明正大、文明礼仪、智慧明达等场景。"
  },
  {
    "id": 31,
    "name": "泽山咸",
    "lines": "011100",
    "judgment": "亨，利贞，取女吉。",
    "image": "山上有泽，咸。君子以虚受人。",
    "linesInterpret": [
      "初六：咸其拇，无咎",
      "六二：咸其腓，凶，居吉",
      "九三：咸其股，执其随，往吝",
      "九四：贞吉悔亡，憧憧往来，朋从尔思",
      "九五：咸其脢，无悔",
      "上六：咸其辅颊舌，吉"
    ],
    "application": "适用于情感交流、人际关系、感应互动等场景。"
  },
  {
    "id": 32,
    "name": "雷风恒",
    "lines": "001110",
    "judgment": "亨，无咎，利贞，利有攸往。",
    "image": "雷风，恒。君子以立不易方。",
    "linesInterpret": [
      "初六：浚恒，贞凶，无攸利",
      "九二：悔亡",
      "九三：不恒其德，或承之羞，贞吝",
      "九四：田无禽",
      "六五：恒其德，贞，妇人吉，夫子凶",
      "上六：振恒，凶"
    ],
    "application": "适用于持之以恒、坚持不懈、保持恒心等场景。"
  },
  {
    "id": 33,
    "name": "天山遁",
    "lines": "111100",
    "judgment": "亨，小利贞。",
    "image": "天下有山，遁。君子以远小人，不恶而严。",
    "linesInterpret": [
      "初六：遁尾，厉，勿用有攸往",
      "六二：执之用黄牛之革，莫之胜说",
      "九三：系遁，有疾厉，畜臣妾吉",
      "九四：好遁君子吉，小人否",
      "九五：嘉遁，贞吉",
      "上九：肥遁，无不利"
    ],
    "application": "适用于退避三舍、韬光养晦、保全实力等场景。"
  },
  {
    "id": 34,
    "name": "雷天大壮",
    "lines": "001111",
    "judgment": "利贞。",
    "image": "雷在天上，大壮。君子以非礼弗履。",
    "linesInterpret": [
      "初九：壮于趾，征凶，有孚",
      "九二：贞吉",
      "九三：小人用壮，君子用罔，贞厉。羝羊触藩，羸其角",
      "九四：贞吉悔亡，藩决不羸，壮于大舆之輹",
      "六五：丧羊于易，无悔",
      "上六：羝羊触藩，不能退，不能遂，无攸利，艰则吉"
    ],
    "application": "适用于力量强大、积极进取、把握时机等场景。"
  },
  {
    "id": 35,
    "name": "火地晋",
    "lines": "101000",
    "judgment": "康侯用锡马蕃庶，昼日三接。",
    "image": "明出地上，晋。君子以自昭明德。",
    "linesInterpret": [
      "初六：晋如，摧如，贞吉。罔孚，裕无咎",
      "六二：晋如，愁如，贞吉。受兹介福，于其王母",
      "六三：众允，悔亡",
      "九四：晋如硕鼠，贞厉",
      "六五：悔亡，失得勿恤，往吉无不利",
      "上九：晋其角，维用伐邑，厉吉无咎，贞吝"
    ],
    "application": "适用于晋升发展、光明正大、积极进取等场景。"
  },
  {
    "id": 36,
    "name": "地火明夷",
    "lines": "000101",
    "judgment": "利艰贞。",
    "image": "明入地中，明夷。君子以莅众，用晦而明。",
    "linesInterpret": [
      "初九：明夷于飞，垂其翼。君子于行，三日不食，有攸往，主人有言",
      "六二：明夷，夷于左股，用拯马壮，吉",
      "九三：明夷于南狩，得其大首，不可疾贞",
      "六四：入于左腹，获明夷之心，出于门庭",
      "六五：箕子之明夷，利贞",
      "上六：不明晦，初登于天，后入于地"
    ],
    "application": "适用于韬光养晦、明哲保身、等待时机等场景。"
  },
  {
    "id": 37,
    "name": "风火家人",
    "lines": "110101",
    "judgment": "利女贞。",
    "image": "风自火出，家人。君子以言有物，而行有恒。",
    "linesInterpret": [
      "初九：闲有家，悔亡",
      "六二：无攸遂，在中馈，贞吉",
      "九三：家人嗃嗃，悔厉吉；妇子嘻嘻，终吝",
      "六四：富家，大吉",
      "九五：王假有家，勿恤吉",
      "上九：有孚威如，终吉"
    ],
    "application": "适用于家庭关系、亲情和睦、持家有道等场景。"
  },
  {
    "id": 38,
    "name": "火泽睽",
    "lines": "101011",
    "judgment": "小事吉。",
    "image": "上火下泽，睽。君子以同而异。",
    "linesInterpret": [
      "初九：悔亡，丧马勿逐，自复；见恶人无咎",
      "九二：遇主于巷，无咎",
      "六三：见舆曳，其牛掣，其人天且劓，无初有终",
      "九四：睽孤，遇元夫，交孚，厉无咎",
      "六五：悔亡，厥宗噬肤，往何咎",
      "上九：睽孤，见豕负涂，载鬼一车，先张之弧，后说之弧，匪寇婚媾，往遇雨则吉"
    ],
    "application": "适用于化解矛盾、求同存异、处理分歧等场景。"
  },
  {
    "id": 39,
    "name": "水山蹇",
    "lines": "010100",
    "judgment": "利西南，不利东北；利见大人，贞吉。",
    "image": "山上有水，蹇。君子以反身修德。",
    "linesInterpret": [
      "初六：往蹇，来誉",
      "六二：王臣蹇蹇，匪躬之故",
      "九三：往蹇来反",
      "六四：往蹇来连",
      "九五：大蹇朋来",
      "上六：往蹇来硕，吉；利见大人"
    ],
    "application": "适用于面对困难、反省自身、寻求帮助等场景。"
  },
  {
    "id": 40,
    "name": "雷水解",
    "lines": "001010",
    "judgment": "利西南，无所往，其来复吉。有攸往，夙吉。",
    "image": "雷雨作，解。君子以赦过宥罪。",
    "linesInterpret": [
      "初六：无咎",
      "九二：田获三狐，得黄矢，贞吉",
      "六三：负且乘，致寇至，贞吝",
      "九四：解而拇，朋至斯孚",
      "六五：君子维有解，吉；有孚于小人",
      "上六：公用射隼，于高墉之上，获之，无不利"
    ],
    "application": "适用于化解矛盾、解决问题、释放压力等场景。"
  },
  {
    "id": 41,
    "name": "山泽损",
    "lines": "100011",
    "judgment": "有孚，元吉，无咎，可贞，利有攸往。曷之用？二簋可用享。",
    "image": "山下有泽，损。君子以惩忿窒欲。",
    "linesInterpret": [
      "初九：已事遄往，无咎，酌损之",
      "九二：利贞，征凶，弗损益之",
      "六三：三人行，则损一人；一人行，则得其友",
      "六四：损其疾，使遄有喜，无咎",
      "六五：或益之，十朋之龟弗克违，元吉",
      "上九：弗损益之，无咎，贞吉，利有攸往，得臣无家"
    ],
    "application": "适用于减损之道、节制欲望、修身养性等场景。"
  },
  {
    "id": 42,
    "name": "风雷益",
    "lines": "110001",
    "judgment": "利有攸往，利涉大川。",
    "image": "风雷，益。君子以见善则迁，有过则改。",
    "linesInterpret": [
      "初九：利用为大作，元吉，无咎",
      "六二：或益之，十朋之龟弗克违，永贞吉。王用享于帝，吉",
      "六三：益之用凶事，无咎。有孚中行，告公用圭",
      "六四：中行，告公从。利用为依迁国",
      "九五：有孚惠心，勿问元吉。有孚惠我德",
      "上九：莫益之，或击之，立心勿恒，凶"
    ],
    "application": "适用于增益之道、助人为乐、共同进步等场景。"
  },
  {
    "id": 43,
    "name": "泽天夬",
    "lines": "011111",
    "judgment": "扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往。",
    "image": "泽上于天，夬。君子以施禄及下，居德则忌。",
    "linesInterpret": [
      "初九：壮于前趾，往不胜为咎",
      "九二：惕号，莫夜有戎，勿恤",
      "九三：壮于頄，有凶。君子夬夬，独行遇雨，若濡有愠，无咎",
      "九四：臀无肤，其行次且。牵羊悔亡，闻言不信",
      "九五：苋陆夬夬，中行无咎",
      "上六：无号，终有凶"
    ],
    "application": "适用于决断决策、明辨是非、果断行动等场景。"
  },
  {
    "id": 44,
    "name": "天风姤",
    "lines": "111110",
    "judgment": "女壮，勿用取女。",
    "image": "天下有风，姤。后以施命诰四方。",
    "linesInterpret": [
      "初六：系于金柅，贞吉，有攸往，见凶，羸豕踟躅",
      "九二：包有鱼，无咎，不利宾",
      "九三：臀无肤，其行次且，厉，无大咎",
      "九四：包无鱼，起凶",
      "九五：以杞包瓜，含章，有陨自天",
      "上九：姤其角，吝，无咎"
    ],
    "application": "适用于相遇之道、把握机遇、防范风险等场景。"
  },
  {
    "id": 45,
    "name": "泽地萃",
    "lines": "011000",
    "judgment": "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。",
    "image": "泽上于地，萃。君子以除戎器，戒不虞。",
    "linesInterpret": [
      "初六：有孚不终，乃乱乃萃，若号一握为笑，勿恤，往无咎",
      "六二：引吉，无咎，孚乃利用禴",
      "六三：萃如，嗟如，无攸利，往无咎，小吝",
      "九四：大吉，无咎",
      "九五：萃有位，无咎。匪孚，元永贞，悔亡",
      "上六：赍咨涕洟，无咎"
    ],
    "application": "适用于聚集人才、团结协作、共同发展等场景。"
  },
  {
    "id": 46,
    "name": "地风升",
    "lines": "000110",
    "judgment": "元亨，用见大人，勿恤，南征吉。",
    "image": "地中生木，升。君子以顺德，积小以高大。",
    "linesInterpret": [
      "初六：允升，大吉",
      "九二：孚乃利用禴，无咎",
      "九三：升虚邑",
      "六四：王用亨于岐山，吉无咎",
      "六五：贞吉，升阶",
      "上六：冥升，利于不息之贞"
    ],
    "application": "适用于循序渐进、稳步提升、积累发展等场景。"
  },
  {
    "id": 47,
    "name": "泽水困",
    "lines": "011010",
    "judgment": "亨，贞，大人吉，无咎，有言不信。",
    "image": "泽无水，困。君子以致命遂志。",
    "linesInterpret": [
      "初六：臀困于株木，入于幽谷，三岁不觌",
      "九二：困于酒食，朱绂方来，利用亨祀，征凶，无咎",
      "六三：困于石，据于蒺藜，入于其宫，不见其妻，凶",
      "九四：来徐徐，困于金车，吝，有终",
      "九五：劓刖，困于赤绂，乃徐有说，利用祭祀",
      "上六：困于葛藟，于臲卼，曰动悔。有悔，征吉"
    ],
    "application": "适用于困境求生、保持信念、等待时机等场景。"
  },
  {
    "id": 48,
    "name": "水风井",
    "lines": "010110",
    "judgment": "改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶。",
    "image": "木上有水，井。君子以劳民劝相。",
    "linesInterpret": [
      "初六：井泥不食，旧井无禽",
      "九二：井谷射鲋，瓮敝漏",
      "九三：井渫不食，为我心恻，可用汲，王明，并受其福",
      "六四：井甃，无咎",
      "九五：井冽，寒泉食",
      "上六：井收勿幕，有孚元吉"
    ],
    "application": "适用于修身养性、培养品德、造福他人等场景。"
  },
  {
    "id": 49,
    "name": "泽火革",
    "lines": "011101",
    "judgment": "己日乃孚，元亨利贞，悔亡。",
    "image": "泽中有火，革。君子以治历明时。",
    "linesInterpret": [
      "初九：巩用黄牛之革",
      "六二：己日乃革之，征吉，无咎",
      "九三：征凶，贞厉，革言三就，有孚",
      "九四：悔亡，有孚改命，吉",
      "九五：大人虎变，未占有孚",
      "上六：君子豹变，小人革面，征凶，居贞吉"
    ],
    "application": "适用于改革创新、除旧布新、与时俱进等场景。"
  },
  {
    "id": 50,
    "name": "火风鼎",
    "lines": "101110",
    "judgment": "元吉，亨。",
    "image": "木上有火，鼎。君子以正位凝命。",
    "linesInterpret": [
      "初六：鼎颠趾，利出否，得妾以其子，无咎",
      "九二：鼎有实，我仇有疾，不我能即，吉",
      "九三：鼎耳革，其行塞，雉膏不食，方雨亏悔，终吉",
      "九四：鼎折足，覆公餗，其形渥，凶",
      "六五：鼎黄耳金铉，利贞",
      "上九：鼎玉铉，大吉，无不利"
    ],
    "application": "适用于建立基业、稳固地位、培养人才等场景。"
  },
  {
    "id": 51,
    "name": "震为雷",
    "lines": "001001",
    "judgment": "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。",
    "image": "洊雷，震。君子以恐惧修省。",
    "linesInterpret": [
      "初九：震来虩虩，后笑言哑哑，吉",
      "六二：震来厉，亿丧贝，跻于九陵，勿逐，七日得",
      "六三：震苏苏，震行无眚",
      "九四：震遂泥",
      "六五：震往来厉，亿无丧，有事",
      "上六：震索索，视矍矍，征凶。震不于其躬，于其邻，无咎。婚媾有言"
    ],
    "application": "适用于面对变故、保持警惕、反省自身等场景。"
  },
  {
    "id": 52,
    "name": "艮为山",
    "lines": "100100",
    "judgment": "艮其背，不获其身，行其庭，不见其人，无咎。",
    "image": "兼山，艮。君子以思不出其位。",
    "linesInterpret": [
      "初六：艮其趾，无咎，利永贞",
      "六二：艮其腓，不拯其随，其心不快",
      "九三：艮其限，列其夤，厉薰心",
      "六四：艮其身，无咎",
      "六五：艮其辅，言有序，悔亡",
      "上九：敦艮，吉"
    ],
    "application": "适用于止步不前、保持冷静、安守本分等场景。"
  },
  {
    "id": 53,
    "name": "风山渐",
    "lines": "110100",
    "judgment": "女归吉，利贞。",
    "image": "山上有木，渐。君子以居贤德，善俗。",
    "linesInterpret": [
      "初六：鸿渐于干，小子厉，有言，无咎",
      "六二：鸿渐于磐，饮食衎衎，吉",
      "九三：鸿渐于陆，夫征不复，妇孕不育，凶；利御寇",
      "六四：鸿渐于木，或得其桷，无咎",
      "九五：鸿渐于陵，妇三岁不孕，终莫之胜，吉",
      "上九：鸿渐于逵，其羽可用为仪，吉"
    ],
    "application": "适用于循序渐进、稳步发展、培养品德等场景。"
  },
  {
    "id": 54,
    "name": "雷泽归妹",
    "lines": "001011",
    "judgment": "征凶，无攸利。",
    "image": "泽上有雷，归妹。君子以永终知敝。",
    "linesInterpret": [
      "初九：归妹以娣，跛能履，征吉",
      "九二：眇能视，利幽人之贞",
      "六三：归妹以须，反归以娣",
      "九四：归妹愆期，迟归有时",
      "六五：帝乙归妹，其君之袂，不如其娣之袂良，月几望，吉",
      "上六：女承筐无实，士刲羊无血，无攸利"
    ],
    "application": "适用于婚姻嫁娶、人际关系、处理矛盾等场景。"
  },
  {
    "id": 55,
    "name": "雷火丰",
    "lines": "001101",
    "judgment": "亨，王假之，勿忧，宜日中。",
    "image": "雷电皆至，丰。君子以折狱致刑。",
    "linesInterpret": [
      "初九：遇其配主，虽旬无咎，往有尚",
      "六二：丰其蔀，日中见斗，往得疑疾，有孚发若，吉",
      "九三：丰其沛，日中见昧，折其右肱，无咎",
      "九四：丰其蔀，日中见斗，遇其夷主，吉",
      "六五：来章，有庆誉，吉",
      "上六：丰其屋，蔀其家，窥其户，阒其无人，三岁不觌，凶"
    ],
    "application": "适用于事业鼎盛、光明正大、明辨是非等场景。"
  },
  {
    "id": 56,
    "name": "火山旅",
    "lines": "101100",
    "judgment": "小亨，旅贞吉。",
    "image": "山上有火，旅。君子以明慎用刑，而不留狱。",
    "linesInterpret": [
      "初六：旅琐琐，斯其所取灾",
      "六二：旅即次，怀其资，得童仆贞",
      "九三：旅焚其次，丧其童仆，贞厉",
      "九四：旅于处，得其资斧，我心不快",
      "六五：射雉一矢亡，终以誉命",
      "上九：鸟焚其巢，旅人先笑后号啕。丧牛于易，凶"
    ],
    "application": "适用于旅行在外、漂泊不定、谨慎行事等场景。"
  },
  {
    "id": 57,
    "name": "巽为风",
    "lines": "110110",
    "judgment": "小亨，利攸往，利见大人。",
    "image": "随风，巽。君子以申命行事。",
    "linesInterpret": [
      "初六：进退，利武人之贞",
      "九二：巽在床下，用史巫纷若，吉无咎",
      "九三：频巽，吝",
      "六四：悔亡，田获三品",
      "九五：贞吉悔亡，无不利。无初有终，先庚三日，后庚三日，吉",
      "上九：巽在床下，丧其资斧，贞凶"
    ],
    "application": "适用于谦逊顺从、随机应变、把握时机等场景。"
  },
  {
    "id": 58,
    "name": "兑为泽",
    "lines": "011011",
    "judgment": "亨，利贞。",
    "image": "丽泽，兑。君子以朋友讲习。",
    "linesInterpret": [
      "初九：和兑，吉",
      "九二：孚兑，吉，悔亡",
      "六三：来兑，凶",
      "九四：商兑，未宁，介疾有喜",
      "九五：孚于剥，有厉",
      "上六：引兑"
    ],
    "application": "适用于喜悦快乐、交流沟通、和谐相处等场景。"
  },
  {
    "id": 59,
    "name": "风水涣",
    "lines": "110010",
    "judgment": "亨。王假有庙，利涉大川，利贞。",
    "image": "风行水上，涣。先王以享于帝立庙。",
    "linesInterpret": [
      "初六：用拯马壮，吉",
      "九二：涣奔其机，悔亡",
      "六三：涣其躬，无悔",
      "六四：涣其群，元吉。涣有丘，匪夷所思",
      "九五：涣汗其大号，涣王居，无咎",
      "上九：涣其血，去逖出，无咎"
    ],
    "application": "适用于化解矛盾、团结协作、共同发展等场景。"
  },
  {
    "id": 60,
    "name": "水泽节",
    "lines": "010011",
    "judgment": "亨。苦节不可贞。",
    "image": "泽上有水，节。君子以制数度，议德行。",
    "linesInterpret": [
      "初九：不出户庭，无咎",
      "九二：不出门庭，凶",
      "六三：不节若，则嗟若，无咎",
      "六四：安节，亨",
      "九五：甘节，吉；往有尚",
      "上六：苦节，贞凶，悔亡"
    ],
    "application": "适用于节制自律、把握分寸、适度行事等场景。"
  },
  {
    "id": 61,
    "name": "风泽中孚",
    "lines": "110011",
    "judgment": "豚鱼吉，利涉大川，利贞。",
    "image": "泽上有风，中孚。君子以议狱缓死。",
    "linesInterpret": [
      "初九：虞吉，有他不燕",
      "九二：鸣鹤在阴，其子和之，我有好爵，吾与尔靡之",
      "六三：得敌，或鼓或罢，或泣或歌",
      "六四：月几望，马匹亡，无咎",
      "九五：有孚挛如，无咎",
      "上九：翰音登于天，贞凶"
    ],
    "application": "适用于诚信待人、内心平和、处事公正等场景。"
  },
  {
    "id": 62,
    "name": "雷山小过",
    "lines": "001100",
    "judgment": "亨，利贞，可小事，不可大事。飞鸟遗之音，不宜上宜下，大吉。",
    "image": "山上有雷，小过。君子以行过乎恭，丧过乎哀，用过乎俭。",
    "linesInterpret": [
      "初六：飞鸟以凶",
      "六二：过其祖，遇其妣；不及其君，遇其臣；无咎",
      "九三：弗过防之，从或戕之，凶",
      "九四：无咎，弗过遇之。往厉必戒，勿用永贞",
      "六五：密云不雨，自我西郊，公弋取彼在穴",
      "上六：弗遇过之，飞鸟离之，凶，是谓灾眚"
    ],
    "application": "适用于谨慎行事、把握分寸、避免过失等场景。"
  },
  {
    "id": 63,
    "name": "水火既济",
    "lines": "101010",
    "judgment": "亨，小利贞，初吉终乱。",
    "image": "水在火上，既济。君子以思患而预防之。",
    "linesInterpret": [
      "初九：曳其轮，濡其尾，无咎",
      "六二：妇丧其茀，勿逐，七日得",
      "九三：高宗伐鬼方，三年克之，小人勿用",
      "六四：繻有衣袽，终日戒",
      "九五：东邻杀牛，不如西邻之禴祭，实受其福",
      "上六：濡其首，厉"
    ],
    "application": "适用于事业成功、居安思危、防患未然等场景。"
  },
  {
    "id": 64,
    "name": "火水未济",
    "lines": "101010",
    "judgment": "亨，小狐汔济，濡其尾，无攸利。",
    "image": "火在水上，未济。君子以慎辨物居方。",
    "linesInterpret": [
      "初六：濡其尾，吝",
      "九二：曳其轮，贞吉",
      "六三：未济，征凶，利涉大川",
      "九四：贞吉，悔亡，震用伐鬼方，三年有赏于大国",
      "六五：贞吉，无悔，君子之光，有孚，吉",
      "上九：有孚于饮酒，无咎，濡其首，有孚失是"
    ],
    "application": "适用于未竟事业、继续努力、把握时机等场景。"
  }
  // 其他62卦数据...
]

export default {
  data() {
    return {
      question: '',
      loading: false,
      result: null,
      animating: false,
      isFlipping: false,
      coinResults: [] // 添加硬币结果数组
    }
  },
  methods: {
    startDivination() {
      this.loading = true
      this.animating = true
      this.isFlipping = true
      this.result = null
      this.coinResults = [] // 重置硬币结果
      
      // 模拟硬币翻转动画
      setTimeout(() => {
        this.isFlipping = false
        
        // 生成硬币结果
        this.coinResults = Array.from({length: 3}, () => Math.random() > 0.5)
        
        // 延迟显示结果
        setTimeout(() => {
          this.animating = false
          
          try {
            // 1. 生成六爻
            const lines = Array.from({length:6}).map((_, position) => {
              const throws = Array.from({length:3}, () => 
                Math.random() > 0.5 ? 3 : 2 // 3=阳面，2=阴面
              )
              const sum = throws.reduce((a,b) => a + b)
              
              return {
                value: sum, // 6=老阴 7=少阳 8=少阴 9=老阳
                isChanging: [6,9].includes(sum),
                position: position + 1
              }
            })

            // 2. 确定本卦和变卦
            const original = this.getHexagram(lines.map(l => l.value <=7 ? 0 :1))
            const changed = this.getHexagram(lines.map(l => 
              l.isChanging ? 1 - (l.value <=7 ? 0 :1) : (l.value <=7 ? 0 :1)
            ))

            // 3. 获取卦辞
            this.result = {
              original: hexagramDict[original],
              changed: hexagramDict[changed],
              changingLines: lines.filter(l => l.isChanging).map(l => l.position)
            }

            // 保存历史记录
            this.saveHistory()
            
            uni.showToast({
              title: '占卜成功',
              icon: 'success'
            })
          } catch (error) {
            console.error('占卜失败：', error)
            uni.showToast({
              title: '占卜失败：' + error.message,
              icon: 'none',
              duration: 3000
            })
          } finally {
            this.loading = false
          }
        }, 1000)
      }, 2000)
    },
    
    // 二进制转卦序（示例：111000 -> 乾下坤上）
    getHexagram(binaryArr) {
      const trigrams = [
        '111', '110', '101', '100', 
        '011', '010', '001', '000'
      ]
      const lower = trigrams.indexOf(binaryArr.slice(3).join(''))
      const upper = trigrams.indexOf(binaryArr.slice(0,3).join(''))
      return lower * 8 + upper
    },
    
    lineClass(line, idx) {
      return {
        yin: line === '0',
        yang: line === '1',
        changing: this.result?.changingLines?.includes(6 - idx)
      }
    },
    
    saveHistory() {
      try {
        // 保存到本地存储
        const history = uni.getStorageSync('divinationHistory') || []
        history.unshift({
          question: this.question,
          result: this.result,
          time: Date.now()
        })
        // 只保留最近10条记录
        uni.setStorageSync('divinationHistory', history.slice(0, 10))
      } catch (error) {
        console.error('保存历史记录失败：', error)
      }
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.question-input {
  margin-bottom: 20px;
}

.question-input textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.coin-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.coin {
  width: 60px;
  height: 60px;
  position: relative;
}

.coin-face {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.coin-face.flip {
  animation: flip 1s ease-in-out infinite;
}

.coin-front, .coin-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 20px;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.coin-front {
  background-color: #d32f2f;
  transform: rotateY(0deg);
}

.coin-back {
  background-color: #1976d2;
  transform: rotateY(180deg);
}

@keyframes flip {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.hexagram {
  margin: 20px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.line {
  height: 30px;
  margin: 5px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.yang {
  background-color: #d32f2f;
  color: white;
}

.yin {
  background-color: #1976d2;
  color: white;
}

.changing-mark {
  position: absolute;
  right: 5px;
  top: 5px;
  color: white;
}

.divination-btn {
  margin: 20px 0;
  background-color: #4CAF50;
  color: white;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.result-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.result-content {
  margin-bottom: 15px;
}

.result-content text {
  display: block;
  margin-bottom: 5px;
}

.lines-interpret {
  margin-top: 15px;
}

.interpret-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.interpret-item {
  margin-bottom: 5px;
  opacity: 0;
  transform: translateX(20px);
  animation: slideIn 0.5s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.application {
  margin-top: 15px;
}

.application-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.coin-result {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.result-explanation {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
}

.result-explanation text {
  display: block;
  margin: 5px 0;
  color: #666;
}

.result-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.hexagram-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.hexagram-name {
  text-align: center;
  margin-bottom: 20px;
}

.hexagram-name text {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
}

.hexagram-judgment,
.hexagram-image,
.hexagram-advice,
.changing-lines {
  margin: 15px 0;
}

.title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: #666;
  margin-bottom: 8px;
}

.content {
  display: block;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  text-indent: 2em;
}
</style> 