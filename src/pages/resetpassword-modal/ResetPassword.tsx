import queryString, { ParsedQuery } from 'query-string'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AppRoutes } from '../../constants/routes'
import { Modal } from '../common/modal/Modal'
import { ResetPasswordModalContent } from './ResetPasswordModalContent'

interface QueryProps extends ParsedQuery {
  token: string;
}

export const ResetPassword = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const queries = queryString.parse(location.search);
    setToken((queries as QueryProps).token);
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      isOpen={modalOpen}
      closeFunction={closeModal}
      onExitComplete={() => navigate(AppRoutes.Start)}
      modalContent={
        <ResetPasswordModalContent closeFunction={closeModal} token={token} />
      }
      containerClassName="w-full"
    />
  );
};
