import React, {Component} from 'react';
import './style/Search.scss';

class Search extends Component{
    constructor(porps) {
        super(porps);
        this.state = {
            jsxData : [],
        }
    }
    
    async fetchData(){
        const API_URL = `https://api.discogs.com/database/search?key=HnJirdOZRXtwJMrRdDOF&secret=VXtumhgYtfRNxIjmDEMwCObNAQLkSmSh&artist="${this.props.match.params.id}"&country=canada`;
        const response = await fetch(API_URL, {method: 'GET'});
        const jsonData = await response.json();
        console.log(jsonData.results);
        const result = (jsonData.results).map((element, index) => {
            return  <div className="customDiv" key={index}>
                        <img src={element.thumb} alt={element.thumb}/>  
                        <p>{element.title}</p>
                        <button>Add To PlayList</button>
                    </div>
            });
        return result;
    }
    componentDidMount(){
        this.fetchData().then(result => {
            this.setState({jsxData : result});
        })
    }

    render(){
        return(
            <div className="mainContainer">
                {this.state.jsxData}
            </div>
        );
    }
}
export default Search;