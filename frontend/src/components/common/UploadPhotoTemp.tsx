import { Button, DialogActions, DialogTitle } from '@mui/material';
import * as React from 'react';
import { useState, useRef } from 'react';
import { LaundryImgChange } from '../../store/actions/services/laundryService';

const UploadPhotoTemp: React.FC = ({
  changeImageSrc,
  handleClose,
  imgCnt,
  laundryId
}) => {
  const ImageInput = useRef<HTMLInputElement>();
  const ImageShow = useRef<HTMLImageElement>();
  const [imageUrlLists, setImageUrlLists] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSetProfile = () => {};

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
    changeImageSrc(imageUrlLists);
  };

  const handleChange = async () => {
    const formData = new FormData();
    formData.append('imgUrl', selectedFile[0]);
    const result = await LaundryImgChange(laundryId, formData);
    console.log(result);
  };

  console.log(imageUrlLists);
  return (
    <div style={{ padding: 10, width: 500 }}>
      <DialogTitle>사진 업로드하기</DialogTitle>

      {imgCnt === 1 ? (
        <input
          type="file"
          accept="image/*"
          onChange={(event) => handleImgInput(event)}
          style={{ display: 'none' }}
          id="profileUploadBtn"
          ref={ImageInput}
          multiple
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={(event) => handleImgInput(event)}
          style={{ display: 'none' }}
          id="profileUploadBtn"
          ref={ImageInput}
          multiple
        />
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
      <DialogActions>
        <Button onClick={() => handleClose(3)}>취소</Button>
        <Button onClick={handleChange}>변경</Button>
      </DialogActions>
    </div>
  );
};

export default UploadPhotoTemp;
