from sre_parse import State
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
connection_string = "postgres:Murphy006@localhost:5432/energy_db"
engine = create_engine(f'postgresql://{connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table named "energy" in database
energy = Base.classes.energy

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return render_template('index_rtp.html')

@app.route("/map")
def us_map():
    return render_template('map.html')

@app.route("/plots")
def plot():
    return render_template('plotly.html')   

@app.route("/chart")
def chart():
    return render_template('chart.html') 


@app.route("/api/v1.0/renewable_energy")
def renewable_energy():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of energy data including the state names and energy potential for that state"""
    # Query all passengers
    results = session.query(energy.state, energy.solar_potential_gwh, energy.wind_potential_gwh, 
                energy.biopower_potential_gwh, energy.geothermal_potential_gwh, energy.hydropower_potential_gwh, 
                energy.total_energy_potential_gwh, energy.total_energy_consumed_gwh,
                energy.energy_excess_capacity, energy.population ).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_energies
    all_energies = []
    for State, solar_potential_gwh, wind_potential_gwh, biopower_potential_gwh, geothermal_potential_gwh, hydropower_potential_gwh, total_energy_potential_gwh, total_energy_consumed_gwh, energy_excess_capacity, population in results:
        energy_dict = {}
        energy_dict["state"] = State
        energy_dict["solar"] = solar_potential_gwh
        energy_dict["wind"] = wind_potential_gwh
        energy_dict["biopower"] = biopower_potential_gwh
        energy_dict["geothermal"] = geothermal_potential_gwh
        energy_dict["hydro"] = hydropower_potential_gwh
        energy_dict["total_consumed"] = total_energy_consumed_gwh
        energy_dict["total_potential"] = total_energy_potential_gwh
        energy_dict["excess_capacity"] = energy_excess_capacity
        energy_dict["population"] = population
         

        all_energies.append(energy_dict)

    return jsonify(all_energies)


if __name__ == '__main__':
    app.run(debug=True)

























# import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func

# from flask import Flask, jsonify, render_template


# #################################################
# # Database Setup
# #################################################
# #####engine = create_engine("sqlite:///titanic.sqlite")
# engine = create_engine('postgresql://postgres:Murphy006@localhost:5432/energy')

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# Penergy = Base.classes.potential_energy

# #################################################
# # Flask Setup
# #################################################
# app = Flask(__name__)


# #################################################
# # Flask Routes
# #################################################

# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return render_template('index.html')


# @app.route("/api/v1.0/energy")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Penergy).all()

#     session.close()

#     all_passengers = []
#     for name in results:
#         passenger_dict = {}
#         passenger_dict["states"] = name
#         all_passengers.append(passenger_dict)

#     # Convert list of tuples into normal list
#     ####all_names = list(np.ravel(results))

#     return all_passengers


# # @app.route("/api/v1.0/passengers")
# # def passengers():
# #     # Create our session (link) from Python to the DB
# #     session = Session(engine)

# #     """Return a list of passenger data including the name, age, and sex of each passenger"""
# #     # Query all passengers
# #     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

# #     session.close()

# #     # Create a dictionary from the row data and append to a list of all_passengers
# #     all_passengers = []
# #     for name, age, sex in results:
# #         passenger_dict = {}
# #         passenger_dict["name"] = name
# #         passenger_dict["age"] = age
# #         passenger_dict["sex"] = sex
# #         all_passengers.append(passenger_dict)

# #     return jsonify(all_passengers)


# if __name__ == '__main__':
#     app.run(debug=True)
