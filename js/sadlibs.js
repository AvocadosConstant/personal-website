//$('.reset').hide();

// List of prompts for the user
var prompts = [
    'Adjective',
    'Male name',
    'Job',
    'Company name',
    'Adjective',
    'Female name',
    'Family relative',
    'Adjective',
    'Number from 1 to 10',
    'Crippling disease',
    'Period of time',
    'Vice',
    'Weapon',
    'Body part',
    'Color',
    'Vegetable'
   ];

var answers=[];
// Keep track of current prompt we're on
var currentPrompt = 0;
// A function that will call the next prompt
var nextPrompt = function() {
    //if there's no answer in the form

    if (currentPrompt != 0){
    answers.push($('input').val());
    }
    // if there is a next prompt
    if (currentPrompt < prompts.length) {
        // put first prompt in all html elements with class 
        $('.prompt').html(prompts[currentPrompt] +'<br><input type="text">');

        // move the next prompt into variable currentPrompt 
        currentPrompt++;
    }
    //or else if we're at the end of the array
    else {
        showFinal();
    }
}
//puts user answers into HTML
var showFinal = function() {
    $('.prompt').html(
        'Once there was a<span class="fill">'+answers[0]+'</span>'+
        'man named<span class="fill">'+answers[1]+'</span>'+
        '. One day,<span class="fill">'+answers[1]+'</span>'+
        'was layed off from his minimum wage job as a<span class="fill">'+answers[2]+'</span>'+
        'at<span class="fill">'+answers[3]+'</span>'+
        '.<span class="fill">'+answers[1]+'</span>'+
        'was sad. He was also sad because he knew his<span class="fill">'+answers[4]+'</span>'+
        'wife,<span class="fill">'+answers[5]+'</span>'+
        'was sleeping with his <span class="fill">'+answers[6]+'</span>'+
        ',a<span class="fill">'+answers[7]+'</span>'+
        'businessman.<span class="fill">'+answers[1]+'</span>'+
        '\'s<span class="fill">'+answers[8]+'</span>'+
        'year old daughter was suffering from<span class="fill">'+answers[9]+'</span>'+
        ', but now, with no health insurance,<span class="fill">'+answers[1]+'</span>'+
        'could not support her treatment. After<span class="fill">'+answers[10]+'</span>'+
        ', his daughter died, his wife left him, and he became addicted to<span class="fill">'+answers[11]+'</span>'+
        '.<span class="fill">'+answers[1]+'</span>'+
        'decided to end it all with a<span class="fill">'+answers[12]+'</span>'+
        'to the<span class="fill">'+answers[13]+'</span>'+
        '. Unfortunately, he was too much of a failure to die.<span class="fill">'+answers[1]+'</span>'+
        'lived out the rest of his life as a vegetable. A juicy,<span class="fill">'+answers[14]+'</span>'+
        ',<span class="fill">'+answers[15]+'</span>.'
        );
    $('.next').hide();
    $('.reset').show();

}
// run nextPrompt function when button is clicked
$('.next').click(function() {
    nextPrompt();
});

$('input').keyup(function(e) {
    var key = e.which;
    if (key == 13) {
        $('.next').trigger('click');
        e.preventDefault();
        return false;
    }
});

$('.reset').click(function() {
        $('.prompt').html('');
        answers = [];
        //$('.reset').hide();
        currentPrompt = 0;
        $('.next').show();
        nextPrompt();
});

// Show the first prompt as soon as js loads
nextPrompt();