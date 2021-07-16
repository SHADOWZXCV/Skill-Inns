const { MongoClient } = require("mongodb");

module.exports = {

    insert: (data,callback)=> {

        const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect(err => {
            if(err) throw err
        
            const collection = client.db("skillinns").collection(data.collection || "users")
            collection.findOne({ $or: [
                { "username": data.user.username },
                { "Email": data.user.Email }
            ]} 
            ,(err,res)=> {
                if(err) throw err
                else if(res) callback(1)
                else {
                    collection.insertOne(data.user,(err,res)=> {
                        if(err) throw err
                        console.log("new user has joined!")
                        client.close().then((res)=> {
                            callback(200)
                        })
                    
                    })
                }
            })
        })
    }

}



