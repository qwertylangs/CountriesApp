import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Country, Extra, Status } from "types";

export const loadCountryByName = createAsyncThunk<
  Country[],
  string,
  { extra: Extra }
>(
  "@@details/load-country-by-name",
  async (name, { extra: { client, api } }) => {
    const { data } = (await client.get(
      api.searchByCountry(name)
    )) as AxiosResponse<Country[]>;

    if (data[0].name === "Belarus") {
      data[0].flag = "https://clck.ru/34S2x3";
    }
    return data;
  }
);

export const loadNeighborsByBorder = createAsyncThunk<
  { data: Country[] },
  string[],
  { extra: Extra }
>("@@details/load-neighbors", (borders, { extra: { client, api } }) => {
  return client.get(api.filterByCode(borders));
});

type DetailsSlice = {
  currentCountry: Country | null;
  neighbors: string[];
  status: Status;
  error: string | null;
};

const initialState: DetailsSlice = {
  currentCountry: null,
  neighbors: [],
  status: "idle",
  error: null,
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state) => {
        state.status = "rejected";
        state.error = "cannot  load country";
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentCountry = action.payload[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map((country) => country.name);
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
