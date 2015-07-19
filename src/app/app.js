"use strict";
import angular from 'angular';
import uirouter from 'angular-ui-router';

import Todo from "./todo/todo";

import routing from './app.config';

let app = angular.module('todoApp', [
    uirouter,
    Todo
])
    .config(routing);