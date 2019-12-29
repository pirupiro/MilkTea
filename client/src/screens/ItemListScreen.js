import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SectionList
} from 'react-native';
import items from '../../data/items';
import ItemComponent from '../components/ItemComponent';
import HeaderComponent from '../components/HeaderComponent';

export default class ItemListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false
        };
    };

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
    formatData(data) {
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

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.formatData(items)}
                    renderItem={({ item }) => <ItemComponent {...item} navigation={this.props.navigation} />}
                    renderSectionHeader={({ section }) => <HeaderComponent section={section} />}
                    keyExtractor={item => item.name}
                    showsVerticalScrollIndicator={false}
                ></SectionList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24
    }
});
