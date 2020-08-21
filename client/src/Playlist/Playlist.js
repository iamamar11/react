import React, {Component} from 'react';
import './style/Playlist.scss';

class Playlist extends Component{
    constructor(porps) {
        super(porps);
        this.state = {
            jsxData : [],
            jsxOption : [],
            result : 1,
            songs : ''
            
        }
    }
    async deleteItem(id){
        const DELETE_API = `http://localhost:3001/tracks/${id}`
        console.log(DELETE_API);
        const respone = await fetch(DELETE_API, {method : 'delete'});
        const result = await respone.text();
        console.log(result);
        this.componentDidMount()
    }


    handleSelectChange = (event) => {
        this.setState({
          result: event.target.value
        })
      }

    // fetching enteries for creating the drop down menu
    fetchPlaylistName = async() => {
        const API_URL = `http://localhost:3001/playlist`;
        const response = await fetch(API_URL, {method : 'GET'});
        const result = await response.json();
        const optionTag = result.map(element => {
            return <option className="userOption" key={element.playlist_id} data-key={element.playlist_id} value={element.id}>{element.title}</option>
        });
        return optionTag;
    }
    ShowList = async() => {
        {console.log(this.state.result)}
        const API_URL = `http://localhost:3001/tracks/${this.state.result}`;
        const response = await fetch(API_URL, {method : 'GET'});
        const responseJson = await response.json();
        const result = responseJson.map(element => {
           return <tr className="tableRow" key={element.id}>    
                        <td>{element.title}</td>
                        <td>{element.playlist_id}</td>
                        <td><i class="fas fa-minus-circle delete"  onClick={() => this.deleteItem(element.id)}></i></td>
                    </tr>
        });
        this.setState({jsxData: result})
        return result
    }



    componentDidMount(){
        this.fetchPlaylistName().then(res => {
            this.setState({jsxOption : res})
        } )
        this.ShowList().then(result => {
            this.setState({jsxData: result})
        })
    }

    render(){
        return(
            <div className="mainContainer">
                <table className="listConatiner">
                    <thead className="tableHead">
                        <tr>
                            <th>Song Title</th>
                            <th><select onChange={this.handleSelectChange}>{this.state.jsxOption}</select><button onClick={this.ShowList}>search</button></th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* Using the condition here to make list display if it has some data */}
                    {this.state.jsxData !== [] ?
                    <tbody>
                        {this.state.jsxData}
                    </tbody>:null
                }
                </table>
            </div>
        );
    }
}
export default Playlist;