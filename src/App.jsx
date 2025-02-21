import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Title,
  ChatContainer,
  InputContainer,
  TextArea,
  Button,
  Error,
  Select,
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
} from "./slices/languageSlice";

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
    dispatch(clearError()); // Clear previous errors
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
      <Title>AI Translator & Summarizer</Title>
      <ChatContainer ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser} text={msg.text} />
        ))}
      </ChatContainer>
      <InputContainer>
        <TextArea placeholder="Type something..." ref={textRef} />
        <Button onClick={handleSubmit} style={{ background: "#28a745" }}>
          Submit
        </Button>
        {detectedLanguage && (
          <>
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
            <Button onClick={translateText} disabled={loading}>
              {loading ? "Loading..." : "Translate"}
            </Button>
          </>
        )}
        {lastMessage?.length > 150 && detectedLanguage === 'en' && <Button onClick={summarizeText} disabled={loading}>
          {loading ? "Loading..." : "Summarize"}
        </Button>}
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default App;