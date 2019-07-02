import React from 'react';
import axios from "axios";
import './currency.css'
import TextField from '@material-ui/core/TextField';

class Currancy extends React.Component {
    constructor(props){
        super(props);
      this.state = { 
        value:undefined,
        num:0,
        total:"0"
      }
     }
     yourdata(event){
        this.setState({[event.target.name]: event.target.value });
     }
      Click(e){
        e.preventDefault();
         const that = this
         const value = this.state.value
         const num = this.state.num
         axios.get(`http://www.apilayer.net/api/live?access_key=c7c6be7d8dfd621f926b81c14f7473c7`)
         .then(res => {
        const cryptos = res.data.quotes
        console.log(cryptos)
        for (var key in cryptos){
            var total1 = 0
            if (key.includes(value)){
            total1 = cryptos[key] * num
            this.setState({total : total1 
 
            }); 
            }
        }
        // this.setState({cryptos : cryptos});
         })
     }


// Click(){

//          axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR`)
//          .then(res => {
//         const cryptos = res.data 
//         console.log(cryptos)
//          })
//      }
  
	render() {
        let value = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP",
            "CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR"
            ,"ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KHW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR"
            ,"MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK",'SGD',"SHP","SLL","SOS","SRD","STD","SVC","SYP",'SZL',"THB",
            "TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH",'UGX',"USD",'UYU',"UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"]
        const elm = value.map((option) => {
			return <option key={option}>{option}</option>;
		});
		return (
            <div className="maindiv">
                <form  className="currency">
                    <div style={{float:"left",marginTop: '68px'}}>
                    <div style={{marginTop:'100px',marginLeft:'27%'}}>
                        <input style ={{width: '119%', height: '40px'}} type = "number" placeholder="amount" name = "num" onChange ={this.yourdata.bind(this)} />
                   <br/>
                   <br/>
                        {/* <span style={{fontSize:"20px",margin:'10px'}}></span>  */}
                        <select style ={{width: '119%', height: '40px'}} name="value" onChange ={this.yourdata.bind(this)}>
                            {elm}
                        </select> 
                        <br/>
                        <br/>
                        <br/>
                        
                        
                        

                       
                    </div>
                    <button style={{marginLeft: "100%",width:'179px',height:'45px'}}onClick={this.Click.bind(this)} >CONVERT</button>       

                    </div>
                    <div>
                    <h1 style={{
    color: "rgb(0, 153, 204)",
    float: "right",
    fontSize: "35px",
    width: "144px",
    height: "40px",
    marginTop:"36.8%",
    marginRight:"13%",
    background: "white"}}>{Math.round(this.state.total*Math.pow(10, 2 || 0)/Math.pow(10, 2 || 0))}</h1> 
                    </div>
                    <div>
                        <h1>
                            convert to USD
                        </h1>
                    </div>
                </form>
            </div>

		);
	}
}
//this is a test comment
export default Currancy;







  
