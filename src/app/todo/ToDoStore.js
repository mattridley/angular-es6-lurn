import { baseUrl } from "../common/globals"

export default class ToDoStore {

    constructor($http) {
        this.http = $http;
    }

    getAllLists = () => this.http.get(baseUrl + "list/");

    getList = (id) => this.http.get(baseUrl + "list/" + id);

    getItem = (id) => this.http.get(baseUrl + "item/" + id);
}