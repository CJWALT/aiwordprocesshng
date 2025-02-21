import toast from "react-hot-toast";

export const translateApi = async (sourceLanguage, targetLanguage) => {
  if (!("ai" in self) || !("translator" in self.ai)) {
    throw new Error("AI translator service is not available.");
  }
  const translatorCapabilities = await self.ai.translator.capabilities();
  const res = translatorCapabilities.languagePairAvailable(
    sourceLanguage,
    targetLanguage
  );
  if (res === "no") {
    throw new Error(
      "Translation not available for the given pair of languages."
    );
  }
  if (res === "after-download") {
    const toastId = toast.loading("Downloading translation");
    const translator = await self.ai.translator.create({
      sourceLanguage,
      targetLanguage,
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    toast.dismiss(toastId)
    return translator;
  }
  if (res === "readily") {
    const translator = await self.ai.translator.create({
      sourceLanguage,
      targetLanguage,
    });
    return translator;
  }
};

export const summarizeTextApi = async () => {
  if (!("ai" in self) || !("summarizer" in self.ai)) {
    throw new Error("AI summarizer service is not available.");
  }

  const { available } = await ai.summarizer.capabilities();
  const options = { format: "plain-text", type: "teaser" };
  if (available === "no") {
    throw new Error("The current browser supports the Summarizer API.");
  }
  if (available === "after-download") {
    const toastId = toast.loading("Downloading translation");
    const summarizer = await self.ai.summarizer.create(options);
    summarizer.addEventListener('downloadprogress', (e) => {
      console.log(e.loaded, e.total);
    });

    await summarizer.ready

    toast.dismiss(toastId)

    return summarizer;
  }
  if (available === "readily") {
    const summarizer = await self.ai.summarizer.create(options);
    return summarizer;
  }
};

export const languageDetector = async () => {
   if (!("ai" in self) || !("languageDetector" in self.ai)) {
    throw new Error("AI translator service is not available.");
  }
  
  const languageDetectorCapabilities =
    await self.ai.languageDetector.capabilities();
  const canDetect = languageDetectorCapabilities.available;
  let detector;
  if (canDetect === "no") {
    throw new Error("The current browser supports the Language Detector API.");
  }
  if (canDetect === "readily") {
    // The language detector can immediately be used.
    detector = await self.ai.languageDetector.create();
    return detector;
  } if (canDetect === "after-download") {
    const toastId = toast.loading("Downloading lang detector");
    // The language detector can be used after model download.
    detector = await self.ai.languageDetector.create({
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });

    toast.dismiss(toastId)

    return detector;
  }
};