import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      inProgress:false,
        arr:[],
      selectedColumn:-1,
      checkboxState:[]
    };
  }

  //https://sheets.googleapis.com/v4/spreadsheets/13SomCMp3Faw5avrStbAWG9iZrmjLaW3eEd6IAckwKR0/values/Sheet1!A1:D5?key=AIzaSyB-RuYqQbqVQMYATBd6eHR3tKXDybxQgFc

  //https://sheets.googleapis.com/v4/spreadsheets/13SomCMp3Faw5avrStbAWG9iZrmjLaW3eEd6IAckwKR0/values/Sheet1!A1:E?key=AIzaSyB-RuYqQbqVQMYATBd6eHR3tKXDybxQgFc
  getUrl = (e) =>{
    this.setState({input:e.target.value})
    
    if(e.target.value.length>=20){
      console.log(e.target.value)
      this.setState({inProgress:true})
      fetch("https://sheets.googleapis.com/v4/spreadsheets/"+e.target.value+"/values/Sheet1!A1:E?key=AIzaSyB-RuYqQbqVQMYATBd6eHR3tKXDybxQgFc").then(res => res.json()).then((data)=>{
         this.setState({inProgress:false})
         this.setState({arr:data.values})
        console.log(data)})
    }
  }
   setColumn(ind){
    if(this.state.selectedColumn===ind){
      this.setState({selectedColumn:-1,checkboxState:[]})
    }
    else{
      
      let checkboxState =[];
      checkboxState[ind]=true
      this.setState({selectedColumn:ind,checkboxState})

    }
    
  }
  renderCheckbox(rowData){
    return(
            <tr>
              {rowData&&rowData.map((d,i)=>{
                return <td style={{minWidth:"200px",backgroundColor:this.state.selectedColumn===i?"aliceblue":"transparent"}}><input type="checkbox" checked={this.state.checkboxState.length>=1?this.state.checkboxState[i]:false} onClick={this.setColumn.bind(this,i)}/> Column {i+1}</td>
              })}
            </tr>
          )
  }

   renderRow(rowData,ind){
   
   
 
      return(
            <tr>
           
              {rowData.map((d,i)=>{
                return <td style={{minWidth:"200px",backgroundColor:this.state.selectedColumn===i?"aliceblue":"transparent"}}>{d} </td>
              })}
            </tr>
          )
        
    }

  render() {
    return (
      <div>
      <p>Sheets URL : https://docs.google.com/spreadsheets/d/13SomCMp3Faw5avrStbAWG9iZrmjLaW3eEd6IAckwKR0/edit#gid=0</p>
      <p>Example Key : 13SomCMp3Faw5avrStbAWG9iZrmjLaW3eEd6IAckwKR0</p>
        <input type="text" style={{width:"100%"}} onChange={this.getUrl} placeholder="Enter your public Sheets Key"/>
        {this.state.inProgress ?<p>Loading...</p>:''}

         <div>
      
        <br/>
        <br/>
        <div className="ExcelTable2007">
        { this.state.arr&&this.renderCheckbox(this.state.arr[0])
        }
        {this.state.arr&&this.state.arr.map((rowData,ind)=>{
          return this.renderRow(this.state.arr[ind],ind)
        })}
        </div>
        <br/>
       
        

      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
