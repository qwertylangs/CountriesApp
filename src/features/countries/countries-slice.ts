import { Extra } from "types";
import { Country } from "./../../types/country";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

export const loadCountries = createAsyncThunk<
  Country[],
  undefined,
  { extra: Extra; state: { countries: CountrySlice }; rejectValue: string }
>(
  "@@countries/load-countries",
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      const { data } = (await client.get(api.ALL_COUNTRIES)) as AxiosResponse<
        Country[]
      >;
      return data.map((country) => {
        if (country.name === "Belarus") {
          country.flags.png = "https://clck.ru/34S2x3";
        }
        return country;
      });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        countries: { status },
      } = getState();

      if (status === "loading") {
        return false;
      }
    },
  }
);

type CountrySlice = {
  status: "idle" | "loading" | "received" | "rejected";
  error: string | null;
  list: Country[];
};

const initialState: CountrySlice = {
  status: "idle",
  error: null,
  list: [],
};

const countrySlice = createSlice({
  name: "@@countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Unknown error";
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = "received";
        state.list = action.payload;
      });
  },
});

export const countryReducer = countrySlice.reducer;
