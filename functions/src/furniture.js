import dbConnect from "./dbconnect.js";

export async function getAllFurniture(req,res) {
    // connect to database
    const db = dbConnect()
    // get the whole furniture collection
  const collection = await db.collection("furniture").find().toArray()
    // catch any errors -> status 500
        .catch(err => {
            res.status(500).send(err)
            return
        })
    // send back the array of furniture
    res.send(collection)
}

