<template>
	<view class="search-container" :style="{'background-color': bgcolor}" @click="searchHandler">
		<view class="search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="16"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search-bar",
		props: {
			// 背景颜色
			bgcolor: {
				type: String,
				default: '#C00000'
			},
			// 圆角尺寸
			radius: {
				type: Number,
				// 单位是 px
				default: 18
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		// 移除背景颜色，改由 props 属性控制
		// background-color: #C00000;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.search-box {
		height: 36px;
		background-color: #ffffff;
		// 移除圆角尺寸，改由 props 属性控制
		// border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 16px;
			margin-left: 6px;
		}
	}
</style>
