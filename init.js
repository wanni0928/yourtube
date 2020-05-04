//init.js application을 시작할때 필요한 함수들을 선언한 파일

import app from "./app";

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

// listen이라는 메소드는 서버는 항상 듣고(listen) 있어야, 응답(response)할 수 있다는 의미로 사용된다.

// 때문에 listen 메소드의 매개변수로 port 번호를 입력받는다.
app.listen(PORT, handleListening);