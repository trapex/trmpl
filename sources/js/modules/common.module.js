export default {

	isMobile() {
		return ($(window).width() <= 680);
	},

	isMobileOrTablet() {
		return ($(window).width() < 1263); // 1280 - ширина скролла
	}
};