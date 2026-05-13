const API_URL = 'http://localhost:3000/api';
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (!token || !user) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Set user info
    document.getElementById('userName').textContent = user.fullName;
    document.getElementById('userRole').textContent = user.role;
    document.getElementById('userInitial').textContent = user.fullName.charAt(0);
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Initial data fetch
    fetchDashboardData();

    // Auto refresh every 30 seconds
    setInterval(fetchDashboardData, 30000);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });

    // Settings
    document.getElementById('settingsBtn').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Tính năng Cài đặt đang được phát triển!');
    });
});

async function fetchDashboardData() {
    try {
        const [linesRes, logsRes, defectsRes] = await Promise.all([
            fetch(`${API_URL}/lines`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API_URL}/logs`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API_URL}/defects/stats`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        const lines = await linesRes.json();
        const logs = await logsRes.json();
        const defectStats = await defectsRes.json();

        updateStats(lines, defectStats);
        renderLines(lines);
        renderLogs(logs);
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
    }
}

function updateStats(lines, defectStats) {
    const totalOutput = lines.reduce((sum, line) => sum + (line.output_today || 0), 0);
    const activeLines = lines.filter(line => line.status === 'Đang chạy').length;
    const totalDefects = defectStats.reduce((sum, stat) => sum + parseInt(stat.total_quantity || 0), 0);

    document.getElementById('totalOutput').textContent = totalOutput.toLocaleString();
    document.getElementById('activeLines').textContent = `${activeLines}/${lines.length}`;
    document.getElementById('totalDefects').textContent = totalDefects.toLocaleString();
}

function renderLines(lines) {
    const container = document.getElementById('linesContainer');
    container.innerHTML = lines.map(line => `
        <div class="line-card glass">
            <span class="line-status ${getStatusClass(line.status)}">${line.status}</span>
            <h4 style="margin-bottom: 0.5rem;">${line.line_name}</h4>
            <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">
                <i class="fas fa-clock"></i> ${line.shift_name}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Output Today</div>
                    <div style="font-size: 1.25rem; font-weight: 700;">${line.output_today.toLocaleString()}</div>
                </div>
                <div style="width: 40px; height: 40px;">
                    <canvas id="chart-${line.id}" width="40" height="40"></canvas>
                </div>
            </div>
        </div>
    `).join('');
}

function renderLogs(logs) {
    const container = document.getElementById('logsContainer');
    container.innerHTML = logs.map(log => `
        <div style="padding: 0.75rem; border-left: 2px solid var(--primary); background: var(--glass); border-radius: 0 8px 8px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">
                <span style="color: var(--primary); font-weight: 600;">${log.line_name}</span>
                <span>${new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div style="font-size: 0.875rem;">${log.log_message}</div>
        </div>
    `).join('');
}

function getStatusClass(status) {
    switch (status) {
        case 'Đang chạy': return 'status-running';
        case 'Tạm dừng': return 'status-warning';
        case 'Bảo trì': return 'status-stopped';
        case 'Cảnh báo': return 'status-warning';
        default: return '';
    }
}
