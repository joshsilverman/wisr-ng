'use strict';

describe('Controller: NewQuestionCtrl', function () {

  // load the controller's module
  beforeEach(module('wisrNgApp'));

  var NewQuestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewQuestionCtrl = $controller('NewQuestionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of incorrect answers to the scope', function () {
    expect(scope.incorrectAnswers.length).toBe(1);
  });
});
