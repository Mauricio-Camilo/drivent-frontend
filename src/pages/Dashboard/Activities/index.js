import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { CgEnter } from 'react-icons/cg';
import { HiOutlineXCircle } from 'react-icons/hi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { UserActivitiesContext } from './../../../contexts/ActivitiesContext';
import { UserTicketContext } from '../../../contexts/UserTicketContext';

import { UserMessageForActivityWithOnlineModality } from '../../../components/UserMessageForActivityWithOnlineModality';
import { UserMessageForPayment } from '../../../components/UserMessageForPayment';

import { TitleContainer } from '../Payment/style';
import { getEventDays, getActivitiesByDayId, updateLectureVacancies } from '../../../services/activitiesApi';

import { ActivitiesContainer, DaysContainer, Day, AuditoriumContainer, Div, ScheduleContainer, Activity, VerticalLine, IconApply, IconOff, TextColor } from './style';

export default function Activities() {
  const [selectedDate, setSelectedDate] = useState(new Map());
  const [eventDays, setEventDays] = useState();
  const [activitiesData, setActivitiesData] = useState();
  const [loadPage, setLoadPage] = useState(false);
  const [saveLectures1, setSaveLectures1] = useState([]);
  const [saveLectures2, setSaveLectures2] = useState([]);
  const [saveLectures3, setSaveLectures3] = useState([]);
  const { selectedActivity, setSelectedActivity } = useContext(UserActivitiesContext);
  const { finishTicket } = useContext(UserTicketContext);

  const { finishPayment } = useContext(UserTicketContext);
  const isOnline = (localStorage.getItem('ticket') === 'Online');

  /* README: DEIXAR NESSA PÁGINA APENAS OS COMPONENTES PRINCIPAIS
  O HANDLE DAYS E HANDLE AUDITORIUM E TODA SUA LÓGICA, PASSAR PARA OUTRA PÁGINA*/

  useEffect(() => {
    async function getEventDates() {
      // Estado usado para renderizar algum componente enquanto os dados não carregam
      setLoadPage(false);
      try {
        const response = await getEventDays();
        setEventDays(response);
        // Sem essa condição, a página vai quebrar quando for recarregada, devido ao delay da resposta
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

  // FUNÇÃO QUE CONTROLA A SELEÇÃO DOS DIAS
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
    // Após um clique, vai renderizar (ou não) os próximos componentes
    getActivities();
  }

  // FUNÇÃO ATIVADA QUANDO UM DIA É SELECIONADO, VAI RENDERIZAR AS ATIVIDADES
  async function getActivities() {
    try {
      const eventDayId = [...selectedDate.keys()][0]; // Verifica se o mapa tem algum dia salvo
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
    const auxiliarState = selectAuxiliarState(); // Seleciona o estado que vai ser usado nesse mapa
    const formattedStartTime = convertTimeinMinutes(startTime);
    const formattedFinishTime = convertTimeinMinutes(finishTime);
    /* Aqui verifica se a minha atual palestra não tem conflito de horário
    Os horários salvos estão em um array auxiliar*/
    let ableClick = lectureIsAble(auxiliarState[0], formattedStartTime, formattedFinishTime);
    selectedActivity.has(id) ? ableClick = true : <></>;
    if (ableClick) {
      const alreadySelected = selectedActivity.has(id);
      if (alreadySelected) {
        selectedActivity.delete(id);
        setSelectedActivity(new Map(selectedActivity));
        deleteTimeInArray(auxiliarState[0], auxiliarState[1]);
        await updateLectureVacancies({ id, state: true });
        getActivities(); // Atualiza as vagas caso ela esteja selecionada e o usuário trocar de página
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

  /* FUNÇÃO CRIADA PARA USAR DIFERENTES ESTADOS DEPENDENDO DO DIA QUE FOI SELECIONADO.
  SEM ISSO, EU PERDERIA AS PALESTRAS SELECIONADAS AO TROCAR DE PÁGINA*/
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

  // Remove os dois últimos horários, ou seja, da palestra que está sendo desclicada
  function deleteTimeInArray(teste, setTeste) {
    const newArray = teste.slice(0, teste.length - 2);
    setTeste(newArray);
  }

  // Salva o horário de início e de final da palestra que foi clicada
  function saveTimeInArray(teste, setTeste, startTime, finishTime) {
    const formattedStartTime = convertTimeinMinutes(startTime);
    const formattedFinishTime = convertTimeinMinutes(finishTime);
    const newArray = [...teste, formattedStartTime, formattedFinishTime];
    setTeste(newArray);
  }

  // Transforma um horário em minutos: Ex: 9h = 540 min, 9h30 = 570 min
  function convertTimeinMinutes(time) {
    const splitTime = time.split(':');
    const arrayTime = splitTime.map((numero) => {
      return parseInt(numero);
    });
    const timeInMinutes = arrayTime[0] * 60 + arrayTime[1];
    return timeInMinutes;
  }

  /* Faz uma varredura no estado auxiliar para verificar se existe conflito de horários 
  Essa varredura percorre de dois em dois horários, que são os de inicio e término de palestras*/
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

  function handleOnlineTicketMessage() {
    return (
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de atividades</h1>
          <UserMessageForActivityWithOnlineModality />
        </div>
      </TitleContainer>
    );
  }

  function handleNoPaymentMessage() {
    return (
      <TitleContainer>
        <div className="payment-title-and-subtitle">
          <h1>Escolha de hotel e quarto</h1>
          <UserMessageForPayment />
        </div>
      </TitleContainer>
    );
  }

  return (
    <>
      {finishPayment ?
        <>
          {isOnline ?
            <>
              {handleOnlineTicketMessage()}
            </>
            :
            <>
              <ActivitiesContainer>
                <div className="activities-title-and-subtitle">
                  <h1>Escolha de atividades</h1>
                  {[...selectedDate.keys()][0] === undefined?
                    <h3>Primeiro, filtre pelo dia do evento</h3>
                    :
                    <></>}
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
            </>}
        </>
        :
        <>
          {handleNoPaymentMessage()}
        </>
      }
    </>
  );
}
