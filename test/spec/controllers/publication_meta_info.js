'use strict';

describe('Controller: PublicationMetaInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('wisrNgApp'));

  var PublicationMetaInfoCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicationMetaInfoCtrl = $controller('PublicationMetaInfoCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  // });
});
