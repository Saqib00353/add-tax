import * as Yup from "yup";

export const inputSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter you name"),
  rate: Yup.string().required("Please enter tax rate"),
});
