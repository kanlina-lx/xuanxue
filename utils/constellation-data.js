// 星座日期范围
export const constellationRanges = [
    { name: '白羊座', start: '03-21', end: '04-19' },
    { name: '金牛座', start: '04-20', end: '05-20' },
    { name: '双子座', start: '05-21', end: '06-21' },
    { name: '巨蟹座', start: '06-22', end: '07-22' },
    { name: '狮子座', start: '07-23', end: '08-22' },
    { name: '处女座', start: '08-23', end: '09-22' },
    { name: '天秤座', start: '09-23', end: '10-23' },
    { name: '天蝎座', start: '10-24', end: '11-22' },
    { name: '射手座', start: '11-23', end: '12-21' },
    { name: '摩羯座', start: '12-22', end: '01-19' },
    { name: '水瓶座', start: '01-20', end: '02-18' },
    { name: '双鱼座', start: '02-19', end: '03-20' }
];

// 行星位置数据（每月）
export const planetPositions = {
    '01': { sun: 280, moon: 45, mercury: 290, venus: 300, mars: 310 },
    '02': { sun: 310, moon: 75, mercury: 320, venus: 330, mars: 340 },
    '03': { sun: 340, moon: 105, mercury: 350, venus: 0, mars: 10 },
    '04': { sun: 10, moon: 135, mercury: 20, venus: 30, mars: 40 },
    '05': { sun: 40, moon: 165, mercury: 50, venus: 60, mars: 70 },
    '06': { sun: 70, moon: 195, mercury: 80, venus: 90, mars: 100 },
    '07': { sun: 100, moon: 225, mercury: 110, venus: 120, mars: 130 },
    '08': { sun: 130, moon: 255, mercury: 140, venus: 150, mars: 160 },
    '09': { sun: 160, moon: 285, mercury: 170, venus: 180, mars: 190 },
    '10': { sun: 190, moon: 315, mercury: 200, venus: 210, mars: 220 },
    '11': { sun: 220, moon: 345, mercury: 230, venus: 240, mars: 250 },
    '12': { sun: 250, moon: 15, mercury: 260, venus: 270, mars: 280 }
};

// 相位影响系数
export const aspectInfluences = {
    'conjunction': { // 合相
        overall: 1.2,
        love: 1.3,
        career: 1.1,
        wealth: 1.2,
        health: 1.1
    },
    'opposition': { // 冲相
        overall: 0.8,
        love: 0.7,
        career: 0.9,
        wealth: 0.8,
        health: 0.9
    },
    'trine': { // 三分相
        overall: 1.1,
        love: 1.2,
        career: 1.1,
        wealth: 1.1,
        health: 1.2
    },
    'square': { // 四分相
        overall: 0.9,
        love: 0.8,
        career: 0.9,
        wealth: 0.9,
        health: 0.8
    }
};

// 运势建议模板
export const fortuneTemplates = {
    overall: [
        '整体运势平稳，适合按部就班',
        '运势有所提升，可以尝试新事物',
        '运势旺盛，把握机会大展宏图',
        '运势波动较大，需要谨慎行事',
        '运势低迷，建议韬光养晦'
    ],
    love: [
        '感情运势平淡，需要多沟通',
        '感情运势上升，适合表达心意',
        '桃花运旺盛，可能遇到心动对象',
        '感情容易产生误会，需要耐心',
        '感情运势低迷，建议保持距离'
    ],
    career: [
        '事业运势平稳，适合积累经验',
        '事业有新的机会，可以尝试突破',
        '事业运势旺盛，适合大展拳脚',
        '事业遇到阻碍，需要谨慎应对',
        '事业运势低迷，建议稳扎稳打'
    ],
    wealth: [
        '财运一般，建议理性消费',
        '财运有所提升，可以适当投资',
        '财运旺盛，适合把握机会',
        '财运波动较大，需要谨慎理财',
        '财运低迷，建议保守理财'
    ],
    health: [
        '健康状况良好，注意作息规律',
        '健康运势上升，适合锻炼身体',
        '精力充沛，适合开展新计划',
        '容易疲劳，需要注意休息',
        '健康运势低迷，建议多休息'
    ]
};

// 计算相位关系
export function calculateAspect(planet1, planet2) {
    const diff = Math.abs(planet1 - planet2);
    const aspect = diff > 180 ? 360 - diff : diff;
    
    if (aspect <= 10) return 'conjunction';
    if (aspect >= 170 && aspect <= 190) return 'opposition';
    if (aspect >= 110 && aspect <= 130) return 'trine';
    if (aspect >= 80 && aspect <= 100) return 'square';
    return null;
}

// 生成运势数据
export function generateFortune(constellation, date = new Date()) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const positions = planetPositions[month];
    
    // 计算太阳-月亮相位
    const sunMoonAspect = calculateAspect(positions.sun, positions.moon);
    const aspectInfluence = sunMoonAspect ? aspectInfluences[sunMoonAspect] : aspectInfluences.conjunction;
    
    // 生成运势评分（1-5分）
    const scores = {
        overall: Math.floor(Math.random() * 3 + 2) * aspectInfluence.overall,
        love: Math.floor(Math.random() * 3 + 2) * aspectInfluence.love,
        career: Math.floor(Math.random() * 3 + 2) * aspectInfluence.career,
        wealth: Math.floor(Math.random() * 3 + 2) * aspectInfluence.wealth,
        health: Math.floor(Math.random() * 3 + 2) * aspectInfluence.health
    };
    
    // 根据评分选择建议
    const fortune = {
        overall: fortuneTemplates.overall[Math.floor(scores.overall) - 1],
        love: fortuneTemplates.love[Math.floor(scores.love) - 1],
        career: fortuneTemplates.career[Math.floor(scores.career) - 1],
        wealth: fortuneTemplates.wealth[Math.floor(scores.wealth) - 1],
        health: fortuneTemplates.health[Math.floor(scores.health) - 1],
        advice: generateAdvice(scores, sunMoonAspect)
    };
    
    return fortune;
}

// 生成综合建议
function generateAdvice(scores, aspect) {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5;
    let advice = '';
    
    if (totalScore >= 4) {
        advice = '今日运势旺盛，适合开展重要计划，把握机会。';
    } else if (totalScore >= 3) {
        advice = '运势平稳，可以按计划行事，注意细节。';
    } else {
        advice = '运势波动较大，建议谨慎行事，保持耐心。';
    }
    
    if (aspect === 'conjunction') {
        advice += ' 今日行星相位良好，适合与人合作。';
    } else if (aspect === 'opposition') {
        advice += ' 今日行星相位紧张，需要保持冷静。';
    }
    
    return advice;
} 