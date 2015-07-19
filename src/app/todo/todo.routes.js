import ToDoListCtrl from "./ToDoListCtrl";
import ToDoList from "../../model/ToDoList";
import ToDoItem from "../../model/ToDoItem";

/*@ngInject*/
export default function routes($stateProvider) {
    $stateProvider
        .state('todo', {
            url: '/',
            templateUrl: "todo/page-list.html",
            controller: ToDoListCtrl,
            controllerAs: 'state',
            resolve: {
                toDoLists: () => [
                    new ToDoList(
                        "mridley",
                        "Matt Ridley",
                        [new ToDoItem("Finish angular-es6-lurn","","2015-07-19", false)]),
                    new ToDoList(
                        "katkins",
                        "Kirsty Atkins",
                        [new ToDoItem("Make Matt tea","","2015-07-19", false)])
                ]
            }
        });
};