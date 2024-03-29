<?php
    if(isset($_COOKIE['lembrar_admin'])){
        $user = $_COOKIE['user_admin'];
        $senha = $_COOKIE['senha_admin'];
        $sql = Mysql::conectar()->prepare("SELECT * FROM `admin` WHERE login_admin = ? AND senha_admin = ? ");
        $sql->execute(array($user,$senha));

        if($sql->rowCount() == 1){
            $info = $sql->fetch();
            //logamos
            $_SESSION['login_admin'] = true;
            $_SESSION['usuario_admin'] = $user;
            $_SESSION['senha_admin'] = $senha;
            $_SESSION['nome_admin'] = $info['nome_admin'];
            $_SESSION['nivel_admin'] = $info['nivel'];
            $_SESSION['id_admin'] = $info['admin_id'];
            header('Location:'.PATH_GERENCY);
            die();
        }
    }
 ?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="<?php echo PATH_GERENCY ?>style/login.css">
    <script src="https://kit.fontawesome.com/91e791a30b.js" crossorigin="anonymous"></script>
</head>
<body>

    <section>
        <h2 class="letter">Efetue o Login!</h2>
        <div class="form-area">
            <?php
                if(isset($_POST['acao'])){
                    $user = $_POST['usuario'];
                    $senha = $_POST['senha'];
                    $sql = Mysql::conectar()->prepare("SELECT * FROM `admin` WHERE login_admin = ? AND senha_admin = ? ");
                    $sql->execute(array($user,$senha));

                    if($sql->rowCount() == 1){
                        $info = $sql->fetch();
                        //logamos
                        $_SESSION['login_admin'] = true;
                        $_SESSION['usuario_admin'] = $user;
                        $_SESSION['senha_admin'] = $senha;
                        $_SESSION['nome_admin'] = $info['nome_admin'];
                        $_SESSION['nivel_admin'] = $info['nivel'];
                        $_SESSION['id_admin'] = $info['admin_id'];
                        if(isset($_POST['lembrar_admin'])){
                            setcookie('lembrar_admin',true,time()+(60*60*24),'/');
                            setcookie('user_admin',$user,time()+(60*60*24),'/');
                            setcookie('senha_admin',$senha,time()+(60*60*24),'/');
                        }

                        header('Location:'.PATH_GERENCY);
                        die();
                    }else{
                        echo '<div class="error-box"><i class="fa-solid fa-circle-xmark"></i>Usuário ou senha incorretos!</div>';
                    }

                }
            ?>
            <form method="post">
                <input type="text" name="usuario" placeholder="Usuario..." required>
                <input type="password" name="senha" placeholder="Senha..." required>
                <div class="form-group-login left w50">
                    <input type="submit" name="acao" value="Logar!">
                </div>
                <div class="form-group-login right ">
                    <label for="">Lembrar de mim</label>
                    <input type="checkbox" name="lembrar_admin">
                </div>
                <div class="clear"></div>
            </form>
        </div>
    </section>

</body>
</html>