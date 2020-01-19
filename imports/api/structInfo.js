
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
    return nuevoMercado;
}

exports.addMarketServices = function (listaGenObjServicios,listaGenObjMercados)
{
      console.log("P1: ", listaGenObjServicios)
      console.log("P2: ", listaGenObjMercados)

      var i,j;
      //var serviciosListMercadoAct = [];
      //var nuevaListaMercados=[];

      var copiaListaServicios = listaGenObjServicios;
      var copiaListaMercados = listaGenObjMercados;
      var mercadoActualAdd;
      var nuevaListaMercados=[];

      for (i=0; i<copiaListaMercados.length; i++)
      {
        var actualMercado = copiaListaMercados[i];
        var actualMercadoPID = actualMercado.proyecto_id;

        for(j=0; j<copiaListaServicios.length; j++)
        {
          var actualServicio = copiaListaServicios[j];
          var actualServicioPID = actualServicio.proyecto_id

          if(actualServicioPID===actualMercadoPID)
          {
            console.log("son iguales")
            console.log(i,"-",j,"-",actualMercado,"-",actualServicio)
            var mercadoActualAdd = actualMercado.servicio_list;
            mercadoActualAdd.push(actualServicio)
            nuevaListaMercados=copiaListaMercados
          }
        }
      }
      console.log("LM: ",nuevaListaMercados)
      return nuevaListaMercados;
}

