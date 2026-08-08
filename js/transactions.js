const Transactions = {
    pageSize: 10,
    currentPage: 1,

    render() {
        this.data = DataStore.get() || [];
        this.currentPage = 1;
        this.renderPage();
        this.renderPagination();
    },

    renderPage() {
        const start = (this.currentPage - 1) * this.pageSize;
        const pageItems = this.data.slice(start, start + this.pageSize);
        let html = "";
        pageItems.forEach((t, i) => {
            const globalIndex = start + i;
            html += `
<tr data-index="${globalIndex}" style="cursor:pointer">
<td>${t.date}</td>
<td>${t.voucherNo}</td>
<td>${t.flatNo}</td>
<td>${t.transactionType}</td>
<td>${t.category}</td>
<td class="credit">${t.credit ? Utils.currency(t.credit) : ""}</td>
<td class="debit">${t.debit ? Utils.currency(t.debit) : ""}</td>
<td>${t.paymentMode}</td>
<td>${t.status}</td>
</tr>`;
        });
        const table = document.getElementById("transactionTable");
        table.innerHTML = html;

        // attach click handlers to rows to show remarks
        const self = this;
        Array.from(table.querySelectorAll('tr[data-index]')).forEach(r => {
            r.addEventListener('click', () => {
                const idx = Number(r.getAttribute('data-index'));
                self.showRemarks(idx);
            });
        });
    },

    renderPagination() {
        const totalItems = this.data.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / this.pageSize));
        const container = document.getElementById("transactionPagination");
        if (!container) return;

        let html = '';
        html += `<li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a></li>`;

        for (let i = 1; i <= totalPages; i++) {
            html += `<li class="page-item ${i === this.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }

        html += `<li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a></li>`;

        container.innerHTML = html;

        // attach handlers
        Array.from(container.querySelectorAll('a.page-link')).forEach(a => {
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const p = Number(a.getAttribute('data-page'));
                if (p >= 1 && p <= totalPages && p !== this.currentPage) {
                    this.currentPage = p;
                    this.renderPage();
                    this.renderPagination();
                }
            });
        });
    },

    showRemarks(index) {
        const t = this.data[index];
        if (!t) return;
        document.getElementById('transactionModalTitle').textContent = `Remarks - ${t.voucherNo || ''}`;
        document.getElementById('txnDate').textContent = t.date || '';
        document.getElementById('txnVoucher').textContent = t.voucherNo || '';
        document.getElementById('txnFlat').textContent = t.flatNo || '';
        document.getElementById('txnType').textContent = t.transactionType || '';
        document.getElementById('txnRemarks').textContent = t.remarks || '(No remarks)';

        const modalEl = document.getElementById('transactionModal');
        if (modalEl) {
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        }
    }
};
