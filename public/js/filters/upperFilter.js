angular.module("churchs").filter("upper", function () {
	return function (input) {
		if (!input) return;
		return input.toUpperCase();
	};
});