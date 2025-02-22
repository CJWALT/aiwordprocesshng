import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Title,
  Para,
  ChatContainer,
  ChatContainerWrap,
  InputContainer,
  TextArea,
  Button,
  Error,
  Select,
  SelectWrap,
  ButtonSummarize,
  ButtonSelect,
} from './components/StyledComponents';
import Message from "./components/Message";
import toast, { Toaster } from "react-hot-toast";
import {
  translateApi,
  summarizeTextApi,
  languageDetector,
} from "./utils/checkApiAvailability";
import { addMessage, clearMessages } from "./slices/messagesSlice";
import { setError, clearError } from "./slices/errorSlice";
import { setLoading } from "./slices/loadingSlice";
import {
  setDetectedLanguage,
  setSelectedLanguage,
} from "./slices/textLanguageSlice";

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const detectedLanguage = useSelector((state) => state.language.detected);
  const selectedLanguage = useSelector((state) => state.language.selected);
  const textRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const userMessage = messages.filter((message) => message.isUser === true);
  const lastMessage = userMessage[userMessage?.length - 1]?.text;

  const languageTagToHumanReadable = (languageTag, targetLanguage) => {
    const displayNames = new Intl.DisplayNames([targetLanguage], {
      type: 'language',
    });
    return displayNames.of(languageTag);
  };

  const handleSubmit = async () => {
    const userText = textRef.current.value;
    if (userText === "") return dispatch(setError("Please enter some text"));
    if (userText.length < 1)
      return dispatch(setError("Please enter a valid text"));
    dispatch(clearError())
    const userMessage = userText;
    dispatch(addMessage({ text: userMessage, isUser: true }));
    textRef.current.value = "";

    try {
      const detector = await languageDetector();
      const results = await detector.detect(userMessage);
      const likelyResult = results[0];
      const lang = likelyResult.detectedLanguage;
      dispatch(setDetectedLanguage(lang));
      dispatch(
        addMessage({ text: `Detected language: ${languageTagToHumanReadable(
      lang,
      'en'
    )}`, isUser: false })
      );
    } catch (error) {
      toast.error(error.message);
    }
  };


  const translateText = async () => {
    try {
      dispatch(clearError()); // Clear previous errors
      dispatch(setLoading(true)); // Set loading to true
      const userMessage = messages.filter((message) => message.isUser === true);
      const lastMessage = userMessage[userMessage.length - 1];

      const translator = await translateApi(detectedLanguage, selectedLanguage);
      const result = await translator.translate(lastMessage.text);
      dispatch(addMessage({ text: `Translated: ${
      result}`, isUser: false }));
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err);
    } finally {
      dispatch(setLoading(false)); // Set loading to false
    }
  };

  const summarizeText = async () => {
    if (lastMessage.length < 150) {
      return dispatch(
        setError("Text must be at least 150 words to summarize.")
      );
    }
    try {
      dispatch(clearError());
      dispatch(setLoading(true)); // Set loading to true
      const summarizer = await summarizeTextApi();
      const result = await summarizer.summarize(lastMessage);
      dispatch(
        addMessage({ text: `Summary: ${result}`, isUser: false })
      );
    } catch (err) {
      dispatch(setError(err.message));
      console.error(err);
    } finally {
      dispatch(setLoading(false)); // Set loading to false
    }
  };

  return (
    <Container>
      <Toaster />
      <Title>AI Word Processing Interface</Title>
      <Para>The AI Word Processing Interface is a revolutionary tool designed to enhance document creation, editing, and formatting with intelligent automation. </Para>
      
      <ChatContainer ref={chatContainerRef}>
        <ChatContainerWrap>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser} text={msg.text} detectedLang={detectedLanguage} />
        ))}
        </ChatContainerWrap>

        {detectedLanguage && (
          <SelectWrap>
            <Select
              value={selectedLanguage}
              onChange={(e) => dispatch(setSelectedLanguage(e.target.value))}
            >
              <option value="en" disabled={detectedLanguage === "en"}>
                English
              </option>
              <option value="pt" disabled={detectedLanguage === "pt"}>
                Portuguese
              </option>
              <option value="es" disabled={detectedLanguage === "es"}>
                Spanish
              </option>
              <option value="ru" disabled={detectedLanguage === "ru"}>
                Russian
              </option>
              <option value="tr" disabled={detectedLanguage === "tr"}>
                Turkish
              </option>
              <option value="fr" disabled={detectedLanguage === "fr"}>
                French
              </option>
            </Select>
            <ButtonSelect onClick={translateText} disabled={loading}>
              {loading ? "Loading..." : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M5 15V17C5 18.0544 5.81588 18.9182 6.85074 18.9945L7 19H10V21H7C4.79086 21 3 19.2091 3 17V15H5ZM18 10L22.4 21H20.245L19.044 18H14.954L13.755 21H11.601L16 10H18ZM17 12.8852L15.753 16H18.245L17 12.8852ZM8 2V4H12V11H8V14H6V11H2V4H6V2H8ZM17 3C19.2091 3 21 4.79086 21 7V9H19V7C19 5.89543 18.1046 5 17 5H14V3H17ZM6 6H4V9H6V6ZM10 6H8V9H10V6Z"></path></svg>}
            </ButtonSelect>
            {lastMessage?.length > 150 && detectedLanguage === 'en' && <ButtonSummarize onClick={summarizeText} disabled={loading}>
          {loading ? "Loading..." : "Summarize"}
        </ButtonSummarize>}
          </SelectWrap>
        )}


      </ChatContainer>
      
      
      <InputContainer>
        <TextArea placeholder="Type something..." ref={textRef} />
        <Button onClick={handleSubmit} style={{ background: "#28a745" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>
        </Button>
       
        
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default App;