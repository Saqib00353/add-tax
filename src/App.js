import { useEffect, useState } from "react";
import { Box, Button, FormControlLabel, Grid, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { radioTheme, headerTheme, buttonTheme, buttonContainerTheme, containerTheme, radioGroupTheme, errorTheme } from "./utilities/themes";
import { useFormik } from "formik";
import { inputSchema } from "./schema";
import { initialValues } from "./utilities";
import Collection from "./components/Collection";

function App() {
  const [data, setData] = useState([]);
  const [collection, setCollection] = useState([]);
  const [result, setResult] = useState({ name: "", rate: "", applicable_items: [], applied_to: "some" });
  const { errors, values, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    validationSchema: inputSchema,
    onSubmit: handleFormSubmit,
    initialValues,
  });

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  function handleRadioChange(e) {
    const { value } = e.target;
    if (value === "all") {
      const ids = [];
      collection.forEach((item) => item.subcategory.forEach((i) => ids.push(i.id)));
      setResult((prev) => ({ ...prev, applied_to: value, applicable_items: ids }));
      setCollection((prev) => prev.map((item) => ({ ...item, checked: true })));
      return;
    }
    setResult((prev) => ({ ...prev, applied_to: value, applicable_items: [] }));
    setCollection((prev) => prev.map((item) => ({ ...item, checked: false })));
  }

  function handleFormSubmit(values) {
    const output = { ...result, ...values, rate: Number(values.rate) / 100 };
    console.log("result =>", output);
  }

  return (
    <Box component="form" sx={containerTheme} onSubmit={handleSubmit}>
      <Box sx={headerTheme}>
        <Typography component="h2" variant="h5">
          Add Tax
        </Typography>
        <Grid container spacing={2} my={0.5}>
          <Grid item md={7} xs={9}>
            <TextField
              placeholder="e.g four"
              size="small"
              name="name"
              variant="outlined"
              fullWidth
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <Typography component="p" sx={errorTheme}>
                {errors.name}
              </Typography>
            ) : null}
          </Grid>
          <Grid item md={2} xs={3}>
            <OutlinedInput
              size="small"
              placeholder="tax"
              name="rate"
              value={values.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            {errors.rate && touched.rate ? (
              <Typography component="p" sx={errorTheme}>
                {errors.rate}
              </Typography>
            ) : null}
          </Grid>
        </Grid>

        <RadioGroup value={result.applied_to} onChange={handleRadioChange} sx={radioGroupTheme}>
          <FormControlLabel value="all" control={<Radio sx={radioTheme} />} label="Apply to all items in collection" />
          <FormControlLabel value="some" control={<Radio sx={radioTheme} />} label="Apply to specific items" />
        </RadioGroup>
      </Box>
      <Collection data={data} collection={collection} setCollection={setCollection} result={result} setResult={setResult} />
      <Box sx={buttonContainerTheme}>
        <Button type="submit" variant="contained" sx={buttonTheme}>
          Apply tax to {result.applicable_items.length} item(s)
        </Button>
      </Box>
    </Box>
  );
}

export default App;
