import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import {Empresas} from "../api/empresas.js";

class EnterpriseView extends React.Component 
{
    constructor(props){
        super(props);
    
        this.state={

        };
        
        this.renderEmpresas()
    }

    renderEmpresas()
    {
        //Aca se llaman las empresas de la DB
        //console.log("EV: ",this.props.empresas)
        var empresasList = this.props.empresas;

        return empresasList.map((r,i)=>{
            <div>
            {/*console.log("R: ",r)*/}
            <p>------------------------------------</p>
            <p>Proyecto!</p>
            <p><strong>{r.proyecto_nombre}:</strong>{r.proyecto_id}</p>
            <p><strong>Usuario ID:</strong>{r.user_id}</p>

            <p>------------------------------------</p>
            </div>
            
        });
    }
    render()
    {
        return(
            <div>
            <div>Estas son las empresas disponibles</div>
            {console.log("RE:",this.renderEmpresas())}
            </div>
        );
    }
}

EnterpriseView.propTypes ={
    empresas: PropTypes.array.isRequired,
    user: PropTypes.object  
}

export default withTracker(()=>{
    Meteor.subscribe('empresas');
    return{
        empresas: Empresas.find({}).fetch(),
        user: Meteor.user()
    };
})(EnterpriseView);
