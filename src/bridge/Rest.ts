import axios, { AxiosInstance } from 'axios';
import { Agent } from 'https';
import { Routes } from '../util/Routes';

export function getRest(ip: string, applicationKey: string): AxiosInstance {
	return axios.create({
		baseURL: Routes.base(ip),
		headers: {
			'hue-application-key': applicationKey,
		},
		httpsAgent: new Agent({ rejectUnauthorized: false }),
	});
}
