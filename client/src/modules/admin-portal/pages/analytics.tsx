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
import { TotalRevenue } from "../slices/analytics-slice";
import { on } from "events";

const dataset = [
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 1",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 2",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 3",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 4",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 5",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 6",
  },
];

interface ConvertedData {
  data: { value: number; label: string }[];
}
interface analyticsToConvert {
  [key: string]: number;
}

function convertToData(analyticsToConvert: analyticsToConvert): ConvertedData {
  return {
    data: Object.entries(analyticsToConvert)
      ?.map(([key, value]) => ({
        value,
        label: `Clinic ${key}`,
      }))
      .filter(
        (item) =>
          item.label !== "Clinic total" &&
          item.label !== "Clinic averageAllClinics"
      ),
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
            TotalRecordsData={convertToData(
              analyticsState.allAnalytics.analytics.medicalRecords
                .medicalHistoryAdded
            )}
            TypesOfRecords={dataset}
            GenderDistribution={dataset}
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
          TotalRecordsData={convertToData(
            analyticsState.allAnalytics.analytics.medicalRecords
              .medicalHistoryAdded
          )}
          TypesOfRecords={dataset}
          GenderDistribution={dataset}
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
          TotalRecordsData={convertToData(
            analyticsState.allAnalytics.analytics.medicalRecords
              .medicalHistoryAdded
          )}
          TypesOfRecords={dataset}
          GenderDistribution={dataset}
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
          TotalRecordsData={convertToData(
            analyticsState.allAnalytics.analytics.medicalRecords
              .medicalHistoryAdded
          )}
          TypesOfRecords={dataset}
          GenderDistribution={dataset}
        ></Display>
      )}
    </>
  );
}
