/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from "@/lib/appwrite.config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ID } from "node-appwrite"; // Remove InputFile

// Define the interface for a Patient
export interface Patient {
  id?: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: string;
  address: string;
  occupation?: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string[];
  pastMedicalHistory: string[];
  identificationType: string;
  identificationNumber: string;
  privacyConsent: boolean;
  identificationDocumentId?: string;
  identificationDocumentUrl?: string;
}

const PROJECT_ID = "66f511f000150a99a1bd";
const BUCKET_ID = "66f5174e00274aa87680";
const ENDPOINT = "https://cloud.appwrite.io/v1";

// Interface for the patient state
interface PatientState {
  patient: Patient | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PatientState = {
  patient: null,
  loading: false,
  error: null,
};

// Async thunk for creating a new patient via an API request
export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (
    {
      patient,
      identificationDocument,
    }: { patient: Patient; identificationDocument?: File },
    { rejectWithValue }
  ) => {
    try {
      console.log("bucket id", patient);
      let fileId = null;
      let fileUrl = null;

      // Upload file to Appwrite if a document is provided
      if (identificationDocument) {
        const inputFile = identificationDocument;

        // Create the file in the Appwrite bucket
        const file = await storage.createFile(
          BUCKET_ID!,
          ID.unique(),
          inputFile
        );

        // Get file ID and URL
        fileId = file.$id;
        fileUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;
      }
      // Create a new patient data object with updated identification fields
      const updatedPatientData = {
        ...patient, // Spread the existing patient data
        identificationDocumentId: fileId, // Update the ID
        identificationDocumentUrl: fileUrl, // Update the URL
      };

      console.log("update patient details", updatedPatientData);

      // Make the API request to create the patient, including updated patient details
      const response = await axios.post(
        "http://localhost:3000/patients",
        updatedPatientData
      );

      return response.data;
    } catch (error: any) {
      console.error("An error occurred while creating a new patient:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// The patient slice
const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
    resetPatientState: (state) => {
      state.patient = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle createPatient actions
    builder
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { resetPatientState } = patientSlice.actions;

// Export reducer
export default patientSlice.reducer;
