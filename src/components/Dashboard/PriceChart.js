import React from 'react';
import highChartsConfig from './HighchartsConfig';
import { Tile } from '../../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts';
import HighChartThemes from './HighChartThemes';

ReactHighcharts.Highcharts.setOptions(HighChartThemes);

export default function () {
  return (
    <AppContext.Consumer>
      {({}) => (
        <Tile>
          <ReactHighcharts config={highChartsConfig()} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
