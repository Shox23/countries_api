import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import {
  selectAllCountries,
  selectAllCountriesInfo,
  selectVisibleCountries,
} from "../store/countries/selector";
import { loadCountries } from "../store/countries/action";
import { selectAllControls } from "../store/controls/selector";

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {search, region} = useSelector(selectAllControls);
  const countries = useSelector(state => selectVisibleCountries(state, {search, region}));
  const { status, error, qtty } = useSelector(selectAllCountriesInfo);

  useEffect(() => {
    if (!qtty) dispatch(loadCountries());
  }, [qtty, dispatch]);

  return (
    <>
      <Controls />

      {error && <h2>Cant fetch data</h2>}
      {status === "loading" && <h2>Loading...</h2>}
      {status === "received" && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
