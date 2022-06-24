module.exports = {
    obtener: function (conexion, funcion) {
        conexion.query("SELECT * FROM libroselectronica", funcion);
    },

    insertar: function (conexion, datosE,archivos, funcion) {
        conexion.query("INSERT INTO libroselectronica (titulo,descripcion,imagen,categoria) VALUES (?,?,?,?)", [datosE.titulo, datosE.descripcion, archivos.filename, datosE.categoria], funcion);
    },

    retornardatosID:function (conexion,id,funcion) {
        conexion.query("SELECT * FROM libroselectronica WHERE id = ?",[id], funcion);
    },

    borrar:function (conexion,id,funcion) {
        conexion.query("DELETE FROM libroselectronica WHERE id = ?",[id],funcion);
    },

    actualizar: function (conexion, datosE, funcion) {
        conexion.query("UPDATE libroselectronica SET titulo=?, descripcion=?, categoria=?  WHERE id = ?", [datosE.titulo, datosE.descripcion, datosE.categoria, datosE.id], funcion);
    },
    
    actualizarArchivo: function (conexion, datosE,archivos, funcion) {
        conexion.query("UPDATE libroselectronica SET imagen=?  WHERE id = ?", [archivos.filename, datosE.id], funcion);
    }

}