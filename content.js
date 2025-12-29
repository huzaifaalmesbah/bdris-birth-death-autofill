// Inject Button
const ubrnLabel = document.querySelector('label[for="ubrn"]');
let btn;

if (ubrnLabel) {
    btn = document.createElement('button');
    btn.id = 'bdris-autofill-btn';
    btn.innerHTML = '<span>📝</span> Paste Number';
    btn.title = 'Open BDRIS Autofill';
    btn.type = 'button';
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal();
    });

    ubrnLabel.appendChild(btn); 
}

// Elements
const modal = document.createElement('div');
modal.id = 'bdris-modal-overlay';
modal.innerHTML = `
  <div id="bdris-modal-content">
    <span id="bdris-close-x" title="Close">&times;</span>
    <h2>BDRIS Birth & Death Autofill</h2>
    <div class="bdris-form-group">
      <label>Registration Number</label>
      <input type="text" id="bdris-brn-input" placeholder="Paste Registration Number">
    </div>
    
    <button id="bdris-do-fill" class="bdris-btn" style="background-color: #28a745; color: white; margin-bottom: 10px;">Auto Fill-Up</button>
    <div id="bdris-status"></div>
    <div id="bdris-recent-container" style="display:none; margin-bottom: 15px;">
        <label style="font-size: 12px; color: #777;">Recent History:</label>
        <div id="bdris-recent-list" style="margin-top: 5px; display: flex; flex-direction: column; gap: 5px;"></div>
        <div style="text-align: right; margin-top: 8px;">
            <a href="#" id="bdris-view-history" style="font-size: 12px; color: #008CBA; text-decoration: none;">View All History &raquo;</a>
        </div>
    </div>
  </div>
`;
document.body.appendChild(modal);

const overlay = document.getElementById('bdris-modal-overlay');
const brnInput = document.getElementById('bdris-brn-input');
const statusDiv = document.getElementById('bdris-status');
const fillBtn = document.getElementById('bdris-do-fill');
const recentContainer = document.getElementById('bdris-recent-container');
const recentList = document.getElementById('bdris-recent-list');
const viewHistoryLink = document.getElementById('bdris-view-history');

// Initialize
chrome.storage.local.get(['brn'], (result) => {
    if (result.brn) brnInput.value = result.brn;
});

// Auto-save on input
brnInput.addEventListener('input', () => {
    chrome.storage.local.set({ brn: brnInput.value });
});

// Bypass site restrictions (enable right-click, copy/paste, shortcuts)
['contextmenu', 'paste', 'copy', 'cut', 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseup'].forEach(event => {
    brnInput.addEventListener(event, (e) => {
        e.stopPropagation();
    });
});

document.getElementById('bdris-close-x').addEventListener('click', () => {
    overlay.style.display = 'none';
});

fillBtn.addEventListener('click', async () => {
    await handleFill();
});

viewHistoryLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(chrome.runtime.getURL('history.html'), '_blank');
});

// Also trigger on Enter key in input
brnInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        await handleFill();
    }
});

function openModal() {
    overlay.style.display = 'flex';
    brnInput.focus();
    brnInput.select(); // Select all identifying text for easy overwrite if needed
    renderRecent();
}

function renderRecent() {
    chrome.storage.local.get(['brnHistory'], (result) => {
        const history = result.brnHistory || [];
        // Take top 5
        const top5 = history.slice(0, 5);
        
        if (top5.length === 0) {
            recentContainer.style.display = 'none';
            return;
        }

        recentContainer.style.display = 'block';
        recentList.innerHTML = '';
        
        top5.forEach(num => {
            const row = document.createElement('div');
            row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: #f9f9f9; padding: 6px 10px; border-radius: 4px; border: 1px solid #eee;';
            
            const numSpan = document.createElement('span');
            numSpan.textContent = num;
            numSpan.style.cssText = 'font-size: 13px; font-family: monospace; color: #333;';
            
            const useBtn = document.createElement('button');
            useBtn.textContent = 'Auto Fill-Up';
            useBtn.className = 'bdris-btn';
            useBtn.style.cssText = 'width: auto; padding: 2px 10px; font-size: 11px; background-color: #17a2b8; color: white; border-radius: 3px;';
            useBtn.onclick = async () => {
                brnInput.value = num;
                updateStatus('Selected ' + num + ', filling...', 'blue');
                await handleFill();
            };
            
            row.appendChild(numSpan);
            row.appendChild(useBtn);
            recentList.appendChild(row);
        });
    });
}

function saveToHistory(number) {
    if (!number) return;
    chrome.storage.local.get(['brnHistory', 'historyLimit'], (result) => {
        let history = result.brnHistory || [];
        const limit = result.historyLimit || 100;
        
        // Remove existing if any matches (to move to top)
        history = history.filter(item => item !== number);
        // Add to front
        history.unshift(number);
        // Limit to user setting
        if (history.length > limit) {
            history = history.slice(0, limit);
        }
        chrome.storage.local.set({ brnHistory: history });
    });
}

async function handleFill() {
    const brn = brnInput.value;
    if (!brn) {
        updateStatus('Please enter BRN first', 'red');
        return;
    }

    updateStatus('Filling...', 'blue');
    
    // Save to History
    saveToHistory(brn);

    // Fill Page BRN
    const pageBrn = document.querySelector('#ubrn');
    if (pageBrn) {
        pageBrn.value = brn;
        pageBrn.dispatchEvent(new Event('input', { bubbles: true }));
        
        updateStatus('Filled!', 'green');
    } else {
        updateStatus('Input field not found', 'red');
    }

    // Focus BirthDate Input for user convenience
    const birthDateInput = document.getElementById('BirthDate');
    if (birthDateInput) {
        birthDateInput.focus();
    }
    
    // Close modal after short delay
    setTimeout(() => {
        overlay.style.display = 'none';
        updateStatus(''); 
    }, 800);
}

function updateStatus(msg, color) {
    statusDiv.textContent = msg;
    statusDiv.style.color = color || 'black';
}
