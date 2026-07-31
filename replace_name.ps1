$files = Get-ChildItem -Path .\* -Include *.html,*.css,*.js -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    $original = $content
    # Case sensitive replacements
    $content = $content -creplace 'Cryption', 'Stackly'
    $content = $content -creplace 'cryption', 'stackly'
    $content = $content -creplace 'CRYPTION', 'STACKLY'

    if ($original -cne $content) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    }
}
