import { useEffect, useState, useCallback } from "react";
import './AllDevices.css'
const AllDevices = () => {



    const [devices, setDevices] = useState([])

    const handleDevices = useCallback((mediaDevices) => {
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    })

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices)
    }, [handleDevices])



    return (
        <div className="dp-container">
            <h1>Devices</h1>
            <div className="device-list">
                <p>List of available devices:</p>
                {devices.map((device,key) => (
                    <div key={key}>

                        {device.label || `Device ${key + 1}`}
                        </div>
                ))}

            </div>
        </div>
    )
}

export default AllDevices;
