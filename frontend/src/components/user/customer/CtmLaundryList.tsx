import {
  Box,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../../../styles/Customer.scss';

const CtmLaundryList: React.FC = () => {
  const [alignlist, setAlignlist] = useState('');
  const itemData = [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '세탁소1',
      minimum: 15000,
      deliverfee: 3000,
      featured: true
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '세탁소2',
      minimum: 15000,
      deliverfee: 3000,
      featured: true
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '세탁소3',
      minimum: 15000,
      deliverfee: 3000,
      featured: true
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: '세탁소4',
      minimum: 15000,
      deliverfee: 3000,
      featured: true
    }
  ];

  const navigate = useNavigate();
  const handleChange = (event: SelectChangeEvent) => {
    setAlignlist(event.target.value);
  };

  const onclicklaundry = (value: number) => {
    navigate(`../${value}`);
  };
  return (
    <div className="customerlaundrylist">
      세탁소리스트입니다.
      <br />
      <div>
        {/* 정렬 select */}
        <FormControl id="select">
          <InputLabel>정렬</InputLabel>
          <Select value={alignlist} onChange={handleChange}>
            <MenuItem value={1}>거리순</MenuItem>
            <MenuItem value={2}>이용많은순</MenuItem>
            <MenuItem value={3}>별점높은순</MenuItem>
          </Select>
        </FormControl>
        {/* 즐겨찾기 */}
        <button type="button">즐겨찾기</button>
      </div>
      <br />
      {/* 세탁소 정보 카드 */}
      {itemData.map((item) => (
        <div>
          <Card
            key={item.id}
            id="laundryCard"
            onClick={() => onclicklaundry(item.id)}>
            <CardMedia
              id="cardImg"
              component="img"
              image="../../assets/logo.png"
            />
            <Box id="laundryBox">
              <CardContent>
                <Typography component="div" variant="h6">
                  {item.title}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  최소 이용금액 : {item.minimum}원
                </Typography>
                <Typography variant="subtitle1" component="div">
                  수거 배달비 : {item.deliverfee}원
                </Typography>
                <br />
                <Box>수선 드라이</Box>
              </CardContent>
            </Box>
          </Card>
          <br />
        </div>
      ))}
    </div>
  );
};
export default CtmLaundryList;
