import PageLayout from 'examples/LayoutContainers/PageLayout'
import React, { useState } from 'react'
import { ReactReader } from 'react-reader'
import { useLocation, useParams } from 'react-router-dom';

const Reader = () => {
    const { state } = useLocation();
    const param =useParams()
    const { path } = state;
    const [location, setLocation] = useState(null)
    const locationChanged = epubcifi => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }
    return (
        <PageLayout background="white">
            <div style={{ height: '100vh' }}>
                <ReactReader
                    location={location}
                    locationChanged={locationChanged}
                    url={process.env.REACT_APP_SERVER_API +path + "/" + param.file}
                />
            </div>
        </PageLayout>
    )
}

export default Reader