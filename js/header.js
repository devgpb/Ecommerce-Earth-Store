$(document).ready(function(){

    //Header
    var categs;
    var iconSearch = $('#glass');
    var search = $('#keysearch');


    $('.mobile-header h3').click(function(){
        $('nav.mobile-header').slideToggle();
    })

    iconSearch.click(function(){

        if(search.val() == ""){
            $('.form-field').toggle(500);
        }

    })




    // Abrir Popup do cart

    $('.bag-shipping').click(function(e){
        console.log('2')
        e.stopPropagation();
        sidebar2 = $('.cart-sidebar2');
        if(sidebar2.length > 0){
            $('.cart-sidebar2').fadeOut("fast",function(){
                $('.cart-sidebar').fadeToggle("slow");
            });
        }else{
            $('.cart-sidebar').fadeToggle("slow");
        }

            
    });

    $('.account-head').click(function(e){
        e.stopPropagation();
        $('.cart-sidebar').fadeOut("fast",function(){
            $('.cart-sidebar2').fadeToggle("slow");
        });
        
        
    });

    $('.cart-sidebar').click(function(e){
        e.stopPropagation();
    });

    
    $('.cart-sidebar2').click(function(e){
        e.stopPropagation();
    });

    $('body').click(function(e){
        e.stopPropagation();
        $('.cart-sidebar').fadeOut("slow");
        $('.cart-sidebar2').fadeOut("slow");
    });

    
    //Escutar o evento de redimencionalização de tela
    window.addEventListener('resize', hideCartSideBar);

    function hideCartSideBar(){

        if($(window).width() < 768){
            $('.cart-sidebar').fadeOut();
        }

    }


    
    // $('.item-id')
    $('body').on('click', '.button-add-cart', function(e) {
        e.stopPropagation();
        
        // pegando item pai
        pai = $(this).parent().parent().parent().parent().parent();
        //pegando o id
        id = pai.find('.item-id').text();
        id = id.trim();
        // pegar nome
        nome = pai.find('.product-name').text();
        nome = nome.trim();
        // pegar quantidade
        quant = pai.find('input[type="number"]').val();
        // pegar preco
        precoFormat = pai.find('.price-off').text();
        precoOrig = pai.find('.price-off').attr('valor');
        precoFormat = precoFormat.trim();
        precoFormat = " "+precoFormat;
        // img
        img = pai.find('.img').attr('src');
        // maximo de itens
        max = pai.find('input[type="number"]').attr('max');
        varia = pai.find('.select-varia');

        if(varia.length > 0){
            nome = nome + " ("+ varia.val()+")";
        }
        

        // id / nome / quantidade / precoFormat
        data = "id="+id+"&nome="+nome+"&quantidade="+quant+"&precoFormat="+precoFormat+"&precoOrig="+precoOrig+"&img="+img+"&max="+max;



        cartId = $('.cart-itens').find('.cart-id');
        cartId = cartId.text();
        cartNames = $('.cart-itens').find('.cart-item-name');
        cartNames = cartNames.text()
        // console.log("cartId:"+cartId+" id:"+id) ;  
        if(cartId.trim().includes(id) && cartNames.trim().includes(nome)){         
            nome2 = nome.replace(/ /g, "");
            nome2 = nome2.replace(/\(/g, "-")
            nome2 = nome2.replace(/\)/g, "-")
            str = "."+nome2;
            console.log(str)
            input = $(str).parent().find('input[type=number]');
            
            // $.each(input, function (index, value) { 
            //     paiNome = input[index].parent().parent().find('.cart-item-name').text();
            //     if(paiNome == nome){
            //         input = value;
            //     }
            // });

            console.log(input)
            val = input.val();
            val = parseInt(val);
            // console.log(input.attr('max'))
            if(val < parseInt(input.attr('max'))){
                val++
                input.val(val);

                $.ajax({
                    method:"post",
                    url: "./ajax/update_cart_quant.php",
                    data:"id="+id+"&quant="+val+"&nome="+nome,
                    dataType: "json",
                    error: function(){
                        console.log("Erro em add cart ajax")
                    }
                }).done(function(){
                   
                    calcularTotal();
                })
            }

          
        }else{

            $.ajax({
                method:"post",
                url: "./ajax/add_to_cart.php",
                data:data,
                dataType: "json",
                error: function(){
                    console.log("Erro em add cart ajax")
                }
            }).done(function (){

            });

            
            addItemToCart(id,nome,quant,precoFormat,img,max);
           
            $('#empty-cart').fadeOut(100);
            $('.total-div').fadeIn(100);
        }

        $('.cart-sidebar').fadeIn();
    })

    $('.cart-itens').on('change', 'input[name=quantidade]', function() {
        
        val = $(this).val();
        let id = $(this).parent().parent().parent().find('.cart-id').text();
        let nome =  $(this).parent().parent().parent().find('.cart-item-name').text()
        $.ajax({
            method:"post",
            url: "./ajax/update_cart_quant.php",
            data:"id="+id+"&quant="+val+"&nome="+nome,
            dataType: "json",
            error: function(){
                console.log("Erro em add cart ajax")
            }
        }).done(function(){
           
            calcularTotal();
        })
        
        

    })

    function addItemToCart(id,nome,quant,precoFormat,img,max){
        //Criando as tags
        let nome2 ="";
        //div pai
        const  pai = document.createElement('div');
        pai.setAttribute('class','cart-item-individual');

        //img box
        const imgBox = document.createElement('div');
        imgBox.setAttribute('class','item-img-box');

        const link = document.createElement("a");
        link.setAttribute('href',"individual&id="+id)

        //image
        const imagem = document.createElement('img');
        imagem.setAttribute('src',img)

        //append image to imgbox
        link.appendChild(imagem);
        imgBox.appendChild(link);

        //div especificacoes
        const espec = document.createElement('div');
        espec.setAttribute('class','cart-especificacoes');

        //nome
        const spanNome = document.createElement('span');
        spanNome.setAttribute('class','cart-item-name');
        spanNome.innerHTML = nome 

        //precoFormat 
        const spanPreco = document.createElement('span');
        spanPreco.setAttribute('class','cart-preco');
        spanPreco.setAttribute('valor',precoOrig);
        spanPreco.innerHTML = precoFormat;

        //div para outros valores
        const divQuantidade = document.createElement('div');

        const label = document.createElement('label');
        label.innerHTML = 'Quantidade:';

        const inputQuantidade = document.createElement('input');
        inputQuantidade.setAttribute("type","number");
        inputQuantidade.setAttribute("name","quantidade");
        inputQuantidade.setAttribute("value",quant);
        inputQuantidade.setAttribute("min","1");
        inputQuantidade.setAttribute("max",max);
        inputQuantidade.setAttribute("ref",id);

        //trash button
        const cartOpt = document.createElement('div');
        cartOpt.setAttribute('class','cart-opcoes');
        const trashCan = document.createElement('i');
        trashCan.setAttribute('class',"fa-solid fa-trash-can");

        //id tag
        const idTag = document.createElement('div');
        nome2 = nome.replace(/ /g, "");
        nome2 = nome2.replace(/\(/g, "-")
        nome2 = nome2.replace(/\)/g, "-")
        idTag.setAttribute("class","cart-id "+nome2);
        idTag.setAttribute("value",id);
        idTag.setAttribute("style","display:none;")
        idTag.innerHTML = id+" ";

        //encapsulando
        cartOpt.appendChild(trashCan);

        divQuantidade.appendChild(label);
        divQuantidade.appendChild(inputQuantidade);

        espec.appendChild(spanNome);
        espec.appendChild(spanPreco);
        espec.appendChild(divQuantidade);

        pai.appendChild(imgBox);
        pai.appendChild(espec);
        pai.appendChild(cartOpt);
        pai.appendChild(idTag);

        $('.cart-itens').prepend(pai);
        
        addNumCart();
        calcularTotal();
    }

    $('.cart-itens').on('click', 'i.fa-trash-can', function() {
        pai = $(this).parent().parent();
        id = pai.find('.cart-id').text();

        $.ajax({
            method:"post",
            url: "./ajax/remove_from_cart.php",
            data:"id="+id,
            dataType: "json",
            error: function(){
                console.log("Erro em remove cart ajax")
            }
        }).done(function(data){

            pai.fadeOut("slow",function(){
                pai.remove();
                subNumCart();
                calcularTotal();
            });

            $.ajax({
                method:"post",
                url: "./ajax/actualize-total.php",
                dataType: "json",
                error: function(){
                    console.log("Erro em atualizar total")
                }
            }).done(function(){
                $.getJSON('./ajax/get-total.php', function (response) {
                    console.log('Total = '+response.total)
                    //console.log($('tbody tr').length)
        
                    
                    if(response.total>0){
                        total2 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(response.total);
                        $('.total-price-cart').text(total2);
                        $('.total-price-cart').attr("valor",response.total);
        
                    }else{
                        $('.total-price-cart').text("R$ 00,00");
                        $('.total-price-cart').attr("valor",'0');
                    }
        
                    $("#servic").trigger('click');
        
                });
            })
        })


    })

    function calcularTotal() {
        total = 0;
        quant = Array();
        filtrados = Array();
        
        let precos = $('.cart-preco').text();
        let inputs = document.querySelectorAll('input[name=quantidade]');
        // console.log("ANtes precos: "+precos);
        console.log(inputs.length)
        if(inputs.length > 0){

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
            $('.total-price-cart').text(total2);
            $('.total-price-cart').attr("valor",total);
        }else{
            $('.total-price-cart').text('0,00');
            $('.total-price-cart').attr("valor",'0');
        }
    }

    function addNumCart(){
        cart = $('#first-num-cart');
        let quant = cart.text();
        quant = parseInt(quant) + 1;
        $('.num-cart').text(quant);
    }

    function subNumCart(){
        cart = $('#first-num-cart');
        let quant = cart.text();
        quant = parseInt(quant) - 1;
        $('.num-cart').text(quant);
    }

    // MOBILE

    $('.fa-bars').click(function(){
        $('.slide-menu').slideToggle();
    });

});