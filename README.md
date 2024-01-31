# React Dashboard Application

This project is a React-based dashboard application designed to visualize and present various metrics and data points in an organized and user-friendly manner. The application includes a Graph Component that utilizes Chart.js to display a line chart, showcasing important trends and patterns.




## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Graph Component**: Display a line chart using Chart.js based on the downsampling algorithm.
2. **Downsampling Algorithm**: Implement a downsampling algorithm (`downsampleLTTB`) to reduce data points.
3. **User Interface**: Showcase various UI elements, such as images, graphs, and user information.
4. **Charts and Metrics**: Present important metrics and charts related to revenues, deals, customers, etc.
5. **Sorting and Filtering**: Allow users to sort and filter customer information.
6. **Responsive Design**: Ensure the application is responsive on different devices.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repository.git

2. **Navigate to Project Directory**:
   ```bash
   cd myapp
3. **Install Dependencies**:
   ```bash
   npm install
4. **Run the Application**:
   ```bash
   npm start

## Dependencies

1. React
2. Chart.js
3. Styled Components

## Downsampling Algorithm Explanation

The downsampling algorithm implemented in this project, known as Largest Triangle Three Buckets (LTTB), is designed to reduce the number of data points in a dataset while preserving its essential features. Downsampling is particularly useful for large datasets to enhance visualization performance, especially in scenarios where rendering every data point is unnecessary or visually cluttered.

### Algorithm Overview
The LTTB algorithm operates by dividing the dataset into a specified number of buckets and selecting the most representative points within each bucket. The goal is to retain significant data points that accurately represent the overall trend of the dataset. Here's a step-by-step breakdown of the algorithm:

1. Initialization:
Calculate the total length of the input data.
Check if the specified downsampling threshold is valid; if not, return the original data.
Initialize variables for sampled data and indexing.

2. Bucket Size Calculation:
Determine the bucket size (every) based on the downsampling threshold and the total length of the data.

3. First Data Point:
Always include the first data point in the sampled dataset.

4. Bucket Iteration:
Iterate over the data, calculating the average of the data points within each bucket.
Each bucket contains a range of data points, and the average is calculated for both the month and the specified data metric (e.g., profit percentage).

5. Triangle Area Calculation:
For each bucket, calculate the area of the triangle formed by connecting three points: the initial point (a), the calculated average point, and a point within the bucket.
The triangle area is determined using the formula for the area of a triangle.

6. Max Area Selection:
Identify the point within the bucket that forms the triangle with the maximum area.
Update the max_area_point and prepare for the next iteration.

7. Data Inclusion:
Include the identified point with the maximum area in the sampled dataset.
Update the index (a) for the next iteration.

8. Final Data Point:
Always include the last data point in the sampled dataset.

9. Return Sampled Data:
Return the final sampled dataset, containing representative data points.

### Code 

  ```bash
  function downsampleLTTB(data, threshold) {
    var data_length = data.length;
  
    if (threshold >= data_length || threshold === 0) {
      return data; // Nothing to do
    }
  
    var sampled = [];
    var sampled_index = 0;
  
    var every = (data_length - 2) / (threshold - 2);
  
    var a = 0,
      max_area_point,
      max_area,
      area,
      next_a;
  
    sampled[sampled_index++] = data[a];
  
    for (var i = 0; i < threshold - 2; i++) {
      var avg_month = 0,
        avg_profit_percentage = 0,
        avg_range_start = Math.floor((i + 1) * every) + 1,
        avg_range_end = Math.floor((i + 2) * every) + 1;
  
      avg_range_end = avg_range_end < data_length ? avg_range_end : data_length;
  
      var avg_range_length = avg_range_end - avg_range_start;
  
      for (; avg_range_start < avg_range_end; avg_range_start++) {
        var month = parseInt(data[avg_range_start]["Timestamp"].substring(5, 7), 10);
        avg_month += month;
        avg_profit_percentage += data[avg_range_start]["Profit Percentage"] * 1;
      }
  
      avg_month /= avg_range_length;
      avg_profit_percentage /= avg_range_length;
  
      var range_offs = Math.floor((i + 0) * every) + 1,
        range_to = Math.floor((i + 1) * every) + 1;
  
      var point_a_month = parseInt(data[a]["Timestamp"].substring(5, 7), 10);
      var point_a_profit_percentage = data[a]["Profit Percentage"] * 1;
  
      max_area = area = -1;
  
      for (; range_offs < range_to; range_offs++) {
        area = Math.abs(
          (point_a_month - avg_month) * (data[range_offs]["Profit Percentage"] - point_a_profit_percentage) -
          (point_a_month - parseInt(data[range_offs]["Timestamp"].substring(5, 7), 10)) * (avg_profit_percentage - point_a_profit_percentage)
        ) * 0.5;
  
        if (area > max_area) {
          max_area = area;
          max_area_point = data[range_offs];
          next_a = range_offs;
        }
      }
  
      sampled[sampled_index++] = max_area_point;
      a = next_a;
    }
  
    sampled[sampled_index++] = data[data_length - 1];
  
    return sampled;
  }
```
## Screenshots
![Screenshot (199)](https://github.com/vinamrajain19/Dashboard-UI/assets/91343225/1aed9240-eb36-4a53-8734-930980a2cd98)
