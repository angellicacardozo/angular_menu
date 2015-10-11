(function() {
	'use strict';

	angular.module('onyoApp')
		.controller('MenuController', MenuController)
		.config(function($routeProvider) {
			$routeProvider
				.when('/menu', {
					templateUrl: 'views/menu/main.html',
					controller: 'MenuController',
					controllerAs: 'menu'
				})
		});

	function MenuController($scope, MenuService) {

		var me= this;

		me.productToCopy= [];

		me.crrTarget= null;

		MenuService.getMenu()
		.then(function(response) {
			me.model = MenuService.responseToModel(response);
			me.products = MenuService.getProductList(response);
		});

		me.addProductToCopy= function(product) {
			// Is there any object like this one in our array?
			var result = $.grep(me.productToCopy, function(el){ 
				return product === el; 
			});

			if(result.length > 0) {
				// remove it
				me.productToCopy = me.productToCopy
					               .filter(function (el) {
					                        return product === el;
					                       });
			} else {
				// keep it
				me.productToCopy.push(product);
			}			
		};

		me.setTarget= function(product) {
			me.crrTarget= product;
		};

		me.copyProducts= function() {
			var itemlist= MenuService.copyProductListFrom(me.productToCopy);
			var crrTime= new Date().getTime();
			
			for(var i=0; i < itemlist.length; i++){
				var p= MenuService.rCopy(itemlist[i]);
				p.hashId = p.numericalId + '-' + crrTime;
				me.crrTarget.products.push(p);
			}

			itemlist= null;
			me.productToCopy= [];
			me.crrTarget= null;
		};

		me.cleanProductsList= function() {
			me.productToCopy= [];
			me.crrTarget= null;
		};

		me.removeItem= function(itemparent, product) {
			var indexOf= itemparent.products.indexOf(product);

			if(indexOf!==-1) {
				itemparent.products.splice(indexOf, 1);
			}
		}
	};
})();	