
import React, {Component} from 'react'
import ReactDom from 'react-dom'

class Repo extends Component{
   
    render(){
        const {repo}= this.props
        return(
    <div>
        <li className="list-group-item">
           <a href={repo.html_url}>
               {repo.name}
           </a> : {repo.description}
        
        </li>
    </div> )
    }
}



export default Repo