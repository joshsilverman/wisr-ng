'use strict';

var element,
  scope,
  lessonItem = {
    "question_id":3787,
    "asker_id":18,
    "_answers": {
      "16519":"All of the above ",
      "16520":"tRNA is a small molecule in cells that carries amino acids to ribosomes.",
      "16522":"The codon on the tRNA attaches to the complementary bases on the strand of mRNA "},
    "_question":{
      "id":3787,
      "text":"Which of these statements about translation are true? ",
      "correct_answer_id":16519,
      "author_twi_screen_name":"StudyEgg",
      "created_at":"2012-09-20T22:44:00.980Z"},
    "_answer_counts":{
      "correct":"49",
      "incorrect":"21"},
    "_asker":{"id":18},
    "_lesson":{
      "id":421,
      "name":"Ser y Estar",
      "created_at":"2014-11-23T18:26:08.942Z",
      "updated_at":"2014-11-23T21:03:59.372Z",
      "type_id":6,
      "_question_count":1,
      "questionbase_id":null,
      "user_id":237200,
      "asker_id":13588,
      "published":false},
    "created_at":"2012-09-20T22:44:00.980Z"};

var directiveInvocation = '\
  <quiz-question \
    lesson-item="lessonItem" \
    question="question" \
    correct-answer="correctAnswer" \
    incorrect-answers="incorrectAnswers"></quiz-question>';

describe('Directive: quizQuestion', function () {

  // load the directive's module
  beforeEach(module('wisrNgApp'));
  beforeEach(module('/scripts/components/quizmaker/quizQuestion.html'));

  beforeEach(inject(function ($rootScope, $httpBackend) {
    scope = $rootScope.$new();
  }));

  it('should assign correctAnswer', inject(function ($compile) {
    element = angular.element(directiveInvocation);
    element = $compile(element)(scope);
    scope.lessonItem = lessonItem;
    scope.$digest();
    expect(scope.correctAnswer).toBeDefined();
    expect(scope.correctAnswer.text).toBeDefined();
  }));

  it('should assign incorrectAnswers', inject(function ($compile) {
    element = angular.element(directiveInvocation);
    scope.lessonItem = lessonItem;
    element = $compile(element)(scope);
    scope.$digest();
    expect(scope.incorrectAnswers).toBeDefined();
    expect(scope.incorrectAnswers[0].text).toBeDefined();
  }));

  it('should assign question', inject(function ($compile) {
    element = angular.element(directiveInvocation);
    scope.lessonItem = lessonItem;
    element = $compile(element)(scope);
    scope.$digest();
    expect(scope.question).toBeDefined();
    expect(scope.question.text).toBeDefined();
  }));
});

describe('Directive: quizQuestion#addAnswer', function () {

  // load the directive's module
  beforeEach(module('wisrNgApp'));
  beforeEach(module('/scripts/components/quizmaker/quizQuestion.html'));

  beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
    scope = $rootScope.$new();

    $httpBackend.when('POST', 'http://dev.localhost/answers.json').respond({
      id: 123,
      text: ''
    });

    element = angular.element(directiveInvocation);
    scope.lessonItem = lessonItem;
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('should add another answer after clicking add answer', inject(function ($compile, $httpBackend) {
    expect(scope.incorrectAnswers.length).toEqual(2);

    var addAnsElmnt = angular.element($(element).find('.add-answer')[0])
    addAnsElmnt.triggerHandler('click');

    $httpBackend.flush();
    expect(scope.incorrectAnswers.length).toEqual(3);
  }));

  it('wont add more than 3 incorrect answers', inject(function ($compile, $httpBackend) {
    expect(scope.incorrectAnswers.length).toEqual(2);

    var addAnsElmnt = angular.element($(element).find('.add-answer')[0])
    
    addAnsElmnt.triggerHandler('click');
    $httpBackend.flush();
    expect(scope.incorrectAnswers.length).toEqual(3);

    expect($(element).find('.add-answer.ng-hide').length).toEqual(1);
    addAnsElmnt.triggerHandler('click');
    $httpBackend.verifyNoOutstandingRequest();
  }));
});
