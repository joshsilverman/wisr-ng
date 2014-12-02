'use strict';

describe('Directive: quizDetailEditor', function () {

  // load the directive's module
  beforeEach(module('wisrNgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<quiz-detail-editor></quiz-detail-editor>');
  //   element = $compile(element)(scope);
  //   expect(element.text()).toBe('this is the quizDetailEditor directive');
  // }));
});
