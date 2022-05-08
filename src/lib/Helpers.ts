import { Article } from "../types/Article";

export function getTimeDiff(input: string) {
    const inputTime = new Date(input);
    const time = new Date();
    const mmsDiff = time.getTime() - inputTime.getTime();

    // older than one day
    if (mmsDiff > 24 * 60 * 60 * 1000) {
        const diffDays = mmsDiff / (24 * 60 * 60 * 1000);
        return diffDays.toString().split(".")[0] + " dager siden";
    }
    if (mmsDiff > 60 * 60 * 1000) {
        const diffDays = mmsDiff / (60 * 60 * 1000);
        return diffDays.toString().split(".")[0] + " timer siden";
    }

    const diffMinues = (time.getTime() - inputTime.getTime()) / (60 * 1000);
    return diffMinues.toString().split(".")[0] + " minutter siden";
}

export const cutString = (maxLength: number, str: string) => {
    return str.substring(0, maxLength) + (str.length > maxLength ? " ..." : "");
};

export function compareTitles(a: Article, b: Article) {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

export function compareAges(a: Article, b: Article) {
    if (a.updatedAt > b.updatedAt) {
        return -1;
    }
    if (a.updatedAt < b.updatedAt) {
        return 1;
    }
    return 0;
}
