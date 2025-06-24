<?php
namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {
    public $email;
    public $nombre;
    public $token;


    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion(){
        // Crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '95828d1fb0240f';
        $mail->Password = '27a15ac40266a1';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Confirma tu cuenta!';

        // Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UFT-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong>, has creado tu cuenta en AppSalon, solo debes confirmarla dando click al siguiente enlace.</p>";
        $contenido .= "<p>Presiona Aquí: <a href='http://localhost:3000/confirmar-cuenta?token=". $this->token . "'>Confirmar Cuenta</a></p>";
        $contenido .= "<p>Si tú no solicitaste esta cuenta, puedes ignorar este mensaje</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        // Enviar email
        $mail->send();
    }

    public function enviarInstrucciones() {
           // Crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '95828d1fb0240f';
        $mail->Password = '27a15ac40266a1';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Reestablece tu password!';

        // Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UFT-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong>, has solicitado reestablecer tu contraseña en AppSalon, solo debes reestablecerlo dando click al siguiente enlace.</p>";
        $contenido .= "<p>Presiona Aquí: <a href='http://localhost:3000/recuperar?token=". $this->token . "'>Reestablecer Contraseña</a></p>";
        $contenido .= "<p>Si tú no solicitaste este cambio, puedes ignorar este mensaje</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        // Enviar email
        $mail->send();
    }
}