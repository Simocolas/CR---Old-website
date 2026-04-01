// Enhanced form handling with GravityForms validation + API email sending

// Main form (form ID 2) - Enhanced submission with validation
async function sendMainFormEmailInsteadOfSubmit() {
    // First, let GravityForms handle validation
    const form = document.getElementById('gform_2');
    if (!form) {
        console.error('Form not found');
        return false;
    }

    // Trigger GravityForms validation
    const isValid = await validateGravityForm(2);
    if (!isValid) {
        return false; // Stop if validation fails
    }

    // If validation passes, send via our API
    const submitButton = document.getElementById('gform_submit_button_2');
    const originalText = submitButton.value;
    submitButton.value = 'SENDING...';
    submitButton.disabled = true;

    try {
        // Get form field values for main form (form ID 2)
        const name = document.getElementById('input_2_2') ? document.getElementById('input_2_2').value : '';
        const email = document.getElementById('input_2_3') ? document.getElementById('input_2_3').value : '';
        const phone = document.getElementById('input_2_4') ? document.getElementById('input_2_4').value : '';
        const address = document.getElementById('input_2_8') ? document.getElementById('input_2_8').value : '';
        const message = document.getElementById('input_2_12') ? document.getElementById('input_2_12').value : '';
        
        // Prepare email data
        const emailData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            service: 'Free Quote Request',
            message: message.trim()
        };
        
        // Send email via API
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to send email');
        }
        
        // Success - show confirmation message
        showFormSuccessMessage('Thank you! Your quote request has been sent successfully. We will contact you within 24 hours.');
        
        // Clear form fields
        form.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFormErrorMessage(error.message || 'Failed to send email. Please try again or contact us directly.');
    } finally {
        // Reset button state
        submitButton.value = originalText;
        submitButton.disabled = false;
    }
    
    return false; // Prevent default form submission
}

// Footer form (form ID 3) - Enhanced submission with validation
async function sendFooterEmailInsteadOfSubmit() {
    // First, let GravityForms handle validation
    const form = document.getElementById('gform_3');
    if (!form) {
        console.error('Footer form not found');
        return false;
    }

    // Trigger GravityForms validation
    const isValid = await validateGravityForm(3);
    if (!isValid) {
        return false; // Stop if validation fails
    }

    // If validation passes, send via our API
    const submitButton = document.querySelector('#gform_3 .gform_button, [onclick="sendFooterEmailInsteadOfSubmit()"]');
    let originalText = 'SUBMIT';
    
    if (submitButton) {
        originalText = submitButton.value || submitButton.textContent;
        if (submitButton.tagName === 'INPUT') {
            submitButton.value = 'SENDING...';
        } else {
            submitButton.textContent = 'SENDING...';
        }
        submitButton.disabled = true;
    }

    try {
        // Get form field values for footer form (form ID 3) 
        const name = document.getElementById('input_3_1_3') ? document.getElementById('input_3_1_3').value : '';
        const email = document.getElementById('input_3_2') ? document.getElementById('input_3_2').value : '';
        const phone = document.getElementById('input_3_3') ? document.getElementById('input_3_3').value : '';
        const address = document.getElementById('input_3_6') ? document.getElementById('input_3_6').value : '';
        const message = document.getElementById('input_3_4') ? document.getElementById('input_3_4').value : '';
        
        // Prepare email data
        const emailData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            service: 'General Inquiry',
            message: message.trim()
        };
        
        // Send email via API
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to send email');
        }
        
        // Success - show confirmation message
        showFooterFormSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
        
        // Clear form fields
        form.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFooterFormErrorMessage(error.message || 'Failed to send email. Please try again or contact us directly.');
    } finally {
        // Reset button state
        if (submitButton) {
            if (submitButton.tagName === 'INPUT') {
                submitButton.value = originalText;
            } else {
                submitButton.textContent = originalText;
            }
            submitButton.disabled = false;
        }
    }
    
    return false; // Prevent default form submission
}

// Enhanced GravityForms validation function
async function validateGravityForm(formId) {
    return new Promise((resolve) => {
        // Check if GravityForms validation object exists
        if (typeof gform === 'undefined' || !gform.validation) {
            console.warn('GravityForms validation not available, using basic validation');
            resolve(basicFormValidation(formId));
            return;
        }

        try {
            // Use GravityForms built-in validation
            const isValid = gform.validation.validate(formId);
            resolve(isValid);
        } catch (error) {
            console.warn('GravityForms validation failed, using basic validation:', error);
            resolve(basicFormValidation(formId));
        }
    });
}

// Fallback basic validation if GravityForms validation isn't available
function basicFormValidation(formId) {
    const form = document.getElementById(`gform_${formId}`);
    if (!form) return false;

    let isValid = true;
    const requiredFields = form.querySelectorAll('[aria-required="true"], .gfield_contains_required input, .gfield_contains_required select, .gfield_contains_required textarea');
    
    // Clear previous error styling
    document.querySelectorAll('.gfield_error').forEach(el => el.classList.remove('gfield_error'));
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            const fieldContainer = field.closest('.gfield');
            if (fieldContainer) {
                fieldContainer.classList.add('gfield_error');
                
                // Show error message if not already present
                if (!fieldContainer.querySelector('.validation_message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'validation_message';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '12px';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.textContent = 'This field is required.';
                    fieldContainer.appendChild(errorMsg);
                }
            }
        }
    });

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                const fieldContainer = field.closest('.gfield');
                if (fieldContainer) {
                    fieldContainer.classList.add('gfield_error');
                    
                    // Show error message
                    const existingError = fieldContainer.querySelector('.validation_message');
                    if (existingError) existingError.remove();
                    
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'validation_message';
                    errorMsg.style.color = 'red';
                    errorMsg.style.fontSize = '12px';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.textContent = 'Please enter a valid email address.';
                    fieldContainer.appendChild(errorMsg);
                }
            }
        }
    });

    return isValid;
}

// Helper functions for footer form messages
function showFooterFormSuccessMessage(message) {
    removeFooterFormMessages();
    const form = document.getElementById('gform_3') || document.querySelector('.footerForm form');
    if (form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'footer-form-success-message';
        successDiv.style.cssText = `
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            font-weight: bold;
        `;
        successDiv.textContent = message;
        form.insertBefore(successDiv, form.firstChild);
    }
}

function showFooterFormErrorMessage(message) {
    removeFooterFormMessages();
    const form = document.getElementById('gform_3') || document.querySelector('.footerForm form');
    if (form) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'footer-form-error-message';
        errorDiv.style.cssText = `
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            font-weight: bold;
        `;
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
    }
}

function removeFooterFormMessages() {
    const existingMessages = document.querySelectorAll('.footer-form-success-message, .footer-form-error-message');
    existingMessages.forEach(msg => msg.remove());
}

// Helper function to show success message
function showFormSuccessMessage(message) {
    // Remove any existing messages
    removeFormMessages();
    
    const form = document.getElementById('gform_2');
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.style.cssText = `
        background: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
        font-weight: bold;
    `;
    successDiv.textContent = message;
    form.insertBefore(successDiv, form.firstChild);
}

// Helper function to show error message
function showFormErrorMessage(message) {
    // Remove any existing messages
    removeFormMessages();
    
    const form = document.getElementById('gform_2');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.style.cssText = `
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
        padding: 15px;
        border-radius: 5px;
        margin: 15px 0;
        font-weight: bold;
    `;
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);
}

// Helper function to remove existing form messages
function removeFormMessages() {
    const existingMessages = document.querySelectorAll('.form-success-message, .form-error-message');
    existingMessages.forEach(msg => msg.remove());
}

// Initialize form handlers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Override GravityForms default submission for our forms
    const form2 = document.getElementById('gform_2');
    const form3 = document.getElementById('gform_3');
    
    if (form2) {
        form2.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMainFormEmailInsteadOfSubmit();
        });
    }
    
    if (form3) {
        form3.addEventListener('submit', function(e) {
            e.preventDefault();
            sendFooterEmailInsteadOfSubmit();
        });
    }
});