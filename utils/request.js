// 请求的封装
// 基础路径
const BSAE_URL = "https://www.uinav.com"

var HTTP = {}
HTTP.get = function(url, params, contentType) {
	return http(url, 'GET', params, contentType)
}
HTTP.post = function(url, params, contentType) {
	return http(url, 'POST', params, contentType)
}
HTTP.delete = function(url, params, contentType) {
	return http(url, 'DELETE', params, contentType)
}
HTTP.put = function(url, params, contentType) {
	return http(url, 'PUT', params, contentType)
}

function http(url, type, params, contentType) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
		    title: '加载中...'
		});
		uni.request({
			url: BSAE_URL + url, // 就是拼接上前缀,此接口域名是开放接口，可访问
			method: type, // 接口的请求类型
			data:params,
			success(res) {
				const data = res.data
				if (data.meta.status !== 200) return uni.$msg()
				resolve(data)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})

	})



}

module.exports = HTTP
