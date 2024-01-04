import React, {useState} from "react";
import {FormControl, Select, MenuItem, Chip} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {SelectChangeEvent} from "@mui/material/Select";


interface DropdownProps {
    options: { value: string; label: string }[];
    optionChangeHandler?: (event: any) => void;
    optionDeleteHandler?: (option: any) => void;
    selectedOptions?: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
                                               options,
                                               optionChangeHandler ,
                                               optionDeleteHandler,
                                               selectedOptions }) => {


    const renderSelectedOptions = (selected: string[]) => {
        return (
            <div>
                {selected.map((option) => (
                    <Chip
                        key={option}
                        label={option}
                        onDelete={() => optionDeleteHandler ? optionDeleteHandler(option!) : null }
                        deleteIcon={
                            <CancelIcon onClick={() => optionDeleteHandler ? optionDeleteHandler(option) : null}/>
                        }
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <FormControl fullWidth>
                <Select
                    id="frameworks"
                    multiple
                    value={selectedOptions}
                    onChange={optionChangeHandler}
                    renderValue={renderSelectedOptions}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Dropdown;
