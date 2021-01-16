import React from 'react'

const InfoHeader = (props) => {
    const {population, infected, recovered, deaths, active} = props
    
    return(
        //check if props are undefined
        !(Object.values(props).every(element => element !== undefined))
        ? 
        <div className= "infoHeader-landing">
            <h1>Please select a country to see more details</h1>
        </div>
        : 
        <div className="infoHeader-wrapper">
            <div className="infoHeader-population">
                <h2 className="info-title">Population</h2>
                <p className="info-data">{population}</p>
            </div>
            <div className="infoHeader-infected">
                <h2 className="info-title">Infected</h2>
                <p className="info-data">{infected}</p>
            </div>
            <div className="infoHeader-recovered">
                <h2 className="info-title">Recovered</h2>
                <p className="info-data">{recovered}</p>
            </div>
            <div className="infoHeader-deaths">
                <h2 className="info-title">Deaths</h2>
                <p className="info-data">{deaths}</p>
            </div>
            <div className="infoHeader-active">
                <h2 className="info-title">Active</h2>
                <p className="info-data">{active}</p>
            </div>
        </div>
    )
}

export default InfoHeader