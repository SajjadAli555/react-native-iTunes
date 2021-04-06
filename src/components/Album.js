import React from "react";
import {
  List,
  Icon,
  Text,
  Body,
  Left,
  Right,
  Button,
  ListItem,
  Thumbnail,
} from "native-base";
import { StyleSheet } from "react-native";

export const Album = ({ data, handleFavorite, handleDelete, favorites }) => {
  const {
    country,
    currency,
    artistName,
    artworkUrl100,
    collectionId,
    collectionName,
    collectionPrice,
  } = data;
  return (
    <List>
      <ListItem thumbnail>
        <Left>
          <Thumbnail
            style={styles.thumbnailStyle}
            square
            source={{ uri: artworkUrl100 }}
          />
        </Left>
        <Body>
          <Text style={styles.textStyle}>{collectionName}</Text>
          <Text style={styles.textStyle}>ArtistName:{artistName}</Text>
          <Text style={styles.textStyle}>Country:{country}</Text>
          <Text style={styles.textStyle}>Currency:{currency}</Text>
          <Text style={styles.textStyle}>Price:{collectionPrice}</Text>
        </Body>
        {handleFavorite && (
          <Right>
            <Button
              style={styles.buttonStyle}
              transparent
              onPress={() => {
                handleFavorite(data);
              }}
            >
              <Icon
                style={
                  favorites?.length > 0 &&
                  favorites.filter(
                    (item) => item?.collectionId === collectionId
                  ).length > 0
                    ? styles.iconFavorite
                    : styles.icon
                }
                name="heart"
              />
            </Button>
          </Right>
        )}
        {handleDelete && (
          <Right>
            <Button
              transparent
              onPress={() => {
                handleDelete(collectionId);
              }}
            >
              <Icon style={styles.trashStyle} name="trash" />
            </Button>
          </Right>
        )}
      </ListItem>
    </List>
  );
};
const styles = StyleSheet.create({
  icon: {
    color: "blue",
    fontSize: 32,
    marginTop: 15,
  },
  iconFavorite: {
    color: "red",
    fontSize: 32,
    marginTop: 15,
  },

  thumbnailStyle: {
    width: 120,
    height: 130,
  },
  textStyle: {
    fontWeight: "bold",
  },
  buttonStyle: {
    marginTop: 15,
  },
  trashStyle: {
    color: "red",
    fontSize: 32,
  },
});
