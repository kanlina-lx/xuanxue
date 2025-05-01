// 天干地支定义
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 五行属性
const ELEMENT_MAP = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水',
    '子': '水', '丑': '土',
    '寅': '木', '卯': '木',
    '辰': '土', '巳': '火',
    '午': '火', '未': '土',
    '申': '金', '酉': '金',
    '戌': '土', '亥': '水'
}

// 地支藏干
const HIDDEN_STEMS = {
    '子': ['癸'],
    '丑': ['己', '癸', '辛'],
    '寅': ['甲', '丙', '戊'],
    '卯': ['乙'],
    '辰': ['戊', '乙', '癸'],
    '巳': ['丙', '戊', '庚'],
    '午': ['丁', '己'],
    '未': ['己', '丁', '乙'],
    '申': ['庚', '壬', '戊'],
    '酉': ['辛'],
    '戌': ['戊', '辛', '丁'],
    '亥': ['壬', '甲']
}

// 计算年柱
function calculateYearPillar(year) {
    const yearIndex = (year - 4) % 60
    const tianGanIndex = yearIndex % 10
    const diZhiIndex = yearIndex % 12
    return {
        name: '年柱',
        value: TIANGAN[tianGanIndex] + DIZHI[diZhiIndex],
        element: ELEMENT_MAP[TIANGAN[tianGanIndex]]
    }
}

// 计算月柱
function calculateMonthPillar(year, month) {
    const yearIndex = (year - 4) % 60
    const monthIndex = (yearIndex * 12 + month - 1) % 60
    const tianGanIndex = monthIndex % 10
    const diZhiIndex = monthIndex % 12
    return {
        name: '月柱',
        value: TIANGAN[tianGanIndex] + DIZHI[diZhiIndex],
        element: ELEMENT_MAP[TIANGAN[tianGanIndex]]
    }
}

// 计算日柱
function calculateDayPillar(date) {
    const baseDate = new Date(1900, 0, 31)
    const days = Math.floor((date - baseDate) / (24 * 60 * 60 * 1000))
    const dayIndex = days % 60
    const tianGanIndex = dayIndex % 10
    const diZhiIndex = dayIndex % 12
    return {
        name: '日柱',
        value: TIANGAN[tianGanIndex] + DIZHI[diZhiIndex],
        element: ELEMENT_MAP[TIANGAN[tianGanIndex]]
    }
}

// 计算时柱
function calculateHourPillar(hour) {
    const hourIndex = Math.floor((hour + 1) / 2) % 12
    const diZhiIndex = hourIndex
    const tianGanIndex = (hourIndex * 2) % 10
    return {
        name: '时柱',
        value: TIANGAN[tianGanIndex] + DIZHI[diZhiIndex],
        element: ELEMENT_MAP[TIANGAN[tianGanIndex]]
    }
}

// 计算五行分布
function calculateElements(pillars) {
    const elements = {
        '木': 0,
        '火': 0,
        '土': 0,
        '金': 0,
        '水': 0
    }
    
    pillars.forEach(pillar => {
        // 主气计算
        elements[ELEMENT_MAP[pillar.value[0]]] += 1.5
        
        // 地支藏干计算
        const hiddenStems = HIDDEN_STEMS[pillar.value[1]]
        hiddenStems.forEach(stem => {
            elements[ELEMENT_MAP[stem]] += 0.3
        })
    })
    
    return elements
}

// 计算用户命盘
function calculateUserChart(birthDate) {
    const year = birthDate.getFullYear()
    const month = birthDate.getMonth() + 1
    const day = birthDate.getDate()
    const hour = birthDate.getHours()
    
    // 计算用户四柱
    const userPillars = [
        calculateYearPillar(year),
        calculateMonthPillar(year, month),
        calculateDayPillar(birthDate),
        calculateHourPillar(hour)
    ]
    
    // 计算用户五行
    const userElements = calculateElements(userPillars)
    
    return {
        pillars: userPillars,
        elements: userElements
    }
}

// 计算今日运势
function calculateDailyFortune(pillars, elements, userChart) {
    const fortune = {
        overall: '',
        career: '',
        wealth: '',
        love: '',
        health: ''
    }
    
    // 计算今日五行与用户五行的关系
    const elementRelations = {}
    Object.keys(elements).forEach(element => {
        elementRelations[element] = elements[element] * 0.7 + userChart.elements[element] * 0.3
    })
    
    // 根据五行关系判断运势
    const maxElement = Object.entries(elementRelations).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    const minElement = Object.entries(elementRelations).reduce((a, b) => a[1] < b[1] ? a : b)[0]
    
    // 生成运势分析
    fortune.overall = `今日${maxElement}气旺盛，${minElement}气较弱，整体运势${maxElement === '木' || maxElement === '火' ? '向上' : '平稳'}。`
    
    // 事业运势
    if (maxElement === '木' || maxElement === '火') {
        fortune.career = '事业方面有新的发展机会，宜主动把握，展现才能。'
    } else if (maxElement === '金' || maxElement === '水') {
        fortune.career = '事业运势平稳，宜稳扎稳打，不宜冒进。'
    } else {
        fortune.career = '事业运势一般，宜守不宜攻，等待时机。'
    }
    
    // 财运分析
    if (maxElement === '金' || maxElement === '水') {
        fortune.wealth = '财运亨通，投资理财有利，但需谨慎选择。'
    } else if (maxElement === '木' || maxElement === '火') {
        fortune.wealth = '财运平稳，宜稳健投资，不宜投机。'
    } else {
        fortune.wealth = '财运一般，宜守财为主，不宜大额投资。'
    }
    
    // 感情运势
    if (maxElement === '火' || maxElement === '水') {
        fortune.love = '感情运势活跃，单身者有机会遇到心仪对象。'
    } else {
        fortune.love = '感情运势平稳，宜多沟通交流，增进感情。'
    }
    
    // 健康建议
    if (maxElement === '木' || maxElement === '火') {
        fortune.health = '健康状态良好，但需注意作息规律，适当运动。'
    } else if (maxElement === '金' || maxElement === '水') {
        fortune.health = '健康状态一般，需注意保暖，避免受凉。'
    } else {
        fortune.health = '健康状态平稳，注意饮食规律，保持良好作息。'
    }
    
    return fortune
}

// 主函数
export function calculateFortune(date, userBirthDate) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    
    // 计算今日四柱
    const pillars = [
        calculateYearPillar(year),
        calculateMonthPillar(year, month),
        calculateDayPillar(date),
        calculateHourPillar(hour)
    ]
    
    // 计算今日五行分布
    const elements = calculateElements(pillars)
    
    // 计算用户命盘
    const userChart = calculateUserChart(new Date(userBirthDate))
    
    // 计算运势
    const fortune = calculateDailyFortune(pillars, elements, userChart)
    
    return {
        pillars,
        elements,
        fortune,
        userChart
    }
} 