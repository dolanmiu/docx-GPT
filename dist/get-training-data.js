import axios from "axios";
export const getTrainingData = async () => {
    const { data } = await axios.get("https://api.github.com/repos/dolanmiu/docx/contents/demo");
    const demoFiles = data.filter((file) => {
        const nameParts = file.name.split("-");
        const firstPart = nameParts[0];
        return !isNaN(Number(firstPart));
    });
    const fileContents = await Promise.all(demoFiles.map(async (file) => {
        const { data: fileData } = await axios.get(file.download_url);
        return fileData;
    }));
    return fileContents;
};
