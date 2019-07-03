import React from "react";
import { Redirect } from 'react-router-dom'

const section = {
   color: '#f78536',
    width: '11pc',
    background: 'rgba(0, 0, 0, 0.05)',
    border: 'none',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '5px 10px',
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs:[
        {
          title: "",
          country: "",
          Blogs : ""
        },
        {
          title: "",
          country: "",
          Blogs : ""
        },
        {
          title: "",
          country: "",
          Blogs : ""
        }
      ],
      map:false,
      weather:false,
      checklist:false,
      currency:false
      
    };
  }

  componentDidMount(e){
    // e.componentWillReceiveProps()
  
      // if(!window.location.hash) {
      //     window.location = window.location + '#loaded';
      //     window.location.reload();
      // }
  
    fetch("blogs/")
      .then(data => data.json())
      .then((data) => {
        var arr = []
        for(var i = data.length-1; i >= data.length-3; i--){
          arr.push(data[i]);
        }
        this.setState({ blogs: arr },()=>{
          console.log(this.state.blogs)
         
})
       })
    }

    map(){
      this.setState({
        map:true
      })
    }

    weather(){
      this.setState({
        weather:true
      })
    }
    currency(){
      this.setState({
        currency:true
      })
    }
    list(){
      this.setState({
        checklist:true
      })
    }
    renderRedirect = () =>{
      if(this.state.map){
        // return <Redirect to ='Profile' />
        return <Redirect to = {{
          pathname:"MapContainer/"
        }} />
      }
      if(this.state.weather){
        // return <Redirect to ='Profile' />
        return <Redirect to = {{
          pathname:"Weather/"
        }} />
      }
      if(this.state.currency){
        // return <Redirect to ='Profile' />
        return <Redirect to = {{
          pathname:"Currancy"
        }} />
      }
      if(this.state.checklist){
        // return <Redirect to ='Profile' />
        return <Redirect to = {{
          pathname:"TravelList"
        }} />
      }
    }


  render() {
  
    return (
      <div>
         {this.renderRedirect()}
        <div id="fh5co-wrapper">
          <div id="fh5co-page">
            <div className="fh5co-hero">
              <div className="fh5co-overlay" />
              <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={{backgroundImage:'url(https://www.travelassociates.com/sites/v2.travel-associates.com.au/files/Beach%20Breaks%20header%20.jpg)'}}>
                <div className="desc">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-5 col-md-5">
                        <div className="tabulation animate-box">
                          <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active">
                              <a style={{color:'#f78536'}}
                                href="#flights"
                                aria-controls="flights"
                                role="tab"
                                data-toggle="tab"
                              >
                                Flights
                              </a>
                            </li>
                            <li role="presentation">
                              <a
                                href="#hotels"
                                style={{color:'#f78536'}}
                                aria-controls="hotels"
                                role="tab"
                                data-toggle="tab"
                              >
                                Hotels
                              </a>
                            </li>
                          </ul>

                          <div className="tab-content">
                            <div
                              role="tabpanel"
                              className="tab-pane active"
                              id="flights"
                            >
                              <div className="row">
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <div className="input-field">
                                    <label htmlFor="from">From:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="from-place"
                                      placeholder="Los Angeles, USA"
                                    />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <div className="input-field">
                                    <label htmlFor="from">To:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="to-place"
                                      placeholder="Tokyo, Japan"
                                    />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                  <div className="input-field">
                                    <label htmlFor="date-start">
                                      Check In:
                                    </label>
                                    <input
                                    style={section}
                                      type="date"
                                      className="form-control"
                                      id="date-start"
                                      placeholder="mm/dd/yyyy"
                                    />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                  <div className="input-field">
                                    <label htmlFor="date-end">Check Out:</label>
                                    <input
                                    style={section}
                                      type="date"
                                      className="form-control"
                                      id="date-end"
                                      placeholder="mm/dd/yyyy"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-12 mt" >
                                  <section>
                                    <label htmlFor="class">Class:</label>
                                    <br/>
                                    <select className="cs-select cs-skin-border" style={section}>
                                      <option value="" disabled selected>
                                        Economy
                                      </option>
                                      <option value="economy">Economy</option>
                                      <option value="first">First</option>
                                      <option value="business">Business</option>
                                    </select>
                                  </section>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <section >
                                    <label htmlFor="class">Adult:</label>
                                    <br/>
                                    <select className="cs-select cs-skin-border" style={section}>
                                      <option value="" disabled selected>
                                        1
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </section>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <section>
                                    <label htmlFor="class">Children:</label>
                                    <br/>
                                    <select className="cs-select cs-skin-border" style={section}>
                                      <option value="" disabled selected>
                                        1
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </section >
                                </div>
                                <div className="col-xs-12">
                                  <input
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    value="Search Flight"
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              role="tabpanel"
                              className="tab-pane"
                              id="hotels"
                            >
                              <div className="row">
                                <div className="col-xxs-12 col-xs-12 mt">
                                  <div className="input-field">
                                    <label htmlFor="from">City:</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="from-place"
                                      placeholder="Los Angeles, USA"
                                    />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                  <div className="input-field">
                                    <label htmlFor="date-start">Return:</label>
                                    <input
                                    style={section}
                                      type="date"
                                      className="form-control"
                                      id="date-start"
                                      placeholder="mm/dd/yyyy"
                                    />
                                  </div>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt alternate">
                                  <div className="input-field">
                                    <label htmlFor="date-end">Check Out:</label>
                                    <input
                                      style={section}
                                      type="date"
                                      className="form-control"
                                      id="date-end"
                                      placeholder="mm/dd/yyyy"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-12 mt">
                                  <section >
                                    <label htmlFor="class">Rooms:</label>
                                    <br/>
                                    <select className="cs-select cs-skin-border" style={section}>
                                      <option value="" disabled selected>
                                        1
                                      </option>
                                      <option value="economy">1</option>
                                      <option value="first">2</option>
                                      <option value="business">3</option>
                                    </select>
                                  </section>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <section >
                                    <label htmlFor="class">Adult:</label>
                                    <select className="cs-select cs-skin-border" style={section}>
                                      <option value="" disabled selected>
                                        1
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </section>
                                </div>
                                <div className="col-xxs-12 col-xs-6 mt">
                                  <section >
                                    <label htmlFor="class">Children:</label>
                                    <select className="cs-select cs-skin-border" style={section}>
                                      <option value="" disabled selected>
                                        1
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                    </select>
                                  </section>
                                </div>
                                <div className="col-xs-12">
                                  <input
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    value="Search Hotel"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="block" className="desc2 animate-box">
                        <div className="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                          <h2>Find the best deals for flights and hotels</h2>
                          {/* <h3>Fly to Hong Kong via Los Angeles, USA</h3> */}
                          {/* <span className="price">$599</span> */}
                          <p>
                            <a className="btn btn-primary btn-lg" href="#">
                              Get Started
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="fh5co-features">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 animate-box">
                    <div className="feature-left">
                      <span className="icon">
                        <i className="icon-list" />
                      </span>
                      <div className="feature-copy">
                        <h3>Travel list</h3>
                        <p>
                          Don't you just hate it when you forget to pack something for your trip,
                          Use our travel list to help you make sure you are all set
                        </p>
                        <p onClick={this.list.bind(this)}>
                          <a href="#">Learn More</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 animate-box">
                    <div className="feature-left">
                      <span className="icon">
                        <i className="icon-sun" />
                      </span>
                      <div className="feature-copy">
                        <h3>Weather</h3>
                        <p>
                          Find out how the weather will be before even getting to your destination
                          just incase you might need an umbrella 
                        </p>
                        <p onClick={this.weather.bind(this)}>
                          <a href="#">Learn More</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 animate-box">
                    <div className="feature-left">
                      <span className="icon">
                        <i className="icon-wallet" />
                      </span>
                      <div className="feature-copy">
                        <h3>Currency Converter</h3>
                        <p>
                          No need to hurt your head with counting money, this currency converter
                          will make sure all your calculations are intact
                        </p>
                        <p onClick={this.currency.bind(this)}>
                          <a href="#">Learn More</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 animate-box">
                    <div className="feature-left">
                      <span className="icon">
                        <i className="icon-map" />
                      </span>
                      <div className="feature-copy">
                        <h3>City Guide</h3>
                        <p>
                          Explore the best tourist places, restraunts, cafes with out city guide,
                          trust us you will never get lost
                        </p>
                        <p onClick={this.map.bind(this)}>
                          <a href="#">Learn More</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="fh5co-destination">
              <div className="tour-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <ul id="fh5co-destination-list" className="animate-box">
                      <li className="one-forth text-center " style={{backgroundImage: 'url(https://www.dwellondesign.com/content/informa/LA-Dwell-on-Design/en/visiting/los-angeles/_jcr_content/par_page/column_control_144468495/par-col-2/image.img.jpg/1512385954309.jpg)'}}>
                        <a>
                          <div className="case-studies-summary">
                            
                            <h2>Los Angeles</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage: 'url(https://www.hong-kong-traveller.com/image-files/xattractions-nan-lian-garden.jpg.pagespeed.ic.h4EfwY3fuH.jpg)'}}>

                        <a>
                          <div className="case-studies-summary">
                            <h2>Hongkong</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage: 'url(https://infinitecoincidenceblog.files.wordpress.com/2017/11/venice-xlarge.jpg)'}}>
                        <a>
                          <div className="case-studies-summary">
                            <h2>Italy</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage:'url(https://s.yimg.com/ny/api/res/1.2/4I36Zr1soIVwVBSY5ucK_Q--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NzI4O2g9NDAw/https://media.zenfs.com/en-US/smartasset_475/db34d5adace8b2d85e1a288919f30f35)'}}>
                        <a>
                          <div className="case-studies-summary" >
                            <h2>Philippines</h2>
                          </div>
                        </a>
                      </li>

                      <li className="one-forth text-center" style={{backgroundImage:'url(https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1541615301/nara-japan-temple-complex-JAPANESSAY1218.jpg?itok=f1Zr02DK)'}}>
                        <a>
                          <div className="case-studies-summary">
                            <h2>Japan</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-half text-center">
                        <div className="title-bg">
                          <div className="case-studies-summary">
                            <h2>Explore The World <br/> With Phoenix</h2>
                          
                          </div>
                        </div>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage:'url(http://thehugoway.com/wp-content/uploads/2016/08/IMG_5919.jpg)'}}>
                        <a>
                          <div className="case-studies-summary">
                            <h2>Paris</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage:'url(https://img.theculturetrip.com/x/smart/wp-content/uploads/2019/04/singapore--filipe-frazao-shutterstock.jpg)'}}>
                        <a>
                          <div className="case-studies-summary">
                            <h2>Singapore</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage:'url(https://www.prosperity.com/application/files/7714/7802/1155/Madagascar_header.jpg)'}}>
                        <a>
                          <div className="case-studies-summary">
                            <h2>Madagascar</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage:'url(https://exclusivesmedia.webjet.com.au/uploads/2017/11/Best-Egypt-Nile-cruise-12.jpg)'}}>
                        <a>
                          <div className="case-studies-summary">
                            <h2>Egypt</h2>
                          </div>
                        </a>
                      </li>
                      <li className="one-forth text-center" style={{backgroundImage:'url(https://img.theculturetrip.com/768x432/wp-content/uploads/2018/04/shutterstock_316997570-by-christophe-faugere.jpg)'}}>
                        <a>
                          <div className="case-studies-summary">
                            <h2>Indonesia</h2>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div id="fh5co-blog-section" className="fh5co-section-gray">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2 text-center heading-section animate-box">
                    <h3>Recent From Blog</h3>
                    <p>
                    Learn about others experiences and see their journeys across the 
                    world maybe you will find your next adventure
                    </p>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row row-bottom-padded-md">
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="fh5co-blog animate-box">
                      <div className="blog-text">
                       <div className="prod-title">
                          <h3>
                            <i>{this.state.blogs[0].title}</i>
                          </h3>
                          <img style={{height:"100px", width: "230px"}} src = {this.state.blogs[0].image}/>
                          <span className="posted_by">{this.state.blogs[0].country}</span>
                          <p>
                            {this.state.blogs[0].Blog}
                          </p>
                          <p>
                            <a href="#">Read More...</a>
                          </p>
                        </div> 
                        
                       </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="fh5co-blog animate-box">
                     
                      <div className="blog-text">
                        <div className="prod-title">
                          <h3>
                          <i>{this.state.blogs[1].title}</i>
                          </h3>
                          <img style={{height:"100px", width: "230px"}} src = {this.state.blogs[1].image}/>
                          <span className="posted_by">{this.state.blogs[1].country}</span>
                          <p>
                          {this.state.blogs[1].Blog}
                          </p>
                          <p>
                            <a href="#">Read More...</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix visible-sm-block" />
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    <div className="fh5co-blog animate-box">
                      <div className="blog-text">
                        <div className="prod-title">
                        <h3>
                            <i>{this.state.blogs[2].title}</i>
                          </h3>
                          <img style={{height:"100px", width: "230px"}} src = {this.state.blogs[2].image}/>
                          <span className="posted_by">{this.state.blogs[2].country}</span>
                          <p>
                          {this.state.blogs[2].Blog}
                          </p>
                          <p>
                            <a href="#">Read More...</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix visible-md-block" />
                </div>

                <div className="col-md-12 text-center animate-box">
                  <p>
                    <a className="btn btn-primary btn-outline btn-lg" href="/blogs">
                      See All Post <i className="icon-arrow-right22" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
