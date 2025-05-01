// 周易占卜工具类
class IChing {
  constructor() {
    // 八卦对应数字
    this.baguaMap = {
      1: '乾', 2: '兑', 3: '离', 4: '震',
      5: '巽', 6: '坎', 7: '艮', 8: '坤'
    };
    
    // 卦象解释
    this.guaExplanation = {
      '乾': '天行健，君子以自强不息',
      '兑': '泽上有水，君子以朋友讲习',
      '离': '明两作，大人以继明照于四方',
      '震': '洊雷，君子以恐惧修省',
      '巽': '随风，君子以申命行事',
      '坎': '水洊至，君子以常德行，习教事',
      '艮': '兼山，君子以思不出其位',
      '坤': '地势坤，君子以厚德载物'
    };
  }

  // 三枚铜钱起卦
  castCoins() {
    const results = [];
    for (let i = 0; i < 6; i++) {
      let sum = 0;
      for (let j = 0; j < 3; j++) {
        // 0表示阴，1表示阳
        sum += Math.random() > 0.5 ? 1 : 0;
      }
      // 2或3个阳面为阳爻，0或1个阳面为阴爻
      results.push(sum >= 2 ? 1 : 0);
    }
    return results;
  }

  // 生成卦象
  generateGua() {
    const yao = this.castCoins();
    const upperGua = this.baguaMap[this.calculateGuaNumber(yao.slice(0, 3))];
    const lowerGua = this.baguaMap[this.calculateGuaNumber(yao.slice(3))];
    return {
      upperGua,
      lowerGua,
      yao,
      explanation: this.guaExplanation[upperGua] + '；' + this.guaExplanation[lowerGua]
    };
  }

  // 计算卦数
  calculateGuaNumber(yao) {
    let number = 0;
    for (let i = 0; i < 3; i++) {
      if (yao[i] === 1) {
        number += Math.pow(2, i);
      }
    }
    return number + 1;
  }

  // 获取变爻
  getChangingYao(yao) {
    const changingYao = [];
    for (let i = 0; i < 6; i++) {
      if (Math.random() < 0.3) { // 30%的概率出现变爻
        changingYao.push(i);
      }
    }
    return changingYao;
  }
}

export default new IChing(); 