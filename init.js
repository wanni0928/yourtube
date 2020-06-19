//init.js application을 시작할때 필요한 함수들을 선언한 파일
import dotenv from "dotenv"; //dotenv 환경변수 : 크로스 플랫폼(win, linux, mac 과 같은 운영체제들)을 지원하기 위해 사용하는 라이브러리, 혹은 숨기고 싶은 변수 값(암호, 포트번호 등등)을 사용할 때, 이용.
import "./db";
import app from "./app";

dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

// listen이라는 메소드는 서버는 항상 듣고(listen) 있어야, 응답(response)할 수 있다는 의미로 사용된다.

// 때문에 listen 메소드의 매개변수로 port 번호를 입력받는다.
app.listen(PORT, handleListening);