import React, {useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = "pk.eyJ1IjoibGVob3VkaW5pIiwiYSI6ImNram43b3FhZTNzYWUydnNjd21zcmJ1d2QifQ.ouLhKn6B6pzmbZJtymQIcg"

const Map = () => {

    const mapRef = useRef(null)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,

            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-104.9876, 39.7405],
            zoom: 12.5,
        })

          // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


        return () => {
            //cleanup when unmounting
            map.remove()
        }
    }, [])

    return(
        <div className="map-container" ref={mapRef}>

        </div>
    )
}

export default Map