import { useState } from "react"
import styled from "styled-components"

import Loader from "./common/Loader"

import iconArrow from "../assets/icon/icon-arrow.svg"
import iconCancel from "../assets/icon/icon-cancel.svg"


export default function Modal({ modalState, setModalState }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const images = modalState.images.split(", ");
  const imageTitle = modalState.imageTitle.split(", ");

  return (
    <>
      <>
        <BlurArea isModalOpen={modalState.isModalOpen}>
        </BlurArea>
        <ModalContainer isModalOpen={modalState.isModalOpen}>
          <SliderContainer>
            <div className="slider-box-container" style={{ transform: `translateX(${-slideIndex * 100}%)` }}>
              {images.map((image, index) =>
                <div key={index} className="slider-box">
                  {image.includes("youtube.com") ?
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${image.split("?v=")[1]}?autoplay=1&mute=1&loop=1&playlist=${image.split("?v=")[1]}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen>
                    </iframe>
                    :
                    <ImageLoader
                      key={index}
                      src={image}
                      LoadingComponent={Loader}
                    />
                  }
                </div>

              )}
            </div>
            <span className="slider-title">{imageTitle[slideIndex]}</span>
          </SliderContainer>
          <PreviewContainer>
            {images.map((image, index) =>
              <button className="preview-box" key={index}
                onClick={() => { setSlideIndex(index) }}
                style={{ boxShadow: slideIndex === index ? "0 -3px #F99417" : "none" }}
              >
                <ImageLoader
                  key={index}
                  src={image.includes("youtube.com") ? `https://img.youtube.com/vi/${image.split("?v=")[1]}/maxresdefault.jpg` : image}
                  LoadingComponent={Loader}
                />
              </button>

            )}
          </PreviewContainer>
          <button className="prev-btn" onClick={() => { setSlideIndex(slideIndex === 0 ? images.length - 1 : slideIndex - 1) }}>
            <img src={iconArrow} />
          </button>
          <button className="next-btn" onClick={() => { setSlideIndex(slideIndex === images.length - 1 ? 0 : slideIndex + 1) }}>
            <img src={iconArrow} />
          </button>
          <button className="cancel-btn"
            onClick={() => {
              setModalState({ isModalOpen: false, imageTitle: "", images: "" })
              setTimeout(() => setSlideIndex(0), 300)
            }}>
            <img src={iconCancel} />
          </button>
        </ModalContainer>
      </>
    </>
  )
}

const ImageLoader = ({ src, LoadingComponent, ...rest }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading &&
        <LoadingComponent />
      }
      <img style={loading ? { display: "none" } : {}} src={src} onLoad={() => setLoading(false)} {...rest} />
    </>
  );
};

const BlurArea = styled.div`
  opacity: 0;
  opacity: ${({ isModalOpen }) => isModalOpen && .3};
  pointer-events: ${({ isModalOpen }) => isModalOpen ? "auto" : "none"};
  background-color: #000;
  transition: opacity 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div`
  opacity: 0;
  opacity: ${({ isModalOpen }) => isModalOpen ? 1 : 0};
  pointer-events: ${({ isModalOpen }) => isModalOpen ? "auto" : "none"};
  transform: translate(-50%, -50%) ${({ isModalOpen }) => isModalOpen ? "scale(1)" : "scale(1.2)"};
  transition: all 0.3s;
  position: fixed;
  top: 45%;
  left: 50%;
  z-index: 9999;
  
  button {
    cursor: pointer;
  }
  .prev-btn, 
  .next-btn {
    width: 100px;
    height: 70%;
    position: absolute;
    top: 50%;
    opacity: 0.7;
  }
  .prev-btn {
    left: 0;
    transform: translateY(-50%) rotate(180deg);
  }
  .next-btn {
    right: 0;
    transform: translateY(-50%);
  }
  .cancel-btn {
    position: absolute;
    top: -40px;
    right: 0px;
  }
`;

const SliderContainer = styled.div`
  overflow: hidden;
  max-width: 100vw;
  height: 60vh;
  aspect-ratio: 16 / 9;
  
  .slider-box-container {
    max-width: 100vw;
    height: inherit;
    display: flex;
    transition: .3s;
  }
  .slider-box {
    max-width: 100vw;
    aspect-ratio: 16 / 9;
    height: 100%;
    position: relative;
    object-fit: contain;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      @media (max-width: 962px) {
        object-fit: contain;
      } 
    }
  }
  .slider-title {
    pointer-events: none;
    position: absolute;
    bottom: 10px;
    left: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .3);
    color: #FFF;
  }
`;

const PreviewContainer = styled.div`
  &::-webkit-scrollbar {
    height: 0;
  }
  overflow-x: scroll;
  position: absolute;
  bottom: -120px;
  width: 100vw;
  display: flex;
  gap: 20px;

  .preview-box {
    position: relative;
    height: 100px;
    aspect-ratio: 16 / 9;
    margin-top: 3px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;