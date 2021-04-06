import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Axios from "axios";
import { useDebounce } from "use-debounce";
import { Album } from "./Album";
import { Content, Item, Input, Label, Spinner, Text, Icon } from "native-base";

export const SearchArtist = ({ handleFavorite, favorites }) => {
  const [searchValue, setSearchValue] = useState("");
  const [textToSearch] = useDebounce(searchValue, 500);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (textToSearch.length > 0) {
      setLoading(true);
      setOptions([]);
      Axios.get(
        `https://itunes.apple.com/search?term=${textToSearch}&media=audiobook`
      )
        .then((response) => {
          setOptions(response.data.results);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [textToSearch]);

  return (
    <Content>
      <Item floatingLabel style={styles.itemStyle}>
        <Label style={styles.labelStyle}>Search an Artist</Label>
        <Icon style={styles.iconStyle} name="search" />
        <Input
          autoFocus
          value={searchValue}
          onChangeText={(value) => setSearchValue(value)}
        />
      </Item>

      {loading && <Spinner color="blue" />}
      {options.length > 0 &&
        options.map((item, index) => (
          <Album
            key={index}
            data={item}
            handleFavorite={handleFavorite}
            favorites={favorites}
          />
        ))}
      {searchValue.length > 0 && options.length === 0 && !loading && (
        <Text style={styles.textStyle}>No result Found</Text>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    margin: 10,
  },
  textStyle: {
    fontWeight: "bold",
  },
  iconStyle: {
    color: "red",
    fontSize: 32,
    left: 5,
    alignSelf: "stretch",
  },
  labelStyle: {
    left: 15,
    fontWeight: "bold",
    color: "red",
  },
});
