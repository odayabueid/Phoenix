import React from 'react';


const bt = {
marginLeft: '10px',
width: '67px',
height: '23px',
fontSize: '13px',
padding: '1px',
marginBottom: '6px'
}

class Checklist extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        items:"",
        list:[],
        done:false,
        id:""
      }
  }
  item(e){
    this.setState({
      items:e.target.value
    })
  };
  done(e){
    this.setState({
      done:e.target.checked
    },()=>console.log(e))
  }
  delete(e){
    var that=this;
    console.log(e.target.value)
    fetch(`TravelList/${e.target.value}/`, {
      
      method: "DELETE",
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"pk":e.target.value})
    }).then((response) => response.json())
    .then((data)=>{
      console.log(data)
      
    }).then(function(){
      console.log('get')
      fetch('TravelList/')
      .then(data => data.json())
      .then((data) => {
        var arr = []
        for(var i=0;i<data.length;i++){
        if(data[i].userId === that.state.id){
          arr.push(data[i])
        }}
        that.setState({ list: arr },()=>console.log(that.state.list))
    });
      }).catch(function(err){
        return (err)
      })
    }

    // componentDidMount(){
  //   var that=this;
  //   fetch('TravelList/')
  //   .then(data => data.json())
  //   .then((data) => { that.setState({ list: data },()=>console.log(that.state.list))
  //  }); 
  // }


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
        var that = this
        fetch("post/")
          .then(data => data.json())
          .then((data) => {
            for (var i = 0 ; i < data.length ; i++){
              // console.log(data[0])
              console.log(this.state.username)
              if (data[i].username  === this.state.username){
                 that.setState({
                  id:data[i].id
            })
              }
            }
           }).then(()=>{
            fetch('TravelList/')
            .then(data => data.json())
            .then((data) => {
              console.log(data,data[0].userId,that.state.id)
              var arr = []
              for(var i=0;i<data.length;i++){
              if(data[i].userId === that.state.id){
                arr.push(data[i])
              }}
              that.setState({ list: arr },()=>console.log(that.state.list))
            that.setState({items:""}) 
          }); 
          })
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
         if (data[i].username  === this.state.username){
            that.setState({
             id:data[i].id
       })
         }
       }
      })
   }



  add=()=>{
    var that=this;
    fetch("TravelList/", {
      
      method: "POST",
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"userId":this.state.id,"text":that.state.items,"done":that.state.done})
    }).then((response) => response.json())
    .then((data)=>{
      console.log(data)
      
    }).then(function(){
      console.log('get')
        fetch('TravelList/')
        .then(data => data.json())
        .then((data) => {
          var arr = []
          for(var i=0;i<data.length;i++){
          if(data[i].userId === that.state.id){
            arr.push(data[i])
          }}
          that.setState({ list: arr },()=>console.log(that.state.list))
        that.setState({items:""}) 
      }); 
      }).catch(function(err){
        return (err)
      })
  }
      // <div>
      //   <input type="text" value = {this.state.items} onChange={this.item.bind(this)}placeholder="add a new item..."></input>
      //   <button onClick={this.add.bind(this)}>add </button>
      //   {this.state.list.map((item)=>{
      //     return(
      //       <div>
      //         {/* <input type = "checkbox" value = {item.id} onClick={this.done.bind(this)}></input> */}
      //         <span>{item.text}</span>
      //         <button onClick={this.delete.bind(this)} value={item.id} > delete</button>
      //       </div>
      //     )
      //   })}
      // </div>
      //class="form-control add-todo" 
      
  render(){
    return(
      
      <div className=".container" style={{height:'100vh',backgroundImage:"url('https://worldoftravel.co/wp-content/uploads/MyTravel_India_56ab7400569e61c81ee96d81.jpeg')" }}>

    <div className="row " style={{marginLeft: '33px'}}>
        <div className="col-md-6" style={{background:'rgb(0,0,0,0.5)',width: '43%',marginTop: '29px',position:'absolute', borderRadius: '13px'}}>
            <div className="todolist not-done">
             <div className="checkbox">
               
                <input type="text" value = {this.state.items} onChange={this.item.bind(this)}placeholder="add a new item..." style={{width:'450px',height: '40px'}}/>
                    <button className="btn btn-dark" onClick={this.add.bind(this)} style={{marginLeft:'19px'}}>Add</button>
                    <br/>
                    </div>
                    <ul id="sortable" className="list-unstyled">
                    {this.state.list.map((item)=>{
                      return(
                        <div>
                        <br/>

                    <li className="ui-state-default">
                        <div className="checkbox" style={{marginLeft: '15px'}}>
                            <label style ={{fontSize:'25px',color:'white',fontStyle: 'italic',fontFamily:"serif"}}>
                                <input type="checkbox" value="" style={{zoom: '1.9'}} />{item.text}</label>
                                <button onClick={this.delete.bind(this)} value={item.id} class="btn btn-dark" style={bt}> delete</button>
                                <hr/>
                        </div>
                        
                    </li>
                    </div>
                      )
                  })}
                </ul>
            </div>
        </div>
    </div>
    <div style={{background:'rgb(102,0,51,0.5)', width:'40%',float:'right',marginTop: '159px',borderRadius: '15px', marginRight:'97px'}}>
          <h1 style={{fontStyle: 'italic',fontFamily:"serif"}}>Recommendations</h1>
          <br/>
          <ul style={{marginLeft:'19px',fontSize:'26px',color: 'white'}}>
            <li> √ don't forget the toothbrush</li>
            <li> √ book for long trips</li>
            <li> √ passport</li>

          </ul>
        </div>
</div>
    )
  }
}
export default Checklist;