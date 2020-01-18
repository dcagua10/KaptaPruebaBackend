import React, {Component} from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor"
import {withTracker} from "meteor/react-meteor-data";

import {Proyectos} from "../api/proyectos.js";

import {Tareas} from "../api/tareas.js";
import {Servicios} from "../api/servicios.js";
import {Mercados} from "../api/mercados.js";
import {Empresas} from "../api/empresas.js";


import AccountsUIWrapper from "./AccountsUIWrapper.js"
import Services from "../services/restServices.js"

var projectId = [];
var projectName = [];
var projectDescription = [];
var userId;

var servicioName=[];
var tareasList=[];

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
      this.getAllEmpresas(this.addEmpresas)

      /*Testing de Metodos*/
      /*console.log(Services.getProjects())
      console.log("--------------")
      console.log(Services.getUsers())
      console.log("--------------")
      console.log(Services.getTasksByProjectId("2582841","1753169","1753169"))*/
      //projectId, assignedId, createdById, pDueDate
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
          }).then(res=>{callback(projectId,this.processInformation)})
          .catch((error) =>{
            console.error(error);
          });
    }

    addEmpresas(projectIdList,anotherCallback)
    {
      console.log("Esto me dio el callback: ",projectIdList); 
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
              //Sacar info goes here
              servicioName.push(res.title)
              tareasList.push(res.description)
              console.log("ADD TAREA: ", res.description) 
              console.log("TareasListState: ",tareasList)         
            });
          }).then(res=>{
            console.log("PI: ",servicioName,"-".tareasList)
            console.log("inicia el otro callback")
            anotherCallback(servicioName,tareasList)
            
          })
          .catch((error) =>{
            console.error(error);
          });
         
      })
    }

    processInformation(serviciosList, tareasList)
    {
      console.log("Entro a process!")
      var i;
      console.log("ParametersProcess: ",serviciosList,"-".tareasList)
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

        console.log("Empresa:",empresa)
        //Agrega el archivo a la base de datos
        //Meteor.call("empresas.add",empresa)
      }

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