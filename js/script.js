//відповіді форми збираються тут: https://docs.google.com/spreadsheets/d/1MZUQuWk3SkhWqVoakE22nfi-_DGfqBvUPsR9qiEscsk/edit#gid=0
var agree = false;

var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbzyBXD8-1tK1igw9cN31S1ak9Ktwip00HOg0euP1SjKnwHpkyyz/exec';


$('#submit-form').on('click', function(e) {    
        if(agree === true){

            var empty = false;
            $('.required').each(function(){
                if($(this).val() === ''){
                    //console.log($(this).val());
                    empty = false;
                } else {
                    //console.log($(this).val());
                    empty = true;
                }
            });


            if(empty === true){
                var jqxhr = $.ajax({
                    url: url,
                    method: "GET",
                    dataType: "json",
                    data: $form.serializeObject()
                }).success(
                    console.log("done")
                );
            }


        } else {
            alert("Ви не надали згоду на обробку персональних даних")
        }



});


document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByClassName("required");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("Надайте необхідну інформацію");
            }
        };

        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");

        };
    }
});


//перевіряємо чи є згода на обробку персональних даних
function personalData() {
    var checkBox = document.getElementById("agree");
    if(checkBox.checked == true){
        agree = true;
    } else {
        agree = false;
    }

}

