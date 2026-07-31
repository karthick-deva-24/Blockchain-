$content = [System.IO.File]::ReadAllText("index.html")

$startMarker = '        <!-- Statistics Section for CountUp -->'
$endMarker = '        <!-- 5. Core Features -->'

$startIndex = $content.IndexOf($startMarker)
$endIndex = $content.IndexOf($endMarker)

if ($startIndex -ge 0 -and $endIndex -ge 0) {
    $goodContent = @"
        <!-- Statistics Section for CountUp -->
        <section class="section" style="background: rgba(20, 184, 166, 0.05); text-align: center; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap: 2rem;">
                <div>
                    <h2 style="font-size: 3rem; color: #14b8a6; margin-bottom: 0.5rem;">$<span class="stat-number" data-target="1000">0</span>M+</h2>
                    <p style="color: #a0aab2; font-size: 1.1rem;">Trading Volume</p>
                </div>
                <div>
                    <h2 style="font-size: 3rem; color: #c99339; margin-bottom: 0.5rem;"><span class="stat-number" data-target="5000000">0</span>+</h2>
                    <p style="color: #a0aab2; font-size: 1.1rem;">Transactions</p>
                </div>
                <div>
                    <h2 style="font-size: 3rem; color: #4a90e2; margin-bottom: 0.5rem;"><span class="stat-number" data-target="150">0</span>K+</h2>
                    <p style="color: #a0aab2; font-size: 1.1rem;">Active Users</p>
                </div>
            </div>
        </section>

        <!-- 2. Trusted Partners -->
        <section class="section">
            <h2 class="section-title">Trusted by Global Businesses & <span>Innovative Startups</span></h2>
            <div class="grid">
                <div class="card"><h3 class="card-title">Partner Alpha</h3><p class="card-text">Leading the future of decentralized finance globally.</p></div>
                <div class="card"><h3 class="card-title">Crypto Nexus</h3><p class="card-text">Scaling Web3 infrastructure for modern enterprises.</p></div>
                <div class="card"><h3 class="card-title">Block Ventures</h3><p class="card-text">Investing in cutting-edge smart contract platforms.</p></div>
            </div>
        </section>

        <!-- 3. About Our Platform -->
        <section class="section section-dark" id="learn-more-section">
            <h2 class="section-title">Revolutionizing <span>Digital Trust</span> Through Blockchain</h2>
            <div class="grid" style="grid-template-columns: 1fr 1fr; align-items: center;">
                <div>
                    <div class="image-block" style="background-image: url('images/blockchain_banner.jpg'); height: 400px;"></div>
                </div>
                <div>
                    <p class="card-text" style="font-size: 1.2rem; margin-bottom: 2rem;">We build scalable, secure, and highly transparent blockchain ecosystems tailored to modern enterprise needs. From decentralized identity to supply chain tracking, we empower your digital transformation.</p>
                    <a href="404.html?ref=learn-more-section" class="btn-primary" id="learn-more-btn">Learn More</a>
                </div>
            </div>
        </section>

        <!-- 4. Our Blockchain Services -->
        <section class="section">
            <h2 class="section-title">Comprehensive Blockchain Solutions for <span>Every Industry</span></h2>
            <div class="grid">
                <div class="card">
                    <div class="card-icon"><i class="fas fa-cog"></i></div>
                    <h3 class="card-title">Smart Contracts</h3>
                    <p class="card-text">Automate your business logic with secure, auditable, and efficient smart contracts deployed on modern networks.</p>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-link"></i></div>
                    <h3 class="card-title">Custom Blockchains</h3>
                    <p class="card-text">Build bespoke private or public blockchain networks tailored to your specific performance and governance needs.</p>
                </div>
                <div class="card">
                    <div class="card-icon"><i class="fas fa-mobile-alt"></i></div>
                    <h3 class="card-title">DApp Development</h3>
                    <p class="card-text">Engage your users with beautiful, responsive decentralized applications powered by Web3 technology.</p>
                </div>
            </div>
        </section>
"@

    $newContent = $content.Substring(0, $startIndex) + $goodContent + "`r`n" + $content.Substring($endIndex)
    [System.IO.File]::WriteAllText("index.html", $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "Repaired index.html completely"
} else {
    Write-Host "Markers not found"
}
