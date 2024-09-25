export const DecimalFormatter = (value) => {
  //   console.log("value", value);
  //   if (!value) {
  //     return value;
  //   }
  if (value % 1 !== 0 && value.toString().split(".")[1]?.length > 2) {
    return value.toFixed(2);
  } else if (isNaN(value)) {
    return 0;
  } else {
    return value;
  }
};
