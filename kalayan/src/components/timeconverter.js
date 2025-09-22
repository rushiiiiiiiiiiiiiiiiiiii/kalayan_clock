
export default function converttime(num) {
  const time = localStorage.getItem("localtime")

  const timestamp = parseInt(time) * 60 * 1000
  const now = new Date();
  const now_loc = new Date(now - timestamp);
  const hours_loc = now_loc.getHours();
  const minutes_loc = now_loc.getMinutes();
  const seconds_loc = now_loc.getSeconds();
  const decisec = Math.round((now_loc.getSeconds() * 10 + now_loc.getMilliseconds() / 100) / 4)
  let vipals = decisec % 60;
  const totalMinutes = parseInt(hours_loc) * 60 + parseInt(minutes_loc);
  const currentTimeInMinutes = totalMinutes
  const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM

  let adjustedMinutes;
  if (minutesSince6AM < 0) {
    // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
    adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
  } else {
    adjustedMinutes = minutesSince6AM;
  }
  //const  = adjustedMinutes / 24; // 1 ghatika = 24 minutes
  const ghatika = Math.floor(adjustedMinutes / 24); // 1 ghatika = 24 minutes

  let ghatikapart = adjustedMinutes % 24;
  if (isOdd(hours_loc)) { ghatikapart = (adjustedMinutes + 60) % 24; } else { ghatikapart = adjustedMinutes % 24; }
  let pal_basic = Math.floor(ghatikapart / 2) * 5;
  // pal_basic = ghatikapart*2.5
  //const ghatikaPart = Math.floor(ghatika); // Whole ghatikas
  //const pal =  (ghatika - ghatikaPart) * 60; // Remaining part in pal (60 pal = 1 ghatika)
  const pal_in_two_min = Math.floor((parseInt(seconds_loc) + 60 * isOdd(minutes_loc)) / 24);
  const pal = pal_basic + pal_in_two_min;

  if (isOdd(minutes_loc)) { vipals = ((decisec + 31) % 60); } else { vipals = (decisec % 60); }
  const ghatikaCount = ghatika;
  let palCount = pal; //Math.floor((totalSeconds % 1440) / 24); // 1 Pal = 24 seconds (0.4 minutes)
  let vipalCount = vipals; // 1 Vipal = 0.4 seconds

  return [ghatika, pal, vipals];
}

function isOdd(num) { return num % 2; } 