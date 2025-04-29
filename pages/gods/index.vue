<template>
	<view class="container">
		<!-- 十神分析卡片 -->
		<view class="gods-card">
			<view class="card-header">
				<text class="title">十神分析</text>
				<text class="subtitle">探索你的命理格局</text>
			</view>
			<view class="card-content">
				<view class="gods-grid">
					<view class="god-item" v-for="(item, index) in gods" :key="index">
						<text class="name">{{item.name}}</text>
						<text class="value">{{item.value}}</text>
						<text class="description">{{item.description}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 格局分析 -->
		<view class="pattern-card">
			<view class="card-header">
				<text class="title">格局分析</text>
			</view>
			<view class="pattern-content">
				<view class="pattern-item">
					<text class="label">主要格局</text>
					<text class="value">{{pattern.main}}</text>
				</view>
				<view class="pattern-item">
					<text class="label">格局特点</text>
					<text class="value">{{pattern.characteristics}}</text>
				</view>
				<view class="pattern-item">
					<text class="label">发展建议</text>
					<text class="value">{{pattern.advice}}</text>
				</view>
			</view>
		</view>
		
		<!-- 运势分析 -->
		<view class="fortune-card">
			<view class="card-header">
				<text class="title">运势分析</text>
			</view>
			<view class="fortune-content">
				<view class="fortune-item" v-for="(item, index) in fortunes" :key="index">
					<text class="label">{{item.name}}</text>
					<view class="progress">
						<view class="progress-bar" :style="{width: item.value + '%'}"></view>
					</view>
					<text class="value">{{item.value}}%</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			gods: [
				{name: '正官', value: '甲', description: '代表权力、地位'},
				{name: '偏官', value: '乙', description: '代表压力、挑战'},
				{name: '正印', value: '丙', description: '代表智慧、学识'},
				{name: '偏印', value: '丁', description: '代表灵感、创意'},
				{name: '正财', value: '戊', description: '代表财富、收入'},
				{name: '偏财', value: '己', description: '代表投资、理财'},
				{name: '食神', value: '庚', description: '代表才华、技艺'},
				{name: '伤官', value: '辛', description: '代表创新、突破'},
				{name: '比肩', value: '壬', description: '代表朋友、合作'},
				{name: '劫财', value: '癸', description: '代表竞争、挑战'}
			],
			pattern: {
				main: '正官格',
				characteristics: '命主具有领导才能，做事稳重，有责任心。适合从事管理、行政等工作。',
				advice: '建议多培养决策能力，注意平衡工作与生活。'
			},
			fortunes: [
				{name: '事业运', value: 85},
				{name: '财运', value: 75},
				{name: '感情运', value: 70},
				{name: '健康运', value: 80}
			]
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

.gods-card,
.pattern-card,
.fortune-card {
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

.gods-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.god-item {
	background: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
}

.god-item .name {
	font-size: 28rpx;
	color: #ffd700;
	font-weight: bold;
}

.god-item .value {
	font-size: 36rpx;
	color: #e6d5ff;
}

.god-item .description {
	font-size: 24rpx;
	color: #e6d5ff;
	opacity: 0.8;
}

.pattern-content,
.fortune-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.pattern-item,
.fortune-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.label {
	font-size: 28rpx;
	color: #e6d5ff;
}

.value {
	font-size: 28rpx;
	line-height: 1.6;
	color: #e6d5ff;
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
</style> 