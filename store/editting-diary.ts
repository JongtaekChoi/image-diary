import { create } from "zustand";
import { generateImage } from "@/utils/image-generator";
interface EdittingDiaryState {
  diaryText: string;
  imageData?: string;
  isLoading: boolean;
  brushColor: string;
  setBrushColor: (color?: string) => void;
  setImageData: (data: string) => void;
  setDiaryText: (text: string) => void;
  generateAIImage: () => Promise<void>;
}

export const useEdittingDiary = create<EdittingDiaryState>((set, get) => ({
  diaryText: "",
  imageData: undefined,
  isLoading: false,
  brushColor: "#000",
  setImageData: (data: string) => set({ imageData: data }),
  setDiaryText: (text: string) => set({ diaryText: text }),
  setBrushColor: (color?: string) => set({ brushColor: color ?? "#000" }),
  generateAIImage: async () => {
    try {
      set({ isLoading: true });
      const image = await generateImage(get().diaryText);
      set({ imageData: image, isLoading: false });
    } catch (error) {
      console.error("Error generating image:", error);
    }
  },
}));
