<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Youth Teaching SG | Premium Physics & Exam Portal</title>
    <style>
        /* Modern CSS Variables for Design Consistency */
        :root {
            --bg-dark: #0f172a;
            --bg-card: #1e293b;
            --accent-primary: #3b82f6;
            --accent-hover: #2563eb;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --success: #10b981;
            --border: #334155;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-main);
            line-height: 1.6;
            padding-bottom: 60px;
        }

        /* Container Layout */
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Header Navigation */
        header {
            background-color: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 100;
            border-bottom: 1px solid var(--border);
        }

        .nav-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .logo span {
            color: var(--accent-primary);
        }

        /* Hero Banner Section */
        .hero {
            padding: 80px 0;
            text-align: center;
            background: radial-gradient(circle at top, rgba(59, 130, 246, 0.15), transparent 60%);
        }

        .hero h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 20px;
            letter-spacing: -0.025em;
        }

        .hero p {
            font-size: 1.2rem;
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto 35px auto;
        }

        .cta-btn {
            background-color: var(--accent-primary);
            color: var(--text-main);
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.2s ease, transform 0.2s ease;
            display: inline-block;
            border: none;
            cursor: pointer;
        }

        .cta-btn:hover {
            background-color: var(--accent-hover);
            transform: translateY(-2px);
        }

        /* Core Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
            margin-bottom: 80px;
        }

        .feature-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border);
            padding: 30px;
            border-radius: 12px;
            transition: border-color 0.2s ease;
        }

        .feature-card:hover {
            border-color: var(--accent-primary);
        }

        .feature-icon {
            font-size: 2rem;
            margin-bottom: 15px;
        }

        .feature-card h3 {
            font-size: 1.3rem;
            margin-bottom: 12px;
        }

        .feature-card p {
            color: var(--text-muted);
            font-size: 0.95rem;
        }

        /* App Module Workspace (Dashboard Style) */
        .workspace-section {
            background-color: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 60px;
        }

        .section-title {
            font-size: 1.8rem;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .section-desc {
            color: var(--text-muted);
            margin-bottom: 30px;
        }

        /* Two Column Ledger Split Layout */
        .split-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }

        @media (max-width: 768px) {
            .split-layout {
                grid-template-columns: 1fr;
            }
            .hero h1 {
                font-size: 2.2rem;
            }
        }

        /* Form Styling */
        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 0.9rem;
            color: var(--text-main);
        }

        .form-control {
            width: 100%;
            background-color: var(--bg-dark);
            border: 1px solid var(--border);
            padding: 12px 16px;
            border-radius: 8px;
            color: var(--text-main);
            font-size: 1rem;
            transition: border-color 0.2s ease;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--accent-primary);
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 25px;
            cursor: pointer;
        }

        .checkbox-group input {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }

        /* Receipt Preview Styling */
        .receipt-box {
            background-color: var(--bg-dark);
            border: 2px dashed var(--border);
            border-radius: 12px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 350px;
        }

        .receipt-header {
            text-align: center;
            border-bottom: 1px dashed var(--border);
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .receipt-header h4 {
            color: var(--accent-primary);
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .receipt-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 0.95rem;
        }

        .receipt-row .label {
            color: var(--text-muted);
        }

        .receipt-row .value {
            font-weight: 600;
        }

        .receipt-total {
            border-top: 1px dashed var(--border);
            padding-top: 15px;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .total-amount {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--success);
        }

        .print-btn {
            background-color: transparent;
            border: 1px solid var(--border);
            color: var(--text-muted);
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 500;
            font-size: 0.85rem;
            margin-top: 20px;
            align-self: flex-end;
            transition: all 0.2s ease;
        }

        .print-btn:hover {
            border-color: var(--text-main);
            color: var(--text-main);
        }
    </style>
</head>
<body>

    <!-- Header Navigation Bar -->
    <header>
        <div class="container nav-wrapper">
            <div class="logo">Youth Teaching <span>SG</span></div>
            <button class="cta-btn" onclick="scrollToCalculator()">Tuition Desk</button>
        </div>
    </header>

    <!-- Marketing Hero & Positioning -->
    <section class="hero">
        <div class="container">
            <h1>Master Physics. Ace Competitive Exams.</h1>
            <p>High-yield concept coaching and adaptive infinite testing setups explicitly compiled for Class IX-XII, JEE, NEET, and GATE physics parameters.</p>
            <button class="cta-btn" onclick="scrollToCalculator()">Open Management Tool</button>
        </div>
    </section>

    <!-- Visual Feature Blocks -->
    <section class="container">
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Infinite Mock Tests</h3>
                <p>Fully dynamic test structures leveraging adaptive shuffling arrays. Run testing cycles an infinite number of instances with varying question orders.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔭</div>
                <h3>Visual Physics Frameworks</h3>
                <p>Complex mechanics, thermodynamics, and field properties translated into scannable logical diagrams removing processing friction.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3>Exam Target Modules</h3>
                <p>Curated structures mapping weightage rules for competitive milestones across structural physics syllabi.</p>
            </div>
        </div>
    </section>

    <!-- Interactive Management/Billing Tool Application Workspace -->
    <section class="container" id="ledger-zone">
        <div class="workspace-section">
            <h2 class="section-title">Tuition Management Workspace</h2>
            <p class="section-desc">Live ledger terminal to instantly compute student enrollment streams, test access addons, and map clean receipt output templates.</p>
            
            <div class="split-layout">
                <!-- Inputs Column Form -->
                <div class="input-panel">
                    <div class="form-group">
                        <label for="studentName">Student Name</label>
                        <input type="text" id="studentName" class="form-control" placeholder="Enter student's full name" value="Rahul Das">
                    </div>

                    <div class="form-group">
                        <label for="courseTrack">Target Educational Track</label>
                        <select id="courseTrack" class="form-control">
                            <option value="Class IX-X Foundation" data-fee="1200">Class IX-X Foundation Core</option>
                            <option value="Class XI-XII Board Prep" data-fee="1800" selected>Class XI-XII Higher Secondary</option>
                            <option value="JEE / NEET Mastery" data-fee="2500">JEE / NEET Comprehensive Physics</option>
                            <option value="GATE Technical Physics" data-fee="3500">GATE Advanced Technical Module</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="baseFee">Custom Base Monthly Fee (₹)</label>
                        <input type="number" id="baseFee" class="form-control" value="1800">
                    </div>

                    <label class="checkbox-group">
                        <input type="checkbox" id="testSeriesAddon" checked>
                        <span>Include Infinite Mock Test Portal Access (+ ₹300 Premium)</span>
                    </label>
                </div>

                <!-- Live Dynamic Output Receipt Column -->
                <div class="output-panel">
                    <div class="receipt-box">
                        <div>
                            <div class="receipt-header">
                                <h4>Youth Teaching SG</h4>
                                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Tuition Statement / Payment Invoice</p>
                            </div>

                            <div class="receipt-row">
                                <span class="label">Invoice Date:</span>
                                <span class="value" id="receiptDate">--/--/----</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Student Name:</span>
                                <span class="value" id="receiptName">Rahul Das</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Course Stream:</span>
                                <span class="value" id="receiptTrack">Class XI-XII Board Prep</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Base Fee Component:</span>
                                <span class="value" id="receiptBase">₹1800.00</span>
                            </div>
                            <div class="receipt-row">
                                <span class="label">Exam Portal Addon:</span>
                                <span class="value" id="receiptAddon">₹300.00</span>
                            </div>
                        </div>

                        <div class="receipt-total">
                            <div>
                                <span style="font-weight: 600; display: block; font-size: 0.9rem;">Total Due</span>
                                <span style="font-size: 0.75rem; color: var(--text-muted);">Inclusive of all modules</span>
                            </div>
                            <span class="total-amount" id="receiptTotal">₹2100.00</span>
                        </div>
                        
                        <button class="print-btn" onclick="window.print()">Print Statement</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Operational State Interactivity JavaScript -->
    <script>
        // DOM Element Pickers
        const studentNameInput = document.getElementById('studentName');
        const courseTrackSelect = document.getElementById('courseTrack');
        const baseFeeInput = document.getElementById('baseFee');
        const testSeriesCheck = document.getElementById('testSeriesAddon');

        const receiptName = document.getElementById('receiptName');
        const receiptTrack = document.getElementById('receiptTrack');
        const receiptBase = document.getElementById('receiptBase');
        const receiptAddon = document.getElementById('receiptAddon');
        const receiptTotal = document.getElementById('receiptTotal');
        const receiptDate = document.getElementById('receiptDate');

        // Initialize Stamp Date
        const today = new Date();
        receiptDate.textContent = today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

        // Update calculations logic
        function updateReceipt() {
            // Read Inputs
            const name = studentNameInput.value.trim() || "Guest Student";
            const selectedTrackText = courseTrackSelect.options[courseTrackSelect.selectedIndex].text;
            let baseFee = parseFloat(baseFeeInput.value) || 0;
            const addonFee = testSeriesCheck.checked ? 300 : 0;

            // Calculate Total
            const total = baseFee + addonFee;

            // Bind to Output Display UI elements
            receiptName.textContent = name;
            receiptTrack.textContent = selectedTrackText;
            receiptBase.textContent = `₹${baseFee.toFixed(2)}`;
            receiptAddon.textContent = `₹${addonFee.toFixed(2)}`;
            receiptTotal.textContent = `₹${total.toFixed(2)}`;
        }

        // Dropdown Auto-Fee Syncing Event
        courseTrackSelect.addEventListener('change', () => {
            const selectedOption = courseTrackSelect.options[courseTrackSelect.selectedIndex];
            baseFeeInput.value = selectedOption.getAttribute('data-fee');
            updateReceipt();
        });

        // Event Binding Listeners for real-time reactivity
        studentNameInput.addEventListener('input', updateReceipt);
        baseFeeInput.addEventListener('input', updateReceipt);
        testSeriesCheck.addEventListener('change', updateReceipt);

        // Smooth Scroll functional mapping
        function scrollToCalculator() {
            document.getElementById('ledger-zone').scrollIntoView({ behavior: 'smooth' });
        }

        // Run Initial Pass on startup
        updateReceipt();
    </script>
</body>
</html>
