'use strict';

describe('Directive: quizquestion', function () {

  // load the directive's module
  beforeEach(module('wisrNgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<quizquestion></quizquestion>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the quizquestion directive');
  }));
});
