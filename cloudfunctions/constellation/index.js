const { generateFortune } = require('../../utils/constellation-data.js');

exports.main = async (event, context) => {
    const { action, constellation } = event;
    
    if (action === 'getFortune') {
        try {
            // 生成星座运势
            const fortune = generateFortune(constellation);
            
            return {
                success: true,
                data: fortune
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    return {
        success: false,
        error: '未知的操作类型'
    };
}; 