import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://affansheikh986_db_user:123@cluster0.v153zcd.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export const database = await client.db('ansh_hotel')
export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e) {
    console.log('Error: ', e);
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run();


