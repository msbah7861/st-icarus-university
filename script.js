// script.js

// 1. Listen for the form submission
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if we are on the admissions page
    const form = document.querySelector('.admissions-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the page from reloading

            // 2. Get the data from the inputs
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const program = document.getElementById('program').value;
            const essay = document.getElementById('essay').value;

            // 3. Create a data object (a "row" for the database)
            const applicationData = {
                id: Date.now(), // Unique ID based on time
                name: fullname,
                email: email,
                program: program,
                essay: essay,
                date: new Date().toLocaleDateString()
            };

            // 4. Get existing data from "Database" (Local Storage)
            let database = JSON.parse(localStorage.getItem('studentDatabase')) || [];

            // 5. Add new data to the list
            database.push(applicationData);

            // 6. Save back to "Database"
            localStorage.setItem('studentDatabase', JSON.stringify(database));

            // 7. Success Message
            alert('Application Submitted Successfully! Check the Database page.');
            form.reset(); // Clear the form
        });
    }

    // --- LOGIC FOR THE ADMIN/DATABASE PAGE ---
    
    const tableBody = document.getElementById('database-body');
    
    if (tableBody) {
        // Get data
        let database = JSON.parse(localStorage.getItem('studentDatabase')) || [];

        // Loop through data and create table rows
        if (database.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No applications yet.</td></tr>';
        } else {
            database.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.date}</td>
                    <td><strong>${student.name}</strong></td>
                    <td>${student.email}</td>
                    <td>${student.program}</td>
                    <td>${student.essay.substring(0, 30)}...</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }
    
    // Clear Database Button Logic
    const clearBtn = document.getElementById('clear-db');
    if(clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem('studentDatabase');
            location.reload();
        });
    }
});