import { StyleSheet, View, Text, Image, ActivityIndicator, Pressable } from "react-native"
import { useEffect, useState } from "react";
import { addFav } from "../controllers/favoritesDB";

export default DetailsScreen = ({ route }) => {

    const { videoID } = route.params;
    const [data, setData] = useState();

    const getAPIData = async () => {
        const url = `https://api.dailymotion.com/video/${videoID}?fields=thumbnail_240_url,description,views_total,title,created_time`;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    console.log("Successful response")
                    let jsonData = response.json()
                    return jsonData
                }
                else {
                    console.log(`Unsuccessful response: ${response.status}`)
                }
            })
            .then((apiData) => {
                if (apiData !== undefined) {
                    console.log(`JSON data from API is available`);
                    console.log(`${JSON.stringify(apiData)}`)
                    apiData.id = videoID
                    setData(apiData)
                }
                else {
                    console.log(`No data from API`)
                    setData()
                }
            })
            .catch((err) => { console.log(`Error occured while connecting to API: ${err}`) })
    }

    useEffect(() => {
        getAPIData()
    }, []);

    return (
        <View style={styles.container}>
            {data ? (
                <View style={styles.container}>
                    <Image style={styles.image}
                        source={{
                            uri: `${data.thumbnail_240_url}`,
                        }}
                    />
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text></Text>
                        <Pressable onPress={() => addFav(data)}>
                            <Text style={styles.favButton}>Favorite</Text>
                        </Pressable>
                    </View>
                    <Text style={{textAlign: "justify"}}>{data.description}</Text>
                    <Text style={{color: "grey"}}>VIEWS: {data.views_total}</Text>
                </View>
            ) : (
                <ActivityIndicator color="blue" size="large" animating={true} />
            )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column",
        gap: 20,
        padding: 10
    },
    horizontalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        width: "70%"
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: 'stretch'
    },
    favButton: {
        color: "white",
        backgroundColor: "rgb(199, 0, 57)",
        fontSize: 25,
        padding: 10,
        borderRadius: 5
    }
})