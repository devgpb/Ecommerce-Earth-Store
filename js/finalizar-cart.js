$(document).ready(function(){


    // Mascatas de input
    $('#ceps').mask('00000-000');
    $('#numero').mask('000000');


    // Apagar itens
    $(".tabela-pedidos").on( "click", "td i.apagar-item", function() {
        // $("#button2").trigger('click');
        pai = $(this).parent().parent();
        num = pai.find('.numero-ordem').text()
        num = parseInt(num) + 1;
        
        selector = '.cart-itens .cart-item-individual:nth-child('+num+')';

        pai.fadeOut('slow',function(){
            $(this).remove();
            if($('tbody tr').length <= 2){
                $('.sec-footer').css('position','absolute');
                $('.sec-footer').css('bottom','0');
            };
        });


        $(selector).find('i').trigger('click');
        
        $.getJSON(config.path+'/ajax/get-total.php', function (response) {
            console.log('Total = '+response.total)
            console.log($('tbody tr').length)

            
            if(response.total>0){
                total2 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(response.tota);
                $('.total-price-cart').text("Total do Carrinho: "+total2);
            }else{
                $('.total-price-cart').text("R$ 00,00");
            }

            

        });
    });


    // Atualizar quantidade
    $("body").on( "change", "input[type=number]", function() {
        input = $(this);
        quant = input.val();
        id = input.attr('ref');

        if(quant <= parseInt(input.attr('max'))){
            selector = 'input[ref="'+id+'"]';

            $(selector).val(quant);
            $.ajax({
                method:"post",
                url: config.path+"/ajax/update_cart_quant.php",
                data:"id="+id+"&quant="+quant,
                dataType: "json",
                error: function(){
                    console.log("Erro em add cart ajax")
                }
            }).done(function(){
               
                calcularTotal();
            })
            
            
        }else{
            selector = 'input[ref="'+id+'"]';

            $(selector).val(input.attr('max'));
        }

    });


    // Redirecionar ao Pagseguro
    $('#get-paid-redirect').click(function(e){
        e.preventDefault();
        $.ajax({
            url:"../ajax/finalizar-Pagamento.php",
        }).done(function (data) {
            // console.log(data)
            location.href="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + data;
            // var code = data;

            // var callback = {
            //     success : function(transactionCode) {
            //         //Insira os comandos para quando o usuário finalizar o pagamento. 
            //         //O código da transação estará na variável "transactionCode"
            //         console.log("Compra feita com sucesso, código de transação: " + transactionCode);
            //     },
            //     abort : function() {
            //         location.href="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
            //         //Insira os comandos para quando o usuário abandonar a tela de pagamento.
            //         console.log("abortado");
            //     }
            // };  


            ////Chamada do lightbox passando o código de checkout e os comandos para o callback
            // var isOpenLightbox = PagSeguroLightbox(code, callback);
            //// Redireciona o comprador, caso o navegador não tenha suporte ao Lightbox
            // if (!isOpenLightbox){
            //     location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
            //     console.log("Redirecionamento")
            // }


            // console.log(data);
            // var isOpenLightBox = PagSeguroLightbox({
            //     code:code2
            // },{
            //     success: function (transactionCode){
            //         console.log("User Foi Ao Final")
            //     },
            //     abort: function () {
            //         location.href="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code2;
            //         console.log('fechou a janela');
            //     }
            // })
        })

    });

    // preencher dados por cep
    $('#ceps').change(function(){
        var cep = $(this).val();
        if(cep.length == 9){
            cep = {"cep":cep};
            $.ajax({
                method:"post",
                url: config.path+"/ajax/cep-consult.php",
                data: cep,
                dataType: "json",
                error: function(){
                    console.log("Erro em cep")
                }
            }).done(function(data){
            // console.log(data);
            $('#endereco').val(data["street"]);
            $('#complement').val(data["complement"]);
            $("#bairro").val(data["district"]);
            $("#cidade").val(data["city"]);
            $("#estado").val(data["uf"]);
            })
        }
    });

    // Aguardar salvar local
    $('#salvar-end').click(function(){
        if($(this).is(":checked")){
            if(validarLocal()== false){
                $('.local-form input').change(function(){
                    if(validarLocal() == true){
                        salvarLocal();
                    }
                })
            }else{
                salvarLocal();
            }
        };
    });



    if($('#salvar-end').is(":checked")){
            $('.local-form input').change(function(){
                if(validarLocal() == true){
                    salvarLocal();
                }
            })
    };



    // Sistema de pagamento transparente
    var valor = 0;
   
    var imagens = []

    $('#get-paid-here').click(function(e){
        e.stopPropagation();
        valor = $('#quant-final-carr').attr('valor');
        //console.log(valor)
        if(validarLocal() == true){
            $('.modal-bg').fadeIn();
            $('.pay-card').fadeIn();
            //disableForm('.pay-card')

        }

    })

    $('.pay-card').click(function(e){
        e.stopPropagation();
    });

    $('body').click(function(e){
        e.stopPropagation();
        $('.pay-card').fadeOut("fast");
        $('.modal-bg').fadeOut("slow");
       
    });


    $('#proceed-payment').click(function(e){
        e.preventDefault();
        console.log(organizarDados($('.local-form')))
        console.log(organizarDados($('.pay-card')))
        enableForm('.pay-card');

        ;
    })

    // listar badneiras

    $.ajax({
        method:"post",
        url: config.path+"/ajax/cartao-credito.php",
        data: {'gerar_sessao':'true'},
        dataType: "json",
        error: function(){
            console.log("Erro em save local Session")
        }
    }).done(function(data){
       console.log(data);

       PagSeguroDirectPayment.setSessionId(data.id);
       PagSeguroDirectPayment.getPaymentMethods({
            success:function(response){
                console.log(response);
                var bancos = ''
                var bandeiras = ''

                $.each(response.paymentMethods.CREDIT_CARD.options,function(key,value){

                    imagens[value.name.toLowerCase()] = 'https://stc.pagseguro.uol.com.br'+value.images.MEDIUM.path;

                    bandeiras+='<option value="'+value.name.toLowerCase()+'">'+value.name+'</option>';

                    $('#bandeiras').html(bandeiras);
                })
            }
       })

    })


    // Detectar a bandeira do cartão


    $('#num-card').on('keyup',function(){
        if($(this).val().length == 6){
            PagSeguroDirectPayment.getBrand({
                cardBin:$(this).val(),
                success:function(v){
                    var cartao = v.brand.name;
                    console.log(valor);
                    PagSeguroDirectPayment.getInstallments({
                        amount:valor,
                        maxInstallmentNoInterest:'4',
                        brand:cartao,
                        success: function(data){

                            bandeiras = $('select[name=bandeiras]')
                            bandeiras.find('option').removeAttr('selected')
                            bandeiras.find('option[value='+cartao+']').attr('selected','selected')

                            // Listar Parcelamento
                            
                            $.each(data.installments[cartao],function(index,value){
                                index++
                                var htmlAtual =  $('#divisions-values').html();
                                var valorParcela = value.installmentAmount;
                                var parcelaFormatada = valorParcela.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

                                parcelaFormatada = parcelaFormatada.toLocaleString('pt-br', {minimumFractionDigits: 2})

                                var juros = value.interestFree == true ? 'Sem Juros' : 'Com Juros';

                                $('#divisions-values').html(htmlAtual+'<option value="'+index+':'+valorParcela+'" > '+index+'x '+parcelaFormatada+'  '+juros+'</option>');

                            })

                          
                        }
                    })
                }
            });
        }
    });








// funcoes

    function organizarDados(form){

        data = Array()

        inp = form.find('input');

        inp.each(function(){
            input = $(this)
            ast = input.attr('name');
            val = input.val();
            data[ast] = val
        })

        sel = form.find('select');

        sel.each(function(){
            sele = $(this)
            ast = sele.attr('name');
            val = sele.find('option').val();
            data[ast] = val
        })

        return data;
    }



    function disableForm(select){
        form = $(select).find('form');

        form.animate({'opacity':'0.4'})
        form.find('input').attr('disabled','disabled')
        form.find('button').attr('disabled','disabled')
        form.find('select').attr('disabled','disabled')
    }

    function enableForm(select){
        form = $(select).find('form');

        form.animate({'opacity':'1'})
        form.find('input').removeAttr('disabled')
        form.find('button').removeAttr('disabled')
        form.find('select').removeAttr('disabled')
    }




    function salvarLocal(){
        data = $('.local-form input').serialize();
        // console.log(data);


        $.ajax({
            method:"post",
            url: config.path+"/ajax/save-local.php",
            data: data,
            dataType: "json",
            error: function(){
                console.log("Erro em save local Session")
            }
        }).done(function(data){
           console.log(data);

        })

    }



    function validarLocal(){

        var s = $('.local-form input');
        s.each(function(){
            var t = $(this);
            if(t.val()){
                t.addClass('exclua-me');
            }
        });
        var vazios = s.not('.exclua-me'); 
        tam = vazios.length;
        
        vazios.each(function(){
            var v = $(this);

            if(v.attr('name') != 'complement'){
                v.css('border', '0px solid red');
                v.animate({'borderWidth': '3px'});
                v.attr("placeholder", "Preencha");

                setTimeout(function(){
                    v.animate({'borderWidth': '0px'});
                },1000);
                setTimeout(function(){
                    v.css('border', '1px solid #ccc',2000);
                },1500);
            }
        });

        

        if($('#complement').val() == ""){
            tam = tam-1;
        }

        //console.log(tam);
        if(tam == 0){
            return true
        }else{
            return false
        }
        
    }


    
    function calcularTotal() {
        total = 0;
        quant = Array();
        filtrados = Array();
        let precos = $('.cart-preco').text();
        let inputs = document.querySelectorAll('input[name=quantidade]');
        // console.log("ANtes precos: "+precos);
        precos = precos.split(' ');

        inputs.forEach(element => {
            quant.push(parseInt(element.value));
        });

        // console.log("quantidade: "+quant);
        // console.log("precos: "+precos);
        for(i=2;i<=precos.length;i+=2){
            // console.log("precos[i]: "+precos[i]);
            filtrados.push(precos[i]);
        }
       
        for(i=0;i<filtrados.length;i++){
            
            send = (filtrados[i].match(/./g) || []).length;
            for(i2=0;i2<send;i2++){
                filtrados[i] = filtrados[i].replace(".","");
                
            }
            filtrados[i] = parseFloat(filtrados[i].replace(",","."));
            
        }
        // console.log(filtrados);
        for(i=0;i<filtrados.length;i++){
            total += filtrados[i] * quant[i];
        }

        
        total2 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);
        $('.total-price-cart').text("Total do Carrinho: "+total2);
        $('.total-price-cart').attr("value",total);
    }
}); 