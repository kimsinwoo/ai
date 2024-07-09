import { useState, useEffect } from "react";
import axios from 'axios';
import style from "../style/Upload.module.css";

export default function UpLoad() {
  const [number, setNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadPreview, setUploadPreview] = useState([]);
  const [withBuy, setWith] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      setErrorMessage("사진은 최대 5장까지 업로드 가능합니다.");
      return;
    }
    setUploadPreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleNumberChange = (event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      setErrorMessage("숫자를 입력해주세요.");
      return;
    }
    if (value !== "") {
      const num = parseInt(value);
      if (num < 2) {
        setNumber("2");
        setErrorMessage("숫자를 2 이상 10 이하로 입력해주세요.");
      } else if (num > 10) {
        setNumber("10");
        setErrorMessage("숫자를 2 이상 10 이하로 입력해주세요.");
      } else {
        setNumber(value);
        setErrorMessage("");
      }
    } else {
      setNumber("");
      setErrorMessage("");
    }
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  useEffect(() => {
    if (errorMessage !== "") {
      clearErrorMessage();
    }
  }, [errorMessage]);

  const uploadImages = async () => {
    const fileInput = document.getElementById('upload_img_select');
    const files = Array.from(fileInput.files);
    const imageUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post('YOUR_IMAGE_UPLOAD_ENDPOINT', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrls.push(response.data.imageUrl);
      } catch (error) {
        setErrorMessage("이미지 업로드 중 오류가 발생했습니다.");
        console.error('Error uploading image:', error);
      }
    }

    return imageUrls;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('jwt');
    const stuName = localStorage.getItem('stuName');
    if (!token) {
      setErrorMessage("로그인 후에 업로드가 가능합니다.");
      return;
    }

    try {
      const imageUrls = await uploadImages();

      const productData = {
        stuId: 0, // Replace with the actual student ID if available
        title,
        price,
        category,
        explanation: description,
        imgPath: imageUrls.join(','), // Assuming the server accepts comma-separated URLs
        stuName // 사용자 이름 추가
      };

      await axios.post('http://localhost:8080/gbsw/shop/create', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert("상품이 성공적으로 등록되었습니다.");
    } catch (error) {
      setErrorMessage("상품 등록 중 오류가 발생했습니다.");
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div>
      <div className={style.upload_container}>
        <div className={style.name_tag_box}>
          <h1 style={{ lineHeight: "70px" }}>기본정보</h1>
          <span>*필수 항목</span>
        </div>
        <hr />
        <div className={style.upload_detail}>
          <div className={style.img_detail}>
            <div className={style.img_title}>
              <p>상품 이미지</p>
              <span>*</span>
            </div>
            <div className={style.upload_img_container}>
              <label htmlFor="upload_img_select"
               className={style.upload_image_select}
               >
                <span id="add_circle" className="material-symbols-outlined">
                  add_circle
                </span>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="upload_img_select"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {uploadPreview.length > 0 && (
                <div className={style.preview_container}>
                  {uploadPreview.map((image, index) => (
                    <img key={index} src={image} alt="preview" style={{overflow:"hidden",}} width={90} height={100} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className={style.tit_detail}>
            <div className={style.tit_title}>
              <p>상품명</p>
              <span>*</span>
            </div>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <hr />
          {withBuy && (
            <div>
              <div className={style.pep_detail}>
                <div className={style.pep_title}>
                  <p>공구 인원</p>
                  <span>*</span>
                </div>
                <div className={style.pep_input_box}>
                  <input
                    type="number"
                    value={number}
                    onChange={handleNumberChange}
                    placeholder="인원"
                  />
                  <span>명</span>
                </div>
                {errorMessage && (
                  <div className={style.errorMessage}>{errorMessage}</div>
                )}
              </div>
              <hr />
            </div>
          )}

          <div className={style.price_detail}>
            <div className={style.price_title}>
              <p>가격</p>
              <span>*</span>
            </div>
            <div className={style.price_input}>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <span className="won">원</span>
            </div>
          </div>
          <hr />
          <div className={style.detail_detail}>
            <div className={style.detail_title}>
              <p>설명</p>
              <span>*</span>
            </div>
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="6"
              placeholder="상품 정보, 상품 상태를 적어주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <hr />
          <div className={style.category_detail}>
            <div className={style.category_title}>
              <p>카테고리</p>
              <span>*</span>
            </div>
            <div className={style.radio_button}>
              <div className={style.with_buy}>
                <label htmlFor="with_buy">공구</label>
                <input
                  type="radio"
                  name="category"
                  id="with_buy"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setWith(true);
                      setCategory("with_buy");
                    }
                  }}
                />
              </div>
              <div className={style.used_buy}>
                <label htmlFor="used_buy">중고</label>
                <input
                  type="radio"
                  name="category"
                  id="used_buy"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setWith(false);
                      setCategory("used_buy");
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className={style.commit_button}>
            <button onClick={handleSubmit}>등록하기</button>
          </div>
          {errorMessage && (
            <div className={style.errorMessage}>{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
