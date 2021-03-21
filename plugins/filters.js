import Vue from 'vue';
import moment from 'moment';

Vue.filter('titleShort', function (str, length = 1000) {
  if (typeof str === 'string') {
    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
    return truncate(str, length, '...');
  } else {
    return
  }
});

Vue.filter('datetime', function (value, format = '') {
  return moment(value).format(format);
});

Vue.filter('x2datetime', function (value, format = '') {
  return moment.unix(value).format(format);
});