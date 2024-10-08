const scriptURL = 'https://script.google.com/macros/s/AKfycbzN6Rrv-5awCiS8jAEO6pj1sD4ePg6wpgeMd6qHHFJVuroTyAYEMHg8WLvboVXWFVNhVw/exec';

const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => alert("Thank you! Your form is submitted successfully."))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message));
});

const retrieveButton = document.getElementById('retrieve-button');
retrieveButton.addEventListener('click', fetchCellData);

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
      data.expenseCategories.forEach((row, index) => {
        const newRow = expenseTableBody.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        cell1.innerHTML = row[0];
        cell2.innerHTML = parseFloat(row[1]).toFixed(2);

        // Add a specific class to the last row
        if (index === data.expenseCategories.length - 1) {
          newRow.classList.add('last-row-highlight');
        }
      });

      balanceCardsContainer.innerHTML = '';
      const icons = ['fa-credit-card', 'fa-credit-card', 'fa-credit-card', 'fa-university', 'fa-university']; // Font Awesome icons
      const colors = ['#ec6d28', '#592136', 'white', '#0477fb', '#f6472e']; // Colors for icons
      data.balance.forEach((row, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="icon"><i class="fas ${icons[index % icons.length]}" style="color:${colors[index % colors.length]}"></i></div>
          <div class="account">${row[0]}</div>
          <div class="balance">$${parseFloat(row[1]).toFixed(2)}</div>
        `;
        balanceCardsContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error!', error.message));
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
  
  // Initialize amountInput with just a minus sign
  amountInput.value = '-';
  contributionInput.value = amountInput.value;
  
  // Function to set contribution value and color based on amount
  function setContribution() {
    contributionInput.value = amountInput.value;
    if (parseFloat(amountInput.value) < 0) {
      amountInput.style.color = 'red';
      contributionInput.style.color = 'red';
    } else if (parseFloat(amountInput.value) > 0) {
      amountInput.style.color = 'green';
      contributionInput.style.color = 'green';
    } else {
      amountInput.style.color = 'inherit';
      contributionInput.style.color = 'inherit';
    }
  }

  // Allow only numbers, a single minus sign, and a decimal point
  function validateInput(event) {
    // const value = event.target.value;
    // if (!/^-?\d*\.?\d*$/.test(value)) {
    //   event.target.value = value.slice(0, -1);
    // }
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
    if (amountInput.value === '-') {
      contributionInput.value = '';
    } else {
      setContribution();
    }
  });
});
