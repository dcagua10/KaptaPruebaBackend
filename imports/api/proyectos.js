import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Proyectos = new Mongo.Collection("proyectos");
if (Meteor.isServer)
{
    Meteor.publish("proyectos",()=> {
        return Proyectos.find({});
    })
}