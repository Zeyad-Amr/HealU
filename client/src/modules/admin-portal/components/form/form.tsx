import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../clinics-portals/orthopedic/slices/combineReducers";
import styles from "./form.module.css";
import classes from "../../../clinics-portals/orthopedic/components/form/addSlotForm.module.css";
import { TextField, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles"; // Add this import
import { doctorSliceActions, editDoctor } from "../../slices/doctor-slice";
import { addDoctor } from "../../slices/doctor-slice";
import { useRef } from "react";
import { MouseEvent, FormEvent } from "react";
import { formActions } from "../../slices/form-slice";
import { FormState } from "../../slices/form-slice";
import ButtonComponent from "../../../clinics-portals/orthopedic/components/button/button";
import { stat } from "fs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Input from "react-select/dist/declarations/src/components/Input";


// import { handleEdit } from "../table/table";

const specialties: string[] = [
  " ",
  "Orthopedic",
  "Cardiologist",
  "Dentist",
  "Neurologist",
];

const clinics = [
  { clinicName: "Orthopedic", clinicId: 1 },
  { clinicName: "Cardiologist", clinicId: 2 },
  { clinicName: "Dentist", clinicId: 3 },
  { clinicName: "Neurologist", clinicId: 4 },
];

const formStyles = makeStyles({
  menuItem: {
    fontSize: "20px",
    fontFamily: "Roboto",
    backgroundColor: "#f5f5f5",
  },
  textElement: {
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  },
});

interface FormProps {
  formTitle: string;
}

export const AddForm: React.FC<FormProps> = ({ formTitle }) => {
  const dispatch = useDispatch();
  const classesUI = formStyles();
  const isVisible = useSelector((state: RootState) => state.form.isFormVisible);
  const isEditForm = useSelector((state: RootState) => state.form.isEdit);
  const editedDoctor = useSelector(
    (state: RootState) => state.form.editedDoctor
  );
  const [password, setPassword] = useState("");
  const [visible, setvisible] = useState(true);
  const [localFormState, setLocalFormState] = useState({
    ssn: "",
    firstName: "",
    lastName: "",
    dateOfBirth: " ",
    gender: "",
    userName: "",
    password: "",
    // clinicId: NaN,
    email: " ",
    phoneNumber: "",
    specialization: "",  
  });
  useEffect(() => {
    // Update localFormState if editedDoctor is available
    if (isEditForm && editedDoctor) {
      setLocalFormState({
        ssn: editedDoctor.ssn || "",
        firstName: editedDoctor.firstName || "",
        lastName: editedDoctor.lastName || "",
        email: editedDoctor.email || "",
        phoneNumber: editedDoctor.phoneNumber || "",
        gender: editedDoctor.gender || "",
        specialization: editedDoctor.specialization || specialties[0],
        dateOfBirth: editedDoctor.dateOfBirth || "",
        userName: editedDoctor.userName || "",
        password: editedDoctor.password || "",
        
        // clinicId: editedDoctor.clinicId,
      });
    } else {
      // Reset localFormState to default values
      setLocalFormState({
        ssn: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        specialization: specialties[0],
        dateOfBirth: "",
        userName: "",
        password: "",
        // clinicId: "",
      });
    }
  }, [isEditForm, editedDoctor]);

  const [localErrors, setLocalErrors] = useState({
    errorEmail: "",
    errorName: "",
    errorPhone: "",
    errorSpeciality: "",
  });

  const isFormVisible = useSelector(
    (state: RootState) => state.form.isFormVisible
  );

  
  const selectedClinic = clinics.find(
    (clinic) => clinic.clinicName === localFormState.specialization
  );
  const validateSpeciality = (inputData: string) => {
    if (!inputData) {
      localErrors.errorSpeciality = "Please select a speciality";
    } else {
      setLocalFormState({
        ...localFormState,
        specialization: inputData,
      }) as any;
      setLocalErrors({
        ...localErrors,
        errorSpeciality: localErrors.errorSpeciality,
      }) as any;
    }
  };

  const validateName = (inputData: string) => {
    if (inputData.length < 3) {
      localErrors.errorName = "Name should be at least 3 characters";
    } else if (inputData.length > 20) {
      localErrors.errorName = "Name should be at most 20 characters";
    } else if (!/^[a-zA-Z ]+$/.test(inputData)) {
      localErrors.errorName = "Name must be characters";
    } else {
      localErrors.errorName = "";
    }
    setLocalFormState({ ...localFormState, firstName: inputData }) as any;

    setLocalErrors({
      ...localErrors,
      errorName: localErrors.errorName,
    }) as any;
  };

  const validateNumber = (inputData: string) => {
    if (inputData.length < 10) {
      localErrors.errorPhone = "Phone Number Must be of 10 digits";
    } else if (/[a-zA-Z]/.test(inputData)) {
      localErrors.errorPhone = "Phone Number can't be characters";
    } else {
      localErrors.errorPhone = "";
    }

    setLocalErrors({
      ...localErrors,
      errorPhone: localErrors.errorPhone,
    }) as any;

    setLocalFormState({ ...localFormState, phoneNumber: inputData });
  };

  const validateEmail = (inputData: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputData)) {
      localErrors.errorEmail = "Invalid email format";
    } else {
      localErrors.errorEmail = "";
    }
    setLocalErrors({
      ...localErrors,
      errorEmail: localErrors.errorEmail,
    }) as any;
    setLocalFormState({ ...localFormState, email: inputData }) as any;
  };

  const handleOnSubmit = async (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const data = {
      ssn: localFormState.ssn,
      firstName: localFormState.firstName,
      gender: localFormState.firstName,
      lastName: localFormState.lastName,
      specialization: localFormState.specialization,
      phoneNumber: localFormState.phoneNumber,
      email: localFormState.email,
      userName: localFormState.userName,
      password: localFormState.password,
      dateOfBirth: localFormState.dateOfBirth,
      role: "Doctor",
      clinicId: selectedClinic?.clinicId,
    };
    if (
      !localErrors.errorEmail &&
      !localErrors.errorName &&
      !localErrors.errorPhone &&
      !localErrors.errorSpeciality &&
      data.firstName &&
      data.lastName &&
      data.phoneNumber &&
      data.specialization &&
      data.email &&
      data.userName &&
      data.password &&
      data.dateOfBirth
    ) {
      try {
        if (isEditForm) {
          if (editedDoctor) {
            await dispatch(
              editDoctor({
                doctorId: editedDoctor.ssn,
                updatedData: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  specialization: data.specialization,
                  phoneNumber: data.phoneNumber,
                  email: data.email,
                  userName: data.userName,
                  password: data.password,
                  dateOfBirth: data.dateOfBirth,
                  role: "Doctor",
                },
              }) as any
            );
          }
          dispatch(formActions.setFormVisibility(!isVisible));
          dispatch(formActions.setIsEdit(!isEditForm));
        } else {
          await dispatch(addDoctor(data) as any);
          dispatch(formActions.setFormVisibility(!isVisible));
        }
      } catch (error) {
        console.error("Error while dispatching editDoctor/addDoctor:", error);
      }
    } else {
      alert("Please fill all the fields correctly");
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nameCheck: string
  ) => {
    const inputData = e.target.value;
    switch (nameCheck) {
      case "name":
        validateName(inputData);
        break;
      case "phone":
        validateNumber(inputData);
        console.log(inputData);
        break;
      case "email":
        validateEmail(inputData);
        break;
      case "speciality":
        validateSpeciality(inputData);
        console.log(inputData);
    }
  };

  return (
    isFormVisible && (
      <div className={styles.formContainer}>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <h2 className={classes.textElement}>{formTitle}</h2>

          <div className={styles.formRow}>
            <div className={styles.column}>
              <label className={styles.labelElement}>First Name</label>
              <TextField
                value={localFormState.firstName || " "}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleOnChange(e, "name");
                }}
              />
              {localErrors.errorName && (
                <label className={styles.errorLabel}>
                  {localErrors.errorName}
                </label>
              )}
            </div>

            <div className={styles.column}>
              <label className={styles.labelElement}>Last Name</label>
              <TextField value={localFormState.lastName || " "} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.column}>
              <label className={styles.labelElement}>Phone</label>
              <TextField
                value={localFormState.phoneNumber || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleOnChange(e, "phone");
                }}
              />
              {localErrors.errorPhone && (
                <label className={styles.errorLabel}>
                  {localErrors.errorPhone}
                </label>
              )}
            </div>
            <div className={styles.column}>
              <label className={styles.labelElement}>Email</label>
              <TextField
                value={localFormState.email || " "}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleOnChange(e, "email");
                }}
              />
              {localErrors.errorEmail && (
                <label className={styles.errorLabel}>
                  {localErrors.errorEmail}
                </label>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.column}>
              <label className={styles.labelElement}>Date of Birth</label>
              <TextField value={localFormState.dateOfBirth || " "} />
            </div>

            <div className={styles.column}>
              <label className={styles.labelElement}>User Name</label>
              <TextField value={localFormState.userName || " "} />
            </div>
          </div>

          <div className={styles.formRow}>
              <div className={styles.column}>
                <label className={styles.labelElement}>Password</label>
                <TextField 
                value= {localFormState.password}
                type = {visible? "text ": "password"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword (e.target.value)}}   />
              </div>

          <div className={styles.column}>
              <label className={styles.labelElement}>Gender</label>
              <TextField value={localFormState.gender || " "} />
            </div>
          </div>
          <div className={styles.formRow}>
            <label className={styles.labelElement}>Specialty</label>
            <TextField
              className={styles.specialtyField}
              select
              classes={{ root: classesUI.menuItem }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleOnChange(e, "speciality");
              }}
              value={localFormState.specialization || " "}
            >
              {specialties.map((specialty, index) => (
                <MenuItem
                  key={index}
                  value={specialty || " "}
                  className={classesUI.menuItem}
                >
                  {specialty}
                </MenuItem>
              ))}
            </TextField>
            {localErrors.errorSpeciality && (
              <label className={styles.errorLabel}>
                {localErrors.errorSpeciality}
              </label>
            )}
          </div>
          <div className={styles.submitButton}>
            <ButtonComponent
              type="submit"
              text="Submit"
              classStyle="ButtonComponent"
            />
          </div>
        </form>
      </div>
    )
  );
};

export default AddForm;
