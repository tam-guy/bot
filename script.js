<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fintrack</title>
    <link rel="stylesheet" href="formcss.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path d='M224 0c-35.3 0-64 28.7-64 64v32H128C57.3 96 0 153.3 0 224v160c0 70.7 57.3 128 128 128h192c70.7 0 128-57.3 128-128V224c0-70.7-57.3-128-128-128h-32V64c0-35.3-28.7-64-64-64zm0 32c17.6 0 32 14.4 32 32v64H192V64c0-17.6 14.4-32 32-32zm64 96h32c52.9 0 96 43.1 96 96v160c0 52.9-43.1 96-96 96H128c-52.9 0-96-43.1-96-96V224c0-52.9 43.1-96 96-96h32v64h128v-64z'/></svg>" type="image/svg+xml">
</head>
<body>
    <div class="tabs-container">
        <div class="tabs">
            <button class="tab-button active" onclick="openTab(event, 'add-transaction')">Add Transaction</button>
            <button class="tab-button" onclick="openTab(event, 'balance')">Balance</button>
        </div>
        <div id="add-transaction" class="tab-content active">
            <div class="form-container">
                <form method="post" action="https://script.google.com/macros/s/AKfycbwFIXDMS8bZ1emNeQB3y7lZmYcKWd2lP51GKApBCECGGlnn6P1k8DXBk0KoxdyHxcQvIQ/exec" name="contact-form">
                    <div class="form-group">
                        <label for="amount">Amount</label>
                        <div class="amount-input">
                            <span>$</span>
                            <input type="number" id="amount" name="amount" required>
                            <button type="button" id="toggle-sign" class="toggle-button">±</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contribution">My Contribution</label>
                        <div class="amount-input">
                            <span>$</span>
                            <input type="number" id="contribution" name="contribution" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="account">Account</label>
                        <select id="account" name="account" required>
                            <option value="Chase">Chase</option>
                            <option value="Discover" selected>Discover</option>
                            <option value="Apple">Apple</option>
                            <option value="Zolve">Zolve</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category" required>
                            <option value="">-- No Category --</option>
                            <option value="Misc">Misc</option>
                            <option value="Home">Home</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food" selected>Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Savings">Savings</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Other Needs">Other Needs</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
        <div id="balance" class="tab-content">
            <div class="form-container">
                <div class="form-group">
                    <button id="retrieve-button">Get Balance</button>
                </div>
                <div id="balance-cards" class="card-container">
                    <!-- Cards will be dynamically added here -->
                </div>
                <h4>Expenses</h4>
                <table id="expense-table" class="styled-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>$$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Rows will be dynamically added here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
