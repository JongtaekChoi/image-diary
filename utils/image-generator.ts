import axios from "axios";

export enum ImageStyle {
  "Watercolor" = "Watercolor",
  "PencilSketch" = "Pencil Sketch",
  "OilPainting" = "Oil Painting",
}

export async function generateImage(
  diaryText: string,
  style: ImageStyle = ImageStyle["PencilSketch"]
): Promise<string> {
  const prompt = `${diaryText}, in ${style} style, drawn on a personal diary page.`;

  const response = await axios.post(
    "https://api.openai.com/v1/images/generations",
    {
      prompt,
      n: 1,
      size: "512x512",
    },
    {
      headers: {
        Authorization: `Bearer `,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data[0].url;
}
