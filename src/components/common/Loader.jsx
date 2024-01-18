import styled from "styled-components"

export default function Loader() {
  return (
    <LoaderStyle>
      <li class="ball"></li>
      <li class="ball"></li>
      <li class="ball"></li>
    </LoaderStyle>
  )
}

const LoaderStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;


  .ball {
    list-style: none;
    width: 5%;
    height: 5%;
    border-radius: 50%;
    background-color: #000;
    @media (max-width: 950px) {
      width: 15px;
      height: 15px;
  }
  }

  .ball:nth-child(1) {
    animation: bounce-1 1s ease-in-out infinite;
  }

  @keyframes bounce-1 {
    50% {
      transform: translateY(-90px);
      scale: 0.3;
    }
  }

  .ball:nth-child(2) {
    animation: bounce-3 1s ease-in-out .1s infinite;
  }

  @keyframes bounce-2 {
    50% {
      transform: translateY(-90px);
      scale: 0.3;
    }
  }

  .ball:nth-child(3) {
    animation: bounce-3 1s ease-in-out .2s infinite;
  }

  @keyframes bounce-3 {
    50% {
      transform: translateY(-90px);
      scale: 0.3;
    }
  }
`;