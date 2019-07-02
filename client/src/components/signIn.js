import React from 'react';
import './signIn.css';
import { Route, Redirect } from 'react-router'
import Mainprofile from './mainprofile.js';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{color:'#FA3905',textAlign:"bold", fontSize:'13px'}}>
      {'Built with love by PHOENIX team'}
    
    </Typography>
  );
}

 
class SignIn extends React.Component{
  constructor(props){
        super(props);
      this.state = {            
        password:'',
        username:"",
        toggleSignIn: false
      }
  }
  yourdata(event){
      this.setState({ [event.target.name]: event.target.value });
   }
  server(e){
    // const token = localStorage.getItem('token');
    e.preventDefault();
    var that = this;
    fetch("auth/signIn", {
      method: "POST",
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username":this.state.username,
        "password" : this.state.password
        } 
        )
    }).then((response) => {
        console.log(response.status)
			if (response.status == 200) {
				response.json().then((body) => {
          const token = body.token
          localStorage.setItem('token', token);
					that.setState(
						{
              toggleSignIn: true
						}
					);
				});
			} else {
					this.setState(
						{
              error : "this email is ourready token"
						}
					);
			}
		});
	}





  
     render(){
      return(
            <div>
              {!this.state.toggleSignIn ? (
                     <div>
                     <Grid container component="main" style={{height: '100vh'}}>
                     <Grid item xs={false} sm={4} md={7} style={{backgroundImage:"url('https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')" ,backgroundRepeat:"no-repeat",backgroundSize:"cover", backgroundPosition: 'center'}} />
                     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
           
           
                       <div id="div" style={{marginLeft:"30px",display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                         <Avatar style={{ margin:"theme.spacing(1)",backgroundColor:"#FA3905"}}>
                           <LockOutlinedIcon />
                         </Avatar>
                         <Typography component="h1" variant="h5" style={{color:"#FA3905"}}>
                           Sign in
                         </Typography>
                         <form  style={{ width: '100%', marginTop:'theme.spacing(1)'}} noValidate>
                       <TextField
                          onChange ={this.yourdata.bind(this)}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Username Address"
                          name="username"
                          autoComplete="username"
                          autoFocus
                        />
                    {/* <input
                      onChange ={this.yourdata.bind(this)}
                      name = "email"
                      placeholder=  " your email"
                      type="email"
                    /> */}

                        <TextField
                          onChange ={this.yourdata.bind(this)}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                         <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                          onClick={this.server.bind(this)}
                          type="submit"
                          fullWidth
                          variant="contained"
                          
                         style={{ margin: 'theme.spacing(3, 0, 2)',backgroundColor:"#FA3905", color:'white'}}
                        >
                          Sign In
                        </Button>
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="#" variant="body2">
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                        <Box mt={5}>
                          <MadeWithLove />
                        </Box>
                        </form>
                    </div>
                </Grid>
              </Grid>
                    </div>
              ) : (
                <Redirect to='/Mainprofile'/>
                     )}
           </div>
    )}
  }
  export default SignIn;






