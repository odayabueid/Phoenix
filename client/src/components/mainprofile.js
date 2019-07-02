// import React from 'react';
import React, { Component } from 'react';

import './mainprofile.css';
import { NavLink }  from 'react-router-dom';
import SignUp from './signUp.js';
import SignIn from './signIn.js';
import Blogs from './Blogs.js';
import { storage } from './firebase';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Route, Redirect } from 'react-router'


class Mainprofile extends React.Component{
   constructor(props){
         super(props);
       this.state = {
        email:"",
        url:"",
        username:"",
        bio:"",           
        status : false,
        Blog:"",
        country:"",
        title:"",
        id:"",
        image:null,
        urlimg:"",
        text:"",
        blogs:[],
        flipped: false,
        image1:null,
        bio1:""
       }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
   }



 componentDidMount(){
       var that =  this
       const token = "token " + localStorage.getItem('token');
       fetch('auth/user', {
           method: 'get',
           headers: {'Authorization': token }
       })
       .then(data => data.json())

        .then((data) => {
          this.setState({username : data.username},()=>{
                    this.username()
          })
         })
      }

username(){
 var that = this
      fetch("post/")
        .then(data => data.json())
        .then((data) => {
          for (var i = 0 ; i < data.length ; i++){
            // console.log(data[0])
            console.log(this.state.username)
            if (data[i].username  == this.state.username){
               that.setState({
                username:data[i].username,
                bio:data[i].bio,
                url:data[i].url,
                id:data[i].id,
                bio1:data[i].bio
          })
            }
          }
         })
      }



    handleChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }

    handleUpload(e) {
      e.preventDefault();
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
     uploadTask.on(
      `state_changed`,
      (snapshot) => {
      },
      (error) => {},
      () => {
        storage.ref(`images`).child(image.name).getDownloadURL().then(( urlimg) => {
          console.log( urlimg);
          this.setState({ urlimg });
        });
      }
    );
  }




  handleChange1(e) {
    if (e.target.files[0]) {
      const image1 = e.target.files[0];
      this.setState(() => ({ image1}));
    }
  }

    handleUpload1(e) {
      e.preventDefault();
    const { image1 } = this.state;
    const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
     uploadTask.on(
      `state_changed`,
      (snapshot) => {
      },
      (error) => {},
      () => {
        storage.ref(`images`).child(image1.name).getDownloadURL().then(( url) => {
          console.log( url);
          this.setState({ url },()=>{
            this.update()
  });
        });
      }
    );
  }


  update(){
       var profile ={
        "url" : this.state.url,
        "bio":this.state.bio1
       }
       console.log( {"profile":profile})
    
      fetch(`Update/${this.state.id}`, {
        
        method: "PUT",
        headers : {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "profile" : profile
        })
      }).then((response) => response.json())
      .then((data)=>{
        this.setState({bio:this.state.bio1
      })
            })

  }

   yourdata(event){
        this.setState({[event.target.name]: event.target.value });
     }
   server(e){
    e.preventDefault();
      var that = this;
      fetch("blogs/", {
        method: "POST",
        headers : {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
       "ProfileId":this.state.id,
        "Blog" : this.state.Blog,
        "country" : this.state.country,
        "title": this.state.title ,
        "image":this.state.urlimg     
          } 
        )
      }).then((response) => response.json())
      .then((data)=>{
        this.setState({text:"your blog is uptodate" 
        })
            })
    }

       blog(e){
      // const token = localStorage.getItem('token');
      e.preventDefault();
      var that = this;
      fetch("blogs/", {
        method: "GET",
        headers : {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then((response) => response.json())
      .then((data)=>{
        var arr = []
        for(var i = 0 ; i < data.length ; i++ ){
        
          if(this.state.id == data[i].ProfileId){
          arr.push(data[i])
        }
        }
        console.log(arr)

        that.setState({
        blogs:arr
        })
            })
    }


    logout(){
      localStorage.clear();
      this.setState({
        flipped:true
      })
      return <Redirect to='http://localhost:3000/SignIn'/>
    }

  renderRedirect(){
    if(this.state.flipped){
       return <Redirect to = {{
          pathname:"signIn/"
        }} />
    }
  }
  

   // yourdata(event){
   //     this.setState({ [event.target.name]: event.target.value });
   //  }

click(){
  this.setState({
        status : true
  })
}

    render(){

return(<div id="div" style={{marginTop:"20px",marginRight:'250px'}}>
        {this.renderRedirect()}
        {!this.state.status ? (
     <div style={{width:"100%"}}>

        <Grid container component="main" style={{height: '100vh'}}>
        <Grid item xs={false} sm={4} md={7}  />
        <Grid item xs={24} sm={16} md={10} component={Paper} elevation={12} square>
          <div>
          <input type = "text" name = "bio1"   onChange={this.yourdata.bind(this)}/>
          <Button onClick={this.update.bind(this)}>update</Button>
            <div style={{alignItems: 'center', marginTop:'theme.spacing(8)',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <Avatar style={{ margin:'theme.spacing(1)',width:'150px',height:"150px",margin: 'theme.spacing(1)',border: 0,objectFit: 'cover'}}>
                  <img id = "a"
                    src={
                      this.state.url ||
                      'https://i0.wp.com/addisonavenuemarketing.com/wp-content/uploads/2016/07/facebook-avatar.jpg?fit=690%2C435'
                    }
                  alt="uploaded image"
                  style={{objectFit: 'cover',height: '100%'}}
                  />     
                </Avatar>
                <input
                  type="file"
                  name="image1"
                  onChange={this.handleChange1}
                  style={{marginLeft:"47%",marginBottom:"20px"}} 
                />
                  
                <Button
                  onClick={this.handleUpload1.bind(this)}
                  type="submit"
                  className="Button"
                  fullWidth
                  variant="contained"      
                  style={{ margin: 'theme.spacing(3, 0, 2)',backgroundColor:"#FA3905", color:'white',marginBottom:'20px'}}
                >
                    update
                </Button>
              <h1>{this.state.username}</h1>
              <h3>{this.state.email}</h3>
              <p>{this.state.bio}</p>
            </div>
            
            <form  style={{ width: '100%', marginTop:'theme.spacing(1)'}} noValidate>
                <p  style={{marginLeft:"44%",marginBottom:"20px"}} >upload Travel image</p>
                <input
                  type="file"
                  name="image"
                  onChange={this.handleChange}
                  style={{marginLeft:"47%",marginBottom:"20px"}} 
                />
                  
                <Button
                  onClick={this.handleUpload.bind(this)}
                  type="submit"
                  className="Button"
                  fullWidth
                  variant="contained"      
                  style={{ margin: 'theme.spacing(3, 0, 2)',backgroundColor:"#FA3905", color:'white',marginBottom:'10px'}}
                >
                    Upload
                </Button>
              <div style={{alignItems: 'center', marginTop:'theme.spacing(8)',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <Avatar style={{borderRadius: '4px',width:'430px' ,margin:'theme.spacing(1)',height:"180px",margin: 'theme.spacing(1)',objectFit: 'cover'}}>
                  <img 
              src={
                this.state.urlimg ||
                'https://i0.wp.com/addisonavenuemarketing.com/wp-content/uploads/2016/07/facebook-avatar.jpg?fit=690%2C435'
              }
             alt="uploaded image"
             style={{objectFit: 'cover'}}
            />
                </Avatar>
              </div>
            </form>
            <form>
             
              <TextField
                onChange={this.yourdata.bind(this)}
                variant="outlined"
                margin="normal"
                id="title"
                label="title"
                name="title"
                autoComplete="title"
                autoFocus
                style={{marginLeft:"31%"}}
              />
              <TextField
                onChange={this.yourdata.bind(this)}
                variant="outlined"
                margin="normal"
                style={{marginLeft:"5%"}}
                id="country"
                label="country"
                name="country"
                autoComplete="country"
                autoFocus
              />
               <TextField
                onChange={this.yourdata.bind(this)}
                variant="outlined"
                margin="normal"
                fullWidth
                id="Blog"
                label="Blog"
                name="Blog"
                autoComplete="Blog"
                autoFocus
              />
              <br/>
              <Button
              
                onClick={this.server.bind(this)}
                type="submit"
                className="Button" 
                variant="contained" 
                color="primary"
                style={{ width:"10%",margin:'theme.spacing(1)',backgroundColor:"#FA3905",marginLeft:"15%",marginRight:"10%",marginTop:"20px"}}
              >
                Add Blog
              </Button>
              <Button
                onClick={this.click.bind(this)}
                id="button"
                type="submit"
                variant="contained"      
                style={{width:"10%",margin:'theme.spacing(1)',color:"white",backgroundColor:"#FA3905",marginRight:"10%",marginTop:"20px"}}
              >
                See Bloges
              </Button>
              <Button
                onClick={this.blog.bind(this)}
                id="button"
                type="submit"
                variant="contained"      
                style={{ width:"10%",margin:'theme.spacing(1)',backgroundColor:"#FA3905",color:"white",marginTop:"20px"}}
              >
                my Bloges
              </Button>
               <Button
                onClick={this.logout.bind(this)}
                id="button"
                type="submit"
                variant="contained"      
                style={{ width:"10%",margin:'theme.spacing(1)',backgroundColor:"#FA3905",color:"white",marginTop:"20px",marginLeft:'10%'}}
              >
                log out
              </Button>
            </form>
                  <table>
                    <tbody>
                        {this.state.blogs.map((blog, i) => (
                      <tr
                        key={blog.id}
                        style={{
                          margin: '10px',
                          display: 'block',
                          color: 'black',
                          fontSize: '20px',
                          borderStyle: 'solid',
                          padding: '15px'
                        }}
                          >
                        <span style={{ color: '#FA3905', fontSize: '18px'}}>
                          <strong>Blog title:</strong>
                        </span>
                        <span>{blog.title}</span>
                        <span style={{ color: '#FA3905', fontSize: '18px' ,marginLeft:'20px'}}>
                          <strong>country:    </strong>
                        </span>
                        <span>{blog.country}</span>
                        <span style={{ color: '#FA3905', fontSize: '18px' ,marginLeft:'20px'}}>
                          <strong>Blog:  </strong>
                        </span>
                          <span>{blog.Blog}</span>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
            </Grid>
            </Grid>
                       
   </div>
   ) : (
         <Blogs              
            username = {this.props.username}
            Redirect to="/Blogs"
          />
				)}
       </div>
   )}
 }





 export default Mainprofile;