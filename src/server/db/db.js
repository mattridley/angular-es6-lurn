import Engine from "tingodb";

let db = Engine({nativeObjectID: true}).db('/tmp/myDb', {});

export let ToDoListCollection = db.collection('list');
export let ToDoItemCollection = db.collection('item');
export let UserCollection = db.collection('user');