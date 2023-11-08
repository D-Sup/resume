import styled from "styled-components"

export default function EditDataPage({ fileData, setFileData }) {
  const handleChange = (event) => {
    setFileData(event.target.value)
  }
  
  return (
    <TextArea onChange={handleChange} value={fileData}>{fileData}</TextArea>
  )
}

const TextArea = styled.textarea`
  width: 100%;
  height: 80vh;
  resize: none
`;