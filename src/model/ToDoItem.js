export default class ToDoItem {

    summary;
    description;
    dueDate;
    completed;

    constructor(summary, description, dueDate, completed) {
        this.summary = summary;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}