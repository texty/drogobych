var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbzyBXD8-1tK1igw9cN31S1ak9Ktwip00HOg0euP1SjKnwHpkyyz/exec';

$('#submit-form').on('click', function(e) {
    e.preventDefault();
    var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: $form.serializeObject()
    }).success(
        console.log("done")
    );
})