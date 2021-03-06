import React from 'react';
import {Link} from 'react-router';
import SingleScheduleViewStore from '../stores/SingleScheduleViewStore';
import SingleScheduleViewActions from '../actions/SingleScheduleViewActions';
import NavbarStore from '../stores/NavbarStore';
import classNames from 'classnames';
var wowClasses = require('./../../utility/WowClasses');
import _ from 'underscore';

class SingleScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = SingleScheduleViewStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SingleScheduleViewStore.listen(this.onChange);
    // if($.ajax({method: 'GET', url: '/auth/role'}).then((data) => {
    //   if(data.role && data.role != '') {
        SingleScheduleViewActions.loadSingleSchedule(this.props.schedule);
    //   }
    // }));
  }

  componentWillUnmount() {
    SingleScheduleViewStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  classColour(character) {
    let currentClass = _.findWhere(wowClasses, {id: parseInt(character.class)}).name;
    var arr = currentClass.split(" ");

    var ret = '';
    for (var i = 0; i < arr.length; ++i) {
      ret += arr[i].toLowerCase();
      ret += '-';
    }

    ret += 'color';
    return classNames(ret, { 'col-sm-1' : true});;
  }

  render() {
    var scheduleBossRows, scheduleName, tankRows = [], healerRows = [], dpsRows = [], standbyRows = [];
    if(this.state.schedule != null) {
      scheduleName = (
        <h1>{this.state.schedule.name}</h1>
      );

      if(_.filter(this.state.schedule.schedule_bosses, function(boss) {
        return boss.published;
      }).length == 0) {
        return (
          <div className='row'>
            <div className='row'>
              <div className='col-xs-10 col-xs-offset-1'>
                <div className='row text-center'>
                  {scheduleName}
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                    <div className='text-center'>
                      <h3><b>No bosses have been published for this schedule</b></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      scheduleBossRows = this.state.schedule.schedule_bosses.filter(function(schedule_boss) {
        return schedule_boss.published;
               //Put in the 20 character requirement for bosses to show
      }).map(function(schedule_boss, index) {
        var tankCount = 0;
        var healerCount = 0;
        var dpsCount = 0;
        tankRows = [];
        healerRows = [];
        dpsRows = [];
        schedule_boss.characters.map(function(character) {

          if(character.main_role == "Tank") {
            tankCount++;
            var classCSS = this.classColour(character);
            tankRows.push(
              <tr key={character.id}>
                <td className={classCSS} />
                <td className='col-sm-11 vert-align' >
                  {character.name}
                </td>
              </tr>
            );
          } else if(character.main_role == "Healer") {
            healerCount++;
            var classCSS = this.classColour(character);
            healerRows.push(
              <tr key={character.id}>
                <td className={classCSS} />
                <td className='col-sm-11 vert-align' >
                  {character.name}
                </td>
              </tr>
            );
          } else if(character.main_role == "DPS") {
            dpsCount++;
            var classCSS = this.classColour(character);
            dpsRows.push(
              <tr key={character.id}>
                <td className={classCSS} />
                <td className='col-sm-11 vert-align' >
                  {character.name}
                </td>
              </tr>
            );
          }
        }, this);

        var standbyCount = 0;
        standbyRows = [];
        var stbc = [];
        for(var i = 0; i < this.state.schedule.roster.characters.length; ++i) {
          if(!_.findWhere(schedule_boss.characters, {id: this.state.schedule.roster.characters[i].id})) {
            stbc.push(this.state.schedule.roster.characters[i]);
          }
        }

        stbc.map(function(character) {
          standbyCount++;
          var classCSS = this.classColour(character);
          standbyRows.push(
            <tr key={character.id}>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
        }, this);

        return (
          <div key={schedule_boss.id} className='row'>
            <div className='row schedule-boss-header'>
              <h3><b>{schedule_boss.boss.name} ({schedule_boss.raid.name})</b></h3>
            </div>
            <div className='row'>
              <div className='col-xs-10 col-xs-offset-1'>
                <table className='table'>
                  <tbody>
                    <tr>
                      <td className='col-md-4'><strong>Note</strong></td>
                      <td className='col-md-2'><strong>Tanks</strong> <strong>({tankCount})</strong></td>
                      <td className='col-md-2'><strong>Healers</strong> <strong>({healerCount})</strong></td>
                      <td className='col-md-2'><strong>DPS</strong> <strong>({dpsCount})</strong></td>
                      <td className='col-md-2'><strong>Standby</strong> <strong>({standbyCount})</strong></td>
                    </tr>
                    <tr>
                      <td className='col-md-1'>{schedule_boss.boss.public_note}</td>
                      <td className='col-md-2'>
                        <table className='table'>
                          <tbody>
                            {tankRows}
                          </tbody>
                        </table>
                      </td>
                      <td className='col-md-2'>
                        <table className='table'>
                          <tbody>
                            {healerRows}
                          </tbody>
                        </table>
                      </td>
                      <td className='col-md-2'>
                        <table className='table'>
                          <tbody>
                            {dpsRows}
                          </tbody>
                        </table>
                      </td>
                      <td className='col-md-2'>
                        <table className='table'>
                          <tbody>
                            {standbyRows}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }, this);
    }

    return (
      <div className='row'>
        <div className='row'>
          <div className='col-xs-10 col-xs-offset-1'>
            <div className='row text-center'>
              {scheduleName}
            </div>
            <div className='row'>
              {scheduleBossRows}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleScheduleView;
