import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Servicios = new Mongo.Collection("servicios");
if (Meteor.isServer)
{
    Meteor.publish("servicios",()=> {
        return Servicios.find({});
    })
}