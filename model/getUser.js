const { MongoClient } = require("mongodb");

module.exports = {

    getUser: (data,callback)=> {

        const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        client.connect(err => {
            if(err) throw err
        
            const collection = client.db("skillinns").collection("users")
            collection.findOne({ "Email": data.email } 
            ,(err,res)=> {
                if(err) throw err
                else if(res){
                    const pData = {
                        'first-name': res['first-name'],
                        username: res.username,
                        hashed: res.password,
                        sugar: res.sugar
                    }
                    client.close().then((res)=> {
                        console.log(`user with email: ${data.email} exist on server!`)
                        callback(1, pData)
                    })
                }
                else {
                        console.log("Email doesn't exist on the server!")
                        client.close().then((res)=> {
                            callback(0)
                    })
                }
            })
        })
    }

}