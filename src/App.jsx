import { useState, useEffect } from "react";
import { countries } from "./countries";

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [time, setTime] = useState("");

  // Actualizar hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      const options = {
        timeZone: selectedCountry.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCountry]);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>World Clocks</h1>

      {/* Menú de países */}
      <select
        value={selectedCountry.name}
        onChange={(e) =>
          setSelectedCountry(
            countries.find((c) => c.name === e.target.value)
          )
        }
        style={{ padding: 10, fontSize: 16 }}
      >
        {countries.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>

      {/* Reloj grande */}
      <h2 style={{ fontSize: 60, marginTop: 40 }}>{time}</h2>
      <p style={{ fontSize: 20 }}>{selectedCountry.name}</p>
    </div>
  );
}
