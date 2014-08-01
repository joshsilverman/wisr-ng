'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('FeedCtrl', function ($scope, Paths) {
    $scope.assetBasePath = Paths.assets;
    $scope.publications = [
      {  
        id:194438,
        question_id:3754,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:23.250Z",
        updated_at:"2014-07-20T18:21:36.322Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"3754",
           text:"The gender determining chromosomes are the X and Y chromosomes. ",
           correct_answer_id:"16397"
        },
        _activity:{  
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg",
           MahlaleJoase:"http://pbs.twimg.com/profile_images/467401712006098944/y8-HPUAc_normal.jpeg",
           lexabagatnan:"http://pbs.twimg.com/profile_images/486023068305747968/K1N1Q7rO_normal.jpeg"
        },
        _answers:{  
           16397:"True ",
           16398:"False "
        },
        first_posted_at:"2014-07-20T07:36:02.484Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:null,
           topic_url:null
        }
     },
     {  
        id:194437,
        question_id:11181,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:23.166Z",
        updated_at:"2014-07-20T18:21:46.518Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"11181",
           text:"Anticoagulant Hirudin is produced from which transgenic specie?",
           correct_answer_id:"48076"
        },
        _activity:{  
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg",
           AbazaHaneen:"http://pbs.twimg.com/profile_images/421217113110347776/6yO58BJV_normal.jpeg",
           Alhanouf_Ri:"http://pbs.twimg.com/profile_images/487399210090651648/oMqcRO4k_normal.jpeg"
        },
        _answers:{  
           48076:"Brassica napus",
           48077:"Bacillus thuringiensis",
           48078:"Agrobacterium tumefecians",
           48079:"Meloidegyne incognitia"
        },
        first_posted_at:"2014-07-20T06:36:43.228Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:null,
           topic_url:null
        }
     },
     {  
        id:194436,
        question_id:3844,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:23.083Z",
        updated_at:"2014-07-20T18:21:56.733Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"3844",
           text:"Why is the hydrolysis of ATP important for the interaction between myosin and actin?",
           correct_answer_id:"16725"
        },
        _activity:{  
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg",
           AbazaHaneen:"http://pbs.twimg.com/profile_images/421217113110347776/6yO58BJV_normal.jpeg",
           Alhanouf_Ri:"http://pbs.twimg.com/profile_images/487399210090651648/oMqcRO4k_normal.jpeg"
        },
        _answers:{  
           16725:"The hydrolysis of ATP causes the myosin head to change conformation.",
           16726:"Without the hydrolysis of ATP, the myosin head would never release from the actin.",
           16727:"Actin needs the hydrolysis of ATP in order to move the myosin head.",
           16728:"Myosin uses the mechanical energy from ATP to move the actin."
        },
        first_posted_at:"2014-07-20T05:36:49.637Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"Myosin and Actin",
           topic_url:"myosin-and-actin"
        }
     },
     {  
        id:194435,
        question_id:3785,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:22.997Z",
        updated_at:"2014-07-20T12:59:38.556Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"3785",
           text:"Which of the following comments about RNA is false? ",
           correct_answer_id:"16511"
        },
        _activity:{  
           AbazaHaneen:"http://pbs.twimg.com/profile_images/421217113110347776/6yO58BJV_normal.jpeg",
           Alhanouf_Ri:"http://pbs.twimg.com/profile_images/487399210090651648/oMqcRO4k_normal.jpeg"
        },
        _answers:{  
           16511:"RNA uses the bases Thymine, Guanine, Cytosine, and Adenine. ",
           16512:"RNA contains ribonucleic acid, while DNA contains the slightly different sugar deoxyribonucleic acid. ",
           16513:"None of these statements are true ",
           16514:"RNA uses the base uracil instead of thymine "
        },
        first_posted_at:"2014-07-20T04:36:58.199Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"Chromosomes, Chromatids, Chromatin, etc",
           topic_url:"chromosomes,-chromatids,-chromatin,-etc"
        }
     },
     {  
        id:194434,
        question_id:4164,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:22.910Z",
        updated_at:"2014-07-20T18:22:38.035Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"4164",
           text:"Blood enters the kidney through the _____, entering the porous _____ and leaving through the _____. ",
           correct_answer_id:"17868"
        },
        _activity:{  
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg",
           AbazaHaneen:"http://pbs.twimg.com/profile_images/421217113110347776/6yO58BJV_normal.jpeg",
           Alhanouf_Ri:"http://pbs.twimg.com/profile_images/487399210090651648/oMqcRO4k_normal.jpeg"
        },
        _answers:{  
           17868:"afferent arterial; glomerulus; efferent arterial",
           17869:"collecting ducts; medulla; efferent arterial",
           17870:"afferent arterial; collecting ducts; efferent arterial",
           17871:"collecting ducts; medulla; efferent arterial"
        },
        first_posted_at:"2014-07-20T03:34:28.563Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"The Kidney and Nephron",
           topic_url:"the-kidney-and-nephron"
        }
     },
     {  
        id:194433,
        question_id:4289,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:22.821Z",
        updated_at:"2014-07-20T18:22:53.976Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"4289",
           text:"The connective tissue inside a muscle is known as the ______",
           correct_answer_id:"18291"
        },
        _activity:{  
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg",
           Alhanouf_Ri:"http://pbs.twimg.com/profile_images/487399210090651648/oMqcRO4k_normal.jpeg",
           fathullahnordin:"http://pbs.twimg.com/profile_images/484777318607368192/RpAHLp_j_normal.jpeg"
        },
        _answers:{  
           18291:"perimysium",
           18292:"epimysium",
           18293:"tendons",
           18294:"muscle fibers"
        },
        first_posted_at:"2014-07-20T02:35:25.816Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"Anatomy of a muscle cell",
           topic_url:"anatomy-of-a-muscle-cell"
        }
     },
     {  
        id:194432,
        question_id:3959,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:22.731Z",
        updated_at:"2014-07-20T18:23:09.952Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"3959",
           text:"Why do positive calcium ions flood the inside of the cell which already is positively charged, against the electric gradient? ",
           correct_answer_id:"17145"
        },
        _activity:{  
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg"
        },
        _answers:{  
           17145:"Across the cell membrane there are ATP driven calcium ion pumps, which use energy to pump the calcium. ",
           17146:"Calcium cannot flood the inside of the cell, the positive potential would get too high. ",
           17147:"Calcium concentration outside the cell is low.",
           17148:"The positively charged calcium is attracted to the more positively charged cell interior. "
        },
        first_posted_at:"2014-07-20T01:35:37.000Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"Neuronal Synapses (Chemical)",
           topic_url:"neuronal-synapses-(chemical)"
        }
     },
     {  
        id:194431,
        question_id:4108,
        asker_id:18,
        url:null,
        created_at:"2014-07-20T00:03:22.644Z",
        updated_at:"2014-07-20T18:23:21.121Z",
        publication_queue_id:18,
        published:true,
        _question:{  
           id:"4108",
           text:"As electrons are passed from one acceptor to another, they enter into higher and higher energy states. ",
           correct_answer_id:"17670"
        },
        _activity:{  
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg"
        },
        _answers:{  
           17670:"False",
           17671:"True"
        },
        first_posted_at:"2014-07-20T00:36:39.744Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"Photosynthesis: Light Reactions 1",
           topic_url:"photosynthesis:-light-reactions-1"
        }
     },
     {  
        id:194113,
        question_id:4291,
        asker_id:18,
        url:null,
        created_at:"2014-07-19T00:03:25.438Z",
        updated_at:"2014-07-20T18:23:32.121Z",
        publication_queue_id:null,
        published:true,
        _question:{  
           id:"4291",
           text:"If one were to take a light microscope and zoom in on a myofibril, one would see.....",
           correct_answer_id:"18301"
        },
        _activity:{  
           NULL:null,
           DrDivine2:"http://pbs.twimg.com/profile_images/378800000781623627/8538008976b0d03fa1bc08da98723321_normal.jpeg",
           FitFrankJ:"http://pbs.twimg.com/profile_images/378800000097661369/1d3e4830e538bc840c1ac0eff145b67c_normal.jpeg",
           VrgnVegan:"http://pbs.twimg.com/profile_images/378800000432956110/78289aaac8f6b9d4cdc70d58e74cc742_normal.jpeg",
           Duikenenzo:"http://pbs.twimg.com/profile_images/460801817946116097/W74ftPC1_normal.jpeg",
           ninitonini:"http://pbs.twimg.com/profile_images/489288119162658816/NV0TTHLj_normal.jpeg",
           Alhanouf_Ri:"http://pbs.twimg.com/profile_images/487399210090651648/oMqcRO4k_normal.jpeg",
           JorgeLVanegas:"http://pbs.twimg.com/profile_images/484117383921934337/MIey_ie8_normal.jpeg",
           choco_pops56789:"http://abs.twimg.com/sticky/default_profile_images/default_profile_4_normal.png"
        },
        _answers:{  
           18299:"Myosin",
           18300:"Sarcomeres",
           18301:"All of these would be found in a myofibril",
           18302:"Actin Filaments"
        },
        first_posted_at:"2014-07-19T07:34:32.689Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"Anatomy of a muscle cell",
           topic_url:"anatomy-of-a-muscle-cell"
        }
     },
     {  
        id:194112,
        question_id:4019,
        asker_id:18,
        url:null,
        created_at:"2014-07-19T00:03:25.367Z",
        updated_at:"2014-07-20T00:03:22.456Z",
        publication_queue_id:null,
        published:true,
        _question:{  
           id:"4019",
           text:"Contact inhibition occurs when:",
           correct_answer_id:"17362"
        },
        _activity:{  
           NULL:null,
           choco_pops56789:"http://abs.twimg.com/sticky/default_profile_images/default_profile_4_normal.png"
        },
        _answers:{  
           17359:"cells send messages to each other over long distances to inhibit growth",
           17360:"two cells come in contact with each other and undergo mitosis",
           17361:"larger cells need more room and continue to grow even when other cells are in the way",
           17362:"two cells come in contact with each other and stop dividing"
        },
        first_posted_at:"2014-07-19T06:36:55.868Z",
        _asker:{  
           id:"18",
           subject:"Biology",
           subject_url:"biology",
           twi_profile_img_url:"http://pbs.twimg.com/profile_images/2670346314/74cd33d40f34940246e90e70aa97e9fd_normal.png"
        },
        _lesson:{  
           name:"Cancer",
           topic_url:"cancer"
        }
     }
    ];
  });
