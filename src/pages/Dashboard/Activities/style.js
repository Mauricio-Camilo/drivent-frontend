import styled from 'styled-components';

const ActivitiesContainer = styled.div`
  width: 100%;
  height: 100%;
  
 .activities-title-and-subtitle {
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
  }
`;

const DaysContainer = styled.div`
	display: flex;
	gap: 19px;
`;

const Day = styled.div`
  width: 131px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: ${props => props.selected? '#FFD37D' : '#E0E0E0'};
  cursor: pointer;

    p {
      font-size: 14px;
      line-height: 16px;
      color: #000000;
    }
`;

const AuditoriumContainer = styled.div`
    /* width: 288px; */
    display: flex;
    margin-top: 61px;

    h2 {
      font-size: 17px;
      line-height: 20px;
      color: #7B7B7B;
      text-align: center;
    }
`;

const Div = styled.div`
    width: 288px;
    /* margin-bottom: 10px; */
    `;

const ScheduleContainer = styled.div`
    min-height: 366px;
    border: 1px solid #D7D7D7;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 13px;
    padding-top: 10px;
    padding-bottom: 20px;
`;

const Activity = styled.div`
    width: 265px;
    height: ${props => props.height};
    display: flex;
    background-color:${props => props.selected? '#D0FFDB' : '#F1F1F1'};
    cursor: pointer;
    pointer-events: ${props => props.vacancies === 0? 'none': 'block'};

    div {
      width: 200px;
      padding-right: 18px;
    }

    h3 {
      font-size: 12px;
      font-weight: 700;
      line-height: 14px;
      color: #343434;
      margin-top: 12px;
      margin-left: 10px;
    }

    h4 {
      font-size: 12px;
      line-height: 14px;
      color: #343434;
      margin-top: 6px;
      margin-left: 10px;
    }
`;

const VerticalLine = styled.article`
    min-width: 66px;
    /* height: 60px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #CFCFCF;
    padding-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const IconApply = styled.p`
    font-size: 25px; 
    color: #078632;
    cursor: pointer;
`;

const IconOff = styled.p`
    font-size: 25px; 
    color: #CC6666;
    padding-left: 10px;
    cursor: pointer;
`;

const TextColor = styled.h5`
    font-size: 9px;
    line-height: 10px;
    color: ${props => props.color};
    padding-left: ${props => props.padding};
`;

const Button = styled.button`
	width: 162px;
	height: 37px;
	background-color: #E0E0E0;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	border: none;

	font-family: 'Roboto';
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	text-align: center;

	color: #000000;
	cursor: pointer;

  margin-top: 20px;
  margin-bottom: 30px;
`;

export {
  ActivitiesContainer,
  DaysContainer,
  Day,
  AuditoriumContainer,
  Div,
  ScheduleContainer,
  Activity,
  VerticalLine,
  IconApply,
  IconOff,
  TextColor,
  Button
};
