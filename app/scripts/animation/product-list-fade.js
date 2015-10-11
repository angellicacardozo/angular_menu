$(document).ready(function() {
	console.log(angular.element('.append-product'));

	$('.append-product').on('click', function() {
		console.log('Click');

		return false;
	});
});