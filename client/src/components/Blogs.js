import React from 'react';
import { Redirect } from 'react-router-dom'
import { browserHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Prof from './Prof.js';



class Blogs extends React.Component{
    constructor(props){
          super(props);
        this.state = {
          books: [],
          search:""	,
          newbook:"",
          username:[],
          redirect:false	
        }
    }
    Search(event){
      this.setState({
        search : event.target.value
      })
    }
    componentDidMount(){
      fetch("blogs/")
        .then(data => data.json())
        .then((data) => {
          this.setState({ books: data },()=>{
                    this.username()
          })
         })
      }

     username(){
       var that = this
      fetch("post/")
        .then(data => data.json())
        .then((data) => {
          for(var i = 0 ; i < data.length ; i++){
            for(var j = 0 ; j < this.state.books.length ; j++){
              if (this.state.books[j].ProfileId   === data[i].id){
                that.state.books[j].username = data[i].username
                }
            }
          // this.setState({ books: data })
          }
        console.log(that.state.books)

         })
      }


    prof(){
      console.log(this.state.books)
      this.setState({
        redirect:true
      })
    }

    renderRedirect = () =>{
      if(this.state.redirect){
        console.log(this.state.username)
        return <Redirect to = {{
          pathname:"Profile/",
          username:this.state.username,
          state:{newbook:this.state.newbook}
        }}/>
      }
    }

     render(){
       let filtered =this.state.books.filter(
         (book) =>{
           console.log(book)
           return book.country.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
         }
       )
      return(<div>
            {this.renderRedirect()}
              <form style={{ display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete="off">
              {/* <h1>{this.props.username}</h1> */}
                <TextField
                  id="outlined-search"
                  label="Search To Country"
                  type="search"
                  style={{ margin :"auto" , marginTop:"20px",marginRight:"theme.spacing(1)",width:"30%"}}
                  margin="normal"
                  variant="outlined"
                  onChange= {this.Search.bind(this)}
                />
              </form>
              {filtered.map(book =>
                <div key={book.id} onClick = {(e) => {
                  this.setState({newbook:book},()=>{
                    this.prof()
                  });
                }}>
                  <Card style={{maxWidth: 320 ,maxHeight: 410,float:"left",margin:"10px"}}>
                    <CardHeader
                        avatar={
                          <Avatar aria-label="Recipe" style={{ backgroundColor:"#E72C32"}}>
                            P
                          </Avatar>
                        }
                        title={book.title}
                        subheader="September 14, 2018"
                        action={book.country}
                        />
                    <CardMedia
                      style={{height: "0", paddingTop: '56.25%'}}
                      image={book.image}
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {book.Blog}
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
                </div>
                )}                
        </div>
    )}
  }
  
  export default Blogs;
  