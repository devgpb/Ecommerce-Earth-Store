<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exeption;

require './vendor/autoload.php';


$mail = new PHPMailer(); // instancia a classe PHPMailer

$mail->IsSMTP();

//configuração do gmail
$mail->Port = '465'; //porta usada pelo gmail.
$mail->Host = 'smtp.gmail.com'; 
$mail->IsHTML(true); 
$mail->Mailer = 'smtp'; 
$mail->SMTPSecure = 'ssl';

//configuração do usuário do gmail
$mail->SMTPAuth = true; 
$mail->Username = 'umpoucodetudogr@gmail.com'; // usuario gmail.   
$mail->Password = 'HittenMitsurugi12'; // senha do email.

$mail->SingleTo = true; 

// configuração do email a ver enviado.
$mail->From = "Mensagem de email, pode vim por uma variavel."; 
$mail->FromName = "Nome do remetente."; 

$mail->addAddress("berserker18th@gmail.com"); // email do destinatario.

$mail->Subject = "Aqui vai o assunto do email, pode vim atraves de variavel."; 
$mail->Body = "Aqui vai a mensagem, que tambem pode vim por variavel.";

if(!$mail->Send())
    echo "Erro ao enviar Email:" . $mail->ErrorInfo;

?>