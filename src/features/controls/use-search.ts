import { useSelector } from "react-redux";
import { setSearch } from "./controls-slice";
import { selectSearch } from "./controls-selectors";
import { ChangeEventHandler } from "react";
import { useAppDispatch } from "store";

type onSearch = ChangeEventHandler<HTMLInputElement>;

export const useSearch = (): [string, onSearch] => {
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return [search, handleSearch];
};
