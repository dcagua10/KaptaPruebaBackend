
//Declaracion de Variables

//Metodos de creacion de estructuras
exports.createServicio = function (localProyectoId,localMercadoIdName,localServicioName,pTareas)
{
    var nuevoServicio =
    {
        proyecto_id: localProyectoId,
        servicio_name: localServicioName,
        listaTareas: []
    }
    
    var i;

    var tareasArray = pTareas.split(",")
    //Print que contiene la lista de tareas
    //console.log("arrayT: ",tareasArray)

    for (i=1; i<tareasArray.lenght-1; i++)
    {
        if(i!==0 && i!==tareasArray.lenght)
        {
           nuevoServicio.listaTareas.push(tareasArray[i])
        }
    }
    //console.log("ServicioCreado", nuevoServicio)
    return nuevoServicio;
}
exports.createMercado = function (localProyectoId,localMercadoName)
{
    var nuevoMercado =
    {
        proyecto_id: localProyectoId,
        mercado_name: localMercadoName,
        servicio_list: []
    }
}


