import React from 'react';
import Select from 'react-select';

//////////////////////////////////////////inline css////////////////////////////////////////
const section = {
  color: '#f78536',
   width: '10pc',
   background: 'rgba(255, 255, 255)',
   border: 'none',
   boxShadow: 'none',
   fontWeight: 'bold',
   fontSize: '14px',
   padding: '5px 10px',
}
const js= {
  display: 'flex',
  position: 'relative',
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  padding: "0.5rem",
  // align:'center',
  marginLeft: '170px'
}
const x= {
  width: "16%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  flexGrow: "0",
  flexShrink: "0",
  padding: "0.5rem",
}
const container= {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const times ={
  width: "300px",
  flex: ".25 1 auto",
  msFlex: "0 1 194px",
  marginRight:"2px",
  marginLeft: '61px'
}
const duration ={
  width: "96px"
}
const divS = {
  padding: '10px',
  margin: '40px',
  border: '5px dashed black'
};
const div = {
  height: '535px',
  padding: '18px',
  margin: '40px',
  border: '5px solid black',
  width: '389px',
  marginLeft: '524px'
};
const font = {
 fontSize:'50px'
};
  

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
////////////////////////////////////////flights component///////////////////////////////////
class Flights extends React.Component{
    constructor(props){
          super(props);
        this.state = {
          Agents:[],
          Carriers:[],
          Currencies:[],
          Itineraries:[],
          Legs:[],       
          Places:[],
          Query:[],
          Segments:[],
          cabinClass:"economy",
          currency:"USD",
          locale:"en-US",
          adults:1,
          children:0,
          infants:0,
          inboundDate:"",
          outboundDate:"",
          country:"JO",
          originPlace:[],
          destinationPlace:[],
          countries:[],
          From:[{PlaceName:"no options",PlaceId:""}],
          To:[{PlaceName:"no options",PlaceId:""}],

        }
        // this.from=this.from.bind(this)
    }
///////////////////////////get the list of countries function///////////////////////////////
    countries(){

    }
 ////////////////////////////////////////////////////////////////// select search
    handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }
/////////////////////////////////////get the tickets function///////////////////////////////    
    search =()=>{
      //make a post request to the external api and post the info from user
      fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",{
        method: "POST",
        headers : {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":"dd3b215dacmsh0fc900bebe41f9fp1964ccjsn2a45d2ede313",
          "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        },
        body:`inboundDate=${this.state.inboundDate}&cabinClass=${this.state.cabinClass}&children=${this.state.children}&infants=${this.state.infants}&country=${this.state.country}&currency=${this.state.currency}&locale=en-${this.state.locale}&originPlace=${this.state.originPlace}&destinationPlace=${this.state.destinationPlace}&outboundDate=${this.state.outboundDate}&adults=${this.state.adults}`
    }).then((response) => {
      console.log("aaaaaaah")
      console.log(response.headers.get("location"))
      var sessionkey = response.headers.get("location");
      var arr = sessionkey.split("/");
      console.log(arr[7],"hellllllooooo");
      console.log(this.state);
      //make a get request to the external api and get the information abt the tickets
      fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/"+arr[7]+"?pageIndex=0&pageSize=10?",{
        method: "GET",
        headers : {
          "X-RapidAPI-Key":"dd3b215dacmsh0fc900bebe41f9fp1964ccjsn2a45d2ede313",
          "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    }).then(response => response.json())
    .then(json => {
      // console.log(json)
      //save the information in the state 
      this.setState({
        Agents:json.Agents,
        Carriers:json.Carriers,
        Currencies:json.Currencies,
        Itineraries:json.Itineraries,
        Legs:json.Legs,
        Places:json.Places,
        Query:json.Query,
        Segments:json.Segments
      })
      console.log(json,"hi");
      console.log(this.state,"hey");
    })
    }).catch((err)=>{
      console.log(err)
    })
    };
/////////////////////////////change the cabin class onchange function///////////////////////
    handlePrint(e) {
        this.setState({
          cabinClass:e.target.value
        },()=>{console.log(this.state.cabinClass)})
    }
/////////////////////////take the arrival date input and save it in state/////////////////
    changeinb(e){
      console.log("hiiiii")
      this.setState({
        inboundDate:e.target.value
      },()=>console.log(this.state))
    };
//////////////////////////////////departure date and save it in the state//////////////////
    changeoutb(e){
      console.log("hiiiii")
      this.setState({
        outboundDate:e.target.value
      },()=>console.log(this.state))
    };
////////////////////////////////take # of adults and save it in state///////////////////////    
    changeAd(e){
      this.setState({
        adults:e.target.value
      },()=>console.log(this.state))
    }
//////////////////////////////take # of children and save it in state//////////////////////
    changech(e){
      this.setState({
        children:e.target.value
      },()=>console.log(this.state))
    }
////////////////////////////////take # of infants and save it in state//////////////////////
    changeinf(e){
      this.setState({
        infants:e.target.value
      },()=>console.log(this.state))
    }



    from(str){
      console.log(this.state,str,"helloooooooooooooooooooo")
      if(str == ""|| str == null){
        str="a"
      }
      console.log("hiiiiiiiii")
      var that=this;
      console.log(str);
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/USD/en-US/?query="+str,{
          method: "GET",
          headers : {
            "X-RapidAPI-Key":"dd3b215dacmsh0fc900bebe41f9fp1964ccjsn2a45d2ede313",
            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
          }
      }).then(response => response.json())
      .then(data => {console.log(data)
          this.setState({
            
            From:data.Places
          },()=>{console.log(this.state.From,'hey')})
        })
      
    }
  select(selectedOption){
      
      if(selectedOption !== null){
        this.setState({
          originPlace: selectedOption.value
        },()=>{
          console.log(this.state.originPlace,"from",this.state)
        })
        console.log(selectedOption.value,"basma")
       
      }

  }
    to(e){
      console.log(this.state,e,"helloooooooooooooooooooo2")
      if(e == ""|| e == null){
        e="b"
      }
        fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/USD/en-US/?query="+e,{
          method: "GET",
          headers : {
            "X-RapidAPI-Key":"dd3b215dacmsh0fc900bebe41f9fp1964ccjsn2a45d2ede313",
            "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
          }
      }).then(response => response.json())
      .then(data => {console.log(data)
        this.setState({
          
          To:data.Places
        },()=>{console.log(this.state.To,'hey')})
      })
      
    }
    select2(selectedOption){
      console.log(this.state)
      if(selectedOption !== null){
        this.setState({
          destinationPlace: selectedOption.value
        },()=>{
          console.log(this.state.destinationPlace,"to",this.state)
        })
        console.log(selectedOption.value,"basma")
       
      }

  }
    render(){
  let options1 = 
  this.state.From.map((option) => {
    return { value: option.PlaceId, label: option.PlaceName };
  })
  let options2 = 
  this.state.To.map((option) => {
    return { value: option.PlaceId, label: option.PlaceName };
  })

      if (this.state.Itineraries.length === 0) {
        return(<div style={{height:'100vh', backgroundImage:"url('http://tempusaircraft.com/wp-content/uploads/2019/01/105562621-1541696972779gettyimages-686525960.1910x1000.jpeg')",backgroundRepeat: "no-repeat",marginTop: '-51px'}}>
                  <div className="tab-content" style={{width: '421px', marginLeft:' 35%',backgroundColor: 'rgba(0,0,0,0.75)',marginTop: '145px',boxShadow:"0 0 0.8823em 0 rgba(0,0,0,0.5)",float: 'left'}}>
                            <div
                              role="tabpanel"
                              className="tab-pane active"
                              id="flights"
                            >
                              <div className="row">
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <div className="input-field">
                                    <label htmlFor="from" style={{color: 'white'}}>From:</label>
                                    <Select
                                      name="form-field-name"
                                      value={this.state.originPlace}
                                      onInputChange={this.from.bind(this)}
                                      onChange={this.select.bind(this)}
                                      onSelectResetsInput={false}
                                      onBlurResetsInput={false}
                                      placeholder="Select country"
                                      searchable={false}
                                      labelKey='PlaceName'
                                      valueKey='PlaceId'
                                      options={options1}                  
                                    />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <div className="input-field">
                                    <label htmlFor="from" style={{color: 'white'}}>To:</label>
                                     <Select
                                        name="form-field-name"
                                        value={this.state.destinationPlace}
                                        onInputChange={this.to.bind(this)}
                                        onChange={this.select2.bind(this)}
                                        onSelectResetsInput={false}
                                        onBlurResetsInput={false}
                                        placeholder="Select country"
                                        searchable={false}
                                        labelKey='PlaceName'
                                        valueKey='PlaceId'
                                        options={options2}                  
                                      />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                  <div className="input-field">
                                    <label htmlFor="date-start" style={{color: 'white'}}>
                                      Check In:
                                    </label>
                                    <input
                                    style={{color: '#f78536',
                                    width: '10pc',
                                    background: 'rgba(255, 255, 255)',
                                    border: 'none',
                                    boxShadow: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    padding: '5px 10px',height: '35px'}}
                                    type="date" 
                                    value={this.state.outboundDate} 
                                    onChange={this.changeoutb.bind(this)}
                                    className="form-control"
                                    id="date-start"
                                    placeholder="mm/dd/yyyy"
                                    />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                  <div className="input-field">
                                    <label htmlFor="date-end" style={{color: 'white'}}>Check Out:</label>
                                    <input
                                    style={{color: '#f78536',
                                    width: '10pc',
                                    background: 'rgba(255, 255, 255)',
                                    border: 'none',
                                    boxShadow: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    padding: '5px 10px',height: '35px'}}
                                    type="date" 
                                    value={this.state.inboundDate} 
                                    onChange={this.changeinb.bind(this)}
                                    className="form-control"
                                    id="date-end"
                                    placeholder="mm/dd/yyyy"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-12 mt" >
                                  <section>
                                    <label htmlFor="class" style={{color: 'white'}}>Class:</label>
                                    <br/>
                                    <select className="cs-select cs-skin-border" style={{color: '#f78536',
                                          width: '10pc',
                                          background: 'rgba(255, 255, 255)',
                                          border: 'none',
                                          boxShadow: 'none',
                                          fontWeight: 'bold',
                                          fontSize: '14px',
                                          padding: '5px 10px',height: '35px'}}
                                          onChange={this.handlePrint.bind(this)}
                                          >
                                           <option value="economy" >economy</option>
                                           <option value="premiumeconomy">premiumeconomy</option>
                                           <option value="business">business</option>
                                           <option value="first">first</option>
                                    </select>
                                  </section>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <section >
                                    <label htmlFor="class" style={{color: 'white'}}>Adult:</label>
                                    <br/>
                                    <input 
                                    className="cs-select cs-skin-border" style={{color: '#f78536',
                                    width: '10pc',
                                    background: 'rgba(255, 255, 255)',
                                    border: 'none',
                                    boxShadow: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    padding: '5px 10px',height: '35px'}}
                                    type ="number" 
                                    min="1" max="8" 
                                    value = {this.state.adults} 
                                    onChange={this.changeAd.bind(this)}>
                                    </input>
                                  </section>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <section>
                                    <label htmlFor="class" style={{color: 'white'}}>Children:</label>
                                    <br/>
                                    <input 
                                    className="cs-select cs-skin-border" style={{color: '#f78536',
                                    width: '10pc',
                                    background: 'rgba(255, 255, 255)',
                                    border: 'none',
                                    boxShadow: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    padding: '5px 10px',height: '35px'}}
                                    type ="number" 
                                    min="0" 
                                    max="8" 
                                    value = {this.state.children} 
                                    onChange={this.changech.bind(this)}>
                                    </input>
                                  </section >
                                </div>
                                <div className="col-xs-12">
                                  <input
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    value="Search Flight"
                                    onClick={this.search.bind(this)}
                                  />
                                </div>
                              </div>
                            </div>
                            </div> 
                            </div>
          
          )
      }
       else {
        console.log(this.state.legs,"sahar")
        var legs = this.state.Itineraries.map((Itinerary) => {
          
        var outboundId = Itinerary.OutboundLegId;
        var inboundId = Itinerary.InboundLegId;
        
        return(
          
        <div >
          <div className="card" style={{height:"22rem" ,width: "48rem" ,float:"left",margin:"10px",border: 'solid',borderWidth: '25px 3px 3px 3px',marginLeft: '22%',borderColor:"#172738"}}>

{/* // {Itinerary.PricingOptions.map(function(p) {
//   var that=this
//           return (
//             <div> */}
            
          {this.state.Legs.map((leg)=>{
            console.log(this.state.legs,"aisha")
            if(leg.Id === outboundId ){
              return(
                <div>
                <div style={js}>
                <div style={container}>
                <div style={times}>
                <span style={{ boxSizing: 'border-box'}}>
                <span style={{marginLeft:'93px'}}>
                {Math.ceil(leg.Duration/60)+"hrs"}
                </span>
                <br/>
                {leg.Departure.split('T')[1]}
                </span>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOcFe-dUnEjWKP0z35fjKMSImCGL_zMVqq9cZf0vzDBzE2wNpKg" style={{height: '18px',width:'127px' ,display:"inline",marginLeft: '9px'}}/>                
                <span style={{ boxSizing: 'border-box',marginLeft: '9px'}}>
                {leg.Arrival.split('T')[1]}
                </span>
                <br/>
                <span style={{marginLeft:'11px'}}>{this.state.originPlace.split('-')[0]}</span> 
                <span style={{marginLeft:'190px'}}>{this.state.destinationPlace.split('-')[0]}</span>
                </div>
                </div>
                </div>
                <hr/>
                </div>
              )
            }

            if(leg.Id === inboundId ){
              return(
                <div>
                <div style={js}>
                <div style={container}>
                <div style={times}>
                <span style={{ boxSizing: 'border-box'}}>
                <span style={{marginLeft:'93px'}}>
                {Math.ceil(leg.Duration/60)+"hrs"}
                </span>
                <br/>
                {leg.Departure.split('T')[1]}
                </span>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgOcFe-dUnEjWKP0z35fjKMSImCGL_zMVqq9cZf0vzDBzE2wNpKg" style={{height: '18px',width:'127px' ,display:"inline",marginLeft: '9px'}}/>                
                <span style={{ boxSizing: 'border-box',marginLeft: '9px'}}>
                {leg.Arrival.split('T')[1]}
                </span>
                <br/>
                <span style={{marginLeft:'11px'}}>{this.state.destinationPlace.split('-')[0]}</span> 
                
                <span style={{marginLeft:'190px'}}>{this.state.originPlace.split('-')[0]}</span>
                </div>
                {/* <div style={{duration}}>
                <br/>
                <span>FlightNumber:{leg.FlightNumbers[0].FlightNumber}</span>
                </div> */}
                
                </div>
                
                </div>
                <hr/>
                </div>
              )
            }
          })
        }
        {Itinerary.PricingOptions.map(function(p) {
            var that=this
                    return (

          <div style={{
          width: "16%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  flexGrow: "0",
  flexShrink: "0",
  padding: "0.5rem",
          
          overflow:'auto'}}>
          <span>
          {p.Price+"$"}
          </span>
          
           {/* <a href={p.DeeplinkUrl}>Booking</a> */}
           <span>
           <button className="btn btn-warning"><a href={p.DeeplinkUrl} target="_blank">Booking</a></button>
           </span>
          {/* <li>{that.state.Agents.map(function(agent){
            if(p.Agents == agent.Id){
              return <li>{agent.ImageUrl}</li>
            }
          })}</li> */}
        </div>
        // </div>
        )})}
        <br/>
        <br/>
        </div>
        
        </div>)
        });
      return(
      <div>
        {legs}
    </div>
    
      )}
    } 
  }    
  
  export default Flights;