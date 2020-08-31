export function formatDate(date) {
  let year = date.getFullYear();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let hour = '' + date.getHours();
  let minute = '' + date.getMinutes();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  if (hour.length < 2) {
    hour = '0' + hour;
  }
  if (minute.length < 2) {
    minute = '0' + minute;
  }

  return `${ day }/${ month }/${ year } ${ hour }:${ minute }`;
}
