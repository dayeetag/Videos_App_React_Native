import { Alert } from "react-native";
import { db } from "../config/FirebaseApp";
import { collection, addDoc, getDocs, doc, getDoc, writeBatch } from "firebase/firestore";

const FAVORITES_COLLECTION = "Favorites";

export const addFav = async (video) => {
    try {
        const docToInsert = await addDoc(collection(db, FAVORITES_COLLECTION), video)
        console.log(`Document created with ID: ${docToInsert.id}`)
        Alert.alert("Success","Video has been added to favorites!")
    }
    catch (err) {
        console.log(`${err.message}`)
    }
}

export const getAllFavs = async(_callback) => {
    try {
        const querySnapshot = await getDocs(collection(db, FAVORITES_COLLECTION));
        const favList = []
        querySnapshot.forEach((doc) => {
            favList.push(doc.data())
        });
        _callback(favList)
    }
    catch (err) {
        console.log(err.message)
    }
}

export const removeAllFavs = async() => {
    try{
        const querySnapshot = await getDocs(collection(db, FAVORITES_COLLECTION));
        const batch = writeBatch(db)
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref)
        });
        await batch.commit()
        Alert.alert("Success","Favorites has been cleared")
    }
    catch (err) {
        console.log(err.message)
    }
}