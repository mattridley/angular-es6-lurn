import { ToDoListCollection as collection } from "./db";
import { findAll, findOneById } from "./DbUtilities";

export default class ToDoListStore {
    findById = (id, callback) => findOneById(collection, id, callback);
    getAll = (callback) => findAll(collection, callback);
}