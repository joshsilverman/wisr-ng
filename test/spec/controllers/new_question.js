'use strict';

describe('Controller: NewQuestionCtrl', function () {

  // load the controller's module
  beforeEach(module('wisrNgApp'));

  var NewQuestionCtrl, scope, $httpBackend, _NewQuestionRsrc;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    $httpBackend = $injector.get('$httpBackend');

    _NewQuestionRsrc = $injector.get('NewQuestionRsrc');
    spyOn(_NewQuestionRsrc, 'save');

    NewQuestionCtrl = $controller('NewQuestionCtrl', {
      $scope: scope,
      NewQuestionRsrc: _NewQuestionRsrc
    });
  }));

  it('should attach a list of incorrect answers to the scope', function () {
    expect(scope.incorrectAnswers.length).toBe(1);
  });

  it('should make api request on submit', function() {
    scope.currentAsker = {id: 123};
    scope.question = {text: '?'};
    scope.correctAnswer = {text: 'y'};
    scope.incorrectAnswers = [{text: 'no'}];

    scope.submit();

    expect(_NewQuestionRsrc.save).toHaveBeenCalled();
  });

  it('wont make api request on submit if current asker undefined', function() {
    scope.currentAsker = {};
    scope.question = {text: '?'};
    scope.correctAnswer = {text: 'y'};
    scope.incorrectAnswers = [{text: 'no'}];

    scope.submit();

    expect(_NewQuestionRsrc.save.calls.length).toEqual(0);
  });

  it('wont make api request on submit if question undefined', function() {
    scope.currentAsker = {id: 123};
    scope.question = {};
    scope.correctAnswer = {text: 'y'};
    scope.incorrectAnswers = [{text: 'no'}];

    scope.submit();

    expect(_NewQuestionRsrc.save.calls.length).toEqual(0);
  });

  it('wont make api request on submit if correct answer undefined', function() {
    scope.currentAsker = {id: 123};
    scope.question = {text: '?'};
    scope.correctAnswer = {};
    scope.incorrectAnswers = [{text: 'no'}];

    scope.submit();

    expect(_NewQuestionRsrc.save.calls.length).toEqual(0);
  });

  it('wont make api request on submit if incorrect answer undefined', function() {
    scope.currentAsker = {id: 123};
    scope.question = {text: '?'};
    scope.correctAnswer = {text: 'y'};
    scope.incorrectAnswers = [{}];

    scope.submit();

    expect(_NewQuestionRsrc.save.calls.length).toEqual(0);
  });
});
