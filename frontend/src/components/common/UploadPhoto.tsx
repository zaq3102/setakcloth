import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useRef } from 'react';

const UploadPhoto: React.FC = () => {
  const ImageInput = useRef<HTMLInputElement>();
  const ImageShow = useRef<HTMLImageElement>();

  const handleSetProfile = () => {};

  const onImgInputBtnClick = (event) => {
    event.preventDefault();
    ImageInput.current.click();
  };

  const handleImgInput = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      if (file.size > 1400000) {
        alert('1MB 이하의 파일만 등록할 수 있습니다.');
        return;
      }
      const img = new Image();
      img.onerror = () => {
        alert('올바르지 않은 파일 형식입니다.');
        // ProfileNow();
      };
      img.src = URL.createObjectURL(file);
      ImageShow.current.src = img.src;
      // setSelectedFile(file);
    }
  };
  return (
    <div>
      <DialogTitle>세탁소 이미지 업로드</DialogTitle>
      <DialogContent>
        1MB 미만의 파일만 등록할 수 있습니다. (jpg, jpeg, gif, png)
        <br />
        <br />
        <p>세탁소 이미지 업로드</p>
        <div className="ctm-signup-profile">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImgInput(event)}
            style={{ display: 'none' }}
            id="profileUploadBtn"
            ref={ImageInput}
          />
          <Button
            variant="contained"
            color="color2"
            onClick={onImgInputBtnClick}>
            사진 업로드
          </Button>
          <br />
          <img
            src="https://via.placeholder.com/150/BFD7EA/111111"
            alt="profile-img"
            ref={ImageShow}
            width="100"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSetProfile}>등록</Button>
      </DialogActions>
    </div>
  );
};

export default UploadPhoto;
