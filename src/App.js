import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { stat } from 'fs';

class App extends Component {
state = {
  test : ["GBP", "USD", "SGD", "NZD","AUD"],
  countries: ["not", "fetching"],
  rates : ["not", "fetching"],
  values : ["not", "fetching"],
  display: "price per EUR"
}

doFetch = () => {
  console.log('Hitting refresh', this.state.searchBox);
  const dataOne = [];
  const url = "https://api.exchangeratesapi.io/latest";
  fetch(url)
    .then(response => response.json())
    .then(data => {
    console.log('receiving data', data);
    dataOne.push(data)

      // 404
      // if (!data.main) {
      //   this.setState({
      //     location: "Not found.",
      //     description: "",
      //     isLoading: false,
      //   });
      //   return;
      // }

      // Do state set for real data
      this.setState({
        base : dataOne[0]["base"],
        date : dataOne[0]["date"],
        rates : dataOne[0]["rates"],
        countries : Object.keys(dataOne[0]["rates"]),
        values : Object.values(dataOne[0]["rates"])
        
      });
      for (let i of Object.keys(dataOne[0]["rates"])){
        this.setState({
          id : i,
          // value : dataOne[0]["rates"][i]
        })
      }
    });
}
componentDidMount = (ev) => {
  this.doFetch();
}
myFunction = (country) =>{
  const addCountry = this.state.test.concat([]);
  if(addCountry.includes(country)){
    let n = addCountry.indexOf(country);
    console.log(n);
    addCountry.splice(n,1);
    
  }
  else{

    addCountry.push(country);
  }
  
  this.setState({
    test: addCountry
  })
}
displayClick = (rates,country) =>{
  let displayText = '1 EUR = '+ rates + country;
  this.setState({display: displayText})
}






render() {

  return (
    
    <div className="App">
      <header className="App-header">
        <div className="title">
          <h1>Currency Graph</h1>
        </div>
        <div className="nav">
        
        {
          this.state.countries.map((country, index) => (
            <div type="checkbox" key={index} onClick={() => this.myFunction(country, index)}>
               <label> {country} </label> 
            </div>
          ))
        }
        </div>
        <div className="graph-main">
        <div className="graph-box">
        {
          this.state.test.map((country, index) => (
            
            <div className="graph-bar" key={index} onClick={() => this.displayClick(this.state.rates[country],country)} style={{height: ((1/this.state.rates[country])*100)+"%"}}>
               {country}
            </div>
          ))
        }
        </div>
        </div>
        <div className="display-box">{this.state.display}</div>
      
      </header>
    </div>
  );
  }
}
export default App;
// <div> {
//   this.state.rates.map(function (rates) {
//      return  (<span key={rates.Id}>{rates.Description}</span>)
//   })
// }