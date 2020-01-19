
//Declaracion de Variables

//Metodos de creacion de estructuras
exports.createServicio = function (localProyectoId,localMercadoIdName,localServicioName,pTareas)
{
    var nuevoServicio =
    {
        proyecto_id: localProyectoId,
        mercado_name: localMercadoIdName,
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

exports.createEmpresa = function (localProyectoId, localProyectoName, localUserId)
{
  var nuevaEmpresa = 
  {
    proyecto_id: localProyectoId,
    proyecto_nombre: localProyectoName,
    user_id: localUserId,
    mercado_list: [] 
  }
  console.log("nueva empresa: ", nuevaEmpresa)
  return nuevaEmpresa;
}

exports.addMarketServices = function (listaGenObjServicios,listaGenObjMercados)
{
      //console.log("P1: ", listaGenObjServicios)
      //console.log("P2: ", listaGenObjMercados)

      var i,j;
      var copiaListaServicios = listaGenObjServicios;
      var copiaListaMercados = listaGenObjMercados;
      var mercadoActualAdd;
      var nuevaListaMercados=[];

      for (i=0; i<copiaListaMercados.length; i++)
      {
        var actualMercado = copiaListaMercados[i];
        var actualMercadoPID = actualMercado.proyecto_id;
        var actualMercadoName = actualMercado.mercado_name;

        for(j=0; j<copiaListaServicios.length; j++)
        {
          var actualServicio = copiaListaServicios[j];
          var actualServicioPID = actualServicio.proyecto_id
          var actualServicioMercadoName = actualServicio.mercado_name

          /*console.log(actualMercadoPID,"-",actualServicioPID)
          console.log(actualMercadoName,"-",actualServicioMercadoName)*/

          if(actualServicioPID===actualMercadoPID && actualMercadoName===actualServicioMercadoName)
          {
            //console.log("son iguales")
            console.log(actualMercado,"-",actualServicio)
            var mercadoActualAdd = actualMercado.servicio_list;
            mercadoActualAdd.push(actualServicio)
            nuevaListaMercados=copiaListaMercados
          }
        }
      }
      console.log("LM: ",nuevaListaMercados)
      return nuevaListaMercados;
}

exports.addEnterpriseMarkets = function (listaGenObjEmpresas, listaGenObjMercados)
{
  var copyEmpresas=listaGenObjEmpresas;
  var copyMercados=listaGenObjMercados;
  var mercadoActualAdd;
  var nuevaListaEmpresas=[];

      for (i=0; i<copyEmpresas.length; i++)
      {
        var actualEmpresa = copyEmpresas[i];
        var actualEmpresaPID = actualEmpresa.proyecto_id;
        
        for(j=0; j<copyMercados.length; j++)
        {
          var actualMercado = copyMercados[j];
          var actualMercadoPID = actualMercado.proyecto_id

          if(actualEmpresaPID===actualMercadoPID)
          {
            //console.log("push!: ",actualEmpresa,"-",actualMercado)
            var empresaActualAdd = actualEmpresa.mercado_list;
            empresaActualAdd.push(actualMercado)
            nuevaListaEmpresas=copyEmpresas
          }
        }
      }
      console.log("LE: ",nuevaListaEmpresas)
      return nuevaListaEmpresas;
}





