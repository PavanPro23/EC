import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About"}>
        <div className="row contactus">
          <div className="col-md-6">
            <img src="https://cdn.pixabay.com/photo/2016/03/11/08/02/usa-1249880_1280.jpg" alt="contactus" style={{width:"100%"}}/>
          </div>
          <div className="col-md-4">
            <p className="text-justify mt-2">sdfsdffsdfffdsfsdfsd</p>
          </div>
        </div>
    </Layout>
  )
}

export default About