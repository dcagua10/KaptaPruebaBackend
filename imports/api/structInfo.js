
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
        console.log(this.nuevoServicio)
        console.log(this.nuevoServicio.listaTareas)
        console.log(tareasArray[i])
        /*if(i!==0 && i!==tareasArray.lenght)
        {
           
        }*/
    }
    console.log("ServicioCreado", nuevoServicio)
    return nuevoServicio;
}
