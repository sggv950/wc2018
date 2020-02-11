//var x = {"grupus":[{"groupId":0,"Countrys":["Russia","Saudi Arabia","Egypt","Uruguay"]},{"groupId":1,"Countrys":["Portugal","Spain","Morocco","Iran"]},{"groupId":2,"Countrys":["France","Australia","Peru","Denmark"]},{"groupId":3,"Countrys":["Argentina","Iceland","Croatia","Nigeria"]},{"groupId":4,"Countrys":["Brazil","Switzerland","Costa Rica","Serbia"]},{"groupId":5,"Countrys":["Germany","Mexico","Sweden","South Korea"]},{"groupId":6,"Countrys":["Belgium","Panama","Tunisia","England"]},{"groupId":7,"Countrys":["Poland","Senegal","Colombia","Japan"]}]};

var x;
function startProcess(){
    fetch('https://worldgns2018.herokuapp.com/groups')
        .then(function(res){
            return res.text();
        })
        .then(function(data){
            //console.log(data);
            x = JSON.parse(data);
            set1();
            buildPage();
            console.log(x);
        });
};

function set1(){
    $('.loadBar').css('display', 'none');
    $('.bigContainer').css('display', 'block');
};

function buildPage(){

    for(var i = 0 ; i < x.grupus.length ; i ++){
        $('#group' + (Number(x.grupus[i].groupId) + 1)).append('<p>Group ' + (Number(x.grupus[i].groupId) + 1) + '</p><ol></ol>');
        $('#group' + (Number(x.grupus[i].groupId) + 1) + ' ol').attr('id', 'groupp' + (Number(x.grupus[i].groupId) + 1));
        $('#group' + (Number(x.grupus[i].groupId) + 1) + ' ol').attr('type', "I");
        for(var j = 0 ; j < x.grupus[i].Countrys.length ; j++){
            $('#group' + (Number(x.grupus[i].groupId) + 1) + ' ol').append('<li>' + x.grupus[i].Countrys[j] + '</li>');
        }
    }

    for(var i = 0 ; i < 8 ; i++){
        $('#topSixteen' + Number(i+1)).append('<p>Top 16</p><ul></ul>');
        $('#topSixteen' + Number(i+1) + ' ul').attr('id', 'listSixteen'+ (Number(i+1)));
        $('#topSixteen' + Number(i+1) + ' ul').css('list-style-type', 'none');
        for(var j = 0 ; j < 2 ; j++){
            $('#topSixteen' + Number(i+1) + ' ul').append('<li>---</li>');
            
        }
    }

    for(var i = 0 ; i < 4 ; i++){
        $('#qtr' + Number(i+1)).append('<p>1/4 Final</p><ul></ul>');
        $('#qtr' + Number(i+1) + ' ul').attr('id', 'qtrId'+ (Number(i+1)));
        $('#qtr' + Number(i+1) + ' ul').css('list-style-type', 'none');
        for(var j = 0 ; j < 2 ; j++){
            $('#qtr' + Number(i+1) + ' ul').append('<li>---</li>');
        }
    }

    for(var i = 0 ; i < 4 ; i++){
        $('#semi' + Number(i+1)).append('<p>Semi Final</p><ul></ul>');
        $('#semi' + Number(i+1) + ' ul').attr('id', 'semiId'+ (Number(i+1)));
        $('#semi' + Number(i+1) + ' ul').css('list-style-type', 'none');
        for(var j = 0 ; j < 2 ; j++){
            $('#semi' + Number(i+1) + ' ul').append('<li>---</li>');
        }
    }

    $('#fin').append('<p>Final</p><ul></ul>');
    $('#fin ul').attr('id', 'finId');
    $('#fin ul').css('list-style-type', 'none');
    $('#fin ul').append('<li>---</li>');
    $('#fin ul').append('<li>---</li>');
    $('#win').append('<center>Winning Team</center>');
    $('#win div').attr('id', 'winId');


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
        $('#finId').selectable({
            selected: function( event, ui ) {	
                $('#win').html(ui.selected.textContent);
            }
    });
    }

    $('.step2').css("opacity", "0.2");
    $('.step3').css("opacity", "0.2");
    $('.step4').css("opacity", "0.2");
    $('.step5').css("opacity", "0.2");
    sortGroups("#groupp1", "#listSixteen1", "#listSixteen3");
    sortGroups("#groupp2", "#listSixteen3", "#listSixteen1");
    sortGroups("#groupp3", "#listSixteen2", "#listSixteen4");
    sortGroups("#groupp4", "#listSixteen4", "#listSixteen2");
    sortGroups("#groupp5", "#listSixteen5", "#listSixteen7");
    sortGroups("#groupp6", "#listSixteen7", "#listSixteen5");
    sortGroups("#groupp7", "#listSixteen6", "#listSixteen8");
    sortGroups("#groupp8", "#listSixteen8", "#listSixteen6");
    $('#step1go').click(function(){
        $('.step2').css("opacity", "1");
        pickQtr("#listSixteen1", "#qtrId1", 1);
        pickQtr("#listSixteen2", "#qtrId1", 2);
        pickQtr('#listSixteen3', '#qtrId2', 1);
        pickQtr('#listSixteen4', '#qtrId2', 2);
        pickQtr('#listSixteen5', '#qtrId3', 1);
        pickQtr('#listSixteen6', '#qtrId3', 2);
        pickQtr('#listSixteen7', '#qtrId4', 1);
        pickQtr('#listSixteen8', '#qtrId4', 2);
    });
    $('#step2go').click(function(){
        $('.step3').css("opacity", "1");
        pickSemi("#qtrId1", "#semiId1", 1);
        pickSemi("#qtrId2", "#semiId1", 2);
        pickSemi('#qtrId3', '#semiId2', 1);
        pickSemi('#qtrId4', '#semiId2', 2);
    });
    $('#step3go').click(function(){
        $('.step4').css("opacity", "1")
        pickFin("#semiId1", "#finId", 1);
        pickFin("#semiId2", "#finId", 2);
    });
    $('#step4go').click(function(){$('.step5').css("opacity", "1")});
    $('#step5go').click(function(){$('.step6').css("opacity", "1")});
    pickWin();
    $('#step6go').click(function(){$('.step6').css("opacity", "1")});

};

$('#startBtn').click(function(){
    $('.loadBar').css("display", "block");
    $('#startBtn').attr('disabled', 'disabled');
    $('.step0').hide();
    $('#showName').append('<h4></h4>');
    $('#showName h4').text('HI ' + $('input.form-control').attr('placeholder', 'Full Name').val());
    startProcess();
});