$files = Get-ChildItem -Path "*.html"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    $footerRegex = '(?s)(<footer class="footer">)(.*?)(</footer>)'
    
    if ($content -match $footerRegex) {
        $footerContent = $matches[2]
        $newFooterContent = $footerContent -replace 'href="#"', 'href="404.html"'
        $content = $content.Replace($footerContent, $newFooterContent)
        
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated footer links in $($file.Name)"
    }
}
