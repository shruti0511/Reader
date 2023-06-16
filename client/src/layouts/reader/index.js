import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React, { useState } from 'react'
import { ReactReader } from 'react-reader'
import { useLocation, useParams } from 'react-router-dom';

const Reader = () => {
    const { state } = useLocation();
    const param =useParams()
    const { path } = state;
    const [location, setLocation] = useState(null)
    const locationChanged = epubcifi => {
        setLocation(epubcifi)
    }
    return (
        <DashboardLayout>
        <DashboardNavbar navTitle="Library" />
            <div style={{ height: '100vh' }}>
                <ReactReader
                    location={location}
                    locationChanged={locationChanged}
                    url={process.env.REACT_APP_SERVER_API +path + "/" + param.file}
                />
            </div>
            </DashboardLayout>
    )
}

export default Reader