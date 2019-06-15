import React from 'react';

class Hotels extends React.Component{
    constructor(props){
          super(props);
        this.state = {
          hotels:[],
          search:""
        }
    }

    Search(event){
      this.setState({
        search : event.target.value
      })
    }
  
    componentDidMount(){
      fetch("hotels/")
        .then(data => data.json())
        .then((data) => {
           console.log(data)
           this.setState({ hotels: data })
         }).catch((err)=>{
          console.log(err)
         })
    }
  
    render(){
      let filtered =this.state.hotels.filter(
        (hotel) =>{
          return hotel.country.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )
      return(<div>
      
         <nav class="navbar navbar-light bg-light">
          <form class="form-inline" style={{float:"left",marginLeft:"40%"}}>
          <i class="fa fa-search" ></i>
           <input icon="search" style={{float:"left",margin:"10px",height:"30px"}} label="Search Country" class="fa fa-search" onChange= {this.Search.bind(this)} placeholder="Sarch for country"  />
          </form>
        </nav>
           {filtered.map(hotel =>
        <div>
          
                <div className="card" style={{height:"39rem" ,width: "18rem" ,float:"left",margin:"10px"}}>
                  <img className="card-img-top" src={hotel.image} alt="Card image cap" height="200" width="42"/>
                  <div className="card-body">
                    <h5 className="card-title" style={{color:"crimson"}}>{hotel.name}</h5>
                    <p className="card-text"><span style={{fontWeight:"bold"}}>Country:</span>{hotel.country}</p>
                    <p className="card-text"><span style={{fontWeight:"bold"}}>Phone:</span>{hotel.phone}</p>
                    <p className="card-text"><span class="fa fa-star checked" style={{color:"	gold"}}></span>
                    <span class="fa fa-star checked" style={{color:"gold"}}></span><span class="fa fa-star checked" style={{color:"gold"}}></span><span class="fa fa-star checked" style={{color:"gold"}}></span>
                    <span class="fa fa-star checked" style={{color:"gold"}}></span> stars</p>
                    <p className="card-text"><span style={{fontWeight:"bold"}}>Price: </span><span style={{color:"green"}}>{hotel.price}</span></p>
                    <p className="card-text"><span style={{fontWeight:"bold"}}>description:</span>{hotel.desc}</p>
                    <a href={hotel.link} className="btn btn-primary">Reservation</a>
                  </div>
                </div>
        </div>
            )}
        </div>
    )}
  }
  
  export default Hotels;
  