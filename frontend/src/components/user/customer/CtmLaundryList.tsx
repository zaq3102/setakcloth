import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LaundryLikeRequest } from '../../../store/actions/services/userService';
import {
  LaundryDistRequest,
  LaundryScoreRequest
} from '../../../store/actions/services/laundryService';
import '../../../styles/Customer.scss';

const CtmLaundryList: React.FC = () => {
  const [alignlist, setAlignlist] = useState('');
  const [laundryList, setLaundryList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const getList = async () => {
    const mode = location.state;
    let result = '';
    switch (mode) {
      case 1: // 거리순
        result = await LaundryDistRequest();
        break;
      case 2: // 별점순
        result = await LaundryScoreRequest();
        break;
      case 3: // 즐겨찾기
        result = await LaundryLikeRequest();
        break;
      default: // 전체 보기
        result = await LaundryDistRequest();
        break;
    }
    if (result?.data?.laundries) {
      setLaundryList(result?.data?.laundries);
    } else if (result?.data?.laundrys) {
      setLaundryList(result?.data?.laundrys);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setAlignlist(event.target.value);
  };

  const onclicklaundry = (value: number) => {
    navigate(`../${value}`);
  };

  return (
    <div className="customerlaundrylist">
      {laundryList.length === 0 ? (
        <div>세탁소가 존재하지 않습니다.</div>
      ) : (
        <>
          {laundryList.map((item) => (
            <Card
              key={item.laundryId}
              id="laundryCard"
              sx={{ padding: 1, margin: 1 }}
              onClick={() => onclicklaundry(item.laundryId)}>
              <CardMedia
                id="cardImg"
                component="img"
                image="https://setakcloth.s3.ap-northeast-2.amazonaws.com/laundry1.png"
              />
              {/* image={item.imgUrl} /> */}
              <CardContent id="laundryBox">
                <div className="item-title">{item.laundryName}</div>
                <div className="item-content">
                  <div>
                    {item.addr} {item.addrDetail}
                  </div>
                  <div>최소 이용금액 : {item.minCost}원</div>
                  <div>배달비 : {item.deliveryCost}원</div>
                  <div className="item-chips">
                    {item.deliver ? (
                      <Chip
                        label="배달"
                        size="small"
                        color="color2"
                        variant="outlined"
                      />
                    ) : null}
                    {item.pickup ? (
                      <Chip
                        label="수거"
                        size="small"
                        color="color3"
                        variant="outlined"
                      />
                    ) : null}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
export default CtmLaundryList;
