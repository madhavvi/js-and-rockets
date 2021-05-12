// Please implement your solution in this file
// function to return boolean if customer has a Nasa
const isNasaCustomer = obj => obj.customers.some(customer => (customer.includes('NASA')));

export const prepareData = (payload) => (
  payload.filter(launch => launch.launch_year === '2018')
  // in inverse chronological order sorting
  .sort((value1, value2) => {
    const date1 = new Date(value1.launch_date_utc);
    const date2 = new Date(value2.launch_date_utc);
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
  })
  //  reduce payloads which do not have Nasa as a customer 
  .reduce((payloadObj, launch) => {
    const payloads = launch.rocket.second_stage.payloads;
    const hasNasaPayload = payloads.some(isNasaCustomer);
    if (hasNasaPayload) {
      payloadObj.push({
        flight_number: launch.flight_number,
        mission_name: launch.mission_name,
        payloads_count: payloads.length,
      });
    }
    return payloadObj;
  }, [])
  // sorting for payload count
  .sort((value1, value2) => {
    if (value1.payloads_count > value2.payloads_count) return -1;
    if (value1.payloads_count < value2.payloads_count) return 1;
    return 0;
  })
);

// this is to render output
export const renderData = (data) => {
  const outputJSON = JSON.stringify(data, null, 2);
  document.getElementById('out').innerHTML = outputJSON;
}
