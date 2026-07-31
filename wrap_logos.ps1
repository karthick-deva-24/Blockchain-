$files = Get-ChildItem -Path "*.html"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # Wrap site logos in an anchor tag pointing to index.html
    # Matches <div class="logo"><img ...></div> and injects <a> tags
    $content = [regex]::Replace($content, '(?s)(<div class="logo"[^>]*>)\s*(<img[^>]+class="site-logo"[^>]*>)\s*(</div>)', '$1<a href="index.html">$2</a>$3')
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Wrapped logos in $($file.Name)"
}
