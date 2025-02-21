import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  background: #333;
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
  font-size: 22px;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background: #222;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background: ${(props) => (props.isUser ? "#007bff" : "#555")};
  color: ${(props) => (props.isUser ? "white" : "white")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 70%;
  margin-left: ${(props) => (props.isUser ? "auto" : "0")};

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 8px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TextArea = styled.textarea`
  flex: 1;
  height: 60px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
  background: #222;
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
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
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
  border: 1px solid #444;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
`;