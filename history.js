document.addEventListener('DOMContentLoaded', () => {
    loadHistory();

    document.getElementById('clear-all').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all history?')) {
            chrome.storage.local.set({ brnHistory: [] }, loadHistory);
        }
    });
});

function loadHistory() {
    chrome.storage.local.get(['brnHistory'], (result) => {
        const history = result.brnHistory || [];
        const listContainer = document.getElementById('history-list');
        const emptyMsg = document.getElementById('empty-msg');
        const clearBtn = document.getElementById('clear-all');

        listContainer.innerHTML = '';

        if (history.length === 0) {
            emptyMsg.style.display = 'block';
            clearBtn.style.display = 'none';
            return;
        }

        emptyMsg.style.display = 'none';
        clearBtn.style.display = 'block';

        history.forEach((brn, index) => {
            const li = document.createElement('li');
            li.className = 'history-item';
            li.innerHTML = `
                <span class="brn-text">${brn}</span>
                <div class="actions">
                    <button class="copy-btn" data-brn="${brn}">Copy</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            listContainer.appendChild(li);
        });

        // Attach listeners
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(btn.getAttribute('data-brn'));
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = originalText, 1500);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const indexToRemove = parseInt(btn.getAttribute('data-index'));
                deleteItem(indexToRemove);
            });
        });
    });
}

function deleteItem(index) {
    chrome.storage.local.get(['brnHistory'], (result) => {
        let history = result.brnHistory || [];
        history.splice(index, 1);
        chrome.storage.local.set({ brnHistory: history }, loadHistory);
    });
}
