$files = Get-ChildItem -Path *.html

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    $content = $content -replace 'style="grid-template-columns: repeat\(3, 1fr\); gap: 2rem;"', 'class="grid grid-3" style="gap: 2rem;"'
    $content = $content -replace 'style="grid-template-columns: repeat\(3, 1fr\);"', 'class="grid grid-3"'
    $content = $content -replace 'style="grid-template-columns: 1fr 1fr; align-items: center;"', 'class="grid grid-2" style="align-items: center;"'
    $content = $content -replace 'style="grid-template-columns: repeat\(2, 1fr\);"', 'class="grid grid-2"'
    $content = $content -replace 'style="grid-template-columns: 2fr 1fr;"', 'class="grid grid-2-1"'
    $content = $content -replace 'style="grid-template-columns: 1fr; gap: 1rem;"', 'class="grid grid-1" style="gap: 1rem;"'
    $content = $content -replace 'style="grid-template-columns: 1fr 1fr; gap: 1\.5rem; margin-bottom: 1\.5rem;"', 'class="grid grid-2" style="gap: 1.5rem; margin-bottom: 1.5rem;"'
    
    # In index.html, fix stats font size overriding by adding class
    $content = [regex]::Replace($content, '<div>\s*<h2 style="font-size: 3rem;', '<div class="stat-number-wrapper">`n                    <h2 style="font-size: 3rem;')
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
