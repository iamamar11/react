import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './style/Navbar.scss';

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {value: ''}
    }
    handleChange = (event) => {
        this.setState({value: event.target.value});
    }
    
    render(){
        return(
            <header>
                <span className="logo"><b>{this.props.logoName}</b></span>
                <nav className = "nav">
                    <ul className = "list">
                        <Link to = '/'>
                            <li><button>Home</button></li>
                        </Link>

                        <Link to = '/playlist'>
                            <li><button>Playlist</button></li>
                        </Link>

                        <li>
                            <input type="text" name="search" value={this.state.value} onChange={this.handleChange} />
                            <Link to={{pathname: `/search/${this.state.value}`, params:{name: this.state.value}}}>
                                <input type="submit"/>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    } 
}

export default Navbar;