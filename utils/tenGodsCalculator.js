// 天干十神映射表
const TEN_GODS_MAP = {
    '甲': {
        '甲': { type: '比肩', value: '同我', yinYang: '同' },
        '乙': { type: '劫财', value: '同我', yinYang: '异' },
        '丙': { type: '食神', value: '我生', yinYang: '同' },
        '丁': { type: '伤官', value: '我生', yinYang: '异' },
        '戊': { type: '偏财', value: '我克', yinYang: '同' },
        '己': { type: '正财', value: '我克', yinYang: '异' },
        '庚': { type: '七杀', value: '克我', yinYang: '同' },
        '辛': { type: '正官', value: '克我', yinYang: '异' },
        '壬': { type: '偏印', value: '生我', yinYang: '同' },
        '癸': { type: '正印', value: '生我', yinYang: '异' }
    },
    '乙': {
        '甲': { type: '劫财', value: '同我', yinYang: '异' },
        '乙': { type: '比肩', value: '同我', yinYang: '同' },
        '丙': { type: '伤官', value: '我生', yinYang: '异' },
        '丁': { type: '食神', value: '我生', yinYang: '同' },
        '戊': { type: '正财', value: '我克', yinYang: '异' },
        '己': { type: '偏财', value: '我克', yinYang: '同' },
        '庚': { type: '正官', value: '克我', yinYang: '异' },
        '辛': { type: '七杀', value: '克我', yinYang: '同' },
        '壬': { type: '正印', value: '生我', yinYang: '异' },
        '癸': { type: '偏印', value: '生我', yinYang: '同' }
    },
    '丙': {
        '甲': { type: '偏印', value: '生我', yinYang: '同' },
        '乙': { type: '正印', value: '生我', yinYang: '异' },
        '丙': { type: '比肩', value: '同我', yinYang: '同' },
        '丁': { type: '劫财', value: '同我', yinYang: '异' },
        '戊': { type: '食神', value: '我生', yinYang: '同' },
        '己': { type: '伤官', value: '我生', yinYang: '异' },
        '庚': { type: '偏财', value: '我克', yinYang: '同' },
        '辛': { type: '正财', value: '我克', yinYang: '异' },
        '壬': { type: '七杀', value: '克我', yinYang: '同' },
        '癸': { type: '正官', value: '克我', yinYang: '异' }
    },
    '丁': {
        '甲': { type: '正印', value: '生我', yinYang: '异' },
        '乙': { type: '偏印', value: '生我', yinYang: '同' },
        '丙': { type: '劫财', value: '同我', yinYang: '异' },
        '丁': { type: '比肩', value: '同我', yinYang: '同' },
        '戊': { type: '伤官', value: '我生', yinYang: '异' },
        '己': { type: '食神', value: '我生', yinYang: '同' },
        '庚': { type: '正财', value: '我克', yinYang: '异' },
        '辛': { type: '偏财', value: '我克', yinYang: '同' },
        '壬': { type: '正官', value: '克我', yinYang: '异' },
        '癸': { type: '七杀', value: '克我', yinYang: '同' }
    },
    '戊': {
        '甲': { type: '七杀', value: '克我', yinYang: '同' },
        '乙': { type: '正官', value: '克我', yinYang: '异' },
        '丙': { type: '偏印', value: '生我', yinYang: '同' },
        '丁': { type: '正印', value: '生我', yinYang: '异' },
        '戊': { type: '比肩', value: '同我', yinYang: '同' },
        '己': { type: '劫财', value: '同我', yinYang: '异' },
        '庚': { type: '食神', value: '我生', yinYang: '同' },
        '辛': { type: '伤官', value: '我生', yinYang: '异' },
        '壬': { type: '偏财', value: '我克', yinYang: '同' },
        '癸': { type: '正财', value: '我克', yinYang: '异' }
    },
    '己': {
        '甲': { type: '正官', value: '克我', yinYang: '异' },
        '乙': { type: '七杀', value: '克我', yinYang: '同' },
        '丙': { type: '正印', value: '生我', yinYang: '异' },
        '丁': { type: '偏印', value: '生我', yinYang: '同' },
        '戊': { type: '劫财', value: '同我', yinYang: '异' },
        '己': { type: '比肩', value: '同我', yinYang: '同' },
        '庚': { type: '伤官', value: '我生', yinYang: '异' },
        '辛': { type: '食神', value: '我生', yinYang: '同' },
        '壬': { type: '正财', value: '我克', yinYang: '异' },
        '癸': { type: '偏财', value: '我克', yinYang: '同' }
    },
    '庚': {
        '甲': { type: '偏财', value: '我克', yinYang: '同' },
        '乙': { type: '正财', value: '我克', yinYang: '异' },
        '丙': { type: '七杀', value: '克我', yinYang: '同' },
        '丁': { type: '正官', value: '克我', yinYang: '异' },
        '戊': { type: '偏印', value: '生我', yinYang: '同' },
        '己': { type: '正印', value: '生我', yinYang: '异' },
        '庚': { type: '比肩', value: '同我', yinYang: '同' },
        '辛': { type: '劫财', value: '同我', yinYang: '异' },
        '壬': { type: '食神', value: '我生', yinYang: '同' },
        '癸': { type: '伤官', value: '我生', yinYang: '异' }
    },
    '辛': {
        '甲': { type: '正财', value: '我克', yinYang: '异' },
        '乙': { type: '偏财', value: '我克', yinYang: '同' },
        '丙': { type: '正官', value: '克我', yinYang: '异' },
        '丁': { type: '七杀', value: '克我', yinYang: '同' },
        '戊': { type: '正印', value: '生我', yinYang: '异' },
        '己': { type: '偏印', value: '生我', yinYang: '同' },
        '庚': { type: '劫财', value: '同我', yinYang: '异' },
        '辛': { type: '比肩', value: '同我', yinYang: '同' },
        '壬': { type: '伤官', value: '我生', yinYang: '异' },
        '癸': { type: '食神', value: '我生', yinYang: '同' }
    },
    '壬': {
        '甲': { type: '食神', value: '我生', yinYang: '同' },
        '乙': { type: '伤官', value: '我生', yinYang: '异' },
        '丙': { type: '偏财', value: '我克', yinYang: '同' },
        '丁': { type: '正财', value: '我克', yinYang: '异' },
        '戊': { type: '七杀', value: '克我', yinYang: '同' },
        '己': { type: '正官', value: '克我', yinYang: '异' },
        '庚': { type: '偏印', value: '生我', yinYang: '同' },
        '辛': { type: '正印', value: '生我', yinYang: '异' },
        '壬': { type: '比肩', value: '同我', yinYang: '同' },
        '癸': { type: '劫财', value: '同我', yinYang: '异' }
    },
    '癸': {
        '甲': { type: '伤官', value: '我生', yinYang: '异' },
        '乙': { type: '食神', value: '我生', yinYang: '同' },
        '丙': { type: '正财', value: '我克', yinYang: '异' },
        '丁': { type: '偏财', value: '我克', yinYang: '同' },
        '戊': { type: '正官', value: '克我', yinYang: '异' },
        '己': { type: '七杀', value: '克我', yinYang: '同' },
        '庚': { type: '正印', value: '生我', yinYang: '异' },
        '辛': { type: '偏印', value: '生我', yinYang: '同' },
        '壬': { type: '劫财', value: '同我', yinYang: '异' },
        '癸': { type: '比肩', value: '同我', yinYang: '同' }
    }
}

// 地支藏干表
const HIDDEN_GANS = {
    '子': [{ gan: '癸', weight: 1.0 }],
    '丑': [{ gan: '己', weight: 0.6 }, { gan: '癸', weight: 0.3 }, { gan: '辛', weight: 0.1 }],
    '寅': [{ gan: '甲', weight: 0.6 }, { gan: '丙', weight: 0.3 }, { gan: '戊', weight: 0.1 }],
    '卯': [{ gan: '乙', weight: 1.0 }],
    '辰': [{ gan: '戊', weight: 0.6 }, { gan: '乙', weight: 0.3 }, { gan: '癸', weight: 0.1 }],
    '巳': [{ gan: '丙', weight: 0.6 }, { gan: '戊', weight: 0.3 }, { gan: '庚', weight: 0.1 }],
    '午': [{ gan: '丁', weight: 0.7 }, { gan: '己', weight: 0.3 }],
    '未': [{ gan: '己', weight: 0.6 }, { gan: '丁', weight: 0.3 }, { gan: '乙', weight: 0.1 }],
    '申': [{ gan: '庚', weight: 0.6 }, { gan: '壬', weight: 0.3 }, { gan: '戊', weight: 0.1 }],
    '酉': [{ gan: '辛', weight: 1.0 }],
    '戌': [{ gan: '戊', weight: 0.6 }, { gan: '辛', weight: 0.3 }, { gan: '丁', weight: 0.1 }],
    '亥': [{ gan: '壬', weight: 0.7 }, { gan: '甲', weight: 0.3 }]
}

// 十神组合分析规则
const COMBINATION_RULES = {
    '官杀混杂': {
        check: (gods) => gods.includes('正官') && gods.includes('七杀'),
        score: 0.6,
        desc: '正官与七杀并存，容易决策犹豫'
    },
    '食神制杀': {
        check: (gods) => gods.filter(g => g === '七杀').length > 0 && gods.filter(g => g === '食神').length >= 2,
        score: 0.8,
        desc: '食神制杀，化解压力能力强'
    },
    '伤官见官': {
        check: (gods) => gods.includes('伤官') && gods.includes('正官'),
        score: 0.5,
        desc: '伤官见官，容易与上级产生矛盾'
    },
    '财星生官': {
        check: (gods) => gods.includes('正财') && gods.includes('正官'),
        score: 0.9,
        desc: '财星生官，事业财运俱佳'
    },
    '印星护身': {
        check: (gods) => gods.includes('正印') && gods.filter(g => g === '正印').length >= 2,
        score: 0.7,
        desc: '印星护身，贵人运强'
    }
}

// 十神权重系数
const GOD_WEIGHTS = {
    '正官': 1.2,
    '七杀': 1.5,
    '正印': 1.1,
    '偏印': 0.9,
    '比肩': 1.0,
    '劫财': 1.3,
    '食神': 0.8,
    '伤官': 1.0,
    '正财': 1.2,
    '偏财': 1.0
}

// 天干表
const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
// 地支表
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
// 天干五行
const GAN_WUXING = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
}
// 地支五行
const ZHI_WUXING = {
    '子': '水', '丑': '土',
    '寅': '木', '卯': '木',
    '辰': '土', '巳': '火',
    '午': '火', '未': '土',
    '申': '金', '酉': '金',
    '戌': '土', '亥': '水'
}

// 计算八字
function calculatePillars(year, month, day, hour) {
    // 计算年柱
    const yearGan = GAN[(year - 4) % 10]
    const yearZhi = ZHI[(year - 4) % 12]
    
    // 计算月柱
    const monthGan = GAN[(year * 2 + month) % 10]
    const monthZhi = ZHI[(month + 1) % 12]
    
    // 计算日柱
    const dayGan = GAN[(day * 2 + 5) % 10]
    const dayZhi = ZHI[(day + 3) % 12]
    
    // 计算时柱
    const dayGanIndex = GAN.indexOf(dayGan)
    const hourGan = GAN[(hour * 2 + dayGanIndex) % 10]
    const hourZhi = ZHI[Math.floor(hour / 2) % 12]
    
    return {
        dayGan,
        dayZhi,
        pillars: [
            { gan: yearGan, zhi: yearZhi },
            { gan: monthGan, zhi: monthZhi },
            { gan: dayGan, zhi: dayZhi },
            { gan: hourGan, zhi: hourZhi }
        ]
    }
}

// 计算天干十神
function calculateTenGods(birthDate) {
    // 解析生日
    const date = new Date(birthDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    
    // 计算八字
    const { dayGan, dayZhi, pillars } = calculatePillars(year, month, day, hour)
    
    // 计算天干十神
    const gods = pillars.map(pillar => {
        const god = TEN_GODS_MAP[dayGan][pillar.gan]
        return {
            name: pillar.gan,
            value: god.value,
            type: god.type
        }
    })
    
    // 计算地支藏干
    const branches = pillars.map(pillar => {
        const hiddenGans = HIDDEN_GANS[pillar.zhi]
        const gods = hiddenGans.map(hidden => {
            const god = TEN_GODS_MAP[dayGan][hidden.gan]
            return {
                name: god.type,
                weight: hidden.weight
            }
        })
        return {
            name: pillar.zhi,
            gods: gods
        }
    })
    
    // 计算十神组合
    const allGods = gods.map(g => g.type).concat(
        branches.flatMap(b => b.gods.map(g => g.name))
    )
    
    const combinations = Object.entries(COMBINATION_RULES)
        .filter(([_, rule]) => rule.check(allGods))
        .map(([name, rule]) => ({
            name: name,
            desc: rule.desc,
            score: Math.floor(rule.score * 100)
        }))
    
    // 计算十神力量
    const godStrengths = {}
    allGods.forEach(god => {
        godStrengths[god] = (godStrengths[god] || 0) + GOD_WEIGHTS[god]
    })
    
    // 生成报告
    const report = {
        summary: `您的日主为${dayGan}，主要十神为${Object.entries(godStrengths)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([god]) => god)
            .join('、')}。`,
        details: {
            dominant: Object.entries(godStrengths)
                .sort((a, b) => b[1] - a[1])
                .map(([god, strength]) => `${god}(${strength.toFixed(1)})`)
                .join('、'),
            strength: Object.entries(godStrengths)
                .sort((a, b) => b[1] - a[1])
                .map(([god, strength]) => {
                    const total = Object.values(godStrengths).reduce((a, b) => a + b, 0)
                    const percentage = (strength / total * 100).toFixed(1)
                    return `${god}: ${percentage}%`
                })
                .join('\n')
        },
        conclusion: '综合分析显示...'
    }
    
    return {
        gods,
        branches,
        combinations,
        report
    }
}

export { calculateTenGods } 