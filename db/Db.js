var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

class Db {
    constructor(url){
        this.url = url
        this.db = null;
    }

    async connect(dataBaseName){
        if(!dataBaseName) {
            return;
        }
        let db = await new Promise((resolve, reject)=> {
            MongoClient.connect(this.url + dataBaseName, (err, db) =>{
        	  assert.equal(null, err);
        	  console.log("Connected correctly to server");
              this.db = db;
              resolve(db)
        	  // action(db, callback);
        	});
        });
        this.db = db;
        return this;

    }

    async close(){
        if(!this.db) {
            return this;
        }
        await this.db.close();
        this.db = null;
        return this;
    }

    async update(colName, query, data) {
        if(!colName || !query || !data) {
            console.log('update 参数错误');
            return;
        }
        if(!this.db) {
            await this.connect()
        }
        await new Promise((resolve, reject)=> {
            var collection = this.db.collection(colName);
            // Insert some documents
            collection.updateOne(query, data, (err, result)=> {
              assert.equal(err, null);
              console.log("Updated the document with the field");
              resolve(result);
            });
        });

        this.close()
        return this;
    }

    async delete(colName, query) {

        if(!query || !colName) {
            console.log('delete ： lack of params');
            return this;
        }
        if(!this.db) {
            await this.connect()
        }

        var collection = this.db.collection(colName);
        await new Promise((resolve, reject)=> {
            collection.deleteOne(query, (err, result) =>{
              assert.equal(err, null);
              // assert.equal(1, result.result.n);
              console.log("Removed the document with the field ");
              resolve(result)
            });
        });
        this.close()
        return this;
    }

    async insert(colName, ...data){
        if(!colName || !data) {
            console.log('delete ： lack of params');
            return this;
        }
        let db = await this.connect()
        console.log(db);
        await new Promise((resolve, reject) =>{
            var collection = this.db.collection(colName);
            // Insert some documents
            collection.insertMany(data, (err, result) =>{
              console.log("Inserted 3 documents into the document collection");
              resolve(result);
            });
        });
        this.close()
        return this;
    }

    async find(colName, query, set){
        if(!query || !colName) {
            return;
        }
        if(!this.db) {
            await this.connect()
        }

        let data = await new Promise((resolve, reject) =>{
            var collection = this.db.collection(colName);
      	     // Find some documents
          	  collection.find(query, set).toArray(function(err, docs) {
          	    assert.equal(err, null);
          	    console.log("Found the following records");
                resolve(docs)
          	  });
        });

         this.db.close();
         return data
    }
}
