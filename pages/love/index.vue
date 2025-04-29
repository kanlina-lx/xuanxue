<template>
	<view class="container">
		<!-- 正缘分析卡片 -->
		<view class="love-card">
			<view class="card-header">
				<text class="title">正缘分析</text>
				<text class="subtitle">探索你的命中注定</text>
			</view>
			<view class="card-content">
				<view class="analysis-item">
					<text class="label">正缘特征</text>
					<view class="tags">
						<text class="tag" v-for="(tag, index) in loveAnalysis.features" :key="index">{{tag}}</text>
					</view>
				</view>
				<view class="analysis-item">
					<text class="label">相遇时机</text>
					<text class="value">{{loveAnalysis.timing}}</text>
				</view>
				<view class="analysis-item">
					<text class="label">相处建议</text>
					<text class="value">{{loveAnalysis.advice}}</text>
				</view>
			</view>
		</view>
		
		<!-- 缘分指数 -->
		<view class="score-section">
			<view class="score-item">
				<text class="label">缘分指数</text>
				<view class="score">
					<text class="number">{{loveAnalysis.score}}</text>
					<text class="unit">分</text>
				</view>
				<view class="progress">
					<view class="progress-bar" :style="{width: loveAnalysis.score + '%'}"></view>
				</view>
			</view>
		</view>
		
		<!-- 详细分析 -->
		<view class="detail-section">
			<view class="detail-item">
				<text class="title">性格匹配</text>
				<text class="content">{{loveAnalysis.personalityMatch}}</text>
			</view>
			<view class="detail-item">
				<text class="title">价值观契合</text>
				<text class="content">{{loveAnalysis.valueMatch}}</text>
			</view>
			<view class="detail-item">
				<text class="title">相处模式</text>
				<text class="content">{{loveAnalysis.interactionMode}}</text>
			</view>
		</view>
		
		<!-- 缘分提醒 -->
		<view class="reminder-section">
			<text class="title">缘分提醒</text>
			<view class="reminder-list">
				<view class="reminder-item" v-for="(item, index) in loveAnalysis.reminders" :key="index">
					<text class="icon">{{item.type === 'good' ? '✓' : '!'}}</text>
					<text class="text">{{item.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loveAnalysis: {
				features: ['温柔体贴', '事业有成', '家庭观念强', '幽默风趣'],
				timing: '未来1-2年内',
				advice: '保持开放心态，多参与社交活动',
				score: 85,
				personalityMatch: '你们性格互补，能够互相理解和支持。你的理性思维与对方的感性特质形成良好的平衡。',
				valueMatch: '在家庭观念、事业发展等方面有很高的契合度，对未来的规划也较为一致。',
				interactionMode: '相处模式以互相尊重、平等沟通为主，能够共同成长。',
				reminders: [
					{type: 'good', content: '近期有桃花运，注意把握机会'},
					{type: 'good', content: '适合参加社交活动，扩大交际圈'},
					{type: 'bad', content: '避免过于理想化，保持理性判断'}
				]
			}
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
	color: #fff;
	padding: 20rpx;
}

.love-card {
	background-color: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.card-header {
	margin-bottom: 30rpx;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	color: #ffd700;
	display: block;
	margin-bottom: 10rpx;
}

.subtitle {
	font-size: 24rpx;
	color: #e6d5ff;
	opacity: 0.8;
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.analysis-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.label {
	font-size: 28rpx;
	color: #e6d5ff;
}

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.tag {
	padding: 10rpx 20rpx;
	background: rgba(255,215,0,0.1);
	color: #ffd700;
	border-radius: 30rpx;
	font-size: 24rpx;
	border: 1rpx solid rgba(255,215,0,0.2);
}

.value {
	font-size: 28rpx;
	color: #e6d5ff;
	line-height: 1.6;
}

.score-section {
	background-color: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.score-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
}

.score {
	display: flex;
	align-items: baseline;
}

.number {
	font-size: 48rpx;
	font-weight: bold;
	color: #ffd700;
}

.unit {
	font-size: 24rpx;
	color: #e6d5ff;
	margin-left: 10rpx;
}

.progress {
	width: 100%;
	height: 10rpx;
	background: rgba(255,255,255,0.1);
	border-radius: 5rpx;
	overflow: hidden;
}

.progress-bar {
	height: 100%;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 5rpx;
	transition: width 0.3s ease;
}

.detail-section {
	background-color: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.detail-item {
	margin-bottom: 30rpx;
}

.detail-item:last-child {
	margin-bottom: 0;
}

.content {
	font-size: 28rpx;
	line-height: 1.6;
	color: #e6d5ff;
}

.reminder-section {
	background-color: rgba(255,255,255,0.05);
	border-radius: 20rpx;
	padding: 30rpx;
	backdrop-filter: blur(10rpx);
	border: 1rpx solid rgba(255,215,0,0.1);
}

.reminder-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.reminder-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	background-color: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	border: 1rpx solid rgba(255,215,0,0.05);
}

.reminder-item .icon {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	background: rgba(255,215,0,0.1);
	color: #ffd700;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
	font-size: 24rpx;
	border: 1rpx solid rgba(255,215,0,0.2);
}

.reminder-item .text {
	font-size: 28rpx;
	color: #e6d5ff;
}

.reminder-item:active {
	transform: scale(0.98);
	background-color: rgba(255,215,0,0.05);
	border-color: rgba(255,215,0,0.2);
	box-shadow: 0 0 15rpx rgba(255,215,0,0.1);
}
</style> 