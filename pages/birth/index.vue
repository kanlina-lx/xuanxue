<template>
	<view class="container">
		<!-- 生辰输入 -->
		<view class="input-card">
			<view class="card-header">
				<text class="title">生辰四柱</text>
				<text class="subtitle">请输入您的出生信息</text>
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="label">出生日期</text>
					<picker mode="date" :value="birthDate" @change="onDateChange">
						<view class="picker">{{birthDate || '请选择日期'}}</view>
					</picker>
				</view>
				<view class="input-item">
					<text class="label">出生时间</text>
					<picker mode="time" :value="birthTime" @change="onTimeChange">
						<view class="picker">{{birthTime || '请选择时间'}}</view>
					</picker>
				</view>
				<view class="input-item">
					<text class="label">出生地点</text>
					<input type="text" v-model="birthPlace" placeholder="请输入出生地点" />
				</view>
			</view>
			<button class="submit-btn" @click="calculate">开始分析</button>
		</view>
		
		<!-- 四柱展示 -->
		<view class="pillar-card" v-if="showResult">
			<view class="card-header">
				<text class="title">四柱分析</text>
				<text class="subtitle">您的命理信息</text>
			</view>
			<view class="pillar-content">
				<view class="pillar-item" v-for="(item, index) in pillars" :key="index">
					<text class="name">{{item.name}}</text>
					<text class="value">{{item.value}}</text>
					<text class="element">{{item.element}}</text>
				</view>
			</view>
		</view>
		
		<!-- 命理分析 -->
		<view class="analysis-card" v-if="showResult">
			<view class="card-header">
				<text class="title">命理分析</text>
			</view>
			<view class="analysis-content">
				<view class="analysis-item">
					<text class="label">五行属性</text>
					<view class="elements">
						<view class="element-item" v-for="(item, index) in elements" :key="index">
							<text class="name">{{item.name}}</text>
							<view class="progress">
								<view class="progress-bar" :style="{width: item.value + '%'}"></view>
							</view>
							<text class="value">{{item.value}}%</text>
						</view>
					</view>
				</view>
				<view class="analysis-item">
					<text class="label">命理特点</text>
					<text class="content">{{analysis.characteristics}}</text>
				</view>
				<view class="analysis-item">
					<text class="label">运势建议</text>
					<text class="content">{{analysis.advice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			birthDate: '',
			birthTime: '',
			birthPlace: '',
			showResult: false,
			pillars: [
				{name: '年柱', value: '甲子', element: '木'},
				{name: '月柱', value: '乙丑', element: '木'},
				{name: '日柱', value: '丙寅', element: '火'},
				{name: '时柱', value: '丁卯', element: '火'}
			],
			elements: [
				{name: '木', value: 30},
				{name: '火', value: 40},
				{name: '土', value: 10},
				{name: '金', value: 15},
				{name: '水', value: 5}
			],
			analysis: {
				characteristics: '命主五行属火，性格热情开朗，富有创造力。木火相生，主聪明才智，但需注意控制情绪。',
				advice: '建议多接触水属性的事物，以平衡五行。事业发展宜选择与火、木相关的行业。'
			}
		}
	},
	methods: {
		onDateChange(e) {
			this.birthDate = e.detail.value
		},
		onTimeChange(e) {
			this.birthTime = e.detail.value
		},
		calculate() {
			if (!this.birthDate || !this.birthTime || !this.birthPlace) {
				uni.showToast({
					title: '请填写完整信息',
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
.pillar-card,
.analysis-card {
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

.input-item {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.label {
	font-size: 28rpx;
	color: #e6d5ff;
}

.picker,
input {
	height: 80rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
	padding: 0 20rpx;
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
	margin-top: 30rpx;
}

.pillar-content {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.pillar-item {
	background: rgba(255,255,255,0.03);
	border-radius: 15rpx;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
}

.pillar-item .name {
	font-size: 24rpx;
	color: #e6d5ff;
}

.pillar-item .value {
	font-size: 36rpx;
	font-weight: bold;
	color: #ffd700;
}

.pillar-item .element {
	font-size: 24rpx;
	color: #e6d5ff;
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

.elements {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.element-item {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.element-item .name {
	width: 40rpx;
	font-size: 24rpx;
	color: #e6d5ff;
}

.element-item .progress {
	flex: 1;
	height: 10rpx;
	background: rgba(255,255,255,0.1);
	border-radius: 5rpx;
	overflow: hidden;
}

.element-item .progress-bar {
	height: 100%;
	background: linear-gradient(90deg, #ffd700, #ffa500);
	border-radius: 5rpx;
	transition: width 0.3s ease;
}

.element-item .value {
	width: 60rpx;
	font-size: 24rpx;
	color: #e6d5ff;
	text-align: right;
}

.content {
	font-size: 28rpx;
	line-height: 1.6;
	color: #e6d5ff;
}
</style> 