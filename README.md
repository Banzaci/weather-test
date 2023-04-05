# Getting Started with Weather app

Tech stack is:

- React, Tailwind

When create a new card, the new card with the current cards will be saved to localstorage. This is to prevent a
server request.

There are 2 json files.

1. cards.json gets default cards. If create a new card, the new cards with the card created will be saved in localstorage. This will prevent a network request.
2. cardData.json mockes a request that should not be saved in localstorage.

There are 2 tests. One test will mock the server request with one location, and check that this request will be rendered. With more time, this test would cover more and check that everything will be rendered.
The second test is just an example on a unit test.
