import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { getAllFavs, removeAllFavs } from '../controllers/favoritesDB';

export default HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    const getDataFromDB = () => {
        getAllFavs((favs) => {
            setData(favs)
        });
    }

    const goToDetails = (videoID) => {
        navigation.navigate("Details", { videoID: videoID })
    }

    useEffect(() => {
        getDataFromDB()
    }, []);

    const renderListItem = ({ item }) => (
        <View>
            <Pressable onPress={() => goToDetails(item.id)}>
                <Text style={styles.listItem}> {item.title}</Text>
                <Text></Text>
            </Pressable>
            <View style={styles.separator} />
        </View>
    )

    const clearFavs = () => {
        console.log("Button enabled")
        removeAllFavs()
        setData([])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Favorites</Text>
            <Pressable onPress={clearFavs} disabled={data.length>0 ? false : true}>
                <Text style={styles.clearButton}>Clear Favorites</Text>
            </Pressable>
            {data.length > 0 ? (

                <FlatList
                    data={data}
                    renderItem={(item) => renderListItem(item)}
                    key={(item) => item.id.toString()}
                />) :
                <Text>No favorites found</Text>
            }
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
    clearButton: {
        color: "white",
        backgroundColor: "rgb(199, 0, 57)",
        fontSize: 25,
        padding: 10,
        borderRadius: 5
    }
});