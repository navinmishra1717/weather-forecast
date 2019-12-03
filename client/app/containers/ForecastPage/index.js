/** *********
 *
 * ForecastPage
 *
 *********** */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { MDBContainer } from 'mdbreact';
import moment from 'moment';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

//@material components
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Bar } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loading from '../../components/Loading';
import { makeSelectForecast, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 24,
  },
};

class ForecastPage extends React.Component {
  static propTypes = {
    loadForecastRequest: PropTypes.func.isRequired,
    forecastData: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };
  state = {
    celcius: false,
    fahrenheit: true,
    open: false,
    dataBar: {
      labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: [
            'rgba(98,  182, 239,0.4)',
            'rgba(98,  182, 239,0.4)',
            'rgba(98,  182, 239,0.4)',
            'rgba(98,  182, 239,0.4)',
            'rgba(98,  182, 239,0.4)',
            'rgba(98,  182, 239,0.4)',
            'rgba(98,  182, 239,0.4)',
            'rgba(98,  182, 239,0.4)',
          ],
          borderWidth: 2,
          borderColor: [
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
            'rgba(98,  182, 239, 1)',
          ],
        },
      ],
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)',
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  componentDidMount() {
    this.props.loadForecastRequest();
  }

  handleChecked = name => e => {
    e.persist();
    let databar = { ...this.state.dataBar };
    if (name === 'celcius' && !this.state.celcius) {
      databar.datasets[0].label = 'temperature in celcius';
      const celciusData = this.state.dataBar.datasets[0].data.map(each => {
        return (each - 32) * 0.55555;
      });
      databar.datasets[0].data = celciusData;
      this.setState({ dataBar: databar, fahrenheit: false });
    }
    if (name === 'fahrenheit' && !this.state.fahrenheit) {
      databar.datasets[0].label = 'temperature in fahrenheit';
      const fahrenheitData = this.state.dataBar.datasets[0].data.map(each => {
        return each * 1.8 + 32;
      });
      databar.datasets[0].data = fahrenheitData;
      this.setState({ dataBar: databar, celcius: false });
    }
    this.setState(state => ({
      [name]: !state[name],
    }));
  };

  kelvinToFahrenheit = kelvin => {
    return (kelvin - 273.15) * 1.8 + 32;
  };

  handleShowChart = day => {
    let temps = [];
    let labels = [];
    this.setState({ open: true });
    const databar = { ...this.state.dataBar };
    day.map(each => {
      labels.push(moment(each.dt_txt).format('YYYY-MM-DD HH:SS'));
      if (this.state.celcius) {
        temps.push(each.main.temp - 273.15);
      }
      if (this.state.fahrenheit) {
        const fahrenheitData = this.kelvinToFahrenheit(each.main.temp);
        temps.push(fahrenheitData);
      }
    });
    databar.labels = labels;
    databar.datasets[0].data = temps;
    databar.datasets[0].label = `temperature in ${
      this.state.celcius ? 'celcius' : 'fahrenheit'
    }`;
    this.setState({ dataBar: databar });
  };

  getAverageTemp = day => {
    let datas = [];
    day.length && day.map(each => datas.push(each.main.temp));
    if (datas.length) {
      const average = datas.reduce((a, b) => a + b, 0) / 8;
      if (this.state.celcius) {
        return (average - 273.15).toFixed(2);
      }
      if (this.state.fahrenheit) {
        return ((average - 273.15) * 1.8 + 32).toFixed(2);
      } else {
        return average.toFixed(2);
      }
    }
  };

  // getAverageHumidity = day => {
  //   let datas = [];
  //   day.length && day.map(each => datas.push(each.main.humidity));
  //   return datas.reduce((a, b) => a + b, 0) / 8;
  // };

  render() {
    const {
      forecastData: { list, city },
      classes,
      loading,
    } = this.props;

    let days = { day1: [], day2: [], day3: [], day4: [], day5: [] };
    for (let i = 0; i < list.length; i++) {
      if (i < 8) {
        days.day1.push(list[i]);
      }
      if (i > 7 && i < 16) {
        days.day2.push(list[i]);
      }
      if (i > 15 && i < 24) {
        days.day3.push(list[i]);
      }
      if (i > 23 && i < 32) {
        days.day4.push(list[i]);
      }
      if (i > 31 && i < 40) {
        days.day5.push(list[i]);
      }
    }
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            arrows: false,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return loading && loading == true ? (
      <Loading />
    ) : (
      <div>
        <Helmet>
          <title> Forecast Details </title>
        </Helmet>
        <div className="flex justify-between">
          <div className="w-1/2 center">
            <FormControlLabel
              control={
                <Radio
                  name="celcius"
                  checked={this.state.celcius}
                  onClick={this.handleChecked('celcius')}
                />
              }
              label="Celcius"
            />
          </div>
          <div className="w-1/2 center">
            <FormControlLabel
              control={
                <Radio
                  name="fahrenheit"
                  checked={this.state.fahrenheit}
                  onClick={this.handleChecked('fahrenheit')}
                />
              }
              label="Fahrenheit"
            />
          </div>
        </div>
        <div className="p-16">
          <Slider {...settings}>
            {Object.keys(days).map((each, index) => (
              <div key={index} onClick={() => this.handleShowChart(days[each])}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Avg Temp: {this.getAverageTemp(days[each])}
                      {this.state.fahrenheit
                        ? 'F'
                        : this.state.celcius
                        ? '°C'
                        : 'K'}
                      <br />
                      Date:{' '}
                      {moment(
                        days && days[each][0] && days[each][0].dt_txt,
                      ).format('ll')}
                      <br />
                      Weather:{' '}
                      {days &&
                        days[each][0] &&
                        days[each][0].weather[0].description}
                      <br />
                      {/* Avg Humidity: {this.getAverageHumidity(days[each])} */}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
        {this.state.open && (
          <MDBContainer>
            <Bar
              data={this.state.dataBar}
              options={this.state.barChartOptions}
            />
          </MDBContainer>
        )}
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'forecast', reducer });

const withSaga = injectSaga({ key: 'forecast', saga });

const mapStateToProps = createStructuredSelector({
  forecastData: makeSelectForecast(),
  loading: makeSelectLoading(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyle,
)(ForecastPage);
