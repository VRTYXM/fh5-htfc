import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4444';

const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

export default instance;
