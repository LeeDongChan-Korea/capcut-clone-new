import { useCallback, useEffect, useRef, useState } from "react";
import "../assets/css/Upload.css";

const Logo = () => (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
      <path fill="transparent" d="M0,0h24v24H0V0z" />
      <path
        fill="#000"
        d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"
      />
    </svg>
);

const FileInfo = ({ uploadedInfo }) => (
    <ul className="preview_info">
      {Object.entries(uploadedInfo).map(([key, value]) => (
        <li key={key}>
          <span className="info_key">{key}</span>
          <span className="info_value">{value}</span>
        </li>
      ))}
    </ul>
);

const UploadComponent = () => {
    // 드래그 중일때와 아닐때의 스타일을 구분하기 위한 state 변수
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const [uploadedInfo, setUploadedInfo] = useState(null);
  
  // 각 선택했던 파일들의 고유값 id
  const fileId = useRef(0);
  
  // 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
  const dragRef = useRef(null);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);

  const onChangeFiles = useCallback((e) => {
    let selectFiles = [];
    let tempFiles = files;
    // temp 변수를 이용하여 선택했던 파일들을 담습니다.
  
    // 드래그 했을 때와 안했을 때 가리키는 파일 배열을 다르게 해줍니다.
    if (e.type === "drop") {
      // 드래그 앤 드롭 했을때
      selectFiles = e.dataTransfer.files;
    } else {
      // "파일 첨부" 버튼을 눌러서 이미지를 선택했을때
      selectFiles = e.target.files;
    }
  
    for (const file of selectFiles) {
      // 스프레드 연산자를 이용하여 기존에 있던 파일들을 복사하고, 선택했던 파일들을 append 해줍니다.
      tempFiles = [
        ...tempFiles,
        {
          id: fileId.current++, // fileId의 값을 1씩 늘려주면서 각 파일의 고유값으로 사용합니다.
          object: file // object 객체안에 선택했던 파일들의 정보가 담겨있습니다.
        }
      ];
    }
  
    setFiles(tempFiles);
  }, [files]); // 위에서 선언했던 files state 배열을 deps에 넣어줍니다.

  const handleDrop = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      setFileInfo(file);
    },
    [onChangeFiles]
  );

  const handleUpload = ({ target }) => {
    const file = target.files[0];
    setFileInfo(file);
  };

  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
    setUploadedInfo({ name, size, type });  // name, size, type 정보를 uploadedInfo에 저장
  };

  const initDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)
    
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)
    
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);
  
  return (
    <div className="dragDrop">
        <input
            type="file"
            id="fileUpload"
            style={{ display: "none" }} // label을 이용하여 구현하기에 없애줌
            multiple={true} // 파일 다중선택 허용
            onChange={handleUpload}
        />
        <label className={`preview ${isDragging ? "dragDrop-File-Dragging" : "dragDrop-File"}`} htmlFor="fileUpload" ref={dragRef}>
            <input type="file" className="file" />
            {/* {uploadedInfo && <FileInfo {...uploadedInfo} />}
            {!uploadedInfo && ( */}
                <>
                <Logo />
                <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
                </>
            {/* )} */}
        </label>

        <div className="DragDrop-Files">
            {files.length > 0 &&
            files.map((file) => {
                const { id, object: { name } } = file;

                return (
                <div key={id}>
                    <div>{name}</div>
                </div>
                );
            })}
        </div>
    </div>
  );
}

export default UploadComponent;