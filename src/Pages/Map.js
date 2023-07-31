import { useState, useMemo, useEffect, useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxListbox,
} from "@reach-ui-fork/combobox";
import "@reach-ui-fork/combobox/styles.css";
import KindergartensContext from "../Context/ContextKinder";


export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBgRiwSQWAPRczno7mLA23gRA8J02uiR-U",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [mapCenter, setMapCenter] = useState({ lat: 44.79, lng: 20.45 });
  const [mapZoom, setMapZoom] = useState(11);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      setMapCenter(selected);
      setMapZoom(15);
    }
  }, [selected]);

  return (
    <>

      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={mapZoom}
        center={mapCenter}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const { kindergartens } = useContext(KindergartensContext)
  const addresKinder = kindergartens.map(kinder => kinder.address)
  const street = addresKinder.map(address => (address.street))


  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (

    <Combobox onSelect={handleSelect}>
      
      <ComboboxInput
        value={value}
        options={street}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            street.map((address) => (
              <ComboboxOption key={address} value={address} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>


  );
};