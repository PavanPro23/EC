import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import {Toaster} from 'react-hot-toast'

const Layout=({children,description,keywords,author,title})=>{
    return(
        <div>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />

            <main style={{minHeight:"70vh"}}>
                <Toaster />
                {children}
            </main>

            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title:"Ecommerce App - Show Now",
    description:"Mern Stack Project",
    keywords:"Mern,React,Node,MongoDB",
    author:"Mern Developer"
}

export default Layout