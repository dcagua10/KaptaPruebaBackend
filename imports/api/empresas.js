import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Empresas = new Mongo.Collection("empresas");
if (Meteor.isServer)
{
    Meteor.publish("empresas",()=> {
        return Empresas.find({});
    })
}

Meteor.methods({
    'empresas.add':function(pEmpresa){
        //console.log("Add: ", pEmpresa)
        Empresas.insert(pEmpresa);
    }
})