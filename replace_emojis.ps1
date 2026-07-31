$replacements = @{
    '&#x1F3AF;' = '<i class="fas fa-bullseye"></i>'
    '&#x1F441;&#xFE0F;' = '<i class="fas fa-eye"></i>'
    '&#x1F4CA;' = '<i class="fas fa-chart-bar"></i>'
    '&#x1F465;' = '<i class="fas fa-users"></i>'
    '&#x1F310;' = '<i class="fas fa-globe"></i>'
    '&#x1F4C8;' = '<i class="fas fa-chart-line"></i>'
    '&#x2699;&#xFE0F;' = '<i class="fas fa-cog"></i>'
    '&#x1F514;' = '<i class="fas fa-bell"></i>'
    '&#x2709;&#xFE0F;' = '<i class="fas fa-envelope"></i>'
    '&#x1F30D;' = '<i class="fas fa-globe-americas"></i>'
    '&#x1F4D6;' = '<i class="fas fa-book-open"></i>'
    '&#x1F511;' = '<i class="fas fa-key"></i>'
    '&#x1F4DE;' = '<i class="fas fa-phone-alt"></i>'
    '&#x1F4AC;' = '<i class="fas fa-comments"></i>'
    '&#x1F1FA;&#x1F1F8;' = '<i class="fas fa-flag-usa"></i>'
    '&#x1F1EA;&#x1F1FA;' = '<i class="fas fa-globe-europe"></i>'
    '&#x1F517;' = '<i class="fas fa-link"></i>'
    '&#x1F4F1;' = '<i class="fas fa-mobile-alt"></i>'
    '&#x1F4DC;' = '<i class="fas fa-scroll"></i>'
    '&#x1F6E1;&#xFE0F;' = '<i class="fas fa-shield-alt"></i>'
    '&#x1F4BC;' = '<i class="fas fa-briefcase"></i>'
    '&#x1F4B8;' = '<i class="fas fa-money-bill-wave"></i>'
    '&#x1F3E6;' = '<i class="fas fa-university"></i>'
    '&#x1F3AB;' = '<i class="fas fa-ticket-alt"></i>'
}

$faLink = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'

$files = Get-ChildItem -Path "*.html"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    if ($content -notmatch "font-awesome") {
        $content = $content -replace '</head>', "`n    $faLink`n</head>"
    }

    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Processed $($file.Name)"
}
