import React from "react";
import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { Container } from "native-base";

export default function DetailScreen({ route }) {
  const { data } = route.params;
  console.log("asd", data);

  const truncate = (description) => {
    return description.length > 200
      ? `${description.substring(0, 200)}...`
      : description;
  };

  const {
    country,
    currency,
    copyright,
    artistName,
    description,
    releaseDate,
    wrapperType,
    artworkUrl100,
    collectionName,
    collectionPrice,
    primaryGenreName,
    collectionExplicitness,
  } = data;
  return (
    <ScrollView>
      <Container style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={{ uri: artworkUrl100 }}
        ></Image>
        <Text style={styles.textStyle}>{collectionName}</Text>
        <Text style={styles.textStyle}>ArtistName:{artistName}</Text>
        <Text style={styles.textStyle}>Country:{country}</Text>
        <Text style={styles.textStyle}>Currency:{currency}</Text>
        <Text style={styles.textStyle}>Price:{collectionPrice}</Text>
        <Text style={styles.textStyle}>
          Description:{truncate(description)}
        </Text>
        <Text style={styles.textStyle}>
          PrimaryGenreName:{primaryGenreName}
        </Text>
        <Text style={styles.textStyle}>wrapperType:{wrapperType}</Text>
        <Text style={styles.textStyle}>ReleaseDate:{releaseDate}</Text>
        <Text style={styles.textStyle}>
          CollectionExplicitness:{collectionExplicitness}
        </Text>
        <Text style={styles.textStyle}>Copyright:{copyright}</Text>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  textStyle: {
    fontWeight: "bold",
    margin: 5,
    color: "green",
  },
  imageStyle: {
    height: "50%",
    width: "100%",
    margin: 10,
  },
});
