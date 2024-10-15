// utils.js
export const formatDate = (date) => {
    const formattedDate = new Date(date);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return formattedDate.toLocaleDateString('en-US', options);
  };
  
  export function convertFractionalTime(fraction) {
    const hours = Math.floor(fraction); // Extract integer part as hours
    const totalMinutes = (fraction - hours) * 60; // Convert fractional part to total minutes
    const minutes = Math.round(totalMinutes); // Round minutes to the nearest whole number
    return `${hours}hr ${minutes}min`;
}


