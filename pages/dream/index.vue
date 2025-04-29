<template>
	<view class="container">
		<!-- 梦境输入 -->
		<view class="input-card">
			<view class="card-header">
				<text class="title">周公解梦</text>
				<text class="subtitle">请描述您的梦境</text>
			</view>
			<view class="input-content">
				<textarea v-model="dream" placeholder="请输入您的梦境内容..." class="dream-input" />
				<button class="submit-btn" @click="interpret">开始解梦</button>
			</view>
		</view>
		
		<!-- 梦境分析 -->
		<view class="analysis-card" v-if="showResult">
			<view class="card-header">
				<text class="title">梦境分析</text>
			</view>
			<view class="analysis-content">
				<view class="analysis-item">
					<text class="label">梦境类型</text>
					<view class="tags">
						<text class="tag" v-for="(tag, index) in dreamAnalysis.types" :key="index">{{tag}}</text>
					</view>
				</view>
				<view class="analysis-item">
					<text class="label">梦境含义</text>
					<text class="value">{{dreamAnalysis.meaning}}</text>
				</view>
				<view class="analysis-item">
					<text class="label">心理暗示</text>
					<text class="value">{{dreamAnalysis.psychology}}</text>
				</view>
			</view>
		</view>
		
		<!-- 运势分析 -->
		<view class="fortune-card" v-if="showResult">
			<view class="card-header">
				<text class="title">运势分析</text>
			</view>
			<view class="fortune-content">
				<view class="fortune-item" v-for="(item, index) in dreamAnalysis.fortunes" :key="index">
					<text class="label">{{item.name}}</text>
					<view class="progress">
						<view class="progress-bar" :style="{width: item.value + '%'}"></view>
					</view>
					<text class="value">{{item.value}}%</text>
				</view>
			</view>
		</view>
		
		<!-- 建议提醒 -->
		<view class="advice-card" v-if="showResult">
			<view class="card-header">
				<text class="title">建议提醒</text>
			</view>
			<view class="advice-content">
				<view class="advice-item" v-for="(item, index) in dreamAnalysis.advice" :key="index">
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
			dream: '',
			showResult: false,
			dreamAnalysis: {
				types: ['预知梦', '心理梦', '愿望梦'],
				meaning: '此梦预示着近期可能会有新的机遇出现，需要保持开放的心态。',
				psychology: '反映了您对未来的期待和担忧，建议保持积极乐观的心态。',
				fortunes: [
					{name: '事业运', value: 75},
					{name: '财运', value: 80},
					{name: '感情运', value: 70},
					{name: '健康运', value: 85}
				],
				advice: [
					{type: 'good', content: '近期适合尝试新事物'},
					{type: 'good', content: '多与朋友交流分享'},
					{type: 'bad', content: '避免过度劳累'}
				]
			}
		}
	},
	methods: {
		interpret() {
			if (!this.dream) {
				uni.showToast({
					title: '请输入梦境内容',
					icon: 'none'
				})
				return
			}
			this.showResult = true
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

.input-card,
.analysis-card,
.fortune-card,
.advice-card {
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

.input-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.dream-input {
	width: 100%;
	height: 200rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
	padding: 20rpx;
	color: #fff;
	font-size: 28rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
}

.submit-btn {
	width: 100%;
	height: 80rpx;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 10rpx;
	color: #1a0b2e;
	font-size: 28rpx;
	font-weight: bold;
}

.analysis-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.analysis-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
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

.label {
	font-size: 28rpx;
	color: #e6d5ff;
}

.value {
	font-size: 28rpx;
	line-height: 1.6;
	color: #e6d5ff;
}

.fortune-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.fortune-item {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.progress {
	flex: 1;
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

.advice-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.advice-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	background-color: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	border: 1rpx solid rgba(255,215,0,0.05);
}

.advice-item .icon {
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

.advice-item .text {
	font-size: 28rpx;
	color: #e6d5ff;
}
</style> 