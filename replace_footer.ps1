$footer = [System.IO.File]::ReadAllText("index.html")
$footerMatch = [regex]::Match($footer, '(?s)<!-- Footer -->\s*<footer class="footer">.*?</footer>')
$footerHtml = $footerMatch.Value

$files = @("about.html", "blog.html", "contact.html", "services.html")
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText($file)
        $newContent = [regex]::Replace($content, '(?s)<!-- Footer -->\s*<footer class="footer">.*?</footer>', $footerHtml)
        [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Updated footer in $file"
    }
}
