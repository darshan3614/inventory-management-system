// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const inventoryForm = document.getElementById('inventory-form');
    const inventoryTable = document.getElementById('inventory-table');
    const generateReportBtn = document.getElementById('generate-report');
    const reportTableBody = document.getElementById('report-table-body');

    let inventory = [];

    window.showPage = (pageId) => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    };

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'test' && password === 'test123') {
            document.getElementById('sidepanel').style.display = 'block';
            showPage('home-page');
        } else {
            alert('Invalid username or password');
        }
    });

    inventoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemQuantity = document.getElementById('item-quantity').value;

        inventory.push({ name: itemName, quantity: itemQuantity });
        updateInventoryTable();
        inventoryForm.reset();
    });

    const updateInventoryTable = () => {
        inventoryTable.innerHTML = '';
        inventory.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td class="actions">
                    <button class="delete" onclick="deleteItem(${index})">Delete</button>
                </td>
            `;
            inventoryTable.appendChild(row);
        });
    };

    window.deleteItem = (index) => {
        inventory.splice(index, 1);
        updateInventoryTable();
    };

    generateReportBtn.addEventListener('click', () => {
        reportTableBody.innerHTML = '';
        inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
            `;
            reportTableBody.appendChild(row);
        });
        document.getElementById('report-section').style.display = 'block';
    });

    // Initially show login page and hide side panel
    showPage('login-page');
    document.getElementById('sidepanel').style.display = 'none';
});
