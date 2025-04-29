<template>
	<view class="container">
<<<<<<< HEAD
		<!-- 星星背景 - 始终显示，但动画状态会改变 -->
		<view class="star-background" :class="{'cosmic-bg': showCelestialShift}">
			<!-- 星座连线 - 斗转星移模式下显示 -->
			<view class="constellation-lines" v-if="showCelestialShift"></view>
			<view 
				v-for="(star, index) in stars" 
				:key="index" 
				class="star"
				:class="{
					'animate': true, 
					'moving': isStarsMoving,
					'celestial-shift': showCelestialShift,
					'hexagon-shape': formCardShape, 
					'flicker': flickerStars && flickeringIndex === index
				}"
				:style="{
					left: star.x + '%',
					top: star.y + '%',
					width: star.size + 'rpx',
					height: star.size + 'rpx',
					animationDelay: (index * 0.05) + 's',
					opacity: fadeOutStars ? 0 : 1
				}"
			></view>
		</view>
		
		<!-- 占卜页面内容区 -->
		<view class="content-wrapper" :class="{'hidden': hideContent}">
			<!-- 问题输入 -->
			<view class="question-card">
				<view class="card-header">
					<text class="title">塔罗占卜</text>
					<text class="subtitle">请默念您的问题</text>
				</view>
				<view class="question-content">
					<textarea v-model="question" placeholder="请输入您想问的问题..." class="question-input" />
					<button class="submit-btn" @click="startDivination">开始占卜</button>
				</view>
			</view>
			
			<!-- 牌阵展示 -->
			<view class="cards-card" v-if="showResult">
				<view class="card-header">
					<text class="title">牌阵分析</text>
					<text class="subtitle">{{spread.name}}</text>
				</view>
				<view class="cards-content">
					<view class="cards-grid">
						<view class="card-item" v-for="(card, index) in spread.cards" :key="index">
							<view class="card-image">
								<text class="card-name">{{card.name}}</text>
							</view>
							<text class="card-position">{{card.position}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 牌意分析 -->
			<view class="interpretation-card" v-if="showResult">
				<view class="card-header">
					<text class="title">牌意分析</text>
				</view>
				<view class="interpretation-content">
					<view class="interpretation-item" v-for="(card, index) in spread.cards" :key="index">
						<text class="label">{{card.position}}</text>
						<text class="value">{{card.meaning}}</text>
					</view>
				</view>
			</view>
			
			<!-- 综合解读 -->
			<view class="summary-card" v-if="showResult">
				<view class="card-header">
					<text class="title">综合解读</text>
				</view>
				<view class="summary-content">
					<view class="summary-item">
						<text class="label">整体运势</text>
						<text class="value">{{summary.overall}}</text>
					</view>
					<view class="summary-item">
						<text class="label">建议提醒</text>
						<text class="value">{{summary.advice}}</text>
					</view>
				</view>
			</view>
			
			<!-- 运势提醒 -->
			<view class="reminder-card" v-if="showResult">
				<view class="card-header">
					<text class="title">运势提醒</text>
				</view>
				<view class="reminder-content">
					<view class="reminder-item" v-for="(item, index) in summary.reminders" :key="index">
						<text class="icon">{{item.type === 'good' ? '✓' : '!'}}</text>
						<text class="text">{{item.content}}</text>
=======
		<!-- 星空背景 -->
		<view class="star-field">
			<view class="stars" v-for="i in 200" :key="i" :style="getStarStyle(i)"></view>
		</view>
		
		<!-- 占卜动画 -->
		<view class="tarot-animation" v-if="showAnimation">
			<view class="tarot-deck" :class="{ 'shuffling': isShuffling }">
				<view class="tarot-card" v-for="(card, index) in deck" :key="index"
					:style="getCardStyle(index)"
					:class="{ 'selected': card.selected }">
					<view class="card-back"></view>
					<view class="card-front" v-if="card.selected">
						<text class="card-name">{{card.name}}</text>
						<text class="card-meaning">{{card.meaning}}</text>
>>>>>>> 51e7c751b5abfc022cb2aa9ea104576777a88671
					</view>
				</view>
			</view>
		</view>
		
<<<<<<< HEAD
		<!-- 占卜过程中显示的提示 -->
		<view class="divination-process" v-if="hideContent && !showResult">
			<view class="process-text" :class="{'show': showProcessText}">
				<text class="animate-text">命运之星正在为您占卜</text>
				<text class="dots">...</text>
=======
		<!-- 占卜结果 -->
		<view class="tarot-result" v-if="!showAnimation">
			<!-- 问题输入 -->
			<view class="question-card">
				<view class="card-header">
					<text class="title">塔罗占卜</text>
					<text class="subtitle">请默念您的问题</text>
				</view>
				<view class="question-content">
					<textarea v-model="question" placeholder="请输入您想问的问题..." class="question-input" />
					<button class="submit-btn" @click="startDivination">开始占卜</button>
				</view>
			</view>
			
			<!-- 牌阵展示 -->
			<view class="cards-card" v-if="showResult">
				<view class="card-header">
					<text class="title">牌阵分析</text>
					<text class="subtitle">{{spread.name}}</text>
				</view>
				<view class="cards-content">
					<view class="cards-grid">
						<view class="card-item" v-for="(card, index) in spread.cards" :key="index">
							<view class="card-image">
								<text class="card-name">{{card.name}}</text>
							</view>
							<text class="card-position">{{card.position}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 牌意分析 -->
			<view class="interpretation-card" v-if="showResult">
				<view class="card-header">
					<text class="title">牌意分析</text>
				</view>
				<view class="interpretation-content">
					<view class="interpretation-item" v-for="(card, index) in spread.cards" :key="index">
						<text class="label">{{card.position}}</text>
						<text class="value">{{card.meaning}}</text>
					</view>
				</view>
			</view>
			
			<!-- 综合解读 -->
			<view class="summary-card" v-if="showResult">
				<view class="card-header">
					<text class="title">综合解读</text>
				</view>
				<view class="summary-content">
					<view class="summary-item">
						<text class="label">整体运势</text>
						<text class="value">{{summary.overall}}</text>
					</view>
					<view class="summary-item">
						<text class="label">建议提醒</text>
						<text class="value">{{summary.advice}}</text>
					</view>
				</view>
			</view>
			
			<!-- 运势提醒 -->
			<view class="reminder-card" v-if="showResult">
				<view class="card-header">
					<text class="title">运势提醒</text>
				</view>
				<view class="reminder-content">
					<view class="reminder-item" v-for="(item, index) in summary.reminders" :key="index">
						<text class="icon">{{item.type === 'good' ? '✓' : '!'}}</text>
						<text class="text">{{item.content}}</text>
					</view>
				</view>
>>>>>>> 51e7c751b5abfc022cb2aa9ea104576777a88671
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			question: '',
			showResult: false,
<<<<<<< HEAD
			// 星星动画相关状态
			isStarsMoving: false,    // 星星是否随机运动
			showCelestialShift: false, // 星星斗转星移效果
			formCardShape: false,
			flickerStars: false,
			flickeringIndex: -1,
			fadeOutStars: false,
			hideContent: false,      // 是否隐藏内容
			showProcessText: false,  // 显示占卜中文字
			starsMovementInterval: null, // 用于保存定时器ID
			// 生成随机星星 - 增加数量和大小变化
			stars: Array.from({length: 150}, () => ({
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: 1 + Math.random() * 3,
				speedX: (Math.random() - 0.5) * 0.2,
				speedY: (Math.random() - 0.5) * 0.2,
				rotation: Math.random() * 360 // 添加旋转角度属性
			})),
=======
			showAnimation: false,
			isShuffling: false,
			deck: [],
			selectedCards: [],
>>>>>>> 51e7c751b5abfc022cb2aa9ea104576777a88671
			spread: {
				name: '三张牌阵',
				cards: [
					{
						name: '愚者',
						position: '过去',
						meaning: '代表新的开始和冒险精神'
					},
					{
						name: '女祭司',
						position: '现在',
						meaning: '代表直觉和内在智慧'
					},
					{
						name: '太阳',
						position: '未来',
						meaning: '代表成功和光明前景'
					}
				]
			},
			summary: {
				overall: '整体运势较好，新的开始带来机遇，需要保持开放和积极的心态。',
				advice: '建议多倾听内心的声音，保持乐观积极的态度。',
				reminders: [
					{type: 'good', content: '适合尝试新事物'},
					{type: 'good', content: '多关注内心感受'},
					{type: 'bad', content: '避免过度理想化'}
				]
			},
			// 塔罗牌数据
			tarotCards: [
				{ name: '愚者', meaning: '新的开始，冒险，天真' },
				{ name: '魔术师', meaning: '创造力，技能，专注' },
				{ name: '女祭司', meaning: '直觉，神秘，智慧' },
				// ... 其他牌
			]
		}
	},
	mounted() {
		// 启动星星慢速随机运动
		this.startStarsMovement();
		
		// 优化性能，页面显示时才运行动画
		uni.onWindowResize(() => {
			if (this.starsMovementInterval) {
				clearInterval(this.starsMovementInterval);
				this.startStarsMovement();
			}
		});
	},
	
	beforeDestroy() {
		// 组件销毁前清除定时器，防止内存泄漏
		if (this.starsMovementInterval) {
			clearInterval(this.starsMovementInterval);
			this.starsMovementInterval = null;
		}
	},
	
	methods: {
<<<<<<< HEAD
		// 星星随机运动
		startStarsMovement() {
			// 清除可能存在的旧定时器
			if (this.starsMovementInterval) {
				clearInterval(this.starsMovementInterval);
			}
			
			this.starsMovementInterval = setInterval(() => {
				if (!this.isStarsMoving && !this.showCelestialShift) return;
				
				this.stars.forEach(star => {
					// 正常移动模式
					if (this.isStarsMoving && !this.showCelestialShift) {
						star.x += star.speedX;
						star.y += star.speedY;
						
						// 边界处理 - 更平滑的循环
						if (star.x > 105) star.x = -5;
						if (star.x < -5) star.x = 105;
						if (star.y > 105) star.y = -5;
						if (star.y < -5) star.y = 105;
						
						// 缓慢旋转
						star.rotation = (star.rotation + 0.1) % 360;
					}
					
					// 斗转星移模式 - 更激烈的运动
					if (this.showCelestialShift) {
						star.x += star.speedX * 5;
						star.y += star.speedY * 5;
						
						// 加速旋转并在屏幕边缘重新生成
						star.rotation = (star.rotation + 2) % 360;
						
						// 在屏幕边缘重新生成
						if (star.x > 105 || star.x < -5 || star.y > 105 || star.y < -5) {
							star.x = Math.random() * 100;
							star.y = Math.random() * 100;
							star.speedX = (Math.random() - 0.5) * 0.4;
							star.speedY = (Math.random() - 0.5) * 0.4;
							star.size = 1 + Math.random() * 3; // 随机改变大小
						}
					}
				});
			}, 50); // 50毫秒更新一次位置
		},
		
=======
		// 开始占卜
>>>>>>> 51e7c751b5abfc022cb2aa9ea104576777a88671
		startDivination() {
			if (!this.question) {
				uni.showToast({
					title: '请输入问题',
					icon: 'none'
				})
				return
			}
<<<<<<< HEAD
			
			// 重置所有状态，确保每次占卜都是新的开始
			this.showResult = false;
			this.formCardShape = false;
			this.flickerStars = false;
			this.fadeOutStars = false;
			
			// 1. 隐藏所有内容
			this.hideContent = true;
			
			// 2. 先显示星星随机移动，速度适中
			this.isStarsMoving = true;
			
			// 3. 半秒后显示占卜中提示
			setTimeout(() => {
				this.showProcessText = true;
				
				// 4. 1.5秒后开始斗转星移效果
				setTimeout(() => {
					this.showCelestialShift = true;
					
					// 5. 1秒后六边形形成
					setTimeout(() => {
						this.formCardShape = true;
						
						// 6. 0.5秒后开始闪烁效果
						setTimeout(() => {
							this.startFlickering();
							
							// 7. 2-3秒后淡出星星效果
							const fadeOutTime = 2000 + Math.random() * 1000;
							setTimeout(() => {
								this.fadeOutStars = true;
								
								// 8. 动画结束后显示结果
								setTimeout(() => {
									// 重置动画状态
									this.isStarsMoving = false;
									this.showCelestialShift = false;
									this.formCardShape = false;
									this.flickerStars = false;
									this.fadeOutStars = false;
									
									// 显示结果并隐藏提示
									this.showResult = true;
									this.hideContent = false;
									this.showProcessText = false;
									this.flickeringIndex = -1;
								}, 1000);
							}, fadeOutTime);
						}, 500);
					}, 1000);
				}, 1500);
			}, 500);
		},
		
		startFlickering() {
			this.flickerStars = true;
			this.flickerSequence();
		},
		
		flickerSequence() {
			// 随机选择一个星星闪烁
			const randomIndex = Math.floor(Math.random() * this.stars.length);
			this.flickeringIndex = randomIndex;
			
			// 300-600ms后选择另一个星星闪烁
			setTimeout(() => {
				if (this.flickerStars && !this.fadeOutStars) {
					this.flickerSequence();
				}
			}, 300 + Math.random() * 300);
=======
			this.showAnimation = true
			this.isShuffling = true
			this.initializeDeck()
			
			// 洗牌动画
			setTimeout(() => {
				this.isShuffling = false
				// 抽牌动画
				this.drawCards()
			}, 2000)
		},
		
		// 初始化牌组
		initializeDeck() {
			this.deck = this.tarotCards.map(card => ({
				...card,
				selected: false,
				position: Math.random() * 360
			}))
		},
		
		// 获取卡片样式
		getCardStyle(index) {
			const card = this.deck[index]
			return {
				transform: `rotate(${card.position}deg)`,
				zIndex: card.selected ? 100 : index
			}
		},
		
		// 抽牌
		drawCards() {
			// 随机选择3张牌
			const selectedIndices = []
			while (selectedIndices.length < 3) {
				const index = Math.floor(Math.random() * this.deck.length)
				if (!selectedIndices.includes(index)) {
					selectedIndices.push(index)
				}
			}
			
			// 依次展示选中的牌
			selectedIndices.forEach((index, i) => {
				setTimeout(() => {
					this.$set(this.deck[index], 'selected', true)
					this.selectedCards.push(this.deck[index])
					
					// 所有牌都展示完后，显示结果
					if (i === selectedIndices.length - 1) {
						setTimeout(() => {
							this.showAnimation = false
							this.showResult = true
						}, 1000)
					}
				}, i * 500)
			})
		},
		
		// 获取星星样式
		getStarStyle(index) {
			const x = Math.random() * 100
			const y = Math.random() * 100
			const size = Math.random() * 2 + 1
			const delay = Math.random() * 2
			
			return {
				left: `${x}%`,
				top: `${y}%`,
				width: `${size}rpx`,
				height: `${size}rpx`,
				animationDelay: `${delay}s`
			}
>>>>>>> 51e7c751b5abfc022cb2aa9ea104576777a88671
		}
	}
}
</script>

<style>
/* 星星背景样式 */
.star-background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
	pointer-events: none;
	background-color: rgba(0, 0, 0, 0.1);
}

.star {
	position: absolute;
	width: 4rpx;
	height: 4rpx;
	background-color: #fff;
	border-radius: 50%;
	opacity: 0.7;
	transition: opacity 1s ease;
	box-shadow: 0 0 3rpx #fff;
	transform-origin: center;
}

.star.animate {
	animation: twinkle 3s infinite alternate;
}

/* 星星随机运动 */
.star.moving {
	transition: none; /* 取消渐变让运动更流畅 */
}

/* 斗转星移效果 */
.star.celestial-shift {
	transition: none;
	box-shadow: 0 0 8rpx 2rpx rgba(255, 255, 255, 0.8);
	animation: rotate 8s linear infinite;
}

@keyframes rotate {
	from { transform: rotate(0deg) translate(3px) rotate(0deg); }
	to { transform: rotate(360deg) translate(3px) rotate(-360deg); }
}

/* 宇宙背景效果 */
.cosmic-bg {
	background: radial-gradient(ellipse at center, rgba(15, 10, 38, 0.2) 0%, rgba(10, 5, 25, 0.4) 100%);
	animation: cosmic-pulse 10s infinite alternate;
}

@keyframes cosmic-pulse {
	0% {
		background-size: 100% 100%;
	}
	50% {
		background-size: 120% 120%;
	}
	100% {
		background-size: 100% 100%;
	}
}

/* 星座连线效果 */
.constellation-lines {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: 
		radial-gradient(circle at 25% 35%, rgba(120, 120, 255, 0.2) 0.5%, transparent 2%),
		radial-gradient(circle at 75% 35%, rgba(120, 120, 255, 0.2) 0.5%, transparent 2%),
		radial-gradient(circle at 75% 65%, rgba(120, 120, 255, 0.2) 0.5%, transparent 2%),
		radial-gradient(circle at 50% 80%, rgba(120, 120, 255, 0.2) 0.5%, transparent 2%),
		radial-gradient(circle at 25% 65%, rgba(120, 120, 255, 0.2) 0.5%, transparent 2%),
		radial-gradient(circle at 50% 20%, rgba(120, 120, 255, 0.2) 0.5%, transparent 2%);
	opacity: 0;
	animation: constellation-fade 3s forwards;
}

.constellation-lines::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: 
		linear-gradient(to bottom right, transparent 49.5%, rgba(150, 150, 255, 0.1) 49.8%, rgba(150, 150, 255, 0.1) 50.2%, transparent 50.5%) no-repeat,
		linear-gradient(to bottom left, transparent 49.5%, rgba(150, 150, 255, 0.1) 49.8%, rgba(150, 150, 255, 0.1) 50.2%, transparent 50.5%) no-repeat,
		linear-gradient(to top, transparent 49.5%, rgba(150, 150, 255, 0.1) 49.8%, rgba(150, 150, 255, 0.1) 50.2%, transparent 50.5%) no-repeat;
	background-size: 
		50% 50%,
		50% 50%,
		100% 100%;
	background-position: 
		right top,
		left top,
		center bottom;
	opacity: 0;
	animation: lines-appear 2.5s 0.5s forwards;
}

@keyframes constellation-fade {
	0% { opacity: 0; }
	50% { opacity: 0.3; }
	100% { opacity: 0.2; }
}

@keyframes lines-appear {
	0% { opacity: 0; }
	100% { opacity: 1; }
}

.star.hexagon-shape {
	transform: translate(-50%, -50%);
}

/* 内容隐藏与显示的样式 */
.content-wrapper {
	position: relative;
	z-index: 20;
	opacity: 1;
	transition: opacity 0.5s ease;
}

.content-wrapper.hidden {
	opacity: 0;
	pointer-events: none;
}

/* 占卜过程文字提示 */
.divination-process {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 15;
}

.process-text {
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255, 215, 0, 0.5);
	opacity: 0;
	transition: opacity 1s ease;
	background-color: rgba(0,0,0,0.3);
	padding: 30rpx 50rpx;
	border-radius: 50rpx;
	backdrop-filter: blur(5rpx);
	display: flex;
	align-items: center;
}

.process-text.show {
	opacity: 1;
}

.animate-text {
	background: linear-gradient(90deg, #ffd700, #fff, #ffd700);
	background-size: 200% auto;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: shine 3s linear infinite;
}

.dots {
	overflow: hidden;
	display: inline-block;
	vertical-align: bottom;
	animation: dots 1.5s steps(4, end) infinite;
	width: 30rpx;
}

@keyframes shine {
	0% {
		background-position: 0% center;
	}
	100% {
		background-position: 200% center;
	}
}

@keyframes dots {
	0%, 20% {
		content: "";
	}
	40% {
		content: ".";
	}
	60% {
		content: "..";
	}
	80%, 100% {
		content: "...";
	}
}

/* 星星组成六边形的位置数据 */
/* 六边形顶点 */
.star:nth-child(6n + 0).hexagon-shape { left: 50%; top: 20%; }
.star:nth-child(6n + 1).hexagon-shape { left: 75%; top: 35%; }
.star:nth-child(6n + 2).hexagon-shape { left: 75%; top: 65%; }
.star:nth-child(6n + 3).hexagon-shape { left: 50%; top: 80%; }
.star:nth-child(6n + 4).hexagon-shape { left: 25%; top: 65%; }
.star:nth-child(6n + 5).hexagon-shape { left: 25%; top: 35%; }

/* 六边形边线 */
.star:nth-child(12n + 6).hexagon-shape { left: 35%; top: 25%; }
.star:nth-child(12n + 7).hexagon-shape { left: 65%; top: 25%; }
.star:nth-child(12n + 8).hexagon-shape { left: 65%; top: 75%; }
.star:nth-child(12n + 9).hexagon-shape { left: 35%; top: 75%; }
.star:nth-child(12n + 10).hexagon-shape { left: 20%; top: 50%; }
.star:nth-child(12n + 11).hexagon-shape { left: 80%; top: 50%; }

/* 内部填充 - 固定位置 */
.star:nth-child(18).hexagon-shape { left: 40%; top: 30%; }
.star:nth-child(19).hexagon-shape { left: 44%; top: 30%; }
.star:nth-child(20).hexagon-shape { left: 48%; top: 30%; }
.star:nth-child(21).hexagon-shape { left: 52%; top: 30%; }
.star:nth-child(22).hexagon-shape { left: 56%; top: 30%; }
.star:nth-child(23).hexagon-shape { left: 60%; top: 30%; }

.star:nth-child(24).hexagon-shape { left: 40%; top: 40%; }
.star:nth-child(25).hexagon-shape { left: 44%; top: 40%; }
.star:nth-child(26).hexagon-shape { left: 48%; top: 40%; }
.star:nth-child(27).hexagon-shape { left: 52%; top: 40%; }
.star:nth-child(28).hexagon-shape { left: 56%; top: 40%; }
.star:nth-child(29).hexagon-shape { left: 60%; top: 40%; }

.star:nth-child(30).hexagon-shape { left: 40%; top: 50%; }
.star:nth-child(31).hexagon-shape { left: 44%; top: 50%; }
.star:nth-child(32).hexagon-shape { left: 48%; top: 50%; }
.star:nth-child(33).hexagon-shape { left: 52%; top: 50%; }
.star:nth-child(34).hexagon-shape { left: 56%; top: 50%; }
.star:nth-child(35).hexagon-shape { left: 60%; top: 50%; }

/* 中心点和其他内部星星 - 固定位置 */
.star:nth-child(36).hexagon-shape { left: 45%; top: 40%; }
.star:nth-child(37).hexagon-shape { left: 47%; top: 40%; }
.star:nth-child(38).hexagon-shape { left: 49%; top: 40%; }
.star:nth-child(39).hexagon-shape { left: 51%; top: 40%; }
.star:nth-child(40).hexagon-shape { left: 53%; top: 40%; }
.star:nth-child(41).hexagon-shape { left: 55%; top: 40%; }

.star:nth-child(42).hexagon-shape { left: 45%; top: 44%; }
.star:nth-child(43).hexagon-shape { left: 47%; top: 44%; }
.star:nth-child(44).hexagon-shape { left: 49%; top: 44%; }
.star:nth-child(45).hexagon-shape { left: 51%; top: 44%; }
.star:nth-child(46).hexagon-shape { left: 53%; top: 44%; }
.star:nth-child(47).hexagon-shape { left: 55%; top: 44%; }

.star:nth-child(48).hexagon-shape { left: 45%; top: 48%; }
.star:nth-child(49).hexagon-shape { left: 47%; top: 48%; }
.star:nth-child(50).hexagon-shape { left: 49%; top: 48%; }
.star:nth-child(51).hexagon-shape { left: 51%; top: 48%; }
.star:nth-child(52).hexagon-shape { left: 53%; top: 48%; }
.star:nth-child(53).hexagon-shape { left: 55%; top: 48%; }

.star:nth-child(54).hexagon-shape { left: 45%; top: 52%; }
.star:nth-child(55).hexagon-shape { left: 47%; top: 52%; }
.star:nth-child(56).hexagon-shape { left: 49%; top: 52%; }
.star:nth-child(57).hexagon-shape { left: 51%; top: 52%; }
.star:nth-child(58).hexagon-shape { left: 53%; top: 52%; }
.star:nth-child(59).hexagon-shape { left: 55%; top: 52%; }

.star:nth-child(60).hexagon-shape { left: 45%; top: 56%; }
.star:nth-child(61).hexagon-shape { left: 47%; top: 56%; }
.star:nth-child(62).hexagon-shape { left: 49%; top: 56%; }
.star:nth-child(63).hexagon-shape { left: 51%; top: 56%; }
.star:nth-child(64).hexagon-shape { left: 53%; top: 56%; }
.star:nth-child(65).hexagon-shape { left: 55%; top: 56%; }

/* 其他星星 */
.star:nth-child(66).hexagon-shape { left: 35%; top: 35%; }
.star:nth-child(67).hexagon-shape { left: 40%; top: 35%; }
.star:nth-child(68).hexagon-shape { left: 45%; top: 35%; }
.star:nth-child(69).hexagon-shape { left: 50%; top: 35%; }
.star:nth-child(70).hexagon-shape { left: 55%; top: 35%; }
.star:nth-child(71).hexagon-shape { left: 60%; top: 35%; }
.star:nth-child(72).hexagon-shape { left: 65%; top: 35%; }

.star:nth-child(73).hexagon-shape { left: 35%; top: 45%; }
.star:nth-child(74).hexagon-shape { left: 40%; top: 45%; }
.star:nth-child(75).hexagon-shape { left: 45%; top: 45%; }
.star:nth-child(76).hexagon-shape { left: 50%; top: 45%; }
.star:nth-child(77).hexagon-shape { left: 55%; top: 45%; }
.star:nth-child(78).hexagon-shape { left: 60%; top: 45%; }
.star:nth-child(79).hexagon-shape { left: 65%; top: 45%; }

.star:nth-child(80).hexagon-shape { left: 35%; top: 55%; }
.star:nth-child(81).hexagon-shape { left: 40%; top: 55%; }
.star:nth-child(82).hexagon-shape { left: 45%; top: 55%; }
.star:nth-child(83).hexagon-shape { left: 50%; top: 55%; }
.star:nth-child(84).hexagon-shape { left: 55%; top: 55%; }
.star:nth-child(85).hexagon-shape { left: 60%; top: 55%; }
.star:nth-child(86).hexagon-shape { left: 65%; top: 55%; }

.star:nth-child(87).hexagon-shape { left: 35%; top: 65%; }
.star:nth-child(88).hexagon-shape { left: 40%; top: 65%; }
.star:nth-child(89).hexagon-shape { left: 45%; top: 65%; }
.star:nth-child(90).hexagon-shape { left: 50%; top: 65%; }
.star:nth-child(91).hexagon-shape { left: 55%; top: 65%; }
.star:nth-child(92).hexagon-shape { left: 60%; top: 65%; }
.star:nth-child(93).hexagon-shape { left: 65%; top: 65%; }

.star:nth-child(94).hexagon-shape { left: 45%; top: 60%; }
.star:nth-child(95).hexagon-shape { left: 50%; top: 60%; }
.star:nth-child(96).hexagon-shape { left: 55%; top: 60%; }
.star:nth-child(97).hexagon-shape { left: 47%; top: 65%; }
.star:nth-child(98).hexagon-shape { left: 50%; top: 70%; }
.star:nth-child(99).hexagon-shape { left: 53%; top: 65%; }

/* 闪烁效果 */
.star.flicker {
	animation: flicker 0.5s infinite alternate;
	background-color: #ffd700;
	box-shadow: 0 0 10rpx 2rpx #ffd700;
	z-index: 11;
}

@keyframes twinkle {
	0% {
		opacity: 0.3;
		transform: scale(0.8);
	}
	50% {
		opacity: 0.6;
		transform: scale(0.9);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes flicker {
	0% {
		opacity: 0.5;
		transform: scale(1);
		box-shadow: 0 0 5rpx #ffd700;
	}
	50% {
		opacity: 1;
		transform: scale(1.8);
		box-shadow: 0 0 15rpx 5rpx #ffd700;
	}
	100% {
		opacity: 0.8;
		transform: scale(1.5);
		box-shadow: 0 0 10rpx 3rpx #ffd700;
	}
}

.container {
	min-height: 100vh;
	background: #000;
	color: #fff;
	padding: 20rpx;
	position: relative;
	overflow: hidden;
}

.star-field {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	background: radial-gradient(circle at center, #000 0%, #1a0b2e 100%);
	pointer-events: none;
}

.stars {
	position: absolute;
	width: 2rpx;
	height: 2rpx;
	background: #fff;
	border-radius: 50%;
	animation: twinkle 2s infinite;
	box-shadow: 0 0 5rpx #fff;
}

@keyframes twinkle {
	0%, 100% { opacity: 0.2; transform: scale(1); }
	50% { opacity: 1; transform: scale(1.5); }
}

.tarot-animation {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
}

.tarot-deck {
	position: relative;
	width: 300rpx;
	height: 500rpx;
	perspective: 1000rpx;
}

.tarot-card {
	position: absolute;
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.tarot-deck.shuffling .tarot-card {
	animation: shuffle 2s infinite;
}

@keyframes shuffle {
	0% { transform: rotate(0deg) translateY(0); }
	25% { transform: rotate(90deg) translateY(-20rpx); }
	50% { transform: rotate(180deg) translateY(0); }
	75% { transform: rotate(270deg) translateY(20rpx); }
	100% { transform: rotate(360deg) translateY(0); }
}

.card-back, .card-front {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 20rpx;
	box-shadow: 0 0 20rpx rgba(255,215,0,0.3);
}

.card-back {
	
	background-image: url('../../static/tarot/tarot_backend.jpeg');
	background-size: cover;
	transform: rotateY(180deg);
}

.card-front {
	background: rgba(255,215,0,0.1);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20rpx;
	transform: rotateY(0deg);
}

.card-name {
	font-size: 36rpx;
	color: #ffd700;
	text-shadow: 0 0 10rpx rgba(255,215,0,0.5);
	margin-bottom: 20rpx;
}

.card-meaning {
	font-size: 28rpx;
	color: #e6d5ff;
	text-align: center;
	line-height: 1.5;
}

.tarot-card.selected {
	transform: translateY(-100rpx) rotateY(180deg);
	animation: cardGlow 2s infinite;
}

@keyframes cardGlow {
	0%, 100% { box-shadow: 0 0 20rpx rgba(255,215,0,0.3); }
	50% { box-shadow: 0 0 40rpx rgba(255,215,0,0.6); }
}

.tarot-result {
	position: relative;
	z-index: 2;
	width: 100%;
	padding: 40rpx;
	box-sizing: border-box;
	opacity: 0;
	transform: translateY(20rpx);
	animation: resultShow 0.5s forwards;
}

@keyframes resultShow {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.question-card,
.cards-card,
.interpretation-card,
.summary-card,
.reminder-card {
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

.question-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.question-input {
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

.cards-content {
	display: flex;
	justify-content: center;
}

.cards-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
}

.card-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
}

.card-image {
	width: 120rpx;
	height: 200rpx;
	background: rgba(255,255,255,0.03);
	border-radius: 10rpx;
	border: 1rpx solid rgba(255,215,0,0.1);
	display: flex;
	align-items: center;
	justify-content: center;
}

.card-position {
	font-size: 24rpx;
	color: #e6d5ff;
}

.interpretation-content,
.summary-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.interpretation-item,
.summary-item {
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

.reminder-content {
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
</style>
