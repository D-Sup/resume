## 아키텍처

![Architecture](https://github.com/user-attachments/assets/fc663f56-ec6e-4ce1-96f0-6437cca1950b)

<br/>

## 구현 내용

### 1. 프로젝트 규모에 적합한 서버리스 API 환경 구성

> `AWS Lambda` 와 `API GateWay` 를 통해 `S3` 에 저장된 Markdown 파일을 불러와 사용 가능하도록 서버리스 API 환경을 구성했습니다.
> 
> 해당 서버리스 환경은 사용량에 따라 비용을 지불하므로 초기 투자 부담이 없고,   
> 트래픽이 변동해도 자동으로 확장되는 유연성을 제공합니다.  
>
> 또한, API Gateway를 통해 간단하게 API 관리를 할 수 있고,    
> S3와의 연동으로 대용량 데이터를 효율적으로 처리할 수 있다는 점을 고려했습니다.

---

### 2. 효율적인 파일 관리

> DataHandler Class를 만들어 환경 변수 기반의 URL 설정을 활용하여 S3에 저장된 Markdown 파일을 불러오고 수정할 수 있는 메서드를 구현했습니다.

```js
class DataHandler {
  constructor() {
    this.BASE_URL = process.env.REACT_APP_BASE_URL;
    this.END_POINT = process.env.REACT_APP_END_POINT;
  }

  async getFiles(folderName) {
    try {
      const response = await fetch(
        `${this.BASE_URL}${this.END_POINT}?name=${folderName}.md`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("파일을 가져올 수 없습니다.");
      }

      const data = await response.json();

      return data.content;
    } catch (error) {
      console.error("파일 가져오기 실패:", error);
    }
  }

  async putFile(fileName, fileContent) {
    try {
      const response = await fetch(
        `${this.BASE_URL}${this.END_POINT}?name=${fileName}.md`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "text/plain",
          },
          body: fileContent,
        }
      );

      if (response.ok) {
        return response.json();
      } else {
        throw new Error("파일을 업로드할 수 없습니다.");
      }
    } catch (error) {
      console.error("파일 업로드 실패:", error);
    }
  }
}

const dataHandler = new DataHandler();

export default dataHandler;
```

---

### 3. 파일 로딩 상태 관리 최적화

> React에서 제공하는 `useReducer Hooks` 를 활용하여 서버 상태를 관리했습니다.
> 
> reducer 함수는 두 가지 액션인 REQUEST_FILE 과 LOADING 을 처리하며,   
> 각각 파일 요청 시작과 파일 로딩 완료 상태를 나타냅니다.
> 
> `isLoading` - 파일 로딩 중인지 여부를 관리합니다.  
> `parseData` - 파싱된 데이터를 저장하여 레이아웃 컴포넌트에서 해당 데이터를 렌더링 하는데 활용할 수 있습니다.  
> `file` - 원본 파일의 데이터를 저장하여 S3에 저장된 Markdown 파일을 수정할 때 활용할 수 있습니다.

```js
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
```

---

### 4. 데이터 구조화를 위한 파싱 함수 구현

> S3에 저장된 Markdown 파일의 데이터를 줄 단위로 파싱하고,   
> 특수 문자를 기준으로 데이터를 분류하여 객체 구조로 변환하는 함수를 구현했습니다.  
> 해당 함수를 통해 변환된 데이터를 여러 레이아웃 컴포넌트에서 렌더링할 수 있도록 했습니다.

```js
export default function DataParser(text) {
  const lines = text.trim().split("\n");
  const result = {};
  let currentKey = "";
  let currentObj = {};

  function isListKey(key) {
    return key === "Projects" || key === "Experience" || key === "Education" || key === "Completion" || key === "Skills";
  }


  for (let line of lines) {

    if (line.startsWith("## ")) {
      currentKey = line.substring(3);
      result[currentKey] = isListKey(currentKey) ? [] : {};
      currentObj = result[currentKey];
    }

    else if (line.includes(" > ")) {
      const [key, value] = line.split(" > ");
      if (isListKey(currentKey)) {
        const lastIndex = currentObj.length - 1;
        currentObj[lastIndex] && !currentObj[lastIndex][key] ?
          currentObj[lastIndex][key] = value :
          currentObj.push({ [key]: value });
      } else {
        currentObj[key] = value;
      }
    }

    else if (line.startsWith("- ") || line.length > 0) {
      if (isListKey(currentKey)) {
        currentObj[currentObj.length - 1].content += line + "\n";
      } else {
        currentObj.introduction += line + "\n";
      }
    }
  }

  return result;
}
```

---

### 5. 사용자 정의 스타일 적용을 위한 Markdown 컴포넌트 구현

> `ReactMarkdown` 라이브러리를 활용하여 사용자 정의 스타일을 적용한 Markdown 컴포넌트를 구현했습니다.  
> 해당 컴포넌트를 통해 Markdown 형식으로 작성된 데이터를 감싸서,  
> 사용자 정의 스타일이 적용된 형태로 렌더링 되도록 했습니다.

```jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function Markdown({ children }) {
  const StringText = ({ children }) => <strong style={{ fontWeight: "700" }}>{children}</strong>
  const ItalicText = ({ children }) => <em style={{ fontStyle: "inherit" }}><u>{children}</u></em>;
  const LinkText = ({ children, href }) => <a href={href} target="_blank" style={{ color: "#F99417" }}>{children}</a>;

  const components = {
    strong: StringText,
    em: ItalicText,
    a: LinkText
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm, remarkBreaks]}
    >
      {children}
    </ReactMarkdown>
  );
}
```

```jsx
import Markdown from "../utils/Markdown";

export default function Profile({ data }) {
  const { introduction } = data

  return (
    <section>
      <H2>Profile</H2>
        <div className="child-2">
          <Markdown>
            {introduction}
          </Markdown>
        </div>
    </section>
  )
}
```