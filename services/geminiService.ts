import { GoogleGenAI, Type } from "@google/genai";
import { type Platform, type ContentIdea, type GroundingChunk } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const contentIdeaSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy, viral-style title for the video or post.",
    },
    description: {
      type: Type.STRING,
      description: "A brief description of the content idea.",
    },
    script_outline: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A bulleted list outlining the key points or scenes for a short video script.",
    },
    caption: {
      type: Type.STRING,
      description: "An engaging caption for the post.",
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "An array of relevant and trending hashtags, each starting with #.",
    },
  },
  required: ["title", "description", "script_outline", "caption", "hashtags"],
};

export const generateContentIdeas = async (niche: string, platform: Platform): Promise<ContentIdea[]> => {
  try {
    const prompt = `Generate 3 unique, viral content ideas for the niche "${niche}" specifically for the platform ${platform}. The ideas should be highly engaging and tailored to the platform's audience and format. For each idea, provide a title, a brief description, a short script outline, an engaging caption, and a list of relevant hashtags.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: contentIdeaSchema,
            },
          },
        },
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson.ideas || [];
  } catch (error) {
    console.error("Error generating content ideas:", error);
    throw new Error("Failed to generate content ideas. Please check your API key and try again.");
  }
};


export const findTrendingTopics = async (topic: string): Promise<{ text: string; sources: GroundingChunk[] }> => {
  try {
    const prompt = `What are the latest trending topics, content formats, and hashtags related to "${topic}" on social media platforms like TikTok, YouTube, and Instagram for the last 7 days? Provide a summary and a list of key trends.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: GroundingChunk[] = rawChunks
      .filter(chunk => chunk.web?.uri && chunk.web?.title)
      .map(chunk => ({
        web: {
          uri: chunk.web!.uri!,
          title: chunk.web!.title!,
        },
      }));

    return { text, sources };

  } catch (error) {
    console.error("Error finding trending topics:", error);
    throw new Error("Failed to find trending topics.");
  }
};