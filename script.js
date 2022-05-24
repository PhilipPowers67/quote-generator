const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Needed for API
let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//  Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote from API
function newQuote() {
    loading();
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
    //  Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
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
    loading();
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