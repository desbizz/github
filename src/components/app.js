import axios from 'axios';
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import Header from "../components/layout/header";
import Profile from './github/profile';
import Search from './github/search';
class App extends Component{
     constructor(props){
         super(props)
         this.state = {
             username: '',
             userData: [],
             userRepos: [],
             perPage: 5
         }
     this.getUserData = this.getUserData.bind(this);


     }

       // Get user data from github
       getUserData(){
        axios({
            method: 'get',
            url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secrets='+this.props.clientSecret,
             
          })
          .then((data)=>{
              console.log(data.data)
              this.setState(() => ({
                userData: data.data
              }));
          }).catch(function (error) {
            this.setState(() => ({
                username: null
              }));
            console.log(error);
          });
       
       }
       getUserRepo(){
        axios({
            method: 'get',
            url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secrets='+this.props.clientSecret+'&sort=created',
             
          })
          .then((data)=>{
              console.log(data.data)
              this.setState(() => ({
                userRepos: data.data
              }));
          }).catch(function (error) {
            this.setState(() => ({
                username: null
              }));
            console.log(error);
          });
       
       }
    componentDidMount(){
   this.getUserData()
   this.getUserRepo()
    }
    render(){
        return(
            <div>
           <Header />
           <Search onFormSubmit={(username)=>{
               this.setState({
                username: username
                
              }, ()=>{
                this.getUserData()
                this.getUserRepo()
              });
             
           }}/>
           <Profile {...this.state}/>
           
           {console.log(this.state)}
            </div>
        )
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
}
App.defaultProps = {
    clientId: '',
    clientSecret: '' 
}

export default App