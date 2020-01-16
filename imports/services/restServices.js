var KEY = require("../config/properties.js").API_KEY;
var SECRET_KEY = require("../config/properties.js").SECRET_KEY;
//var TOKEN = require("../config/properties.js").TOKEN;
//var COOKIE = require("../config/properties.js").COOKIE;
var baseURL = "https://freedcamp.com/api/v1/";
var fixCorsURL = "https://cors-anywhere.herokuapp.com/"
var serviceURL;
var timestamp;
var hash;
var endingURL;
var finalURL;

var dueDate;

var fResponse;

//Problemas de la App con Cors
exports.getProjects = function () {
    timestamp = new Date().valueOf();
    hash = CryptoJS.HmacSHA1(KEY + timestamp, SECRET_KEY);
    serviceURL = "projects"
    endingURL = "&limit=5&offset=0"
    finalURL = fixCorsURL+baseURL+serviceURL+"?api_key="+KEY+
    "&timestamp="+timestamp+
    "&hash="+hash+endingURL

    console.log("URLFinal",finalURL)

    return fetch(finalURL, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":"*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
        }
      })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //   this.fResponse = responseJson.data.projects
        //   console.log("Respuesta Projects: ",this.fResponse)
        // })
        // .catch((error) =>{
        //   console.error(error);
        // });
}

exports.getUsers = function () {
  timestamp = new Date().valueOf();
  hash = CryptoJS.HmacSHA1(KEY + timestamp, SECRET_KEY);
  serviceURL = "users"
  endingURL = "&limit=5&offset=0"
  finalURL = fixCorsURL+baseURL+serviceURL+"?api_key="+KEY+
  "&timestamp="+timestamp+
  "&hash="+hash+endingURL

  console.log("URLFinalUser",finalURL)

  return fetch(finalURL, {
      method: "GET",
      mode: "cors",
      headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.fResponse = responseJson.data
        //console.log("Respuesta User:",this.fResponse) 
      })
      .catch((error) =>{
        console.error(error);
      });
}

exports.getWipe = function () {
  timestamp = new Date().valueOf();
  hash = CryptoJS.HmacSHA1(KEY + timestamp, SECRET_KEY);
  serviceURL = "wipe/current"
  endingURL = "&limit=5&offset=0"
  finalURL = fixCorsURL+baseURL+serviceURL+"?api_key="+KEY+
  "&timestamp="+timestamp+
  "&hash="+hash+endingURL

  console.log("URLFinalWipe",finalURL)

  return fetch(finalURL, {
      method: "GET",
      mode: "cors",
      headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.fResponse = responseJson.data
        console.log("Respuesta Wipe:",this.fResponse) 
      })
      .catch((error) =>{
        console.error(error);
      });
}

exports.getTasksByProjectId = function (projectId, assignedId, createdById) {
  timestamp = new Date().valueOf();
  hash = CryptoJS.HmacSHA1(KEY + timestamp, SECRET_KEY);
  serviceURL = "tasks"
  endingURL = "&limit=5&offset=0"
  finalURL = fixCorsURL+baseURL+serviceURL+"?api_key="+KEY+
  "&timestamp="+timestamp+
  "&hash="+hash+
  "&project_id="+projectId+
  "&assigned_to_id[]="+assignedId+
  "&created_by_id[]="+createdById+
  "&sort[due_date]=asc"+
   endingURL

  console.log("URLFinalTask",finalURL)

  return fetch(finalURL, {
      method: "GET",
      mode: "cors",
      headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":"*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.fResponse = responseJson.data.tasks
        console.log("Task by ProjectID Test: ",this.fResponse) 
      })
      .catch((error) =>{
        console.error(error);
      });
}