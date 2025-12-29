document.addEventListener('DOMContentLoaded', () => {
    const historyLimitInput = document.getElementById('history-limit');
    const statusDiv = document.getElementById('status');
    const goHomeBtn = document.getElementById('go-home');
    const viewHistoryBtn = document.getElementById('view-history');
    const saveSettingsBtn = document.getElementById('save-settings');

    // Load saved settings
    chrome.storage.local.get(['historyLimit'], (result) => {
        if (result.historyLimit) {
            historyLimitInput.value = result.historyLimit;
        } else {
            // Default value
            historyLimitInput.value = 100;
        }
    });

    // Navigation Handlers
    goHomeBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://everify.bdris.gov.bd/' });
    });

    viewHistoryBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('history.html') });
    });

    // Save Settings Handler
    saveSettingsBtn.addEventListener('click', () => {
        const limit = parseInt(historyLimitInput.value, 10);
        
        if (isNaN(limit) || limit < 1) {
            showStatus('Please enter a valid number (min 1).', 'red');
            return;
        }

        chrome.storage.local.set({ historyLimit: limit }, () => {
            showStatus('Settings saved!', '#28a745');
        });
    });

    function showStatus(msg, color) {
        statusDiv.textContent = msg;
        statusDiv.style.color = color;
        setTimeout(() => {
            statusDiv.textContent = '';
        }, 2000);
    }
});
