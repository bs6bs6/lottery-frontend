import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const fetchPrizes = async (activityId) => {
  const response = await axios.get(`${BASE_URL}/api/prizes?activityId=${activityId}`);
  return response.data;
};

const startLottery = async (uId, activityId) => {
  const response = await axios.post(`api/doDraw`,  {uId, activityId} );
  return response.data.prizeDTO;
};

export { fetchPrizes, startLottery };
