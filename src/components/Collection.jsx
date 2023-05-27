import { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, InputAdornment, TextField } from "@mui/material";
import { collectionTheme, searchTheme, collectionItemTheme, subCollectionItemTheme } from "../utilities/themes";
import uniqid from "uniqid";
import SearchIcon from "@mui/icons-material/Search";

const Collection = ({ data, setResult, collection, setCollection, result }) => {
  const [groupedItems, setGroupedItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const groupedItems = data?.reduce((acc, curr) => {
      const category = curr?.category?.name || " ";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(curr);
      return acc;
    }, {});

    let groupedItemsList = [];
    if (groupedItems) {
      for (let key in groupedItems) {
        groupedItemsList.push({ id: uniqid(), name: key, subcategory: groupedItems[key], checked: false });
      }
    }
    groupedItemsList.sort((a, b) => b.name.localeCompare(a.name));
    setGroupedItems(groupedItemsList);
    setCollection(groupedItemsList);
  }, [data]);

  function handleSearchChange(e) {
    const searchText = e.target.value.toLowerCase();
    const filteredCollection = groupedItems.filter((item) => item.name.toLowerCase().includes(searchText));
    setCollection(filteredCollection);
    setSearch(searchText);
  }

  function handleCheckboxChange(e, id) {
    const ids = [];
    let updatedItems = [];

    if (result.aplied_to === "all") {
      updatedItems = collection.map((item) => ({ ...item, checked: true }));
      updatedItems.forEach((item) => item.subcategory.forEach((i) => ids.push(i.id)));
    } else {
      updatedItems = collection.map((item) => (item.id === id ? { ...item, checked: e.target.checked } : item));
      updatedItems.filter((item) => item.checked).forEach((item) => item.subcategory.forEach((i) => ids.push(i.id)));
    }

    setCollection(updatedItems);
    setResult((prev) => ({
      ...prev,
      applicable_items: ids,
    }));
  }

  return (
    <Box>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search Items"
        value={search}
        onChange={handleSearchChange}
        sx={searchTheme}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={collectionTheme}>
        {collection?.map((item) => (
          <Box key={item.id}>
            <FormGroup sx={collectionItemTheme}>
              <FormControlLabel control={<Checkbox checked={item.checked} onChange={(e) => handleCheckboxChange(e, item.id)} />} label={item.name} />
            </FormGroup>
            {item?.subcategory?.map((subItem) => (
              <Box key={subItem.id}>
                <FormGroup sx={subCollectionItemTheme}>
                  <FormControlLabel control={<Checkbox checked={item.checked} />} label={subItem.name} />
                </FormGroup>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Collection;
