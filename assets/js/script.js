$(function()
{
    // QUIZ Q/A MCQS VALIDATION

    const question =  $('.question')
    const next =  $('#next')
    const prev =  $('#prev')
    let num  = $('#q-num')

    function valiDateTextArea()
    {
        const current = $('.current');
        const testid = ($("#" + current.attr('id') + ' textarea'));

        testid.each(function() {
            $(this).on('keyup', function()
            {
                if(($(this).val()) && (question[9] !== current[0]))
                {    
                    next.prop('disabled', false);     
                }
                if($(this).val().length < 1)
                {
                    next.prop('disabled', true);
                }

                if($(this).val() && (question[9] == current[0]))
                {
                    $('#btn-finish').prop('disabled', false);
                    $('#btn-finish').addClass('active-btn');
                }
                if($(this).val() == false && (question[9] == current[0]))
                {
                    $('#btn-finish').prop('disabled', true);
                    $('#btn-finish').removeClass('active-btn');
                }
            })
            if($(this).val())
            {    
                next.prop('disabled', false);                
            }
        })
    }

    function valiDate()
    {
        const current = $('.current');
        const testid = ($("#" + current.attr('id') + ' input'));

        testid.each(function() {
            if($(this).is(':checked') == false)
            {
                $(this).on('change', function()
                {
                    if (($(this).is(':checked')) && (question[9] !== current[0]))
                    {
                        next.prop('disabled', false);
                    }

                    if (($(this).is(':checked')) && (question[9] == current[0]))
                    {
                        $('#btn-finish').prop('disabled', false);
                        $('#btn-finish').addClass('active-btn');
                    }                                    
                })
            }

            if (($(this).is(':checked')) && (question[9] !== current[0]))
            {
                next.prop('disabled', false);
            }
        })
    }

    valiDateTextArea();
    valiDate();

    $('#next').click(function ()
    {
        var value = parseInt(num.text()) + 1;
        num.text(value);

        const current = $('.current');
        current.removeClass('current');
        if(current.next())
        {
            current.next().addClass('current');
            prev.prop('disabled', false);
            next.prop('disabled', true);
        }

        showFinishButton();
        valiDate();
        valiDateTextArea();        
    });

    $('#prev').click(function ()
    {
        if(num.text() > 1)
        {
            var value = parseInt(num.text()) -1;
            num.text(value);
        }

        const current = $('.current');
        current.removeClass('current');
        if(current.prev())
        {
            current.prev().addClass('current');
            next.prop('disabled', false);
        }

        if(question[1] == current[0])
        {
            prev.prop('disabled', true);
        }
        
        showFinishButton();
    });

    $('.label-option').on('click', function()
    {
        $('.current p').removeClass('active-option');
        $(this).find('p').addClass('active-option')
    })

    function showFinishButton()
    {
        if(num.text() == 10)
        {
            $('.finish').css('display', 'block');
        }
        else
        {
            $('.finish').css('display', 'none');
        }
    }

    // OWL CAROUSEL SIGN-IN

    if($('.owl-carousel').length != 0)
    {
        $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            dots: false,
            navText: ["<i class='fas fa-caret-left'></i>","<i class='fas fa-caret-right'></i>"],
            autoplay: true,
            autoplayTimeout: 3000,
            autoplaySpeed: 1000,
            responsive:{
                0:{
                    items:1
                },
            }
        })
    }
});



// TIMER

const startingMinutse = 5;
let time = startingMinutse * 60;

const timerElement = document.getElementById('timer');

function updateCountdown()
{
    const minutes = Math.floor( time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timerElement.innerHTML = `${minutes}: ${seconds}`;
    time--;
    time = time < 0 ? 0 : time;

    if (time == 0)
    {
        $('#staticBackdropEnd').modal('show')
        console.log('check')
    }
}

let interval;

function startTimer()
{
    interval = setInterval(updateCountdown, 1000);
}

function stopTimer()
{
    clearInterval(interval);
}



// START POP-UP

$('#staticBackdropStart').modal('show')



// HOME PAGE OPTIONS URL

const urlMultipleChoice = document.getElementsByClassName('home_option-multiple-choice')

if(urlMultipleChoice.length > 0)
{
    urlMultipleChoice[0].addEventListener('click', function(){
        window.open('./mcqs.html', '_blank');
    })
}

const urlTrueFalse = document.getElementsByClassName('home_option-true-false')

if(urlTrueFalse.length > 0)
{
    urlTrueFalse[0].addEventListener('click', function(){
        window.open('./true-false.html', '_blank');
    })
}

const urlShortAnswer = document.getElementsByClassName('home_option-short-answer')

if(urlShortAnswer.length > 0)
{
    urlShortAnswer[0].addEventListener('click', function(){
        window.open('./question-answers.html', '_blank');
    })
}

const audioQuestions = document.getElementsByClassName('home_option-audio')

if(audioQuestions.length > 0)
{
    audioQuestions[0].addEventListener('click', function(){
        window.open('./audio-based-question.html', '_blank');
    })
}

const mathQuestions = document.getElementsByClassName('home_option-numeric')

if(mathQuestions.length > 0)
{
    mathQuestions[0].addEventListener('click', function(){
        window.open('./math-question.html', '_blank');
    })
}



// GO TO HOME PAGE BUTTON

const goToHomePage = document.getElementsByClassName('modal-end_btn')

if(goToHomePage.length > 0)
{
    goToHomePage[0].addEventListener('click', function(){
        window.open('./home.html', '_self');
    })
}


// CREATE QUESTION PAGE

$(function(){
    let currentFieldId = 2;
    let qNum = 1;
    $('body').on('click', '.create-question_add-btn button' , function(e){ // CLICK TO ADD OPTION
        e.preventDefault();
        if($(this).parent().parent().find('.form-group').length < 4)
        {
            currentFieldId++;
            $(this).parent().before('<div class="form-group"><p class="create-question_option-name">a</p><label for="q1-op' + currentFieldId + '" class="create-question_label"></label><input type="radio" name="mcqs" id="q1-op' + currentFieldId + '"><textarea class="create-question_write-option"></textarea><p class="create-question_remove">X</p></div>');
        }
        if($(this).parent().parent().find('.form-group').length == 4)
        {
            $(this).hide();
        }

        dynamicOptionNames();
    })

    $('body').on('click', '.create-question_remove', function(){ // CLICK TO REMOVE OPTION
        $(this).parent().parent().find('.create-question_add-btn button').show();
        $(this).parent().remove();
        currentFieldId--;
        dynamicOptionNames();
    })

    function dynamicOptionNames() // OPTION NAME
    {
        $('.create-question_body').each(function() {
            const optionName = ['A', 'B', 'C', 'D']

            for(i = 0; i < optionName.length; i++)
            {
                $(this).find('.create-question_option-name').eq(i).text(optionName[i]);
            }
        })
    }

    dynamicOptionNames();

    $('body').on('click', '.create-question_label', function() // CLICK TO CHANGE LABEL COLOR
    {
        $(this).parent().parent().find('.create-question_label').removeClass('create-question_label-active');
        $(this).addClass('create-question_label-active');
    })

    $('.create-question_add-question').on('click', function() { // ADD ANOTHER QUESTION
        qNum++;
        $('.create-question_box').append('<div class="create-question_content"><form><div class="create-question_head"><h6 class="create-question_q-num">'+ qNum +'.</h6><textarea class="create-question_write-question" placeholder="Type Question Here"></textarea></div><div class="create-question_body"><div class="form-group"><p class="create-question_option-name">A</p><label for="q1-op1" class="create-question_label"></label><input type="radio" name="mcqs" id="q1-op1"><textarea class="create-question_write-option"></textarea></div><div class="form-group"><p class="create-question_option-name">B</p><label for="q1-op2" class="create-question_label" ></label><input type="radio" name="mcqs" id="q1-op2"><textarea class="create-question_write-option"></textarea></div><div class="create-question_add-btn"><button>Add Option</button></div></div><div class="create-question_foot"><span>i</span><textarea class="create-question_justify-answer" placeholder="Justify Your Answer" ></textarea></div></form></div>')

        $('.create-question_remove-question').prop('disabled', false)
        
        if(qNum == 10)
        {
            $('.create-question_add-question').prop('disabled', true)
        }
    })

    $('.create-question_remove-question').on('click', function() { // REMOVE ANOTHER QUESTION
        qNum--;

        $('.create-question_content').last().remove();     

        $('.create-question_add-question').prop('disabled', false)

        if(qNum == 1)
        {
            $('.create-question_remove-question').prop('disabled', true)
        }
    })

    $('.result_all').on('change', function() { // CHECK VALIDATION TEACHER RESULT PAGE
        if($('.result_all').is(':checked'))
        {
            $('.result_table tbody input').prop('checked', true);
            $('.result_button').prop('disabled', false);
        }
        else
        {
            $('.result_table tbody input').prop('checked', false);
            $('.result_button').prop('disabled', true);
        }
    })


    $('.result_table tbody input').on('change', function() { // CHECK VALIDATION TEACHER RESULT PAGE
        if($('.result_table tbody input').is(':checked'))
        {
            $('.result_button').prop('disabled', false);
        }
        else
        {
            $('.result_button').prop('disabled', true);
        }
    })

    $('.result_export').on('click', function(){
        window.print()
    })
})