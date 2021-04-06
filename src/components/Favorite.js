import React, { useState } from "react";
import { StyleSheet, Modal, ScrollView } from "react-native";
import {
  Icon,
  Card,
  Text,
  Item,
  List,
  Body,
  Input,
  Title,
  Label,
  Right,
  Button,
  Header,
} from "native-base";
import { Album } from "./Album";

export const Favorites = ({ data, handleDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  return (
    <Card style={styles.cardStyle}>
      <Text style={styles.textStyle}>
        {data.length === 0
          ? `Choose your favorites from below`
          : "See your populated list of favorites by clicking here"}
      </Text>
      <Body>
        <Button
          transparent
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Icon
            style={data.length === 0 ? styles.iconStyle : styles.iconFavorite}
            name="heart"
          />
          <Modal
            style={styles.modalView}
            animationType="slide"
            visible={modalVisible}
          >
            <ScrollView>
              <List style={styles.modalView}>
                <Header>
                  <Title style={styles.titleStyle}>Track your Favorite</Title>
                  <Right>
                    <Button onPress={() => setModalVisible(false)}>
                      <Icon name="ios-close-circle-outline" />
                    </Button>
                  </Right>
                </Header>
                <Item floatingLabel style={styles.itemStyle}>
                  <Label style={styles.labelStyle}>
                    Filter Your ArtistName
                  </Label>
                  <Input
                    value={searchValue}
                    onChangeText={(value) => {
                      const filtered =
                        data.length > 0
                          ? data.filter((item) =>
                              item.artistName
                                .toLowerCase()
                                .includes(value.toLowerCase())
                            )
                          : [];
                      setFilteredData(filtered);
                      setSearchValue(value);
                    }}
                  />
                </Item>
                <List>
                  {searchValue.length > 0 && filteredData.length === 0 && (
                    <Text style={styles.textOnStyle}>
                      No results found for this search.
                    </Text>
                  )}
                  {searchValue.length > 0 &&
                    filteredData.length > 0 &&
                    filteredData.map((item, i) => (
                      <Album
                        data={item}
                        key={i}
                        handleDelete={searchValue.length === 0 && handleDelete}
                      />
                    ))}
                  {searchValue.length === 0 &&
                    data.length > 0 &&
                    data.map((item, i) => (
                      <Album key={i} data={item} handleDelete={handleDelete} />
                    ))}
                  {searchValue.length === 0 && data.length === 0 && (
                    <Text style={styles.textOnStyle}>
                      No data found for this list.
                    </Text>
                  )}
                </List>
              </List>
            </ScrollView>
          </Modal>
        </Button>
      </Body>
    </Card>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    color: "blue",
    fontSize: 30,
  },
  iconFavorite: {
    color: "green",
    fontSize: 30,
  },
  cardStyle: {
    height: 80,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    color: "blue",
  },
  modalView: {
    margin: 3,
    height: "100%",
    width: "100%",
  },
  labelStyle: {
    left: 15,
    top: 5,
    fontWeight: "bold",
    color: "red",
    end: 3,
  },
  titleStyle: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  textOnStyle: {
    fontWeight: "bold",
  },
});
