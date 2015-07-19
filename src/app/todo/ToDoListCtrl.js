import ToDoList from "../../model/ToDoList";

/*@ngInject*/
export default class ToDoListCtrl {

    constructor(toDoLists) {
        this.toDoLists = toDoLists;
    }

};