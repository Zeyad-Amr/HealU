import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../clinics-portals/orthopedic/slices/combineReducers";
import styles from "./form.module.css";
import classes from "../../../clinics-portals/orthopedic/components/form/addSlotForm.module.css";
import { TextField, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles"; // Add this import
import { editDoctor, getDoctors } from "../../slices/doctor-slice";
import { addDoctor } from "../../slices/doctor-slice";
import { MouseEvent, FormEvent } from "react";
import { formActions } from "../../slices/form-slice";
import ButtonComponent from "../../../clinics-portals/orthopedic/components/button/button";
import CloseIcon from "@mui/icons-material/Close";

// import { handleEdit } from "../table/table";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const specialties: string[] = [
  " ",
  "Dental",
  "Nutrition",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
];

const gender: string[] = [" ", "Male", "Female"];

const clinics = [
  { clinicName: "Dental", clinicId: 13 },
  { clinicName: "Nutrition", clinicId: 14 },
  { clinicName: "Ophthalmology", clinicId: 15 },
  { clinicName: "Orthopedics", clinicId: 16 },
  { clinicName: "Pediatrics", clinicId: 17 },
];

const formStyles = makeStyles({
  menuItem: {
    fontSize: "20px",
    fontFamily: "Roboto",
    backgroundColor: "#f5f5f5",
    fontColor: "#000000",
  },
  textElement: {
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  },
});

interface FormProps {
  formTitle?: string;
}

export const AddForm: React.FC<FormProps> = ({ formTitle }) => {
  const dispatch = useDispatch();
  const classesUI = formStyles();
  const isVisible = useSelector((state: any) => state.rootReducer.form.isFormVisible);
  const isEditForm = useSelector((state: any) => state.rootReducer.form.isEdit);
  const editedDoctor = useSelector(
    (state: any) => state.rootReducer.form.editedDoctor
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
    email: "",
    phoneNumber: "",
    specialization: "",
  });

  useEffect(() => {
    if (isEditForm && editedDoctor) {
      setLocalFormState({
        ssn: editedDoctor.ssn || "",
        firstName: editedDoctor.firstName || "",
        lastName: editedDoctor.lastName || "",
        email: editedDoctor.email || "",
        phoneNumber: editedDoctor.phoneNumber || "",
        gender: editedDoctor.gender || gender[0],
        specialization: editedDoctor.specialization || specialties[0],
        dateOfBirth: editedDoctor.dateOfBirth || "",
        userName: editedDoctor.userName || "",
        password: editedDoctor.password || "",
      });
    } else {
      setLocalFormState({
        ssn: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: gender[0],
        specialization: specialties[0],
        dateOfBirth: "",
        userName: "",
        password: "",
      });
    }
  }, [isEditForm, editedDoctor]);

  const [localErrors, setLocalErrors] = useState({
    errorEmail: "",
    errorFirstName: "",
    errorLastName: "",
    errorUserName: "",
    errorPhone: "",
    errorSpeciality: "",
    errorPassword: "",
    errorDateOfBirth: "",
    errorGender: "",
    errorSSN: "",
  });

  const isFormVisible = useSelector(
    (state: any) => state.rootReducer.form.isFormVisible
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

  const validateGender = (inputData: string) => {
    if (!inputData) {
      localErrors.errorGender = "Please select a Gender";
    } else {
      setLocalFormState({ ...localFormState, gender: inputData }) as any;
      setLocalErrors({
        ...localErrors,
        errorGender: localErrors.errorGender,
      }) as any;
    }
  };

  const validateSSN = (inputData: string) => {
    const ssnFormat = /^\d{14}$/;
    if (inputData.length === 14 && ssnFormat.test(inputData))
      localErrors.errorSSN = "";
    else {
      localErrors.errorSSN = "SSN is incorrect";
    }
    setLocalFormState({ ...localFormState, ssn: inputData }) as any;
    setLocalErrors({ ...localErrors, errorSSN: localErrors.errorSSN }) as any;
  };

  const validateName = (inputData: string, nameFlag: number, error: string) => {
    if (inputData.length < 3) {
      error = "Name should be at least 3 characters";
    } else if (inputData.length > 20) {
      error = "Name should be at most 20 characters";
    } else if (!/^[a-zA-Z ]+$/.test(inputData) && nameFlag !== 3) {
      error = "Name must be characters";
    } else {
      error = "";
    }
    if (nameFlag === 1) {
      setLocalFormState({ ...localFormState, firstName: inputData }) as any;
      setLocalErrors({ ...localErrors, errorFirstName: error }) as any;
    } else if (nameFlag === 2) {
      setLocalFormState({ ...localFormState, lastName: inputData }) as any;
      setLocalErrors({ ...localErrors, errorLastName: error }) as any;
    } else {
      setLocalFormState({ ...localFormState, userName: inputData }) as any;
      setLocalErrors({ ...localErrors, errorUserName: error }) as any;
    }
  };

  const validatePassword = (inputData: string) => {
    if (inputData.length < 4) {
      localErrors.errorPassword =
        "Make sure that your password contain more than 4 charecters.";
    } else {
      localErrors.errorPassword = "";
    }

    setLocalFormState({ ...localFormState, password: inputData }) as any;
    setLocalErrors({
      ...localErrors,
      errorPassword: localErrors.errorPassword,
    }) as any;
  };

  const validateDateOfBirth = (inputData: string) => {
    const dateFormatPattern =
      /^(?!0000)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!dateFormatPattern.test(inputData)) {
      localErrors.errorDateOfBirth =
        "Check that you entered the right birthdate and in this format: YYYY-MM-DD";
    } else {
      localErrors.errorDateOfBirth = "";
    }
    setLocalErrors({
      ...localErrors,
      errorDateOfBirth: localErrors.errorDateOfBirth,
    }) as any;
    setLocalFormState({ ...localFormState, dateOfBirth: inputData }) as any;
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
    // /^[^\s@]+@[^\s@]+\.com$/
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
      gender: localFormState.gender,
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
      !localErrors.errorFirstName &&
      !localErrors.errorLastName &&
      !localErrors.errorUserName &&
      !localErrors.errorPhone &&
      !localErrors.errorSpeciality &&
      !localErrors.errorDateOfBirth &&
      !localErrors.errorGender &&
      !localErrors.errorPassword &&
      !localErrors.errorSSN &&
      data.firstName &&
      data.lastName &&
      data.phoneNumber &&
      data.specialization &&
      data.email &&
      data.userName &&
      data.password &&
      data.ssn &&
      data.gender &&
      data.dateOfBirth
    ) {
      try {
        if (isEditForm) {
          if (editedDoctor) {
            await dispatch(
              editDoctor({
                doctorId: editedDoctor.userId,
                updatedData: {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  specialization: data.specialization,
                  phoneNumber: data.phoneNumber,
                  email: data.email,
                  userName: data.userName,
                  password: data.password,
                  dateOfBirth: data.dateOfBirth,
                  ssn: data.ssn,
                  role: "Doctor",
                },
              }) as any
            );
          }
          dispatch(formActions.setFormVisibility(!isVisible));
          dispatch(formActions.setIsEdit(!isEditForm));
        } else {
          const resultAction = await dispatch(addDoctor(data) as any);
          await dispatch(getDoctors() as any);
          // console.log(resultAction);
          // // Check if the action returned an error
          // if (resultAction.payload===undefined) {
          //   // Handle the error, if needed
          //   console.log("Error adding doctor:", resultAction.error);
          // } else {
          //   // Handle the success case, if needed
          //   console.log("Doctor added successfully");
          //   await dispatch(getDoctors() as any);
          // }

          dispatch(formActions.setFormVisibility(!isVisible));
        }
      } catch (error) {
        console.log("erorrrrrrrrrr", error);
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
      case "firstName":
        validateName(inputData, 1, nameCheck);
        break;
      case "lastName":
        validateName(inputData, 2, nameCheck);
        break;
      case "userName":
        validateName(inputData, 3, nameCheck);
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
        break;
      case "password":
        validatePassword(inputData);
        console.log(inputData);
        break;
      case "dateOfBirth":
        validateDateOfBirth(inputData);
        console.log(inputData);
        break;
      case "gender":
        validateGender(inputData);
        console.log(inputData);
        break;
      case "SSN":
        validateSSN(inputData);
        break;
    }
  };

  return (
    <div>
      {isFormVisible && (
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <div className={styles.closeIcon}>
              <CloseIcon
                onClick={() => {
                  dispatch(formActions.setFormVisibility(!isVisible));
                  dispatch(formActions.setIsEdit(!isEditForm));
                }}
              />
            </div>
            <h2 className={classes.textElement}>{formTitle}</h2>

            <div className={styles.formRow}>
              <div className={styles.column}>
                <label className={styles.labelElement}>First Name</label>
                <TextField
                  value={localFormState.firstName || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChange(e, "firstName");
                  }}
                />
                {localErrors.errorFirstName && (
                  <label className={styles.errorLabel}>
                    {localErrors.errorFirstName}
                  </label>
                )}
              </div>

              <div className={styles.column}>
                <label className={styles.labelElement}>Last Name</label>
                <TextField
                  value={localFormState.lastName || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChange(e, "lastName");
                  }}
                />
                {localErrors.errorLastName && (
                  <label className={styles.errorLabel}>
                    {localErrors.errorLastName}
                  </label>
                )}
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
                  value={localFormState.email || ""}
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
                <TextField
                  value={localFormState.dateOfBirth || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChange(e, "dateOfBirth");
                  }}
                />
                {localErrors.errorDateOfBirth && (
                  <label className={styles.errorLabel}>
                    {localErrors.errorDateOfBirth}
                  </label>
                )}
              </div>

              <div className={styles.column}>
                <label className={styles.labelElement}>User Name</label>
                <TextField
                  value={localFormState.userName || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChange(e, "userName");
                  }}
                />
                {localErrors.errorUserName && (
                  <label className={styles.errorLabel}>
                    {localErrors.errorUserName}
                  </label>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.column}>
                <label className={styles.labelElement}>Password</label>
                <div style={{ display: "flex" }}>
                  <TextField
                    value={localFormState.password || ""}
                    type={visible ? "text " : "password"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleOnChange(e, "password");
                      setPassword(e.target.value);
                    }}
                  />
                  <div onClick={() => setvisible(!visible)}>
                    {/* {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />} */}
                  </div>
                </div>
                {localErrors.errorPassword && (
                  <label className={styles.errorLabel}>
                    {localErrors.errorPassword}
                  </label>
                )}
              </div>
              <div className={styles.column}>
                <label className={styles.labelElement}>SSN</label>
                <TextField
                  value={localFormState.ssn || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleOnChange(e, "SSN");
                  }}
                />
                {localErrors.errorSSN && (
                  <label className={styles.errorLabel}>
                    {localErrors.errorSSN}
                  </label>
                )}
              </div>
            </div>

            {/* <div className={styles.column}>
              <label className={styles.labelElement}>Gender</label>
              <TextField value={localFormState.gender || ""} />
            </div> */}
            <div className={styles.formRow}>
              <label className={styles.labelElement}>Gender </label>
              <TextField
                className={styles.specialtyField}
                select
                classes={{ root: classesUI.menuItem }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleOnChange(e, "gender");
                }}
                value={localFormState.gender || ""}
              >
                {gender.map((gender, index) => (
                  <MenuItem
                    key={index}
                    value={gender || " "}
                    className={classesUI.menuItem}
                  >
                    {gender}
                  </MenuItem>
                ))}
              </TextField>
              {localErrors.errorGender && (
                <label className={styles.errorLabel}>
                  {localErrors.errorGender}
                </label>
              )}
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
                value={localFormState.specialization || ""}
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
                color="white"
                fontSize="32px"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddForm;
