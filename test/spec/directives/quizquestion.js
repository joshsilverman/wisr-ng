'use strict';

describe('Directive: quizquestion', function () {

  // load the directive's module
  beforeEach(module('wisrNgApp'));

  var element,
    scope,
    question = {
      "question_id":3787,
      "asker_id":18,
        "_answers": {"16519":"All of the above ",
        "16520":"tRNA is a small molecule in cells that carries amino acids to ribosomes.",
        "16521":"A codon is a sequence of three nucleotides that codes for an amino acid",
        "16522":"The codon on the tRNA attaches to the complementary bases on the strand of mRNA "},
      "_question":{"id":3787,
        "text":"Which of these statements about translation are true? ",
        "correct_answer_id":16519,
        "author_twi_screen_name":"StudyEgg",
        "created_at":"2012-09-20T22:44:00.980Z"},
      "_answer_counts":{"correct":"49",
        "incorrect":"21"},
      "_asker":{"id":18},
      "_lesson":{"id":421,
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

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();

  }));

  it('should assign correctAnswer', inject(function ($compile) {
    element = angular.element('<quizquestion></quizquestion>');
    element = $compile(element)(scope);
    scope.question = question;
    scope.$digest();
    expect(scope.correctAnswer).toBeDefined();
  }));
});
