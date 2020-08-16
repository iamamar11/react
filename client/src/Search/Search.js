import React, {Component} from 'react';
import './style/Search.scss';

class Search extends Component{
    constructor(porps) {
        super(porps);
        this.state = {
            jsxData : [],
            jsxoption : [],
            result : ''
        }
        this.myRef = React.createRef();
    }

    // fetching enteries for creating the drop down menu
    fetchPlaylistName = async() => {
        const API_URL = "http://localhost:3001/playlist";
        const response = await fetch(API_URL, {method : 'GET'});
        const result = await response.json();
        const optionTag = result.map(element => {
            return <option className="userOption" key={element.id} value={element.title}>{element.title}</option>
        });
        return optionTag;
    }

    handleSelectChange = (event) => {
        this.setState({
          result: event.target.value
        })
      }

    // Adding to playlist
    AddToTrack = async(title,uri) => {
        console.log(title,uri,this.state.result);
        try {
            const API_URL = "http://localhost:3001/tracks";
            const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "playlist_id": this.state.result,
                "title": title,
                "uri": uri
            })
        })
        const result = await response.json();
        console.log(result);
        } catch (error) {
            console.log(error.message);
        }
        
    }
    // fetching from remote API
    async fetchData(){
        const API_URL = `https://api.discogs.com/database/search?key=HnJirdOZRXtwJMrRdDOF&secret=VXtumhgYtfRNxIjmDEMwCObNAQLkSmSh&artist="${this.props.match.params.id}"&country=canada`;
        const response = await fetch(API_URL, {method: 'GET'});
        const jsonData = await response.json();       

        const result = (jsonData.results).map((element, index) => {
            return  <div className="customDivBody" key={index}>
                        <img src={element.thumb} alt={element.thumb}/>  
                        <p>{element.title}</p>
                        <select onClick={this.handleSelectChange}>
                            {this.state.jsxoption}
                        </select>
                        <button onClick={() => this.AddToTrack(element.title, element.uri)}>Add</button>
                    </div>
            });
        return result;
    }
    componentDidMount(){
        this.fetchPlaylistName().then(res => {
            this.setState({jsxoption : res})
        } )
        this.fetchData().then(result => {
            this.setState({jsxData : result });
        });
        
    }

    render(){
        return(
            <div className="mainContainerBody">
                {this.state.jsxData}
            </div>
        );
    }
}
export default Search;