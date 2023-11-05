class DataController {
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
          method: "PUT", // PUT 요청으로 변경
          headers: {
            'Content-Type': 'text/plain', // 업로드 파일의 Content-Type 설정
          },
          body: fileContent, // 요청 본문에 파일 내용 추가
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

const dataController = new DataController();

export default dataController;
