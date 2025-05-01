<template>
	<view class="container">
		<!-- 流星背景 -->
		<view class="meteor-container">
			<view v-for="(meteor, index) in meteors" :key="index" 
				class="meteor" 
				:style="{
					left: meteor.x + 'px',
					top: meteor.y + 'px',
					transform: `scale(${meteor.size})`,
					opacity: meteor.opacity,
					animationDelay: meteor.delay + 's'
				}">
			</view>
		</view>
		
		<!-- 星空背景 -->
		<view class="star-field">
			<view v-for="(star, index) in stars" :key="index" 
				class="star" 
				:style="{
					left: star.x + 'px',
					top: star.y + 'px',
					transform: `scale(${star.size})`,
					opacity: star.opacity,
					animationDelay: star.delay + 's'
				}">
			</view>
		</view>
		
		<canvas canvas-id="textCanvas" style="position: absolute; left: -9999px;"></canvas>
		
		<!-- 输入区 -->
		<view class="question-card">
			<textarea v-model="question" placeholder="心诚则灵，请输入所问之事" class="question-input" />
		</view>
		
		<!-- 占卜过程动画 -->
		<view class="divination-process" v-if="isDivining">
			<view class="tortoise-shell" @click="throwCoins" :class="{ 'shell-shake': isShaking }">
				<image class="shell-image" src="/static/images/guike.png" mode="aspectFit"></image>
				<view class="result-container" v-if="showCoins">
					<view class="coin" v-for="(result, index) in coinResults" :key="index" 
						:style="{ animationDelay: index * 0.2 + 's' }">
						<image class="coin-image" :src="'/static/images/yingbi-' + (result === '正' ? 'zheng' : 'z') + '.png'" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="process-text">
				<text>{{ processText }}</text>
			</view>
			<view class="yao-progress" v-if="currentYao > 0">
				<text>第{{ currentYao }}/6爻</text>
			</view>
		</view>
		
		<!-- 卦象可视化 -->
		<view class="hexagram-container" v-if="showResult && showHexagram">
			<view class="hexagram">
				<view class="hexagram-name">{{ result.original.name }}</view>
				<view class="hexagram-lines">
					<view v-for="(line, index) in result.original.lines" :key="index" class="line">
						<view v-if="line === '1'" class="yang-line"></view>
						<view v-else class="yin-line"></view>
					</view>
				</view>
			</view>
			<view v-if="result.changed" class="hexagram">
				<view class="hexagram-name">{{ result.changed.name }}</view>
				<view class="hexagram-lines">
					<view v-for="(line, index) in result.changed.lines" :key="index" class="line">
						<view v-if="line === '1'" class="yang-line"></view>
						<view v-else class="yin-line"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 操作按钮 -->
		<button class="divine-btn" @click="divinate" :disabled="isDivining">
			{{ isDivining ? '占卜中...' : '开始占卜' }}
			<text class="hint-text" v-if="isDivining && !showCoins">点击龟壳开始投掷</text>
		</button>

		<!-- 卦辞展示 -->
		<view v-if="showResult" class="result-card">
			<text class="title" v-if="showHexagram">{{ result.original.name }}</text>
			<text class="judgment" v-if="showJudgment">卦辞：{{ result.original.judgment }}</text>
			<text class="image" v-if="showImage">象曰：{{ result.original.image }}</text>
			<text v-if="showChanged && result.changed" class="changed">
				变卦：{{ result.changed.name }}（{{ result.changed.judgment }}）
			</text>
			
			<!-- 卦象解释 -->
			<view class="explanation-section" v-if="showExplanation">
				<text class="section-title">卦象解释</text>
				<text class="explanation-text">{{ result.original.explanation }}</text>
			</view>
			
			<!-- 吉凶判断 -->
			<view class="fortune-section" v-if="showFortune">
				<text class="section-title">吉凶判断</text>
				<view class="fortune-item">
					<text class="fortune-label">整体运势：</text>
					<text class="fortune-value">{{ result.original.fortune }}</text>
				</view>
				<view class="fortune-item">
					<text class="fortune-label">事业分析：</text>
					<text class="fortune-value">{{ result.original.career }}</text>
				</view>
				<view class="fortune-item">
					<text class="fortune-label">感情分析：</text>
					<text class="fortune-value">{{ result.original.love }}</text>
				</view>
				<view class="fortune-item">
					<text class="fortune-label">财运分析：</text>
					<text class="fortune-value">{{ result.original.wealth }}</text>
				</view>
				<view class="fortune-item">
					<text class="fortune-label">健康建议：</text>
					<text class="fortune-value">{{ result.original.health }}</text>
				</view>
				<view class="fortune-item">
					<text class="fortune-label">注意事项：</text>
					<text class="fortune-value">{{ result.original.reminder }}</text>
				</view>
			</view>
		</view>

		<!-- 历史记录 -->
		<view class="history-section" v-if="history.length > 0">
			<text class="section-title">占卜记录</text>
			<view v-for="(item, idx) in history" :key="idx" class="history-item">
				<view class="history-header">
					<text class="date">{{ item.date.slice(0,10) }}</text>
					<text class="question">{{ item.question }}</text>
				</view>
				<view class="history-result">
					<text class="result-text">{{ item.original?.name || '未知卦象' }}</text>
					<text class="arrow">→</text>
					<text class="result-text">{{ item.changed?.name || '无变卦' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { hexagrams, hexagramMap } from '@/utils/hexagram-data.js'

export default {
	data() {
		return {
			question: '',
			result: {
				original: {
					name: '',
					lines: '',
					judgment: '',
					image: '',
					explanation: '',
					fortune: '',
					career: '',
					love: '',
					wealth: '',
					health: '',
					reminder: ''
				},
				changed: null
			},
			history: [],
			isDivining: false,
			coins: Array(3).fill().map(() => ({ 
				flipping: false,
				result: null,
				showResult: false
			})),
			processText: '请静心默念所问之事...',
			currentYao: 0,
			allCoinResults: [],
			stars: uni.getStorageSync('backgroundStars') || [],
			meteors: uni.getStorageSync('backgroundMeteors') || [],
			showResult: false,
			showHexagram: false,
			showJudgment: false,
			showImage: false,
			showChanged: false,
			showExplanation: false,
			showFortune: false,
			showAdvice: false,
			showCoins: false,
			throwCoinsResolve: null,
			shellStars: Array(20).fill().map(() => ({
				x: Math.random() * 160 - 80,
				y: Math.random() * 160 - 80,
				rotation: Math.random() * 360,
				delay: Math.random() * 2
			})),
			coinResults: [],
			isShaking: false,
		}
	},
	methods: {
		// 修改初始化星空背景的方法
		initBackground() {
			// 如果已经有缓存的背景数据，直接使用
			if (uni.getStorageSync('backgroundStars') && uni.getStorageSync('backgroundMeteors')) {
				this.stars = uni.getStorageSync('backgroundStars');
				this.meteors = uni.getStorageSync('backgroundMeteors');
				return;
			}
			
			const windowWidth = uni.getSystemInfoSync().windowWidth;
			const windowHeight = uni.getSystemInfoSync().windowHeight;
			
			// 初始化星星
			const stars = Array(100).fill().map(() => ({
				x: Math.random() * windowWidth,
				y: Math.random() * windowHeight,
				size: Math.random() * 1 + 0.5,
				opacity: Math.random() * 0.5 + 0.5,
				delay: Math.random() * 2
			}));
			
			// 初始化流星
			const meteors = Array(5).fill().map(() => ({
				x: Math.random() * windowWidth,
				y: Math.random() * windowHeight,
				size: Math.random() * 1.5 + 0.5,
				opacity: Math.random() * 0.8 + 0.2,
				delay: Math.random() * 3
			}));
			
			// 保存到缓存
			uni.setStorageSync('backgroundStars', stars);
			uni.setStorageSync('backgroundMeteors', meteors);
			
			this.stars = stars;
			this.meteors = meteors;
		},
		
		// 星星移动到目标位置
		async moveStarsToTarget() {
			return new Promise((resolve) => {
				const centerX = uni.getSystemInfoSync().windowWidth / 2;
				const centerY = uni.getSystemInfoSync().windowHeight / 2;
				
				// 重置星星位置
				this.stars.forEach(star => {
					star.startX = star.x;
					star.startY = star.y;
					star.targetX = centerX;
					star.targetY = centerY;
					star.progress = 0;
					star.speed = Math.random() * 0.02 + 0.01;
					star.size = Math.random() * 1 + 0.5;
					star.opacity = Math.random() * 0.5 + 0.5;
				});
				
				const interval = setInterval(() => {
					let allReached = true;
					
					this.stars.forEach(star => {
						if (star.progress < 1) {
							allReached = false;
							star.progress += star.speed;
							
							// 使用缓动函数使动画更自然
							const easeProgress = 1 - Math.pow(1 - star.progress, 3);
							
							star.x = star.startX + (star.targetX - star.startX) * easeProgress;
							star.y = star.startY + (star.targetY - star.startY) * easeProgress;
							
							// 星星在接近中心时变小并变亮
							if (star.progress > 0.7) {
								star.size = star.size * (1 - (star.progress - 0.7) * 2);
								star.opacity = 1 - (star.progress - 0.7) * 2;
							}
						}
					});
					
					if (allReached) {
						clearInterval(interval);
						resolve();
					}
				}, 16);
			});
		},
		
		// 星星散开形成文字
		async scatterStarsToText(text, startX, startY, fontSize) {
			const canvas = uni.createCanvasContext('textCanvas');
			canvas.setFontSize(fontSize);
			canvas.setTextBaseline('top');
			canvas.setFillStyle('#fff');
			canvas.fillText(text, 0, 0);
			
			const { width, height } = await new Promise(resolve => {
				canvas.measureText(text, (res) => {
					resolve(res);
				});
			});
			
			const imageData = await new Promise(resolve => {
				canvas.draw(false, () => {
					uni.canvasGetImageData({
						canvasId: 'textCanvas',
						x: 0,
						y: 0,
						width: width,
						height: height,
						success: (res) => {
							resolve(res);
						}
					});
				});
			});
			
			const textStars = [];
			const centerX = uni.getSystemInfoSync().windowWidth / 2;
			const centerY = uni.getSystemInfoSync().windowHeight / 2;
			
			// 收集文字像素点
			for (let y = 0; y < height; y += 2) {
				for (let x = 0; x < width; x += 2) {
					const index = (y * width + x) * 4;
					if (imageData.data[index + 3] > 0) {
						textStars.push({
							startX: centerX,
							startY: centerY,
							targetX: startX + x,
							targetY: startY + y,
							x: centerX,
							y: centerY,
							size: Math.random() * 1.5 + 0.5,
							opacity: 1,
							active: true,
							progress: 0,
							speed: Math.random() * 0.02 + 0.01
						});
					}
				}
			}
			
			return textStars;
		},
		
		// 星星汇聚成硬币
		async formCoin() {
			const centerX = uni.getSystemInfoSync().windowWidth / 2;
			const centerY = uni.getSystemInfoSync().windowHeight / 2;
			const coinSize = 120;
			const coinGap = 160;
			
			// 生成三个硬币的结果
			const coinResults = Array(3).fill().map(() => Math.random() > 0.5 ? '正' : '反');
			
			// 等待星星移动到中心
			await this.moveStarsToTarget();
			
			// 创建硬币图形
			const coinStars = [];
			
			// 创建三个硬币
			for (let coinIndex = 0; coinIndex < 3; coinIndex++) {
				const offsetX = (coinIndex - 1) * coinGap;
				
				// 添加硬币边框（使用连续的点形成线条）
				for (let i = 0; i < 360; i++) {
					const angle = (i / 180) * Math.PI;
					coinStars.push({
						x: centerX + offsetX + Math.cos(angle) * coinSize / 2,
						y: centerY + Math.sin(angle) * coinSize / 2,
						size: 2,
						opacity: 1,
						active: true,
						isBorder: true,
						angle: angle
					});
				}
				
				// 添加硬币文字
				const textStars = await this.scatterStarsToText(
					coinResults[coinIndex],
					centerX + offsetX - 20,
					centerY - 20,
					40
				);
				
				coinStars.push(...textStars);
			}
			
			// 替换星星为硬币
			this.stars = coinStars;
			
			// 等待2秒
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			return coinResults;
		},

		// 修改 throwCoins 方法
		async throwCoins() {
			// 如果已经有硬币显示，先让它们消失
			if (this.showCoins) {
				this.showCoins = false;
				await new Promise(resolve => setTimeout(resolve, 300));
			}
			
			// 设置龟壳摇晃状态
			this.isShaking = true;
			
			// 生成三个随机结果
			this.coinResults = Array(3).fill().map(() => Math.random() > 0.5 ? '正' : '反');
			
			// 显示结果
			this.showCoins = true;
			
			// 停止龟壳摇晃
			setTimeout(() => {
				this.isShaking = false;
			}, 300);
			
			if (this.throwCoinsResolve) {
				this.throwCoinsResolve();
				this.throwCoinsResolve = null;
			}
			return this.coinResults;
		},

		// 生成单爻
		generateYao(coinResults) {
			// 计算正面数量
			const positiveCount = coinResults.filter(result => result === '正').length;
			
			// 根据正面数量确定爻值
			let value;
			let isChanging = false;
			
			switch(positiveCount) {
				case 3: // 三正：老阳
					value = 9;
					isChanging = true;
					break;
				case 2: // 两正一反：少阳
					value = 7;
					break;
				case 1: // 一正两反：少阴
					value = 8;
					break;
				case 0: // 三反：老阴
					value = 6;
					isChanging = true;
					break;
			}
			
			return {
				value,
				isChanging
			};
		},

		// 生成完整卦象
		async generateHexagram() {
			// 生成6个爻
			const lines = this.allCoinResults.map(coinResults => this.generateYao(coinResults));
			
			// 获取本卦
			const originalBinary = lines.map(l => {
				// 7和9为阳爻，8和6为阴爻
				return l.value === 7 || l.value === 9 ? '1' : '0';
			}).join('');
			const originalId = hexagramMap[originalBinary] || 1;
			
			// 获取变卦
			const changedBinary = lines.map(l => {
				if (l.isChanging) {
					// 老阳变阴，老阴变阳
					return l.value === 9 ? '0' : '1';
				} else {
					// 不变爻保持原样
					return l.value === 7 || l.value === 9 ? '1' : '0';
				}
			}).join('');
			const changedId = hexagramMap[changedBinary] || 1;

			// 从云函数获取卦象数据
			try {
				const { result: hexagramData } = await uniCloud.callFunction({
					name: 'hexagram',
					data: {
						action: 'getHexagram',
						originalId,
						changedId
					}
				});

				return {
					original: {
						...hexagramData.original,
						lines: originalBinary.split('')
					},
					changed: hexagramData.changed ? {
						...hexagramData.changed,
						lines: changedBinary.split('')
					} : null,
					changingLines: lines
						.map((l, index) => l.isChanging ? 6 - index : null)
						.filter(i => i !== null)
				};
			} catch (error) {
				console.error('获取卦象数据失败:', error);
				return {
					original: hexagrams[0],
					changed: null,
					changingLines: []
				};
			}
		},

		// 执行占卜
		async divinate() {
			if (!this.question) {
				uni.showToast({
					title: '请输入问题',
					icon: 'none'
				});
				return;
			}
			
			this.isDivining = true;
			this.processText = '请点击龟壳开始占卜...';
			this.showResult = false;
			this.currentYao = 0;
			this.allCoinResults = [];
			this.showCoins = false;
			
			try {
				// 投掷6次，每次3枚硬币
				for (let yao = 0; yao < 6; yao++) {
					this.currentYao = yao + 1;
					this.processText = `请点击龟壳投掷第${this.currentYao}爻...`;
					
					// 等待用户点击龟壳
					await new Promise(resolve => {
						this.throwCoinsResolve = resolve;
					});
					
					// 投掷一次硬币
					const coinResults = await this.throwCoins();
					this.allCoinResults.push(coinResults);
				}
				
				// 生成卦象
				this.processText = '卦象生成中...';
				this.result = await this.generateHexagram();
				this.saveToHistory();
				
				// 显示结果
				this.showResult = true;
				this.showHexagram = true;
				this.showJudgment = true;
				this.showImage = true;
				this.showChanged = true;
				this.showExplanation = true;
				this.showFortune = true;
				this.showAdvice = true;
				
				this.processText = '占卜完成';
			} finally {
				this.isDivining = false;
				this.throwCoinsResolve = null;
			}
		},

		// 本地存储历史记录
		saveToHistory() {
			this.history.unshift({
				date: new Date().toISOString(),
				question: this.question,
				...this.result
			});
			// 只保留最近3条记录
			this.history = this.history.slice(0, 3);
			uni.setStorageSync('divinationHistory', this.history);
		},

		// 加载历史记录
		loadHistory() {
			this.history = uni.getStorageSync('divinationHistory') || []
		},

		// 获取卦象解释
		getGuaExplanation(gua) {
			return this.guaExplanations[gua.name] || '暂无详细解释'
		},
		
		// 获取吉凶判断
		getFortune(gua, type) {
			return this.fortuneData[gua.name]?.[type] || '暂无判断'
		},
		
		// 获取建议
		getAdvice(gua) {
			return this.adviceData[gua.name] || []
		}
	},
	onLoad() {
		this.initBackground(); // 在页面加载时初始化背景
	},
	mounted() {
		this.loadHistory();
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	background: linear-gradient(135deg, #1a0b2e 0%, #2a1b3e 50%, #3a2b4e 100%);
	color: #fff;
	padding: 20rpx;
	position: relative;
	overflow: hidden;
	height: 100%;
	width: 100%;
}

/* 流星背景 */
.meteor-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 0;
	background: transparent;
}

.meteor {
	position: absolute;
	width: 4rpx;
	height: 4rpx;
	background: #fff;
	border-radius: 50%;
	box-shadow: 0 0 0 4rpx rgba(255,255,255,0.1),
				0 0 0 8rpx rgba(255,255,255,0.1),
				0 0 20rpx rgba(255,255,255,0.2),
				0 0 40rpx rgba(255,255,255,0.1);
	animation: meteor 4s linear infinite;
	opacity: 0;
}

@keyframes meteor {
	0% {
		transform: translateX(-100rpx) translateY(-100rpx);
		opacity: 1;
	}
	70% {
		opacity: 1;
	}
	100% {
		transform: translateX(1000rpx) translateY(1000rpx);
		opacity: 0;
	}
}

/* 星空背景 */
.star-field {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 0;
	background: transparent;
}

.star {
	position: absolute;
	width: 2rpx;
	height: 2rpx;
	background: #fff;
	border-radius: 50%;
	box-shadow: 0 0 0 2rpx rgba(255,255,255,0.1),
				0 0 0 4rpx rgba(255,255,255,0.1),
				0 0 10rpx rgba(255,255,255,0.2);
	animation: twinkle 3s ease-in-out infinite;
	transition: all 0.3s ease;
}

@keyframes twinkle {
	0%, 100% {
		opacity: 0.2;
		transform: scale(1);
	}
	50% {
		opacity: 1;
		transform: scale(1.2);
	}
}

.question-card {
	position: relative;
	z-index: 2;
	margin: 40rpx 0;
	padding: 20rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
}

.question-input {
	width: 100%;
	height: 200rpx;
	padding: 20rpx;
	color: #fff;
	background: transparent;
	border: none;
	font-size: 28rpx;
	line-height: 1.6;
}

.divination-process {
	margin: 30rpx 0;
	padding: 20rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
}

.tortoise-shell {
	width: 350rpx;
	height: 400rpx;
	margin: 0 auto;
	position: relative;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: rotate(0deg);
	-webkit-transform: rotate(0deg);
}

.shell-shake {
	animation: shell-shake 0.3s ease-in-out;
	-webkit-animation: shell-shake 0.3s ease-in-out;
}

@keyframes shell-shake {
	0%, 100% {
		transform: rotate(0deg) scale(1);
		-webkit-transform: rotate(0deg) scale(1);
	}
	25% {
		transform: rotate(-8deg) scale(0.95);
		-webkit-transform: rotate(-8deg) scale(0.95);
	}
	75% {
		transform: rotate(8deg) scale(0.95);
		-webkit-transform: rotate(8deg) scale(0.95);
	}
}

.shell-image {
	width: 100%;
	height: 100%;
	transition: all 0.3s ease;
	position: relative;
	z-index: 1;
	transform: rotate(0deg);
	-webkit-transform: rotate(0deg);
}

.hint-text {
	position: absolute;
	bottom: -60rpx;
	left: 50%;
	transform: translateX(-50%);
	color: #ffd700;
	font-size: 32rpx;
	text-shadow: 0 0 10rpx rgba(255, 215, 0, 0.5);
	animation: hint-pulse 2s ease-in-out infinite;
}

@keyframes hint-pulse {
	0%, 100% {
		opacity: 0.8;
		transform: translateX(-50%) scale(1);
	}
	50% {
		opacity: 1;
		transform: translateX(-50%) scale(1.05);
	}
}

.result-container {
	position: absolute;
	top: -120rpx;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 40rpx;
	z-index: 2;
	perspective: 1000rpx;
}

.coin {
	width: 100rpx;
	height: 100rpx;
	background: transparent;
	border-radius: 50%;
	position: relative;
	animation: coinAppear 0.3s ease-out forwards;
	transform-origin: center;
}

@keyframes coinAppear {
	0% {
		transform: scale(0) rotate(0deg);
		opacity: 0;
	}
	100% {
		transform: scale(1) rotate(360deg);
		opacity: 1;
	}
}

.coin-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.process-text {
	text-align: center;
	color: #e6d5ff;
	font-size: 28rpx;
	margin-top: 20rpx;
}

.divine-btn {
	position: relative;
	z-index: 2;
	margin: 40rpx 0;
	padding: 20rpx 40rpx;
	background: rgba(255, 215, 0, 0.2);
	color: #ffd700;
	border: 1px solid #ffd700;
	border-radius: 10rpx;
	font-size: 32rpx;
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
}

.divine-btn:active {
	transform: scale(0.98);
	background: rgba(255, 215, 0, 0.3);
}

.divine-btn:disabled {
	opacity: 0.7;
}

.hexagram-container {
	position: relative;
	z-index: 2;
	margin: 40rpx 0;
	padding: 20rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
}

.hexagram {
	text-align: center;
	margin-bottom: 20rpx;
}

.hexagram-name {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	color: #ffd700;
}

.hexagram-lines {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.line {
	height: 60rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.yang-line {
	width: 200rpx;
	height: 20rpx;
	background-color: #ffd700;
}

.yin-line {
	width: 200rpx;
	height: 20rpx;
	background-color: #ffd700;
	position: relative;
}

.yin-line::after {
	content: '';
	position: absolute;
	width: 40%;
	height: 100%;
	background-color: #1a0b2e;
	left: 30%;
}

.result-card {
	position: relative;
	z-index: 2;
	margin: 40rpx 0;
	padding: 20rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 20rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	color: #ffd700;
	display: block;
}

.judgment, .image, .changed {
	display: block;
	margin: 10rpx 0;
	color: #e6d5ff;
	font-size: 28rpx;
	line-height: 1.6;
}

.explanation-section,
.fortune-section {
	margin-top: 30rpx;
	padding: 20rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
}

.section-title {
	font-size: 32rpx;
	color: #fff;
	margin-bottom: 20rpx;
	display: block;
	text-shadow: 0 0 10rpx rgba(255, 255, 255, 0.3);
}

.explanation-text {
	font-size: 28rpx;
	color: #e6d5ff;
	line-height: 1.6;
}

.fortune-item {
	margin-bottom: 15rpx;
	padding: 15rpx;
	background: rgba(255,255,255,0.02);
	border-radius: 8rpx;
}

.fortune-label {
	font-size: 28rpx;
	color: #ffd700;
	margin-right: 10rpx;
}

.fortune-value {
	font-size: 28rpx;
	color: #e6d5ff;
	line-height: 1.6;
}

.history-section {
	margin-top: 30rpx;
	padding: 20rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 20rpx;
}

.history-item {
	background: rgba(255,255,255,0.05);
	padding: 20rpx;
	border-radius: 10rpx;
	margin-bottom: 20rpx;
	transition: all 0.3s ease;
}

.history-item:active {
	transform: scale(0.98);
	background: rgba(255,255,255,0.08);
}

.history-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10rpx;
}

.date {
	font-size: 24rpx;
	color: #fff;
	opacity: 0.8;
}

.question {
	font-size: 28rpx;
	color: #fff;
	opacity: 0.9;
}

.history-result {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20rpx;
	margin-top: 10rpx;
}

.arrow {
	color: #fff;
	font-size: 32rpx;
	opacity: 0.8;
}

.history-result .result-text {
	font-size: 32rpx;
	animation: none;
	opacity: 1;
	transform: none;
	text-shadow: 0 0 10rpx rgba(255, 255, 255, 0.3);
	background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.yao-progress {
	text-align: center;
	margin-top: 20rpx;
	color: #e6d5ff;
	font-size: 28rpx;
}
</style> 