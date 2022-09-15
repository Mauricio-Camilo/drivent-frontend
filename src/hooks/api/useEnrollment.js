/* eslint-disable no-console */
import useAsync from '../useAsync';
import useToken from '../useToken';
import { useContext } from 'react';

import { UserFormContext } from '../../../src/contexts/UserFormContext';

import * as enrollmentApi from '../../services/enrollmentApi';

export default function useEnrollment() {
  const token = useToken();
  const { setUsePayment } = useContext(UserFormContext);
  
  const {
    data: enrollment,
    loading: enrollmentLoading,
    error: enrollmentError,
    act: getEnrollment
  } = useAsync(() => enrollmentApi.getPersonalInformations(token));
  
  (async() => {
    const response = await enrollmentApi.getPersonalInformations(token);
    if (response) {
      setUsePayment(true);
    } else {
      setUsePayment(false);
    }
  })();

  return {
    enrollment,
    enrollmentLoading,
    enrollmentError,
    getEnrollment
  };
}
