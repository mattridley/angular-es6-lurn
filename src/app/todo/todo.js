import angular from "angular";

import routing from "./todo.routes"

export default angular.module('todo', [])
    .config(routing)
    .name;