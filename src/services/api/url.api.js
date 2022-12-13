import axios from "axios";

const API_URL = "http://localhost:8080/api/short/url";

export const api = {
    create(originURL, shortId) {
        return axios.post(API_URL, {url: originURL, id: shortId})
    },
	getOne(id) {
		return axios.get(API_URL + "/" + id);
	},
	getAll() {
		return axios.get(API_URL);
	},
    getQuery(query) { return axios.get(API_URL + '/findby' + query) },
	getAllByIndustry(industryId) { return axios.get(API_URL + '/industry/' + industryId) },
};
