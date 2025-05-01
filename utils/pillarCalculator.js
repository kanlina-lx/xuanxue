// 天干地支对照表
const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 五行属性对照表
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

// 计算年柱
function calculateYearPillar(year) {
    const yearOffset = year - 4 // 以甲子年为基准
    const ganIndex = yearOffset % 10
    const zhiIndex = yearOffset % 12
    return {
        name: '年柱',
        time: year + '年',
        value: GAN[ganIndex] + ZHI[zhiIndex],
        element: ELEMENT_MAP[GAN[ganIndex]] + ELEMENT_MAP[ZHI[zhiIndex]]
    }
}

// 计算月柱
function calculateMonthPillar(year, month) {
    const yearGan = GAN[(year - 4) % 10]
    let monthGanIndex = 0
    
    // 根据年干确定月干
    switch(yearGan) {
        case '甲':
        case '己':
            monthGanIndex = 2
            break
        case '乙':
        case '庚':
            monthGanIndex = 4
            break
        case '丙':
        case '辛':
            monthGanIndex = 6
            break
        case '丁':
        case '壬':
            monthGanIndex = 8
            break
        case '戊':
        case '癸':
            monthGanIndex = 0
            break
    }
    
    const monthZhiIndex = (month + 1) % 12
    return {
        name: '月柱',
        time: month + '月',
        value: GAN[monthGanIndex] + ZHI[monthZhiIndex],
        element: ELEMENT_MAP[GAN[monthGanIndex]] + ELEMENT_MAP[ZHI[monthZhiIndex]]
    }
}

// 计算日柱
function calculateDayPillar(date) {
    // 使用蔡勒公式计算日干支
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    let c = Math.floor(year / 100)
    let y = year % 100
    let m = month
    if (m <= 2) {
        m += 12
        y--
    }
    
    const w = (y + Math.floor(y / 4) + Math.floor(c / 4) - 2 * c + Math.floor(26 * (m + 1) / 10) + day - 1) % 60
    const ganIndex = w % 10
    const zhiIndex = w % 12
    
    return {
        name: '日柱',
        time: day + '日',
        value: GAN[ganIndex] + ZHI[zhiIndex],
        element: ELEMENT_MAP[GAN[ganIndex]] + ELEMENT_MAP[ZHI[zhiIndex]]
    }
}

// 计算时柱
function calculateHourPillar(hour) {
    const dayGan = GAN[0] // 假设日干为甲
    let hourGanIndex = 0
    
    // 根据日干确定时干
    switch(dayGan) {
        case '甲':
        case '己':
            hourGanIndex = 0
            break
        case '乙':
        case '庚':
            hourGanIndex = 2
            break
        case '丙':
        case '辛':
            hourGanIndex = 4
            break
        case '丁':
        case '壬':
            hourGanIndex = 6
            break
        case '戊':
        case '癸':
            hourGanIndex = 8
            break
    }
    
    const hourZhiIndex = Math.floor((hour + 1) / 2) % 12
    return {
        name: '时柱',
        time: hour + '时',
        value: GAN[hourGanIndex] + ZHI[hourZhiIndex],
        element: ELEMENT_MAP[GAN[hourGanIndex]] + ELEMENT_MAP[ZHI[hourZhiIndex]]
    }
}

// 计算五行属性
function calculateElements(pillars) {
    const elementCount = {
        '木': 0,
        '火': 0,
        '土': 0,
        '金': 0,
        '水': 0
    }
    
    // 统计五行出现次数
    pillars.forEach(pillar => {
        const elements = pillar.element.split('')
        elements.forEach(element => {
            elementCount[element]++
        })
    })
    
    // 计算百分比
    const total = Object.values(elementCount).reduce((a, b) => a + b, 0)
    return Object.entries(elementCount).map(([name, count]) => ({
        name,
        value: Math.round((count / total) * 100),
        color: getElementColor(name)
    }))
}

// 获取五行颜色
function getElementColor(element) {
    const colorMap = {
        '木': '#4CAF50',
        '火': '#F44336',
        '土': '#795548',
        '金': '#FFC107',
        '水': '#2196F3'
    }
    return colorMap[element]
}

// 主函数
export function calculatePillars(birthDate, birthTime) {
    const date = new Date(birthDate)
    const [hour, minute] = birthTime.split(':').map(Number)
    
    const yearPillar = calculateYearPillar(date.getFullYear())
    const monthPillar = calculateMonthPillar(date.getFullYear(), date.getMonth() + 1)
    const dayPillar = calculateDayPillar(date)
    const hourPillar = calculateHourPillar(hour)
    
    const pillars = [yearPillar, monthPillar, dayPillar, hourPillar]
    const elements = calculateElements(pillars)
    
    return {
        pillars,
        elements
    }
} 