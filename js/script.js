const tabs = document.querySelector(".tabs");
const questions = document.querySelectorAll(".faq-question");
const answers = document.querySelectorAll(".faq-answer");

const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

const emailInput = document.querySelector(".email-input");
const emailError = document.querySelector(".email-error");
const contactButton = document.querySelector(".contact-button");
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const hamburger = document.querySelector(".hamburger");
const closeSideBarIcon = document.querySelector(".hamburger-close");
const navigation = document.querySelector(".navigation-menu");

tabButtons.forEach((button) =>
  button.addEventListener("click", handleTabClick)
);
tabPanels.forEach(function (panel) {
  panel.hidden = true;
  panel.style.display = "none";
});
tabButtons[0].setAttribute("aria-selected", true);
tabPanels[0].hidden = false;
tabPanels[0].style.display = "flex";

function handleTabClick(event) {
  tabPanels.forEach(function (panel) {
    panel.hidden = true;
    panel.style.display = "none";
  });
  tabButtons.forEach((tab) => {
    tab.setAttribute("aria-selected", false);
  });

  event.currentTarget.setAttribute("aria-selected", true);

  const { id } = event.currentTarget;

  const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);

  tabPanel.hidden = false;
  tabPanel.style.display = "flex";
}

questions.forEach((question) => {
  question.addEventListener("click", () => {
    // remove the "active" class from all questions and answers
    questions.forEach((q) => {
      if (q !== question) {
        q.classList.remove("active");
        q.querySelector(".faq-icon").classList.remove("active");
      }
    });
    answers.forEach((a) => {
      if (a.previousElementSibling !== question) {
        a.classList.remove("active");
      }
    });

    // toggle the "active" class on the clicked question and answer
    if (question.classList.contains("active")) {
      question.classList.remove("active");
      question.querySelector(".faq-icon").classList.remove("active");
      question.nextElementSibling.classList.remove("active");
    } else {
      question.classList.add("active");
      question.querySelector(".faq-icon").classList.add("active");
      question.nextElementSibling.classList.add("active");
    }
  });
});

contactButton.addEventListener("click", () => {
  if (!emailRegex.test(emailInput.value)) {
    emailInput.classList.add("invalid");
    emailInput.style.border = "3px solid hsl(0, 94%, 66%)";
    emailInput.parentElement.classList.add("invalid");
    emailError.classList.add("invalid");
  } else {
    emailInput.classList.remove("invalid");
    emailInput.style.border = "3px solid lightgreen";
    emailInput.parentElement.classList.remove("invalid");
    emailError.classList.remove("invalid");
  }
});

const openSidebar = () => {
  navigation.classList.toggle("open");
  hamburger.classList.toggle("show");
  closeSideBarIcon.classList.toggle("show")
};

const closeSidebar = () => {
  navigation.classList.toggle("open");
  closeSideBarIcon.classList.toggle("show");
  hamburger.classList.toggle("show");
};

hamburger.addEventListener("click", openSidebar);
closeSideBarIcon.addEventListener("click", closeSidebar);
