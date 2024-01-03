/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Title from "../components/AnalyticsTitle/title";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "./analytics.css";
import Display from "../components/dataDispaly/dispaly";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../core/store/index";
import { fetchAnalytics } from "../slices/analytics-slice";
import { analyticsState } from "../slices/analytics-slice";
import { analyticsMedicalRecords } from "../slices/analytics-slice";

interface GenderDistributionData {
  [key: string]: {
    male: number;
    female: number;
  };
}

interface ConvertedDataItem {
  male: number;
  female: number;
  clinic: string;
}
interface ConvertedData {
  data: { value: number; label: string }[];
}
interface analyticsToConvert {
  [key: string]: number;
}

interface ConvertedMedicalItem {
  recordsAdded: number;
  prescriptionsAdded: number;
  medicalHistoryAdded: number;
  clinic: string;
}

function convertMedicalRecordsToDataset(
  medicalRecords: analyticsMedicalRecords
): ConvertedMedicalItem[] {
  const clinics = Object.keys(medicalRecords.recordsAdded);

  return clinics
    .map((clinic) => ({
      recordsAdded: medicalRecords.recordsAdded[clinic],
      prescriptionsAdded: medicalRecords.prescriptionsAdded[clinic],
      medicalHistoryAdded: medicalRecords.medicalHistoryAdded[clinic],
      clinic: `${clinic}`,
    }))
    .filter((item) => item.clinic !== "Total" && item.clinic !== "Average");
}
function convertGenderDistributionToDataset(
  genderDistribution: GenderDistributionData
): ConvertedDataItem[] {
  return Object.entries(genderDistribution)
    .map(([key, data]) => ({
      male: data.male,
      female: data.female,
      clinic: `${key}`,
    }))
    .filter((item) => item.clinic !== "Total" && item.clinic !== "Average");
}
function convertToData(analyticsToConvert: analyticsToConvert): ConvertedData {
  return {
    data: Object.entries(analyticsToConvert)
      ?.map(([key, value]) => ({
        value,
        label: `${key}`,
      }))
      .filter((item) => item.label !== "Total" && item.label !== "Average"),
  };
}

export default function Analytics() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const dispatch = useAppDispatch();
  const analyticsState: analyticsState = useSelector(
    (state: any) => state.analytics
  );
  useEffect(() => {
    dispatch(fetchAnalytics("daily"));
  }, []);

  return (
    <>
      <Title></Title>
      <Box sx={{ borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          onClick={() => {
            console.log(analyticsState);
          }}
        >
          <Tab
            label="Day"
            onClick={() => {
              dispatch(fetchAnalytics("daily"));
            }}
          />
          <Tab
            label="Week"
            onClick={() => {
              dispatch(fetchAnalytics("weekly"));
            }}
          />
          <Tab
            label="Month"
            onClick={() => {
              dispatch(fetchAnalytics("monthly"));
            }}
          />
          <Tab
            label="Year"
            onClick={() => {
              dispatch(fetchAnalytics("yearly"));
            }}
          />
        </Tabs>
      </Box>
      {value === 0 &&
        analyticsState.allAnalytics.analytics?.billing?.totalRevenue && (
          <Display
            TotalRevenueData={convertToData(
              analyticsState.allAnalytics.analytics.billing.totalRevenue
            )}
            TotalAppointmentsData={convertToData(
              analyticsState.allAnalytics.analytics.numberOfAppointments
            )}
            TotalServicesData={convertToData(
              analyticsState.allAnalytics.analytics.numberOfServicesUsed
            )}
            TypesOfRecords={convertMedicalRecordsToDataset(
              analyticsState.allAnalytics.analytics?.medicalRecords
            )}
            GenderDistribution={convertGenderDistributionToDataset(
              analyticsState.allAnalytics.analytics.patientDemographics
                ?.genderDistribution
            )}
          ></Display>
        )}
      {value === 1 && (
        <Display
          TotalRevenueData={convertToData(
            analyticsState.allAnalytics.analytics.billing.totalRevenue
          )}
          TotalAppointmentsData={convertToData(
            analyticsState.allAnalytics.analytics.numberOfAppointments
          )}
          TotalServicesData={convertToData(
            analyticsState.allAnalytics.analytics.numberOfServicesUsed
          )}
          TypesOfRecords={convertMedicalRecordsToDataset(
            analyticsState.allAnalytics.analytics?.medicalRecords
          )}
          GenderDistribution={convertGenderDistributionToDataset(
            analyticsState.allAnalytics.analytics.patientDemographics
              ?.genderDistribution
          )}
        ></Display>
      )}
      {value === 2 && (
        <Display
          TotalRevenueData={convertToData(
            analyticsState.allAnalytics.analytics.billing.totalRevenue
          )}
          TotalAppointmentsData={convertToData(
            analyticsState.allAnalytics.analytics.numberOfAppointments
          )}
          TotalServicesData={convertToData(
            analyticsState.allAnalytics.analytics.numberOfServicesUsed
          )}
          TypesOfRecords={convertMedicalRecordsToDataset(
            analyticsState.allAnalytics.analytics?.medicalRecords
          )}
          GenderDistribution={convertGenderDistributionToDataset(
            analyticsState.allAnalytics.analytics.patientDemographics
              ?.genderDistribution
          )}
        ></Display>
      )}
      {value === 3 && (
        <Display
          TotalRevenueData={convertToData(
            analyticsState.allAnalytics.analytics.billing.totalRevenue
          )}
          TotalAppointmentsData={convertToData(
            analyticsState.allAnalytics.analytics.numberOfAppointments
          )}
          TotalServicesData={convertToData(
            analyticsState.allAnalytics.analytics.numberOfServicesUsed
          )}
          TypesOfRecords={convertMedicalRecordsToDataset(
            analyticsState.allAnalytics.analytics?.medicalRecords
          )}
          GenderDistribution={convertGenderDistributionToDataset(
            analyticsState.allAnalytics.analytics.patientDemographics
              ?.genderDistribution
          )}
        ></Display>
      )}
    </>
  );
}
