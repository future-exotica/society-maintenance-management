const PendingDue = {
    pageSize: 10,
    currentPage: 1,

    render() {
        const data = DataStore.get() || [];
        this.rows = data.filter(t => String(t.category).trim().toLowerCase() === "maintenance" && Number(t.expectedMaintenance || 0) > Number(t.credit || 0));
        this.currentPage = 1;
        this.renderPage();
        this.renderPagination();
    },

    renderPage() {
        const tbody = document.querySelector("#pendingTable tbody");
        if (!tbody) return;

        const start = (this.currentPage - 1) * this.pageSize;
        const pageItems = (this.rows || []).slice(start, start + this.pageSize);

        let html = "";
        pageItems.forEach(t => {
            html += `
<tr>
<td>${t.flatNo}</td>
<td>${t.ownerName}</td>
<td>${t.month}</td>
<td>${t.expectedMaintenance}</td>
<td>${t.credit}</td>
<td>${t.expectedMaintenance - t.credit}</td>
<td>${t.expectedMaintenance > t.credit ? "Pending" : "Paid"}</td>
</tr>
`;
        });

        tbody.innerHTML = html;
    },

    renderPagination() {
        const totalItems = (this.rows || []).length;
        const totalPages = Math.max(1, Math.ceil(totalItems / this.pageSize));
        const container = document.getElementById("pendingPagination");
        if (!container) return;

        let html = '';
        html += `<li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a></li>`;

        for (let i = 1; i <= totalPages; i++) {
            html += `<li class="page-item ${i === this.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }

        html += `<li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a></li>`;

        container.innerHTML = html;

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
    }
};
