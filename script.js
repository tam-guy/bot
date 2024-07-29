const scriptURL = 'https://script.google.com/macros/s/AKfycbxdbuHTQv-JJZr5copOQXuZinKqUrRg2X6ngXonfRvW6BB0LanNIY5D4lFvLR0WT6Beiw/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Your form is submitted successfully."))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

const retrieveButton = document.getElementById('retrieve-button')
retrieveButton.addEventListener('click', fetchCellData)

function fetchCellData() {
  fetch(scriptURL + '?action=retrieve')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const expenseTableBody = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
      const balanceCardsContainer = document.getElementById('balance-cards');

      expenseTableBody.innerHTML = '';
      data.expenseCategories.forEach(row => {
        const newRow = expenseTableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        cell1.innerHTML = row[0];
        cell2.innerHTML = row[1];
      });

      balanceCardsContainer.innerHTML = '';
      const icons = ['fa-credit-card', 'fa-credit-card', 'fa-credit-card', 'fa-university']; // Font Awesome icons
      const colors = ['#ec6d28', '#592136', 'white', '#0477fb']; // Colors for icons
      data.balance.forEach((row, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="icon"><i class="fas ${icons[index % icons.length]}" style="color:${colors[index % colors.length]}"></i></div>
          <div class="account">${row[0]}</div>
          <div class="balance">$${row[1]}</div>
        `;
        balanceCardsContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error!', error.message))
}

function openTab(event, tabName) {
  // Hide all tab contents
  var tabContents = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = 'none';
  }

  // Remove active class from all tab buttons
  var tabButtons = document.getElementsByClassName('tab-button');
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(' active', '');
  }

  // Show the current tab and add an active class to the button that opened the tab
  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.className += ' active';
}

// Default to the first tab
document.addEventListener('DOMContentLoaded', () => {
  document.getElementsByClassName('tab-button')[0].click();
  
  // Set default date to today
  const dateInput = document.getElementById('date');
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = yyyy + '-' + mm + '-' + dd;
  dateInput.value = formattedToday;

  // Set default contribution to the amount
  const amountInput = document.getElementById('amount');
  const contributionInput = document.getElementById('contribution');
  
  // Add a minus sign and 0 by default
  amountInput.value = '-0';
  contributionInput.value = amountInput.value;
  
  // Function to set contribution value and color based on amount
  function setContribution() {
    contributionInput.value = amountInput.value;
    if (parseFloat(amountInput.value) < 0) {
      amountInput.style.color = 'red';
      contributionInput.style.color = 'red';
    } else {
      amountInput.style.color = 'green';
      contributionInput.style.color = 'green';
    }
  }

  // Allow only numbers and a single minus sign as the first character
  function validateInput(event) {
    const value = event.target.value;
    if (!/^-?\d*$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
    setContribution();
  }

  // Event listeners to update contribution value and color when amount changes
  amountInput.addEventListener('input', validateInput);
  amountInput.addEventListener('change', validateInput);

  // Initial setting of contribution value and color
  setContribution();

  // Toggle the sign of the amount
  const toggleSignButton = document.getElementById('toggle-sign');
  toggleSignButton.addEventListener('click', () => {
    if (amountInput.value.startsWith('-')) {
      amountInput.value = amountInput.value.substring(1);
    } else {
      amountInput.value = '-' + amountInput.value;
    }
    setContribution();
  });
});
