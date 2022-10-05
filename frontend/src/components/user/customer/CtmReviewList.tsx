import { Card, CardContent, CardMedia } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { myReviewRequest } from '../../../store/actions/services/orderService';
import { InfoRequest } from '../../../store/actions/services/userService';

const CtmReviewList = () => {
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);

  const getMyReviews = async () => {
    const result = await myReviewRequest();
    if (result?.data?.reviews) {
      setReviewList(result?.data?.reviews);
    } else {
      navigate('/error');
    }
  };

  useEffect(() => {
    getMyReviews();
  }, []);

  return (
    <div className="ctmorderlist">
      {reviewList.map((review, idx) => (
        <Card
          sx={{ maxWidth: 2 / 7, maxHeight: 1 / 2, borderRadius: 10 }}
          key={idx}
          className="ctm-mypage-right-bottom-review">
          <CardMedia
            component="img"
            height="100"
            image="../assets/laundry1.jpg"
            alt="green iguana"
          />
          <CardContent
            className="ctm-mypage-right-bottom-review-text"
            sx={{ maxWidth: 1, maxHeight: 1 / 2 }}>
            [{review.laundryName}] {review.content}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default CtmReviewList;
