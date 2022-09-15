import styled from "styled-components";
import Modal from "react-modal";

const ErrorModal = ({ message, setModalOpen }) => {
  Modal.setAppElement("#root");

  return <P>{message}</P>;
};

export default ErrorModal;

const P = styled.p`
  margin-top: 20px;
`;
