export default function getInitials(text: string) {
    if (!text) return "?";
    const words = text.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
};