import moment from 'moment';

export function addMissingHour(from: string, to: string, originArray: any[], addtionObj: any): any[] {
  let fromMoment = moment(from).startOf('hour');
  let toMoment = moment(to).startOf('hour');
  // Number of hours in array
  let hours = toMoment.diff(fromMoment, 'hours');
  let currentHour = fromMoment;
  for (let i = 0; i <= hours; i++) {
    if (!originArray.find((o) => {
      return moment(o.date).format('YYYY-MM-DD HH') === currentHour.format('YYYY-MM-DD HH')
    })) {
      originArray.push({
        ...addtionObj,
        date: currentHour.toISOString(),
      });
    }
    currentHour = currentHour.add(1, 'hour');
  }
  return originArray;
}