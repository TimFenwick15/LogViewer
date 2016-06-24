var app = angular.module('logGUIApp', []);
app.controller('logGUIController', function($scope, $http) {

  $scope.refresh = 'yes';

  $scope.getLog = function(chosenFile = $scope.selected) {
    $scope.selected = chosenFile;
    $.get({url: chosenFile, cache: false}, function(responseLog) {
      $scope.rightText = responseLog.split('\n');
      $scope.$apply();
    }, 'text');
  };

  (function worker(){
    if ($scope.refresh === 'yes')
      $http({
        method: 'GET',
        url: '/'
      }).then(function(responseList){
          $scope.leftText = responseList.data
            .split('')
            .reverse()
            .join('')
            .split('"')
            .filter(x => x.indexOf('gol.') === 0)
            .map(x => x.split('').reverse().join(''))
            .sort();
          if ($scope.leftText.length === 0) throw 'no .log files';
          if (!$scope.selected) $scope.selected = $scope.leftText[0];
          $scope.getLog();
      }).catch(function(err) {
        if (typeof(err) === 'object') err = 'no response from server';
	$scope.leftText = ['Error, files not found, ' + err];
	  });
    setTimeout(worker, 10000);
  })();
})
