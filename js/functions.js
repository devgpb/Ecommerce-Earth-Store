// Variáveis de troca de tela
//Botões
var cad_b = $('#troc_cad');
var log_b = $('#troc_log');
//h2
var cad_a = $('#cad');
var log_a = $('#log')

// Trocar form2
function changF2(){

    $('.form').fadeOut();

    setTimeout(function(){
        $('.form2').fadeIn();
        $('.form2').css('display','flex');
    },500);
}

// Trocar form1
function changF1(){

    $('.form2').fadeOut();

    setTimeout(function(){
        $('.form').fadeIn();
        // $('.form2').css('display','flex');
    },500);
}


// Disparo
cad_b.click(function(){
    cad_a.css("cursor","default");
    log_a.css("cursor","pointer");
    changF2();
});

// Disparo
log_b.click(function(){
    changF1()
    cad_a.css("cursor","pointer");
    log_a.css("cursor","default");
});

// Disparo
cad_a.click(function(){
    cad_a.css("cursor","default");
    log_a.css("cursor","pointer");
    changF2();
});

// Disparo
log_a.click(function(){
    changF1()
    log_a.css("cursor","default");
    cad_a.css("cursor","pointer");
});

// Validações e Submit

var cadBtn = $('#cadSubBtn');
var form = $('.form2 #cadForm');



form.submit(function(e){

    // e.preventDefalt();

    var nome = $('input[name=nome]').val();
    var cpf = $('input[name=cpf]').val();
    var cell = $('input[name=cell]').val();
    var email = $('input[name=email]').val();
    var senha = $('input[name=senha]').val();
    var amount = nome.split(' ').length;
    var splitStr = nome.split(' ');

    if( amount >= 2){
        console.log("passou");
        for(var i = 0; i < amount; i++){
            //Trocando para primeira maiuscula
            var word = splitStr[i];
            var capt = word[0].toUpperCase() + word.slice(1).toLowerCase();
            splitStr[i] = capt;

            console.log(splitStr[i]);
        }
    }else{
        console.log("não passou");
        return false;
    }

    //se chegar ao final envia

    return false;
});




