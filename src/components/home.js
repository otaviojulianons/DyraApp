import React, { Component } from 'react';
import ReactMarkdown  from "react-markdown";
import Axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { readme: '' };
    }

    componentDidMount(){
        Axios.get("https://raw.githubusercontent.com/otaviojulianons/DynamicRestApi/master/README.md")
            .then(response => {
                console.log(response.data);
                this.setState( {readme: response.data} );
            });
    }

    render() { 
        return ( 
        <div>
            <ReactMarkdown source={ this.state.readme } />
        </div> );
    }
}

const styleContainer = {
    height: 200,
    margin: -24 -16
}
 
export default Home;