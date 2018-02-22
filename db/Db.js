var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

class Db {
    constructor(url='mongodb://localhost:27017/', dataBaseName){
        this.dataBaseName = dataBaseName;
        this.url = url
        this.db = null;
    }

    async connect(dataBaseName = this.dataBaseName){
        if(!dataBaseName) {
            return;
        }
        this.dataBaseName = dataBaseName;
        let db
        try {
            db = await new Promise((resolve, reject)=> {
                MongoClient.connect(this.url + dataBaseName, (err, db) =>{
            	  assert.equal(null, err);
            	  console.log("Connected correctly to server");
                  this.db = db;
                  resolve(db)
            	  // action(db, callback);
            	});
            });
        } catch (e) {
            this.close()
        } finally {

        }

        this.db = db;
        return this;

    }

    async close(){
        if(!this.db) {
            return this;
        }
        await this.db.close();
        console.log('Db closed!');
        this.db = null;
        return this;
    }

    async update(colName, query, ...data) {
        if(!colName || !query || !data.length) {
            console.log('Db: update --- lack of params');
            return;
        }
        if(!this.db) {
            await this.connect()
        }
        await new Promise((resolve, reject)=> {
            var collection = this.db.collection(colName);
            // Insert some documents
            collection.updateMany(query, data, (err, result)=> {
                this.close()
              assert.equal(err, null);
              console.log(`Updated the ${colName} with the ${data}`);
              resolve(result);
            });
        });

        return this;
    }

    async delete(colName, query) {

        if(!query || !colName) {
            console.log('Db: delete -- lack of params');
            return this;
        }
        if(!this.db) {
            await this.connect()
        }

        var collection = this.db.collection(colName);
        await new Promise((resolve, reject)=> {
            collection.deleteOne(query, (err, result) =>{
                this.close()
              assert.equal(err, null);
              // assert.equal(1, result.result.n);
              console.log(`Db: delete  ${result.result.n} from the ${colName} collection`);
              resolve(result)
            });
        });

        return this;
    }

    async insert(colName, ...data){
        if(!colName || !data.length) {
            console.log('Db: insert --- lack of params');
            return this;
        }
        let db = await this.connect()
        try {
            await new Promise((resolve, reject) =>{
                var collection = this.db.collection(colName);
                collection.insertMany(data, (err, result) =>{

                    if(err) {
                        console.log(err);
                        reject()
                    }else {
                        console.log(`Db: Inserted  ${data.length} into the ${colName} collection`);
                        resolve(result);
                    }

                });
            })
        } catch (e) {

        } finally {
            this.close()
        }


        return this;
    }

    async find(colName, query, set){
        if(!query || !colName) {
            console.log('Db: find --- lack of params');
            return;
        }
        console.log(`Db: finding ${JSON.stringify(query)} from ${colName}`);
        if(!this.db) {
            await this.connect()
        }
        try {
            let data = await new Promise((resolve, reject) =>{
                var collection = this.db.collection(colName);

          	     // Find some documents
              	  collection.find(query, set).toArray((err, docs)=>{

              	    assert.equal(err, null);
              	    console.log("Db: Found the following records");
                    resolve(docs)
              	  });
            });

            return data
        } catch (e) {

        } finally {
            this.close()
        }



    }
}

module.exports = Db;
