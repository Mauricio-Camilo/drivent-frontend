import styled from 'styled-components';

const TitleContainer = styled.div`
  .payment-title-and-subtitle {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;

    h1 {
      font-size: 34px;
      line-height: 40px;
      color: #000000;
    }

    h3 {
      font-size: 20px;
      line-height: 23px;
      color: #8E8E8E;
      margin-bottom: 17px;
      padding-top:25px;
    }

    button {
      width: 162px;
      height: 37px;
      background-color: #E0E0E0;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      border: none;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      text-align: center;

      color: #000000;

      cursor: pointer;
    }
  }
`;

const Button = styled.button`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  width: 145px;
  height: 145px;
  border: 1px solid #CECECE;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 24px;
  background-color: ${(props) => props.selected ? '#FFEED2' : '#FFFFFF'};

  :last-child {
    margin-right: 0;
  }
  
  h5 {
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #454545;
    margin-bottom: 3px;
  }

  p {
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;

const NoDataContainer = styled.div`
  width: 100%;
  height: 100%;

  .title {
    width: 100%;
    height: 40px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;

    h1 {
      font-size: 34px;
      line-height: 40px;
      color: #000000;
    }
  }

  .alert {
    height: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;

    h3 {
      font-size: 20px;
      line-height: 23px;
      color: #8E8E8E;
      max-width: 600px;
    }
  }
`;

export {
  TitleContainer,
  Button,
  NoDataContainer,
};
