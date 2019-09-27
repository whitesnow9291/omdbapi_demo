import React from 'react';

import Select from 'react-select';

const customStyles = {
    control: styles => ({
        ...styles,
        // This line disable the blue border
        boxShadow: "0 !important",
        borderColor: "lightgray",
        "&:hover": {
            borderColor: "gray"
        }
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        backgroundColor: 'lightgray',
        "&:hover": {
            color: 'white',
            backgroundColor: 'lightgray',
        }
    })
}


export default (props) => (
    <Select
        styles={customStyles}
        {...props}
    />
);