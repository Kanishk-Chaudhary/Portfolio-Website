require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASS
)}@kanishk-chaudhary.ywixmpl.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db(process.env.DB_NAME);
const collection = database.collection(process.env.DB_COLL);

async function connect() {
  await client.connect();
}

async function addMessage(data) {
  if (data) {
    return await collection.insertOne(data);
  }
}

async function closeConnection() {
  await client.close();
}

module.exports = {
  connect,
  closeConnection,
  addMessage,
};
