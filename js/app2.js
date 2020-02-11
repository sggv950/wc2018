//var x = {"grupus":[{"groupId":0,"Countrys":["Russia","Saudi Arabia","Egypt","Uruguay"]},{"groupId":1,"Countrys":["Portugal","Spain","Morocco","Iran"]},{"groupId":2,"Countrys":["France","Australia","Peru","Denmark"]},{"groupId":3,"Countrys":["Argentina","Iceland","Croatia","Nigeria"]},{"groupId":4,"Countrys":["Brazil","Switzerland","Costa Rica","Serbia"]},{"groupId":5,"Countrys":["Germany","Mexico","Sweden","South Korea"]},{"groupId":6,"Countrys":["Belgium","Panama","Tunisia","England"]},{"groupId":7,"Countrys":["Poland","Senegal","Colombia","Japan"]}]};

var id;
var x;
var startProcess = () => {
    fetch('https://worldgns2018.herokuapp.com/groups')
        .then(function(res){
            return res.text();
        })
        .then(function(data){
            //console.log(data);
            x = JSON.parse(data);
            setStart();
            buildPage();
            console.log(x);
        });
};

var setStart = () => {
    $('.wait-bar').css('display', 'none');
    $('#main-section').css('display', 'block');
}


var buildPage = () => {
    for(var i = 0 ; i < x.grupus.length ; i ++){
        for(var j = 0 ; j < 4 ; j++){
            $('#group' + (i + 1) + ' li:nth-child('+ (j + 1) +')').text(x.grupus[i].Countrys[j]);
        }
    }




    var sortGroups = function(groupId, top16A, top16B){
        $(top16A+" li:nth-child(1)").html($(groupId+" li:nth-child(1)").html());
        $(top16B+" li:nth-child(2)").html($(groupId+" li:nth-child(2)").html());
        $(groupId).sortable({
            update: function( event, ui ) {
                var x = $(groupId+" li:nth-child(1)").html();
                var y = $(groupId+" li:nth-child(2)").html();
                $(top16A+" li:nth-child(1)").html(x);
                $(top16B+" li:nth-child(2)").html(y);
            }
        })
    };

    var pickQtr = function(top16Id, qtrId, c){
        $(top16Id).selectable({
            selected: function( event, ui ) {	
                $(qtrId +' li:nth-child('+ c +')').html(ui.selected.textContent);
            }
    });
    };

    var pickSemi = function(qtrId, semiId, c){
        $(qtrId).selectable({
            selected: function( event, ui ) {	
                $(semiId +' li:nth-child('+ c +')').html(ui.selected.textContent);
            }
        });
    };

    var pickFin = function(semiId,finId, c){
        $(semiId).selectable({
            selected: function( event, ui ) {	
                $(finId +' li:nth-child('+ c +')').html(ui.selected.textContent);
            }

        });
    }
    var pickWin = function(){
        $('#fin').selectable({
            selected: function( event, ui ) {	
                $('#win').html(ui.selected.textContent);
                $('#winSquare').css('display', 'block');
            }
    });
    }


    sortGroups("#group1", "#topSixteen1", "#topSixteen3");
    sortGroups("#group2", "#topSixteen3", "#topSixteen1");
    sortGroups("#group3", "#topSixteen2", "#topSixteen4");
    sortGroups("#group4", "#topSixteen4", "#topSixteen2");
    sortGroups("#group5", "#topSixteen5", "#topSixteen7");
    sortGroups("#group6", "#topSixteen7", "#topSixteen5");
    sortGroups("#group7", "#topSixteen6", "#topSixteen8");
    sortGroups("#group8", "#topSixteen8", "#topSixteen6");

    pickQtr("#topSixteen1", "#qtr1", 1);
    pickQtr("#topSixteen2", "#qtr1", 2);
    pickQtr('#topSixteen3', '#qtr2', 1);
    pickQtr('#topSixteen4', '#qtr2', 2);
    pickQtr('#topSixteen5', '#qtr3', 1);
    pickQtr('#topSixteen6', '#qtr3', 2);
    pickQtr('#topSixteen7', '#qtr4', 1);
    pickQtr('#topSixteen8', '#qtr4', 2);

    pickSemi("#qtr1", "#semi1", 1);
    pickSemi("#qtr2", "#semi1", 2);
    pickSemi('#qtr3', '#semi2', 1);
    pickSemi('#qtr4', '#semi2', 2);

    pickFin("#semi1", "#fin", 1);
    pickFin("#semi2", "#fin", 2);

    pickWin();
};

$('#startBtn').click(function(){
    $('.wait-bar').css("display", "block");
    $('#startBtn').attr('disabled', 'disabled');
    $('#showName').text("HI " + $("#nameInput").val());
    startProcess();
});

var res = {
    groupss : [[],[],[],[],[],[],[],[]],
    top16 : [],
    top8 : [],
    top4 : [],
    top2 : [],
    top1 : ''
}

var resJson;

var createJson = () => {
    for(var i = 0 ; i < 8 ; i++){
        for(var j = 0 ; j < 4 ; j++){
            res.groupss[i].push($('#group'+(i+1)+' li:nth('+j+')').text())
        }
    }
    for(var i = 0 ; i < 8 ; i++){
        for(var j = 0 ; j < 2 ; j++){
            res.top16.push($('#topSixteen'+(i+1)+' li:nth('+j+')').text())
        }
    }
    for(var i = 1 ; i < 9 ; i++){
            res.top8.push($('#topSixteen' + i + ' .ui-selected').text());
    }
    for(var i = 1 ; i < 5 ; i++){
        res.top4.push($('#qtr' + i + ' .ui-selected').text());
    }
    for(var i = 1 ; i < 3 ; i++){
        res.top2.push($('#semi' + i + ' .ui-selected').text());
    }
    res.top1 = $('#win').text();
    resJson = JSON.stringify(res);
}

$('#submitBtn').click(function(){
    var count = 0;
    console.log(count);
    for(var i = 1 ; i < 9 ; i++){
        if($('#topSixteen' + i + ' li').hasClass('ui-selected')){
            continue;
        } else {
            count++
        }
    }
    console.log(count);
    for(var i = 1 ; i < 5 ; i++){
        if($('#qtr' + i + ' li').hasClass('ui-selected')){
            continue;
        } else {
            count++
        }
    }
    console.log(count);
    for(var i = 1 ; i < 3 ; i++){
        if($('#semi' + i + ' li').hasClass('ui-selected')){
            continue;
        } else {
            count++
        }
    }
    console.log(count);
    if(count > 0) {
        alert('not finished');
        console.log('alert')
    } else {
        createJson();
        console.log('json');
    }
});

var userData = {
    name: '',
    email: ''
  }
var userDataJson;
  
  $('#startBtn').click(function(){
    userData.name = $('#nameInput').val();
    userData.email = $('#emailInput').val();
    userDataJson = JSON.stringify(userData);
  });
  