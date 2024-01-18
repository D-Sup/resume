import { useEffect, useReducer } from "react";
import dataHandler from "../api/dataHandler";
import DataParser from "../utils/DataParser";

function mdFileReducer(state, action) {
  switch (action.type) {
    case "REQUEST_FILE":
      return { ...state, isLoading: true };
    case "LOADING":
      return { ...state, file: action.file, parseData: action.parseData, isLoading: false };
    default:
      return state;
  }
}

export default function useFetchData(dirname) {

  const [{ file, parseData, isLoading }, dispatch] = useReducer(mdFileReducer, {
    file: null,
    parseData: null,
    isLoading: true,
  });

  const handleDataDispatch = (file, parsedData) => {
    dispatch({
      type: "LOADING",
      file: file,
      parseData: parsedData
    });
  }

  const fetchData = async () => {
    dispatch({ type: "REQUEST_FILE" });
    try {
      const file = await dataHandler.getFiles(dirname);
      const parsedData = DataParser(file);
      handleDataDispatch(file, parsedData);
    } catch (error) {
      console.error("파일 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dirname]);

  const refetchData = fetchData;

  return { file, parseData, isLoading, refetchData };
}