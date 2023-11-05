import { useEffect, useReducer } from "react";
import dataController from "../api/dataController";
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

  const refetchData = async () => {
    dispatch({ type: "REQUEST_FILE" });
    try {
      const newFile = await dataController.getFiles(dirname);
      const newParsedData = DataParser(newFile);
      handleDataDispatch(newFile, newParsedData);
    } catch (error) {
      console.error("파일 가져오기 오류:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "REQUEST_FILE" });
      try {
        const file = await dataController.getFiles(dirname);
        const parsedData = DataParser(file);
        handleDataDispatch(file, parsedData);
      } catch (error) {
        console.error("파일 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [dirname]);

  return { file, parseData, isLoading, refetchData };
}