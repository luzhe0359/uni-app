<template>
	<view>
		<search-bar @click="goToSearch"></search-bar>
		<view class="scroll-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item,i) in cateList" :key="item.cat_id">
					<view class="left-scroll-item" :class="{active: i == active}" @click="changeActive(i)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevelTwo" :key="i2">
					<view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3"
							@click="goToGoodsList(item3)">
							<!-- 图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js'

	export default {
		mixins: [tabbarBadge],
		data() {
			return {
				wh: 0,
				// 分类列表
				cateList: [],
				active: 0,
				cateLevelTwo: [],
				scrollTop: 0
			};
		},
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 为 wh 窗口可用高度动态赋值 (减去search-bar高度)
			this.wh = sysInfo.windowHeight - 50

			this.getCateList()
		},
		methods: {
			// 获取分类导航
			async getCateList() {
				const res = await uni.$http.get('/api/public/v1/categories')
				this.cateList = res.message
				// 为二级分类赋值
				this.cateLevelTwo = this.cateList[0].children
			},
			// 切换一级分类
			changeActive(i) {
				this.active = i
				// 为二级分类列表重新赋值
				this.cateLevelTwo = this.cateList[i].children
				this.scrollTop = Math.random()
			},
			// 点击三级分类项跳转到商品列表页面
			goToGoodsList(item3) {
				uni.navigateTo({
					url: '/pages/sub/goods_list/goods_list?cid=' + item3.cat_id
				})
			},
			// 跳转到搜索页面
			goToSearch() {
				uni.navigateTo({
					url: '/pages/sub/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-container {
		display: flex;

		.left-scroll {
			width: 120px;

			.left-scroll-item {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.right-scroll {
			.cate-lv2-title {
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}

			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					width: 33.33%;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
