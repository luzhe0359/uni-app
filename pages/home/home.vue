<template>
	<view>
		<view class="home-search">
			
		<search-bar @click="goToSearch"></search-bar>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="`/pages/sub/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="item in navList" :key="item.name" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="item in floorList" :key="item.name">
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width+ 'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(img,index) in item.product_list" :key="index" v-if="index !== 0" :url="img.url">
							<image :src="img.image_src"  :style="{width: img.image_width+ 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图列表
				swiperList: [],
				// 分类导航列表
				navList: [],
				// 楼层数据列表
				floorList:[]
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 获取轮播图
			async getSwiperList() {
				const res = await uni.$http.get('/api/public/v1/home/swiperdata')
				this.swiperList = res.message
			},
			// 获取分类导航
			async getNavList() {
				const res = await uni.$http.get('/api/public/v1/home/catitems')
				this.navList = res.message
			},
			// 获取楼层数据
			async getFloorList() {
				const res = await uni.$http.get('/api/public/v1/home/floordata')
				// 通过双层 forEach 循环，处理 URL 地址
				  res.message.forEach(floor => {
				    floor.product_list.forEach(prod => {
				      prod.url = '/pages/sub/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				    })
				  })
				this.floorList = res.message
			},
			// 跳转分类界面
			navClickHandler(nav) {
				if(nav.name === '分类') {
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			// 跳转到搜索页面
			goToSearch() {
				uni.navigateTo({
				  url: '/pages/sub/search/search'
				})
			}
		},
	}
</script>

<style lang="scss">
	
	.home-search {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-title {
		width: 100%;
		height: 60rpx;
		display: block;
	}
	
	
	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}
	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

</style>
