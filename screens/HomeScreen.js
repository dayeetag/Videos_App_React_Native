import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Button } from 'react-native';

export default HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    const getAPIData = async () => {
        const url = "https://api.dailymotion.com/user/x1audmk/videos?limit=20";

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
                    setData(apiData.list)
                }
                else {
                    console.log(`No data from API`)
                    setData([])
                }
            })
            .catch((err) => { console.log(`Error occured while connecting to API: ${err}`) })
    }

    const goToDetails = (videoID) => {
        navigation.navigate("Details", {videoID: videoID })
    }

    useEffect(() => {
        getAPIData()
    }, []);

    const renderListItem = ( {item} ) => (
        <View>
            <Pressable onPress={() => goToDetails(item.id)}>
                <Text style={styles.listItem}> {item.title}</Text>
                <Text></Text>
            </Pressable>
            <View style={styles.separator} />
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Videos from Wired Magazine</Text>
            <Pressable onPress={() => { navigation.navigate('Favorites')}} >
                <Text style={styles.favButton}>View Favorites</Text>
            </Pressable>
            <FlatList
                data={data}
                renderItem={(item) => renderListItem(item)}
                key={(item) => item.id.toString()}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column",
        gap: 40,
        padding: 10
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    listItem: {
        color: 'darkblue',
        fontSize: 18
    },
    separator: {
        height: 1,
        backgroundColor: "#dddddd",
    },
    favButton: {
        color: "white",
        backgroundColor: "rgb(199, 0, 57)",
        fontSize: 25,
        padding: 10,
        borderRadius: 5
    }
  });