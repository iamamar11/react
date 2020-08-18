import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.scss';


class Navbar extends Component{   
    render(){
        return(
            <header>
            <i class="fab fa-spotify fa-2x"><span> Spotify</span></i>
                <nav className = "nav">
                    <ul className = "list">
                        <Link to = '/'>
                            <li>Home</li>
                        </Link>
                        
                        <Link to = '/playlist'>
                            <li>Playlist</li>
                        </Link>
                    </ul>
                </nav>
            </header>
        );
    } 
}

export default Navbar;