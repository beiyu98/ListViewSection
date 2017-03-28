/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    ListView,
    Image
} from 'react-native';

const datas={
    sectionWithTitle:[
        {
            title:'精选菜单',
            pic:'http://image.hongbeibang.com/FjigYOhuPOLLS6M4F5ejd6psqCcI?801X312&imageMogr2/strip/thumbnail/750x750'
        },
        {
            title:'热门菜单',
            pic:'http://image.hongbeibang.com/Fof924bIoB1hqE2MTs38bBcGEzk3?802X313&imageMogr2/strip/thumbnail/750x750'
        }
    ],
    sectionWithoutTitle:[
        {
            pic:'http://image.hongbeibang.com/FqBRH1E0EP2I488s7DXww1RVGQOF?801X311&imageMogr2/strip/thumbnail/750x750'
        },
        {
            pic:'http://image.hongbeibang.com/FulhGNdLtEmHKTKkLX0cLjlH9Wxi?802X312&imageMogr2/strip/thumbnail/750x750'
        },
        {
            pic:'http://image.hongbeibang.com/FkC4ySvlw9--96qkfJfFNeG9AgMa?800X313&imageMogr2/strip/thumbnail/750x750'
        }
    ]
};

export default class ListViewSection extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource(
            {
                rowHasChanged:(r1,r2)=>r1!==r2,
                sectionHeaderHasChanged:(s1,s2)=>s1!==s2
            });

        this.state={
            dataSource:ds,
            isLoaded:false
        }
    }

    render() {

        if(!this.state.isLoaded){
            return this.renderLoading()
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData,sectionId,rowId)=>this.renderSections(rowData,rowId,sectionId)}
            />
        );
    }

    componentDidMount(){

        var that = this;
        var change =function () {
            that.setState({
                dataSource:that.state.dataSource.cloneWithRowsAndSections(datas),
                isLoaded:true
            })
        };

        setTimeout(change,2000);

    }

    renderLoading(){
        return(
            <View style={styles.container}>
                <Text>正在加载中。。。</Text>
            </View>
        )
    }

    renderSections(rowData,rowId,sectionId){

        if (sectionId === 'sectionWithTitle'){
            return(
                <View style={styles.bgContainer}>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <View style={styles.verticalLine}/>
                            <Text style={styles.title}>{rowData.title}</Text>
                        </View>
                        <Image style={styles.image} source={{uri:rowData.pic}}/>
                    </View>
                </View>
            )
        }else if (sectionId === 'sectionWithoutTitle'){
            return(
                <View style={styles.bgContainer2}>
                    <View style={styles.container}>
                        <Image style={styles.image} source={{uri:rowData.pic}}/>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    bgContainer:{
        backgroundColor:'#F5F5F5',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5
    },
    bgContainer2:{
        backgroundColor:'#F5F5F5',
        paddingLeft:10,
        paddingRight:10,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
      paddingTop:5,
      paddingBottom:5,
      paddingRight:10,
      paddingLeft:10
  },
  titleContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginLeft:10
  },
    verticalLine:{
        backgroundColor:'#F6514F',
        width:3,
        height:15
    },
    title:{
      fontSize:18,
        color:'#000',
        fontWeight:'bold',
        marginLeft:5
    },
    image:{
        height:150,
        borderRadius:5,
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        marginTop:5
    }
});

AppRegistry.registerComponent('ListViewSection', () => ListViewSection);
