import React, {Component} from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor"
import {withTracker} from "meteor/react-meteor-data";

// TestImportMongo
import {Proyectos} from "../api/proyectos.js";
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
var empresaProyect;

//Listas Generales
var listaServiciosDisponibles=[];
var listaGenObjServicios=[];


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
      console.log("--------------")
      //console.log(Services.getUsers())
      console.log("--------------")
      //console.log(Services.getTasksByProjectId("2582841","1753169","1753169"))
      //projectId, assignedId, createdById, pDueDate
      //console.log("--------------")
      //console.log(Services.getWipe())
    }

    getAllEmpresas(callback)
    {
      var projects = Services.getProjects()
        .then((response) => response.json())
          .then((responseJson) => {
            this.fResponse = responseJson.data.projects
            console.log("Respuesta Projects: ",this.fResponse)
            this.fResponse.forEach(res => {
              projectId.push(res.project_id)
              projectName.push(res.project_name)
              projectDescription.push(res.project_description)
              userId=res.users[0]
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

              //Sacar info goes here
              //servicioName.push(res.title)
              //ERROR AL AGREGAR TAREAS
              //tareasList.push(res.description)
              //console.log("ADD TAREA: ", res.description) 
              //console.log("TareasListState: ",tareasList)   
                    
            });
          }).then(res=>{
            console.log("PI: ",listaGenObjServicios)
            //console.log("inicia el otro callback")
            anotherCallback(listaGenObjServicios)
            
          })
          .catch((error) =>{
            console.error(error);
          });
         
      })
    }

    createMarkets(identificadorMercado,serviciosList, tareasList)
    {
      /*//console.log("Entro al procesamiento!")
      var i;
      //console.log("ParametersProcess: ",serviciosList,"-".tareasList)
      for(i=0; i<projectId.length; i++)
      {
        var tareas = tareasList[i];
        var servicios = {
          servicio_name: serviciosList[i],
          tareas_list: tareas
        }
        var mercados = {
          mercado_name: projectDescription[i],
          servicios_list: servicios
        }
        var empresa =
        {
          project_id: projectId[i],
          project_name: projectName[i],
          mercados_list: mercados,
        }

        //console.log("Empresa:",empresa)
        //Agrega el archivo a la base de datos
        //Meteor.call("empresas.add",empresa)
      }*/

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
    proyectos: PropTypes.array.isRequired,
    user: PropTypes.object
}

export default AppContainer = withTracker(()=>{
    return {
        proyectos: Proyectos.find({}).fetch(),
        user: Meteor.user()
    };
})(App);