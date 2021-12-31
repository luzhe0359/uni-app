module.exports = (title = '数据加载失败！', duration = 1500) => {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}
