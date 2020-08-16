import React, {Component} from 'react';
import './style/Body.scss';

class Body extends Component{
    constructor(props) {
        super(props)
        this.state = {
            datajsx: []     
        }
    }

    async fetchData(props){
        const API_URL = 'https://api.discogs.com/database/search?search=nirvana&token=YlxRiqANcYIZpHOYhYEpNcqSftCXmUFQfnfJMuNi'
        const response = await fetch(API_URL, { method: 'GET' })
        const jsonData = await response.json();
        const data = (jsonData.results).map((element, index) => {
            return <div key={index} className="customDiv">
                    <img src={element.thumb} alt="Lost SomeWhere"/>
                    <h3>{element.title}</h3>
                    <span>{element.id}</span>
                </div>
            });
        return data;
        }

    componentDidMount(){
        this.fetchData().then(data =>{
            console.log(data);
            this.setState({datajsx : data})
        })
    }

    render(){
        return(
            <div>
                <div className="mainContainer">
                    {this.state.datajsx}
                </div>
            </div>
        );
    }
}
export default Body;