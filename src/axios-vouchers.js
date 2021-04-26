import axios from 'axios';

const instance = axios.create({
	baseUrl: 'https://staging-v2.inplayer.com/',
});

export default instance;
