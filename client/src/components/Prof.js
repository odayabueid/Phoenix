import React from 'react';
import './prof.css'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'
import Profile from './Profile.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Blogs from './Blogs.js';

const styles = {
 
    backgroundColor: '#00ffff',
    ':hover':  {
      cursor: 'pointer',
      backgroundColor: 'red'
    }
  }
      const style = {
        "text-align": "center"
      }
class Prof extends React.Component{
  constructor(props){
        super(props);
      this.state = { 
          books:[],
          blogs:[],           
          redirect:false,
          bio1:"",
          username:"",
          url:""
      }
  }
  


      componentDidMount(){
      fetch("/post")
     
        .then(data => data.json())
        .then((data) => {
      
        for (var i = 0 ; i < data.length ; i++){
            if(data[i].username === this.props.username){
               this.setState({ books: data[i],
                username: data[i].username, 
                bio1: data[i].bio,
                url: data[i].url
               },()=>{
                this.blogs()
      }
               )}

        }
            
         })
      }
      blogs(){
        var that = this
        fetch("/blogs")
        .then(data => data.json())
        .then((data) => {
          console.log(this.state.books.id)
          console.log(data[0].ProfileId)
          var arr = []
          for (var i = 0 ; i < data.length ;i++){
            if (data[i].ProfileId === this.state.books.id){
              arr.push(data[i])
            }
          }
          that.setState({blogs:arr})
         })
      }



    // prof(){
    //   this.setState({
    //     redirect:true
    //   })
    // }

     render(){
      return(



        <div style={style}> 
        {!this.state.status ? (
          <div>
      <section className="section1 no-background">
          <div className="container1 has-text-centered">
              <figure className="image1 is-128x128 center1" style={{marginLeft: "41%",
      marginTop: "30px"}}>
              <Avatar className="avatar1"
              style={{
                width: "250px",
                height: "250px",
                border: 0,
                objectFit: "cover",
                alignItems: "center",
                border:'solid',
                borderColor:'blue'
              }}
            >
              <img
                id="a"
                src={
                  this.state.url ||
                  "https://i0.wp.com/addisonavenuemarketing.com/wp-content/uploads/2016/07/facebook-avatar.jpg?fit=690%2C435"
                }
                alt="uploaded image"
                style={{ objectFit: "cover", height: "100%" }}
              />
            </Avatar>              </figure>
                <br/>
              <h1 className="title is-2 inline1" style={{color:"black"}} >{this.state.username}</h1>
              <div>
                         <h3>{this.state.email}</h3>
                          
                            <div>
                              <p>{this.state.bio}</p>
                            </div>
                        </div> 
              <br/>
          </div>
      </section>
      <hr/>
      </div>
        ):(
          <Blogs username={this.props.username} Redirect to="/Blogs" />
        )}
   <div>
  {this.state.blogs.map(blog =>
  
  <Card style={{maxWidth: 320 ,maxHeight: 410,float:"left",margin:"10px"}}>
  <CardHeader
  avatar={
  <Avatar aria-label="Recipe" style={{ backgroundColor:"#E72C32"}}>
  P
  </Avatar>
  }
  title={blog.title}
  subheader="September 14, 2018"
  action={blog.country}
  />
  <CardMedia
  style={{height: "0", paddingTop: '56.25%'}}
  image={blog.image}
  />
  <CardContent>
  <Typography variant="body2" color="textSecondary" component="p">
  {blog.Blog}
  </Typography>
  </CardContent>
  <CardActions disableSpacing>
  <IconButton aria-label="Add to favorites" style={{color: "#E72C32"}}>
  <FavoriteIcon />
  </IconButton>
  <IconButton aria-label="Share" style={{color: "#3D91EA"}}>
  <ShareIcon />
  </IconButton>
  </CardActions>
  </Card>
  )}         
  </div>
        </div>
      
//             <div className="container">
//               <div className="size">
//                 <img id = "a"
//                 src={
//                   this.state.books.url ||
//                   'https://i0.wp.com/addisonavenuemarketing.com/wp-content/uploads/2016/07/facebook-avatar.jpg?fit=690%2C435'
//                 }
//               alt="uploaded image"
//               className="image"
//               />
//               <div className="overlay">
//                 <div className="text">
//                   <h1 style={{color:'white',fontFamily:'cursive',fontSize:'50px'}}>Name:{this.state.books.username}</h1>
//                   <h2 style={{color:'white',fontFamily:'cursive',fontSize:'40px'}}>Email:{this.state.books.email}</h2>
//                   <h3 style={{color:'white',fontFamily:'cursive',fontSize:'50px'}}>Bio:{this.state.books.bio}</h3>
//                 </div>
//               </div>
//               </div>
//              <h1> blogs</h1>
//              {this.state.blogs.map(blog =>

//     <Card style={{maxWidth: 320 ,maxHeight: 410,float:"left",margin:"10px"}}>
//       <CardHeader
//           avatar={
//             <Avatar aria-label="Recipe" style={{ backgroundColor:"#E72C32"}}>
//               P
//             </Avatar>
//           }
//           title={blog.title}
//           subheader="September 14, 2018"
//           action={blog.country}
//           />
//       <CardMedia
//         style={{height: "0", paddingTop: '56.25%'}}
//         image={blog.image}
//       />
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//           {blog.Blog}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="Add to favorites" style={{color: "#E72C32"}}>
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="Share" style={{color: "#3D91EA"}}>
//           <ShareIcon />
//         </IconButton>
//       </CardActions>
//     </Card>
//   )}       
//  </div>

    )}
  }
export default Prof;


     