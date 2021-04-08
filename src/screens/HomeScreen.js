import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { StyleSheet, ScrollView } from "react-native";
import { Header, Title } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Favorites } from "../components/Favorite";
import { SearchArtist } from "../components/SearchArtist";

export default function HomeScreen({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    }).then(() => {
      setIsReady(true);
    });
  }, []);
  return (
    <ScrollView>
      {!isReady ? (
        <AppLoading />
      ) : (
        <ScrollView>
          <Header>
            <Title style={styles.titleStyle}>Search for iTunes App</Title>
          </Header>
          <Favorites
            data={favorites}
            handleDelete={(id) => {
              const items = [...favorites].filter(
                (item) => item.collectionId !== id
              );
              setFavorites(items);
            }}
          />
          <SearchArtist
            navigation={navigation}
            handleFavorite={(item) => {
              const selectedItem = favorites.find(
                (favItem) => favItem.collectionId === item.collectionId
              );
              if (selectedItem?.collectionId) {
                const filteredItem = favorites.filter(
                  (items) => items.collectionId !== item.collectionId
                );
                setFavorites(filteredItem);
              } else {
                const items = [...favorites, item];
                setFavorites(items);
              }
            }}
            favorites={favorites}
          />
        </ScrollView>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 25,
    marginTop: 5,
  },
});
