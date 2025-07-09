import 'shiny';
import { getVertexAI, getGenerativeModel } from "firebase/ai";

Shiny.addCustomMessageHandler('fireblaze-ai-chat', (msg) => {
  const vertexAI = getVertexAI(window.firebaseApp);
  const model = getGenerativeModel(vertexAI, { model: "gemini-pro"});

  const prompt = msg.prompt;

  model.generateContent(prompt)
    .then(result => {
      const { response } = result;
      const text = response.candidates[0].content.parts[0].text;
      Shiny.setInputValue(msg.id, { success: true, response: text });
    })
    .catch(error => {
      Shiny.setInputValue(msg.id, { success: false, response: error });
    });
});