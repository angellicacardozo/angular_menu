angular.module('menuDirectives', [])
	.directive('menuPicture', function() {
		var ddo= {};
		ddo.restrict = 'E';

		ddo.scope = {
			alt: '@',
			image: '@'
		};

		ddo.transclude = false;

		ddo.template = '<img alt="{{ alt }}" src="{{ src }}" />';

		ddo.link = function(scope, el, attrs) {

			var image;

			if(attrs.image==='') {
				scope.src = 'images/placeholder.png';
			} else {
				image= JSON.parse(attrs.image);
				scope.src = image.url;
			}

		};

		return ddo;
	})
	.directive('openList', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			var cmd= $(el);
			var overlay = $('#overlay');
			var list = $('#productlist');

			cmd.on('click', function() {
				list.addClass('show');
				overlay.addClass('show');

				return false;
			});
		};

		return ddo;

	})
	.directive('openCatList', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			var cmd= $(el);
			var overlay = $('#overlay');
			var list = $('#catlist');

			cmd.on('click', function() {
				list.addClass('show');
				overlay.addClass('show');

				return false;
			});
		};

		return ddo;
	})
	.directive('closeList', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			var cmd= $(el);
			var overlay = $('#overlay');
			var list = $('#productlist');

			cmd.on('click', function() {
				list.removeClass('show');
				overlay.removeClass('show');
				$('.selected').removeClass('selected');

				return false;
			});
		};

		return ddo;
	})
	.directive('callController', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			var cmd= $(el);

			cmd.on('click', function() {

				return false;
			});
		};

		return ddo;
	})
	.directive('scroolTo', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			$(el).on('click', function() {
				var to= $($(el).attr('href'));

				window.scrollTo(0, $(to[0]).offset().top - 165);

				$('#overlay').removeClass('show');
				$('#catlist').removeClass('show');

				return false;
			});
		};

		return ddo;
	})
	.directive('setChoiceStatus', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			$(el).on('click', function() {
				
				if($(el).hasClass('selected')) {
					$(el).removeClass('selected')
				} else {
					$(el).addClass('selected')
				}

				return false;
			});
		};

		return ddo;
	})
	.directive('setHoverStatus', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			$(el).hover(function() {
				$(el).addClass('hover');
			}, function() {
				$(el).removeClass('hover');
			});
		};

		return ddo;
	})
	.directive('focusHashedItem', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			if(attrs.id !== '' && scope.$last) {
				
				window.setTimeout(function () {
					var target= $('#' + attrs.id);

					if(target.offset() !== undefined) {
						$('html,body').animate({
						          scrollTop: target.offset().top - 175
						        }, '500', 'swing', function() { 

						        $('#message').addClass('show');
						   		setTimeout(function() {
						   			$('#message').removeClass('show');
						   		}, 2000);
						});
					}
				}, 900);
			}
		};

		return ddo;
	})
	.directive('keepMenuHeader', function() {
		var ddo = {};
		ddo.restrict = 'A';

		ddo.link = function(scope, el, attrs) {

			/*
			$(window).scroll(function(d,h) {

				// We  are looking for the visible one (LI)
				$.each($(el).find('>li'), function( index, value ) {
				   var crrAnchor= $(value).find('>a');

				   console.log(' Is LI visible ?' , $(value).visible(), crrAnchor.visible());

				});
				  	
			});
			*/
		};

		return ddo;
	});