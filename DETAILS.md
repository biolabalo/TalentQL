# How does this work

The project fetches random data from `randomapi.com` and display the first 5 results in the table.

## Process 

1.   DOMContentLoaded(An event listener) is triggered on page load calling the startApp function.
2.  In the startApp function the button is disabled and an api call is made to get first page result , the result is rendered to the DOM by the `loadIntoTable` function
3 The previous and next button have eventListeners that fires  when clicked which inturns load new data , except for the previous button which is disabled if it's at page one
