import React from 'react';
import {Link} from 'react-router';
import SingleScheduleViewStore from '../stores/SingleScheduleViewStore';
import SingleScheduleViewActions from '../actions/SingleScheduleViewActions';
import NavbarStore from '../stores/NavbarStore';

class SingleScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = SingleScheduleViewStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SingleScheduleViewStore.listen(this.onChange);
    SingleScheduleViewActions.loadSingleSchedule(this.props.schedule);
    SingleScheduleViewActions.loadUserCharacters();
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
      ret += '-'
    }

    ret += 'color';
    return classNames(ret, { 'col-sm-1' : true});;
  }

  render() {
    var scheduleBossRows, tankRows, healerRows, dpsRows;
    scheduleBossRows = this.state.schedule.schedule_bosses.map(function(schedule_boss, index) {
      var tankCount = 0;
      tankRows = schedule_boss.characters.map(function(character) {
        if(character.main_role == "Tank") {
          tankCount++;
          var classCSS = this.classColour(character);
          return (
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
        }
      });

      var healerCount = 0;
      healerRows = schedule_boss.characters.map(function(character) {
        if(character.main_role == "Healer") {
          healerCount++;
          var classCSS = this.classColour(character);
          return (
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
        }
      });

      dpsCount = 0;
      dpsRows = schedule_boss.characters.map(function(character) {
        if(character.main_role == "DPS") {
          dpsCount++;
          var classCSS = this.classColour(character);
          return (
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
        }
      });

      return (
        <div className='row'>
          <table className='table'>
            <tbody>
              <tr>
                <td className='col-md-1'><strong>Raid</strong></td>
                <td className='col-md-1'><strong>Boss</strong></td>
                <td className='col-md-2'><strong>Tanks</strong> ({tankCount})</td>
                <td className='col-md-3'><strong>Healers</strong> ({healerCount})</td>
                <td className='col-md-3'><strong>DPS</strong> ({dpsCount})</td>
              </tr>
              <tr>
                <td className='col-md-1'>{schedule_boss.raid.name}</td>
                <td className='col-md-1'>{schedule_boss.boss.name}</td>
                <td className='col-md-3'>
                <table className='table'>
                  <tbody>
                    {tankRows}
                  </tbody>
                </table></td>
                <td className='col-md-3'>
                  <table className='table'>
                    <tbody>
                      {healerRows}
                    </tbody>
                  </table>
                </td>
                <td className='col-md-3'>
                  <table className='table'>
                    <tbody>
                      {dpsRows}
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }, this);

    return (
      <div>
        {scheduleBossRows}
      </div>
    );
  }
}

export default SingleScheduleView;
