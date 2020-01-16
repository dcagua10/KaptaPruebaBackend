import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Tareas = new Mongo.Collection("tareas");
if (Meteor.isServer)
{
    Meteor.publish("tareas",()=> {
        return Tareas.find({});
    })
}