import React, {Component} from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor"
import {withTracker} from "meteor/react-meteor-data";

// Imports Mongo
import {Empresas} from "../api/empresas.js";
// Imports Structs
import structInfo from "../api/structInfo.js"

import AccountsUIWrapper from "./AccountsUIWrapper.js"
import Services from "../services/restServices.js"

var projectId = [];
var projectName = [];
var projectDescription = [];
var userId;

var serviciosID=[];
var servicioName=[];
var tareasList=[];

/*Listas de Mercados*/
var mercadosDisponibles = ["Mini","Volvo","BMW","KIA"]

//Nota: Se tiene en cuenta la restriccion de N Servicios y N Tareas, pero existe limitacion en la cantidad de Mercados
var listaServiciosBMW = [];
var listaServiciosKIA = [];
var listaServiciosMINI = [];
var listaServiciosVOLVO = [];
var listaTareasBMW = [];
var listaTareasKIA = [];
var listaTareasMINI = [];
var listaTareasVOLVO = [];

//Estructuras Generales
var servicioObject;
var mercadoObject;
var empresaObject;

//Listas Generales
var listaServiciosDisponibles=[];
var listaGenObjServicios=[];
var listaMercadosDisponibles=[];
var listaGenObjMercados=[];
var listaEmpresasDisponibles=[];
var listaGenObjEmpresas=[];

//IterUtils
var k = 0;


class App extends Component {
    
    constructor(props)
    {
        super(props)
        this.state={      
        }
    }

    componentDidMount()
    {
      //Guarda la información de los Request en variables
      this.getAllEmpresas(this.createServices)

      /*Testing de Metodos*/
      //console.log(Services.getProjects())
      //console.log("--------------")
      //console.log(Services.getUsers())
      //console.log("--------------")
      //console.log(Services.getTasksByProjectId("2582841","1753169","1753169"))
      //projectId, assignedId, createdById, pDueDate
      //console.log("--------------")
      //console.log(Services.getWipe())
    }

    getAllEmpresas(callback)
    {
      console.log("getAllEmpresas")
      var projects = Services.getProjects()
        .then((response) => response.json())
          .then((responseJson) => {
            this.fResponse = responseJson.data.projects
            console.log("Respuesta Projects: ",this.fResponse)
            this.fResponse.forEach(res => {
              var pId=res.project_id;
              var pName=res.project_name;
              var pDMarkets=res.project_description;
              var pUser = res.users[0];
              
              projectId.push(pId)
              projectName.push(pName)
              projectDescription.push(pDMarkets)
              userId=pUser

              var booleanListEmpresas;  

              booleanListEmpresas = listaEmpresasDisponibles.includes(pName);
              //console.log("Bool State: ", booleanListEmpresas)
              if(booleanListEmpresas==false)
              {
                listaEmpresasDisponibles.push(pName);
                empresaObject=structInfo.createEmpresa(pId,pName,pUser)
                listaGenObjEmpresas.push(empresaObject)   
              }

            });
          }).then(res=>{callback(projectId,this.createMarkets)})
          .catch((error) =>{
            console.error(error);
          });
    }

    createServices(projectIdList,anotherCallback)
    {
      //console.log("Esto me dio el callback: ",projectIdList); 
      //console.log(anotherCallback)
      //console.log("Test Get Tasks by Project ID: ",Services.getTasksByProjectId("2582841","1753169","1753169"))
      console.log("createServices")
      projectIdList.forEach(id => {
        var tasks = Services.getTasksByProjectId(id,userId,userId)
          .then((response) => response.json())
          .then((responseJson) => {
            var localResponse;
            localResponse = responseJson.data.tasks
            console.log("Respuesta Task ID Project: ",localResponse)
            localResponse.forEach(res => {
              //console.log("mercadoName: ",res.task_group_name,"-","servicioName: ",res.title,"-","tareas: ",res.description)
              var localProyectoId = res.project_id;
              var localMercadoName = res.task_group_name;
              var localServicioName = res.title;
              var localTareaName = res.description;
              
              var localMercadoId;
              var booleanListServicios;

              //Condicional de cada task para saber a que mercado corresponden
              if(localMercadoName==="BMW")
              {
                //console.log("BMW Add!")
                localMercadoId = "BMW";
                listaServiciosBMW.push(localServicioName)
                listaTareasBMW.push(localTareaName)

                booleanListServicios = listaServiciosDisponibles.includes(localServicioName);
                if(booleanListServicios==false)
                {
                  listaServiciosDisponibles.push(localServicioName);

                }
                servicioObject=structInfo.createServicio(localProyectoId,localMercadoId,localServicioName,localTareaName)
                
              }
              else if(localMercadoName==="KIA")
              {
                //console.log("KIA Add!")
                localMercadoId = "KIA";
                listaServiciosKIA.push(localServicioName)
                listaTareasKIA.push(localTareaName)

                booleanListServicios = listaServiciosDisponibles.includes(localServicioName);
                if(booleanListServicios==false)
                {
                  listaServiciosDisponibles.push(localServicioName)
                }
                servicioObject=structInfo.createServicio(localProyectoId,localMercadoId,localServicioName,localTareaName)
              }
              else if(localMercadoName==="MINI")
              {
                //console.log("MINI Add!")
                localMercadoId = "MINI";
                listaServiciosMINI.push(localServicioName)
                listaTareasMINI.push(localTareaName)

                booleanListServicios = listaServiciosDisponibles.includes(localServicioName);
                if(booleanListServicios==false)
                {
                  listaServiciosDisponibles.push(localServicioName) 
                }
                servicioObject=structInfo.createServicio(localProyectoId,localMercadoId,localServicioName,localTareaName)
                
              }
              else if(localMercadoName==="VOLVO")
              {
                //console.log("VOLVO Add!")
                localMercadoId = "VOLVO";
                listaServiciosVOLVO.push(localServicioName)
                listaTareasVOLVO.push(localTareaName)
                
                booleanListServicios = listaServiciosDisponibles.includes(localServicioName);
                if(booleanListServicios==false)
                {
                  listaServiciosDisponibles.push(localServicioName) 
                }
                servicioObject=structInfo.createServicio(localProyectoId,localMercadoId,localServicioName,localTareaName)
              }
              else
              {
                localMercadoId = "NONE";
                console.log("Mercado no identificado, no se pueden agregar servicios ni tareas")
                servicioObject = null;
              }

              listaGenObjServicios.push(servicioObject)   
                    
            });
          }).then(res=>{
            //console.log("PI: ",listaGenObjServicios)
            //console.log("inicia el otro callback")
            anotherCallback(projectIdList,listaGenObjServicios, structInfo.addMarketServices, structInfo.addEnterpriseMarkets, structInfo.addEnterpriseDB)
            
          })
          .catch((error) =>{
            console.error(error);
          });
         
      })
    }

    createMarkets(projectIdList, listaGeneralServicios, callback, callback2, callback3)
    {
      console.log("createMarkets")
      projectIdList.forEach(id => {
        var tasks = Services.getTasksByProjectId(id,userId,userId)
          .then((response) => response.json())
          .then((responseJson) => {
            var localResponse;
            localResponse = responseJson.data.tasks
            //console.log("TASK For Markets: ",localResponse)
            localResponse.forEach(res => {
              //console.log("mercadoName: ",res.task_group_name,"-","servicioName: ",res.title,"-","tareas: ",res.description)
              var localProyectoId = res.project_id;
              var localMercadoName = res.task_group_name;
              
              var booleanListMercados;  

              booleanListMercados = listaMercadosDisponibles.includes(localMercadoName);
              //console.log("Bool State: ", booleanListMercados)
              if(booleanListMercados==false)
              {
                listaMercadosDisponibles.push(localMercadoName);
                mercadoObject=structInfo.createMercado(localProyectoId,localMercadoName)
                listaGenObjMercados.push(mercadoObject)   
              }
                          
            });
          }).then(res=>{
            //Añadir los servicios a los mercados
            //console.log("ListaGenServicios: ",listaGeneralServicios)
            //console.log("ListaGenMercados: ",listaGenObjMercados)

            var listaGS = listaGeneralServicios;
            var listaGM = listaGenObjMercados;
            var listaPM;    

            var pListaGM=callback(listaGS,listaGM)
            listaGenObjMercados=pListaGM
            var pListaGE=callback2(listaGenObjEmpresas, listaGenObjMercados)
            listaGenObjEmpresas = pListaGE     
            callback3(listaGenObjEmpresas)

          })
          .catch((error) =>{
            console.error(error);
          });
         
      })
    }

    render(){
        return (
            <div>
            <h2>Bienvenido a la App de Prueba - Kapta Backend</h2>
            <h3>Inicia sesion para ver el contenido!</h3>
            <AccountsUIWrapper/>
            
            <div id="content">
            {Meteor.user() ?
            <div>Estas logueado!</div>:
            <div>No estas logueado!</div>
            }
            </div>

            </div>
            
        );
    }
}

App.propTypes ={
    empresas: PropTypes.array.isRequired,
    user: PropTypes.object
}

export default AppContainer = withTracker(()=>{
    return {
        empresas: Empresas.find({}).fetch(),
        user: Meteor.user()
    };
})(App);