import puppeteer from 'puppeteer';

async function performCRUDOperations() {
  const browser = await puppeteer.launch({headless: 'false'});

  const page = await browser.newPage();

  // Navigate to the application
  await page.goto('http://localhost:5173');

  // Create operation
  // Assuming there's a form with an input for the note's title and content, and a submit button
  await page.type('#title', 'My New Note - Puppeteer');
  await page.type('.v-md-textarea-editor > textarea', 'This is the content of my new note.');
  await page.click('button[type=submit]');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // Read/List operation with ordered list and interaction
  // Assuming the notes are listed in an element with the id 'notes-list' and are clickable
  
  await page.click('a[href="/notebooks/list"]');
  // wait for the page to load
  await page.waitForSelector('ol > li')
  const notes = await page.evaluate(() => {
    const notesList = document.querySelectorAll('ol > li');
    if (!notesList.length) return []; // Return an empty array if no notes are found
    return Array.from(notesList).map((note, index) => {
      const title = note.querySelector('a') ? note.querySelector('a').innerText : '';
      return { index: index + 1, title }; // Adding index for ordered list, but title can be empty
    });
  });
  // Log the notes in an ordered list format
  console.log('Notes in ordered list:');
  notes.forEach(note => {
    console.log(`${note.index}. ${note.title}`);
  });
  
  // Click on the first note title to enter the page for reading, modifying, and deleting notes
  await page.click('ol > li:last-child > a');

  // Update operation
  // Assuming there's an edit button for the first note that opens a form similar to the create form
//   await page.click('#notes-list .note:first-child .edit-note');
  await page.type('.v-md-textarea-editor > textarea', ' This content has been updated.');
  await page.click('button[type=submit]');


  // Delete operation
  // Assuming there's a delete button for the first note
  await page.click('button[type=button]');

  await browser.close();
}

performCRUDOperations().catch(console.error);
