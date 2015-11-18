(function() {
  'use strict';

  angular
    .module('cmder')
    .directive('installFlipper', installFlipper)
    .controller('installFlipperController', installFlipperController);

  /** @ngInject */
  function installFlipper(){
    return {
      restrict: 'E',
      templateUrl: 'app/components/installFlipper/installFlipper.html',
      controller: 'installFlipperController as installFlipperCtrl',
      bindToController: true,
      scope: {
        stageHolder: '=',
        onClick: '&'
      }
    };
  }

  /** @ngInject */
  function installFlipperController($log){
    var vm = this;

    vm.checkStage = function(){
      console.log(vm.stageHolder);
      if(vm.stageHolder.installStage === 'pending'){
        vm.pending  = true;
        vm.running  = false;
        vm.complete = false;
      }
      else if(vm.stageHolder.installStage === 'running'){
        vm.pending  = false;
        vm.running  = true;
        vm.complete = false;
      }
      else if(vm.stageHolder.installStage === 'complete'){
        vm.pending  = false;
        vm.running  = false;
        vm.complete = true;
      }
    };
    vm.checkStage();

    vm.directiveSelect = function(input){
      $log.log('directiveSelect called');
      $log.log(input);
      vm.onClick();
      vm.checkStage();
      setTimeout(function(){
        vm.checkStage();
        $('#installRunningButton').hide();
        $('#installCompleteButton').show();
        $('#installCompleteButton').removeClass('ng-hide');
      }, 7000);
    };
  }

})();
