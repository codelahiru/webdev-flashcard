// Get DOM elements
const addFlashcardButton = document.getElementById("add-flashcard");
const saveButton = document.getElementById("save-btn");
const closeButton = document.getElementById("close-btn");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const flashcardContainer = document.querySelector(".card-list-container");

// Array to store flashcards
let flashcards = [];

// Event listener for "Add Flashcard" button
addFlashcardButton.addEventListener("click", () => {
  showFlashcardForm();
});

// Event listener for "Save" button
saveButton.addEventListener("click", () => {
  saveFlashcard();
});

// Event listener for "Close" button
closeButton.addEventListener("click", () => {
  hideFlashcardForm();
});

// Function to show the flashcard form
function showFlashcardForm() {
  questionInput.value = "";
  answerInput.value = "";
  addFlashcardButton.style.display = "none";
  flashcardContainer.style.display = "none";
  document.getElementById("add-question-card").classList.remove("hide");
}

// Function to hide the flashcard form
function hideFlashcardForm() {
  addFlashcardButton.style.display = "block";
  flashcardContainer.style.display = "block";
  document.getElementById("add-question-card").classList.add("hide");
}

// Function to save the flashcard
function saveFlashcard() {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (question === "" || answer === "") {
    return; // Do not save if either field is empty
  }

  const flashcard = { question, answer };
  flashcards.push(flashcard);

  createFlashcardElement(flashcard);

  questionInput.value = "";
  answerInput.value = "";

  hideFlashcardForm();

  // Save flashcards to local storage
  saveFlashcards();
}

// Function to create a flashcard element
function createFlashcardElement(flashcard) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const questionPara = document.createElement("p");
  questionPara.classList.add("question-div");
  questionPara.textContent = flashcard.question;

  const answerPara = document.createElement("p");
  answerPara.classList.add("answer-div", "hide");
  answerPara.textContent = flashcard.answer;

  const showHideLink = document.createElement("a");
  showHideLink.href = "#";
  showHideLink.classList.add("show-hide-btn");
  showHideLink.textContent = "Show/Hide";
  showHideLink.addEventListener("click", () => {
    answerPara.classList.toggle("hide");
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-con");

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    editFlashcard(flashcard);
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    deleteFlashcard(flashcard);
  });

  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(deleteButton);

  cardDiv.appendChild(questionPara);
  cardDiv.appendChild(showHideLink);
  cardDiv.appendChild(answerPara);
  cardDiv.appendChild(buttonsContainer);

  flashcardContainer.appendChild(cardDiv);
}

// Function to edit a flashcard
function editFlashcard(flashcard) {
  questionInput.value = flashcard.question;
  answerInput.value = flashcard.answer;

  // Delete the flashcard from the array
  flashcards = flashcards.filter((card) => card !== flashcard);

  // Remove the flashcard element from the DOM
  const flashcardElements = flashcardContainer.getElementsByClassName("card");
  for (let i = 0; i < flashcardElements.length; i++) {
    const cardElement = flashcardElements[i];
    if (cardElement.querySelector(".question-div").textContent === flashcard.question) {
      cardElement.remove();
      break;
    }
  }

  showFlashcardForm();
}

// Function to delete a flashcard
function deleteFlashcard(flashcard) {
  // Delete the flashcard from the array
  flashcards = flashcards.filter((card) => card !== flashcard);

  // Remove the flashcard element from the DOM
  const flashcardElements = flashcardContainer.getElementsByClassName("card");
  for (let i = 0; i < flashcardElements.length; i++) {
    const cardElement = flashcardElements[i];
    if (cardElement.querySelector(".question-div").textContent === flashcard.question) {
      cardElement.remove();
      break;
    }
  }

  // Save flashcards to local storage
  saveFlashcards();
}

// Function to load flashcards from local storage
function loadFlashcards() {
  const storedFlashcards = localStorage.getItem("flashcards");
  if (storedFlashcards) {
    flashcards = JSON.parse(storedFlashcards);
    flashcards.forEach((flashcard) => {
      createFlashcardElement(flashcard);
    });
  }
}

// Function to save flashcards to local storage
function saveFlashcards() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Load flashcards on page load
window.addEventListener("DOMContentLoaded", () => {
  loadFlashcards();
});
