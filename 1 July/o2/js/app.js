var app=angular.module('myapp',[]);
app.constant('api_prefix','https://zenways-contact.herokuapp.com/api/');
app.value('sum',function(a,b){
	return a+b;
});
app.run(function(){
	
});

app.controller('ACtrl',function($scope,$q,$http,api_prefix,sum){
	console.log(sum(5,6));
	$scope.init=function(){
		$http({
			url:api_prefix+'contacts',
			headers:{
				key:'ABCD'
			}
		}).then(function(response){
			console.log(response);
			$scope.contacts=response.data.contacts;
		},function(response){
			console.log(response);
		});
	}
	$scope.init();
	
	$scope.submitContact=function(){
		$http({
			url:api_prefix+'contact',
			method:'POST',
			headers:{
				key:'ABCD'
			},
			data:$scope.contact
		}).then(function(response){
			console.log(response);
			$scope.init();
			
		},function(response){
			console.log(response);
		});
	}
	var square=function(x){
		return x*x;
	}
	
	var asyncSquare=function(x){
		setTimeout(function(){
			console.log('Async Square called');
			return x*x;
		},1000);
	}
	
	var promisedSquare=function(x){
		return $q(function(resolve,reject){
			setTimeout(function(){
				if(x<0) reject('negative number');
				console.log('Promised Square called');
				resolve(x*x);
			},1000);
		});		
	}
	
	$scope.myFunction=function(){
		/*
		promisedSquare($scope.num).then(function(response){
			$scope.result=response;
		},function(response){
			alert('Error occuured' +response);
		});
		*/
		
		$http({
			url:'http://api.fixer.io/latest',
			params:{
				base:'USD',
				symbols:'INR'
			}
		}).then(function(response){
			console.log(response);
			$scope.result=response.data.rates.INR*$scope.num;
		},function(response){
			console.log(response);
		});
		
	}
	
});