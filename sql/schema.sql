-- creating table in energy_db
--drop table if the table with name energy already exists.
drop table if exists "energy"

--creating table with name "energy"
--more columns can be added after dataframe is final
create table "energy" (
	"state" varchar primary key,
	"population" integer,
	"total_energy_consumed_gwh" float,
	"total_energy_potential_gwh" float,
	"energy_excess_capacity" float,
	"solar_potential_gwh" float,
	"wind_potential_gwh"  float,
	"biopower_potential_gwh"  float,
	"geothermal_potential_gwh"  float,
	"hydropower_potential_gwh"  float

);

select * from "energy";

