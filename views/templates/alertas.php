<?php
    foreach($alertas as $key => $mensajes):
        foreach($mensajes as $mensaje):
?>
    <div class="alerta <?php echo $key; ?>">
        <?php echo s($mensaje); ?>
    </div>
<?php
        endforeach;
    endforeach;
?>