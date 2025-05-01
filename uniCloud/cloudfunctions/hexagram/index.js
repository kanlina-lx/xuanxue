const hexagramDict = require('./hexagram-data.json') // 卦象数据

exports.main = async (event, context) => {
  try {
    console.log('收到占卜请求：', event)
    
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

    console.log('生成的六爻：', lines)

    // 2. 确定本卦和变卦
    const original = getHexagram(lines.map(l => l.value <=7 ? 0 :1))
    const changed = getHexagram(lines.map(l => 
      l.isChanging ? 1 - (l.value <=7 ? 0 :1) : (l.value <=7 ? 0 :1)
    ))

    console.log('本卦索引：', original)
    console.log('变卦索引：', changed)

    // 3. 获取卦辞
    const result = {
      original: hexagramDict[original],
      changed: hexagramDict[changed],
      changingLines: lines.filter(l => l.isChanging).map(l => l.position)
    }

    console.log('返回结果：', result)
    
    return result
  } catch (error) {
    console.error('占卜计算错误：', error)
    throw error
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