import styled from 'styled-components';

const HotelsContainer = styled.div`
	display: flex;
	gap: 19px;
`;

const ImageContainer = styled.div`
	font-family: 'Roboto';
	width: 196px;
	height: 264px;
	border-radius: 10px;
	background-color: ${(props) => props.selected ? '#FFEED2': '#F1F1F1'};
	padding-left: 14px;
	margin-bottom: 30px;
	cursor: pointer;

	h2 {
		font-weight: 400;
		font-size: 20px;
		line-height: 23px;
		color: #343434;
		margin-bottom: 10px;
	}
    
	h3 {
		font-weight: 700;
		font-size: 12px;
		line-height: 14px;
		color: #3C3C3C;
		margin-bottom: 2px;
	}
    
	p {
		font-weight: 400;
		font-size: 12px;
		line-height: 14px;
		color: #3C3C3C;
		margin-bottom: 14px;
	}
`;  

const Image = styled.img`
	width: 168px;
	height: 109px;
	border-radius: 5px;
	margin-top: 16px;
	margin-bottom: 10px;
`;

const RoomsContainer = styled.div`
	font-family: 'Roboto';
	width: 95%;
	display: flex;
	gap: 17px;
	flex-wrap: wrap;
	margin-top: 16px;
	margin-bottom: 46px;
`;

const Room = styled.div`
	width: 190px;
	height: 45px;
	border-radius: 10px;
	border: 1px solid #CECECE;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: ${(props) => props.blocked ? '#E9E9E9' : props.selected ? '#FFEED2': 'none'};
	pointer-events: ${(props) => props.blocked ? 'none': 'all'};

	h2 {
		font-weight: 700;
		font-size: 20px;
		line-height: 23px;
		color: #454545;
		padding-left: 16px;
	}
`;

const IconsContainer = styled.div`
	display: flex;
	gap: 5px;
	margin-right: 12px;
`;

const Icon = styled.p`
	font-size: 25px;
	cursor: pointer;
`;

const IconStatus = styled.p`
	font-size: 25px;
	color: ${(props) => props.ableVacancy ? props.selected ? '#FF4791' : 'none' : 'gray'};
	pointer-events: ${(props) => props.ableVacancy ? 'all': 'none'};
	cursor: pointer;
`;

const IconFill = styled.p`
	font-size: 25px;
	color: ${(props) => props.blocked ? '#8C8C8C' : 'black'};
	pointer-events: ${(props) => props.ableVacancy ? 'all': 'none'};
	cursor: pointer;
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
`;

export {
  HotelsContainer,
  ImageContainer,
  Image,
  RoomsContainer,
  Room,
  IconsContainer,
  Icon,
  IconStatus,
  IconFill,
  Button
};
