import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import * as React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  uploadBlockchainDeliveryImage,
  uploadBlockchainImage
} from '../../store/actions/services/orderService';
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
      changeImageSrc();
      handleClose(4);
    } else {
      navigate('./error');
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i += 1) {
      formData.append('multipartFiles', selectedFile[i]);
    }
    const result = await uploadBlockchainImage(id, formData);
    if (result?.data?.message === 'Success') {
      changeImageSrc(result?.data?.imgUrls);
      handleClose();
    } else {
      navigate('./error');
    }
  };

  const handleDelivered = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i += 1) {
      formData.append('multipartFiles', selectedFile[i]);
    }
    const result = await uploadBlockchainDeliveryImage(id, formData);
    if (result?.data?.message === 'Success') {
      changeImageSrc(result?.data?.imgUrls);
      handleClose();
    } else {
      navigate('./error');
    }
  };

  return (
    <div style={{ padding: 10, width: 500 }}>
      <DialogTitle sx={{ fontSize: 'x-large', fontWeight: 'bold' }}>
        사진 업로드하기
      </DialogTitle>
      <DialogContent>
        한번 사진이 등록되면,
        <br />
        <br />
        수정이 불가하니 신중하게 등록해주세요.
      </DialogContent>
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
            <Button color="color2_2" onClick={() => handleClose(4)}>
              취소
            </Button>
            <Button color="color2_2" onClick={handleChange}>
              변경
            </Button>
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
            <Button color="color2_2" onClick={handleClose}>
              취소
            </Button>
            {imgCnt === 2 ? (
              <Button color="color2_2" onClick={handleUpload}>
                등록
              </Button>
            ) : (
              <Button color="color2_2" onClick={handleDelivered}>
                등록
              </Button>
            )}
          </DialogActions>
        </>
      )}

      <br />
      {imageUrlLists.length > 0 ? (
        imageUrlLists.map((url) => <img src={url} alt="uploaded" width="100" />)
      ) : (
        <></>
      )}
      <Button variant="contained" color="color2_2" onClick={onImgInputBtnClick}>
        사진 업로드
      </Button>
    </div>
  );
};

export default UploadPhoto;
