export function getWeekStart() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

  // Calculate the number of days to subtract to get to the last Monday
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Calculate the timestamp of the last Monday
  const lastMondayTimestamp = today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000;

  // Create a new Date object with the timestamp of the last Monday
  const lastMonday = new Date(lastMondayTimestamp);

  // Format the date as YYYY-MM-DD
  const year = lastMonday.getFullYear();
  const month = String(lastMonday.getMonth() + 1).padStart(2, '0');
  const day = String(lastMonday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


export function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1 );
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(yesterday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDatesInRange(startDate: any, endDate: any) {
  const dates = [];
  let start = new Date(startDate);
  let end = new Date(endDate);

  while (start <= end) {
    const formattedDate = start.toISOString().split('T')[0];
    dates.push(formattedDate);
    start.setDate(start.getDate() + 1);
  }
  return dates;
}

export function extractMonthAndDay(dateString: string) {
  console.log(dateString)
  const dateParts = dateString.split('-');
  
  if (dateParts.length === 3) {
    const month = dateParts[1];
    const day = dateParts[2];
    return `${month}/${day}`;
  } else {
    // Handle invalid input
    return 'Invalid Date Format';
  }
}