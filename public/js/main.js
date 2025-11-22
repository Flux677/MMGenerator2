// Main application state
const AppState = {
    category: 'boss',
    prompt: '',
    reference: '',
    useReference: false,
    useLibsDisguises: true,
    includeItems: false,
    includeDrops: false,
    advancedSkills: true,
    generatedData: null
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    console.log('MythicMobs Generator initialized');
});

function initializeEventListeners() {
    // Category selection
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            AppState.category = e.target.value;
        });
    });

    // Reference checkbox
    const useReferenceCheckbox = document.getElementById('useReference');
    const referenceInput = document.getElementById('referenceInput');
    
    useReferenceCheckbox.addEventListener('change', (e) => {
        AppState.useReference = e.target.checked;
        referenceInput.disabled = !e.target.checked;
        if (!e.target.checked) {
            referenceInput.value = '';
            AppState.reference = '';
        }
    });

    referenceInput.addEventListener('input', (e) => {
        AppState.reference = e.target.value;
    });

    // Other checkboxes
    document.getElementById('useLibsDisguises').addEventListener('change', (e) => {
        AppState.useLibsDisguises = e.target.checked;
    });

    document.getElementById('includeItems').addEventListener('change', (e) => {
        AppState.includeItems = e.target.checked;
        toggleTab('items', e.target.checked);
    });

    document.getElementById('includeDrops').addEventListener('change', (e) => {
        AppState.includeDrops = e.target.checked;
        toggleTab('drops', e.target.checked);
    });

    document.getElementById('advancedSkills').addEventListener('change', (e) => {
        AppState.advancedSkills = e.target.checked;
    });

    // Prompt input
    document.getElementById('mobPrompt').addEventListener('input', (e) => {
        AppState.prompt = e.target.value;
    });

    // Generate button
    document.getElementById('generateBtn').addEventListener('click', handleGenerate);

    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });

    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            copyToClipboard(e.target.dataset.target);
        });
    });

    // Download buttons
    document.getElementById('downloadMobs').addEventListener('click', () => downloadFile('mobs'));
    document.getElementById('downloadSkills').addEventListener('click', () => downloadFile('skills'));
    document.getElementById('downloadItems').addEventListener('click', () => downloadFile('items'));
    document.getElementById('downloadDrops').addEventListener('click', () => downloadFile('drops'));
    document.getElementById('downloadAll').addEventListener('click', downloadAll);
}

function toggleTab(tabName, show) {
    const tab = document.querySelector(`[data-tab="${tabName}"]`);
    const downloadBtn = document.getElementById(`download${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    
    if (tab) {
        tab.style.display = show ? 'block' : 'none';
    }
    if (downloadBtn) {
        downloadBtn.style.display = show ? 'block' : 'none';
    }
}

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Content`).classList.add('active');
}

async function handleGenerate() {
    // Validation
    if (!AppState.prompt.trim()) {
        showError('Mohon isi deskripsi mob terlebih dahulu!');
        return;
    }

    // Show loading state
    showLoading(true);
    hideError();
    hideResult();
    disableGenerateButton(true);

    try {
        // Call generator
        const result = await generateMythicMobs(AppState);
        
        // Store result
        AppState.generatedData = result;
        
        // Display result
        displayResult(result);
        showResult();
        
    } catch (error) {
        console.error('Generation error:', error);
        showError(error.message || 'Terjadi kesalahan saat generate. Silakan coba lagi.');
    } finally {
        showLoading(false);
        disableGenerateButton(false);
    }
}

function displayResult(data) {
    // Display mobs
    document.getElementById('mobsCode').textContent = data.mobs || '# No mobs generated';
    
    // Display skills
    document.getElementById('skillsCode').textContent = data.skills || '# No skills generated';
    
    // Display items if included
    if (AppState.includeItems && data.items) {
        document.getElementById('itemsCode').textContent = data.items;
    }
    
    // Display drops if included
    if (AppState.includeDrops && data.drops) {
        document.getElementById('dropsCode').textContent = data.drops;
    }
}

function copyToClipboard(targetId) {
    const code = document.getElementById(targetId).textContent;
    navigator.clipboard.writeText(code).then(() => {
        // Show success feedback
        const btn = document.querySelector(`[data-target="${targetId}"]`);
        const originalText = btn.textContent;
        btn.textContent = '✅ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showError('Gagal menyalin ke clipboard');
    });
}

function downloadFile(type) {
    if (!AppState.generatedData) return;
    
    const data = AppState.generatedData[type];
    if (!data) return;
    
    const filename = `${type}.yml`;
    const blob = new Blob([data], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

async function downloadAll() {
    if (!AppState.generatedData) return;
    
    // This would require JSZip library
    // For now, download files individually
    downloadFile('mobs');
    setTimeout(() => downloadFile('skills'), 100);
    
    if (AppState.includeItems && AppState.generatedData.items) {
        setTimeout(() => downloadFile('items'), 200);
    }
    
    if (AppState.includeDrops && AppState.generatedData.drops) {
        setTimeout(() => downloadFile('drops'), 300);
    }
}

function showLoading(show) {
    document.getElementById('loadingState').style.display = show ? 'block' : 'none';
}

function showError(message) {
    const errorDisplay = document.getElementById('errorDisplay');
    document.getElementById('errorMessage').textContent = message;
    errorDisplay.style.display = 'block';
    
    // Scroll to error
    errorDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideError() {
    document.getElementById('errorDisplay').style.display = 'none';
}

function showResult() {
    document.getElementById('resultSection').style.display = 'block';
    
    // Scroll to result
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideResult() {
    document.getElementById('resultSection').style.display = 'none';
}

function disableGenerateButton(disabled) {
    const btn = document.getElementById('generateBtn');
    btn.disabled = disabled;
    if (disabled) {
        btn.querySelector('.btn-text').textContent = '⏳ Generating...';
    } else {
        btn.querySelector('.btn-text').textContent = '🚀 Generate MythicMobs';
    }
}