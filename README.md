## Group 5 - Project 3
<br>

# **Renewable Energy**

<br>

## Project Description
As the economy and population grows, so does our need for energy. Without renewable energy such as solar, wind, geothermal, biopower, and hydropower we would not have a future. As we move into the future, our demands for renewable and sustainable energy will only increase. Our objective is to analyze the differences in our current energy consumption and the clean-energy production potential, determine how much more renewable energy production is required within each state, and create visualizations of the data using Leaflet, Plotly, and D3.

<br>

## Data Sources

• Consumption per capita per state - https://www.eia.gov/state/rankings/#/series/12

• United States Census - https://en.wikipedia.org/wiki/List_of_U.S._states_and_territories_by_population#cite_note-5

• Potential Energy Consumption - https://data.world/doe/united-states-renewable-energy

• Interactive Choropleth Map - https://leafletjs.com/examples/choropleth/

<br>

## Section I - Data Extraction, Cleaning, and Transformation
We obtained our data from the U.S Energy Information Administration, U.S census, and data.world. All of our files had similar data structures and respresents the renewable energy potential (in GWH) and consumed (in btu) in the 2019 within each state. 

The data that represented Total Energy Consumed had the states in their 2 letter abbreviations and was cleaned via Pandas to keep the naming scheme consistent within all data sources. The data that resprented Potential Energy needed to be totaled up into 5 different categories of energy being: 'Solar', 'Wind', 'Geothermal', 'Biopower', and 'Hydropower. To achieve this, we used the Pandas function "drop" to remove all of the unwanted columns along with adding up the columns that were in "GWH" to calculate the total and The "dropna" function was used as well to remove any blanks and replaces them with "0". Since the 2 data sources came with different units we converted btu into GWH with simple arithmetic. A pandas "merge" function was used to combine the 2 cleane files together that represents the differences between Potential Energy and Energy Consumed.
<br>

## Section II - JSONifying the Data
JavaScript Object Notation (JSON) was used to text-based data format following JavaScript object syntax and transmit the data in web application. Using the US coordinates JSON files was possible to create the leaflet map. Using the API and Python file the JSON file for the pie chart was created. To challenge our self, was used a new library to be able to create a radial chart.
<br>

## Section III - Visualization
For visualization, we chose to use the following to create different charts and maps:
<br>
• Leaflet was used to create an choropleth map describing the energy excess capacity per state.
<br>
![Map](https://github.com/ailiushin/group5_project3/blob/main/Images/choropleth_map.PNG?raw=true)
<br>
• Pie chart to describe the total renewable energy by type per state
<br>
![Piechart](https://github.com/ailiushin/group5_project3/blob/main/Images/pie_only.PNG?raw=true)
<br>
• Bar chart to show the excess capacity of the amount of total energy consumed vs. total potential energy by state
<br>
![Barchart](https://github.com/ailiushin/group5_project3/blob/main/Images/Bar_only.PNG?raw=true)
<br>
• Radial chart to show the differences in the amount of different renewable energy for US
![Radialchart](https://github.com/ailiushin/group5_project3/blob/main/Images/radial_bar_chart.png?raw=true)
<br>
<br>
After these visualizations were created, these were loaded into a html file to be displayed onto our website.

## Technologies
• Clean and modify the data using Pandas and Jupyter Notebook.

• Use PostgreSQL as the database.

• Use Python as the server side language, Flask as the web server and SQLAlchemy as the ORM.

• Use HTML, CSS and JavaScript on the front end.

• Use D3, Plotly and Leaflet to visualize the data.

## Contributors
• Artem Iliushin
<br>
• Bhumi Bhusal
<br>
• Rafael Tem Pahs
<br>
• Ryan Callaghan
<br>
• Ryan Cheng
