const capitalizeTitle = (title: string) => {
  if (!title) return "";
  const skipWords = ["a", "an", "the", "and", "or", "but", "for", "nor", "on", "at", "to", "from", "by", "of", "in"];
  return title
    .split(" ")
    .map((word, index) => {
      if (index !== 0 && skipWords.includes(word.toLowerCase())) {
        return word.toLowerCase(); // leave small words uncapitalized
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export default capitalizeTitle;