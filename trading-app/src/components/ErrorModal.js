import styled from "styled-components"
import Modal from "react-modal";

const ErrorModal = ({ message, setModalOpen }) => {

    
      const closeModal = () => {
        setModalOpen();
      };
    
      Modal.setAppElement("#root");

      const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#222224",
        },
      };

    return (
        // <Modal style={customStyles} closeTimeoutMS={200}>
            <Cont>
                <Button onClick={closeModal}>
                    X
                </Button>
                <Text>
                    {message}
                </Text>
            </Cont>

    )
}

export default ErrorModal

const Cont = styled.div`
    z-index: 10;
    position: absolute;
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 20px;
	padding-bottom: 30px;
	border-radius: 10px;
	border: solid;
	background-color: #212121;
	border-color: #5e5df0;
	border-width: 1.5px;
    margin-top: 3rem;
`
const Text = styled.h2`
    padding: 2rem 5rem 5rem 5rem;
`
const Button = styled.button`
    align-self: flex-end;
    margin: 0 1rem 2rem 0;
    font-size: x-large;
    background-color: #212121;
    border: none;
    color: white;
    cursor: pointer;
`