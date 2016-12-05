import moment from 'moment';

export default function getTime() {
  return moment().format('MMMM Do YYYY, h:mm:ss a')
}
