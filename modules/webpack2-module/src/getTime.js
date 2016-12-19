import moment from 'moment';

// this will make webpack chunk all the locales in separate file
const locale = 'en-gb';

System.import('moment/locale/' + locale).then((lobj) => {
  console.log(lobj);
});

export default function getTime() {
  return moment().format('MMMM Do YYYY, h:mm:ss a')
}
