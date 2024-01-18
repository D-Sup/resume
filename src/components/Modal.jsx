import { useState } from "react"
import styled from "styled-components"

import iconArrow from "../assets/icon/icon-arrow.svg"
import iconCancel from "../assets/icon/icon-cancel.svg"

export default function Modal({ modalState, setModalState }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const modalContent = modalState.modalContent.split(", ") || false;

  return (
    <>
      <>
        <BlurArea isModalOpen={modalState.isModalOpen}>
        </BlurArea>
        <ModalContainer isModalOpen={modalState.isModalOpen}>
          <SliderContainer>
            <div class="slider-box-container" style={{ transform: `translateX(${-slideIndex * 100}%)` }}>
              {modalContent.map(image =>
                <img className="slider-box" src={image} />
              )}
            </div>
          </SliderContainer>
          <PreviewContainer>
            {modalContent.map((image, index) =>
              <button className="preview-box"
                onClick={() => { setSlideIndex(index) }}
                style={{ boxShadow: slideIndex === index ? "0px 3px #F99417" : "none" }}
              ><img src={image}></img></button>
            )}
          </PreviewContainer>
          <button className="prev-btn" onClick={() => { setSlideIndex(slideIndex === 0 ? modalContent.length - 1 : slideIndex - 1) }}>
            <img src={iconArrow} />
          </button>
          <button className="next-btn" onClick={() => { setSlideIndex(slideIndex === modalContent.length - 1 ? 0 : slideIndex + 1) }}>
            <img src={iconArrow} />
          </button>
          <button className="cancel-btn" onClick={() => { setModalState({ isModalOpen: false, modalContent: modalState.modalContent }) }}>
            <img src={iconCancel} />
          </button>
        </ModalContainer>
      </>
    </>
  )
}

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
    height: 100%;
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
  aspect-ratio: 2 / 1;
  
  .slider-box-container {
    max-width: 100vw;
    height: inherit;
    display: flex;
    transition: .3s;
  }
  .slider-box {
    max-width: 100vw;
    aspect-ratio: 2 / 1;
    height: 100%;
    object-fit: cover;
    @media (max-width: 673px) {
      object-fit: contain;
    }
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
    height: 100px;
    aspect-ratio: 2 / 1;
    margin-bottom: 3px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;