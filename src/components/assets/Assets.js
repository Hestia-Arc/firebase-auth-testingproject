import React, { useState } from "react";

function Assets() {
  const [options, setOptions] = useState(["gold", "weapon", "respect"]);
  const [optionSelected, setOptionSelected] = useState([]);

  

  function assetHandler(e) {
    if (!optionSelected.includes(e.target.value)) {
      setOptionSelected((optionSelected) => [
        ...optionSelected,
        e.target.value,
      ]);
    }

    console.log("already selected");
  }

  // function filtering() {
  //   const filteredOption = options.filter(
  //     (option) => !optionSelected.includes(option)
  //   );

  //   return filteredOption;
  // }

  // function checkOption(option) {
  //   return option;
  // }

  return (
    <div>
      <select id="assets" onChange={assetHandler}>
        <option>please select an asset </option>
        {options.map((option) => (
          <option value={option} disabled={optionSelected.includes(option)}>
            {option}
          </option>
        ))}
      </select>

      <div>
        <select id="assets" onChange={assetHandler}>
          <option>please select an asset </option>
          {options.map((option) => (
            <option value={option} disabled={optionSelected.includes(option)}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>{optionSelected}</div>
    </div>
  );
}

export default Assets;
