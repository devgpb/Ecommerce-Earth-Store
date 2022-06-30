
<div class="modal-bg"></div>

<!-- Só mostra se tiver itens no carrinho -->
<?php if(isset($_SESSION['cart']) || @count($_SESSION['cart']) != 0){
    ?>

<div class="div-chamada-finalizar">
    <h2 class="chamada-finalizar">Revise seu Carrinho!</h2>
</div>





<div class="tabela-pedidos">
    <div class="container">
   
    <h2><i class="fa-solid fa-cart-shopping"></i>Carrinho</h2>
    
    <table>

        <tr>
            <td>Imagem</td>
            <td>Nome do Produto</td>
            <td>Quantidade</td>
            <td>Valor</td>
            <td>Retirar</td>
        </tr>


        <!-- Gerar Itens -->
<?php
  
    
    foreach ($_SESSION['cart'] as $key => $value) {
        echo "
        
        <tr>
        <td class='case-img-finalizar'><a href='".PATH."individual&id=".$value[0]."'><img src='".PATH.$value[4]."' alt='imagem-item' class='imagem-finalizar'></a></td>

        <td>".$value[1]."</td>

        <td><input type='number' name='quantidade' class='final-quant' value='".$value[2]."' min='1' max=".$value[5]." ref=".$value[0]." ></td>
        
        <td>".$value[3]."</td>
        <td><i class='fa-solid fa-trash-can apagar-item'></i></td>
        <td class='cart-id ".$value[0]."' style='display:none;' value='".$value[0]." '>".$value[0]."</td>
        <td class='numero-ordem' style='display:none;'>".$key."</td>
        </tr>";

    }
?>
    </table>
    </div>

</div><!-- Tabela Pedidos -->

<!-- Total Cart -->
<div class="container">
<div class="total-price-area">
    <h2 class="total-price-cart" id ="quant-final-carr" valor="<?php echo $_SESSION['total'] ?>">Total do Carrinho: R$ <?php echo number_format($_SESSION['total'],2,",",".") ?></h2>

    
</div>
</div>
<!-- Total Cart -->



<!-- Localização -->

<div class="tabela-form">
    

    <div class="container">
        <h2><i class="fa-solid fa-truck-ramp-box"></i>Entrega</h2>
    </div>

    <div class="container">

    <div class="container">

    <form action="" class="finalizar-form local-form">


        <div class='row'><!-- Row -->

        <div class="individual">
        <label for="cep">CEP:</label>
        <input type="text" name="cep" id="ceps" placeholder="00000-000" style="width: 115px;" value="<?php echo @$_SESSION['local']['cep']?>">

        <a class="btn-link" id='oho' target="_blank" href="https://buscacepinter.correios.com.br/" style="text-decoration: underline;
        margin-left: 8px;">
        Não sei meu CEP
        </a>
        </div>

        <div class="individual">
        <span>O CEP irá preencher os dados automaticamente</span>
        </div>

        <div class="individual">
        <label for="endereco">Endereço (Rua, Avenida, Quadra, Lote): </label>
        <input type="text" name="endereco" id="endereco" style="width: 300px;" value="<?php echo @$_SESSION['local']['endereco']?>">
        </div>


        <div class="individual">
        <label for="numero">Número: </label>
        <input type="text" name="numero" id="numero" style="width: 75px;" value="<?php echo @$_SESSION['local']['numero']?>">
        </div>



        </div><!-- Row -->
        
        <div class="row"><!-- Row -->

        <div class="individual">
        <label for="complement">Complemento (Opcional): </label>
        <input type="text" name="complement" id="complement" style="width: 235px;" value="<?php echo @$_SESSION['local']['comp']?>">
        </div>

        </div><!-- Row -->


        <div class="row"><!-- Row -->

        <div class="individual">
        <label for="bairro">Bairro: </label>
        <input type="text" name="bairro" id="bairro" style="width: 218px;" value="<?php echo @$_SESSION['local']['bairro']?>">
        </div>

        </div><!-- Row -->

        
        <div class="row"><!-- Row -->

        <div class="individual">
        <label for="cidade">Cidade: </label>
        <input type="text" name="cidade" id="cidade" style="width: 170px;" value="<?php echo @$_SESSION['local']['cidade']?>">
        </div>


        <div class="individual">
        <label for="estado">Estado: </label>
        <input type="text" name="estado" id="estado" style="width: 70px;" value="<?php echo @$_SESSION['local']['estado']?>">
        </div>

        </div><!-- Row -->

        <div class="row"><!-- Row -->
        <div class="individual">
            <label for="salvar-end">Salvar Meu Endereço!</label>
            <input type="checkbox" name="salvar-end" id="salvar-end" <?php echo @$_SESSION['local']['salvar']?>>
        </div>
        </div><!-- Row -->


    </form><!-- Local-Form -->


    </div>
    </div>
</div>
<!-- Localização -->










<!-- Dados Pagamento -->

<div class="tabela-form pay-card" style="display:none;">
    

    <div class="container">
        <h2><i class="fa-solid fa-credit-card"></i>Dados de Pagamento</h2>
    </div>

    <div class="container">

    <div class="container">

    <form action="" class="finalizar-form">


        <div class='row'><!-- Row -->

        <div class="individual">
        <label for="nome">Nome:</label>
        <input type="text" name="nome" id="ceps" style="width: 330px;" value="<?php echo @$_SESSION['dados']['nome']?>">

        </div>


        <div class="individual">
        <label for="cpf">CPF: </label>
        <input type="text" name="cpf" id="cpf" style="width: 300px;" value="<?php echo @$_SESSION['dados']['cpf']?>">
        </div>

        </div><!-- Row -->


        <div class='row'><!-- Row -->
        <div class="individual">
        <label for="bandeira">Bandeiras: </label>
        <select name="bandeiras" id="bandeiras"  style="width: 175px;">
            <!-- <option value="visa">Visa</option> -->
        </select>
        </div>

        <div class="individual">
        <label for="valores">divisões: </label>
        <select name="valores" id="divisions-values"  style="width: 240px;">
            <!-- <option value="199.00">1x de R$ 190.00</option> -->
        </select>
        </div>

        </div><!-- Row -->

       
        
        <div class="row"><!-- Row -->

        <div class="individual">
        <label for="num-card">numero do cartão: </label>
        <input type="text" name="num-card" id="num-card" style="width: 300px;">
        </div>

        </div><!-- Row -->


        <div class="row"><!-- Row -->

        <div class="individual">
        <label for="cvv">CVV: </label>
        <input type="text" name="cvv" id="cvv" style="width: 75px;">
        </div>

        <div class="individual">
        <label for="validade">Validade: </label>
        <input type="text" name="validade" id="validade" style="width: 75px;">
        </div>

        </div><!-- Row -->

        <div class="row"><!-- Row -->
        <div class="individual">
            <label for="salvar-card">Salvar Meu Cartão!</label>
            <input type="checkbox" name="salvar-card" id="salvar-card">
        </div>
        </div><!-- Row -->

                    


    </form><!-- Local-Form -->

    <button id="proceed-payment" style="float: right;width: 142px;"><i class="fa-solid fa-credit-card"></i> Prosseguir</button>

    </div>
    </div>
</div>
<!-- Dados Pagamento -->


<div class="container">
<div class="finalizar-pedido">

    <!-- <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_51LC4N0GIUmR0keuMuVnYtSJMCyrMiP0HSMZPYqyYg7nRLf6qG92it6HDcAFYaBglTnSmNVOxDP36iJAIZJcWBsAv00ODmcQMgZ"
    data-amount= "<?php echo $_SESSION['total']*100 ?>"
    data-name="Terço de Madeira"
    data-label="Pagar com cartão"
    data-currency ="brl"
    data-panel-label = "Pagar"
    data-description = "Pagamento de Carrinho"
    data-image="<?php echo PATH?>images/Logo.png"
    data-locale="auto"
    ></script> -->

    <?php
        

        if(isset($_SESSION['login'])){
            echo '
            <div class="w100 flex-end">
            <button id="get-paid-redirect" style="margin-right: 15px;"> <i class="fa-solid fa-coins"></i> Pagar pelo Pagseguro!</button>
            
            
            <button id="get-paid-here"><i class="fa-solid fa-credit-card"></i> Pagar com Crédito!</button>
            
            </div>';
        }else{
            echo '<a href="'.PATH.'./cadastro/"><button id="login" style="width: 94%;">Faça Login Para comprar!</button></a>';
        }
    ?>
    

    
</div>
</div><!-- Só mostra se tiver itens no carrinho -->
<?php  }else if(isset($_SESSION['login'])){
    echo "
        <div class='space'></div>
        <div class='alert-empty-cart'>
        <h2>Seu carrinho está vazio!</h2>
        <a href='".PATH."'><button class='return-home'> Voltar para página inicial</button></a>
        </div>
        ";

       
}else{
    echo "
    <div class='space'></div>
    <div class='alert-empty-cart'>
    <h2>Faça Login para realizar a compra!</h2>
    <a href='".PATH."/cadastro'><button class='return-home'> Ir para a tela de entrada</button></a>
    </div>
    ";
}


?>

<script type="text/javascript" src=
"https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js"></script>
<script src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js"></script>
<script src="<?php echo PATH?>js/config.js"></script>
<script src="<?php echo PATH?>js/jquery-3.6.0.js"></script>
<script src="<?php echo PATH?>js/jquery.mask.js"></script>
<script src="<?php echo PATH?>js/header.js"></script>
<script src="<?php echo PATH?>js/home.js"></script>
<script src="<?php echo PATH?>js/finalizar-cart.js"></script>











