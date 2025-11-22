/**
 * Generator module for MythicMobs
 * Handles communication with Claude API via serverless function
 */

async function generateMythicMobs(config) {
    const payload = {
        category: config.category,
        prompt: config.prompt,
        reference: config.useReference ? config.reference : null,
        useLibsDisguises: config.useLibsDisguises,
        includeItems: config.includeItems,
        includeDrops: config.includeDrops,
        advancedSkills: config.advancedSkills
    };

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Validate response
        if (!data.mobs || !data.skills) {
            throw new Error('Invalid response from API: missing required fields');
        }

        return data;

    } catch (error) {
        console.error('API Error:', error);
        
        // Provide user-friendly error messages
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
        } else if (error.message.includes('429')) {
            throw new Error('Terlalu banyak request. Mohon tunggu sebentar dan coba lagi.');
        } else if (error.message.includes('500')) {
            throw new Error('Server error. Mohon coba lagi nanti.');
        }
        
        throw error;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateMythicMobs };
}