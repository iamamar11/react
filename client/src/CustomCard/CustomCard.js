import React from 'react';
import './style/CustomCard.scss';

class CustomCard extends React.Component{
    TitleAndImg(props){
        return(
            <div>
                <img className="thumbnail" src={props.userthumb} alt={props.userthumb}/>  
                <p className='title'>{props.usertitle}</p>
            </div>
        );
    }
    render(){
        return(
            <div className="customDivBody" key={this.props.index}>
            
            <this.TitleAndImg userthumb = {this.props.thumb} usertitle = {this.props.title} />
            {/* <div className="options"> */}
                <select className="selectOptions" onClick={this.props.clickSelect}>
                    {this.props.jsx}
                </select>
                {/* <button onClick={this.props.clickButton}>CLICK</button> */}
                <i className="fas fa-download download" onClick={this.props.clickButton}></i>
            {/* </div> */}
        </div>
        );
    }
}

export default CustomCard;