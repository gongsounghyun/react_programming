import React from 'react'
import home_image from '/Users/gongseonghyeon/Desktop/react/boilerplate-mern-stack-master/client/src/image/logo_home.JPG'

function FrontPage() {
    return (
        <div style= {{textAlign : "center" }}>
            <img src = {home_image} alt = "logo"/>
        </div>
    )
}

export default FrontPage
