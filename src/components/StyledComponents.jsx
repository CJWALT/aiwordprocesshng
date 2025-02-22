import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  background: gray;
  font-family: Arial, sans-serif;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #fff;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Title = styled.h2`
  font-size: 32px;
  color: black;
  text-align: center;
  margin-bottom: 20px;
  color:white;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display:flex;
  background: #199;
  position:relative;
  gap:20px;
  flex-direction:column;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ChatContainerWrap = styled.div`
    padding:20px;
    border-radius:10px;
    flex:1;
    background:#D4F1C5;
`

export const Message = styled.div`
  margin-bottom: 30px;
  padding: 10px;
  padding-left:20px;
  border-radius: 30px;
  border:1px solid gray;
  background: ${(props) => (props.isUser ? "white" : "transparent")};
  color: ${(props) => (props.isUser ? "black" : "black")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 70%;
  margin-left: ${(props) => (props.isUser ? "auto" : "0")};

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 8px;
    padding-left:15px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  position:relative;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  height: 60px;
  padding: 10px;
  
  border-radius: 15px;
  font-size: 14px;
  resize: none;
  background: #63A7B0;
  color: #fff;

  @media (max-width: 768px) {
    height: 50px;
    font-size: 12px;
    width:100%;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background: #007bff;
  color: white;
  position:absolute;
//   top:0; 
  right:15px;
  bottom:5px;
  border: none;
  border-radius: 50px;
  display:flex; 
  justify-content:center;
  cursor: pointer;
  margin-left: 10px;
  width:6%;
  font-size: 16px;

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }

  &:hover{ 
  border:1px solid green;
  background-color:transparent;
  }
  @media (max-width: 768px) {
    
    width: 10%;
  }
`;

export const Error = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Select = styled.select`
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  background: #222;
  color: #fff;
  width:85%;
  border: 1px solid #444;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    width: 80%;
  }
`;
