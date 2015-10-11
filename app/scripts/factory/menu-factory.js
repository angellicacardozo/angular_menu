'use strict';

angular.module('onyoApp')
.factory('MenuService', function($http, $q) {

	var me= this;
	me.productList=[];

	function getMenu() {
		var me= this;

		var categories = $http.get('http://api.onyo.com/v1/mobile/company/1');
		var products = $http.get('http://api.onyo.com/v1/mobile/company/1/products');

		return $q.all([categories, products]);
	}

	function filterProductList(tocompare, productList) {

		return productList.filter(function (product) {

			if(typeof tocompare === "string") {
				return tocompare.match(product.numericalId) !== null;
			} else if(typeof tocompare === "object" && tocompare.numericalId!==undefined) {
				return tocompare.numericalId === product.numericalId;
			}
			   
		});
	}

	function copyProductListFrom(productList) {

		var tmp = [];

		for(var i= 0; i < productList.length;i++) {

			(function(j) {
				var list= [];
				if(productList[j].products !== undefined) {
					list =  productList[j].products;
				}

				tmp.push({
					numericalId: productList[j].numericalId,
					name: productList[j].name,
					products: list,
					fullDescription: productList[j].fullDescription,
					type: productList[j].type,
					price: productList[j].price,
					image: productList[j].image
				});

			})(i);
		}

		return tmp;
	}

	function rCopy(product) {

		if(product.products===undefined) {
			console.log(' 		A lista é undefined para o produto ', product);
			product.products= [];
			return;
		}

		var tmp = product.products.slice();	

		for(var i= 0; i < tmp.length;i++) {

			(function(j) {

				// Transformar em obj antes de chamar recursivamente
				var list= filterProductList(tmp[j], me.productList);

				if(list.length > 0) {
					// Encontrou o produto procurado

					product.products[j] = copyProductListFrom(list)[0];
					rCopy(copyProductListFrom(copyProductListFrom(list))[0]);

				} else {
					// Como remover ?
					// product.products.splice(j, 1);
				}

			})(i);			
		}

		return product;
	}

	function filterProductListByCategory(catId, productList) {
		return productList.filter(function (product) {
				if(product.category !==null) {
					return product.category.match(catId)!==null;
				}

				return false;			   
			});	
	}

	function getProductList(result) {
		var products = result[1].data.data; // products

		return copyProductListFrom(products);
	}

	function responseToModel(result) {

		me.model= {};
		me.productList = [];

		var response = result[0].data; // categories

			me.model.name = response.name;
			me.model.categories = response.categories;

		var products = result[1].data; // products

			me.productList = products.data;

		// Bind crr products to their list
		for(var i= 0; i < me.model.categories.length; i++) {
			// Do closure in order to protect scope (close over)
			var cat = me.model.categories[i];
			(function(j, cat) {		
				var list = filterProductListByCategory(cat.numericalId, me.productList);
				cat.products = copyProductListFrom(list);
			})(i, cat);					
		} // end for

		// Bind products in their compositions
		for(var i= 0; i < me.model.categories.length; i++) {
			var cat = me.model.categories[i];
				
			for(var k= 0; k < cat.products.length; k++) {
				var product = cat.products[k];	
				var tmp = product.products.slice();

				product.products = [];

				for(var l= 0; l < tmp.length; l++) {
					var productUrl = tmp[l];

					(function(url, product, m) {
						var r = filterProductList(url, me.productList);

						if(r.length > 0) {
							product
							.products
							.push(copyProductListFrom(r)[0]);
						}

					})(productUrl, product, l);
				}
			}
		}// end for

		// Transform single product reference into composition
		for(var i= 0; i < me.model.categories.length; i++) {
			var cat = me.model.categories[i];

			for(var j= 0; j < cat.products.length; j++) {
				var product = cat.products[j];

			for(var k= 0; k < product.products.length; k++) {
				var composition = product.products[k];
				var tmp = composition.products.slice();	

				composition.products= [];			

				for(var l= 0; l < tmp.length; l++) {
					var productUrl = tmp[l];

					(function(url, composition, m) {
						var r = filterProductList(url, me.productList);

						if(r.length>0) {
							composition
								.products
								.push(copyProductListFrom(r)[0]);
						}

					})(productUrl, composition, l);
				}
			}
			}
		}

		return me.model;
	} // end response to model

	return {
		getMenu: getMenu,
		responseToModel: responseToModel,
		getProductList: getProductList,
		copyProductListFrom: copyProductListFrom,
		rCopy: rCopy
	};
});