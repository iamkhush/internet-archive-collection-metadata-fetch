import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar/lib/Calendar';
import Picker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
        startFrom: moment(),
        endDate: moment(),
        collectionName: "widecrawl",
        data: {},
        fetching: false,
    };
    this.fetchDataHandler = this.fetchDataHandler.bind(this);
    this.startFromSelect = this.startFromSelect.bind(this);
    this.endAtSelect = this.endAtSelect.bind(this);
    this.collectionSelect = this.collectionSelect.bind(this);
  }

  collectionSelect(event) {
    this.setState({ collectionName: event.target.value});
  }

  fetchDataHandler() {
    this.setState({fetching: true});
    var i = 1;
    var initDate = this.state.startFrom;
    var endDate = this.state.endDate;
    var fetchUrl = '/fetch/?collection=' + this.state.collectionName;
    fetchUrl = fetchUrl + '&inittime=' + initDate.format('YYYY-MM-DD');
    fetchUrl = fetchUrl + '&endtime=' + endDate.format('YYYY-MM-DD');
    axios.get(fetchUrl, {withCredentials: true}).then(function(response) {
      console.log(response);
      this.setState({data: response.data});
      this.setState({fetching: false});
    }.bind(this))
  }

  startFromSelect(date) {
    this.setState({ startFrom: date});
  }

  endAtSelect(date) {
    this.setState({ endDate: date}); 
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Collection Data Fetcher App</h2>
        </div>
        <div className="container">
          <div className="form-horizontal">
            <div className="form-group">
              <label htmlFor="collections" className="col-sm-4 control-label">Select Collection</label>
              <div className="col-sm-7">
                <select id="collections" value={this.state.collectionName} className="form-control" onChange={this.collectionSelect}>
                <option value="widecrawl">widecrawl</option>
                <option value="customcrawlservices">customcrawlservices</option>
                <option value="focused_crawls">focused_crawls</option>
                <option value="top_news">top_news</option>
                <option value="newscrawl">newscrawl</option>
                <option value="top_domains">top_domains</option>
                <option value="youtubecrawl">youtubecrawl</option>
                <option value="survey_crawl">survey_crawl</option>
                <option value="wikipediaoutlinks00004">wikipediaoutlinks00004</option>
                <option value="archiveitdigitalcollection">archiveitdigitalcollection</option>
                <option value="NO404-GDELT">NO404-GDELT</option>
                <option value="NO404-WP">NO404-WP</option>
                <option value="NO404-WKP">NO404-WKP</option>
                <option value="liveweb">liveweb</option>
                <option value="archiveteam">archiveteam</option>
                <option value="archiveteam_newssites">archiveteam_newssites</option>
                <option value="archiveteam_googlecode">archiveteam_googlecode</option>
                <option value="archiveteam_wiki">archiveteam_wiki</option>
                <option value="archiveteam_gamefront">archiveteam_gamefront</option>
                <option value="archiveteam_panoramio">archiveteam_panoramio</option>
                <option value="archiveteam_orkut">archiveteam_orkut</option>
                <option value="archiveteam_zippcast">archiveteam_zippcast</option>
                <option value="archiveteam_screenr">archiveteam_screenr</option>
                <option value="archiveteam_portalgraphics">archiveteam_portalgraphics</option>
                <option value="archiveteam_myvip">archiveteam_myvip</option>
                <option value="archiveteam_nujij">archiveteam_nujij</option>
                <option value="archiveteam_arto">archiveteam_arto</option>
                <option value="archiveteam_coursera">archiveteam_coursera</option>
                <option value="archivebot">archivebot</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="startFrom" className="col-sm-4 control-label">Start </label>
              <div className="col-sm-3">
                <div id="d"></div>
                <Picker 
                  calendar={<Calendar onSelect={this.startFromSelect} />}
                  getCalendarContainer={()=>{return document.getElementById('d')}}>
                  {
                    ({value})=>{
                      return (
                        <input name="startfrom" className="form-control" 
                        value={value && value.format('YYYY-MM-DD')} />
                      )
                    }
                  }
                </Picker>
              </div>
            </div> 
            <div className="form-group">
              <label htmlFor="endAt" className="col-sm-4 control-label">End</label>
              <div className="col-sm-3">
                <div id="d"></div>
                <Picker 
                  calendar={<Calendar onSelect={this.endAtSelect} />}
                  getCalendarContainer={()=>{return document.getElementById('d')}}>
                  {
                    ({value})=>{
                      return (
                        <input name="startfrom" className="form-control" 
                        value={value && value.format('YYYY-MM-DD')} />
                      )
                    }
                  }
                </Picker>
              </div>
            </div> 
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-6">
                <button type="submit" className={this.state.fetching ? 'btn btn-primary disabled': 'btn btn-primary'} onClick={this.fetchDataHandler}>
                {this.state.fetching? 'Now' :'Start'} Fetching <i className={this.state.fetching ? 'fa fa-spinner fa-spin': 'fa fa-spinner hide'} aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center">Date</th>
                <th className="text-center">Image Count</th>
                <th className="text-center">Size in KBs</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(this.state.data).map(function(item){
                  return <tr>
                    <td>{item}</td><td>{this.state.data[item][0]}</td><td>{this.state.data[item][1]}</td></tr>
                }.bind(this))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
