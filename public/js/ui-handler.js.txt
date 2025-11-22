/**
 * UI Handler - Helper functions for UI interactions
 */

// Smooth scroll to element
function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease-out',
        fontWeight: '600'
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Format YAML code with syntax highlighting (basic)
function formatYAML(code) {
    // Basic YAML formatting
    return code
        .split('\n')
        .map(line => {
            // Comments
            if (line.trim().startsWith('#')) {
                return `<span style="color: #6a9955;">${escapeHtml(line)}</span>`;
            }
            // Keys
            if (line.includes(':')) {
                const [key, ...valueParts] = line.split(':');
                const value = valueParts.join(':');
                return `<span style="color: #9cdcfe;">${escapeHtml(key)}</span>:${escapeHtml(value)}`;
            }
            return escapeHtml(line);
        })
        .join('\n');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Validate YAML structure (basic check)
function validateYAML(text) {
    const lines = text.split('\n');
    let indentLevel = 0;
    const errors = [];
    
    lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed.length === 0 || trimmed.startsWith('#')) return;
        
        // Check indentation
        const spaces = line.match(/^\s*/)[0].length;
        if (spaces % 2 !== 0) {
            errors.push(`Line ${i + 1}: Invalid indentation (must be multiples of 2)`);
        }
        
        // Check for tabs
        if (line.includes('\t')) {
            errors.push(`Line ${i + 1}: Contains tabs (use spaces instead)`);
        }
    });
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// Debounce function for input handlers
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading animation helper
function createLoadingSpinner(size = 50) {
    const spinner = document.createElement('div');
    Object.assign(spinner.style, {
        width: `${size}px`,
        height: `${size}px`,
        border: '4px solid #e2e8f0',
        borderTopColor: '#6366f1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    });
    return spinner;
}

// Character counter for textarea
function addCharacterCounter(textareaId, maxChars = 2000) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    Object.assign(counter.style, {
        fontSize: '0.875rem',
        color: '#64748b',
        marginTop: '5px',
        textAlign: 'right'
    });
    
    const updateCounter = () => {
        const length = textarea.value.length;
        counter.textContent = `${length} / ${maxChars} karakter`;
        if (length > maxChars) {
            counter.style.color = '#ef4444';
        } else if (length > maxChars * 0.9) {
            counter.style.color = '#f59e0b';
        } else {
            counter.style.color = '#64748b';
        }
    };
    
    textarea.addEventListener('input', updateCounter);
    textarea.parentElement.appendChild(counter);
    updateCounter();
}

// Auto-resize textarea
function autoResizeTextarea(textareaId) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    
    textarea.style.overflow = 'hidden';
    textarea.style.resize = 'none';
    
    const resize = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };
    
    textarea.addEventListener('input', resize);
    resize();
}

// Confirm dialog
function confirmDialog(message) {
    return new Promise((resolve) => {
        const result = confirm(message);
        resolve(result);
    });
}

// Copy text with fallback
async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err2) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Get estimated file sizes
function getEstimatedFileSizes(data) {
    return {
        mobs: new Blob([data.mobs || '']).size,
        skills: new Blob([data.skills || '']).size,
        items: new Blob([data.items || '']).size,
        drops: new Blob([data.drops || '']).size
    };
}

// Initialize enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add character counter to prompt
    addCharacterCounter('mobPrompt', 2000);
    
    // Auto-resize textarea
    autoResizeTextarea('mobPrompt');
    
    console.log('UI enhancements initialized');
});

// Export functions for use in other modules
if (typeof window !== 'undefined') {
    window.UIHelper = {
        scrollToElement,
        showToast,
        formatYAML,
        validateYAML,
        debounce,
        createLoadingSpinner,
        confirmDialog,
        copyTextToClipboard,
        formatFileSize,
        getEstimatedFileSizes
    };
}