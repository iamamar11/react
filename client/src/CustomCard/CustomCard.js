import React from 'react';
import './style/CustomCard.scss';

class CustomCard extends React.Component{
    render(){
        return(
            <div className="customDivBody" key={this.props.index}>
            <img className="thumbnail" src={this.props.thumb} alt={this.props.thumb}/>  
            <p className='title'>{this.props.title}</p>
            <div className="options">
                <select className="selectOptions" onClick={this.props.clickSelect}>
                    {this.props.jsx}
                </select>
                <i className="far fa-bookmark download" onClick={() => this.props.clickButton}></i>
            </div>
        </div>
        );
    }
}

export default CustomCard;