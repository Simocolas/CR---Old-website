// Ensure our override loads IMMEDIATELY before anything else
(function() {
    
    // Create gform object immediately
    window.gform = window.gform || {};
    window.gform.submission = window.gform.submission || {};
    
    // Override the handleButtonClick function that the forms call
    window.gform.submission.handleButtonClick = function(button) {
        
        // IMMEDIATELY prevent any form submission
        const form = button.closest('form');
        if (form) {
            // Add event listener to prevent form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            });
        }
        
        if (!form) {
            console.error('❌ No form found for button');
            return false;
        }
        
        const formId = form.id.replace('gform_', '');
        
        // Validate the form first (basic validation)
        if (!validateGravityForm(formId)) {
            return false; // Stop if validation fails
        }
        
        // If validation passes, send via our API
        if (formId === '3') {
            sendFooterEmailViaAPI();
        } else if (formId === '2') {
            sendMainFormEmailViaAPI();
        } else if (formId === '1') {
            sendContactFormEmailViaAPI(); // Form 1 uses specific contact form function
        } else {
            console.error('❌ Unknown form ID:', formId);
        }
        
        // Prevent any default form behavior
        if (form) {
            form.onsubmit = function() { return false; };
        }
        
        return false; // Prevent any default submission
    };
    
    // Also try to override any existing gform object
    Object.defineProperty(window, 'gform', {
        value: window.gform,
        writable: false,
        configurable: false
    });
})();

// Basic form validation to replace GravityForms validation
function validateGravityForm(formId) {
    const form = document.getElementById('gform_' + formId);
    if (!form) return false;
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.gfield_error').forEach(el => el.classList.remove('gfield_error'));
    document.querySelectorAll('.validation_message').forEach(el => el.remove());
    
    // Find required fields - be more specific about selectors
    const requiredFields = form.querySelectorAll('[aria-required="true"]');
    
    // Check required fields
    requiredFields.forEach(field => {
        const fieldValue = field.value ? field.value.trim() : '';
        
        if (!fieldValue) {
            isValid = false;
            const fieldContainer = field.closest('.gfield');
            
            if (fieldContainer) {
                fieldContainer.classList.add('gfield_error');
                
                // Add error message
                if (!fieldContainer.querySelector('.validation_message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'validation_message';
                    errorMsg.style.cssText = 'color: #bc0b0b; font-size: 12px; margin-top: 5px; font-weight: bold;';
                    errorMsg.textContent = 'This field is required.';
                    fieldContainer.appendChild(errorMsg);
                }
            }
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    
    emailFields.forEach(field => {
        const emailValue = field.value ? field.value.trim() : '';
        if (emailValue) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                isValid = false;
                const fieldContainer = field.closest('.gfield');
                
                if (fieldContainer) {
                    fieldContainer.classList.add('gfield_error');
                    
                    // Remove existing error first
                    const existingError = fieldContainer.querySelector('.validation_message');
                    if (existingError) existingError.remove();
                    
                    // Add email error
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'validation_message';
                    errorMsg.style.cssText = 'color: #bc0b0b; font-size: 12px; margin-top: 5px; font-weight: bold;';
                    errorMsg.textContent = 'Please enter a valid email address.';
                    fieldContainer.appendChild(errorMsg);
                }
            }
        }
    });
    
    return isValid;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Fix form actions to prevent WordPress redirection
    const forms = document.querySelectorAll('form[action="https://www.calgarycityroofing.com/"]');
    forms.forEach(form => {
        form.setAttribute('action', '#');
        
        // Aggressively prevent form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        });
        
        // Also override the form's onsubmit
        form.onsubmit = function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            return false;
        };
    });
    
    // Also set up for any forms that might not have the full action URL
    const gravityForms = document.querySelectorAll('form[id^="gform_"]');
    gravityForms.forEach(form => {
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        });
    });
    
    // BACKUP APPROACH: Direct button click interception
    const submitButtons = document.querySelectorAll('#gform_submit_button_1, #gform_submit_button_2, #gform_submit_button_3');
    
    submitButtons.forEach(button => {
        
        // Remove the existing onclick attribute
        const originalOnclick = button.getAttribute('onclick');
        button.removeAttribute('onclick');
        
        // Set up new click handler
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const form = button.closest('form');
            const formId = form ? form.id.replace('gform_', '') : 'unknown';
            
            // Validate the form
            if (!validateGravityForm(formId)) {
                return false;
            }
            
            // Send via API
            if (formId === '3') {
                sendFooterEmailViaAPI();
            } else if (formId === '2') {
                sendMainFormEmailViaAPI();
            } else if (formId === '1') {
                sendContactFormEmailViaAPI(); // Form 1 uses specific contact form function
            }
            
            return false;
        });
    });
});

// Footer form API submission (after GravityForms validation)
async function sendFooterEmailViaAPI() {
    const submitButton = document.getElementById('gform_submit_button_3');
    const originalText = submitButton ? submitButton.value : 'Submit';
    
    if (submitButton) {
        submitButton.value = 'SENDING...';
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
        document.getElementById('gform_3').reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFooterFormErrorMessage(error.message || 'Failed to send email. Please try again or contact us directly.');
    } finally {
        // Reset button state
        if (submitButton) {
            submitButton.value = originalText;
            submitButton.disabled = false;
        }
    }
}

// Main form API submission (after GravityForms validation)
async function sendMainFormEmailViaAPI() {
    const submitButton = document.getElementById('gform_submit_button_2');
    const originalText = submitButton ? submitButton.value : 'Submit';
    
    if (submitButton) {
        submitButton.value = 'SENDING...';
        submitButton.disabled = true;
    }
    
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
        document.getElementById('gform_2').reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showFormErrorMessage(error.message || 'Failed to send email. Please try again or contact us directly.');
    } finally {
        // Reset button state
        if (submitButton) {
            submitButton.value = originalText;
            submitButton.disabled = false;
        }
    }
}

// Contact form API submission (Form ID 1)
async function sendContactFormEmailViaAPI() {
    const submitButton = document.getElementById('gform_submit_button_1');
    const originalText = submitButton ? submitButton.value : 'Submit';
    
    if (submitButton) {
        submitButton.value = 'SENDING...';
        submitButton.disabled = true;
    }
    
    try {
        // Get form field values for contact form (form ID 1)
        const firstName = document.getElementById('input_1_1_3') ? document.getElementById('input_1_1_3').value : '';
        const lastName = document.getElementById('input_1_1_6') ? document.getElementById('input_1_1_6').value : '';
        const email = document.getElementById('input_1_2') ? document.getElementById('input_1_2').value : '';
        const phone = document.getElementById('input_1_3') ? document.getElementById('input_1_3').value : '';
        const address = document.getElementById('input_1_6') ? document.getElementById('input_1_6').value : '';
        const message = document.getElementById('input_1_4') ? document.getElementById('input_1_4').value : '';
        
        // Combine first and last name
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        
        // Prepare email data
        const emailData = {
            name: fullName,
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            service: 'Contact Form Inquiry',
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
        showContactFormSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
        
        // Clear form fields
        document.getElementById('gform_1').reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showContactFormErrorMessage(error.message || 'Failed to send email. Please try again or contact us directly.');
    } finally {
        // Reset button state
        if (submitButton) {
            submitButton.value = originalText;
            submitButton.disabled = false;
        }
    }
}

// Legacy function names for backward compatibility (if called directly)
async function sendFooterEmailInsteadOfSubmit() {
    await sendFooterEmailViaAPI();
}

async function sendMainFormEmailInsteadOfSubmit() {
    await sendMainFormEmailViaAPI();
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

// Helper function to show success message for main form
function showFormSuccessMessage(message) {
    removeFormMessages();
    const form = document.getElementById('gform_2');
    if (form) {
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
}

// Helper function to show error message for main form
function showFormErrorMessage(message) {
    removeFormMessages();
    const form = document.getElementById('gform_2');
    if (form) {
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
}

// Helper function to remove existing form messages
function removeFormMessages() {
    const existingMessages = document.querySelectorAll('.form-success-message, .form-error-message, .contact-form-success-message, .contact-form-error-message');
    existingMessages.forEach(msg => msg.remove());
}

// Helper functions for contact form (Form ID 1) messages
function showContactFormSuccessMessage(message) {
    removeFormMessages();
    const form = document.getElementById('gform_1');
    if (form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'contact-form-success-message';
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

function showContactFormErrorMessage(message) {
    removeFormMessages();
    const form = document.getElementById('gform_1');
    if (form) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'contact-form-error-message';
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
