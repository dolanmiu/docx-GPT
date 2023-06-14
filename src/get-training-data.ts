import axios from "axios";
import { GitHubFile } from "./types";

export const getTrainingData = async (): Promise<string[]> => {
  const { data } = await axios.get<GitHubFile[]>(
    "https://api.github.com/repos/dolanmiu/docx/contents/demo"
  );

  const demoFiles = data.filter((file) => {
    const nameParts = file.name.split("-");
    const firstPart = nameParts[0];

    return !isNaN(Number(firstPart));
  });

  const fileContents = await Promise.all(
    demoFiles.map(async (file) => {
      const { data: fileData } = await axios.get<string>(file.download_url!);
      return fileData;
    })
  );

  return fileContents;
};
