import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
        <div className='row contactus'>
            <div className="col-md-6">
              <img src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg" alt="contactus" style={{width:"100%"}}></img>
            </div>
            <div className="col-md-4">
              <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
              <p className="text-justify mt-2">
                any query and info about product feel free to call anytime we 24X7 Available
              </p>
              <p className="mt-3">
                <BiMailSend /> : www.help@ecommerceapp.com
              </p>
              <p className="mt-3">
                  <BiPhoneCall /> : 012-3456789
              </p>
              <p className="mt-3">
                  <BiSupport /> : 1800-0000-0000 (toll free)
              </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact
