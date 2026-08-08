const Reports = {

    // try to find a letterhead image from common names
    findLetterHead(imgEl) {
        const candidates = [
            'images/societyLetterHead.png',
            'images/societyLetterHead.jpg',
            'images/societyLetterHead.jpeg'
        ];

        candidates.forEach(src => {
            const img = new Image();
            img.onload = () => {
                imgEl.src = src;
            };
            img.onerror = () => {
                // ignore
            };
            img.src = src;
        });
    },

    formatCurrency(v) {
        return (v == null) ? '' : (CONFIG.CURRENCY || '') + Number(v).toLocaleString();
    },

    generate() {
        const all = DataStore.getAll() || [];
        const selectedMonth = (document.getElementById('monthFilter') || {}).value || 'All';
        let data = all;
        if (selectedMonth && selectedMonth !== 'All') {
            data = all.filter(t => String(t.month || '').trim() === selectedMonth);
        }

        const totalCredit = data.reduce((s, r) => s + (Number(r.credit) || 0), 0);
        const totalDebit = data.reduce((s, r) => s + (Number(r.debit) || 0), 0);
        const balance = totalCredit - totalDebit;

        // expenses by category and transaction type (consider debit entries)
        const expensesMap = {};
        data.forEach(r => {
            const cat = String(r.category || 'Uncategorized').trim();
            const txType = String(r.transactionType || 'Unknown').trim() || 'Unknown';
            const d = Number(r.debit) || 0;
            if (d > 0) {
                const key = `${cat}||${txType}`;
                expensesMap[key] = (expensesMap[key] || 0) + d;
            }
        });

        const expenseEntries = Object.keys(expensesMap).map(k => {
            const parts = k.split('||');
            return { category: parts[0], transactionType: parts[1], amount: expensesMap[k] };
        }).sort((a, b) => {
            const c = a.category.localeCompare(b.category);
            return c !== 0 ? c : a.transactionType.localeCompare(b.transactionType);
        });

        // maintenance defaulters
        const defaulters = data.filter(r => String(r.category).trim().toLowerCase() === 'maintenance' && (Number(r.expectedMaintenance || 0) > Number(r.credit || 0)));

        // build HTML
        const hdrImg = '<img id="reportLetterHead" alt="" style="max-height:80px; margin-bottom:8px; display:block;" />';

        const html = [];
        html.push(`<div style="text-align:center; margin-bottom:10px;">
            ${hdrImg}
            <h3 style="margin:6px 0;">${CONFIG.SOCIETY_NAME || ''}</h3>
            <div style="color:#666; font-size:14px;">Audit Report - ${selectedMonth || 'All'}</div>
        </div>`);

        html.push(`<div style="margin-bottom:12px; display:flex; gap:20px; flex-wrap:wrap;">
            <div style="flex:1; min-width:180px; background:#fff; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.06);">
                <div style="color:#666; font-size:12px;">Total Credit</div>
                <div style="font-weight:700; font-size:18px;">${this.formatCurrency(totalCredit)}</div>
            </div>
            <div style="flex:1; min-width:180px; background:#fff; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.06);">
                <div style="color:#666; font-size:12px;">Total Debit</div>
                <div style="font-weight:700; font-size:18px;">${this.formatCurrency(totalDebit)}</div>
            </div>
            <div style="flex:1; min-width:180px; background:#fff; padding:10px; border-radius:6px; box-shadow:0 1px 3px rgba(0,0,0,0.06);">
                <div style="color:#666; font-size:12px;">Balance</div>
                <div style="font-weight:700; font-size:18px;">${this.formatCurrency(balance)}</div>
            </div>
        </div>`);

        // Expenses table (category + transaction type)
        html.push(`<h5>Expenses</h5>`);
        html.push(`<table class="table table-sm">
            <thead><tr><th>Category</th><th>Transaction Type</th><th class="text-end">Amount</th></tr></thead><tbody>`);
        if (expenseEntries.length === 0) {
            html.push(`<tr><td colspan="3">No expense entries</td></tr>`);
        } else {
            expenseEntries.forEach(e => {
                html.push(`<tr><td>${e.category}</td><td>${e.transactionType}</td><td class="text-end">${this.formatCurrency(e.amount)}</td></tr>`);
            });
        }
        html.push(`</tbody></table>`);

        // add spacing before Defaulters
        html.push(`<div style="height:18px"></div>`);

        // Defaulters
        html.push(`<h5>Maintenance Defaulters</h5>`);
        html.push(`<table class="table table-sm">
            <thead><tr><th>Flat</th><th>Owner</th><th>Month</th><th class="text-end">Expected</th><th class="text-end">Paid</th><th class="text-end">Pending</th></tr></thead><tbody>`);
        if (defaulters.length === 0) {
            html.push(`<tr><td colspan="6">No defaulters</td></tr>`);
        } else {
            defaulters.forEach(d => {
                const pending = (Number(d.expectedMaintenance || 0) - Number(d.credit || 0));
                html.push(`<tr><td>${d.flatNo || ''}</td><td>${d.ownerName || ''}</td><td>${d.month || ''}</td><td class="text-end">${this.formatCurrency(d.expectedMaintenance)}</td><td class="text-end">${this.formatCurrency(d.credit)}</td><td class="text-end">${this.formatCurrency(pending)}</td></tr>`);
            });
        }
        html.push(`</tbody></table>`);

        // Footer with generated timestamp
        html.push(`<div style="margin-top:12px; color:#666; font-size:12px;">Generated: ${new Date().toLocaleString()}</div>`);

        const container = document.getElementById('reportContent');
        if (container) container.innerHTML = html.join('');

        // set up letterhead image if present
        const imgEl = document.getElementById('reportLetterHead');
        if (imgEl) this.findLetterHead(imgEl);
    }

};

// Export for other scripts to call (global)
window.Reports = Reports;
