import React, { useState } from "react";

const CustomMultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const initialData = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    if (inputValue.trim() !== "") {
      setSelectedOptions([...selectedOptions, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
  };

  const handleRemoveAllOptions = () => {
    setSelectedOptions([]);
  };

  return (
    <div>
      <div>
        {initialData.map((option, index) => (
          <div key={index}>
            <span>{option}</span>
            <button onClick={() => handleRemoveOption(option)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        {selectedOptions.map((option, index) => (
          <div key={index}>
            <span>{option}</span>
            <button onClick={() => handleRemoveOption(option)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type and press Add to select"
        />
        <button onClick={handleAddOption}>Add</button>
        <button onClick={handleRemoveAllOptions}>Remove All</button>
      </div>
    </div>
  );
};

export default CustomMultiSelect;
