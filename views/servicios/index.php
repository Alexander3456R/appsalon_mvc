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
<?php if(isset($_SESSION['exito_actualizacion'])): ?>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        Swal.fire({
            title: "Servicio actualizado",
            icon: "success",
            text: "El servicio fue actualizado correctamente",
            confirmButtonText: "OK"
        });
    </script>
    <?php unset($_SESSION['exito_actualizacion']); ?>
<?php endif; ?>

<?php if(isset($_SESSION['exito_creacion'])): ?>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        Swal.fire({
            title: "Servicio creado",
            icon: "success",
            text: "El servicio fue añadido correctamente",
            confirmButtonText: "OK"
        });
    </script>
    <?php unset($_SESSION['exito_creacion']); ?>
<?php endif; ?>


<?php if(isset($_SESSION['exito_eliminacion'])): ?>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        Swal.fire({
            title: "Servicio eliminado",
            icon: "success",
            text: "El servicio fue eliminado correctamente",
            confirmButtonText: "OK"
        });
    </script>
    <?php unset($_SESSION['exito_eliminacion']); ?>
<?php endif; ?>