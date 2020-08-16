import React, {Component} from 'react';
import './style/Playlist.scss';

class Playlist extends Component{
    constructor(porps) {
        super(porps);
        this.state = {
            jsxData : []
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

    async fetchData(props){
        const API_URL = "http://localhost:3001/tracks";
        const response = await fetch(API_URL, {method: 'GET'});
        const jsonData = await response.json();
        const result = jsonData.map((element, index) => {
            return  <tr className="tableRow" key={element.id}>    
                        <td>{element.title}</td>
                        <td><button onClick={() => this.deleteItem(element.id)}>DELETE</button></td>
                    </tr>
            });
        return result;
    }
    componentDidMount(){
        this.fetchData().then(result => {
            console.log(result)
            this.setState({jsxData : result});
        })
    }

    render(){
        return(
            <table className="listConatiner">
                {this.state.jsxData}
            </table>
        );
    }
}
export default Playlist;