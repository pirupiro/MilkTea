import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    SectionList,
    StatusBar
} from 'react-native';
// import items from '../../data/items';
import ItemComponent from '../components/ItemComponent';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';
import { url } from '../Networking';

export default function ItemListScreen(props) {
    /*
    * Data fetched from API will have the form:
    *   [
    *       {
    *           name: string,
    *           price: int,
    *           category: string,
    *           uri: string,
    *           description: string
    *       },
    *       ...
    *   ]
    *
    * We need to re-format the data to have form:
    *   [
    *       {
    *           title: string,
    *           data: [
    *               {
    *                   name: string,
    *                   price: int,
    *                   category: string,
    *                   uri: string,
    *                   description: string
    *               },
    *               ...
    *           ]
    *       },
    *       ...
    *   ]
    *
    * to pass to `sections` prop of SectionList
    */

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItemList = async () => {
            const res = await axios.get(url + '/items');
            return res.data;
        }

        getItemList()
            .then(data => { setItems(data.data); })
            .catch(error => { console.error(error); });
    }, []);

    function formatData(data) {
        let formattedData = [];
        let titles = [];

        for (item of data) {
            let index = titles.indexOf(item.category);

            if (index < 0) {
                formattedData.push({
                    title: item.category,
                    data: [{ ...item }]
                });
                titles.push(item.category);
            } else {
                formattedData[index].data.push({ ...item });
            }
        }

        return formattedData;
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={formatData(items)}
                renderItem={({ item }) => <ItemComponent {...item} navigation={props.navigation} />}
                renderSectionHeader={({ section }) => <HeaderComponent section={section} />}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
            ></SectionList>
        </View>
    );
}

ItemListScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
});
