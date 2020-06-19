const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (e) => {
    const {data: videoFile} = e;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    streamObject.getVideoTracks()[0].stop();
    recordBtn.innerHTML = "Start recording";
}

const startRecording = () => {
    try {
        // console.log(streamObject);
        videoRecorder = new MediaRecorder(streamObject);
        // videoRecorder.start(1000);//(1초마다, 녹음 정보를 뿌린다.)
        // 비디오 녹음을 하는 방법.
        // 1. 비디오 녹음은 해당 비디오가 멈춰야 녹음이 된다.
        // 2. start 함수에 주기를 줘서, 지속적으로 녹음 시킨다.

        videoRecorder.start();
        videoRecorder.addEventListener("dataavailable", handleVideoData);
        recordBtn.addEventListener("click", stopRecording);
        // console.log(videoRecorder);
    } catch (error) {
        
    }
}

//media를 streamObject에 넣어주는 함수 api
//https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia 
// streamObject에 녹음 기능을 넣어주는 api
//https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream; //byte array
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    } catch (error) {
        recordBtn.innerHTML = "☹️ Cant record";
    } finally {
        // 허용의사에 상관없이 비활성화 해야하기 때문
        recordBtn.removeEventListener("click", getVideo);
    }
  };

function init(){
    recordBtn.addEventListener("click", getVideo);
}

if(recorderContainer){
    init();
}