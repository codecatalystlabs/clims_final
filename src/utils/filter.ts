// filterUtils.js

// Function to filter data based on criteria
export const filterData = (data: any, filters: { region: any; level: any; date: any; }) => {
  let filteredData = [...data];

  if (filters.region) {
    filteredData = filteredData.filter(item => item.region === filters.region);
  }

  if (filters.level) {
    filteredData = filteredData.filter(item => item. === filters.level);
  }

  // if (filters.date) {
  //   filteredData = filteredData.filter(item => /* Your date comparison logic here */);
  // }

  return filteredData;
};
