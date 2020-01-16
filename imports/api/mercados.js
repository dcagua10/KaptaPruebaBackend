import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Mercados = new Mongo.Collection("mercados");
if (Meteor.isServer)
{
    Meteor.publish("mercados",()=> {
        return Mercados.find({});
    })
}