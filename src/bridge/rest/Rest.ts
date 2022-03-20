import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Collection from '@discordjs/collection';
import { RouteRateLimit } from './RouteRateLimit';
import { Routes } from '../../util/Routes';
import { Agent } from 'https';

const CA =
	'-----BEGIN CERTIFICATE-----\n' +
	'MIICMjCCAdigAwIBAgIUO7FSLbaxikuXAljzVaurLXWmFw4wCgYIKoZIzj0EAwIw\n' +
	'OTELMAkGA1UEBhMCTkwxFDASBgNVBAoMC1BoaWxpcHMgSHVlMRQwEgYDVQQDDAty\n' +
	'b290LWJyaWRnZTAiGA8yMDE3MDEwMTAwMDAwMFoYDzIwMzgwMTE5MDMxNDA3WjA5\n' +
	'MQswCQYDVQQGEwJOTDEUMBIGA1UECgwLUGhpbGlwcyBIdWUxFDASBgNVBAMMC3Jv\n' +
	'b3QtYnJpZGdlMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjNw2tx2AplOf9x86\n' +
	'aTdvEcL1FU65QDxziKvBpW9XXSIcibAeQiKxegpq8Exbr9v6LBnYbna2VcaK0G22\n' +
	'jOKkTqOBuTCBtjAPBgNVHRMBAf8EBTADAQH/MA4GA1UdDwEB/wQEAwIBhjAdBgNV\n' +
	'HQ4EFgQUZ2ONTFrDT6o8ItRnKfqWKnHFGmQwdAYDVR0jBG0wa4AUZ2ONTFrDT6o8\n' +
	'ItRnKfqWKnHFGmShPaQ7MDkxCzAJBgNVBAYTAk5MMRQwEgYDVQQKDAtQaGlsaXBz\n' +
	'IEh1ZTEUMBIGA1UEAwwLcm9vdC1icmlkZ2WCFDuxUi22sYpLlwJY81Wrqy11phcO\n' +
	'MAoGCCqGSM49BAMCA0gAMEUCIEBYYEOsa07TH7E5MJnGw557lVkORgit2Rm1h3B2\n' +
	'sFgDAiEA1Fj/C3AN5psFMjo0//mrQebo0eKd3aWRx+pQY08mk48=\n' +
	'-----END CERTIFICATE-----';

export class Rest {
	public handlers = new Collection<string, RouteRateLimit>();
	public manager: AxiosInstance;

	constructor(ip: string, applicationKey: string) {
		const manager = axios.create({
			baseURL: Routes.base(ip),
			headers: {
				'hue-application-key': applicationKey,
			},
			httpsAgent: new Agent({
				ca: CA,
				checkServerIdentity: () => undefined,
			}),
		});

		manager.interceptors.request.use(this.handleRequest.bind(this));
		manager.interceptors.response.use(this.handleResponse.bind(this));

		this.manager = manager;
	}

	public static getRoute(url: string) {
		const route = url.split('/');
		return route.slice(0, 3).join('/');
	}

	public async get(url: string, data?: Record<string, any>) {
		return await this.request('get', url, data);
	}

	public async put(url: string, data?: Record<string, any>) {
		return await this.request('put', url, data);
	}

	public async post(url: string, data?: Record<string, any>) {
		return await this.request('post', url, data);
	}

	public async delete(url: string, data?: Record<string, any>) {
		return await this.request('delete', url, data);
	}

	public handleRequest(request: AxiosRequestConfig) {
		const route = Rest.getRoute(request.url);
		const handler = this.handlers.ensure(route, () => new RouteRateLimit(route));
		return new Promise((resolve) => {
			handler.queueRequest(() => resolve(request));
		});
	}

	public handleResponse(response: AxiosResponse) {
		const route = Rest.getRoute(response.config.url);
		this.handlers.get(route).next();
		return response;
	}

	private async request(method: 'get' | 'put' | 'post' | 'delete', url: string, data?: Record<string, any>) {
		return await this.manager
			.request({
				method,
				url,
				data,
			})
			.catch((error) => {
				if (error.response?.data?.errors && error.response.data.errors[0]) {
					throw new Error(error.response.data.errors[0].description);
				} else throw error;
			});
	}
}
