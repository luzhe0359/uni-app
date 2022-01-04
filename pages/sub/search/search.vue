<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search-box">
			<uni-search-bar @input="input" v-model="keywords" :radius="100" :cancelButton="'none'" :focus="true">
			</uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchList.length">
			<view class="sugg-item" v-for="(item, i) in searchList" :key="i" @click="goToDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史列表 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="16" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="goToGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,
				// 搜索关键词
				keywords: '',
				// 搜索列表
				searchList: [],
				// 搜索关键词的历史记录
				historyList: [],

			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('keywords') || '[]')
		},
		methods: {
			input() {
				// 清除 timer 对应的延时器
				clearTimeout(this.timer)
				// 重新启动一个延时器，并把 timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
					this.getSearchList()
				}, 500)
			},
			// 获取搜索列表数据
			async getSearchList() {
				if (this.keywords.trim() === '') {
					this.searchList = []
					return
				}
				const res = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keywords
				})
				this.searchList = res.message
				this.saveSearchHistory()
			},

			// 保存关键词搜索历史 
			saveSearchHistory() {
				this.historyList.unshift(this.keywords)
				this.historyList = [...new Set(this.historyList)]
				// 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('keywords', JSON.stringify(this.historyList))
			},
			// 清除搜索历史
			cleanHistory() {
				// 清空 data 中保存的搜索历史
				this.historyList = []
				// 清空本地存储中记录的搜索历史
				uni.removeStorageSync('keywords')
				uni.$msg('已清空')
			},
			// 跳转详情页面
			goToDetail(goods_id) {
				uni.navigateTo({
					url: '/pages/sub/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			// 跳转商品列表页面
			goToGoodsList(keywords) {
				uni.navigateTo({
					url: '/pages/sub/goods_list/goods_list?query=' + keywords
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-searchbar {
		/* 将默认的 #FFFFFF 改为 #C00000 */
		background-color: #c00000;
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 14px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;
			padding: 5px 0;

			.uni-tag {
				margin-top: 5px;
				margin-right: 5px;
			}
		}
	}
</style>
