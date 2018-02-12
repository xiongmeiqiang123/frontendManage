
var MongoClient = require('mongodb').MongoClient
  ,assert = require('assert');

class Db extends Promise{
    constructor(url) {
        super((resolve, reject) => {
           resolve(0)
        });
        this.url = url;
    }

    connect(dataBaseName='mqsas'){
        return new Promise((resolve, reject)=>{
            MongoClient.connect(this.url + dataBaseName, (err, db)=>{
        	  assert.equal(null, err);
        	  console.log("Connected correctly to server");
              resolve(db)
        	});
        })
    }
    close(onFulfilled, onRejected) {
        // before
        const returnValue = super.then(onFulfilled, onRejected);
        // after
        return returnValue;
    }
}


let db = new Db('mongodb://localhost:27017/')
db.connect().then((value) => {
    console.log(value);
    console.log(this, 'test');
})
