$files = Get-ChildItem -Path "*.html"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $fileName = $file.Name
    
    # We want to replace <a href="index.html"> with <a href="filename.html"> for the site logo
    $regex = '(?s)(<div class="logo"[^>]*>)\s*<a href="index\.html">\s*(<img[^>]+class="site-logo"[^>]*>)\s*</a>\s*(</div>)'
    $replacement = "`$1<a href=`"$fileName`">`$2</a>`$3"
    
    $content = [regex]::Replace($content, $regex, $replacement)
    
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated logo link in $fileName to point to $fileName"
}
