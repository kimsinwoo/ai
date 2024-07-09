import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from '../style/ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/gbsw/shop/${id}`)
      .then(response => {
        setProduct(response.data);
        const stuName = response.data.student.stuName;
        axios.get(`http://localhost:8080/gbsw/students/find/${stuName}`)
          .then(response => {
            console.log('Student data fetched:', response.data);
            setStudent(response.data);
          })
          .catch(error => {
            console.error('Error fetching student details:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  const createChatRoom = () => {
    if (!product || !student) {
      console.log(`Product or student data is not loaded yet. Product: ${product}, Student: ${student}`);
      return;
    }

    const chatRoomData = {
      roomId: `${localStorage.getItem('stuName')}_${student.stuName}_${product.title}`,
      name: `${localStorage.getItem('stuName')} and ${student.stuName}`,
      sessions: []
    };

    axios.post('http://localhost:8080/chat', chatRoomData)
      .then(response => {
        console.log('Chat room created:', response.data);
        // 여기에서 채팅 페이지로 이동하는 코드를 추가할 수 있습니다.
      })
      .catch(error => {
        console.error('Error creating chat room:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={style.productDetail}>
      <h1>{product.title}</h1>
      <img src={product.itemImgPath} alt={product.title} />
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.explanation}</p>
      {student ? (
        <p>Seller: {student.stuName}</p>
      ) : (
        <p>Student data not available</p>
      )}
      <button onClick={createChatRoom}>채팅하기</button>
    </div>
  );
};

export default ProductDetail;
