import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { CgEnter } from 'react-icons/cg';
import { HiOutlineXCircle } from 'react-icons/hi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { UserActivitiesContext } from './../../../contexts/ActivitiesContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';
import { UserFormContext } from '../../../contexts/UserFormContext';

import { getEventDays, getActivitiesByDayId, updateLectureVacancies } from '../../../services/activitiesApi';

import { ActivitiesContainer, DaysContainer, Day, AuditoriumContainer, Div, ScheduleContainer, Activity, VerticalLine, IconApply, IconOff, TextColor } from './style';
import { NoDataContainer } from '../Payment/style';

export default function Activities() {
  const [selectedDate, setSelectedDate] = useState(new Map());
  const [eventDays, setEventDays] = useState();
  const [activitiesData, setActivitiesData] = useState();
  const [loadPage, setLoadPage] = useState(false);
  const [saveLectures1, setSaveLectures1] = useState([]);
  const [saveLectures2, setSaveLectures2] = useState([]);
  const [saveLectures3, setSaveLectures3] = useState([]);
  const { selectedActivity, setSelectedActivity } = useContext(UserActivitiesContext);
  const { userTicket, finishTicket } = useContext(UserTicketContext);
  const { usePayment } = useContext(UserFormContext);

  const h3 = finishTicket && userTicket.type !== 'Online' ? 'Primeiro, filtre pelo dia do evento' : '';

  useEffect(() => {
    async function getEventDates() {
      setLoadPage(false);
      try {
        const response = await getEventDays();
        setEventDays(response);
        if (response.length !== 0) {
          setLoadPage(true);
        }
      }
      catch {
        toast('Não foi possível renderizar os dias de evento!');
        setLoadPage(false);
      }
    } getEventDates();
  }, []);

  async function activateDate(id) {
    const alreadySelected = selectedDate.has(id);
    if (alreadySelected) {
      selectedDate.delete(id);
      setSelectedDate(new Map(selectedDate));
    }
    else {
      selectedDate.clear();
      setSelectedDate(new Map(selectedDate.set(id)));
    }
    getActivities();
  }

  async function getActivities() {
    try {
      const eventDayId = [...selectedDate.keys()][0];
      if (eventDayId !== undefined) {
        const response = await getActivitiesByDayId(eventDayId);
        setActivitiesData(response);
      }
      else {
        setActivitiesData(null);
      }
    }
    catch {
      toast('Não foi possível renderizar as atividades!');
    }
  }

  async function activateActivity(id, startTime, finishTime) {
    const auxiliarState = selectAuxiliarState();
    const formattedStartTime = convertTimeinMinutes(startTime);
    const formattedFinishTime = convertTimeinMinutes(finishTime);
    let ableClick = lectureIsAble(auxiliarState[0], formattedStartTime, formattedFinishTime);
    selectedActivity.has(id) ? ableClick = true : <></>;
    if (ableClick) {
      const alreadySelected = selectedActivity.has(id);
      if (alreadySelected) {
        selectedActivity.delete(id);
        setSelectedActivity(new Map(selectedActivity));
        deleteTimeInArray(auxiliarState[0], auxiliarState[1]);
        await updateLectureVacancies({ id, state: true });
        getActivities();
      }
      else {
        setSelectedActivity(new Map(selectedActivity.set(id)));
        saveTimeInArray(auxiliarState[0], auxiliarState[1], startTime, finishTime);
        const response = await updateLectureVacancies({ id, state: false });
        !response ? toast('Essa palestra não pode ser selecionada!') : <></>;
      }
    }
    else {
      toast('Essa palestra não pode ser selecionada!');
    }
  }

  function selectAuxiliarState() {
    let teste = '';
    let setTeste = '';
    if ([...selectedDate.keys()][0] === 1) {
      teste = saveLectures1;
      setTeste = setSaveLectures1;
    }
    if ([...selectedDate.keys()][0] === 2) {
      teste = saveLectures2;
      setTeste = setSaveLectures2;
    }
    if ([...selectedDate.keys()][0] === 3) {
      teste = saveLectures3;
      setTeste = setSaveLectures3;
    }
    return ([teste, setTeste]);
  }

  function deleteTimeInArray(teste, setTeste) {
    const newArray = teste.slice(0, teste.length - 2);
    setTeste(newArray);
  }

  function saveTimeInArray(teste, setTeste, startTime, finishTime) {
    const formattedStartTime = convertTimeinMinutes(startTime);
    const formattedFinishTime = convertTimeinMinutes(finishTime);
    const newArray = [...teste, formattedStartTime, formattedFinishTime];
    setTeste(newArray);
  }

  function convertTimeinMinutes(time) {
    const splitTime = time.split(':');
    const arrayTime = splitTime.map((numero) => {
      return parseInt(numero);
    });
    const timeInMinutes = arrayTime[0] * 60 + arrayTime[1];
    return timeInMinutes;
  }

  function lectureIsAble(saveLectures, startTime, finishTime) {
    if (saveLectures.length === 0) return true;
    for (let i = 0; i < saveLectures.length; i++) {
      if ((startTime <= saveLectures[i] && finishTime <= saveLectures[i]) ||
        (startTime >= saveLectures[i + 1] && finishTime >= saveLectures[i + 1])) {
        i++;
        continue;
      }
      else return false;
    }
    return true;
  }

  function handleDays() {
    if (loadPage && finishTicket) {
      return (
        eventDays.map(day => {
          const { id, weekDay, date } = day;
          const checkSelectedDate = selectedDate.has(id);
          return (
            <Day key={id} selected={checkSelectedDate} onClick={() => activateDate(id)}>
              <p>{weekDay}, {date}</p>
            </Day>
          );
        })
      );
    }
    else return <></>;
  }

  function handleAuditoriums() {
    if (activitiesData === undefined || activitiesData === null)
      return <></>;
    else return (
      activitiesData.map(auditorium => {
        const { id, title } = auditorium;
        return (
          <>
            <Div key={id}>
              <h2>{title}</h2>
              <ScheduleContainer>
                {auditorium.activity.map(activity => {
                  const { id, title, startTime, finishTime, vacancies, divSize } = activity;
                  const checkActivity = selectedActivity.has(id);
                  return (
                    <Activity selected={checkActivity} height={divSize} vacancies={vacancies} onClick={() => activateActivity(id, startTime, finishTime)}>
                      <div>
                        <h3>{title}</h3>
                        <h4>{startTime} - {finishTime}</h4>
                      </div>
                      <VerticalLine>
                        {vacancies > 0 ?
                          <>
                            {checkActivity ?
                              <>
                                <IconApply><AiOutlineCheckCircle /></IconApply>
                                <TextColor color={'#078632'} padding={'5px'}>Inscrito</TextColor>
                              </>
                              :
                              <>
                                <IconApply><CgEnter /></IconApply>
                                <TextColor color={'#078632'} padding={'5px'}>{vacancies} vagas</TextColor>
                              </>}
                          </>
                          :
                          <>
                            <IconOff><HiOutlineXCircle /></IconOff>
                            <TextColor color={'#CC6666'} padding={'10px'}>Esgotado</TextColor>
                          </>}
                      </VerticalLine>
                    </Activity>
                  );
                })}
              </ScheduleContainer>
            </Div>
          </>
        );
      })
    );
  }

  return (
    (finishTicket && userTicket.type !== 'Online') ? (
      <ActivitiesContainer>
        <div className="activities-title-and-subtitle">
          <h1>Escolha de atividades</h1>
          <h3>{h3}</h3>
        </div>
        <DaysContainer>
          {handleDays()}
        </DaysContainer>
        {[...selectedDate.keys()][0] !== undefined ?
          <AuditoriumContainer>
            {handleAuditoriums()}
          </AuditoriumContainer>
          :
          <></>}
      </ActivitiesContainer> 
    ) : (finishTicket && userTicket.type === 'Online') ? (
      <NoDataContainer>
        <div className="title">
          <h1>Escolha de atividades</h1>
        </div>
        <div className="alert">
          <h3>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</h3>
        </div>
      </NoDataContainer>
    ) : (!usePayment) ? (
      <NoDataContainer>
        <div className="title">
          <h1>Escolha de atividades</h1>
        </div>
        <div className="alert">
          <h3>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso.</h3>
        </div>
      </NoDataContainer> 
    ) : (
      <NoDataContainer>
        <div className="title">
          <h1>Escolha de atividades</h1>
        </div>
        <div className="alert">
          <h3>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.</h3>
        </div>
      </NoDataContainer>
    )
  );
}
