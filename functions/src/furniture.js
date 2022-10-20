import { ObjectId } from "mongodb";
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
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.send(collection)
}

export async function addNewFurniture(req,res) {
    // get new furniture from the body of the request
    const { brand, name, type } = req.body
    const newFurniture = { brand, name, type }
    // connect to database
    const db = dbConnect()
    // put this new furniture into our furniture collection in our db
    await db.collection('furniture').insertOne(newFurniture)
    // catch errors and send with status 500
    .catch(err => {
        res.status(500).send(err)
        return
    })
    // return a response with 201 all good
    res.status(201).send({ message: 'Furniture added' })
}

export async function updateFurniture(req,res) {
    const { furnitureId } = req.params
    const db = dbConnect()
    await db.collection('furniture')
        .findOneAndUpdate({ _id: new ObjectId(furnitureId) }, { $set: req.body })
        .catch(err => {
        res.status(500).send(err)
        return
 })
    res.status(201).send({ message: 'Furniture updated' })
}
