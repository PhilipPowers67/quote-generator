const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


// Needed for API
let apiQuotes = [];
// Needed for Local

// Show New Quote from API
function newQuote() {
    // Pick a random quote from API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author field is blank. Replace with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
      authorText.textContent = quote.author;  
    }
    // Check quote Length to determine style
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Show New Quote from Local
// function newQuote() {
//     // Pick a random quote from API
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     authorText.textContent = quote.author;
//     quoteText.textContent = quote.text;
// }

// Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
// From Local
// newQuote();