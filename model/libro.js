module.exports = {
    obtener: function (conexion, funcion) {
        conexion.query("SELECT * FROM libros", funcion);
    },

    insertar: function (conexion, datos,archivos, funcion) {
        conexion.query("INSERT INTO libros (titulo,descripcion,imagen,categoria) VALUES (?,?,?,?)", [datos.titulo, datos.descripcion, archivos.filename, datos.categoria], funcion);
    },

    retornarDatosID:function (conexion,id,funcion) {
        conexion.query("SELECT * FROM libros WHERE id = ?",[id], funcion);
    },

    borrar:function (conexion,id,funcion) {
        conexion.query("DELETE FROM libros WHERE id = ?",[id],funcion);
    },

    actualizar: function (conexion, datos, funcion) {
        conexion.query("UPDATE libros SET titulo=?, descripcion=?, categoria=?  WHERE id = ?", [datos.titulo, datos.descripcion, datos.categoria, datos.id], funcion);
    },
    
    actualizarArchivo: function (conexion, datos,archivos, funcion) {
        conexion.query("UPDATE libros SET imagen=?  WHERE id = ?", [archivos.filename, datos.id], funcion);
    }

}