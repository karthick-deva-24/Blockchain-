$files = Get-ChildItem -Path *.html

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Inject AOS CSS if not present
    if (-not $content.Contains('aos.css')) {
        $content = $content -replace '</head>', "    <link href=`"https://unpkg.com/aos@2.3.1/dist/aos.css`" rel=`"stylesheet`">`n</head>"
    }
    
    # Inject AOS JS if not present
    if (-not $content.Contains('aos.js')) {
        $content = $content -replace '</body>', "    <script src=`"https://unpkg.com/aos@2.3.1/dist/aos.js`"></script>`n</body>"
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
