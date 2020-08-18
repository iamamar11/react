import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style/Body.scss';

class Body extends Component{

    constructor(props){
        super(props)
        this.state = {value: ''}
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render(){
        return(
            <div className="searchDiv">
                <input type="text" name="search" placeholder="Enter Artist name" value={this.state.value} onChange={this.handleChange} />
                <Link to={{pathname: `/search/${this.state.value}`, params:{name: this.state.value}}}>
                    <i class="fas fa-search button"></i>
                </Link>
            </div>
        );
    }
}
export default Body;