import React, { useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    SectionList,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemComponent from '../components/ItemComponent';
import HeaderComponent from '../components/HeaderComponent';
import ItemContext from '../context/ItemContext';
import CartIcon from '../components/CartIcon';

export default function ItemListScreen(props) {
    const itemContext = useContext(ItemContext);

    useEffect(() => {

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
                sections={formatData(itemContext.items)}
                renderItem={({ item }) => <ItemComponent {...item} navigation={props.navigation} />}
                renderSectionHeader={({ section }) => <HeaderComponent section={section} />}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
            ></SectionList>
        </View>
    );
}

ItemListScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: <CartIcon navigation={navigation} />
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: 'rgb(248, 248, 248)'
    }
});
