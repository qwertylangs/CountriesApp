import { useSelector, useDispatch } from "react-redux";

import { setRegion } from "./controls-slice";
import { CountryOption } from "./CustomSelect";
import { useAppDispatch } from "store";
import { selectRegion } from "./controls-selectors";
import { Region } from "types";
import { SingleValue } from "react-select";

type handleSelect = (reg: SingleValue<CountryOption>) => void;

export const useRegion = (): [Region | "", handleSelect] => {
  const dispatch = useAppDispatch();
  const region = useSelector(selectRegion);

  const handleSelect: handleSelect = (reg) => {
    if (reg) {
      dispatch(setRegion(reg.value || ""));
    } else {
      dispatch(setRegion(""));
    }
  };

  return [region, handleSelect];
};
