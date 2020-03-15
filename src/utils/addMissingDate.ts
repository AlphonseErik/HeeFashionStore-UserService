import moment from 'moment';

export function addMissingDate(from: string, to: string, originArray: any[], addtionObj: any): any[] {
  let fromMoment = moment(from).startOf('day');
  let toMoment = moment(to).startOf('day');
  // Number of days in array
  let days = toMoment.diff(fromMoment, 'days');
  let currentDate = fromMoment;
  for (let i = 0; i <= days; i++) {
    if (!originArray.find((o) => moment(o.date).format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD'))) {
      originArray.push({
        ...addtionObj,
        date: currentDate.toISOString(),
      });
    }
    currentDate = currentDate.add(1, 'day');
  }
  return originArray;
}