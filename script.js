document.getElementById('reasonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get the selected reason
    const reason = document.getElementById('reason').value;

    // If no reason is selected, return early
    if (!reason) {
        alert('Please select a reason.');
        return;
    }

    // Generate the email based on the selected reason
    let emailContent = '';
    
    switch (reason) {
        case 'leave':
            emailContent = `
Dear [Manager's Name],

I hope this message finds you well. I am writing to request leave from [start date] to [end date] due to [reason for leave]. I will ensure that all of my tasks are completed before I leave.

Please let me know if you need any further details.

Best regards,
[Your Name]
            `;
            break;
        case 'appointment':
            emailContent = `
Dear [Recipient's Name],

I hope you're doing well. I would like to request an appointment with you to discuss [reason for the appointment]. Could you please let me know a suitable time for this meeting?

I look forward to your response.

Best regards,
[Your Name]
            `;
            break;
        case 'complaint':
            emailContent = `
Dear [Customer Service],

I am writing to formally complain about the [product/service]. I encountered the following issues: [brief description of the issues]. 

I would appreciate it if this matter could be addressed at your earliest convenience.

Thank you for your attention.

Sincerely,
[Your Name]
            `;
            break;
        case 'feedback':
            emailContent = `
Dear [Company Name],

I hope this message finds you well. I recently purchased [product/service], and I would like to share my feedback. I am extremely satisfied with [specific feature/experience], but I think improvements could be made in [suggestions for improvement].

I appreciate the opportunity to provide feedback.

Best regards,
[Your Name]
            `;
            break;
        default:
            emailContent = '';
    }

    // Display the generated email and make it editable
    document.getElementById('emailContent').value = emailContent;
    document.getElementById('generatedEmail').classList.remove('hidden');
});

// Send the email when the user clicks "Send Email"
document.getElementById('sendBtn').addEventListener('click', function() {
    const emailContent = document.getElementById('emailContent').value;

    // Send the email to the backend
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: emailContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending the email.');
    });
});
