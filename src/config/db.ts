import { MongoClient } from 'mongodb';

class DBConnection {
    public static client: MongoClient;
    public static connect(callback: Function) {
        console.log("CONNECT METHOD")
        MongoClient.connect(process.env.DB_CONNECTION_STRING, (err, db) => {
            this.client = db;
            callback();
        });
    }

    public static close() {
        this.client.close();
    }
}

// module.exports = {
//     connect,
//     get,
//     close
// };

export default DBConnection;
