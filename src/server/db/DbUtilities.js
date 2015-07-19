export let findOneById = (collection, id, callback) => {
    collection.findOne({_id: new ObjectId(id)}, (err, result) => {
        if(err) { console.error(err); return; }
        callback(result);
    });
};

export let findAll = (collection, callback) => {
    collection.find().toArray((err, result) => {
        if(err) { console.error(err); return; }
        callback(result);
    });
};