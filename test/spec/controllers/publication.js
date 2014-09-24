'use strict';

describe('Controller: PublicationCtrl', function () {

  // load the controller's module
  beforeEach(module('wisrNgApp'));

  var PublicationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.publication = {_question: {correct_answer_id: 123}};

    PublicationCtrl = $controller('PublicationCtrl', {
      $scope: scope
    });
  }));

  it('answering a question correctly sets promptForNewQuestion to true on scope', function () {
    scope.$emit('AnswerCtrl:correct');
    expect(scope.promptForNewQuestion).toBe(true);
  });
});
