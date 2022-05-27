/******************************** QUOTE PAGE**/

/**Selection */

$(document).ready(() => {
    hideAll();




    $('#building-type').change(function() {
        if($(this).val() == 'empty') {
            hideAll();
        }else if($(this).val() == 'residential') {
            residentialSHOW();
        }else if($(this).val() == 'commercial') {
            commercialSHOW();
        }else if($(this).val() == 'hybrid') {
            hybridSHOW();
        }
    }
);})


function hideAll() {
    $('.residential').hide();
    $('.commercial').hide();
    $('.corporate').hide();
    $('.hybrid').hide();
    $('.radios').hide();
    $('.answer').hide();
}

function residentialSHOW() {
    hideAll();
    $('.residential').show();
    $('.radios').show();
    $('.answer').show();
}

function commercialSHOW() {
    hideAll();
    $('.commercial').show();
    $('.radios').show();
    $('.answer').show();
}

function corporateSHOW() {
    hideAll();
    $('.corporate').show();
    $('.radios').show();
    $('.answer').show();
}

function hybridSHOW() {
    hideAll();
    $('.hybrid').show();
    $('.radios').show();
    $('.answer').show();
}
