$files = Get-ChildItem -Path "*.html"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $content = $content -replace '<button class="btn-primary">Subscribe</button>', '<button class="btn-primary" onclick="window.location.href=''404.html''">Subscribe</button>'
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated Subscribe button in $($file.Name)"
}
