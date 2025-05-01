const hexagramDict = require('./hexagram-data.json') // 卦象数据

exports.main = async (event) => {
  const { action, originalId, changedId } = event;
  
  if (action === 'getHexagram') {
    // 直接返回卦象数据
    return {
      original: hexagramDict.find(h => h.id === originalId) || hexagramDict[0],
      changed: hexagramDict.find(h => h.id === changedId) || hexagramDict[0]
    };
  }

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
  const original = getHexagram(lines.map(l => l.value <=7 ? 0 :1))
  const changed = getHexagram(lines.map(l => 
    l.isChanging ? 1 - (l.value <=7 ? 0 :1) : (l.value <=7 ? 0 :1)
  ))

  // 3. 获取卦辞
  return {
    original: hexagramDict.find(h => h.id === original) || hexagramDict[0],
    changed: hexagramDict.find(h => h.id === changed) || hexagramDict[0],
    changingLines: lines.filter(l => l.isChanging).map(l => l.position)
  }
}

// 二进制转卦序（示例：111000 -> 乾下坤上）
function getHexagram(binaryArr) {
  const trigrams = [
    '111', '110', '101', '100', 
    '011', '010', '001', '000'
  ]
  const lower = trigrams.indexOf(binaryArr.slice(3).join(''))
  const upper = trigrams.indexOf(binaryArr.slice(0,3).join(''))
  return lower * 8 + upper
} 