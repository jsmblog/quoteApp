
const Quote = ({ text, author }) => {
    const quoteAuthor = author?.toLowerCase()?.includes('anonymous') ? 'anónimo' : author
  return (
    <div className="quote-container">
      <p className="quote-text">"{text}"</p>
      <p className="quote-author"><i>- {quoteAuthor}</i></p>
    </div>
  );
};

export default Quote;