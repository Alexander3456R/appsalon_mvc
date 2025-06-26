<h1 class="nombre-pagina">Servicios</h1>
<p class="descripcion-pagina">Administración de Servicios</p>

<?php
    include_once __DIR__ . '/../templates/barra.php';
?>

<ul class="servicios">
    <?php foreach($servicios as $servicio) { ?>
        <li>
            <p>Nombre: <span><?php echo $servicio->nombre; ?></span></p>
            <p>Precio: <span>$<?php echo $servicio->precio; ?></span></p>
            <div class="acciones">
                <a class="boton" href="/servicios/actualizar?id=<?php echo $servicio->id; ?>">Actualizar</a>
                <form action="/servicios/eliminar" method="POST">
                    <input type="hidden" name="id" value="<?php echo $servicio->id; ?>">
                    <input type="submit" value="Eliminar" class="boton-eliminar">
                    
                </form>
            </div>
        </li>
    <?php } ?>
</ul>

<?php if(isset($_SESSION['exito_creacion'])): ?>
    <script>window.tipoAlerta = 'creacion';</script>
    <?php unset($_SESSION['exito_creacion']); ?>
<?php elseif(isset($_SESSION['exito_actualizacion'])): ?>
    <script>window.tipoAlerta = 'actualizacion';</script>
    <?php unset($_SESSION['exito_actualizacion']); ?>
<?php elseif(isset($_SESSION['exito_eliminacion'])): ?>
    <script>window.tipoAlerta = 'eliminacion';</script>
    <?php unset($_SESSION['exito_eliminacion']); ?>
<?php endif; ?>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="/build/js/app.js"></script>
