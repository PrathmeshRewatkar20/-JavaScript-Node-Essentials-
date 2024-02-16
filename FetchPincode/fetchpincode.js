import fetch from 'node-fetch'; 
import querystring from 'querystring'; 

// API source - https://data.gov.in/resource/all-india-pincode-directory
const baseUrl = 'https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6';

const createRequestUrl = (offset) => {
    const parameters = {
        'api-key': '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
        format: 'json',
        limit: 10,
        offset,
    };
    return baseUrl + '?' + querystring.stringify(parameters);
};

const fetchData = async (offset) => {
    const response = await fetch(createRequestUrl(offset));
    const { total, count, limit, offset: responseOffset, records } = await response.json();
    console.log(`Data for offset ${responseOffset} received`);
    console.log('total', total);
    console.log('count', count);
    console.log('limit', limit);
    console.log('offset', responseOffset);
    return records;
};


const offsets = [31, 51, 61];

const fetchDataForOffsets = async () => {
    const promises = offsets.map(offset => fetchData(offset));
    const dataArray = await Promise.all(promises);
   
    const combinedData = dataArray.flat();
    return combinedData;
};

fetchDataForOffsets()
    .then(combinedData => {
        console.log('Combined Data:');
        console.log(combinedData);
    })
    .catch(error => {
        console.error('Error fetching pincode data:', error);
    });
