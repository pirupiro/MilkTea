import React, { useContext, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    SectionList,
    InteractionManager
} from 'react-native';
import ItemComponent from '../components/ItemComponent';
import HeaderComponent from '../components/HeaderComponent';
import ItemContext from '../context/ItemContext';
import CartIcon from '../components/CartIcon';
import SearchBar from '../components/SearchBar';

export default function ItemListScreen(props) {
    const [searchStr, setSearchStr] = useState('');
    const itemContext = useContext(ItemContext);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            props.navigation.setParams({ searchStr, setSearchStr });
        });
    }, []);

    function formatData(data) {
        let formattedData = [];
        let titles = [];

        for (item of data) {
            if (item.name.toLowerCase().includes(searchStr.toLowerCase())) {
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
        headerTitle: <SearchBar {...navigation.state.params} />,
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
