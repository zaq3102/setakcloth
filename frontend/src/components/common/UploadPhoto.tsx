import { Button, DialogActions, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { changeState } from '../../store/actions/services/orderService';
import { LaundryImgChange } from '../../store/actions/services/laundryService';

const UploadPhoto: React.FC = ({ changeImageSrc, handleClose, imgCnt, id }) => {
  const ImageInput = useRef<HTMLInputElement>();
  const [imageUrlLists, setImageUrlLists] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const onImgInputBtnClick = (event) => {
    event.preventDefault();
    ImageInput.current.click();
  };

  const handleImgInput = (event) => {
    const imageLists = event.target.files;
    const tempList = [];
    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      tempList.push(currentImageUrl);
    }
    setSelectedFile(imageLists);
    setImageUrlLists(tempList);
  };

  const handleChange = async () => {
    const formData = new FormData();
    formData.append('multipartFile', selectedFile[0]);
    const result = await LaundryImgChange(id, formData);
    if (result?.data?.message === 'Success') {
      changeImageSrc(imageUrlLists);
      handleClose(4);
    } else {
      navigate('./error');
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('multipartFile', selectedFile);
    const result = await changeState(id, formData);
    if (result?.data?.message === 'Success') {
      // changeImageSrc(imageUrlLists);
      handleClose();
    } else {
      navigate('./error');
    }
  };

  return (
    <div style={{ padding: 10, width: 500 }}>
      <DialogTitle>사진 업로드하기</DialogTitle>

      {imgCnt === 1 ? (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImgInput(event)}
            style={{ display: 'none' }}
            id="profileUploadBtn"
            ref={ImageInput}
          />
          <DialogActions>
            <Button onClick={() => handleClose(4)}>취소</Button>
            <Button onClick={handleChange}>변경</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleImgInput(event)}
            style={{ display: 'none' }}
            id="profileUploadBtn"
            ref={ImageInput}
            multiple
          />
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleUpload}>등록</Button>
          </DialogActions>
        </>
      )}

      <br />
      {imageUrlLists.length > 0 ? (
        imageUrlLists.map((url) => <img src={url} alt="uploaded" width="100" />)
      ) : (
        <></>
      )}
      <Button variant="contained" color="color2" onClick={onImgInputBtnClick}>
        사진 업로드
      </Button>
    </div>
  );
};

export default UploadPhoto;
